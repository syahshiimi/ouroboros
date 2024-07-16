# Define the function to get the branch name
define get_branch
$(shell git rev-parse --abbrev-ref HEAD | sed 's/[^a-zA-Z0-9._-]/-/g')
endef

# Store the branch name in a variable
GIT_BRANCH := $(call get_branch)

# weathercore
build-weathercore-amd64:
	docker build -f apps/weathercore/Dockerfile -t syahshiimi/ouroboros-weathercore:${GIT_BRANCH}-amd64 --platform linux/amd64 .

build-weathercore-aarch64:
	docker build -f apps/weathercore/Dockerfile -t syahshiimi/ouroboros-weathercore:${GIT_BRANCH}-aarch64 --platform linux/arm64 .

build-weathercore:
	docker build -f apps/weathercore/Dockerfile -t syahshiimi/ouroboros-weathercore:${GIT_BRANCH}-amd64 --platform linux/amd64 .
	docker build -f apps/weathercore/Dockerfile -t syahshiimi/ouroboros-weathercore:${GIT_BRANCH}-aarch64 --platform linux/arm64 .

push-weathercore-amd64:
	docker push syahshiimi/ouroboros-weathercore:${GIT_BRANCH}-amd64

push-weathercore-aarch64:
	docker push syahshiimi/ouroboros-weathercore:${GIT_BRANCH}-aarch64

push-weathercore:
	docker push syahshiimi/ouroboros-weathercore:${GIT_BRANCH}-amd64
	docker push syahshiimi/ouroboros-weathercore:${GIT_BRANCH}-aarch64

build-manifest-weathercore:
	docker manifest create \
		syahshiimi/ouroboros-weathercore:${GIT_BRANCH} \
		--amend syahshiimi/ouroboros-weathercore:${GIT_BRANCH}-amd64 \
		--amend syahshiimi/ouroboros-weathercore:${GIT_BRANCH}-aarch64

inspect-manifest-weathercore:
	docker manifest inspect syahshiimi/ouroboros-weathercore:${GIT_BRANCH}

push-manifest-weathercore:
	docker manifest push syahshiimi/ouroboros-weathercore:${GIT_BRANCH}

# weathercore-migrations
build-weathercore-migrations-amd64:
	docker build -f packages/weathercore-database/Dockerfile -t syahshiimi/ouroboros-weathercore-migrations:${GIT_BRANCH}-amd64 --platform linux/amd64 .

build-weathercore-migrations-aarch64:
	docker build -f packages/weathercore-database/Dockerfile -t syahshiimi/ouroboros-weathercore-migrations:${GIT_BRANCH}-aarch64 --platform linux/arm64 .

build-weathercore-migrations:
	docker build -f packages/weathercore-database/Dockerfile -t syahshiimi/ouroboros-weathercore-migrations:${GIT_BRANCH}-amd64 --platform linux/amd64 .
	docker build -f packages/weathercore-database/Dockerfile -t syahshiimi/ouroboros-weathercore-migrations:${GIT_BRANCH}-aarch64 --platform linux/arm64 .

push-weathercore-migrations-amd64:
	docker push syahshiimi/ouroboros-weathercore-migrations:${GIT_BRANCH}-amd64

push-weathercore-migrations-aarch64:
	docker push syahshiimi/ouroboros-weathercore-migrations:${GIT_BRANCH}-aarch64

push-weathercore-migrations:
	docker push syahshiimi/ouroboros-weathercore-migrations:${GIT_BRANCH}-amd64
	docker push syahshiimi/ouroboros-weathercore-migrations:${GIT_BRANCH}-aarch64

build-manifest-weathercore-migrations:
	docker manifest create \
		syahshiimi/ouroboros-weathercore-migrations:${GIT_BRANCH} \
		--amend syahshiimi/ouroboros-weathercore-migrations:${GIT_BRANCH}-amd64 \
		--amend syahshiimi/ouroboros-weathercore-migrations:${GIT_BRANCH}-aarch64

inspect-manifest-weathercore-migrations:
	docker manifest inspect syahshiimi/ouroboros-weathercore-migrations:${GIT_BRANCH}

push-manifest-weathercore-migrations:
	docker manifest push syahshiimi/ouroboros-weathercore-migrations:${GIT_BRANCH}

