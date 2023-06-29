const commentairemodel=require('../models/commentaireModel')
const videomodel=require('../models/videoModel')
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')


// @desc    Get all commentaire
// @route   GET api/commentaire/
// @access  Private
exports.getcommentaires=asyncHandler(async(req,res) => {
    const page=req.query.page*1 || 1;
    const limit=req.query.limit*1 ||5;
    const skip=(page-1)*limit;
    const commentaire = await commentairemodel.find({});
    res.status(200).json({results:commentaire.length,page,data:commentaire})
  });

// @desc    Get specific commentaire by d
// @route   GET api/commentaire/:id
// @access  Private
exports.getcommentaire = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const commentaire = await commentairemodel.findById(id);
  if(!commentaire)
  {
    return   next(new ApiError(`commentaire not found for this id ${id}`,404)); 
}
  res.status(200).json({data: commentaire});
})


// @desc    Create a new commentaire
// @route   POST api/commentaire/
// @access  Private
exports.createcommentaire=asyncHandler(async(req,res)=>{
    const body=req.body
    const commentaire=await commentairemodel.create(body)
    const video= await videomodel.findById(body.postId)
    video.comments.push(commentaire._id)
    console.log(video)
    await videomodel.findByIdAndUpdate(body.postId,video)
     res.status(201).json({data:commentaire})
   
});

// @desc    update specified commentaire
// @route   PUT api/commentaire/:id
// @access  Private
exports.updatecommentaire =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;
  const commentaire = await commentairemodel.findOneAndUpdate(
    {_id:id},
     req.body,
    {new:true})//return apre update
  if(!commentaire)
    {
      return   next(new ApiError(`commentaire not found for this id ${id}`,404)); 
    }
  res.status(200).json({data: commentaire});  
})

// @desc    delete specified commentaire
// @route   DELETE api/commentaire/:id
// @access  Private
exports.deletecommentaire =asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const comments=await commentairemodel.findById(id);
    const comment=await commentairemodel.findByIdAndDelete(id);
    const video= await videomodel.findById(comments.postId)
    video.comments=video.comments.filter(item=>item._id!=id)
    await videomodel.findByIdAndUpdate(video._id,video)
    if(!comment)
     {
       return   next(new ApiError(`comment not found for this id ${id}`,404)); 
     }
   res.status(204).send();  
 });
 
