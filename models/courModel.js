const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    titre: {
        type: String,
        require:[true,'titre require'],
        trim: true 
    },
    bioFormateur: {
        type: String,
        require:[true,'bioFormateur require']
    },
    description: {
        type: String,
        require:[true,'description require'],
        trim: true
    },
    langue: {
        type: String,
        require:[true,'langue require'],
        trim: true
    },
    categorie: { 
        type: String,
        required: true,
        require:[true,'categorie require'],
    },
    createur: { 
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        require:[true,'id createur require'],
    },
    actual_Price: {
        type: Number,
        require:[true,'actual price require'],
    },
    discount_Price: {
        type: Number,
        require:[true,'discount price require'],
    },
    ce_que_vous_apprenez: {
        type: String,
        require:[true,'objectif require'],
    },
    videoId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'video'
    }],
    section: [{
        videoId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'video'
        },
        pdfId: {
            type: mongoose.Types.ObjectId,
            ref: "exercice",
        },
    }],
    pdfId:[ {
        type: mongoose.Types.ObjectId,
        ref: "exercice",
    }],
    image: {
        type: String,
        require:[true,'image require'],
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    rating_Count: {
        type: String,
    },
    rating_Star: {
        type: Number,
    },
    nb_user: {
        type: Number ,
        default:0   
    },
    isfinish: {
        type: Boolean,
        default: false
    },
    onhold: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Courses = mongoose.model('course', CourseSchema);
module.exports = Courses;