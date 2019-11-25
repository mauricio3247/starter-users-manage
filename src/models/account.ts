import _ from 'lodash'
import {Document, Schema, Model, model} from 'mongoose'
export interface IAccountDocument extends Document {
  email: string;
  token: string;
  tokenHistory:string[],
  status:string,
  accountType: string
}

export interface IAccount extends IAccountDocument {}

export interface IAccountModel extends Model<IAccount> {}

export const STATUS = {
  CREATED: 'created',
  ACTIVE: 'active', 
  INACTIVE: 'inactive',
  ERASED: 'erased'
}

export const ACCOUNT_TYPE = {
  BUSINESS_ACCOUNT: 'business_account',
  STANDARD_ACCOUNT: 'standard_account'
}

const schema:Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  token: {
    type: String,
    required: true
  },
  tokenHistory: [{type: String}],
  status: {
    type: String,
    enum: _.values(STATUS),
    default: STATUS.CREATED
  },
  accountType: {
    type: String,
    enum: _.values(ACCOUNT_TYPE),
    default: ACCOUNT_TYPE.STANDARD_ACCOUNT
  }
}, {timestamps: true})

export const Account: IAccountModel = model<IAccount, IAccountModel> ('Account', schema, 'Accounts')

