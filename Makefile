# Define the function to get the branch name
define get_branch
$(shell git rev-parse --abbrev-ref HEAD)
endef

# Store the branch name in a variable
GIT_BRANCH := $(call get_branch)

build-feeder-worker:
	docker build -f apps/feeder-worker/Dockerfile -t syahshiimi/ouroboros-feeder-worker:${GIT_BRANCH} .

build-feeder-api:
	docker build -f apps/feeder/Dockerfile -t syahshiimi/ouroboros-feeder-api:$(GIT_BRANCH) .

build-weathercore:
	docker build -f apps/weathercore/Dockerfile -t syahshiimi/ouroboros-weathercore:${GIT_BRANCH} .

push-feeder-api:
	docker push syahshiimi/ouroboros-feeder-api:${GIT_BRANCH}

push-feeder-worker:
	docker push syahshiimi/ouroboros-feeder-worker:${GIT_BRANCH}

push-weathercore:
	docker push syahshiimi/ouroboros-weathercore:${GIT_BRANCH}
