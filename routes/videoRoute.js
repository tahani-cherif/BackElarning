const express=require('express')
const {createvideoValidator,
    updatevideoValidator,
    getvideoValidator,
    getvideocourValidator
       }=require('../utils/validators/videoValidator');


const {getvideos,
    createvideo,
       getvideo,
       updatevideo,
    }=require('../services/videoService');


const router=express.Router();
const {upload}=require('../middlewares/imageMiddmeware')

router.route('/').get(getvideos)
                 .post(upload('./video').single('videoUrl'),createvideoValidator,createvideo)

router.route('/:id').get(getvideoValidator,getvideo)
                    .put(upload('./video').single('image'),updatevideoValidator,updatevideo)
        
router.route('/bycour/:id').get(getvideocourValidator,getvideos)

module.exports = router;