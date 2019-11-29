import {User, IUser, IUserModel, IUserDocument, STATUS, ROLES}  from '@models/user'
import {Secure} from '@core/secure'
import _ from 'lodash';
import { IAccountDocument } from '@models/account';
class UserService {
  constructor (
    private user:IUserModel = User
  ) {

  }

  isUserActive (user:IUserDocument) {
    return user.status === STATUS.ACTIVE;
  }


  isAppAdmin (user:IUserDocument) {
    return user.rol === ROLES.APPADMIN
  }

  isAppSupervisorLevel (user:IUserDocument) {
    return user.rol === ROLES.APPADMIN ||  user.rol === ROLES.APPSUPERVISOR
  }

  isAppLevelRol (user:IUserDocument) {
    return user.rol === ROLES.APPADMIN || user.rol === ROLES.APPSUPERVISOR || user.rol === ROLES.APPOPERATOR
  }

  isBusinessAdmin (user: IUserDocument) {
    return user.rol === ROLES.BUSADMIN
  }

  isBusinessSupervisorLevel(user:IUserDocument) {
    return user.rol === ROLES.BUSADMIN || user.rol === ROLES.BUSSUPERVISOR
  }

  isBusinessLevelRol (user:IUserDocument) {
    return user.rol === ROLES.BUSADMIN || user.rol === ROLES.BUSSUPERVISOR || user.rol === ROLES.BUSOPERATOR
  }

  isStandardUser (user: IUserDocument) {
    return user.rol === ROLES.STANDARDUSER
  }

  private async _getUserById (id:string, messageError='User not found'):Promise<IUserDocument> {
    let user = await this.user.findOne({_id: id});
    if (user === null) {
      throw (messageError)
    }
    return user;
  }

  private async _getUserByIdAndAccount (id:string, accountId:string, messageError='User not found'):Promise<IUserDocument> {
    let user = await this.user.findOne({_id: id, account: accountId});
    if (user === null) {
      throw (messageError)
    }
    return user;
  }
  private async _getUserByUsername (username:string, messageError='User not found') {
    let user = await this.user.findOne({username});
    if (user === null) {
      throw (messageError)
    }
    return user;
  }

  private async _getUsersByAccount (accountId: string) {
    return this.user.find({account: accountId});
  }

  private async getPublicData (user:IUser):Promise<IUserDocument> {
    console.log('user', user)
    if(user.account != undefined) {
      await user.populate('account').execPopulate()
    }
    return _.omit(user.toObject(),['password', 'account.token', 'account.tokenHistory']) as IUserDocument;
  }


  async getUserByUsernameAndPassword (username:string, password:string):Promise<IUserDocument> {
    try {
      let user = await this._getUserByUsername(username, 'Username or password incorrect');
      if (await Secure.compareHash(password, user.password) === false ) {
        throw (new Error('Username or password incorrect'))
      }

      return this.getPublicData(user);
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

  private async _updateUser(user:IUserDocument, status:string, rol:string, password?: string) {
    try {
      user.status = status;
      user.rol = rol;
      user.password = Secure.hash256(password)
      await user.save()
      return this.getPublicData(user)
    } catch (error) {
      throw new Error('Error triying update a new user')
    }    
  }

  async updateUserInMyAccount(id:string, account:IAccountDocument, status:string, rol:string, password?: string) {
    try {
      let user = await this._getUserByIdAndAccount(id, account._id);
      return this._updateUser(user, status, rol, password)
    } catch (error) {
      throw new Error('Error trying update an user')
    }  
  }

  async getAllByAccount (accountId:string) {
    let users = await this._getUsersByAccount(accountId);
    return Promise.all(users.map(async (user) => this.getPublicData(user)))
  }

  async getByAccount (id: string, accountId:string) {
    return this.getPublicData(await this._getUserByIdAndAccount(id, accountId));
  }

  async deleteUserByAccount (id:string, accountId: string) {
    try {
      let user = await this._getUserByIdAndAccount(id, accountId)
      user.status = STATUS.ERASED;
      await user.save();
      return true
    } catch (error) {
      throw new Error('Error trying delete an user')
    }
  }

  async changePassword(id:string, accountId:string, password:string) {
    try {
      let user = await this._getUserByIdAndAccount(id, accountId)
      user.password = Secure.hash256(password);
      await user.save();
      return true
    } catch (error) {
      throw new Error('Error trying change a password')
    }
  }

  
}


export default new UserService();