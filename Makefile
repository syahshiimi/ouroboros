build-feeder-worker:
	docker build -f apps/feeder-worker/worker.Dockerfile -t ouroboros/feeder-worker:latest .

build-feeder-api:
	docker build -f apps/feeder/api.Dockerfile -t ouroboros/feeder-api:latest .
