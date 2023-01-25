const Joi = require('joi');

const productReviewEditar = Joi.object({
    id: Joi.number().required(),
    date_created: Joi.date().required(),
    date_created_gmt: Joi.date().required(),
    product_id: Joi.number().allow().required(),
    product_name: Joi.string(),
    product_permalink: Joi.string(),
    status: Joi.string().required(),
    reviewer: Joi.string().required(),
    reviewer_email: Joi.string().email({tlds:{allow:false}}),
    review: Joi.string().required(),
    rating: Joi.number().required(),
    verified: Joi.boolean().required(),
    reviewer_avatar_urls: Joi.object({
        24: Joi.string().required(), 
        48: Joi.string().required(),
        96: Joi.string().required()
    }).required(),    
    _links: Joi.object({
        self: Joi.array().items(
            Joi.object({
                href:Joi.string().required()
            })
        ),
        collection: Joi.array().items(
            Joi.object({
                href:Joi.string().required()
            })
        ),
        up: Joi.array().items(
            Joi.object({
                href:Joi.string().required()
            })
        ),
        reviewer: Joi.array().items(
            Joi.object({
                embeddable:Joi.boolean(),
                href:Joi.string()
            })
        ),
    }).required()    
}).required()

export default productReviewEditar