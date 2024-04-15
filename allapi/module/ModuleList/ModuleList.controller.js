const AllModule = require("./ModuleList.model");


exports.createDATA = async (req, res) => {
  const permissions = req.body;

  try {
    const results = await AllModule.create(permissions);
    res.status(201).json("Permission Successfully");
  } catch (error) {
    console.error('Error creating permissions:', error);
    res.status(500).json("Already Permitted");
  }

};


//all modules list
exports.getAllmodules = (req, res) => {
    AllModule.getAllmodule((err, module) => {
      if (err) {
        return res.status(500).json({ error: "Failed to get module list" });
      }
  
      // Map the dept_head data to the desired format
      const formattedDeptHead = module.map((head) => ({
        module_id: head[0],
        module_name: head[1],
        route: head[2],
        created_date: head[3],
        created_by: head[4],
      }));
  
      res.json({ module_list: formattedDeptHead });
    });
  };

  //id wise sub module list
  exports.getModuleById = (req, res) => {
    const catId = req.params.id;
  
    AllModule.getmoduleListId(catId, (err, module_list) => {
      if (err) {
        return res.status(500).json({ error: "Failed to get module data" });
      }
  
      if (!module_list || module_list.length === 0) {
        return res.status(404).json({ error: "Module not found" });
      }
  
      // Assuming each inner array represents a module
      const formattedModuleList = module_list.map(moduleArray => {
        return {
          Module_id: moduleArray[0],
          Module_name: moduleArray[1],
          Module_view_name: moduleArray[2],
          Created_date: moduleArray[3],
          Created_by: moduleArray[4],
        };
      });
  
      res.json({ sub_module_list: formattedModuleList });
    });
  };


    //Dept permission list by moduleId
    exports.getDeptPermissionList = (req, res) => {
      const moduleId = req.params.id;
    
      AllModule.getDeptplistBymoduleId
      (moduleId, (err, dept_list) => {
        if (err) {
          return res.status(500).json({ error: "Failed to get module data" });
        }
    
        if (!dept_list || dept_list.length === 0) {
          return res.status(404).json({ error: "Module not found" });
        }
    
        // Assuming each inner array represents a module
        const formattedModuleList = dept_list.map(moduleArray => {
          return {
            ACCESS_BY: moduleArray[0],
            DEP_NAME: moduleArray[1],
            PROJECT: moduleArray[2],
            PERMIT_STATUS: moduleArray[3],
          };
        });
    
        res.json(formattedModuleList);
      });
    };

    //module id wise department list
    exports.getdeptListByMid = (req, res) => {
      const moduleId = req.params.id;
    
      AllModule.getdeptListByModuleId(moduleId, (err, dept_list) => {
        if (err) {
          return res.status(500).json({ error: "Failed to get module data" });
        }
    
        if (!dept_list || dept_list.length === 0) {
          return res.status(404).json({ error: "Module not found" });
        }
    
        // Assuming each inner array represents a module
        const formattedModuleList = dept_list.map(moduleArray => {
          return {
            department_id: moduleArray[0],
          };
        });
    
        res.json({ department_list: formattedModuleList });
      });
    };

//all dept permission list
exports.deptPermissionlist = (req, res) => {
  AllModule.getdeptParmissionlist((err, module) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get permission list" });
    }

    // Map the dept_head data to the desired format
    const formattedDeptHead = module.map((head) => ({
      module_id: head[0],
      module_name: head[1],
      p_read: head[2],
      p_create: head[3],
      p_edit: head[4],
      p_delete: head[5],
      name: head[6],
      dep_name: head[7],
    }));

    res.json({ dept_permission_list: formattedDeptHead });
  });
};

//total permitted desk user 
exports.totalPermittedDeskUser = (req, res) => {
  AllModule.getTotaldeskuser((err, module) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get total user" });
    }

    // Map the dept_head data to the desired format
    const formattedDeptHead = module.map((head) => ({
      total_user: head[0],

    }));

    // Assuming there is only one element in the formattedDeptHead array
    const resultObject = { total_user: formattedDeptHead[0] };

    res.json(resultObject);
  });
};

