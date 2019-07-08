var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String,
        bcrypt:true
    },
    type:{
        type:String
    }
});

var User = mongoose.model('User', UserSchema);

User.getUserById = function(id, callback){
    User.findById(id, callback);
};

User.getUserByUsername = function(username, callback){
    User.findOne({username:username},callback);
};

User.saveStudent = function(user, studentUser, callback){
    bcrypt.hash(user.password, 10, function(err, hash){
        if(err) throw err;

        user.password = hash;
        console.log('Student is being saved');
        //async.parallel([user.save, studentUser.save], callback);
        user.save();
        studentUser.save();
    });
};

User.saveInstructor = function(user, instructorUser, callback){
    bcrypt.hash(user.password, 10, function(err, hash){
        if(err) throw err;

        user.password = hash;
        console.log('Instructor is being saved');
        //async.parallel([user.save, instructorUser.save], callback);
        user.save();
        instructorUser.save();
    });
};

User.comparePassword = function(password, hash, callback){
    bcrypt.compare(password, hash, function(err, isMatch){
        if(err) throw err;

        callback(null, isMatch);
    });
};

module.exports = User;
