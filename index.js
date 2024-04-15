const oracledb = require('oracledb');
oracledb.initOracleClient({libDir: 'C:\\instantclient_21_3'});
// oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function connstr(){
    let con;

    try{
        con = await oracledb.getConnection({
            user            : "MENU",
            password        : "mayin",
            connectString   : "192.168.3.11/system"
        });

        const data = await con.execute("SELECT * FROM HRD.ATTENDANCE_DETAILS");
        console.log(data.rows);
    }catch(err){
        console.error(err);
    }
}

connstr();
