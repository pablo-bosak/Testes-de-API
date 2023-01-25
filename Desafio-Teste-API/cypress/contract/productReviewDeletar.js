const Joi = require('joi');

const productReviewDeletar = Joi.object({
    deleted: Joi.boolean().required(),
    previous: Joi.object({
        id: Joi.number().required(),
        date_created: Joi.date().required(),
        date_created_gmt: Joi.date().required(),
        product_id: Joi.number().required(),
        product_name: Joi.string(),
        product_permalink: Joi.string(),
        status: Joi.string(),
        reviewer: Joi.string(),
        reviewer_email: Joi.string().email({tlds:{allow:false}}),
        review: Joi.string(),
        rating: Joi.number().required(),
        verified: Joi.boolean().required(),
        reviewer_avatar_urls: Joi.object({
            24: Joi.string().required(),
            48: Joi.string().required(),
            96: Joi.string().required()
        }),
    }).required()
}).required()

export default productReviewDeletar