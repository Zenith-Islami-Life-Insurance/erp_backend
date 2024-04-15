const connection = require("../../../utils/ConnectOracle");
const oracledb = require("oracledb");
oracledb.initOracleClient({ libDir: "C:\\instantclient_21_3" });

const DeptPermission = {
  //PERMISSION FROM DEPT-HEAD TO DESK
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

  //PERMISSION FROM DEPT-HEAD TO DESK
  Newcreate: async (permission) => {
    let con;

    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const results = [];

      const {
        MODULE_ID,
        ACCESS_BY,
        PRIVILAGE_ID,
        PERMITTED_BY,
        PROCESS,
        TYPE,
      } = permission;

      const result = await con.execute(
        `BEGIN MENU.MODULE_INSERT_DELETE(:MODULE_ID,:ACCESS_BY,:PRIVILAGE_ID,:PERMITTED_BY,:PROCESS,:TYPE); END;`,
        {
          MODULE_ID,
          ACCESS_BY,
          PRIVILAGE_ID,
          PERMITTED_BY,
          PROCESS,
          TYPE,
        },
        { autoCommit: true }
      );

      results.push(result.outBinds);

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
  //PERMISSION FROM DEPT-HEAD TO DESK

  //PERMISSION LIST BY DEPARTMENT_HEAD
  getpermissionList: async (dept_head_id, dept_id, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT MODULE_ID,MODULE_NAME,P_READ,P_CREATE,P_EDIT,P_DELETE,NAME,DEP_NAME,PERMITTED_BY,ACCESS_BY FROM MODULE_DETAILS_ALL WHERE PERMITTED_BY=:dept_head_id AND DEPARTMENT=:dept_id ORDER BY MODULE_ID",
        {
          dept_head_id: dept_head_id,
          dept_id: dept_id,
        }
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

  //PRIVILAGE LIST FOR DESK USER
  getDeskUserPrevList: async (module_id, dept_id, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT  ACCESS_BY,NAME,P_READ,P_CREATE,P_EDIT,P_DELETE FROM MODULE_DETAILS_ALL WHERE  MODULE_ID=:module_id AND DEPARTMENT=:dept_id AND ROLE_ID='1'",
        {
          module_id: module_id,
          dept_id: dept_id,
        }
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

  //PRIVILAGE LIST BY  MODULE_ID FOR ROLE WISE PERMISSION
  getPrivilageListModuleId: async (module_id, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT DISTINCT ROLE_ID, ROLE_NAME, MODULE_ID, P_READ,P_CREATE,P_EDIT,P_DELETE FROM (SELECT DISTINCT ROLE_ID, ROLE_NAME, MODULE_ID, TYPE_NAME, CASE WHEN A.ROLE_ID=B.TYPE_ID THEN PRIVILAGE_ID ELSE NULL END PRIVILAGE_ID FROM MENU.MENU_ROLE A,(SELECT DISTINCT X.MODULE_ID,TYPE_ID,TYPE_NAME, CASE WHEN X.MODULE_ID=Y.MODULE_ID THEN PRIVILAGE_ID ELSE NULL END PRIVILAGE_ID FROM MENU.MODULES X,MENU.MODULE_ROLE Y) B WHERE A.ROLE_ID NOT IN (0,1,2,9) AND TYPE_NAME='ROLE' ) PIVOT(MIN (PRIVILAGE_ID) FOR PRIVILAGE_ID IN (1 P_READ, 2 P_CREATE, 3 P_EDIT, 4 P_DELETE)) WHERE MODULE_ID=:module_id ORDER BY ROLE_NAME",
        {
          module_id: module_id,
        }
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
  //PRIVILAGE LIST BY  MODULE_ID FOR PROJECT WISE PERMISSION
  getProjectPrevModuleId: async (module_id, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT DISTINCT CODE, NAME, MODULE_ID, P_READ,P_CREATE,P_EDIT,P_DELETE FROM(SELECT DISTINCT CODE, NAME, MODULE_ID, TYPE_NAME, CASE WHEN A.CODE=B.TYPE_ID THEN PRIVILAGE_ID ELSE NULL END PRIVILAGE_ID FROM POLICY_MANAGEMENT.PD A,(SELECT DISTINCT X.MODULE_ID,TYPE_ID,TYPE_NAME, CASE WHEN X.MODULE_ID=Y.MODULE_ID THEN PRIVILAGE_ID ELSE NULL END PRIVILAGE_ID FROM MENU.MODULES X,MENU.MODULE_ROLE Y) B WHERE A.CODE!='18' AND TYPE_NAME='PROJECT') PIVOT (MIN (PRIVILAGE_ID) FOR PRIVILAGE_ID IN (1 P_READ, 2 P_CREATE, 3 P_EDIT, 4 P_DELETE))WHERE MODULE_ID=:module_id ORDER BY CODE",
        {
          module_id: module_id,
        }
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

  //DESK EMPLOYEE MODULE LIST PERMISSION WISE
  getdeskpermissionModulelist: async (personalId, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        // "SELECT M.MODULE_NAME, M.MODULE_ID,MA.PRIVILAGE_ID,MA.PERMITTED_BY FROM MENU.MODULE_PRIVILAGE MA JOIN MENU.MODULES M ON MA.module_id = M.module_id WHERE MA.ACCESS_BY =:personalId",
        "SELECT MODULE_ID,MODULE_NAME,P_READ,P_CREATE,P_EDIT,P_DELETE FROM MODULE_DETAILS_ALL WHERE ACCESS_BY =:personalId",
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

  //SINGLE PREVILAGE DETAILS BY ACCESS_ID + MODULE_ID
  getSinglePrivilage: async (access_by, module_id, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT MODULE_ID,MODULE_NAME,P_READ,P_CREATE,P_EDIT,P_DELETE,NAME,DEP_NAME,PERMITTED_BY,ACCESS_BY FROM MODULE_DETAILS_ALL WHERE ACCESS_BY=:access_by AND MODULE_ID=:module_id",
        {
          access_by: access_by,
          module_id: module_id,
        }
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

  //MODULE LIST BY PROJECT_ID
  getModuleListbyProjId: async (personalId, project_id, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT MODULE_NAME,MODULE_ID,P_READ,P_CREATE,P_EDIT,P_DELETE from MODULE_DETAILS_ALL WHERE PROJECT=:project_id AND PERSONALID=:personalId",
        {
          personalId: personalId,
          project_id: project_id,
        }
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
  //AL MODULE LIST getAllPermit created Mayin
  getAllPermit: (callback) => {
    async function allPermit() {
      let con;
      try {
        con = await oracledb.getConnection({
          user: "MENU",
          password: "mayin",
          connectString: "192.168.3.11/system",
        });
        const data = await con.execute("SELECT * FROM MENU.SAIFUR_FIRST");
        callback(null, data.rows);
      } catch (err) {
        console.error(err);
      }
    }
    allPermit();
  },




};

module.exports = DeptPermission;
