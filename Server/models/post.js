var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

const Like = new Schema({
  userID:{
    type:String
  }
})

const Post = new Schema({
    author: {
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'  
      },
    description: {
      type: String,
      default:""
      },
    image:   {
      type: String,
      default:'',
    },
    comments:{
      type: String
    },
    featured:{
      type: String,
    },
    likes:[

      // userIDs: {
      {  type:mongoose.Schema.Types.ObjectId,
        ref:'User'
      }
    ],
    comments:[
      {
          comment:{
            type:String
          },
          author: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'  
          },
          time:{
            type:String
          }

      }
    ]
});

Post.plugin(passportLocalMongoose);
module.exports = mongoose.model('Post', Post);