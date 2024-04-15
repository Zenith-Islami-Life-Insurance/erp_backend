const express = require("express");
const router = express.Router();
const DeptController = require("./Dept.controller");

router
.get("/department-head-list", DeptController.getAllHead)
.get("/department-head/:id", DeptController.getDepartmentyById)
.get("/total-depthead", DeptController.totalDepthead)

module.exports = router;
