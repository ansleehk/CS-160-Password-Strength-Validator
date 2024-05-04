import { basicValidatePassword } from "./basicPasswordStrengthValidator";
import CheckPasswordPwned from "./checkPasswordPwned";

class PasswordStrengthFailed extends Error {
    public constructor(message: string) {
        super(message);
    }
}

export default class PasswordStrengthValidator {
    private password: string;
    constructor(password: string) {
        this.password = password;
    }
    private checkPasswordStrength(): boolean {
        const result = basicValidatePassword(this.password);
        if (result.error) {
            throw new PasswordStrengthFailed(result.error.message);
        }
        return true;
    }
    private async checkPasswordPwned(): Promise<boolean> {
        const checkPasswordPwned = new CheckPasswordPwned();
        const isPwned = await checkPasswordPwned.verifyPasswordSafety(this.password);

        if (isPwned) {
            throw new PasswordStrengthFailed('Password has been pwned');
        }
        return true;
    }
    public async validatePassword(): Promise<boolean> {
        try {
            this.checkPasswordStrength();
            await this.checkPasswordPwned();
            return true;
        } catch (err) {
            if (err instanceof PasswordStrengthFailed) {
                return false;
            } else {
                throw err;
            }
        }
    }
}