var express = require('express');
var app = express();
var axios = require('axios');

app.get('/:city', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + req.params.city + '&units=metric&appid=68bb579fe72dab3a95c4e839a3bb881e')
        .then(function (answer) {
            res.status(200).send(answer.data);
    }).catch(function (error) {
        if (error) {
            res.status(404).send(error);
        }
    });
});

app.get('/pokemon/:type', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    axios.get('https://pokeapi.co/api/v2/type/' + req.params.type).then(function (answer) {
        var items = answer.data.pokemon;
        res.status(200).send(random_item(items));
    }).catch(function (error) {
        if (error) {
            res.status(404).send(error);
        }
    });
});

app.get('/pokemon/details/:id', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    axios.get('https://pokeapi.co/api/v2/pokemon/' + req.params.id + '/').then(function (answer) {
        res.status(200).send(answer.data);
    }).catch(function (error) {
        if (error) {
            res.status(404).send(error);
        }
    });
});

function random_item(items) {
    return items[Math.floor(Math.random() * items.length)];
}

app.listen(8081, function () {
    console.log('service running on http://localhost:8081 ...');
});