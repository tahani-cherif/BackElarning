const express = require('express');
const morgan = require('morgan');
const dotenv=require('dotenv')
const config_data=require('./config/config_db');
dotenv.config({path:'config.env'})
const globalError=require('./middlewares/errorMiddleware')
const ApiError=require('./utils/apiError')
const userRoute=require('./routes/userRoute.js')
const authRoute=require('./routes/authRoute')
const courRoute=require('./routes/courRoute')
const videoRoute=require('./routes/videoRoute')
const exerciceRoute=require('./routes/exerciceRoute')
const commentaireRoute=require('./routes/commentaireRoute')
const categoryRoute=require('./routes/categoryRoute')
const app=express()
const http = require('http').Server(app);
const cors = require("cors");
const io = require('socket.io')(http, {
    cors: {
      origin: '*',
      methods: ["GET", "POST"],
    }, 
      
});


const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
dotenv.config({path:'.env'})
app.use(express.json());

//connection database
config_data()


//middlewares
if(process.env.NODE_ENV === 'dev')
{
    app.use(morgan('dev'));
    console.log(`mode:${process.env.NODE_ENV}`);
}

 
//route
app.use('/api/user',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/cour',courRoute);
app.use('/api/video',videoRoute);
app.use('/api/exercice',exerciceRoute);
app.use('/api/commentaire',commentaireRoute);
app.use('/api/category',categoryRoute);
app.get('/',(req,res) => {res.send('route API')});
//static Images Folder

app.use('/image', express.static('./image'))

//static Images Folder

app.use('/pdf', express.static('./pdf'))



app.all("*",(req,res,next)=>{
    //create error and send it to error handling middleware
     next(new ApiError(`can't find this route : ${req.originalUrl}`,400));
})




// Global error handling middleware for express
app.use(globalError);

const PORT=process.env.PORT || 8000
const server=http.listen(PORT,
    console.log("App running on port 8000"));


// error handling Rejection outside express
process.on("unhandledRejection",(err=>{
    console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
    server.close(()=>{
       console.log('shutting down....')
       process.exit(1);})
  
}));

// socket 
io.on("connection", (socket) => {

    console.log(`User Connected: ${socket.id}`);
    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });
  
  });