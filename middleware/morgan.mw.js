const morgan = require("morgan") // npm i morgan
const fs = require("fs") // npm i fs


const anyadirMorgan = morgan('combined', {
    stream: fs.createWriteStream('./logs/archivosLogs/acceso/access.log', {flags: 'a'})
})

module.exports = anyadirMorgan;