# feeder-api
build-feeder-api-amd64:
	docker build -f apps/feeder/Dockerfile -t syahshiimi/ouroboros-feeder-api:${GIT_BRANCH}-amd64 --platform linux/amd64 .

build-feeder-api-aarch64:
	docker build -f apps/feeder/Dockerfile -t syahshiimi/ouroboros-feeder-api:${GIT_BRANCH}-aarch64 --platform linux/arm64 .

build-feeder-api:
	docker build -f apps/feeder/Dockerfile -t syahshiimi/ouroboros-feeder-api:${GIT_BRANCH}-amd64 --platform linux/amd64 .
	docker build -f apps/feeder/Dockerfile -t syahshiimi/ouroboros-feeder-api:${GIT_BRANCH}-aarch64 --platform linux/arm64 .

push-feeder-api-amd64:
	docker push syahshiimi/ouroboros-feeder-api:${GIT_BRANCH}-amd64

push-feeder-api-aarch64:
	docker push syahshiimi/ouroboros-feeder-api:${GIT_BRANCH}-aarch64

push-feeder-api:
	docker push syahshiimi/ouroboros-feeder-api:${GIT_BRANCH}-amd64
	docker push syahshiimi/ouroboros-feeder-api:${GIT_BRANCH}-aarch64
	
build-manifest-feeder-api:
	docker manifest create \
		syahshiimi/ouroboros-feeder-api:${GIT_BRANCH} \
		--amend syahshiimi/ouroboros-feeder-api:${GIT_BRANCH}-amd64 \
		--amend syahshiimi/ouroboros-feeder-api:${GIT_BRANCH}-aarch64

inspect-manifest-feeder-api:
	docker manifest inspect syahshiimi/ouroboros-feeder-api:${GIT_BRANCH}

push-manifest-feeder-api:
	docker manifest push syahshiimi/ouroboros-feeder-api:${GIT_BRANCH}

# feeder-worker
build-feeder-worker:
	docker build -f apps/feeder-worker/Dockerfile -t syahshiimi/ouroboros-feeder-worker:${GIT_BRANCH} .

push-feeder-worker:
	docker push syahshiimi/ouroboros-feeder-worker:${GIT_BRANCH}

build-feeder-worker-amd64:
	docker build -f apps/feeder-worker/Dockerfile -t syahshiimi/ouroboros-feeder-worker:${GIT_BRANCH}-amd64 --platform linux/amd64 .

build-feeder-worker-aarch64:
	docker build -f apps/feeder-worker/Dockerfile -t syahshiimi/ouroboros-feeder-worker:${GIT_BRANCH}-aarch64 --platform linux/arm64 .

build-feeder-worker:
	docker build -f apps/feeder-worker/Dockerfile -t syahshiimi/ouroboros-feeder-worker:${GIT_BRANCH}-amd64 --platform linux/amd64 .
	docker build -f apps/feeder-worker/Dockerfile -t syahshiimi/ouroboros-feeder-worker:${GIT_BRANCH}-aarch64 --platform linux/arm64 .

push-feeder-worker-amd64:
	docker push syahshiimi/ouroboros-feeder-worker:${GIT_BRANCH}-amd64

push-feeder-worker-aarch64:
	docker push syahshiimi/ouroboros-feeder-worker:${GIT_BRANCH}-aarch64

push-feeder-worker:
	docker push syahshiimi/ouroboros-feeder-worker:${GIT_BRANCH}-amd64
	docker push syahshiimi/ouroboros-feeder-worker:${GIT_BRANCH}-aarch64
	
build-manifest-feeder-worker:
	docker manifest create \
		syahshiimi/ouroboros-feeder-worker:${GIT_BRANCH} \
		--amend syahshiimi/ouroboros-feeder-worker:${GIT_BRANCH}-amd64 \
		--amend syahshiimi/ouroboros-feeder-worker:${GIT_BRANCH}-aarch64

inspect-manifest-feeder-worker:
	docker manifest inspect syahshiimi/ouroboros-feeder-worker:${GIT_BRANCH}

push-manifest-feeder-worker:
	docker manifest push syahshiimi/ouroboros-feeder-worker:${GIT_BRANCH}
