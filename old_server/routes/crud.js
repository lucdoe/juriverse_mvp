const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;
const url = "mongodb://localhost:27017/";
const bodyParser = require('body-parser');


// GET home page. 
router.get('/', (req, res) => {
    res.render('crud');
});

router.get('/test', (req, res) => {
    res.json({"test": "test"});
});


// creating document
router.post('/create', (req, res) => {
    // req argument that represents the request from the client, as an object and 
    // has a property called "url" which holds the part of the url that comes after the domain name

    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const dbObject = db.db("testDB");

        const objToInsert = {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        };
        // first parameter of the insertOne() method is an object containing 
        // value(s) of each field in the document (docToInsert)
        dbObject.collection("testData").insertOne(objToInsert, (err, result) => {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
            res.render('crud');
        });
    });
});


// read document
router.get('/read', (req, res, next) => {

    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const dbObject = db.db("testDB");
        /*
        first parameter of the find() method is a query object (in this example empty), 
        and is also used to limit the search e.g. { address: "Park Lane 38" }
        second parameter of the find() method is the projection object that describes which fields to include
        e.g. , { projection: { _id: 0, name: 1, address: 1 } }
        */
        dbObject.collection("testData").find({}).toArray((err, result) => {
            if (err) throw err;
        }, () => {
            db.close();
            res.render('crud', { items: result });
        });
    });
});


// update document
router.post('/update', (req, res) => {

    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const dbObject = db.db("testDB");

        const docToUpdate = {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        };
        var _id = req.body.id;

        dbObject.collection("testData").updateOne({ "_id": objectId(_id) }, { $set: docToUpdate }, (err, result) => {
            if (err) throw err;
            console.log("1 document updated");
            db.close();
            res.render('crud');
        });
    });
});


// delete document
router.post('/delete', (req, res) => {

    const idForDocToDelete = req.body._id;

    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const dbObject = db.db("testDB");

        dbObject.collection("testData").deleteOne({ "_id": objectId(idForDocToDelete) }, (err, obj) => {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
            res.render('crud')
        });
    });
});


module.exports = router;