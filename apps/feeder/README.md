# Feeder
In the most conceptual sense, the feeder is the agent that feeds the ouroboros, the conceptual engine that drives the way we wish to think  about artworks being produced through events. These artworks however, are not exactly envisioned as visual outputs, rather, as behaviours as a consequence of events that happened in real-life.

For the most part, the *feeder's* role as the name suggest is to *feed* the ouroboros. The ouroboros is a self-induced, self-eating, self-fulfilling prophecy on modelling forecasting the weather through data as the source of truth. 

Acting as the source of truth, these data points can be used to drive specific behaviours and therefore *events*. 

## Run locally

### Running a workflow.
All workflows are instantiated through the REST API, defined through the HonoJS route handlers. These handlers are defined in `/src/routes/handlers`.  

In `src/routes/handlers/workflow.ts` we define a handler that starts a workflow client binding to a specific workflow via the callback function. Ideally each route handler should be handling a singular workflow though at the moment, we only have a generic `/workflow` route for the `feederFlow` defined in `/src/routes/domains/temporal/workflow/` directory.

### Running via Docker
This is very useful if the intention is to execute the workflow and see its interaction and orchestration in a temporal environment consisting of the temporal service database, admin tools, ui etc. It is the highly recommended way to test things.

In the Makefile there are two commands pointing to two `docker-compose` YAML.

1. `docker-compose.feeder.yml` spins up the necessary `feeder-worker` service and the HonoJS REST API `feeder-api` which is effectively what the `feeder` dir is for.
2. `docker-compose.temporal.yml` spins up the necessary temporal services.

#### Steps.
1. Spin up the Temporal services
```bash
make start-temporal
```

2. Spin up the temporal worker
```sh
make start-worker
```

3. (Optional) Start both the `feeder-api` service and the `feeder-worker`
```bash
make start-feeder
```

## Temporal Worker vs NodeJS Application.

> Why do we need to spin up a separate worker task?

The temporal worker is a separate service that instantiates a compact, V8 isolate that listens to a job that gets sent into the Temporal task queue. The worker is responsible for executing the task and aims to be deterministic  

This provides the advantage by decoupling the state, business logic and the execution of that business logic from the Temporal server itself, allowing us to spin up multiple workers that can listen to the same workflows and task queue without being coupled to the state of the Temporal service.
