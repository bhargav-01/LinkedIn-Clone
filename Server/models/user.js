var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");


var User = new Schema({
  firstname: {
    type: String,
    defalut: "",
  },
  profile_image:{
    type: String,
    default: "",
  },
  background_image:{
    type: String,
    default: "",
  },
  lastname: {
    type: String,
    default: "",
  },
  headline:{
    type: String,
    default: "",
  },
  country:{
    type:String,
    default:"",
  },
  about:{
    type:String,
    default:"",
  },
  region:{
    type:String,
    default:"",
  },
  Education: [
    {
      Name_of_School: {
        type: String,
        // required: true,
      },
      Specialization:{
        type: String,
        default: "",
      },
      Degree: {
        type: String,
        default: "",
      },
      Start_Year: {
        type: String,
        default: "",
      },
      End_Year: {
        type: String,
        default: "",
      },
      activity:{
        type: String,
        default: "",
      },
      grade: {
        type: String,
        default: "",
      },
      description: {
        type: String,
        default: "",
      },
    },   
  ],
  Jobs: [
    {
      Employment_type:{
        type: String,
        // required: true,
      },
      Company_Name: {
        type: String,
        // required: true,
      },
      Position: {
        type: String,
        // required: true,
      },
      Description: {
        type: String,
        default: null,
      },
      Start_Year: {
        type: String,
        default: "",
      },
      Ending_Year: {
        type: String,
        default: "Present",
      },
    },
  ],
  Certification: [
    {
      name: {
        type: String,
        default: "",
      },
      organization:{
        type: String,
        default: "",
      },
      issueDate:{
        type: String,
        default: "",
      },
      cId:{
        type: String,
        default: "",
      },
      cURL:{
        type: String,
        default: "",
      }
    }
  ],
});

// User.plugin(passportLocalMongoose);
User.plugin(passportLocalMongoose, { usernameField: "email" });
module.exports = mongoose.model("User", User);
