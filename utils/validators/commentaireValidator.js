const { check ,body} = require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js');

exports.getcommentValidator=[
    check('id').isMongoId().withMessage('Invalid cour id format'),                     
    validatorMiddleware,
];
exports.createcommentValidator = [
    check('text').notEmpty().withMessage('last_name required'),
    check('commentBy').notEmpty().withMessage('user required')
                      .isMongoId().withMessage('Invalid user id format'),
    check('postId').notEmpty().withMessage('video required')
                      .isMongoId().withMessage('Invalid video id format'),
    validatorMiddleware,
  ];

  exports.updatecommentValidator=[
    check('id').isMongoId().withMessage('Invalid cour id format'),
    check('commentBy').optional().notEmpty().withMessage('last_name required')
                      .isMongoId().withMessage('Invalid cour id format'),
    check('postId').optional().notEmpty().withMessage('video required')
                      .isMongoId().withMessage('Invalid video id format'),
    check('text').optional().notEmpty().withMessage('first_name required'),         
    validatorMiddleware,
];

exports.deletecommentValidator=[
    check('id').isMongoId().withMessage('Invalid cour id format'),                     
    validatorMiddleware,
];