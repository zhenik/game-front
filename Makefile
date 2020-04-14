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
