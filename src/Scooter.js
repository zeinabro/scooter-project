class Scooter {
  // scooter code here
  static nextSerial = 1
  constructor(station){
    this.station=station;
    this.user=null
    this.charge=100
    this.isBroken=false
    this.serial = Scooter.nextSerial
    Scooter.nextSerial+=1
    console.log("Created scooter")
  }

  rent(user){
    if (this.charge<20){
      throw new Error("Scooter needs to be charged.")
    }
    if (this.isBroken===true){
      throw new Error("Scooter needs to be repaired.")
    }
    
    this.user=user;
    this.station=null
    console.log(`Rented scooter to user ${user.username}`)
  }

  dock(station){
    this.user=null
    this.station=station
    console.log(`Docked scooter at station ${station}`)
  }

  async recharge(){
    console.log('Starting charge')
    await new Promise(resolve => setTimeout(resolve,2000))
    this.charge=100
    console.log("Charging complete")
  }

  async requestRepair(){
    console.log("Starting repair")
    await new Promise(resolve => setTimeout(resolve,5000))
    this.isBroken=false
    console.log("Repair complete")
  }
}

module.exports = Scooter
