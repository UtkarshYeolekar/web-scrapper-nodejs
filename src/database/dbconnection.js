"use strict";
//const sql = require( "mssql" );
const sql = require('mssql/msnodesqlv8')
const config = require('./dbConfig')
let pool = null;

   const closePool = async () => {
       try {
           // try to close the connection pool
           await pool.close();

           // set the pool to null to ensure
           // a new one will be created by getConnection()
           pool = null;
       } catch ( err ) {
           // error closing the connection (could already be closed)
           // set the pool to null to ensure
           // a new one will be created by getConnection()
           pool = null;
       }
   };

   const getConnection = async () => {
       try {
           if ( pool ) {
               // has the connection pool already been created?
               // if so, return the existing pool
               return pool;
           }
           // create a new connection pool
           pool = await sql.connect( config );

           // catch any connection errors and close the pool
           pool.on( "error", async err => {
             await closePool();
           } );
           return pool;
       } catch ( err ) {
           // error connecting to SQL Server
           pool = null;
       }
   };

module.exports = {
    getConnection: getConnection,
    closePool : closePool
}