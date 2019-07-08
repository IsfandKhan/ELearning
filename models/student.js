
var mongoose = require('mongoose');

var StudentSchema = mongoose.Schema({
    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    address:[{
        street_address:{type:String},
        city:{type:String},
        state:{type:String},
        zip:{type:String}
    }],
    username:{
        type:String
    },
    email:{
        type:String
    },
    classes:[{
        class_id:{type:[mongoose.Schema.Types.ObjectId]},
        class_title:{type:String}
    }]
});

var Student = mongoose.model('Student', StudentSchema);

Student.getStudentByUsername = function(username, callback){
    Student.findOne({username:username}, callback);
};

// Register Student for Class
Student.register = function(info, callback) {
    var student_username = info.student_username;
    var class_id = info.class_id;
    var class_title = info.class_title;
    
    var query = {username: student_username};
    Student.findOneAndUpdate(
      query,
      {$push: {"classes": {class_id: class_id, class_title: class_title}}},
      {safe: true, upsert: true},
      callback
    );
};

module.exports = Student;