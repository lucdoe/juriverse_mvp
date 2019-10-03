const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const bodyParser = require('body-parser');

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// GET home page. 
router.get('/', (req, res) => {
    res.render('upload');
});


router.post('/insert', urlencodedParser, (req, res) => {

    MongoClient.connect(url, (err, db) => {

        if (err) throw err;
        const dbObject = db.db("testDB");

        const objToInsert = {
            author: req.body.authorName,
            name: req.body.caseName,
            content: req.body.caseContent,
            question: req.body.caseQuestion,
            solution: req.body.caseSolution
        };

        // first parameter of the insertOne() method is an object containing 
        // value(s) of each field in the document (docToInsert)
        dbObject.collection("cases").insertOne(objToInsert, (err, result) => {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
            res.render('upload');

        });
    });
});

module.exports = router;