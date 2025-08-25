const express = require('express');
const app = express();

app.get('/test', (req, res) => {
    res.send('hello world');
})

const port = 3000;

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})