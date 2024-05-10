const User = require('../src/User')

const user = new User('Joe Bloggs', 'test123', 21)

// User tests here
describe('User property tests', () => {
  // test username
  test('username should be a string and correctly assigned', () => {
    expect(typeof user.username).toBe('string')
    expect(user.username).toBe("Joe Bloggs")
  })
  // test password
  test("password cannot be accessed",()=>{
    expect(user.password).toBe(undefined)
  })
  // test age
  test("age is correctly assigned and number",()=>{
    expect(typeof user.age).toBe("number")
    expect(user.age).toBe(21)
  })
})

describe("User method tests", ()=>{
  // test logout
  test("user can log out",()=>{
    user.logout()
    expect(user.loggedIn).toBe(false)
  })

  // test login
  test("can log in with correct password",()=>{
    user.login('test123')
    expect(user.loggedIn).toBe(true)
  })

  test("user cannot login with incorrect password",()=>{
    expect(()=>user.login('hi')).toThrow("Incorrect password")
  })
})
