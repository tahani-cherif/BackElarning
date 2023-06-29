const express=require('express')


const {getcategroys,
    getcategroy,
    createcategroy,
    deletecategroy
    }=require('../services/ctaegoryService');


const router=express.Router();


router.route('/').get(getcategroys)
                 .post(createcategroy);
router.route('/:id').get(getcategroy)
                    .delete(deletecategroy);

module.exports = router;