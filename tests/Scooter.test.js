const Scooter = require('../src/Scooter')

const scooter = new Scooter("Station 1")

// typeof scooter === object
describe('scooter object', () => {
  test('Scooter class should create Scooter instance', () => {
    expect(scooter).toBeInstanceOf(Scooter)
  })

  test("Scooter instance has correct variables assigned", () => {
    expect(scooter.station).toBe("Station 1")
    expect(scooter.user).toBe(null)
    expect(scooter.charge).toBe(100)
    expect(scooter.serial).toBe(1)
    expect(Scooter.nextSerial).toBe(2)
    expect(scooter.isBroken).toBe(false)
  })
})

// Method tests
describe('scooter methods', () => {
  // tests here!

  // rent method
  test("Scooter can be rented by user when charged enough",() => {
    scooter.rent({username: "Test user"})
    expect(scooter.user).toEqual({username:"Test user"})
    expect(scooter.station).toBe(null)
  })

  test("Scooter cannot be rented when not charged or broken",() => {
    const scooter2 = new Scooter("Station 1")
    scooter2.charge = 19
    expect(()=>scooter2.rent({username: "Test user"})).toThrow("Scooter needs to be charged.")
    scooter2.charge = 25
    scooter2.isBroken = true
    expect(()=>scooter2.rent({username: "Test user"})).toThrow("Scooter needs to be repaired.")
  })

  // dock method
  test("Scooter can be docked at station",() => {
    scooter.dock("Station 1")
    expect(scooter.user).toBe(null)
    expect(scooter.station).toBe("Station 1")
  })

  // requestRepair method
  test("Scooter can be requested to be repaired", async() => {
    scooter.isBroken = true
    await scooter.requestRepair()
    expect(scooter.isBroken).toBe(false)
  })

  // charge method
  test("Scooter can be charged", async () => {
    scooter.charge = 20
    await scooter.recharge()
    expect(scooter.charge).toBe(100);
});
})