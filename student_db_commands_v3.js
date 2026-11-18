// Student Information Management System - MongoDB (mongosh)
use("studentDB");

db.createCollection("students", {validator: {$jsonSchema: {bsonType:"object", required:["studentId","name","email","department","year","cgpa"], properties:{studentId:{bsonType:"string"}, name:{bsonType:"string"}, email:{bsonType:"string"}, year:{bsonType:"number", minimum:1, maximum:4}, cgpa:{bsonType:"number", minimum:0, maximum:10}}}}});

db.students.insertMany([{studentId:"S101",name:"Piyush",email:"piyush@example.com",department:"CSE",year:2,cgpa:8.7,courses:["DBMS","OS"],address:{city:"Gurugram",state:"Haryana"}},{studentId:"S102",name:"Hemant",email:"hemant@example.com",department:"ECE",year:3,cgpa:9.2,courses:["DSP","VLSI"],address:{city:"Rohtak",state:"Haryana"}},{studentId:"S103",name:"Chirag",email:"chirag@example.com",department:"CSE",year:1,cgpa:7.5,courses:["C","Maths"],address:{city:"Jaipur",state:"Rajasthan"}},{studentId:"S104",name:"Himanshu",email:"himanshu@example.com",department:"ME",year:4,cgpa:8.3,courses:["Thermodynamics"],address:{city:"Noida",state:"Uttar Pradesh"}},{studentId:"S105",name:"Apsara",email:"apsara@example.com",department:"IT",year:2,cgpa:7.1,courses:["DBMS","Networks"],address:{city:"Dehradun",state:"Uttarakhand"}}]);

db.students.countDocuments();

db.students.find({department:"CSE"},{_id:0,studentId:1,name:1,cgpa:1});

db.students.find({cgpa:{$gt:8}},{_id:0,name:1,cgpa:1}).sort({cgpa:-1});

db.students.updateOne({studentId:"S103"},{$set:{cgpa:7.9}});

db.students.find({studentId:"S103"},{_id:0,name:1,cgpa:1});

db.students.deleteOne({studentId:"S105"});

db.students.countDocuments();

db.students.createIndex({studentId:1},{unique:true});

db.students.aggregate([{$group:{_id:"$department",total:{$sum:1},avgCgpa:{$avg:"$cgpa"}}},{$sort:{_id:1}}]);
