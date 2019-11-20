import CONST from '@config/constants'
import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
const JT_PASS = CONST.SECURE.JT_PASS
const BCRYPT_SALTS= parseInt(CONST.SECURE.BCRYPT_SALTS);
const crypto = require('crypto');

class SecureTools {
  async checkToken (token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, JT_PASS, function (err, decoded) {
        if (err) {
          return reject(err)
        }
        return resolve(decoded as object);
      });
    })
  }
  async generateToken(data: object): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(data, JT_PASS, { algorithm: 'HS256' }, function (err, token) {
        if (err) {
          return reject(err)
        }
        return resolve(token);
      });
    })
  }


  async hashText(text:string):Promise<string> {
    try {
      const salts = await this.generateSalts(BCRYPT_SALTS);
      let hash = await this.hash(salts, text);
      return hash;
    } catch (e) {
      throw ({ messageApp: e.messageApp, code: e.code, messageSystem: e });
    }
  }

  async compareHash (text:string, hash:string):Promise<boolean> {
    return bcrypt.compare(text, hash);
  }

  private async generateSalts (salts: number):Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(salts, function (err, salt) {
        if (err) {
          return reject(new Error('SYSTEM_ERROR'));
        }
        return resolve(salt);
      });
    });
  }

  private async hash (salto:string, text:string):Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(text, salto, function (err, hash) {
        if (err) {
          return reject(new Error('SYSTEM_ERROR'));
        }
        return resolve(hash);
  
      });
    });
  }

  hash256(text:string):string {
    return crypto.createHash('sha256').update(text).digest('hex');
  }


}

export const Secure = new SecureTools()