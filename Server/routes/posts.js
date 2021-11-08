var express = require('express');
const bodyParser = require('body-parser');
const Post = require('../models/post');
const mongoose=require('mongoose');
var authenticate = require('../authenticate');

const postRouter=express.Router();
postRouter.use(bodyParser.json());

postRouter.get('/',(req,res,next)=>{
    Post.find({})
    .populate('author')
    .then((post)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json(post);
    },(err)=>next(err))
    .catch((err) => next(err));
    })

postRouter.post('/',authenticate.verifyUser, (req, res, next) => {
    req.body.author = req.user._id;
    console.log(req.body);
    Post.create(req.body)
    //let newComment = new Post({
    //     ...req.body,
    //     author: req.user._id
    //  });
     
    //  newComment.save()
    .then((post) => {
        console.log(post)
        Post.findById(post._id)
        
        .populate('author')
        .then((post)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(post);
        })
    }, (err) => next(err))
    .catch((err) => next(err));
})

postRouter.put('/',authenticate.verifyUser, (req,res) => {
    res.statusCode = 403;
    res.end('PUT is not supported in this version!');
})
postRouter.delete('/',authenticate.verifyUser, (req,res, next) => {
    Post.remove({})
    .then((post) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(post);
    }, (err) => next(err))
    .catch((err) => next(err));    
});


module.exports=postRouter;