//total department head permitted user 
exports.totalPermittedUser = (req, res) => {
  AllModule.getTotaluserlist((err, module) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get total user" });
    }

    // Map the dept_head data to the desired format
    const formattedDeptHead = module.map((head) => ({
      total_user: head[0],

    }));

    // Assuming there is only one element in the formattedDeptHead array
    const resultObject = { total_user: formattedDeptHead[0] };

    res.json(resultObject);
  });
};


//Count total Module for admin 
exports.totalModule = (req, res) => {
  AllModule.getTotalModule((err, module) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get total module" });
    }

    // Map the dept_head data to the desired format
    const formattedDeptHead = module.map((head) => ({
      total_module: head[0],

    }));

    // Assuming there is only one element in the formattedDeptHead array
    const resultObject = { total_module: formattedDeptHead[0] };

    res.json(resultObject);
  });
};

    //permitted depat-head module list personal_id wise
    exports.getdeptmodulelist = (req, res) => {
      const personalId = req.params.id;
    
      AllModule.getdeptHeadModulelist(personalId, (err, module_list) => {
        if (err) {
          return res.status(500).json({ error: "Failed to get module data" });
        }
    
        if (!module_list || module_list.length === 0) {
          return res.status(404).json({ error: "Module not found" });
        }
    
        // Assuming each inner array represents a module
        const formattedModuleList = module_list.map(moduleArray => {
          return {
            Module_name: moduleArray[0],
            Module_id: moduleArray[1],
          };
        });
    
        res.json({ module_list: formattedModuleList });
      });
    };
        //module id wise department list
        exports.getuserListBydeptid = (req, res) => {
          const moduleId = req.params.id;
        
          AllModule.getuserlistBydeptheadId(moduleId, (err, user_list) => {
            if (err) {
              return res.status(500).json({ error: "Failed to get user list data" });
            }
        
            if (!user_list || user_list.length === 0) {
              return res.status(404).json({ error: "User list not found" });
            }
        
            // Assuming each inner array represents a USER
            const formattedModuleList = user_list.map(userArray => {
              return {
                PERSONAL_ID: userArray[0],
                NAME: userArray[1],
                ROLE_ID: userArray[2],
                ROLE_NAME: userArray[3],
                DEP_CODE:userArray[4]
                
              };
            });
        
            res.json({ user_list: formattedModuleList });
          });
        };

  //previlage list
exports.previlageList = (req, res) => {
  AllModule.getprevilagelist((err, module) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get previlage list" });
    }

    // Map the dept_head data to the desired format
    const formattedDeptHead = module.map((head) => ({
      prev_id: head[0],
      prev_name: head[1],

    }));

    res.json({ privilage_list: formattedDeptHead });
  });
};


//get all role list
exports.getRoleList = (req, res) => {
  AllModule.getRoleList((err, module) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get role list" });
    }

    // Map the dept_head data to the desired format
    const formattedDeptHead = module.map((head) => ({
      module_id: head[0],
      module_name: head[1],
      route: head[2],
      created_date: head[3],
      created_by: head[4],
    }));

    res.json({ role_list: formattedDeptHead });
  });
};



    //project list by personal id wise
    exports.getProjectlist = (req, res) => {
      const personalId = req.params.id;
    
      AllModule.getprojectlist(personalId, (err, project_list) => {
        if (err) {
          return res.status(500).json({ error: "Failed to get module data" });
        }
    
        if (!project_list || project_list.length === 0) {
          return res.status(404).json({ error: "Module not found" });
        }
    
        // Assuming each inner array represents a module
        const formattedModuleList = project_list.map(moduleArray => {
          return {
            PROJECT_ID: moduleArray[0]
          };
        });
    
        res.json({ project_list: formattedModuleList });
      });
    };


  
  
