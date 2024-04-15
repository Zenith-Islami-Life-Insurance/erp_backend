const connection = require("../../../utils/ConnectOracle");
const oracledb = require('oracledb');
oracledb.initOracleClient({libDir: 'C:\\instantclient_21_3'});

const Alldepthead = {

  getById: async (catId, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system"
      });
  
      const result = await con.execute(
        "SELECT DISTINCT PERSONALID, USERNAME, EMP_CODE,NAME,DEP_NAME FROM HRD.DEPARMENT_ACCESS WHERE DEPART_HEAD='Y' AND PERSONALID = :catId",
        [catId]
      );
  
      // Assuming you want to return the first row
      const data = result.rows[0];
      callback(null, data);
    } catch (err) {
      console.error(err);
      callback(err, null);
    } finally {
      if (con) {
        try {
          await con.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  ,
  getDeptHeadlist: async (callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system"
      });
  
      const result = await con.execute("SELECT DISTINCT PERSONALID,NAME,ROLE_ID,ROLE_NAME,DEPARTMENT,DEP_NAME FROM USER_ROLE_DEPT WHERE ROLE_ID IN('0','2')");
  
      // Assuming you want to return the first row
      const data = result;
      callback(null, data.rows);
    } catch (err) {
      console.error(err);
      callback(err, null);
    } finally {
      if (con) {
        try {
          await con.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  },

    //count total department head
    getTotalDeptHead: (callback) => {
      async function total_dept_head(){
        let con;
        try{
            con = await oracledb.getConnection({
                user            : "MENU",
                password        : "mayin",
                connectString   : "192.168.3.11/system"
            });
            const data = await con.execute("SELECT COUNT(*) FROM USER_ROLE_DEPT WHERE ROLE_NAME='DEPT-HEAD'");
            callback(null, data.rows);
        }catch(err){
            console.error(err);
        }
    }
    total_dept_head();
  },

  

};
  
  module.exports = Alldepthead;
