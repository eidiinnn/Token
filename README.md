# Token API
Simple refresh token API project.

## Usage
Create a file named `.env` and put your MongoDB server. I make an example on a file called `.env.example`.  If you will use Docker, you need to put this on `.env`.
````
DB_URI=mongodb://172.17.0.1:27017/token
````


## Start with Docker
````
npm i 
docker-compose up -d 
````

## Start without Docker
````
npm i
npm start
````

## How to use the API
I recommend Insomnia to use the API services. you can download it at this [link](https://insomnia.rest/).
### Generate a new token
Using the `/tokenGenerate` .
### Verify the token
Uses the `/verify` with a JSON generated from `/tokenGenerate` and if one of the tokens expires the API will return a new token else its be will return access granted message.
