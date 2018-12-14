const express = require('express');
const logger = require('morgan');
const redisClient = require('redis').createClient(6379, 'localhost');
const axios = require('axios');

redisClient.on('connect', () => console.log('Successfully connected to redis'));

const app = express();

app.use(logger('dev'));

app.get('/', (req, res) => {
    res.send(`<form action="/search" method="GET">
                <p>This project uses the <a href="https://jsonplaceholder.typicode.com">JSON placeholder API</a></p>
                <input type="number" placeholder="Type in a user ID e.g 1, 2, 3" name="uid" >
            </form>`);
});

app.get('/search', (req, res) =>{
    console.log(req.query.uid);
    const uid = req.query.uid.trim();
    const url = `https://jsonplaceholder.typicode.com/users/${uid}`;

    redisClient.get(`user:${uid}`, (err, result) => {
        if(result){
            console.log('Found on Redis')
            res.status(200).json({
                message: JSON.parse(result)
            });
        }else {
            console.log('Not found on redis, making a request');
            axios.get(url)
            .then(response => {
                console.log(response.data);
                // JSON.parse(response.data)
                if(response.data){
                    redisClient.set(`user:${uid}`, JSON.stringify(response.data), 'EX', 3600);
                    res.status(200).json({
                        result: response.data,
                        status:response.status
                    })
                }
            })
            .catch((err) => {
                console.log(`An error occured: ${err}`)
                res.send('Something went wrong')
            })
        }
    })
});

app.use((req, res, next) =>{
    res.send('The page you are requesting doesnt exist');
})

const server = app.listen(5000, () => console.log(`App started on port ${server.address().port}`));