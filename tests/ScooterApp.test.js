const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')
const Scooter = require('../src/Scooter')

const scooterApp = new ScooterApp()
// ScooterApp tests here

// register user
describe('registerUser method tests', () => {
  const user = scooterApp.registerUser('Joe Bloggs', 'test123', 21)

  test('Should return instance of User', () => {
    expect(user).toBeInstanceOf(User)
    expect(user.username).toBe("Joe Bloggs")
  })

  test("Should return user with correct properties",() =>{
    expect(user.username).toBe("Joe Bloggs")
    expect(user.age).toBe(21)
  })

  test("Should not register user under 18",()=>{
    expect(()=>scooterApp.registerUser("Emily","test",17)).toThrow("You must be over 18 to register")
  })

  test("Should not register existing users",()=>{
    expect(()=>scooterApp.registerUser('Joe Bloggs', 'test123', 21)).toThrow("This user is already registered")
  })
})

// log in
describe("logIn method tests",()=>{
  const user = scooterApp.registerUser('Zeinab', 'test123', 19)

  test("Log in with correct existing user details",()=>{
    scooterApp.loginUser("Zeinab","test123")
    expect(user.loggedIn).toBe(true)
  })

  test("cannot log in with incorrect details",()=>{
    expect(()=>scooterApp.loginUser("Zeinab","test")).toThrow("Username or password is incorrect")
    expect(()=>scooterApp.loginUser("Emily","test")).toThrow("Username or password is incorrect")
  })
})

// log out
describe("logOut method tests",()=>{
  const user = scooterApp.registerUser('Jonathan', 'test123', 19)

  test("can log out successfully",()=>{
    user.loggedIn = true
    scooterApp.logoutUser("Jonathan")
    expect(user.loggedIn).toBe(false)
  })

  test("cannot log out with incorrect username",()=>{
    expect(()=>scooterApp.logoutUser("User")).toThrow("No such user is logged in")
  })
})

// create scooter
describe("create scooter method tests",()=>{
  const scooter = scooterApp.createScooter("Station 1")

  test("returns instance of Scooter object",()=>{
    expect(scooter).toBeInstanceOf(Scooter)
  })

  test("adds stations and assigns station to scooter",()=>{
    expect(scooterApp.stations["Station 1"].length).toBe(1)
    expect(scooter.station).toBe("Station 1")
  })

  test("throws error if station does not exist",() => {
    expect(()=>scooterApp.createScooter("xyz")).toThrow(`Station "xyz" does not exist`)
  })

})

// rent scooter
describe("rent scooter method tests",()=>{
  const scooter = scooterApp.createScooter("Station 2")
  const user = {username:"John"}

  test("scooter can be rented",()=>{
    scooterApp.rentScooter(scooter,user)
    expect(scooterApp.stations["Station 2"].length).toBe(0)
    expect(scooter.user.username).toBe("John")
  })

  test("scooter cannot be rented if already rented",()=>{
    scooter.user={username:"user"}
    expect(()=>scooterApp.rentScooter(scooter,user)).toThrow(`Scooter #${scooter.serial} already rented`)
  })

})

// dock scooter
describe("dock scooter method tests",()=>{
  const scooter = scooterApp.createScooter("Station 3")
  scooter.station = null
  scooter.user = {username:"User"}

  test("scooter can be docked",()=>{
    scooterApp.dockScooter(scooter,"Station 2")
    expect(scooter.station).toBe("Station 2")
    expect(scooter.user).toBe(null)
    expect(scooterApp.stations["Station 2"].length).toBe(1)
  })

  test("throws error if scooter already docked",()=>{
    scooter.station="Station 2"
    scooter.user=null
    expect(()=>scooterApp.dockScooter(scooter,"Station 2")).toThrow(`Scooter #${scooter.serial} is already at Station 2`)
  })

  test("throws error if station does not exist",()=>{
    scooter.station=null
    scooter.user={username:"User"}
    expect(()=>scooterApp.dockScooter(scooter,"xyz")).toThrow(`Station "xyz" does not exist`)
  })
})

// print function
describe("print function tests",()=>{
  test("print is a function",()=>{
    expect(scooterApp.print).toBeTruthy()
    scooterApp.print()
    scooterApp.registerUser("username","password",18)
    scooterApp.print()
  })
})