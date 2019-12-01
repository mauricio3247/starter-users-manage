import {Account, IAccount, IAccountModel, IAccountDocument, STATUS, ACCOUNT_TYPE}  from '@models/account'
import {Secure} from '@core/secure'
import _ from 'lodash';
class AccountService {
  constructor (
    private accountServ:IAccountModel = Account,

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
    let account = await this.accountServ.findOne({_id: id, status: {$ne: STATUS.ERASED}});
    if(account === null) {
      throw new Error('Account not found')
    }
    return account;
  }

  private async _getAccountByEmail (email:string):Promise<IAccountDocument> {
    return this.accountServ.findOne({email: email, status: {$ne: STATUS.ERASED}});
  }

  async createAccount (email: string, type=ACCOUNT_TYPE.STANDARD_ACCOUNT) {
    try {
      if(await this._getAccountByEmail(email) != null ) {
        throw new Error('Email is used')
      }
      let account =  new this.accountServ({
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

  async getAccountById (id:string) {
    return this.getPublicData(await this._getAccountByIdOrFail(id))
  }

  async deleteAccount (id:string) {
    let account = await this._getAccountByIdOrFail(id)
    account.status = STATUS.ERASED
    await account.save();
    return this.getPublicData(account)
  }

  async getAll ():Promise<IAccountDocument[]> {
    let accounts = await this.accountServ.find({ tatus: {$ne: STATUS.ERASED}})
    return accounts.map(item => this.getPublicData(item))
  }

  async updateAccount(id:string, status: string):Promise<IAccountDocument> {
    let account = await this._getAccountByIdOrFail(id)
    account.status = status
    await account.save();
    return this.getPublicData(account)
  }
}

export default new AccountService()