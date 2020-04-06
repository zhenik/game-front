.PHONY: u d s rm logs

u:
	docker-compose up -d frontend-ocn
s:
	docker-compose stop frontend-ocn
rm:
	docker-compose rm frontend-ocn
d: s rm
logs:
	docker-compose logs -f frontend-ocn
