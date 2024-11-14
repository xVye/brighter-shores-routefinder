import pathfinder from "./pathfinder.js";

onmessage = (event) => {
  const { currentDeliveries, availableDeliveries } = event.data;
  postMessage(
    pathfinder.findBestDeliveries(currentDeliveries, availableDeliveries),
  );
};
