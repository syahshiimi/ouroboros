start-temporal:
	docker compose -f docker-compose.temporal.yml up --build -d

start-feeder:
	docker compose -f docker-compose.feeder.yml up --build -d

stop:
	ddocker compose -f docker-compose.temporal.yml -f docker.compose.feeder.yml down

stop-temporal:
	docker compose -f docker-compose.temporal.yml down

stop-feeder:
	docker compose -f docker-compose.feeder.yml down

