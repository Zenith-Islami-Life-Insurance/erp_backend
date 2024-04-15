const Login = require("./Login.model");



//id wise department head details
exports.getLoginById = (req, res) => {
    const personalId = req.params.personalId;
    const password = req.params.password;
    // console.log(personalId);
  
    Login.getById(personalId, password, (err, user_data) => {
      if (err) {
        return res.status(500).json({ error: "Failed to get user data" });
      }
      if (!user_data) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const formattedDeptHead = {
        PERSONALID: user_data[0],
        NAME: user_data[1],
        ROLE_ID: user_data[2],
        ROLE_NAME: user_data[3],
        DEPT_CODE: user_data[4],
        DEPT_NAME: user_data[5],
        PROJECT: user_data[6],
      };
  
      res.json({ user_details: formattedDeptHead });
    });
  };

  
  
