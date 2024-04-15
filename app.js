const express = require("express");
const app = express();
const cors = require("cors");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
const DepartmentRoute = require("./allapi/module/DeptHead/Dept.route");
const LoginRoute = require("./allapi/module/Login/Login.route");
const ModuleRoute = require("./allapi/module/ModuleList/ModuleList.route");
const DeptpermissionRoute = require("./allapi/module/DeptPermission/DeptPermission.route");
const ProposalRoute = require("./allapi/module/ProposalEntry/Proposal.route");
// Home page
app.get("/", (req, res) => {
  res.send(`Wow..!!! Route is Running`);
});

app.use("/api", DepartmentRoute);
app.use("/api", LoginRoute);
app.use("/api", ModuleRoute);
app.use("/api", DeptpermissionRoute);
app.use("/api", ProposalRoute);
module.exports = app;
