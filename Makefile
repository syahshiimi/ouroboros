# Define the function to get the branch name
define get_branch
$(shell git rev-parse --abbrev-ref HEAD | sed 's/[^a-zA-Z0-9._-]/-/g')
endef

# Store the branch name in a variable
GIT_BRANCH := $(call get_branch)

create-builder:
	docker buildx create --name mybuilder --use --bootstrap

build-weathercore:
	docker buildx build --platform linux/amd64,linux/arm64 \
		-f apps/weathercore/Dockerfile \
		-t syahshiimi/ouroboros-weathercore:${GIT_BRANCH} \
		--push .

build-weathercore-migrations:
	docker buildx build --platform linux/amd64,linux/arm64 \
		-f packages/weathercore-database/Dockerfile \
		-t syahshiimi/ouroboros-weathercore-migrations:${GIT_BRANCH} \
		--push .

build-feeder-api:
	docker buildx build --platform linux/amd64,linux/arm64 \
		-f apps/feeder/Dockerfile \
		-t syahshiimi/ouroboros-feeder-api:${GIT_BRANCH} \
		--push .

build-feeder-worker:
	docker buildx build --platform linux/amd64,linux/arm64 \
		-f apps/feeder-worker/Dockerfile \
		-t syahshiimi/ouroboros-feeder-worker:${GIT_BRANCH} \
		--push .

build-agents:
	docker buildx build --platform linux/amd64,linux/arm64 \
		-f apps/agents-merchants/Dockerfile \
		-t syahshiimi/ouroboros-agents:${GIT_BRANCH} \
		--build-arg MARKET_PARTICIPANT=agents \
		--push .

build-merchants:
	docker buildx build --platform linux/amd64,linux/arm64 \
		-f apps/agents-merchants/Dockerfile \
		-t syahshiimi/ouroboros-merchants:${GIT_BRANCH} \
		--build-arg MARKET_PARTICIPANT=merchants \
		--push .
