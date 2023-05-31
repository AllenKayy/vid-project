const Joi = require('joi');

const genreValidator = Joi.object({
    genre: Joi.string()
        .required()
        .min(3)
        .max(20)
}).strict(true)

module.exports = { genreValidator }