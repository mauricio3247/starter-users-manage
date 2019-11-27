import {Account, IAccount, IAccountModel, IAccountDocument, STATUS, ACCOUNT_TYPE}  from '@models/account'
import {Secure} from '@core/secure'
import _ from 'lodash';
import { ROLES } from '@models/user';
import UserService from './user'
class AccountService {
  constructor (
    private account:IAccountModel = Account,
    private userServ =UserService
  ) {}

  isAccountActive (account:IAccountDocument) {
    return account.status === STATUS.ACTIVE
  }

  isAccountBussinesAdmin (account:IAccountDocument) {
    return account.accountType === ACCOUNT_TYPE.BUSINESS_ACCOUNT
  }
  private getPublicData(account: IAccount):IAccountDocument {
    return _.omit(account.toObject(), ['token', 'tokenHistory']) as IAccountDocument
  }

  private async _getAccountByIdOrFail (id:string):Promise<IAccountDocument> {
    let account = await this.account.findOne({_id: id});
    if(account === null) {
      throw new Error('Account not found')
    }
    return account;
  }

  private async _getAccountByEmail (email:string):Promise<IAccountDocument> {
    return this.account.findOne({email: email});
  }

  async createAccount (email: string, type=ACCOUNT_TYPE.STANDARD_ACCOUNT) {
    try {
      if(await this._getAccountByEmail(email) != null ) {
        throw new Error('Email is used')
      }
      let account =  new Account({
        email: email,
        accountType: type,
        token: Secure.hash256(email + Math.random().toString() + new Date().toTimeString())
      })
      await account.save()
      return this.getPublicData(account)
    } catch (error) {
      console.log('error', error)
      throw error
    }
  }

  async activateAccount (_id:string, token:string) {
    try {
      let account = await this._getAccountByIdOrFail(_id);
      if (account.token === token) {
        if (account.status === STATUS.CREATED) {
          account.status = STATUS.ACTIVE;
          return account.save()
        } else {
          throw new Error('Account have an invalid status')
        }
      } else {
        throw new Error('Token invalid!')
      }
    } catch (error) {
      throw error
    }
  }
}

export default new AccountService()