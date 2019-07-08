var mongoose = require('mongoose');

// Class Schema
var ClassSchema = mongoose.Schema({
	title: {
		type: String
	},
	description: {
		type: String
	},
	instructor:{
		type:String
	},
	lessons:[{
		lesson_number: {type: Number},
		lesson_title: {type: String},
		lesson_body:{type: String}
	}]
});

var Class = mongoose.model('Class', ClassSchema);

// Fetch All Classes
Class.getClasses = function(callback, limit){
	Class.find(callback).limit(limit);
};

// Fetch Single Class
Class.getClassById = function(id, callback){
	Class.findById(id, callback);
};

Class.AddLesson = function(info, callback){
	var id = info.class_id;
    var lesson_number = info.lesson_number;
    var lesson_title = info.lesson_title;
	var lesson_body = info.lesson_body;
	
	Class.findByIdAndUpdate(id,
		{$push:{lessons:{lesson_number:lesson_number, lesson_title:lesson_title,
		lesson_body:lesson_body}}}, {safe:true, upsert:true}, callback);
};

module.exports = Class;