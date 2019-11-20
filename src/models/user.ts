import _ from 'lodash'
import {Document, Schema, Model, model} from 'mongoose'
export interface IUserDocument extends Document {
  username: string;
  password: string;
  status:string,
  rol:string
}

export interface IUser extends IUserDocument {}

export interface IUserModel extends Model<IUser> {}

export const STATUS = {
  ACTIVE: 'active', 
  INACTIVE: 'inactive',
  ERASED: 'erased'
}

export const ROLES = {
  APPADMIN: 'app-admin',
  APPSUPERVISOR: 'app-supervisor',
  APPOPERATOR: 'app-operator',
  BUSADMIN: 'bus-admin',
  BUSSUPERVISOR: 'bus-supervisor',
  BUSOPERATOR: 'bus-operator',
  STANDARDUSER: 'standard-user'
}

const schema:Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: _.values(STATUS),
    default: STATUS.ACTIVE
  },
  rol: {
    type: String,
    enum: _.values(ROLES),
    default: ROLES.STANDARDUSER
  }
}, {timestamps: true})

export const User: IUserModel = model<IUser, IUserModel> ('User', schema, 'Users')

