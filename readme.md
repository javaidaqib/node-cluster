# Cluster in Node.js

Node.js is inherently single-threaded, meaning it can only execute one task at a time. This can become a bottleneck when dealing with high volumes of concurrent requests. Cluster mode in Node.js allows you to leverage multiple CPU cores by creating a parent process that spawns child processes. These child processes can then handle incoming requests independently, effectively distributing the workload and improving performance.

### Here's a breakdown of the cluster model:

- Parent Process:
  - Manages the lifecycle of child processes.
  - Listens for incoming connections on the server port.
  - Spawns child processes when needed to handle requests.
  - Distributes incoming requests to available child processes.
- Child Processes:
  - Each child process is a separate instance of the Node.js application.
  - Handle incoming requests independently.
  - Can communicate with the parent process for coordination (optional).

### Benefits of Clustering:

**Increased Scalability:** Distribute workloads across multiple CPU cores for better performance under high load.

**Improved Concurrency:** Handle multiple requests concurrently, enhancing responsiveness to clients.

**Error Isolation:** Issues in one child process won't crash the entire application. Other child processes can continue serving requests.

### Things to Consider:

**Complexity:** Managing multiple processes can add complexity to your application code.

**Debugging:** Debugging issues can be more challenging in a clustered environment.

**Memory Overhead:** Each child process has its own memory footprint, so consider resource limitations.

Overall, clustering is a powerful technique for scaling Node.js applications to handle heavy workloads efficiently. It's important to weigh the benefits against the added complexity to determine if it's the right approach for your specific needs.

# Load Test Results: Serial vs. Clustered Task

This Example compares the performance of a serial task and a clustered task using load testing.

## Single Cluster Process:

```sh
npx loadtest -c 8 --rps 50 -n 1000 http://localhost:6000/computationallyExpensiveRoute
```

- File: single-cluster.js
- Errors: 571 (total)
- Mean latency: 6955.9 ms
- Effective RPS: 22
- Completed Requests: 1000
- Test Duration: 45.95 seconds

## Multi-Cluster Process:

```sh
npx loadtest -c 8 --rps 50 -n 1000 http://localhost:6000/computationallyExpensiveRoute
```

- File: multi-cluster.js
- Errors: 0 (total)
- Mean Latency: 224.9 ms
- Effective RPS: 43
- Completed Requests: 1000
- Test Duration: 23.27 seconds

## Observations:

The multi-cluster task significantly outperforms the single cluster task in terms of both latency and request processing rate.
The multi-cluster task completed the test in nearly half the time of the single cluster task.
The single cluster task experienced a high number of errors (571), while the multi-cluster task had no errors.

## Conclusion:

These results demonstrate the benefits of using a clustered approach for handling high-load tasks. The clustered task achieved a faster processing rate (2x speed in this case), lower latency, and improved stability compared to the serial task.
