const express = require("express");
const fs = require("fs");
const path = require("path")
const app = express();
const PORT = 8080;
app.use(express.urlencoded({extended: true}));
app.use(express.json());

let characters = [{
    name: "jack sparrow",
    actor: "johnny depp",
    movieName: "Pirates of the Carribean"
}, {
    name: "the joker",
    actor: "Heith Ledger",
    movieName: "The Dark Knight"
}, {
    name: "yoda",
    actor: "Frank Oz",
    movieName: "star wars"
}]

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/:character", (req, res)=>{
    let searchTerm = req.params.character;
    console.log(searchTerm);
    for (let i = 0; i < characters.length; i++) {
        if (characters[i].name == searchTerm) {
            res.json(characters[i]);
        }
    }
    res.end("no search results. Add it in!");
});

app.get("/api/", (req, res) => {
    res.json(characters);
});

app.post("/add", (req, res)=>{
    let newCharacter = req.body;
    characters.push(newCharacter);
    res.end();
});



app.listen(PORT, ()=>{
    console.log(`server listening at PORT: ${PORT}`)
})