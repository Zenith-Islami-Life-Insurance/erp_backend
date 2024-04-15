const ProposalModule = require("./Proposal.model");

exports.InsertProposalDataController = async (req, res) => {
  try {
    const proposals = req.body;
    const results = await ProposalModule.InsertProposalData(
      Array.isArray(proposals) ? proposals : [proposals]
    );
    res.status(201).json("Proposal Entry Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

//all education list
exports.typeList = (req, res) => {
  ProposalModule.getIdTypeList((err, type) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get education list" });
    }

    // Map the dept_head data to the desired format
    const formattedDeptHead = type.map((head) => ({
      type_id: head[0],
      type_name: head[1],
    }));

    res.json(formattedDeptHead);
  });
};

//all education list
exports.educationList = (req, res) => {
  ProposalModule.getEducation((err, education) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get education list" });
    }

    // Map the dept_head data to the desired format
    const formattedDeptHead = education.map((head) => ({
      education_name: head[0],
      education_id: head[1],
    }));

    res.json(formattedDeptHead);
  });
};
//all occupation list
exports.getOccupationList = (req, res) => {
  ProposalModule.getOccupname((err, occupation) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get occupation list" });
    }

    // Map the dept_head data to the desired format
    const formattedDeptHead = occupation.map((head) => ({
      occupation_name: head[0],
      occupation_ID: head[1],
    }));

    res.json(formattedDeptHead);
  });
};

//all COUNTRY list
exports.getCountryList = (req, res) => {
  ProposalModule.getAllCountry((err, country) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get country list" });
    }

    // Map the dept_head data to the desired format
    const formattedDeptHead = country.map((head) => ({
      country_name: head[0],
      country_id: head[1],
    }));

    res.json(formattedDeptHead);
  });
};

//all Gender list
exports.getLocallity = (req, res) => {
  ProposalModule.getAlllocallity((err, locallity) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get locallity list" });
    }

    // Map the dept_head data to the desired format
    const formattedDeptHead = locallity.map((head) => ({
      locallity_name: head[0],
      locallity_id: head[1],
    }));

    res.json(formattedDeptHead);
  });
};
//all Gender list
exports.getAllgenderList = (req, res) => {
  ProposalModule.getAllGender((err, gender) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get gender list" });
    }

    // Map the dept_head data to the desired format
    const formattedDeptHead = gender.map((head) => ({
      gender_name: head[0],
      gender_id: head[1],
    }));

    res.json(formattedDeptHead);
  });
};
//all branch list
exports.getAllbranch = (req, res) => {
  ProposalModule.getAllBranch((err, branch) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get branch list" });
    }

    // Map the dept_head data to the desired format
    const formattedDeptHead = branch.map((head) => ({
      branch_name: head[0],
      branch_id: head[1],
    }));

    res.json(formattedDeptHead);
  });
};

//all project list
exports.getAllprojectt = (req, res) => {
  ProposalModule.getAllproject((err, branch) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get project list" });
    }

    // Map the dept_head data to the desired format
    const formattedDeptHead = branch.map((head) => ({
      project_name: head[0],
      project_code: head[1],
    }));

    res.json(formattedDeptHead);
  });
};
//Chain list
exports.getchainList = (req, res) => {
  const base_project = req.params.base_project;
  const base_code = req.params.base_code;

  ProposalModule.getchainListbyprojectid(
    base_project,
    base_code,
    (err, chain_list) => {
      if (err) {
        return res.status(500).json({ error: "Failed to get module data" });
      }

      if (!chain_list || chain_list.length === 0) {
        return res.status(404).json({ error: "Chain not found" });
      }

      // Assuming each inner array represents a module
      const formattedModuleList = chain_list.map((chainArray) => {
        return {
          chain_name: chainArray[0],
          chain_code: chainArray[1],
          chain_designation: chainArray[2],
        };
      });

      res.json(formattedModuleList);
    }
  );
};

