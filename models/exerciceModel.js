const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const ExerciceSchema = new mongoose.Schema({

    file: {
        type: String,
        trim: true,
        require: [true, 'file require']
    },
    description: {
        type: String,
        require: [true, 'description require']
    },
    createur: {  
        type: mongoose.Types.ObjectId,
        ref: "user",
        require: [true, 'createur require']
    },
    course: {
        type: mongoose.Types.ObjectId,
         ref: "course",
         require: [true, 'createur require']
    } 

}, { timestamps: true })
const Exercice = mongoose.model('exercice', ExerciceSchema);
module.exports = Exercice;