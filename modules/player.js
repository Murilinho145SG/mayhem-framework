const utilsMYSQL = require("../lib/utils")
const database = new utilsMYSQL()

class Player {
    async getId(source) {
        let licenseIdentifier = null
        for (let i = 0; i < GetNumPlayerIdentifiers(source); i++) {
            const identifier = GetPlayerIdentifier(source, i);
            
            if (identifier.includes('license:')) {
                licenseIdentifier = identifier.replace(/[^:]+:(.+)/, '$1');
            }
        }
        await database.connect("mayhem")
        const data = await database.query(`SELECT id, license FROM userData WHERE license = "${licenseIdentifier}"`)
        for (let user of data) {
            return user.id
        }
    }
    
    async getIdbyLicense(licenseIdentifier) {
        await database.connect("mayhem")
        const data = await database.query(`SELECT id, license FROM userData WHERE license = "${licenseIdentifier}"`)
        for (let user of data) {
            return user.id
        }
    }

    getCoords(source) {
        const ped = GetPlayerPed(source)
        const [playerX, playerY, playerZ] = GetEntityCoords(ped);
        console.log(`${playerX}, ${playerY}, ${playerZ}`)
    }
}

module.exports = Player

