import { PriorityQueue } from "@datastructures-js/priority-queue";

import GPS from "./gps.js";
import combinations from "./combinations.js";
import { BountyStatus } from "./bounties.js";
import { bountyBoard, portals } from "./nodes.js";
import { bounties as bountyData } from "./bounties.js";

/**
 * Determines the best route to take to make all deliveries
 */
class Pathfinder {
  includeTeleportSteps = true; // Whether to include teleport steps in the path
  includeWalkingSteps = false; // Whether to include walking steps in the path
  inventorySpace = 24; // The number of items that can be carried at once
  timeToBuy = 3; // The time it takes to buy an item
  timeToSell = 4; // The time it takes to sell an item

  /**
   * Determines which deliveries should be made based on current and available deliveries
   * @param currentBounties An array of {@link bountyData} that are currently in progress
   *   E.g, [CARROTS, SOAP, ...]
   * @param availableBounties An array of {@link bountyData} that are available
   *   E.g, [CARROTS, SOAP, ...]
   * @returns {
   *     {bounties: string[]},    // An array of bounties that should be made
   *     {actions:    string[]},  // An array of actions to take to complete the deliveries
   *     {distance:   number}     // The total distance to complete the deliveries
   * }
   */
  findBestBounties(currentBounties, availableBounties) {
    const result = {
      bounties: [],
      actions: [],
      distance: Number.MAX_SAFE_INTEGER,
      totalExp: 0,
      expPerSecond: 0,
    };

    const allBounties = [...currentBounties, ...availableBounties];
    const combos = combinations(allBounties, 6);

    // Prioritize repeating sequences since they are much more likely to be optimal
    // Then pass the current best distance to #findBestRoute to give up on bad paths early
    // ^ this works, but doesn't help in the scenario that there are no repeating sequences

    console.log(`Finding best route amongst ${combos.length} possibilities`);
    combos.forEach((combo) => {
      const totalExp = combo.reduce(
        (acc, bounty) => acc + bountyData[bounty].exp,
        0,
      );

      const { actions, distance } = this.findBestRoute(combo);
      const expPerSecond = totalExp / distance;

      //if (distance < result.distance) {
      if (expPerSecond > result.expPerSecond) {
        result.bounties = combo;
        result.actions = actions;
        result.distance = distance;
        result.totalExp = totalExp;
        result.expPerSecond = totalExp / distance;
      }
    });

    return result;
  }

