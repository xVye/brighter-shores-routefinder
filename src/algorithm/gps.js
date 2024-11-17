import { PriorityQueue } from "@datastructures-js/priority-queue";
import { edges, portals } from "./nodes.js";

/**
 * Calculates the shortest path between two locations
 */
class GPS {
  #graph;
  #cache;

  additionalHostileZoneWeight = 0.15 * 7.5; // Chance of hostile encounter * time to resolve

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

    const mpq = new PriorityQueue((a, b) => a.distance - b.distance);
    mpq.enqueue({ distance: 0, node: node1 });

    const distances = new Map();
    const previous = new Map();

    for (let node of this.#graph.keys()) {
      distances.set(node, Number.MAX_SAFE_INTEGER);
      previous.set(node, null);
    }

    distances.set(node1, 0);

    while (mpq.size() > 0) {
      const { distance: currentDistance, node: currentNode } = mpq.dequeue();

      if (currentDistance > distances.get(currentNode)) {
        continue;
      }

      const neighbors = this.#graph.get(currentNode);
      for (let [neighbor, weight] of neighbors) {
        const distance = currentDistance + weight;
        if (distance < distances.get(neighbor)) {
          distances.set(neighbor, distance);
          previous.set(neighbor, currentNode);

          mpq.enqueue({ distance, node: neighbor });

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

    this.#graph.get(node1).push([node2, weight]);
  }

  #buildGraph() {
    for (const edge of edges) {
      const [node1, node2] = edge.nodes;
      const weight = edge.hostile
        ? edge.weight + this.additionalHostileZoneWeight
        : edge.weight;

      this.#addEdge(node1, node2, weight);

      if (!edge.directed) {
        this.#addEdge(node2, node1, weight);
      }
    }

    // Portal zones can be travelled to from any other zone, with ~8 seconds of travel time
    for (let node of this.#graph.keys()) {
      this.#addEdge(node, portals.CRENOPOLIS_MARKET.node, 8.0);
      this.#addEdge(node, portals.CRENOPOLIS_OUTSKIRTS.node, 8.0);
    }
  }
}

export default new GPS();
