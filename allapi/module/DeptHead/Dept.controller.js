const Alldepthead = require("./Dept.model");

//all department head list
exports.getAllHead = (req, res) => {
  Alldepthead.getDeptHeadlist((err, dept_head) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get dept_head list" });
    }

    // Map the dept_head data to the desired format
    const formattedDeptHead = dept_head.map((head) => ({
      dept_head_id: head[0],
      short_name: head[1],
      role_id: head[2],
      full_name: head[3],
      department_code: head[4],
      department_name: head[5],
    }));

    res.json({ dept_head: formattedDeptHead });
  });
};

//id wise department head details
exports.getDepartmentyById = (req, res) => {
  const catId = req.params.id;
  // console.log(catId);

  Alldepthead.getById(catId, (err, dept_head) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get department data" });
    }

    if (!dept_head) {
      return res.status(404).json({ error: "Department Head Data not found" });
    }

    const formattedDeptHead = {
      dept_head_id: dept_head[0],  
      short_name: dept_head[1], 
      employee_id: dept_head[2],
      full_name: dept_head[3],
      department_name:dept_head[4],
    };

    res.json({ dept_head_details: formattedDeptHead });
  });
};

//Count total department incharge
exports.totalDepthead = (req, res) => {
  Alldepthead.getTotalDeptHead((err, module) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get total department head" });
    }

    // Map the dept_head total data to the desired format
    const formattedDeptHead = module.map((head) => ({
      total_depthead: head[0],

    }));

    // Assuming there is only one element in the formattedDeptHead array
    const resultObject = { total_depthead: formattedDeptHead[0] };

    res.json(resultObject);
  });
};
