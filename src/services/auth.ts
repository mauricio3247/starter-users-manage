import AccountService from '@services/account'
import UserService from '@services/user'
import { Secure } from '@core/secure'
import { ROLES } from '@models/user'
import errMsgs from '@config/error.messages'
class AuthService {
  constructor(
    private readonly accountServ =AccountService,
    private readonly userServ = UserService) {}
  async login(username:string, password: string) {
    try {
      let user = await this.userServ.getUserByUsernameAndPassword(username, password)
      if(!this.userServ.isUserActive(user)) {
        throw errMsgs.AUTH.USER_INACTIVE
      }
      if(user.account && !this.accountServ.isAccountActive(user.account)) {
        throw errMsgs.AUTH.ACCOUNT_NOT_ACTIVE
      }
      return Secure.generateToken(user);
    } catch(e) {
      throw (e)
    }
  }

  async signin (email: string, username: string, password: string, type?:string) {
    try {
      let account = await this.accountServ.createAccount(email, type);
      let rol =  ROLES.STANDARDUSER;
      if(this.accountServ.isAccountBussinesAdmin(account)) {
        rol = ROLES.BUSADMIN;
      }
      await this.userServ.createUser(username, password, rol, account)
      return account
    } catch (error) {
      //console.log('error', error)
      throw error
    }
  }
}

export default new AuthService();