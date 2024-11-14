import {PriorityQueue} from '@datastructures-js/priority-queue';

/**
 * Calculates the shortest path between two locations
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
        const key = `${node1}-${node2}`

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
                        return { distance, path: this.#reconstructPath(previous, node1, node2) };
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

    #addDirectedEdge(node1, node2, weight = 1) {
        if (!this.#graph.has(node1)) {
            this.#graph.set(node1, []);
        }

        this.#graph.get(node1).push([node2, weight]);
    }

    #addUndirectedEdge(node1, node2, weight = 1) {
        this.#addDirectedEdge(node1, node2, weight);
        this.#addDirectedEdge(node2, node1, weight);
    }

    #buildGraph() {
        this.#addUndirectedEdge('Crenopolis Outskirts Portal Stone', 'Cyclops East Pass');
        this.#addUndirectedEdge('Cyclops East Pass', 'Stony Ravine');
        this.#addUndirectedEdge('Cyclops East Pass', 'Road to Crenopolis');
        this.#addUndirectedEdge('Stony Gorge', 'Stony Canyon', 1.5);
        this.#addUndirectedEdge('Cyclops Canyon', 'Unicorn Farm');
        this.#addUndirectedEdge('Unicorn Farm', 'Cyclops Store Cave');
        this.#addUndirectedEdge('Road to Crenopolis', 'Rockbird Clearing');
        this.#addUndirectedEdge('Road to Crenopolis', 'West Gate');
        this.#addUndirectedEdge('Rockbird Clearing', 'Fortunehold Meadow');
        this.#addUndirectedEdge('Fortunehold Meadow', 'Fortunehold Farm');
        this.#addUndirectedEdge('West Gate', "Lord's Road West");
        this.#addUndirectedEdge("Lord's Road West", 'Cobble Corner');
        this.#addUndirectedEdge('Cobble Corner', 'Twiddle Corner');
        this.#addUndirectedEdge('Dusty Alley', 'Dusty Corner', 1.5);
        this.#addUndirectedEdge('Morose Lane West', "Lani's Curiosities");
        this.#addUndirectedEdge('Morose Lane West', 'Morose Lane East');
        this.#addUndirectedEdge('Morose Lane East', 'Thimble Lane');
        this.#addUndirectedEdge('Thimble Lane', 'Geld Family Logistics');
        this.#addUndirectedEdge('Geld Family Logistics', 'Waterfront Market');
        this.#addUndirectedEdge('Waterfront Market', 'Waterfront');
        this.#addUndirectedEdge('Waterfront', 'Tanners Road');
        this.#addUndirectedEdge('Waterfront', 'Bobbin Road South');
        this.#addUndirectedEdge('Bobbin Road South', 'Thimble Lane');
        this.#addUndirectedEdge('Bobbin Road South', 'Bobbin Road North');
        this.#addUndirectedEdge('Bobbin Road North', 'Thadwick Square');
        this.#addUndirectedEdge('Thadwick Square', "Lord's Road New");
        this.#addUndirectedEdge('Thadwick Square', "Goose Inn Bar");
        this.#addUndirectedEdge('Goose Inn Bar', "Goose Inn Kitchen");
        this.#addUndirectedEdge("Lord's Road New", "Lord's Road East");
        this.#addUndirectedEdge("Lord's Road East", "Lord's Road Central");
        this.#addUndirectedEdge("Lord's Road Central", "Lord's Road West");
        this.#addUndirectedEdge('Tanners Road', 'Ratmore Road');
        this.#addUndirectedEdge('Ratmore Road', 'Ratmore Rise');
        this.#addUndirectedEdge('Ratmore Rise', 'Leatherworks');
        this.#addUndirectedEdge('Leatherworks', 'Bobbin Road North');
        this.#addUndirectedEdge('Ratmore Road', 'Market Chambers');
        this.#addUndirectedEdge('Market Chambers', 'South Player Market');
        this.#addUndirectedEdge('Crenopolis Market Portal Stone', 'East Player Market');
        this.#addUndirectedEdge('East Player Market', "Bert's Gallery");
        this.#addUndirectedEdge('East Player Market', "Henderson's Meat Storehouse");
        this.#addUndirectedEdge('East Player Market', 'North Player Market');
        this.#addUndirectedEdge('East Player Market', 'South Player Market');
        this.#addUndirectedEdge('North Player Market', 'West Player Market');
        this.#addUndirectedEdge('South Player Market', 'West Player Market');
        this.#addUndirectedEdge('West Player Market', 'Outer Market');
        this.#addUndirectedEdge('Outer Market', 'Thadwick Square');
        this.#addUndirectedEdge('Thadwick Square', 'Peacock Road South');
        this.#addUndirectedEdge('Peacock Road South', 'Peacock Road Central');
        this.#addUndirectedEdge('Peacock Road Central', 'Peacock Road North');
        this.#addUndirectedEdge("Lord's Road West", 'Hopton Corner');
        this.#addUndirectedEdge('Hopton Corner', 'Rat Alley');
        this.#addUndirectedEdge('Rat Alley', 'Murkwell Court');
        this.#addUndirectedEdge('Murkwell Court', "Meggrit's Market");
        this.#addUndirectedEdge('Murkwell Court', 'Murkwell Lane');
        this.#addUndirectedEdge('Murkwell Lane', 'Dawkin Lane');
        this.#addUndirectedEdge('Dawkin Lane', 'Soap Shop');
        this.#addUndirectedEdge("Lord's Road Central", 'Greengrocers');
        this.#addUndirectedEdge('Greengrocers', 'Twiddle Corner');
        this.#addUndirectedEdge("Merchant's Guild", 'North Player Market');
        this.#addUndirectedEdge("Merchant's Guild", 'West Player Market');
        this.#addUndirectedEdge("Merchant's Guild", 'South Player Market');

        this.#addDirectedEdge('Stony Ravine', 'Stony Gorge', 1.5);
        this.#addDirectedEdge('Stony Gorge', 'Stony Ravine');
        this.#addDirectedEdge('Stony Canyon', 'Cyclops Canyon');
        this.#addDirectedEdge('Cyclops Canyon', 'Stony Canyon', 1.5);
        this.#addDirectedEdge('Twiddle Corner', 'Dusty Alley', 1.5);
        this.#addDirectedEdge('Dusty Alley', 'Twiddle Corner');
        this.#addDirectedEdge('Dusty Corner', 'Morose Lane West');
        this.#addDirectedEdge('Morose Lane West', 'Dusty Corner', 1.5);

        for (let node of this.#graph.keys()) {
            this.#addDirectedEdge(node, 'Crenopolis Market Portal Stone', 1.5);
            this.#addDirectedEdge(node, 'Crenopolis Outskirts Portal Stone', 1.5);
        }
    }
}

export default new GPS();