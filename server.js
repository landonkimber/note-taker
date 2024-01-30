const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const PORT = 3001;

const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

function getData() {
  let data = fs.readFileSync('./db/db.json');
  let parsedData = JSON.parse(data);
  return parsedData;
}


//API ROUTES
app.get("/api/notes", (req, res) => {
  res.json(getData());
});
app.post("/api/notes", (req, res) => {
  let arr = getData();

  arr.push({
    id: uuidv4(),
    title: req.body.title,
    text: req.body.text,
  })
  fs.writeFileSync('./db/db.json', JSON.stringify(arr));
  res.json(arr);
});
app.delete("/api/notes/:id", (req, res) => {
  let arr = getData();

  for (let i = 0; i < arr.length; i++) {
    if (req.params.id == arr[i].id) {
      arr.splice(i, 1);
    }
  }
  fs.writeFileSync('./db/db.json', JSON.stringify(arr));
  res.json(arr);
});

//HTML ROUTES
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});
app.use((req, res) => {
  res.status(404).send('Page not found');
});

//START SERVER
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
