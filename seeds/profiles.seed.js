const dbConn = require("../config/db.config.mongo");

const profiles = [
    {
        id: "1",
        nombre:"ADMIN",
        canRead:1,
        canEdit:1,
        canDelete:1,
    },
    {
        id: "2",
        nombre:"USER",
        canRead:1,
        canEdit:1,
        canDelete:0,
    },
    {
        id: "3",
        nombre:"GUESS",
        canRead:1,
        canEdit:0,
        canDelete:0,
    }
]