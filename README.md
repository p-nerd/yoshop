# yoshop

A full feature e-commerce cart app from scratch using MERN and Redux Stack.

I build this project by following [Brad Traversy](https://www.linkedin.com/in/bradtraversy/) Udemy course called [MERN eCommerce From Scratch](https://www.udemy.com/course/mern-ecommerce/).
But I changed the code, folder structure, and logic in my own way.
So it is not just another copy.
After finishing half of the course almost every time, I implement stuff before watching the video.
After implementing I watched that video correct the code if needed and do the necessary change.
Most of the time it seemed to change very evenly.
So again it is not just another copy.

## The app is running in Heroku on production mode

-   https://yoshop-shihab.herokuapp.com
-   In production the has three user
    -   Admin User: `admin@example.com` Password: `123456`
    -   Normal User 1: `john@example.com` Password: `123456`
    -   Normal User 2: `jane@example.com` Password: `123456`

## Links

-   https://www.linkedin.com/in/bradtraversy
-   https://github.com/bradtraversy/proshop_mern
-   https://www.udemy.com/course/mern-ecommerce

## Tech Stack

-   Programming Language:
    -   JavaScript
-   Backend:
    -   App Server: Express (Node)
    -   Database: Mongoose (MongoBD)
-   Frontend:
    -   UI Library: React
    -   State Management: Redux
    -   Styling: React Bootstrap
    -   HTTP Client: Axios
    -   Build Tool: Vite

## Start Development Server

-   First install
    -   [`Node v16`](https://nodejs.org/de/download/)
    -   [`MongoDB`](https://www.mongodb.com/try/download/community)
    -   `Yarn`
    -   [`Make`](<https://en.wikipedia.org/wiki/Make_(software)>)
-   Check softwares existence
    ```sh
    $ node -v
    $ npm -v
    $ npm i -g yarn
    $ yarn -v
    ```
-   Second clone the repo
    ```sh
    $ git clone https://github.com/shh26b/yoshop.git
    $ cd yoshop
    ```
-   Install Dependencies
    ```sh
    $ make install
    ```
    or
    ```sh
    $ cd backend
    $ yarn install
    $ cp .env.example .env
    $ cd ..
    $ cd frontend
    $ yarn install
    $ cd ..
    $ yarn install
    ```
-   Seeding development data
    ```
    $ make seed
    ```
    or
    ```
    $ yarn run data:import
    ```
-   Now start development
    ```sh
    $ make dev
    ```
    or
    ```sh
    $ yarn dev
    ```
