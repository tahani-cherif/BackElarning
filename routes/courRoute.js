const express=require('express')
const {getcourValidator,
    createcourValidator,
    updatecourValidator,
    deletecourValidator, 
    getallcouruserValidator                               
       }=require('../utils/validators/courValidator');


const {getcours,
    getcour,
    createcour,
    updatecour,
    deletecour,
    countcour,
    topcour,
    countbyfomateur,
    getAllCoursesuser,
    getAllCourseformateur,
    getcourssearchbyname
    }=require('../services/courService');


const router=express.Router();
const {upload}=require('../middlewares/imageMiddmeware')


router.route("/getcoursearch").get(getcourssearchbyname)
router.route('/count/').get(countcour)
router.route('/top/').get(topcour)
router.route('/countcourbyformateur/').get(countbyfomateur)
router.route('/').get(getcours)
                 .post(upload('./image').single('image'),createcourValidator,createcour)

router.route('/:id').get(getcourValidator,getcour)
                    .put(upload('./image').single('image'),updatecourValidator,updatecour)
                    .delete(deletecourValidator,deletecour);
        
router.route("/getallcouruser/:id").get(getallcouruserValidator,getAllCoursesuser)
router.route("/getallcourformateur/:id").get(getallcouruserValidator,getAllCourseformateur)




module.exports = router;