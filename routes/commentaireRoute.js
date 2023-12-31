const express=require('express')
const {deletecommentValidator,
    updatecommentValidator,
    createcommentValidator,
    getcommentValidator,                                
       }=require('../utils/validators/commentaireValidator');


const {getcommentaires,
    getcommentaire,
    createcommentaire,
        updatecommentaire,
        deletecommentaire,
        getcommentairesbyvideo
    }=require('../services/commentaireService');


const router=express.Router();
const {upload}=require('../middlewares/imageMiddmeware')

router.route('/').get(getcommentaires)
                 .post(createcommentValidator,createcommentaire)

router.route('/:id').get(getcommentValidator,getcommentaire)
                    .put(updatecommentValidator,updatecommentaire)
                    .delete(deletecommentValidator,deletecommentaire);
router.route('/video/:id').get(getcommentairesbyvideo)

module.exports = router;