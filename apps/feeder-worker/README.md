# Feeder-Worker

The temporal worker service is an application that executes a task.

It is fundamentally a worker service that 

1. Connects to a temporal server
2. Subscribes to a task queue, awaiting new jobs (workflows) that are placed in the task queue.


## Dependencies
1. @temporalio/worker – the main dependency providing the necessary worker execution logic
2. @ouroboros/workflows – workflows which contain the necessary business logic.


## Refenreces
[What is a Temporal Worker?](https://docs.temporal.io/workers)

