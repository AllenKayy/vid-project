const Joi = require('joi');

const genreValidator = Joi.object({
    genre: Joi.string()
        .required()
        .min(3)
        .max(20),

    description: Joi.string()
        .required()
        .min(10)
}).strict(true)

module.exports = { genreValidator }