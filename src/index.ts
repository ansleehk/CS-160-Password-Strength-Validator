import PasswordStrengthValidator from "./service/passwordStrengthValidator";

export const handler = async (event: any) => {
    const password = event.password;

    const passwordStrengthValidator = new PasswordStrengthValidator(password);
    const isPasswordStrong = await passwordStrengthValidator.validatePassword();
    return {
        statusCode: 200,
        body: isPasswordStrong
    };
}