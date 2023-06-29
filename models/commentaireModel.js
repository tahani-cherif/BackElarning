
const mongoose = require('mongoose');
const CommentaireSchema = new mongoose.Schema({
    text: {
        type: String,
        require:[true,'text require'],
    },
    commentBy: {     
        type: mongoose.Types.ObjectId,
        ref: "user",
        require:[true,'user require'],
    },
    postId: {
        type: mongoose.Types.ObjectId,
        ref: "video",
        require:[true,'video require'],
    } 
}, { timestamps: true })
const Commentaire = mongoose.model('Commentaire', CommentaireSchema);
module.exports = Commentaire; 