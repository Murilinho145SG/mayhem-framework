const path = require("path")
const utilsMYSQL = require("./utils")
const database = new utilsMYSQL()
const fs = require("fs")


class MayhemGroups {
    /**
     * @param {Number} userId 
     * @param {Number} source 
     * @returns {Boolean}
     */

    async getSource(userId, source) {
        await database.connect('mayhem')
        const Json = fs.readFileSync(path.join(__dirname, "../base/groups.json"), "utf8")
        const player = await database.query(`SELECT id, job FROM playerJobs WHERE id = "${userId}"`)
        const data = JSON.parse(Json)
        if (!player) return false
        for (let playerItem of player) {
            if (data[playerItem.job].sources.some(src => src.includes(source))) {
                return true
            }
        }
        return false
    }

    async getAdminSource(userId, source) {
        await database.connect('mayhem')
        const Json = fs.readFileSync(path.join(__dirname, "../base/groups.json"), "utf8")
        const player = await database.query(`SELECT id, data FROM serverData WHERE id = "${userId}"`)
        const data = JSON.parse(Json)
        if (!player) return false
        for (let playerItem of player) {
            if (data[playerItem.data].sources.some(src => src.includes(source))) {
                return true
            }
        }
        return false
    }

    /**
     * @param {Number} userId 
     * @param {Group} group 
     * @returns {Registry}
     */

    async addGroup(userId, group) {
        await database.connect('mayhem')
        const Json = fs.readFileSync(path.join(__dirname, "../base/groups.json"), "utf8")
        const data = JSON.parse(Json)
        if (!data[group]) return
        if (data[group].type == "job") {
            database.query(`INSERT INTO playerJobs (id, job) VALUES ('${userId}', '${group}') ON DUPLICATE KEY UPDATE job = '${group}'`)
        } else if (data[group].type == "server") {
            database.query(`INSERT INTO serverData (id, data) VALUES ('${userId}', '${group}') ON DUPLICATE KEY UPDATE data = '${group}'`)
        }
    }

    /**
     * @param {Number} userId 
     * @param {Group} group 
     * @returns
     */

    async removeGroup(userId, group) {
        await database.connect('mayhem')
        const Json = fs.readFileSync(path.join(__dirname, "../base/groups.json"), "utf8")
        const data = JSON.parse(Json)
        if (!data[group]) return
        if (data[group].type == "job") {
            database.query(`INSERT INTO playerJobs (id, job) VALUES ('${userId}', 'Desempregado') ON DUPLICATE KEY UPDATE job = 'Desempregado'`)
        } else if (data[group].type == "server") {
            database.query(`DELETE FROM serverData WHERE id = ${userId}`)
        }
    }

    /**
     * @param {Number} userId 
     * @returns 
     */

    async getTitle(userId) {
        await database.connect('mayhem')
        const player = await database.query(`SELECT id, job FROM playerJobs WHERE id = "${userId}"`)
        const Json = fs.readFileSync(path.join(__dirname, "../base/groups.json"), "utf8")
        const data = JSON.parse(Json)
        for (let playerItem of player) {
            if (!data[playerItem.job]) return "Desempregado"
            return data[playerItem.job].title
        }
    }
}

module.exports = MayhemGroups;


