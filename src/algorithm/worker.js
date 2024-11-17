import pathfinder from "./pathfinder.js";
import { bounties as bountyData } from "./bounties.js";

/**
 * Receives a message from the main thread containing the current and available deliveries
 * and sends back the best route to take to make all deliveries
 * @param event The message event containing the current and available deliveries
 */
onmessage = (event) => {
  const { currentBounties, availableBounties } = event.data;

  const { bounties, actions, distance } = pathfinder.findBestBounties(
    currentBounties.map((d) => d.toUpperCase().replaceAll(/ /g, "_")),
    availableBounties.map((d) => d.toUpperCase().replaceAll(/ /g, "_")),
  );

  const bountyNames = bounties.map((b) => bountyData[b].name);

  const abandon = currentBounties.filter((d) => !bountyNames.includes(d));

  let pickup = [];
  let copy = currentBounties;
  bountyNames.forEach((d) => {
    if (copy.includes(d)) {
      copy = copy.filter((c) => c !== d);
    } else {
      pickup.push(d);
    }
  });

  console.log(actions);

  postMessage({
    abandon,
    pickup,
    bountyNames,
    actions,
    distance,
  });
};