  /**
   * Determines the shortest route to complete all deliveries
   * @param bounties An array containing bounties {@link bountyData}. E.g, [CARROTS, SOAP, ...]
   * @returns {{actions: string[], distance: number}} An object containing the actions to take and the total distance
   */
  findBestRoute(bounties) {
    const pq = new PriorityQueue((a, b) => a.distance - b.distance);
    const visited = new Map();

    pq.enqueue({
      distance: 0,
      previousNode: null,
      currentNode: bountyBoard.node,
      bountyStates: [...new Array(bounties.length)].map(
        () => BountyStatus.NOT_STARTED,
      ),
      actions: [],
    });

    while (pq.size() > 0) {
      const {
        distance,
        previousNode,
        currentNode,
        bountyStates: originalBountyStates,
        actions: originalActions,
      } = pq.dequeue();

      // Avoid mutating the original arrays by creating copies
      const bountyStates = [...originalBountyStates];
      const actions = [...originalActions];

      // Check if we have already found a shorter path to this location with the same deliveries
      const visitedKey = `${currentNode}-${bountyStates}`;
      if (visited.has(visitedKey) && visited.get(visitedKey) <= distance) {
        continue;
      }
      visited.set(visitedKey, distance);

      let distanceAfterTrading = distance;
      let numItemsBought = 0;
      let numItemsSold = 0;

      // Sell everything we can at the current location
      // It is important to sell items before purchasing to free up inventory space
      for (let i = 0; i < bounties.length; i++) {
        const bounty = bounties[i];
        if (currentNode !== bountyData[bounty].buyer.node) {
          continue;
        }

        if (bountyStates[i] !== BountyStatus.IN_PROGRESS) {
          continue;
        }

        if (numItemsBought + numItemsSold === 0) {
          this.#addTravelSteps(actions, previousNode, currentNode);
        }

        numItemsSold += 1;
        distanceAfterTrading += this.timeToSell;

        actions.push({
          type: "sell",
          item: bountyData[bounty].name,
          location: bountyData[bounty].buyer.name, // TODO: Add location
          distance: distanceAfterTrading,
        });
        bountyStates[i] = BountyStatus.COMPLETED;
      }

      // Buy everything we can at the current location
      for (let i = 0; i < bounties.length; i++) {
        if (!this.#canPurchaseMoreItems(bountyStates)) {
          break;
        }

        const bounty = bounties[i];
        if (currentNode !== bountyData[bounty].seller.node) {
          continue;
        }

        if (bountyStates[i] !== BountyStatus.NOT_STARTED) {
          continue;
        }

        if (numItemsBought + numItemsSold === 0) {
          this.#addTravelSteps(actions, previousNode, currentNode);
        }

        if (numItemsBought === 0) {
          distanceAfterTrading += this.timeToBuy; // Buying more than one item takes no extra time
        }
        numItemsBought += 1;

        actions.push({
          type: "buy",
          item: bountyData[bounty].name,
          location: bountyData[bounty].seller.name, // TODO: Add location
          distance: distanceAfterTrading,
        });
        bountyStates[i] = BountyStatus.IN_PROGRESS;
      }

      if (this.#deliveriesCompleted(bountyStates)) {
        return { actions, distance: distanceAfterTrading };
      }

      // Enqueue next purchase locations
      if (this.#canPurchaseMoreItems(bountyStates)) {
        bounties
          .filter((b, i) => bountyStates[i] === BountyStatus.NOT_STARTED)
          .forEach((bounty) => {
            const nextNode = bountyData[bounty].seller.node;
            const { distance: nextDistance } = GPS.distance(
              currentNode,
              nextNode,
            );
            pq.enqueue({
              distance: distanceAfterTrading + nextDistance,
              previousNode: currentNode,
              currentNode: nextNode,
              bountyStates,
              actions,
            });
          });
      }

      // Enqueue next sell locations
      bounties
        .filter((d, i) => bountyStates[i] === BountyStatus.IN_PROGRESS)
        .forEach((bounty) => {
          const nextNode = bountyData[bounty].buyer.node;
          const { distance: nextDistance } = GPS.distance(
            currentNode,
            nextNode,
          );
          pq.enqueue({
            distance: distanceAfterTrading + nextDistance,
            previousNode: currentNode,
            currentNode: nextNode,
            bountyStates,
            actions,
          });
        });
    }
  }

  /**
   * Updates the actions array with individual steps to take to get from one location to another
   * @param actions An array of actions
   * @param startNode Node of the starting location (reference {@link edges})
   * @param endNode Name of the ending location, (reference {@link edges})
   */
  #addTravelSteps(actions, startNode, endNode) {
    const { path } = GPS.distance(startNode, endNode);
    if (path.length < 2) {
      return;
    }

    const distance =
      actions.length > 0 ? actions[actions.length - 1].distance : 0;

    for (let i = 1; i < path.length - 1; i++) {
      if (
        this.includeTeleportSteps &&
        path[i] === portals.CRENOPOLIS_MARKET.node
      ) {
        actions.push({
          type: "teleport",
          location: portals.CRENOPOLIS_MARKET.name,
          distance: distance + 8, // TODO: magic number, replace with a constant
        });
      } else if (
        this.includeTeleportSteps &&
        path[i] === portals.CRENOPOLIS_OUTSKIRTS.node
      ) {
        actions.push({
          type: "teleport",
          location: portals.CRENOPOLIS_OUTSKIRTS.name,
          distance: distance + 8, // TODO: magic number, replace with a constant
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
   * @param bountyStates An array of {@link BountyStatus} values representing the state of each bounty
   * @returns {boolean} True if more items can be purchased, false otherwise
   */
  #canPurchaseMoreItems(bountyStates) {
    let availableSpace = this.inventorySpace;

    for (const state of bountyStates) {
      if (state === BountyStatus.IN_PROGRESS) {
        availableSpace -= 6;
      }
    }

    return availableSpace >= 6;
  }

  /**
   * Determines if all deliveries have been completed
   * @param bountyStates An array of {@link BountyStatus} values representing the state of each bounty
   * @returns {boolean} True if all deliveries have been completed, false otherwise
   */
  #deliveriesCompleted(bountyStates) {
    return bountyStates.every((state) => state === BountyStatus.COMPLETED);
  }
}

export default new Pathfinder();
