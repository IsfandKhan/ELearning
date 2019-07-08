
var express = require('express');
var router = express.Router();

var Class = require('../models/class');
var Student = require('../models/student');
var Instructor = require('../models/instructor');

router.get('/classes', function(req, res){
    Instructor.getInstructorByUsername(req.user.username, function(err, instructor){
        if(err) throw err;

        res.render('instructors/classes', { instructor:instructor });
    });
});

router.post('/classes/register', function(req, res){
    var info = {};
    info.instructor_username = req.user.username;
    info.class_id = req.body.class_id;
    info.class_title = req.body.class_title;
    //info['instructor_username'] = req.user.username;
    //info['class_id'] = req.body.class_id;
    //info['class_title'] = req.body.class_title;

    Instructor.register(info, function(err, instructor){
        if(err) throw err;
        console.log(instructor);
    });
    req.flash('success_msg', 'You are now registered to teach this class');
    res.redirect('/instructors/classes');
});

router.get('/classes/:id/lessons/new', function(req, res){
    res.render('instructors/addlesson',{class_id: req.params.id});
});

router.post('/classes/:id/lessons/new', function(req, res){
    var lesson_number = req.body.lesson_number;
    var lesson_title = req.body.lesson_title;
    var lesson_body = req.body.lesson_body;

    var info = {};
    info.class_id = req.params.id;
    info.lesson_number = lesson_number;
    info.lesson_title = lesson_title;
    info.lesson_body = lesson_body;

    Class.AddLesson(info, function(err, lesson){
        console.log('Lesson Added');

    });
    req.flash('sucess_msg', 'Lesson Added');
    res.redirect('/instructors/classes/');
});

module.exports = router;