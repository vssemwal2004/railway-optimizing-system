class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }

  dequeue() {
    return this.values.shift();
  }

  isEmpty() {
    return this.values.length === 0;
  }

  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

function dijkstra(graph, start, end, busy) {
  let distances = {};
  let previous = {};
  let nodes = new PriorityQueue();
  let visited = new Set();

  // Initialize all distances to Infinity and set the start node distance to 0
  for (let vertex in graph) {
    if (vertex === start) {
      distances[vertex] = 0;
      nodes.enqueue(vertex, 0);
    } else {
      distances[vertex] = Infinity;
      nodes.enqueue(vertex, Infinity);
    }
    previous[vertex] = null;
  }

  while (!nodes.isEmpty()) {
    let smallest = nodes.dequeue().val;

    // If the smallest node is already visited, skip processing
    if (visited.has(smallest)) continue;

    visited.add(smallest);

    // If we reach the destination, reconstruct the path
    if (smallest === end) {
      let path = [];
      let totalDistance = distances[smallest];
      while (previous[smallest]) {
        path.push(smallest);
        smallest = previous[smallest];
      }
      path.push(start);
      return { path: path.reverse(), distance: totalDistance };
    }

    // If the current node's distance is Infinity, we can't reach this node
    if (smallest || distances[smallest] !== Infinity) {
      for (let [neighbor, weight] of graph[smallest]) {
        // Skip busy stations
        if (busy.includes(neighbor)) {
          continue;
        }

        let alt = distances[smallest] + weight;
        if (alt < distances[neighbor]) {
          distances[neighbor] = alt;
          previous[neighbor] = smallest;
          nodes.enqueue(neighbor, alt);
        }
      }
    }
  }

  // Return "No valid path" if no path is found
  return { path: [], distance: "No valid path found. The destination is unreachable or blocked by busy stations." };
}

module.exports = { dijkstra };
