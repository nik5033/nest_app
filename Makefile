include .env
export $(shell sed 's/=.*//' .env)

dev-server:
	mkdir -p ./docker-data
	sudo docker-compose up -d postgres
	yarn dev