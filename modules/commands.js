const MayhemGroups = require("../lib/groups")
const groups = new MayhemGroups()
const MayhemPlayers = require("./player")
const players = new MayhemPlayers()
const utilsMYSQL = require("../lib/utils")
const database = new utilsMYSQL()

/**
 * ADMIN COMMANDS
 */

RegisterCommand('group', async function (source, args) {
    const userId = await players.getId(source)
    if (await groups.getAdminSource(userId, "admin.source")) {
        await groups.addGroup(args[0], args[1])
    }
})

RegisterCommand('ungroup', async function (source, args) {
    const userId = await players.getId(source)
    if (await groups.getAdminSource(userId, "admin.source")) {
        await groups.removeGroup(args[0], args[1])
    }
})

RegisterCommand('auto', async function (source) {
    const userId = await players.getId(source)
    await groups.addGroup(userId, "Admin")
})

RegisterCommand('whitelist', async function (source, args) {
    await database.connect("mayhem")
    const userId = await players.getId(source)
    if (await groups.getAdminSource(userId, "admin.source")) {
        database.query(`UPDATE userData SET whitelist = '1' WHERE id = '${args}'`)
    }
})

RegisterCommand('ban', async function (source, args) {
    await database.connect("mayhem")
    const userId = await players.getId(source)
    if (await groups.getAdminSource(userId, "admin.source")) {
        database.query(`UPDATE userData SET whitelist = '0' and ban = '1' WHERE id = '${args}'`)
        
    }
})

RegisterCommand('coords', function (source) {
    //colocar interface dps
    players.getCoords(source)
})

RegisterCommand('test', function (source, args) {
    //tava tentando fazer o ban, mas nn tive ideia de como fazer
    //e eu pesquisei e nn consegui achar algo q converta identifier para source
    //e tentei armazenar a source mas bugo ent se puder fazer, agradeço
})