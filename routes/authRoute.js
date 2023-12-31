const express=require('express')
const {signupValidator,
       loginValidator,
       EnvoyerEmailValidator
       }=require('../utils/validators/authValidator');


const {signup,
      login,
      sendEmail,
      sendEmailContact
    }=require('../services/authService');


const router=express.Router();
const {upload}=require('../middlewares/imageMiddmeware')


router.route('/signup').post(upload('./image').single('image'),signupValidator,signup);
router.route('/login').post(loginValidator,login);
router.route('/passwordrecovery').post(EnvoyerEmailValidator,sendEmail);
router.route('/contact').post(sendEmailContact);

module.exports = router;