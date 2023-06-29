const  mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const userShema=new mongoose.Schema(
    {
        last_name:{
            type:String,
            trim:true,
            require:[true,'last_name require']
        },
        first_name:
        {
            type:String,
            trim:true,
            require:[true,'first_name require']
        },
        fullName:{
            type:String,
            trim:true,
            require:[true,'fullName require']
        },
        email:
        {
             type:String,
             require:[true,'email require'],
             unique:true,
        },
        password:
        {
            type:String,
            require:[true,'password require'],
            minlength:[8,'too short password']
        },
        role:
        {
            type:String,
            enum:['formateur','admin','user'],
            default:'user'
        },
        age: {
            type: Number,
            require:[true,'age require'],
        },
        phoneNumber: {
            type: Number,
            require:[true,'phone number require'],
        },
        image: {
            type: String,
            require:[true,'image number require'],
        },
        iban: {
            type: String,
        },
        bic: {
            type: String,
        },
        Courses: [{
            type: mongoose.Types.ObjectId,
            ref: "course",
        }],
        chats: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }],
    },{timestamps:true}
);

userShema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
    //hashing the password
    this.password = await bcrypt.hash(this.password,12);
    next();
})
const User=mongoose.model('user',userShema);
module.exports=User;