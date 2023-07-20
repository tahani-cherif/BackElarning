const { check ,body} = require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js');

exports.getvideoValidator=[
    check('id').isMongoId().withMessage('Invalid video id format'),
    validatorMiddleware,
];
exports.getvideocourValidator=[
    check('id').isMongoId().withMessage('Invalid cour id format'),
    validatorMiddleware,
];

exports.createvideoValidator=[

    check('titre').notEmpty().withMessage('titre required'),
    check('dure').notEmpty().withMessage('dure required')
                 .isNumeric().withMessage('must be a number'),
    check('description').notEmpty().withMessage('description required'),
    check('categorie').notEmpty().withMessage('categorie required'),
    check('ordre').notEmpty().withMessage('ordre required')
                         .isNumeric().withMessage('must be a number'),
    check('course').notEmpty().withMessage('course required')
                   .isMongoId().withMessage('Invalid course id '),
    check('coatch').notEmpty().withMessage('coatch required')
                     .isMongoId().withMessage('Invalid coatch id '),
    
    validatorMiddleware,
];
exports.updatevideoValidator=[
    check('id').isMongoId().withMessage('Invalid video id format'),
    check('titre').optional().notEmpty().withMessage('titre required'),
    check('dure').optional().notEmpty().withMessage('dure required')
                 .isNumeric().withMessage('must be a number'),
    check('description').optional().notEmpty().withMessage('description required'),
    check('categorie').optional().notEmpty().withMessage('categorie required'),
    check('ordre').optional().notEmpty().withMessage('ordre required')
                         .isNumeric().withMessage('must be a number'),
    check('course').optional().notEmpty().withMessage('course required')
                   .isMongoId().withMessage('Invalid course id '),
    check('coatch').optional().notEmpty().withMessage('coatch required')
                     .isMongoId().withMessage('Invalid coatch id '),
    validatorMiddleware,
];


