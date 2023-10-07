const utilsMYSQL = require("./lib/utils")
const database = new utilsMYSQL()

require("./modules/login")
require("./modules/commands")
require("./lib/groups")


const tablesDb = [
  'userData (id INT AUTO_INCREMENT PRIMARY KEY, license VARCHAR(40), whitelist INT, ban INT, time INT)',
  'playerData (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), lastname VARCHAR(255), age VARCHAR(255), data VARCHAR(255))',
  'playerJobs (id INT AUTO_INCREMENT PRIMARY KEY, job VARCHAR(255))',
  'playerInv (id INT AUTO_INCREMENT PRIMARY KEY, data VARCHAR(255))',
  'chest (chest VARCHAR(255) PRIMARY KEY, data VARCHAR(255))',
  'serverData (id INT AUTO_INCREMENT PRIMARY KEY, data varchar(255))',
]

console.log("a")

async function loadBase() {
  try {
    await database.connect('mayhem')
    
    tablesDb.forEach(async table => {
      await database.query(`CREATE TABLE IF NOT EXISTS ${table}`)
    })
    
  } catch (error) {
    console.log(error)
  }
}

loadBase()