//Proposal information
exports.getProposalInformation = (req, res) => {
  const { proposal_no } = req.query;

  ProposalModule.getProposalInfo(proposal_no, (err, proposal_info) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to get proposal Info data" });
    }

    if (!proposal_info || proposal_info.length === 0) {
      return res.status(404).json({ error: "Proposal Data  not found" });
    }

    // Assuming each inner array represents a module
    const formattedModuleList = proposal_info.map((proposal) => {
      return {
        proposal_no: proposal[0],
        proposal_date: proposal[1],
        risk_date: proposal[2],
        table_id: proposal[3],
        term: proposal[4],
        sum_insure: proposal[5],
        premium: proposal[6],
        sumatrisk: proposal[7],
        proposer: proposal[8],
        salute: proposal[9],
        address1: proposal[10],
        address2: proposal[11],
        city: proposal[12],
        zip: proposal[13],
        mobile: proposal[14],
        dob: proposal[15],
        age: proposal[16],
        age_p_code: proposal[17],
        fatherhusb: proposal[18],
        sex: proposal[19],
        occupation: proposal[20],
        instmode: proposal[21],
        totalinst: proposal[22],
        instno: proposal[23],
        agent_id: proposal[24],
        pd_code: proposal[25],
        mothers_name: proposal[26],
        fathers_name: proposal[27],
        marital_status: proposal[28],
        nid_number: proposal[29],
        plan_desc: proposal[30],
      };
    });

    res.json(formattedModuleList);
  });
};

//policy information
exports.getPolicyInformation = (req, res) => {
  const { policy_no } = req.query;

  ProposalModule.getPolicyInfo(policy_no, (err, policy_info) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get policy Info data" });
    }

    if (!policy_info || policy_info.length === 0) {
      return res.status(404).json({ error: "Proposal Data  not found" });
    }

    // Assuming each inner array represents a module
    const formattedModuleList = policy_info.map((policy) => {
      return {
        policy_no: policy[0],
        proposer: policy[1],
        risk_date: policy[2],
        sum_insure: policy[3],
      };
    });

    res.json(formattedModuleList);
  });
};

//Get Proposal number
exports.getProposalNumber = (req, res) => {
  const { OFFICE_CODE } = req.query;

  ProposalModule.getProposalnNumber(OFFICE_CODE, (err, PN) => {
    if (err) {
      return res.status(500).json({ error: "Proposal number not found" });
    }
    if (!PN) {
      return res.status(404).json({ error: "Proposal number not found" });
    }

    const ProposalNumber = {
      proposal_no: PN[0],
    };

    res.json(ProposalNumber);
  });
};

//AGENT LIST
exports.getAgentList = (req, res) => {
  const base_project = req.params.base_project;

  ProposalModule.getAgentList(base_project, (err, agent_list) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get agent list data" });
    }

    if (!agent_list || agent_list.length === 0) {
      return res.status(404).json({ error: "Agent not found" });
    }

    // Assuming each inner array represents a module
    const formattedModuleList = agent_list.map((agentArray) => {
      return {
        agent_name: agentArray[0],
        agent_code: agentArray[1],
      };
    });

    res.json(formattedModuleList);
  });
};

//DIVISION LIST
exports.getAllDivision = (req, res) => {
  ProposalModule.getDivisionList((err, division) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get division list" });
    }

    // Map the dept_head data to the desired format
    const formattedDeptHead = division.map((head) => ({
      division_name: head[0],
      div_code: head[1],
    }));

    res.json(formattedDeptHead);
  });
};

//Thana list
exports.getThanaList = (req, res) => {
  const div_code = req.params.div_code;

  ProposalModule.getThanaList(div_code, (err, thana_list) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get thana list data" });
    }

    if (!thana_list || thana_list.length === 0) {
      return res.status(404).json({ error: "Thana not found" });
    }

    // Assuming each inner array represents a module
    const formattedModuleList = thana_list.map((thanaArray) => {
      return {
        thana_name: thanaArray[0],
        thana_code: thanaArray[1],
      };
    });

    res.json(formattedModuleList);
  });
};

exports.getPostofficeList = (req, res) => {
  const code = req.params.code;

  ProposalModule.getPostList(code, (err, thana_list) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to get post office list data" });
    }

    if (!thana_list || thana_list.length === 0) {
      return res.status(404).json({ error: "post office not found" });
    }

    // Assuming each inner array represents a module
    const formattedModuleList = thana_list.map((thanaArray) => {
      return {
        postoffice_name: thanaArray[0],
        postoffice_code: thanaArray[1],
      };
    });

    res.json(formattedModuleList);
  });
};

