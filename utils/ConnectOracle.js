const oracledb = require('oracledb');
oracledb.initOracleClient({libDir: 'C:\\instantclient_21_3'});

const connection = oracledb.getConnection({
  user:"MENU",
  password:"mayin",
  connectString:"192.168.3.11/system"
});

module.exports = connection;


