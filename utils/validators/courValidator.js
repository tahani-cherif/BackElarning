const { check ,body} = require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js');

exports.getcourValidator=[
    check('id').isMongoId().withMessage('Invalid cour id format'),
    validatorMiddleware,
];

exports.createcourValidator=[

    check('titre').notEmpty().withMessage('titre required'),
    check('bioFormateur').notEmpty().withMessage('bioFormateur required'),
    check('description').notEmpty().withMessage('description required'),
    check('ce_que_vous_apprenez').notEmpty().withMessage('ce_que_vous_apprenez required'),
    check('categorie').notEmpty().withMessage('categorie required'),
    check('actual_Price').notEmpty().withMessage('actual_Price required')
                         .isNumeric().withMessage('must be a number'),
    check('discount_Price').notEmpty().withMessage('discount_Price required')
                           .isNumeric().withMessage('must be a number'),
    check('createur').notEmpty().withMessage('createur required')
                     .isMongoId().withMessage('Invalid createur id '),
    
    validatorMiddleware,
];
exports.updatecourValidator=[
    check('id').isMongoId().withMessage('Invalid cour id format'),
    check('titre').optional().notEmpty().withMessage('titre required'),
    check('bioFormateur').optional().notEmpty().withMessage('bioFormateur required'),
    check('description').optional().notEmpty().withMessage('description required'),
    check('ce_que_vous_apprenez').optional().notEmpty().withMessage('ce_que_vous_apprenez required'),
    check('VideoId').optional().notEmpty().withMessage('VideoId required'),
    check('pdfId').optional().notEmpty().withMessage('pdfId required'),
    check('isDeleted').optional().notEmpty().withMessage('isDeleted required'),
    check('rating_Count').optional().notEmpty().withMessage('rating_Count required'),
    check('rating_Star').optional().notEmpty().withMessage('rating_Star required'),
    check('nb_user').optional().notEmpty().withMessage('nb_user required'),
    check('isfinish').optional().notEmpty().withMessage('isfinish required'),
    check('categorie').optional().notEmpty().withMessage('categorie required'),
    check('actual_Price').optional().notEmpty().withMessage('actual_Price required')
                         .isNumeric().withMessage('must be a number'),
    check('discount_Price').optional().notEmpty().withMessage('discount_Price required')
                           .isNumeric().withMessage('must be a number'),
    check('createur').optional().notEmpty().withMessage('createur required')
                     .isMongoId().withMessage('Invalid createur id '),
    validatorMiddleware,
];

exports.deletecourValidator=[
    check('id').isMongoId().withMessage('Invalid cour id format'),
    validatorMiddleware,
];

