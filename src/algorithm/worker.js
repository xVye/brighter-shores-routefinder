import pathfinderv2 from "./pathfinderv2.js";
import { bounties as bountyData } from "./bounties.js";

/**
 * Receives a message from the main thread containing the current and available deliveries
 * and sends back the best route to take to make all deliveries
 * @param event The message event containing the current and available deliveries
 */
onmessage = (event) => {
  const { currentBounties, availableBounties } = event.data;

  const { bounties, actions, distance } = pathfinderv2.findBestBounties(
    currentBounties.map((d) => d.toUpperCase().replaceAll(/ /g, "_")),
    availableBounties.map((d) => d.toUpperCase().replaceAll(/ /g, "_")),
  );

  const bountyNames = bounties.map((b) => bountyData[b].name);

  const abandon = currentBounties.filter((d) => !bountyNames.includes(d));

  // pickup any deliveries that were not in current
  // for each delivery in deliveries, if it is not in currentDeliveries, add it to pickup

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
