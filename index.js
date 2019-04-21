/*
const fs = require('fs');

const data = `
Hello from NodeJs
I am random text
`;
const path = 'file.txt';
fs.writeFileSync(path, data);

let str = fs.readFileSync(path, {encoding: 'utf-8'});
console.log(str);

console.log('директория в которой расположен текущий файл',__dirname);
console.log('имя файла',__filename);*/


/**
* Код для работы вебсервера
**/
const express = require('express');
const bodyParser = require('body-parser');
const weatherRequest = require('./requests/weather.request');

const app = express();


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

const port = 8080;

app.get('/', (req, res) => {
    res.render('index', {weather: null, error: null});
});

app.post('/', async(req, res) => {
    const {city} = req.body;
    const {weather, error} =  await weatherRequest(city);
    res.render('index', {weather, error});
});

app.listen(port,()=>{
    console.log('server has started on port:', port);
});



