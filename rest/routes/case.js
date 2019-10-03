const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

const router = express.Router();

// GET home page. 
router.get('/', (req, res, next) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
        if (err) throw err;
        const dbObject = db.db("testDB");
        /*
        first parameter of the find() method is a query object (in this example empty), 
        and is also used to limit the search e.g. { address: "Park Lane 38" }
        second parameter of the find() method is the projection object that describes which fields to include
        e.g. , { projection: { _id: 0, name: 1, address: 1 } }
        */
        dbObject.collection("cases").findOne({ name: 'Festplatte' }, (err, result) => {
            if (err) throw err;
            res.render('case', { cases: result });

        }, (err) => {
            db.close();
        });
    });
});


router.get('/url', (req, res, next) => {

    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    
});


module.exports = router;