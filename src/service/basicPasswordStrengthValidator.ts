import Joi from 'joi';

const passwordSchema = Joi.string()
    .min(8)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$'))
    .required()
    .messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 8 characters long',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
        'any.required': 'Password is required',
    });

export function basicValidatePassword(password: string): Joi.ValidationResult {
    return passwordSchema.validate(password, { abortEarly: false });
}