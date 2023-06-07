import express from 'express';
import path from 'path';
import * as url from 'url';
// const express = require('express');
const app = express();
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
// const path = require('path');

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.redirect('/Home/index.html');
})

app.listen(3000, () => {
    console.log('Listening to 3000');
});