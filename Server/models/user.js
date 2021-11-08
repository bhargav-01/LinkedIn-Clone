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
  Experience: [
    {
      employment_type:{
        type: String,
        required: true,
      },
      companyname: {
        type: String,
        required: true,
      },
      location:{
        type: String,
        default: "",
      },
      title: {
        type: String,
        default: "",
      },
      startDate: {
        type: String,
        default: "",
      },
      endDate: {
        type: String,
        default: "Present",
      },
      description:{
        type: String,
        default: "",
      }
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
  Courses:[
    {
      course:{
        type: String,
        default: "",
      },
      courseId:{
        type: String,
        default: "",
      }
    }
  ],
  Languages:[
    {
      language:{
        type: String,
        default: "",
      },
      proficiency:{
        type: String,
        default: "",
      }
    }
  ],
  Projects:[
    {
      project:{
        type: String,
        default: "",
      },
      startDate:{
        type: String,
        default: "",
      },
      endDate:{
        type: String,
        default: "Present",
      },
      projectURL:{
        type: String,
        default: "Present",
      },
      description:{
        type: String,
        default: "Present",
      },
    }
  ],

});

// User.plugin(passportLocalMongoose);
User.plugin(passportLocalMongoose, { usernameField: "email" });
module.exports = mongoose.model("User", User);
