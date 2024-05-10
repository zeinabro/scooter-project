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
      throw new Error(`Scooter #${this.serial} needs to be charged.`)
    }
    if (this.isBroken===true){
      throw new Error(`Scooter #${this.serial} needs to be repaired.`)
    }
    
    this.user=user;
    this.station=null
    console.log(`Rented scooter #${this.serial} to ${user.username}`)
  }

  dock(station){
    this.user=null
    this.station=station
    console.log(`Docked scooter #${this.serial} at ${station}`)
  }

  async recharge(){
    console.log(`Starting charge for scooter #${this.serial}`)
    await new Promise(resolve => setTimeout(resolve,2000))
    this.charge=100
    console.log(`Charging complete for scooter #${this.serial}`)
  }

  async requestRepair(){
    console.log(`Starting repair for scooter #${this.serial}`)
    await new Promise(resolve => setTimeout(resolve,2000))
    this.isBroken=false
    console.log(`Repair complete for scooter #${this.serial}`)
  }
}

module.exports = Scooter
