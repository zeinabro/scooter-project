const Scooter = require('../src/Scooter')

const scooter = new Scooter("Station 1",null,100,false)

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
    const scooter2 = new Scooter("Station 1",null,19,false)
    expect(()=>scooter2.rent({username: "Test user"})).toThrow("Scooter needs to be charged.")
    scooter.isBroken = true
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
    await scooter.requestRepair()
    expect(scooter.isBroken).toBe(true)
  })

  // charge method
  test("Scooter can be charged", async () => {
    await scooter.charge()
    expect(newScooter.charge).toBe(100);
});
})