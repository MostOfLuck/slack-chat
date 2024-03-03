lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

deploy:
	git push heroku main

start:
	make start-backend & make start-frontend
<<<<<<< HEAD



=======
>>>>>>> 6b7c67145332ce9ae022be2870e7bbdfbbe98662
