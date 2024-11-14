import pathfinder from "./pathfinder.js";

/**
 * Receives a message from the main thread containing the current and available deliveries
 * and sends back the best route to take to make all deliveries
 * @param event The message event containing the current and available deliveries
 */
onmessage = (event) => {
  const { currentDeliveries, availableDeliveries } = event.data;

  const { deliveries, actions, distance } = pathfinder.findBestDeliveries(
    currentDeliveries,
    availableDeliveries,
  );

  const abandon = currentDeliveries.filter((d) => !deliveries.includes(d));

  // pickup any deliveries that were not in current
  // for each delivery in deliveries, if it is not in currentDeliveries, add it to pickup

  let pickup = [];
  let copy = currentDeliveries;
  deliveries.forEach((d) => {
    if (copy.includes(d)) {
      copy = copy.filter((c) => c !== d);
    } else {
      pickup.push(d);
    }
  });

  postMessage({
    abandon,
    pickup,
    deliveries,
    actions,
    distance,
  });
};
