import {User, IUser, IUserModel, IUserDocument, STATUS, ROLES}  from '@models/user'
import {Secure} from '@core/secure'
import _ from 'lodash';
import { IAccountDocument } from '@models/account';
class UserService {
  constructor (
    private user:IUserModel = User
  ) {

  }

  private async getPublicData (user:IUser):Promise<IUserDocument> {
    console.log('user', user)
    if(user.account != undefined) {
      await user.populate('account').execPopulate()
    }
    return _.omit(user.toObject(),['password', 'account.token', 'account.tokenHistory']) as IUserDocument;
  }
  private async _getUserByUsername (username:string, messageError='User not found') {
    let user = await this.user.findOne({username});
    if (user === null) {
      throw (messageError)
    }
    return user;
  }

  async autenticateUser (username:string, password:string):Promise<string> {
    try {
      let user = await this._getUserByUsername(username, 'Username or password incorrect');
      if (await Secure.compareHash(password, user.password) === false ) {
        throw (new Error('Username or password incorrect'))
      }

      if(user.status !== STATUS.ACTIVE) {
        throw new Error('User is inactive')
      }
      return Secure.generateToken(await this.getPublicData(user));
    } catch (error) {
      throw (new Error(error.message || 'Username or password incorrect'))
    }
  }

  async getAutenticatedUser (token:string):Promise<IUserDocument> {
    try {
      let payload = await Secure.checkToken(token);
      let user = await this._getUserByUsername(payload.username)
      return this.getPublicData(await user);
    } catch (error) {
      throw new Error('Invalid Creds')
    }
  }

  private async _createUser(username:string, password:string, rol = ROLES.STANDARDUSER, account?: IAccountDocument ):Promise<IUserDocument>  {
    let user = new User({
      username,
      password: await Secure.hashText(password),
      rol,
      estado: STATUS.ACTIVE
    })
    if (account != undefined) {
      user.account = account
    }
    await user.save();
    user = await this._getUserByUsername(user.username);
    return this.getPublicData(user);
  }

  async createUser (username:string, password:string, rol = ROLES.STANDARDUSER, account?: IAccountDocument):Promise<IUserDocument> {
    try {
      if(await this.user.findOne({username}) !== null) {
        throw new Error('Username already exist')
      }
      let user = await this._createUser (username, password, rol, account);
      return user;
    } catch (error) {
      console.log('error user', error)
      throw error
    }
  }

  async createMainUser (username: string, password:string) {
    try {
      if(await this.user.findOne({username}) !== null) {
        return true;
      }
      await this._createUser(username, password, ROLES.APPADMIN)
      return true;
    } catch (error) {
      throw new Error('Error triying create a new user')
    }

  }

  
}


export default new UserService();