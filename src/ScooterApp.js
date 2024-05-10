// require the User and Scooter classes - see where they can be used in ScooterApp.js
const Scooter = require("./Scooter")
const User = require("./User")

class ScooterApp {
  // ScooterApp code here

  constructor(){
    this.stations = {
      "Station 1":[],
      "Station 2":[],
      "Station 3":[]
    }
    this.registeredUsers = {}
  }

  registerUser(username,password,age){
    if (this.registeredUsers[username]){
      throw new Error("This user is already registered")
    }
    if (age<18){
      throw new Error("You must be over 18 to register")
    }
    
    const user = new User(username,password,age)
    this.registeredUsers[username] = user
    console.log(`${username} has been registered`)
    return user
  }

  loginUser(username,password){
    if (!this.registeredUsers[username]){
      throw new Error("Username or password is incorrect")
    }
    try {
      this.registeredUsers[username].login(password)
    } catch (err) {
      throw new Error("Username or password is incorrect")
    }
    console.log(`${username} has been logged in`)
  }

  logoutUser(username){
    if(!this.registeredUsers[username]){
      throw new Error("No such user is logged in")
    }
    this.registeredUsers[username].logout()
    console.log(`${username} has logged out`)
  }
  
  createScooter(station){
    const scooter = new Scooter(station)
    if (!this.stations[station]){
      throw new Error(`Station "${station}" does not exist`)
    }
    this.stations[station].push(scooter)
    console.log(`Scooter #${scooter.serial} created`)
    return scooter
  }

  dockScooter(scooter,station){
    if (!this.stations[station]){
      throw new Error(`Station "${station}" does not exist`)
    }
    if (this.stations[station].indexOf(scooter) !== -1){
      throw new Error(`Scooter #${scooter.serial} is already at ${station}`)
    }
    scooter.dock(station)
    this.stations[station].push(scooter)
    console.log("Scooter docked")
  }

  rentScooter(scooter,user){
    if (scooter.user!==null){
      throw new Error(`Scooter #${scooter.serial} already rented`)
    }
    let station,idx 
    for (const [key,value] of Object.entries(this.stations)){
      if (value.indexOf(scooter)!==-1){
        station=key
        idx=value.indexOf(scooter)
      }
    }
    this.stations[station].splice(idx,1)
    scooter.rent(user)
    console.log(`Scooter #${scooter.serial} is rented`)
  }

  print(){
    console.log("Registered users:")
    for (const [key,value] of Object.entries(this.registeredUsers)){
      console.log(`${key}: ${value.forEach(user=>user.username)}`)
    }
    console.log("\nStations:")
    for (const [key,value] of Object.entries(this.stations)){
      console.log(`${key}: ${value.length} scooters`)
    }
  }
}

module.exports = ScooterApp
