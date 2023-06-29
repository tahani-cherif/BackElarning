const express=require('express')
const {getuserValidator,
      updateuserValidator,
      deleteuserValidator,
      createuserValidator,                                
      forgetuserpasswordvalidate
       }=require('../utils/validators/userValidator');


const {getusers,
       createuser,
        getuser,
        updateuser,
        deleteuser,
        passwordrecovery,
        countuser
    }=require('../services/userService');


const router=express.Router();
const {upload}=require('../middlewares/imageMiddmeware')

router.route('/count').get(countuser)
router.route('/').get(getusers)
                 .post(upload('./image').single('image'),createuserValidator,createuser)
                 .put(forgetuserpasswordvalidate,passwordrecovery);

router.route('/:id').get(getuserValidator,getuser)
                    .put(upload('./image').single('image'),updateuserValidator,updateuser)
                    .delete(deleteuserValidator,deleteuser);

module.exports = router;