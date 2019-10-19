const Joi = require('@hapi/joi')

const usersSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    nickname: Joi.string().required(),
    password: Joi.string().required()
});


const validateUser = (req, res, next) => {
    const validation = usersSchema.validate(req.body);

    if (validation.error) {
        return res.status(403).send('Verifica tus datos pe sano');
    }
    next();
}


module.exports = validateUser;