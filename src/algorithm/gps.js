import { PriorityQueue } from "@datastructures-js/priority-queue";
import { edges, portals } from "./nodes.js";

/**
 * Calculates the shortest path between two nodes
 * For more information on nodes, see:
 *    {@link markets}
 *    {@link edges}
 *    {@link portals}
 */
class GPS {
  #graph;
  #cache;

  constructor() {
    this.#graph = new Map();
    this.#cache = new Map();
    this.#buildGraph();
  }

  /**
   * Returns the shortest path between two nodes
   * @param node1 The name of a location. e.g, "Greengrocers"
   * @param node2 The name of a location. e.g, "Tanners Road"
   * @returns {number} The shortest distance between the two locations
   */
  distance(node1, node2) {
    const key = `${node1}-${node2}`;

    if (!this.#cache.has(key)) {
      const distance = this.#distance(node1, node2);
      this.#cache.set(key, distance);
    }

    return this.#cache.get(key);
  }

  #distance(node1, node2) {
    if (node1 === node2) {
      return { distance: 0, path: [node1] };
    }

    const pq = new PriorityQueue((a, b) => a.distance - b.distance);
    pq.enqueue({ distance: 0, node: node1 });

    const distances = new Map();
    const previous = new Map();

    for (let node of this.#graph.keys()) {
      distances.set(node, Number.MAX_SAFE_INTEGER);
      previous.set(node, null);
    }

    distances.set(node1, 0);

    while (pq.size() > 0) {
      const { distance: currentDistance, node: currentNode } = pq.dequeue();

      if (currentDistance > distances.get(currentNode)) {
        continue;
      }

      const neighbors = this.#graph.get(currentNode);
      for (let [neighbor, weight] of neighbors) {
        const distance = currentDistance + weight;
        if (distance < distances.get(neighbor)) {
          distances.set(neighbor, distance);
          previous.set(neighbor, currentNode);

          pq.enqueue({ distance, node: neighbor });

          if (neighbor === node2) {
            return {
              distance,
              path: this.#reconstructPath(previous, node1, node2),
            };
          }
        }
      }
    }

    throw new Error(`No path found between ${node1} and ${node2}`);
  }

  #reconstructPath(previous, start, target) {
    const path = [];
    let current = target;
    while (current !== null) {
      path.push(current);
      current = previous.get(current);
    }
    path.reverse();
    return path[0] === start ? path : [];
  }

  #addEdge(node1, node2, weight) {
    if (!this.#graph.has(node1)) {
      this.#graph.set(node1, []);
    }

    const neighbors = this.#graph.get(node1);

    // Duplicate edge prevention, if an edge already exists between two nodes, keep the existing edge
    for (const [neighbor, existingWeight] of neighbors) {
      if (neighbor === node2) {
        console.warn(
          `Edge between ${node1} and ${node2} already exists. Keeping existing edge with weight ${existingWeight}`,
        );
        return;
      }
    }

    neighbors.push([node2, weight]);
  }

  #buildGraph() {
    for (const edge of edges) {
      const [node1, node2] = edge.nodes;

      // If an edge is in a hostile zone, add additional weight to the edge to represent the chance of an encounter
      const weight = edge.hostile
        ? edge.weight + edge.chanceOfEncounter * edge.timeToResolve
        : edge.weight;

      this.#addEdge(node1, node2, weight);

      if (!edge.directed) {
        this.#addEdge(node2, node1, weight);
      }
    }

    // Portal zones can be travelled to from any other node
    for (let node of this.#graph.keys()) {
      Object.entries(portals).forEach(([, portal]) => {
        this.#addEdge(node, portal.node, portal.teleportTime);
      });
    }
  }
}

export default new GPS();
