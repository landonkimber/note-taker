const express = require('express');
const path = require('path');
const noteData = require('./db/db.json');

//TO DO, ADD || OR CODE TO GET HERUKO PORT
const PORT = 3001

const app = express();

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    console.log(res.json(noteData));
});


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
  