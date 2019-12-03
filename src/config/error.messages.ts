const ERROR_MESSAGES = {
  GENERAL: {
    NOT_FOUND: {errorApp: true, code: 'NOT_FOUND', message: 'Not found'},
    FORBIDDEN: {errorApp: true, code: 'FORBIDDEN', message: 'Forbidden'},
    VALIDATION_DATA : {errorApp: true, code: 'VALIDATION_DATA', message: 'Invalid Data'},
  },
  ACCOUNT: {
    ACCOUNT_NOT_FOUND: {errorApp: true, code: 'ACCOUNT_NOT_FOUND', message: 'Account not found'},
    EMAIL_USED: {errorApp: true, code: 'EMAIL_USED', message: 'Email used'},
    ACCOUNT_INVALID_STATUS: {errorApp: true, code: 'ACCOUNT_INVALID_STATUS', message: 'Account status is invalid'},
    ACCOUNT_INVALID_TOKEN: {errorApp: true, code: 'ACCOUNT_INVALID_TOKEN', message: 'Token invalid'}
  },
  AUTH: {
    USER_INACTIVE: {errorApp: true, code: 'USER_INACTIVE', message: 'User inactive'},
    ACCOUNT_NOT_ACTIVE:{errorApp: true, code: 'ACCOUNT_NOT_ACTIVE', message: 'Account is not active'},
    INVALID_CREDS:{errorApp: true, code: 'INVALID_CREDS', message: 'Invalid credentials'},
  },
  USER: {
    USER_NOT_FOUND: {errorApp: true, code: 'USER_NOT_FOUND', message: 'User not found'},
    USER_OR_PASSWORD_INCORRECT: {errorApp: true, code: 'USER_OR_PASSWORD_INCORRECT', message: 'User or password incorrect'},
    USERNAME_EXIST:  {errorApp: true, code: 'USERNAME_EXIST', message: 'Username is taken'},
  }
}

export default ERROR_MESSAGES;