const express=require('express')
const {getcourValidator,
    createcourValidator,
    updatecourValidator,
    deletecourValidator,                                
       }=require('../utils/validators/courValidator');


const {getcours,
    getcour,
    createcour,
    updatecour,
    deletecour,
    countcour,
    topcour,
    countbyfomateur
    }=require('../services/courService');


const router=express.Router();
const {upload}=require('../middlewares/imageMiddmeware')

router.route('/count/').get(countcour)
router.route('/top/').get(topcour)
router.route('/countcourbyformateur/').get(countbyfomateur)
router.route('/').get(getcours)
                 .post(upload('./image').single('image'),createcourValidator,createcour)

router.route('/:id').get(getcourValidator,getcour)
                    .put(upload('./image').single('image'),updatecourValidator,updatecour)
                    .delete(deletecourValidator,deletecour);



module.exports = router;