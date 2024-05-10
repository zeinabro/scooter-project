class User {
  // User code here
  #password
  constructor(username,password,age){
    this.username = username;
    this.#password = password
    this.age = age
    this.loggedIn = false
  }

  login(password){
    if (this.#password!==password){
      throw new Error("Incorrect password")
    }
    this.loggedIn = true
  }

  logout(){
    this.loggedIn = false
  }
}

module.exports = User
