var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var profile= new Schema({

  Education: [
    {
      Name_of_School:{
        type:String,
        required:true 
      },
      Degree:{
        type:String,
        default:""
      },
      Start_Year:{
        type:String,
        default:""
      },
      Ending_Year:{
        type:String,
        default:""
      }

    }
  ],
  Jobs: [
    {
      Company_Name:{
        type: String,
        required:true
      },
      Position:{
        type:String,
        required:true
      },
      Description:{
        type:String,
        default:null
      },
      Start_Year:{
        type:String,
        default:""
      },
      Ending_Year:{
        type:String,
        default:"Present"
      }
    }
  ],
  Achievements:[
    {
      Certificate:{
        type:String,
        default:"" 
      }
    }
  ]
});

var User = new Schema({
    firstname: {
      type: String,
      defalut:'',  
      },
    lastname: {
      type: String,
      default:""
      },
    email:   {
      type: String,
      default:'',
      unique:true
    },
    profile:{
      type:profile
    }
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);