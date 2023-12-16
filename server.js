// jshint esversion:6
const mongoose = require('mongoose');
const express = require("express");
const bodyParser=require("body-parser");
const ejs = require("ejs");
require('dotenv').config();
const app=express();
app.set('view engine','ejs');
app.use(express.static('public'));  
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = require("./models/db");
db.init();
const Teacher = require('./models/teacher'); 
const Student = require('./models/student');
const Admin = require('./models/admin');

app.get("/",function(req,res){
    res.render("home");
})

app.get("/login",function(req,res){
    res.render("login",valid="");
})

app.post('/login', async function (req, res) {
  try {
    const user = req.body.username.toLowerCase();
    const pass = req.body.password.toLowerCase();

    const student = await Student.findOne({ name: user, pass: pass }).exec();

    if (student) {
      res.render('sint');
    } else {
      res.render('login', { valid: 'Invalid username or password' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});



app.get('/Teacherlogin', function (req, res) {
  res.render('Teacherlogin', { valid: '' });
});

app.post('/Teacherlogin', async function (req, res) {
  try{
    const user = req.body.username.toLowerCase();
    const pass = req.body.password.toLowerCase();
    const teacher=await Teacher.findOne({ name: user, pass: pass }).exec();
    if (teacher) {
      res.redirect('/Attendance');
    } else {
      res.render('Teacherlogin', { valid: 'Invalid username or password' });
    }
  }
  catch(err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


app.get("/admin",function(req,res){
    res.render("Admin",{valid:""});
})
app.post('/Admin', async function (req, res) {
  try {
    const user = req.body.username.toLowerCase();
    const pass = req.body.password.toLowerCase();
    const admin = await Admin.findOne({ username: user, password: pass }).exec();

    if (admin) {
      res.redirect('AdminAdd');
    } else {
      res.render('Admin', { valid: 'Invalid username or password' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/AdminAdd', async function (req, res) {
  try {
    const studentdata = await Student.find().exec();
    const teacherdata = await Teacher.find().exec();

    res.render('AdminAdd', { student: studentdata, teacher: teacherdata });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

app.post('/addStudent', async function (req, res) {
  const { studentName, studentId, Branch, Year, Section, studentPassword } = req.body;
  const newStudent = new Student({
    name: studentName.toLowerCase(),
    roll: studentId.toLowerCase(),
    branch: Branch.toUpperCase(),
    year: Year.toUpperCase(),
    section: Section.toUpperCase(),
    pass: studentPassword.toLowerCase(),
  });
  await newStudent.save()
  .then(() => {
    res.redirect('/AdminAdd');
  })
  .catch(err => {
    console.error(err);
    res.status(500).send('Internal Server Error');
  });
});

app.post('/addteacher', async function (req, res) {
  const { teacherName, teacherId, designation, teacherPassword } = req.body;
  const newTeacher = new Teacher({
    name: teacherName.toLowerCase(),
    teach: teacherId.toLowerCase(),
    designation: designation.toLowerCase(),
    pass: teacherPassword.toLowerCase(),
  });
  await newTeacher
    .save()
    .then(() => {
      res.redirect('/AdminAdd');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

app.get("/Attendance",function(req,res){
    res.render("Attendance",{student:{},status:""});
});

app.post('/AttendanceSearch', async function (req, res) {
  try {
    const dep = req.body.dep.toUpperCase();
    const year = req.body.year.toUpperCase();
    const sec = req.body.sec.toUpperCase();

    const results = await Student.find({
      branch: dep,
      year: year,
      section: sec,
    }).exec();

    if (results) {
      res.render("Attendance", { student: results, status: "" });
    } else {
      res.render("Attendance", { student: [], status: "" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

app.post("/submitAttendance",function(req,res){
    res.render("Attendance",{student:[],status:"Attendance submitted successfully."});
});

app.get("/twotab",function(req,res){
  res.render("twotab");
});
app.get("/student",function(req,res){
  res.render("student");
});
app.get("/timetable",function(req,res){
  res.render("timetable");
});
app.listen(3000,function(){ 
    console.log("Server Started..");
})