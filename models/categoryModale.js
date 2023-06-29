const  mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const categoryShema=new mongoose.Schema(
    {
        category:{
            type:String,
            required:[true," category required"]
        }
    },{timestamps:true}
);

const category=mongoose.model('category',categoryShema);
module.exports=category;