const { check ,body} = require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js');

exports.getexerciceValidator=[
    check('id').isMongoId().withMessage('Invalid exercice id format'),
    validatorMiddleware,
];

exports.createexerciceValidator=[
    check('description').notEmpty().withMessage('description required'),
    check('course').notEmpty().withMessage('course required')
                   .isMongoId().withMessage('Invalid course id '),
    check('createur').notEmpty().withMessage('createur required')
                     .isMongoId().withMessage('Invalid createur id '),
    
    validatorMiddleware,
];
exports.updateexerciceValidator=[
    check('id').isMongoId().withMessage('Invalid exercice id format'),
    check('description').optional().notEmpty().withMessage('description required'),
    check('course').optional().notEmpty().withMessage('course required')
                   .isMongoId().withMessage('Invalid course id '),
    check('createur').optional().notEmpty().withMessage('createur required')
                     .isMongoId().withMessage('Invalid createur id '),
    validatorMiddleware,
];


