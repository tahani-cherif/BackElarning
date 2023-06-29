const mongoose = require('mongoose');


const VideosSchema = new mongoose.Schema({
    titre: {
        type: String,
        require:[true,'titre require'],

    },
    dure: {
        type: Number,
        require:[true,'dure require'],

    },
    ordre: { 
        type: Number,
        require:[true,'order require'],
    },
    description: {
        type: String,
        require:[true,'description require'],
    },
    categorie: {
        type: String,
        require:[true,'titre require'],
    },
    videoUrl:
    {
        type: String,
        require:[true,'videourl require'],
    },
    coatch: {
        type: mongoose.Types.ObjectId,
        ref: "use",
        require:[true,'user require'],
       
    },
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: "commentaire"
    }],
    course: {
        type: mongoose.Types.ObjectId,
        ref: "course"

    },
},
    { timestamps: true }
)
const Video = mongoose.model('video', VideosSchema);
module.exports = Video;