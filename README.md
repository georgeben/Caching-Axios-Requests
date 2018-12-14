# Caching-Axios-Requests
This project demonstrates how to cache your axios requests with Redis

## Intro
Axios is a Promise based HTTP client for the browser and node.js. In simple english, its used to make HTTP requests.
This project uses [Redis](https://redis.io/) to cache the results of your axios requests, which reduces the response time when 
users make a subsequest request. This project uses the [JSON Placeholder API](https://jsonplaceholder.typicode.com). The response of an initial  request
to the JSON Placeholder API took 1682.411ms. After that, the response was cached with Redis and subsequest requests to API took 3.480ms.
Cool right? Faster response means happy users :dancer:

## Getting started
- Clone this repo
- `cd` into the repo
- Run `npm install` to install dependencies
- Run `npm start ` to start up the server
- Open your browser and enter the url `localhost:5000`
- Make a reuest twice and check your logs for the difference in response time.
- Thats all

## Author
Your's truly [George Ben](https://twitter.com/BenGtheonly) :smile:
