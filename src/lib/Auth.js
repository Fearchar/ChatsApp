import jwt from  'jsonwebtoken'

class Auth {
  static setToken(token) {
    localStorage.setItem('token', token)
  }

  static getToken() {
    return localStorage.getItem('token')
  }

  static removeToken() {
    localStorage.removeItem('token')
  }

  static getPayload() {
    return jwt.decode(this.getToken())
  }

  static isAuthenticated() {
    const payload = this.getPayload()
    const dateNow = Math.round(Date.now() / 1000)
    return payload && dateNow < payload.exp
  }

  static getClientId() {
    const payload = this.getPayload()
    return payload && payload.sub
  }

  static isClient(user) {
    return this.getClientId() === user._id
  }
}

export default Auth
