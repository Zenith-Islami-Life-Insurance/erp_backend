const connection = require("../../../utils/ConnectOracle");
const oracledb = require("oracledb");
oracledb.initOracleClient({ libDir: "C:\\instantclient_21_3" });

const AllModule = {
  //PERMISSION FROM SUPER-ADMIN TO DEPT-HEAD
  // create: async (insertData, callback) => {
  //   let con;

  //   try {
  //     con = await oracledb.getConnection({
  //       user: "MENU",
  //       password: "mayin",
  //       connectString: "192.168.3.11/system"
  //     });

  //     const { MODULE_ID, ACCESS_USER,PERMITTED_BY } = insertData;

  //     const result = await con.execute(
  //       "INSERT INTO MENU.MODULE_ACCESS (MODULE_ID, ACCESS_USER,PERMITTED_BY) VALUES (:MODULE_ID, :ACCESS_USER,:PERMITTED_BY)",
  //       {
  //         MODULE_ID: MODULE_ID,
  //         ACCESS_USER: ACCESS_USER,
  //         PERMITTED_BY:PERMITTED_BY
  //       },
  //       { autoCommit: true }
  //     );

  //     callback(null, result.outBinds);
  //   } catch (err) {
  //     console.error(err);
  //     callback(err, null);
  //   } finally {
  //     if (con) {
  //       try {
  //         await con.close();
  //       } catch (err) {
  //         console.error(err);
  //       }
  //     }
  //   }
  // },

  create: async (permissions) => {
    let con;

    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const results = [];

      for (const permission of permissions) {
        const { MODULE_ID, ACCESS_BY, PRIVILAGE_ID, PERMITTED_BY } = permission;

        const result = await con.execute(
          `INSERT INTO MODULE_PRIVILAGE (MODULE_ID, ACCESS_BY, PRIVILAGE_ID, PERMITTED_BY)
          VALUES (:MODULE_ID, :ACCESS_BY, :PRIVILAGE_ID, :PERMITTED_BY)`,
          {
            MODULE_ID,
            ACCESS_BY,
            PRIVILAGE_ID,
            PERMITTED_BY,
          },
          { autoCommit: true }
        );

        results.push(result.outBinds);
      }

      return results;
    } catch (err) {
      console.error(err);
      throw err;
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

  //AL MODULE LIST
  getAllmodule: (callback) => {
    async function allmodule() {
      let con;
      try {
        con = await oracledb.getConnection({
          user: "MENU",
          password: "mayin",
          connectString: "192.168.3.11/system",
        });
        const data = await con.execute("SELECT * FROM MENU.MODULE_GROUP");
        callback(null, data.rows);
      } catch (err) {
        console.error(err);
      }
    }
    allmodule();
  },

  //SUB MODULE LIST
  getmoduleListId: async (catId, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT * FROM MENU.MODULES WHERE GROUP_ID=:catId",
        [catId]
      );

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

  //department list show by moduleid
  getdeptListByModuleId: async (moduleId, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT ACCESS_USER FROM MENU.MODULE_ACCESS WHERE MODULE_ID=:moduleId",
        [moduleId]
      );

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

  //user list show by dept head
  getuserlistBydeptheadId: async (moduleId, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT * FROM USER_ROLE_DEPT WHERE DEPARTMENT=:moduleId AND ROLE_ID=1",
        [moduleId]
      );

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

  //Department Permission list show by module_id
  getDeptplistBymoduleId: async (moduleId, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT ACCESS_BY,DEP_NAME,PROJECT,CASE WHEN P_READ=1 THEN 1 ELSE NULL END PERMITTED_STATUS FROM MENU.MODULE_DETAILS_ALL WHERE ROLE_ID IN(0,2) AND MODULE_ID=:moduleId ORDER BY DEP_NAME",
        [moduleId]
      );

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

  //department permission list from super-admin
  getdeptParmissionlist: (callback) => {
    async function allpermission() {
      let con;
      try {
        con = await oracledb.getConnection({
          user: "MENU",
          password: "mayin",
          connectString: "192.168.3.11/system",
        });
        const data = await con.execute(
          "SELECT  DISTINCT MODULE_ID,MODULE_NAME,P_READ,P_CREATE,P_EDIT,P_DELETE,NAME,DEP_NAME  FROM MODULE_DETAILS_ALL WHERE ROLE_ID='2' AND (P_READ IS  NOT NULL OR P_CREATE IS  NOT NULL OR P_EDIT IS  NOT NULL OR P_DELETE IS  NOT NULL)"
        );
        callback(null, data.rows);
      } catch (err) {
        console.error(err);
      }
    }
    allpermission();
  },

  //total dept head user list
  getTotaluserlist: (callback) => {
    async function total_user() {
      let con;
      try {
        con = await oracledb.getConnection({
          user: "MENU",
          password: "mayin",
          connectString: "192.168.3.11/system",
        });
        const data = await con.execute(
          "SELECT COUNT(DISTINCT DEPARTMENT) AS TOTAL_USER FROM MODULE_DETAILS_ALL WHERE ROLE_ID = '2'"
        );
        callback(null, data.rows);
      } catch (err) {
        console.error(err);
      }
    }
    total_user();
  },

  //total desk user count
  getTotaldeskuser: (callback) => {
    async function total_desk_user() {
      let con;
      try {
        con = await oracledb.getConnection({
          user: "MENU",
          password: "mayin",
          connectString: "192.168.3.11/system",
        });
        const data = await con.execute(
          "SELECT COUNT(DISTINCT ACCESS_BY) AS TOTAL_USER FROM MODULE_DETAILS_ALL WHERE ROLE_ID = '1'"
        );
        callback(null, data.rows);
      } catch (err) {
        console.error(err);
      }
    }
    total_desk_user();
  },

  //count total module list
  getTotalModule: (callback) => {
    async function total_module() {
      let con;
      try {
        con = await oracledb.getConnection({
          user: "MENU",
          password: "mayin",
          connectString: "192.168.3.11/system",
        });
        const data = await con.execute(
          "SELECT COUNT(*) FROM MENU.MODULE_GROUP"
        );
        callback(null, data.rows);
      } catch (err) {
        console.error(err);
      }
    }
    total_module();
  },

  //DEPT HEAD MODULE LIST FETCH PERSONAL_ID WISE
  getdeptHeadModulelist: async (personalId, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT MODULE_NAME,MODULE_ID FROM MODULE_DETAILS_ALL WHERE ACCESS_BY=:personalId AND (P_READ IS  NOT NULL OR P_CREATE IS  NOT NULL OR P_EDIT IS  NOT NULL OR P_DELETE IS  NOT NULL)",
        [personalId]
      );

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

  //previlige list list
  getprevilagelist: (callback) => {
    async function allprevilage() {
      let con;
      try {
        con = await oracledb.getConnection({
          user: "MENU",
          password: "mayin",
          connectString: "192.168.3.11/system",
        });
        const data = await con.execute("SELECT * FROM MENU.PRIVILAGE_LIST");
        callback(null, data.rows);
      } catch (err) {
        console.error(err);
      }
    }
    allprevilage();
  },

  //ALL ROLE LIST
  getRoleList: (callback) => {
    async function roleList() {
      let con;
      try {
        con = await oracledb.getConnection({
          user: "MENU",
          password: "mayin",
          connectString: "192.168.3.11/system",
        });
        const data = await con.execute(
          "SELECT ROLE_ID,ROLE_NAME FROM MENU.MENU_ROLE WHERE ROLE_ID>2 ORDER  BY ROLE_NAME"
        );
        callback(null, data.rows);
      } catch (err) {
        console.error(err);
      }
    }
    roleList();
  },

  //PROJECT LIST FETCH BY PERSONAL_ID
  getprojectlist: async (personalId, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT  DISTINCT PROJECT FROM MENU.USER_ROLE_DEPT WHERE PERSONALID=:personalId  AND DSGN=(SELECT MAX(DSGN) FROM MENU.USER_ROLE_DEPT WHERE PERSONALID=:personalId)",
        [personalId]
      );

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
};

module.exports = AllModule;
