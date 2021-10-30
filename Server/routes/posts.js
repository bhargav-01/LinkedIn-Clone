var express = require('express');
const bodyParser = require('body-parser');
const Post = require('../models/post');
const mongoose=require('mongoose');
var authenticate = require('../authenticate');

const postRouter=express.Router();
postRouter.use(bodyParser.json());

postRouter.route('/')
.get((res,next)=>{
    Post.find({})
    .then((post)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json(post);
    },(err)=>next(err))
    .catch((err)=>next(err));
    })

.post(authenticate.verifyUser, (req, res, next) => {
    Post.create(req.body)
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser, (res) => {
    res.statusCode = 403;
    res.end('PUT is not supported in this version!');
})
.delete(authenticate.verifyUser, (res, next) => {
    Post.remove({})
    .then((res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(res);
    }, (err) => next(err))
    .catch((err) => next(err));    
});


module.exports=postRouter;