install:
	cd backend; yarn install; pwd
	cp backend/.env.example backend/.env
	cd frontend; yarn install; pwd
	yarn install

dev:
	yarn dev
