# yoshop

A full feature e-commerce app from scratch using MERN Stack.

I build this project by following [Brad Traversy](https://www.linkedin.com/in/bradtraversy/) Udemy course called [MERN eCommerce From Scratch](https://www.udemy.com/course/mern-ecommerce/). But I changed the code, folder structure, and logic in my own way. So it is not just another copy.

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
    -   [`Node v18`](https://nodejs.org/de/download/)
    -   [`MongoDB`](https://www.mongodb.com/try/download/community)
    -   `Yarn`
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
    $ cd backend
    $ yarn install
    $ cp .env.example .env
    ```
    ```sh
    $ cd ..
    $ cd frontend
    $ yarn install
    ```
    ```sh
    $ cd ..
    $ yarn install
    ```
-   Now start development
    ```sh
    $ yarn dev
    ```
