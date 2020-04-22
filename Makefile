.PHONY: run sleep10 db backend stop status

run: db sleep10 backend

sleep10:
	sleep 10
db:
	docker-compose up -d mongo
backend:
	docker-compose up -d backend-ocn
stop:
	docker-compose stop
status:
	docker-compose ps
rm:
	docker-compose stop frontend-ocn-game-on
	docker-compose stop frontend-ocn-game-off
	docker-compose rm frontend-ocn-game-off
	docker-compose rm frontend-ocn-game-on
rmi:
	docker rmi $$(docker images -a -q)
b: b-off b-on
b-off:
	docker-compose build frontend-ocn-game-off
b-on:
	docker-compose build frontend-ocn-game-on
up-off:
	docker-compose up -d frontend-ocn-game-off
up-on:
	docker-compose up -d frontend-ocn-game-on
