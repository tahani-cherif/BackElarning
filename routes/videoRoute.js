const express=require('express')
const {createvideoValidator,
    updatevideoValidator,
    getvideoValidator,
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
                    .put(upload('./image').single('image'),updatevideoValidator,updatevideo)

module.exports = router;