//get commencemnet Date
exports.getCommencementDate = (req, res) => {
  const com_date = req.params.com_date;
  const policy_type = req.params.policy_type;

  ProposalModule.getCommencementDate(
    com_date,
    policy_type,
    (err, comm_date) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Failed to get commencement date" });
      }

      if (!comm_date || comm_date.length === 0) {
        return res.status(404).json({ error: "commencement date not found" });
      }

      const commencement_date = {
        comm_date: comm_date[0],
      };

      res.json(commencement_date);
    }
  );
};

//plan LIST

exports.getAllPlanList = (req, res) => {
  const age = req.params.age;

  ProposalModule.getAllPlan(age, (err, plan_list) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to get mode list list data" });
    }

    if (!plan_list || plan_list.length === 0) {
      return res.status(404).json({ error: "plan list not found" });
    }

    // Assuming each inner array represents a module
    const formattedModuleList = plan_list.map((head) => {
      return {
        plan_id: head[0],
        plan_name: head[1],
        calcu_type: head[2],
        min_age: head[3],
        max_age: head[4],
        min_term: head[5],
        max_term: head[6],
        min_suminsured: head[7],
        max_suminsured: head[8],
      };
    });

    res.json(formattedModuleList);
  });
};

//PAYMENT MODE LIST
exports.getPayModeList = (req, res) => {
  const plan_id = req.params.plan_id;

  ProposalModule.getPaymodeList(plan_id, (err, mode_list) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to get mode list list data" });
    }

    if (!mode_list || mode_list.length === 0) {
      return res.status(404).json({ error: "post mode list not found" });
    }

    // Assuming each inner array represents a module
    const formattedModuleList = mode_list.map((modeArray) => {
      return {
        mode_code: modeArray[0],
        mode_name: modeArray[1],
      };
    });

    res.json(formattedModuleList);
  });
};

//get term list
exports.getTermList = (req, res) => {
  const plan_id = req.params.plan_id;
  const age = req.params.age;

  ProposalModule.getTermList(plan_id, age, (err, term) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get term list" });
    }

    // Map the dept_head data to the desired format
    const formattedDeptHead = term.map((head) => ({
      term: head[0],
    }));

    res.json(formattedDeptHead);
  });
};

//get age
exports.getAgee = (req, res) => {
  const comm_date = req.params.comm_date;
  const dob = req.params.dob;

  ProposalModule.getAge(comm_date, dob, (err, age) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get Date of birth" });
    }

    if (!age || age.length === 0) {
      return res.status(404).json({ error: "Date of birth date not found" });
    }

    const birth_date = {
      age: age[0],
    };

    res.json(birth_date);
  });
};

//get Total Installments
exports.getTotalInstallments = (req, res) => {
  const pay_mode = req.params.pay_mode;
  const term = req.params.term;

  ProposalModule.getTotalInstallment(
    pay_mode,
    term,
    (err, total_installment) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Failed to get total installment" });
      }

      if (!total_installment || total_installment.length === 0) {
        return res.status(404).json({ error: "total installment not found" });
      }

      const t_installment = {
        total_install: total_installment[0],
      };

      res.json(t_installment);
    }
  );
};

//rate calculation
exports.getRateCalcultions = (req, res) => {
  const age = req.params.age;
  const term = req.params.term;
  const table_id = req.params.table_id;

  ProposalModule.getRateCalcultion(
    age,
    term,
    table_id,
    (err, total_installment) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Failed to get rate calculation" });
      }

      if (!total_installment || total_installment.length === 0) {
        return res.status(404).json({ error: "total installment not found" });
      }

      const t_installment = {
        rate: total_installment[0],
      };

      res.json(t_installment);
    }
  );
};

//all premium list
exports.allPremiumList = (req, res) => {
  ProposalModule.getPremiumlist((err, plist) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get premium list" });
    }

    // Map the dept_head data to the desired format
    const premList = plist.map((premium) => ({
      premium: premium[0],
      prem_amt: premium[1],
    }));

    res.json(premList);
  });
};

