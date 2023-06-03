const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.redirect('/Home/index.html');
})

app.listen(3000, () => {
    console.log('Listening to 3000');
});