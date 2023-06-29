const { check ,body} = require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js');
const User=require('../../models/userModale.js')
const bcrypt=require('bcryptjs');

exports.signupValidator=[
    check('last_name').notEmpty().withMessage('last_name required'),
    check('last_name').notEmpty().withMessage('last_name required'),
    check('first_name').notEmpty().withMessage('first_name required'),
    check('fullName').notEmpty().withMessage('fullName required'),
    check('age').notEmpty().withMessage('age required'),
    check('phoneNumber').notEmpty().withMessage('phone number required'),
    check('email').notEmpty().withMessage('email required')
                            .isEmail().withMessage('must be fomrat email')
                            .custom((val) =>
                                User.findOne({ email: val }).then((user) => {
                                    if (user) {
                                    return Promise.reject(new Error('E-mail already in user'));
                                    }
                                })),
    check('password').notEmpty().withMessage('password required')
                     .isLength({min:8}).withMessage('too short password name'),                            
    validatorMiddleware,
];
exports.loginValidator = [
    check('email').notEmpty().withMessage('Email required')
                  .isEmail().withMessage('Invalid email address'),
    check('password').notEmpty().withMessage('Password required')
                     .isLength({ min: 8}).withMessage('Password must be at least 6 characters'),
    validatorMiddleware,
  ];

  exports.EnvoyerEmailValidator=[
    check('email').notEmpty().withMessage('you must enter your email')
                  .isEmail().withMessage('must be fomrat email')
                  .custom((val) =>
                    User.findOne({ email: val }).then((user) => {
                      if (!user) {
                      return Promise.reject(new Error('E-mail not found'));
                      }
                  })),
    check('OTP').notEmpty().withMessage('you must enter your code otp'),             
    validatorMiddleware,
];