//all bank list
exports.allBankList = (req, res) => {
  ProposalModule.getBanklist((err, blist) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get bank list" });
    }

    // Map the dept_head data to the desired format
    const bnkList = blist.map((bnk) => ({
      bank_code: bnk[0],
      bank_name: bnk[1],
    }));

    res.json(bnkList);
  });
};

//get bank branch list
exports.getBranchList = (req, res) => {
  const bank_code = req.params.bank_code;

  ProposalModule.getBankBranchList(bank_code, (err, branch) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get term list" });
    }

    // Map the dept_head data to the desired format
    const formattedDeptHead = branch.map((head) => ({
      branch_name: head[0],
      routing_no: head[1],
    }));

    res.json(formattedDeptHead);
  });
};

//supplimentary_class list
exports.supplimentClassList = (req, res) => {
  ProposalModule.getSupplClasslist((err, blist) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get SupplClass list" });
    }

    // Map the supplimentList data to the desired format
    const supplimentList = blist.map((sClas) => ({
      class_id: sClas[0],
      class_name: sClas[1],
    }));

    res.json(supplimentList);
  });
};

//supplimentary list
exports.supplimentList = (req, res) => {
  ProposalModule.getSuppllist((err, blist) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get Suppl list" });
    }

    // Map the supplimentList data to the desired format
    const supplimentList = blist.map((sClas) => ({
      supp_code: sClas[0],
      supp_name: sClas[1],
    }));

    res.json(supplimentList);
  });
};

//get suppliment premium value
exports.getSupplimentValue = (req, res) => {
  const table_id = req.params.table_id;
  const occup_id = req.params.occup_id;
  const supp_type = req.params.supp_type;
  const supp_class = req.params.supp_class;
  const sum_assured = req.params.sum_assured;
  const pay_mode = req.params.pay_mode;

  ProposalModule.getSupplyPremium(
    table_id,
    occup_id,
    supp_type,
    supp_class,
    sum_assured,
    pay_mode,
    (err, branch) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Failed to get suppliment premium value" });
      }

      // Map the dept_head data to the desired format
      const formattedDeptHead = branch.map((head) => ({
        premium: head[0],
      }));

      res.json(formattedDeptHead);
    }
  );
};

//get basic premium value
exports.getBasicPremValue = (req, res) => {
  const table_id = req.params.table_id;
  const term_id = req.params.term_id;
  const age = req.params.age;
  const instmode = req.params.instmode;
  const sum_ass = req.params.sum_ass;
  const planoption = req.params.planoption;

  ProposalModule.getBasicPremium(
    table_id,
    term_id,
    age,
    instmode,
    sum_ass,
    planoption,
    (err, prem) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Failed to get basic premium value" });
      }

      // Map the dept_head data to the desired format
      const formattedDeptHead = prem.map((head) => ({
        basic_premium: head[0],
      }));

      res.json(formattedDeptHead);
    }
  );
};

//get sum at risk
exports.getSumatRisks = (req, res) => {
  const table_id = req.params.table_id;
  const sum_ass = req.params.sum_ass;
  const premium = req.params.premium;
  const factor = req.params.factor;
  const instmode = req.params.instmode;

  ProposalModule.getSumAtRisk(
    table_id,
    sum_ass,
    premium,
    factor,
    instmode,
    (err, prem) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Failed to get basic premium value" });
      }

      // Map the dept_head data to the desired format
      const formattedDeptHead = prem.map((head) => ({
        sum_at_risk: head[0],
      }));

      res.json(formattedDeptHead);
    }
  );
};

//get prem plaan list
exports.getPremPlanList = (req, res) => {
  const sum_assured = req.params.sum_assured;

  ProposalModule.getPremPlanList(sum_assured, (err, premPlan) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get term list" });
    }

    // Map the dept_head data to the desired format
    const formattedDeptHead = premPlan.map((head) => ({
      plan_no: head[0],
      plan_name: head[1],
    }));

    res.json(formattedDeptHead);
  });
};

