const express = require("express");
const colors = require('colors')

//rest objects
const app = express();

//rest api

app.get("/", (req, res) => {
    res.send({ message: "welcome to donation application"
});

});

//port
const port = 8080;

//run list

app.listen(port, () =>{
    console.log(`server run on ${port}`.bgCyan.white);
});