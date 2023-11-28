const log4js = require("log4js") // npm i log4js

log4js.configure({

    appenders: {
        access:{
            type:"dateFile",
            filename:"logs/archivosLogs/acceso/access.log",
            pattern: "-yyyy-MM-dd"
        },
        error :{
            type:"dateFile",
            filename:"logs/archivosLogs/error/error.log",
            pattern: "-yyyy-MM-dd"
        }, 
        warning : {
            type:"dateFile",
            filename:"logs/archivosLogs/warning/warning.log",
            pattern: "-yyyy-MM-dd"
        },
        session: {
            type: "dateFile",
            filename: "logs/archivosLogs/session/session.log",
            pattern: "-yyyy-MM-dd"
        }
    },
    categories: {
        default: { appenders: ["access"], level: "ALL"},
        access: { appenders: ["access"], level:"INFO"},
        error: { appenders: ["error"], level:"ERROR"},
        warning: { appenders: ["warning"], level:"WARN"},
        session: { appenders: ["session"], level: "INFO"}
    }
})

const acceso = log4js.getLogger("access")
const err = log4js.getLogger("error")
const warn = log4js.getLogger("warning")
const ses = log4js.getLogger("session");

module.exports = {
    access: acceso,
    error:err,
    warning:warn,
    session: ses,
    express: log4js.connectLogger(acceso)
}