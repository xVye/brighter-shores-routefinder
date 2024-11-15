import { PriorityQueue } from "@datastructures-js/priority-queue";

import GPS from "./gps.js";
import combinations from "./combinations.js";
import { deliveryData, DeliveryStatus } from "./bounties.js";

/**
 * Determines the best route to take to make all deliveries
 */
class Pathfinder {
  #startLocation = "Merchant's Guild";
  #teleportZones = new Set([
    "Crenopolis Outskirts Portal Stone",
    "Crenopolis Market Portal Stone",
  ]);

  includeTeleportSteps = true; // Whether to include teleport steps in the path
  includeWalkingSteps = false; // Whether to include walking steps in the path
  inventorySpace = 24; // The number of items that can be carried at once

  /**
   * Determines which deliveries should be made based on current and available deliveries
   * @param currentDeliveries An array of deliveries that are currently in progress
   *   E.g, ['Carrots', 'Meat Wrap', 'Soap', 'Clockwork Sheep', 'Ribs', 'Plates']
   * @param availableDeliveries An array of deliveries that are available to be made
   *   E.g, ['Meat Wrap', 'Carrots', 'Clockwork Sheep', 'Soap', 'Ribs', 'Pumpkin']
   * Delivery keys can be found in {@link deliveryData}
   * @returns {
   *     {deliveries: string[]},  // An array of delivery keys that should be made
   *     {actions:    string[]},  // An array of actions to take to complete the deliveries
   *     {distance:   number}     // The total distance to complete the deliveries
   * }
   */
  findBestDeliveries(currentDeliveries, availableDeliveries) {
    const result = {
      deliveries: [],
      actions: [],
      distance: Number.MAX_SAFE_INTEGER,
    };

    const allDeliveries = [...currentDeliveries, ...availableDeliveries];
    const combos = combinations(allDeliveries, 6);

    console.log(`Finding best route amongst ${combos.length} possibilities`);
    combos.forEach((combo) => {
      const { actions, distance } = this.findBestRoute(combo);
      if (distance < result.distance) {
        result.deliveries = combo;
        result.actions = actions;
        result.distance = distance;
      }
    });

    return result;
  }

  /**
   * Determines the shortest route to complete all deliveries
   * @param deliveries An array of deliveries. E.g, ['Carrots', 'Carrots', 'Soap', 'Soap', 'Ribs', 'Ribs']
   *  Delivery keys can be found in {@link deliveryData}
   * @returns {{actions: string[], distance: number}} An object containing the actions to take and the total distance
   */
  findBestRoute(deliveries) {
    const pq = new PriorityQueue((a, b) => a.distance - b.distance);
    const visited = new Map();

    pq.enqueue({
      distance: 0,
      previousLocation: null,
      currentLocation: this.#startLocation,
      deliveryStates: [...new Array(deliveries.length)].map(
        () => DeliveryStatus.NOT_STARTED,
      ),
      actions: [],
    });

    while (pq.size() > 0) {
      const {
        distance,
        previousLocation,
        currentLocation,
        deliveryStates: originalDeliveryStates,
        actions: originalActions,
      } = pq.dequeue();

      // Avoid mutating the original arrays by creating copies
      const deliveryStates = [...originalDeliveryStates];
      const actions = [...originalActions];

      // Check if we have already found a shorter path to this location with the same deliveries
      const visitedKey = `${currentLocation}-${deliveryStates}`;
      if (visited.has(visitedKey) && visited.get(visitedKey) <= distance) {
        continue;
      }
      visited.set(visitedKey, distance);

      let needToAddTravelSteps = true; // Only done once per location

      // Sell everything we can at the current location
      // It is important to sell items before purchasing to free up inventory space
      for (let i = 0; i < deliveries.length; i++) {
        const delivery = deliveries[i];
        if (currentLocation !== deliveryData[delivery].sellLocation) {
          continue;
        }

        if (deliveryStates[i] !== DeliveryStatus.IN_PROGRESS) {
          continue;
        }

        if (needToAddTravelSteps) {
          this.#addTravelSteps(actions, previousLocation, currentLocation);
          needToAddTravelSteps = false;
        }

        actions.push({
          type: "sell",
          item: delivery,
          location: currentLocation,
          distance,
        });
        deliveryStates[i] = DeliveryStatus.COMPLETED;
      }

      // Buy everything we can at the current location
      for (let i = 0; i < deliveries.length; i++) {
        if (!this.#canPurchaseMoreItems(deliveryStates)) {
          break;
        }

        const delivery = deliveries[i];
        if (currentLocation !== deliveryData[delivery].buyLocation) {
          continue;
        }

        if (deliveryStates[i] !== DeliveryStatus.NOT_STARTED) {
          continue;
        }

        if (needToAddTravelSteps) {
          this.#addTravelSteps(actions, previousLocation, currentLocation);
          needToAddTravelSteps = false;
        }

        actions.push({
          type: "buy",
          item: delivery,
          location: currentLocation,
          distance,
        });
        deliveryStates[i] = DeliveryStatus.IN_PROGRESS;
      }

      if (this.#deliveriesCompleted(deliveryStates)) {
        return { actions, distance };
      }

      // Enqueue next purchase locations
      if (this.#canPurchaseMoreItems(deliveryStates)) {
        deliveries
          .filter((d, i) => deliveryStates[i] === DeliveryStatus.NOT_STARTED)
          .forEach((d) => {
            const nextLocation = deliveryData[d].buyLocation;
            const { distance: nextDistance } = GPS.distance(
              currentLocation,
              nextLocation,
            );
            pq.enqueue({
              distance: distance + nextDistance,
              previousLocation: currentLocation,
              currentLocation: nextLocation,
              deliveryStates,
              actions,
            });
          });
      }

      // Enqueue next sell locations
      deliveries
        .filter((d, i) => deliveryStates[i] === DeliveryStatus.IN_PROGRESS)
        .forEach((d) => {
          const nextLocation = deliveryData[d].sellLocation;
          const { distance: nextDistance } = GPS.distance(
            currentLocation,
            nextLocation,
          );
          pq.enqueue({
            distance: distance + nextDistance,
            previousLocation: currentLocation,
            currentLocation: nextLocation,
            deliveryStates,
            actions,
          });
        });
    }
  }

  /**
   * Updates the actions array with individual steps to take to get from one location to another
   * @param actions An array of actions
   * @param startLocation Name of the starting location, e.g. "Greengrocers"
   * @param endLocation Name of the ending location, e.g. "Tanners Road"
   */
  #addTravelSteps(actions, startLocation, endLocation) {
    const { path } = GPS.distance(startLocation, endLocation);
    if (path.length < 2) {
      return;
    }

    for (let i = 1; i < path.length - 1; i++) {
      if (this.includeTeleportSteps && this.#teleportZones.has(path[i])) {
        actions.push({
          type: "teleport",
          location: path[i],
        });
      } else if (this.includeWalkingSteps) {
        actions.push({
          type: "walk",
          location: path[i],
        });
      }
    }
  }

  /**
   * Determines if more items can be purchased / carried in the inventory
   * @param deliveryStates An array of {@link DeliveryStatus} values representing the state of each delivery
   * @returns {boolean} True if more items can be purchased, false otherwise
   */
  #canPurchaseMoreItems(deliveryStates) {
    let availableSpace = this.inventorySpace;

    for (const state of deliveryStates) {
      if (state === DeliveryStatus.IN_PROGRESS) {
        availableSpace -= 6;
      }
    }

    return availableSpace >= 6;
  }

  /**
   * Determines if all deliveries have been completed
   * @param deliveryStates An array of {@link DeliveryStatus} values representing the state of each delivery
   * @returns {boolean} True if all deliveries have been completed, false otherwise
   */
  #deliveriesCompleted(deliveryStates) {
    return deliveryStates.every((state) => state === DeliveryStatus.COMPLETED);
  }
}

export default new Pathfinder();
