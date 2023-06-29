const categorymodel=require('../models/categoryModale')
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')


// @desc    Get all categroy
// @route   GET api/category/
// @access  Private
exports.getcategroys=asyncHandler(async(req,res) => {
    const categroy = await categorymodel.find({})
    res.status(200).json({results:categroy.length,data:categroy})
  });
  // @desc    Get specific categroy by d
// @route   GET api/categroy/:id
// @access  Private
exports.getcategroy = asyncHandler(async(req,res,next)=>{
    const {id}=req.params; 
    const categroy = await categorymodel.findById(id);
    if(!categroy)
    {
      return   next(new ApiError(`categroy not found for this id ${id}`,404)); 
  }
    res.status(200).json({data: categroy});
  })
  
  
  // @desc    Create a new categroy
  // @route   POST api/categroy/
  // @access  Private
  exports.createcategroy=asyncHandler(async(req,res)=>{
      const body=req.body
      const categroy=await categorymodel.create(body)
       res.status(201).json({data:categroy})
     
  });
  
  
  
  // @desc    delete specified categroy
  // @route   DELETE api/categroy/:id
  // @access  Private
  exports.deletecategroy =asyncHandler(async(req,res,next)=>{
     const {id}=req.params;
     const categroy=await categorymodel.findByIdAndDelete(id);
     if(!categroy)
      {
        return   next(new ApiError(`categroy not found for this id ${id}`,404)); 
      }
    res.status(204).send();  
  });