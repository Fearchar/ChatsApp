import jwt from  'jsonwebtoken'

class Auth {
  static get token() {
    return localStorage.getItem('token')
  }

  static get payload() {
    return jwt.decode(Auth.token)
  }

  static get header() {
    return { headers: { Authorization: `Bearer ${Auth.token}` } }
  }

  static setToken(token) {
    localStorage.setItem('token', token)
  }

  static removeToken() {
    localStorage.removeItem('token')
  }

  static isAuthenticated() {
    const payload = Auth.payload
    const dateNow = Math.round(Date.now() / 1000)
    return payload && dateNow < payload.exp
  }

  static getClientId() {
    const payload = Auth.payload
    return payload && payload.sub
  }

  static isClient(user) {
    return Auth.getClientId() === user._id
  }
}

export default Auth
