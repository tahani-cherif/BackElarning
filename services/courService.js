const courmodel=require('../models/courModel')
const usermodel=require('../models/userModale')
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')
const bcrypt=require('bcryptjs');


// @desc    Get all cour
// @route   GET api/cour/
// @access  Private
exports.getcours=asyncHandler(async(req,res) => {
    const page=req.query.page*1 || 1;
    const limit=req.query.limit*1 ||5;
    const skip=(page-1)*limit;
    const cour = await courmodel.find({}).populate({
      path: 'createur',
      select: ['fullName', '_id','image'],
  });
    res.status(200).json({results:cour.length,page,data:cour})
  });

// @desc    Get specific cour by d
// @route   GET api/cour/:id
// @access  Private
exports.getcour = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const cour = await courmodel.findById(id).populate({
    path: 'createur',
    select: ['fullName', '_id','image'],
});
  if(!cour)
  {
    return   next(new ApiError(`cour not found for this id ${id}`,404)); 
}
  res.status(200).json({data: cour});
})


// @desc    Create a new cour
// @route   POST api/cour/
// @access  Private
exports.createcour=asyncHandler(async(req,res)=>{
    const body=req.body
    body.image=req.file.path
    const cour=await courmodel.create(body)
     res.status(201).json({data:cour})
   
});

// @desc    update specified cour
// @route   PUT api/cour/:id
// @access  Private
exports.updatecour =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;
  req.body.imag=req?.file?.path|| req.body.image 
  const cour = await courmodel.findOneAndUpdate(
    {_id:id},
     req.body,
    {new:true})//return apre update
  if(!cour)
    {
      return   next(new ApiError(`cour not found for this id ${id}`,404)); 
    }
  res.status(200).json({data: cour});  
})


// @desc    delete specified cour
// @route   DELETE api/cour/:id
// @access  Private
exports.deletecour =asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
   const cour=await courmodel.findByIdAndUpdate(id,{isDeleted:true});
   if(!cour)
    {
      return   next(new ApiError(`cour not found for this id ${id}`,404)); 
    }
  res.status(204).send();  
});


// @desc    COUNT  cour
// @route   GET api/cour/count
// @access  Private
exports.countcour =asyncHandler(async(req,res,next)=>{
  const count = await courmodel.count();
  res.status(200).json({data:count})
});

// @desc    get top 5 cour acheter 
// @route   GET api/cour/top
// @access  Private
exports.topcour =asyncHandler(async(req,res,next)=>{
  const cour = await courmodel.find()
  .sort({ nb_user: 1 }) 
  .limit(5)
  res.status(200).json({data:cour})
});


// @desc    count cour by fomateur 
// @route   GET api/cour/countbyfomateur
// @access  Private
exports.countbyfomateur =asyncHandler(async(req,res,next)=>{
  const countcourbycoatch= await courmodel.aggregate([
    {
      $group: {
        _id: '$createur',
        count: { $sum: 1 },
      }
    }
  ]);
  countcourbycoatch.map(async (item, index) => {

    const user = await usermodel.findById(item._id);
    console.log(user)
    countcourbycoatch[index] = { ...countcourbycoatch[index], fullName:user.fullName }
})
setTimeout(() => {
    res.status(200).send({ data: countcourbycoatch })
}, 1000)

});

// @desc    get  cour by user 
// @route   GET api/cour/getalluser
// @access  Private
exports.getAllCoursesuser =asyncHandler(async(req,res,next)=>{
  const id = req.params.id;
  const cour = []

  const user = await usermodel.findOne({ _id: id });
  if(!user)
  {
    return   next(new ApiError(`user not found for this id ${id}`,404)); 
  }
      user.Courses.forEach(async (item) => {
          const courses = await courmodel.find({ _id: item });
          cour.push(courses[0])
      })
      setTimeout(() => {
        res.status(200).json({data:cour})
      }, 1000)

});

// @desc    get  cour by formateur 
// @route   GET api/cour/getallformateur
// @access  Private
exports.getAllCourseformateur =asyncHandler(async(req,res,next)=>{
  const id = req.params.id;
  const courses = await courmodel.find({ createur: id });
  res.status(201).json({data:courses})

});

