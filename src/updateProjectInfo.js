const dbconnection = require('./database/dbconnection');
const logger = require('../logger');
const SQL_TABLE_NAME = process.env.SQL_TABLE_NAME || "ProjectInfo"
const sql = require('mssql/msnodesqlv8');

async function updateProjectInfo(data) {
  try {

    if (data && data.length) {
      // Getting connection pool instance
      let sqlConn = await dbconnection.getConnection();

      // Truncating table before inserting.
      await sqlConn.query(`truncate table ${SQL_TABLE_NAME};`);

      // Bulk inserting
      const table = new sql.Table(SQL_TABLE_NAME);

      table.create = true
      table.columns.add('ProjectNo', sql.VarChar(50), { nullable: false });
      table.columns.add('ProjectName', sql.VarChar(50), { nullable: false });
      table.columns.add('Status', sql.VarChar(50), { nullable: false });

      // push some data into the buffer
      for (let i = 0; i < data.length; i++) {
        table.rows.add(data[i]['ProjectNo'], data[i]['ProjectName'], data[i]['Status']);
      }

      // create a new request object
      req = new sql.Request(sqlConn);

      // bulk insert into the temp table
      await req.bulk(table);

      //closing connection pool
      await dbconnection.closePool();

      console.log('Insert Completed');
    }
    else {
      logger.info('----No Records To Insert---');
    }
  }
  catch (exception) {
    logger.error('Some error occured while inserting into db');
    await dbconnection.closePool();
  }
}

module.exports = updateProjectInfo;