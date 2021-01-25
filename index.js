var express = require('express');

var mongoClient = require('mongodb').MongoClient;

var db;

mongoClient.connect('mongodb://localhost:27017',function(err,client){
    if(err) throw err;

     db = client.db('school');


});

var app = express();

app.get('/create',function(req,res){
    db.collection('students').insert({name: "Mohan",age: 22,gender: "male"},function(err,result){
        if (err){
            throw err;
        }
        res.json("Added");
    });

});


app.get('/get/students',function(req,res){
    db.collection('students').find().toArray(function(err,result){
        if (err){
            throw err;
        }
        res.json(result);
    });
    
});

app.get('/get/subject',function(req,res){
    db.collection('subject').find().toArray(function(err,result){
        if (err){
            throw err;
        }
        res.json(result);
    });
    
});

app.get('/update',function(req,res){  db.collection('students').update(
    {name: "Rahul"},
    {$set:{name: "Raj", age: 17,hometown: "gurgaon"}},
    function(err,result){
    if (err){
        throw err;
    }
    res.json("Updated");
});
});


app.get('/delete',function(req,res){
    db.collection('students').deleteOne({name: "Mohan"},function(err,result){
        if (err){
            throw err;
        }
        res.json("Deleted");
    });

});

app.listen(3000);