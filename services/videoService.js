const videomodel=require('../models/videoModel')
const courmodel=require('../models/courModel')
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')


// @desc    Get all video
// @route   GET api/video/
// @access  Private
exports.getvideos=asyncHandler(async(req,res) => {
    const page=req.query.page*1 || 1;
    const limit=req.query.limit*1 ||5;
    const skip=(page-1)*limit;
    const video = await videomodel.find({});
    res.status(200).json({results:video.length,page,data:video})
  });

// @desc    Get specific video by d
// @route   GET api/video/:id
// @access  Private
exports.getvideo = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const video = await videomodel.findById(id);
  if(!video)
  {
    return   next(new ApiError(`video not found for this id ${id}`,404)); 
}
  res.status(200).json({data: video});
})


// @desc    Create a new video
// @route   POST api/video/
// @access  Private
exports.createvideo=asyncHandler(async(req,res)=>{
    const body=req.body
    body.videoUrl=req.file.path
    const video=await videomodel.create(body)
    const cour= await courmodel.findById(body.course)
    cour.videoId.push(video._id)
    await courmodel.findByIdAndUpdate(body.course,cour)
     res.status(201).json({data:video})
   
});

// @desc    update specified video
// @route   PUT api/video/:id
// @access  Private
exports.updatevideo =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;
  req.body.videoUrl=req?.file?.path|| req.body.videoUrl 
  const video = await videomodel.findOneAndUpdate(
    {_id:id},
     req.body,
    {new:true})//return apre update
  if(!video)
    {
      return   next(new ApiError(`video not found for this id ${id}`,404)); 
    }
  res.status(200).json({data: video});  
})

