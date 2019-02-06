DOCKER_IMAGE=719164424367.dkr.ecr.ap-southeast-2.amazonaws.com/presentation-layer-development:battleship
all:
	docker build -t ${DOCKER_IMAGE} .
	docker push ${DOCKER_IMAGE}
