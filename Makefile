install:
	cd backend; yarn install; pwd
	cp backend/.env.example backend/.env
	cd frontend; yarn install; pwd
	yarn install

dev:
	yarn dev

clear:
	cd backend; rm -rf node_modules
	cd frontend; rm -rf node_modules
	rm -rf node_modules
	rm -rf frontend/dist
	rm backend/.env

seed:
	yarn run data:import

delete_seed:
	yarn run data:destroy
