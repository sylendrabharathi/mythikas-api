import * as crypto from 'crypto';

class PasswordUtil {
    algorithm = 'sha256';
    secret = '$2y$12$d0kFg3Asa8l/TuK38wyG3e61jRmbEWDuqRJ5F4ryrLWIvmztSVyEe ';
    hex = 'hex';
    

    encryptText(text: string): string {
        return crypto.createHmac(this.algorithm, this.secret).update(text).digest('hex');
    }


}

export default new PasswordUtil();