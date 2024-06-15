# Feeder
In the most conceptual sense, the feeder is the agent that feeds the ouroboros, the conceptual engine that drives the way we wish to think  about artworks being produced through events. These artworks however, are not exactly envisioned as visual outputs, rather, as behaviours as a consequence of events that happened in real-life.

For the most part, the *feeder's* role as the name suggest is to *feed* the ouroboros. The ouroboros is a self-induced, self-eating, self-fulfilling prophecy on modelling forecasting the weather through data as the source of truth. 

Acting as the source of truth, these data points can be used to drive specific behaviours and therefore *events*. 

## Run locally

1. First we need to spin up the temporal containers through Docker.

```bash
docker compose up --build
```

2. Then, we spin up the HonoJS application which is the REST API interface.
```bash
pnpm dev --filter=@ouroboros/feeder
```

3. Finally, spin up the Temporal Worker.
```bash
cd apps/feeder
pnpm start:worker
```

## Running a workflow.
All workflows are instantiated through the REST API, defined through the HonoJS route handlers. These handlers are defined in `/src/routes/handlers`.  

In `src/routes/handlers/workflow.ts` we define a handler that starts a workflow client binding to a specific workflow via the callback function. Ideally each route handler should be handling a singular workflow though at the moment, we only have a generic `/workflow` route for the `feederFlow` defined in `/src/routes/domains/temporal/workflow/` directory.

## Temporal Worker vs NodeJS Application.

> Why do we need to spin up a separate worker task?

The temporal worker is a separate service that instantiates a compact, V8 isolate that listens to a job that gets sent into the Temporal task queue. The worker is responsible for executing the task and aims to be deterministic  

This provides the advantage by decoupling the state, business logic and the execution of that business logic from the Temporal server itself, allowing us to spin up multiple workers that can listen to the same workflows and task queue without being coupled to the state of the Temporal service.
