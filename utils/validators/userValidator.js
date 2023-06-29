const { check ,body} = require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js');
const User=require('../../models/userModale.js')
const bcrypt=require('bcryptjs');

exports.getuserValidator=[
    check('id').isMongoId().withMessage('Invalid user id format'),
    validatorMiddleware,
];

exports.createuserValidator=[
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

exports.updateuserValidator=[
    check('id').isMongoId().withMessage('Invalid user id format'),
    check('last_name').optional().notEmpty().withMessage('last_name required'),
    check('first_name').optional().notEmpty().withMessage('first_name required'),
    check('fullName').optional().notEmpty().withMessage('fullName required'),
    check('age').optional().notEmpty().withMessage('age required'),
    check('phoneNumber').optional().notEmpty().withMessage('phone number required'),
    check('email').optional().notEmpty().withMessage('email required')
                            .isEmail().withMessage('must be fomrat email')
                            .custom((val) =>
                                User.findOne({ email: val }).then((user) => {
                                    if (user) {
                                    return Promise.reject(new Error('E-mail already in user'));
                                    }
                                })),
    check('role').optional().isIn(['formateur','admin','user']).withMessage('role must be eleve | admin | user |formateur'), 
    validatorMiddleware,
];

exports.deleteuserValidator=[
    check('id').isMongoId().withMessage('Invalid user id format'),
    validatorMiddleware,
];


exports.forgetuserpasswordvalidate=[
    body('email').notEmpty().withMessage('email required')
                  .isEmail().withMessage('must be fomrat email')
                  .custom((val) =>
                        User.findOne({ email: val }).then((user) => {
                            if (!user) {
                            return Promise.reject(new Error('E-mail not found'));
                            }
                        })),
    body('passwordconfirm').notEmpty().withMessage('you must enter your current password confirm'),
    body('password').notEmpty().withMessage('you must enter your current new password ')
                    .custom(async(val,{req})=>{
                        if(val != req.body.passwordconfirm)
                        {
                            throw new Error('password confirmation incorrect')
                        }
                        return true;
                    }),
    validatorMiddleware
]