//get prem plaan list
exports.getEndatDate = (req, res) => {
  const RISKDATE = req.params.RISKDATE;

  ProposalModule.getEndAtdate(RISKDATE, (err, premPlan) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get end at date" });
    }

    // Map the dept_head data to the desired format
    const formattedDeptHead = premPlan.map((head) => ({
      endAtDate: head[0],
    }));

    res.json(formattedDeptHead);
  });
};

//get basic premium rate for ipd
exports.getIpdPremrate = (req, res) => {
  const plan_no = req.params.plan_no;
  const dob = req.params.dob;
  const risk_rate = req.params.risk_rate;
  const instmode = req.params.instmode;
  const table_id = req.params.table_id;

  ProposalModule.getPremRate(
    plan_no,
    dob,
    risk_rate,
    instmode,
    table_id,
    (err, prem) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Failed to get  premium rate value" });
      }

      // Map the dept_head data to the desired format
      const formattedDeptHead = prem.map((head) => ({
        ipd_prem_rate: head[0],
      }));

      res.json(formattedDeptHead);
    }
  );
};

//get rider rate and premium
exports.getRiderRatePremium = (req, res) => {
  const table_id = req.params.table_id;
  const term_id = req.params.term_id;
  const dob = req.params.dob;
  const risk_date = req.params.risk_date;
  const sum_insured = req.params.sum_insured;
  const instmode = req.params.instmode;

  ProposalModule.getRiderRatePrem(
    table_id,
    term_id,
    dob,
    risk_date,
    sum_insured,
    instmode,
    (err, prem) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Failed to get  premium rate value" });
      }

      // Map the dept_head data to the desired format
      const formattedData = prem.map((head) => ({
        prem: head[0],
        rate: head[1],
      }));

      res.json(formattedData);
    }
  );
};

//get waiver premium
exports.getWaiverPremium = (req, res) => {
  const age = req.params.age;
  const plan = req.params.plan;
  const basic_prem = req.params.basic_prem;

  ProposalModule.getWaiverPrem(age, plan, basic_prem, (err, prem) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get waiver premium" });
    }

    // Map the dept_head data to the desired format
    const formattedData = prem.map((head) => ({
      waiver_prem: head[0],
    }));

    res.json(formattedData);
  });
};

//get supplimentary rate
exports.getSupplimentaryRate = (req, res) => {
  const occup_code = req.params.occup_code;
  const supp_code = req.params.supp_code;
  const class_id = req.params.class_id;
  const n_mode = req.params.n_mode;

  ProposalModule.getSuppRate(
    occup_code,
    supp_code,
    class_id,
    n_mode,
    (err, prem) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Failed to get supplimentary rate" });
      }
      // Map the dept_head data to the desired format
      const formattedData = prem.map((head) => ({
        supp_rate: head[0],
      }));

      res.json(formattedData);
    }
  );
};

//get Occupation premium rate
exports.getOccupPremRate = (req, res) => {
  const table_id = req.params.table_id;
  const occup_code = req.params.occup_code;
  const gender = req.params.gender;
  const sum_assured = req.params.sum_assured;
  const last_education = req.params.last_education;
  const last_education_document = req.params.last_education_document;
  const instmode = req.params.instmode;

  ProposalModule.getOErate(
    table_id,
    occup_code,
    gender,
    sum_assured,
    last_education,
    last_education_document,
    instmode,
    (err, prem) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Failed to get supplimentary rate" });
      }
      // Map the dept_head data to the desired format
      const formattedData = prem.map((head) => ({
        oe_ratePrem: head[0],
      }));

      res.json(formattedData);
    }
  );
};

//get Hospital premium rate
exports.getHospitalPremRate = (req, res) => {
  const table_id = req.params.table_id;
  const occup_code = req.params.occup_code;
  const gender = req.params.gender;
  const sum_assured = req.params.sum_assured;
  const last_education = req.params.last_education;
  const last_education_document = req.params.last_education_document;
  const instmode = req.params.instmode;

  ProposalModule.getHospitalPremRate(
    table_id,
    occup_code,
    gender,
    sum_assured,
    last_education,
    last_education_document,
    instmode,
    (err, prem) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Failed to get supplimentary rate" });
      }
      // Map the dept_head data to the desired format
      const formattedData = prem.map((head) => ({
        hos_ratePrem: head[0],
      }));

      res.json(formattedData);
    }
  );
};
