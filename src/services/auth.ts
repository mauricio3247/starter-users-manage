import AccountService from '@services/account'
import UserService from '@services/user'
import { Secure } from '@core/secure'
import { ROLES } from '@models/user'

class AuthService {
  constructor(
    private readonly accountServ =AccountService,
    private readonly userServ = UserService) {}
  async login(username:string, password: string) {
    try {
      let user = await this.userServ.getUserByUsernameAndPassword(username, password)
      if(!this.userServ.isUserActive(user)) {
        throw new Error('User is inactive')
      }
      if(user.account && !this.accountServ.isAccountActive(user.account)) {
        throw new Error('Account is not active')
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
      console.log('error', error)
      throw error
    }
  }
}

export default new AuthService();