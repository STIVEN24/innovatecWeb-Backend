- Create package.json
    > npm init --yes
- Install dependencies
    > npm i express morgan cors pg md5
- Install nodemon | mode developer
    > npm i nodemon -D
- Config in package.json
    > "scripts": {
    >   "start": "node src/index.js",
    >   "dev": "nodemon src/index.js"
    > },
- Creation of the index.js file in the src folder
- Run nodemon
    > npm run dev
- Creation of the folder routes
- Creation of the folder controllers
- Creation of the folder db