const dbconnection = require('./database/dbconnection');
const logger = require('../logger');
const SQL_TABLE_NAME = process.env.SQL_TABLE_NAME || "ProjectInfo"

async function updateProjectInfo(data){
    try{

        let sqlConn = await dbconnection.getConnection();
        let results = await sqlConn.query(`SELECT * FROM ${SQL_TABLE_NAME};`);
        console.log(results.recordset);
    }
    catch(exception){
        logger.error('Some error occured while inserting into db');
        await dbconnection.closePool();
    }
}

module.exports = updateProjectInfo;