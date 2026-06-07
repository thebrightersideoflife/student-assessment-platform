// src/data/questions/ITSEA/week13.js
export default [

  // ── SCENARIO ────────────────────────────────────────────────────────────────
  {
    id: "SCENARIO_ITSEA_W13",
    type: "scenario",
    title: "Questions 1–4: Project Management, Planning & Quality Management (50 Marks)",
    context: `Helios Health Technologies is a rapidly growing healthcare technology company that develops software used by hospitals, clinics, and emergency medical services across several countries.\n\nThe company is currently replacing its fragmented collection of legacy applications with a single integrated digital health platform. The new platform will manage:\n• Patient admissions\n• Electronic health records\n• Medical inventory\n• Billing and insurance claims\n• Emergency response coordination\n• Analytics and reporting\n\nThe project involves multiple software teams distributed across different countries. Several modules have already experienced schedule overruns due to changing requirements from healthcare regulators and hospital administrators.\n\nSenior management has become concerned about project delays, cost overruns, communication problems between teams, inconsistent software quality, defects discovered late in development, and difficulties estimating future releases.\n\nHelios has appointed a new Program Director responsible for project planning, risk management, people management, quality management, estimation, and process improvement.\n\nAll questions must be answered with reference to the scenario.`,
  },

  // ── QUESTION 1: Managing Large Software Projects ─────────────────────────────

  // Q1.1 Multiple Choice
  {
    id: "ITSEA_W13_Q1",
    type: "multiple-choice",
    tags: ["project management", "software processes"],
    sectionLabel: "1.1",
    text: "A major concern for Helios is that project managers cannot accurately determine progress simply by observing the software being developed.\n\nWhich characteristic of software engineering **best** explains this challenge?",
    options: [
      "Software products are highly reusable.",
      "Software processes are always standardized.",
      "Software is intangible.",
      "Software projects are always outsourced.",
    ],
    correctAnswers: ["Software is intangible."],
    points: 1,
    explanation:
      "Unlike physical engineering products — where progress is visible through tangible artefacts such as steel frames or circuit boards — **software is intangible**. Managers cannot observe its state directly and must instead rely on plans, milestone reports, metrics, and code reviews to infer progress.\n\nThis fundamental distinction between software engineering and traditional engineering disciplines is one reason project management in software is particularly challenging.",
  },

  // Q1.2 Fill in the Blank
  {
    id: "ITSEA_W13_Q2",
    type: "fill-in-the-blank",
    tags: ["risk management", "project management"],
    sectionLabel: "1.2",
    text: "The project manager creates backup response plans that will be activated if identified risks materialise. These plans are called ___ plans.",
    blanks: [
      {
        id: "b1",
        options: ["Contingency", "Deployment", "Quality", "Iteration"],
        correctAnswer: "Contingency",
      },
    ],
  },

  // Q1.3 Open-ended
  {
    id: "ITSEA_W13_Q3",
    type: "open-ended",
    tags: ["risk management", "requirements analysis"],
    sectionLabel: "1.3",
    text: "Helios discovers that regulatory changes may require significant redesign of patient-record modules.\n\nThis risk primarily belongs to which category? *(Answer using only 1–3 words.)*",
    correctAnswers: ["Project risk", "Project risks", "Project"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 20,
      allowPartialMatch: true,
    },
    explanation:
      "**Project risks** are threats to the project schedule, resources, or scope — rather than to the software itself or the business.\n\nRegulatory changes directly affect the *project*: they can force redesign, extend timelines, and increase costs. This makes them project risks, distinguishing them from *product risks* (software quality defects) or *business risks* (strategic/market viability).",
  },

  // Q1.4 Multiple Choice
  {
    id: "ITSEA_W13_Q4",
    type: "multiple-choice",
    tags: ["risk management", "project management"],
    sectionLabel: "1.4",
    text: "A software architect unexpectedly resigns halfway through development.\n\nWhich risk-management activity should have occurred **before** this event to reduce project impact?",
    options: [
      "Risk monitoring",
      "Risk planning",
      "Proposal writing",
      "Progress reporting",
    ],
    correctAnswers: ["Risk planning"],
    points: 1,
    explanation:
      "**Risk planning** is a *proactive* activity that occurs before a risk event. It involves identifying potential risks (such as key-staff departure), assessing their likelihood and impact, and defining mitigation or contingency strategies — for example, cross-training developers, maintaining documentation, or identifying backup hires.\n\n- **Risk monitoring** is reactive — it tracks known risks *after* they have been identified, during execution.\n- **Proposal writing** and **progress reporting** are unrelated to risk response strategy.",
  },

  // Q1.5 Essay
  {
    id: "ITSEA_W13_Q5",
    type: "show-answer",
    tags: ["project management", "software processes", "managerial impact"],
    sectionLabel: "1.5",
    text: "The Program Director argues that the project's greatest challenge is not technology but **people**.\n\n**Critically evaluate this statement** using principles of:\n- People management\n- Motivation\n- Team cohesion\n- Communication\n- Personality types\n\nDiscuss how these factors may directly affect project success or failure at Helios.",
    correctAnswers: [
      "Software projects are often constrained less by technology and more by the effectiveness of the people involved. Helios' healthcare platform involves geographically distributed teams, regulatory pressure, and complex stakeholder relationships — conditions under which people management becomes a decisive success factor.\n\n**People management** establishes the foundation. Effective managers demonstrate consistency, honesty, inclusion, and respect, building the trust that reduces conflict and enables honest reporting. Distributed teams at Helios particularly depend on deliberate communication structures because misunderstandings can propagate defects and schedule delays across multiple country-based modules.\n\n**Motivation** directly influences productivity and quality. Developers whose social, esteem, and self-realisation needs are addressed are more likely to take ownership of quality, contribute innovative solutions, and remain committed during difficult phases. A team that feels undervalued or micro-managed produces lower-quality work and is at higher risk of attrition.\n\n**Personality types** contribute different strengths. Task-oriented individuals drive technical excellence and meet deadlines. Interaction-oriented individuals strengthen collaboration and morale. Self-oriented individuals can be innovative but may require closer alignment with team goals. Effective managers balance these types rather than standardising behaviour, ensuring each contribution is valued.\n\n**Team cohesion** creates shared ownership of outcomes. Cohesive teams exchange knowledge more effectively, maintain consistent quality standards, and reduce single-point-of-failure risk when key staff leave. For a project as large and complex as Helios' integrated platform, cohesion across distributed teams is especially critical.\n\n**Communication** failures are frequently the direct cause of defects, rework, duplicated effort, and missed milestones. In a healthcare environment where software defects may have patient-safety consequences, poor communication carries elevated risk.\n\nConsequently, while technical competence is necessary, successful project management at Helios depends equally on managing human factors — making the Program Director's argument well-founded.",
    ],
    markingGuide: `| Criterion | Marks |\n|---|---|\n| People management principles (consistency, respect, honesty, inclusion) | 2 |\n| Motivation discussion (needs, productivity, commitment) | 2 |\n| Personality types (task / interaction / self-oriented) | 1 |\n| Team cohesion (knowledge sharing, quality, continuity) | 1 |\n| Communication impact (delays, defects, distributed teams) | 1 |\n| Applied to Helios scenario | 1 |\n| **Total** | **8** |\n\n**Common errors:**\n- Listing factors without discussing their *interaction*\n- Discussing motivation in general terms without linking to project outcomes\n- Omitting the healthcare/safety consequence of poor communication`,
    points: 8,
    image: {
        src: "/images/ITSEA_W13_Q5.png",
        alt: "Distributed healthcare software development teams connected through varying communication links, including an unfilled senior architect role, delayed project timeline indicators, and unresolved cross-team issues.",
        caption: "Figure 1: Organisational structure and communication patterns observed within the Helios Health Technologies development programme."
        }
  },

  // ── QUESTION 2: Project Planning and Scheduling ──────────────────────────────

  // Q2.1 Multiple Choice
  {
    id: "ITSEA_W13_Q6",
    type: "multiple-choice",
    tags: ["project management", "software processes"],
    sectionLabel: "2.1",
    text: "Helios is preparing a bid for a government healthcare contract.\n\nAt which stage of the project lifecycle is planning primarily being performed?",
    options: [
      "Maintenance phase",
      "Proposal stage",
      "Deployment phase",
      "Validation phase",
    ],
    correctAnswers: ["Proposal stage"],
    points: 1,
    explanation:
      "**Project planning begins at the proposal stage** — before the project is approved or contracted. Planners must estimate cost, duration, and resource requirements to support the bid.\n\nThis early planning is inherently uncertain but necessary for securing contracts and setting realistic expectations. Subsequent planning iterations occur throughout the project lifecycle as information becomes more reliable.",
  },

  // Q2.2 Fill in the Blank
  {
    id: "ITSEA_W13_Q7",
    type: "fill-in-the-blank",
    tags: ["project management"],
    sectionLabel: "2.2",
    text: "A point in a project schedule used to assess progress is known as a ___.",
    blanks: [
      {
        id: "b1",
        options: ["Milestone", "Sprint", "Baseline", "Checkpoint"],
        correctAnswer: "Milestone",
      },
    ],
  },

  // Q2.3 Open-ended
  {
    id: "ITSEA_W13_Q8",
    type: "open-ended",
    tags: ["project management"],
    sectionLabel: "2.3",
    text: "Name the graphical scheduling tool most commonly used to represent project schedules. *(Answer in 1–3 words.)*",
    correctAnswers: ["Gantt chart", "Gantt", "Gantt Chart"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 20,
      allowPartialMatch: true,
    },
    explanation:
      "A **Gantt chart** is a horizontal bar chart that represents project tasks, their durations, and dependencies along a timeline. It is the most widely used scheduling tool in project management.\n\nGantt charts help project managers identify the critical path, visualise resource allocation, and communicate schedules to stakeholders.",
  },

  // Q2.4 Multiple Choice
  {
    id: "ITSEA_W13_Q9",
    type: "multiple-choice",
    tags: ["project management", "managerial impact"],
    sectionLabel: "2.4",
    text: "A project manager proposes adding ten new developers to a severely delayed module.\n\nAccording to software scheduling principles, why might this **worsen** delays?",
    options: [
      "Increased licensing costs",
      "Reduced testing effort",
      "Communication overheads increase",
      "Coding standards become weaker",
    ],
    correctAnswers: ["Communication overheads increase"],
    points: 1,
    explanation:
      "This describes **Brooks' Law**: *\"Adding manpower to a late software project makes it later.\"*\n\nAs team size grows, the number of communication channels increases non-linearly. New developers also require onboarding time from existing staff, temporarily *reducing* the effective output of experienced team members.\n\nFor a module already behind schedule, the disruption of onboarding and the additional communication overhead often outweigh the benefit of the extra capacity.",
      image: {
        src: "/images/ITSEA_W13_Q9.png",
        alt: "Two software development teams working on the same project. The first team contains four developers connected through communication links. The second team contains twelve developers with substantially more communication links between members. Both teams appear under schedule pressure.",
        caption: "Communication structures observed in two software development teams assigned to projects with similar delivery deadlines."
        }
  },

  // Q2.5 Multiple Choice
  {
    id: "ITSEA_W13_Q10",
    type: "multiple-choice",
    tags: ["software processes", "project management"],
    sectionLabel: "2.5",
    text: "Which statement **best** distinguishes Agile planning from plan-driven development?",
    options: [
      "Agile eliminates planning entirely.",
      "Agile plans are fixed once approved.",
      "Agile planning continuously adapts to changing priorities.",
      "Agile planning prohibits estimation.",
    ],
    correctAnswers: ["Agile planning continuously adapts to changing priorities."],
    points: 1,
    explanation:
      "**Agile planning is iterative and adaptive** — plans are revisited at the start of each iteration based on new information, stakeholder feedback, and changing requirements.\n\nPlan-driven approaches emphasise comprehensive upfront planning and treat changes as controlled exceptions requiring formal re-planning.\n\nAgile does *not* eliminate planning or estimation — it simply treats them as ongoing activities rather than one-time events.",
  },

  // Q2.6 Essay
  {
    id: "ITSEA_W13_Q11",
    type: "show-answer",
    tags: ["software processes", "project management", "risk management"],
    sectionLabel: "2.6",
    text: "Senior executives insist on adopting a **fully plan-driven approach** because the healthcare sector is highly regulated.\n\nThe development teams argue for **Agile planning**.\n\n**Critically compare both approaches** and recommend an appropriate strategy for Helios.\n\nYour answer should consider:\n- Requirements volatility\n- Regulatory compliance\n- Customer involvement\n- Distributed teams\n- Project risk\n- Delivery schedules",
    correctAnswers: [
      "Neither approach is universally superior, and an uncritical adoption of either would create risks for Helios.\n\n**Plan-driven development** produces extensive documentation, clear schedules, and traceable decisions — attributes that directly support regulatory compliance and audit requirements in the healthcare sector. It provides strong management visibility and is well-suited to large systems where requirements can be defined upfront. However, it is less responsive to change: when healthcare regulators update requirements mid-project, re-planning cycles introduce delays. Early decisions may become obsolete before implementation.\n\n**Agile planning** responds effectively to changing requirements, which is valuable given Helios' experience with regulatory updates and evolving hospital administrator expectations. Iterative delivery enables early feedback and reduces the risk of building the wrong system. However, Agile requires continuous, active customer participation — challenging when stakeholders include regulatory bodies across multiple countries. Large distributed teams also struggle with the coordination demands of Agile ceremonies. Formal documentation — essential for compliance auditing — may be insufficient unless explicitly built into the process.\n\n**For Helios**, neither pure approach is appropriate:\n\n- Healthcare regulations *demand* documentation, traceability, and formal sign-off.\n- Requirements *will* change due to regulatory and clinical updates.\n- Distributed teams create coordination challenges that traditional Agile models do not fully address.\n\nA **hybrid approach** is therefore recommended:\n- Plan-driven governance for compliance, documentation, and release approvals.\n- Agile delivery within development teams for responsiveness and incremental progress.\n- Regular release planning and iteration planning to align both governance and delivery cadences.\n- Formal quality controls combined with incremental feature delivery.\n\nThis combines the auditability of plan-driven methods with the adaptability of Agile, matching the regulatory and operational realities of a multinational healthcare platform.",
    ],
    markingGuide: `| Criterion | Marks |\n|---|---|\n| Plan-driven advantages (documentation, compliance, visibility) | 2 |\n| Plan-driven limitations (inflexibility, change cost) | 1 |\n| Agile advantages (adaptability, feedback, incremental delivery) | 2 |\n| Agile limitations (customer participation, distributed teams, documentation) | 1 |\n| Application to Helios scenario | 1 |\n| Justified hybrid recommendation | 1 |\n| **Total** | **8** |\n\n**Common errors:**\n- Treating the two approaches as mutually exclusive\n- Recommending Agile without addressing compliance documentation requirements\n- Recommending plan-driven without acknowledging requirements volatility\n- Generic comparison with no reference to Helios`,
    points: 8,
    image: {
        src: "/images/ITSEA_W13_Q11.png",
        alt: "Two software project timelines showing different planning approaches, release frequencies, documentation levels, customer feedback loops, and requirement changes over time.",
        caption: "Comparison of two software project delivery approaches used within different divisions of Helios Health Technologies."
        }
  },

  // ── QUESTION 3: Quality Management and Standards ─────────────────────────────

  // Q3.1 Multiple Choice
  {
    id: "ITSEA_W13_Q12",
    type: "multiple-choice",
    tags: ["code quality", "managerial impact"],
    sectionLabel: "3.1",
    text: "The quality team at Helios reports directly to executive management rather than software developers.\n\nWhy is this structure desirable?",
    options: [
      "It reduces development costs.",
      "It improves programmer productivity.",
      "It preserves independent quality assessment.",
      "It eliminates testing activities.",
    ],
    correctAnswers: ["It preserves independent quality assessment."],
    points: 1,
    explanation:
      "Quality teams must remain **organisationally independent** to evaluate software objectively, without pressure from development teams to approve substandard work.\n\nIf quality assurance reported to the development manager, there would be a structural conflict of interest: the same manager responsible for delivery speed would also control quality sign-off. Reporting to executive management removes this conflict and preserves the credibility of quality assessments.",
    image: {
        src: "/images/ITSEA_W13_Q12.png",
        alt: "Organisational structure of a healthcare software company showing executive management, software development, testing, quality assurance, compliance, and customer support departments with their reporting relationships.",
        caption: "Reporting structure adopted for software governance and operational oversight at Helios Health Technologies."
        }
  },

  // Q3.2 Fill in the Blank
  {
    id: "ITSEA_W13_Q13",
    type: "fill-in-the-blank",
    tags: ["code quality", "software processes"],
    sectionLabel: "3.2",
    text: "A documented description of desired product qualities, quality goals, and assessment procedures is called a ___ plan.",
    blanks: [
      {
        id: "b1",
        options: ["Quality", "Test", "Release", "Deployment"],
        correctAnswer: "Quality",
      },
    ],
  },

  // Q3.3 Open-ended
  {
    id: "ITSEA_W13_Q14",
    type: "open-ended",
    tags: ["code quality", "managerial impact"],
    sectionLabel: "3.3",
    text: "Which international framework is commonly used as the basis for organisational quality management systems? *(Answer using 1–3 words.)*",
    correctAnswers: ["ISO 9001", "ISO9001", "ISO 9001:2015"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 10,
      allowPartialMatch: true,
    },
    explanation:
      "**ISO 9001** is the internationally recognised standard for quality management systems (QMS). It specifies requirements for organisations that want to demonstrate their ability to consistently provide products and services that meet customer and regulatory requirements.\n\nOrganisations achieve ISO 9001 *certification* by demonstrating conformance to its process requirements through an independent audit.",
  },

  // Q3.4 Multiple Choice
  {
    id: "ITSEA_W13_Q15",
    type: "multiple-choice",
    tags: ["software processes", "code quality"],
    sectionLabel: "3.4",
    text: "Which of the following is a **process standard** rather than a product standard?",
    options: [
      "Requirements document structure",
      "Method header format",
      "Change control process",
      "Java programming style",
    ],
    correctAnswers: ["Change control process"],
    points: 1,
    explanation:
      "**Process standards** define *how work is performed* — they specify activities, procedures, and workflows. The **change control process** is a procedural standard governing how changes are requested, evaluated, and approved.\n\n**Product standards** define characteristics of deliverables:\n- Requirements document structure → defines the *form* of a document\n- Method header format → defines the *appearance* of code\n- Java programming style → defines *coding conventions*\n\nAll three product examples describe what an artefact should *look like*, not how work should be *carried out*.",
  },

  // Q3.5 Multiple Choice
  {
    id: "ITSEA_W13_Q16",
    type: "multiple-choice",
    tags: ["validation & verification", "code quality"],
    sectionLabel: "3.5",
    text: "A review team formally examines design documents and test plans **before implementation begins**.\n\nThis practice is most closely associated with:",
    options: [
      "Program execution testing",
      "Quality reviews and inspections",
      "Cost estimation",
      "Agile backlog refinement",
    ],
    correctAnswers: ["Quality reviews and inspections"],
    points: 1,
    explanation:
      "**Quality reviews and inspections** are *static* verification techniques — they examine software artefacts (documents, designs, code) without executing the software.\n\nReviewing documents *before implementation* is a particularly valuable practice because defects found at the design stage are far less expensive to fix than defects discovered during testing or production.\n\nThis is distinct from **program execution testing**, which requires working code to run.",
  },

  // Q3.6 Essay
  {
    id: "ITSEA_W13_Q17",
    type: "show-answer",
    tags: ["code quality", "software processes", "managerial impact"],
    sectionLabel: "3.6",
    text: "Helios has recently achieved **ISO 9001 certification**.\n\nSome executives claim this proves that the company's software is high quality.\n\n**Evaluate this claim critically.**\n\nYour discussion should include:\n- Software quality concepts\n- ISO 9001 strengths\n- Limitations of standards-based quality assurance\n- User-perceived quality\n- Organisational quality culture",
    correctAnswers: [
      "ISO 9001 certification is a significant achievement, but the executive claim overstates what it demonstrates.\n\n**ISO 9001** provides an internationally recognised framework for quality management systems. Certification confirms that Helios follows documented, consistent processes for quality planning, control, and improvement. This encourages organisational discipline, reduces process variation, and supports auditability — all valuable properties in a regulated healthcare environment.\n\nHowever, **certification measures conformance to procedures, not necessarily product excellence**. A company can meticulously follow its documented processes and still produce software that is unreliable, difficult to use, or poorly suited to clinical workflows. ISO 9001 does not specify what those processes must achieve in terms of product attributes.\n\nSoftware quality is multi-dimensional. **Reliability**, **usability**, **maintainability**, **performance**, and **security** must be independently evaluated. A system that crashes during emergency response coordination or that clinicians find confusing is not high quality — regardless of certification status.\n\n**User-perceived quality** is often the most important dimension. Patients and clinicians evaluate quality through their direct experience: does the system work consistently? Is it fast? Does it help them do their jobs? These perceptions are not captured by process audits.\n\n**Organisational quality culture** is equally critical. Certification can create a compliance mindset where employees focus on satisfying documentation requirements rather than genuinely improving software. Sustainable quality requires employees to actively identify and resolve quality issues — a cultural disposition that standards alone cannot instil.\n\nIn conclusion, ISO 9001 is a valuable **enabling framework** that supports consistent processes, but it should not be equated with software quality. Helios should use certification as a foundation and supplement it with rigorous technical quality practices, user testing, and a genuine culture of continuous improvement.",
    ],
    markingGuide: `| Criterion | Marks |\n|---|---|\n| Definition / explanation of ISO 9001 | 1 |\n| Benefits of certification (consistency, compliance, auditability) | 2 |\n| Limitations (process conformance ≠ product quality) | 2 |\n| User-perceived quality discussion | 1 |\n| Quality culture discussion | 1 |\n| Critical conclusion / evaluation | 1 |\n| **Total** | **8** |\n\n**Common errors:**\n- Equating certification with software quality\n- Listing ISO 9001 benefits without critically evaluating limitations\n- Omitting user-perceived quality or treating it as a minor point\n- Failing to distinguish *process quality* from *product quality*`,
    points: 8,
    image: {
        src: "/images/ITSEA_W13_Q17.png",
        alt: "Corporate organisational chart showing executive management, software development, testing, quality assurance, compliance, and customer support reporting relationships.",
        caption: "Governance structure adopted for quality oversight within Helios Health Technologies."
        }
  },

  // ── QUESTION 4: Estimation, Metrics and Decision-Making ──────────────────────

  // Q4.1 Multiple Choice
  {
    id: "ITSEA_W13_Q18",
    type: "multiple-choice",
    tags: ["project management"],
    sectionLabel: "4.1",
    text: "Helios estimates effort by comparing the new healthcare platform with **previously completed projects**.\n\nWhich estimation technique is being used?",
    options: [
      "Dynamic measurement",
      "Experience-based estimation",
      "Pair programming",
      "Quality inspection",
    ],
    correctAnswers: ["Experience-based estimation"],
    points: 1,
    explanation:
      "**Experience-based estimation** (also called analogical estimation) derives effort and cost estimates by comparing the new project with similar completed projects, using historical data and expert judgement.\n\nIt is distinct from algorithmic models (such as COCOMO) that apply mathematical formulas to measurable project attributes. Experience-based estimation is practical when historical data from comparable projects is available, as is the case at Helios.",
  },

  // Q4.2 Fill in the Blank
  {
    id: "ITSEA_W13_Q19",
    type: "fill-in-the-blank",
    tags: ["software processes", "project management"],
    sectionLabel: "4.2",
    text: "In Agile planning, the amount of work completed by a team over time is referred to as team ___.",
    blanks: [
      {
        id: "b1",
        options: ["Velocity", "Throughput", "Capacity", "Bandwidth"],
        correctAnswer: "Velocity",
      },
    ],
  },

  // Q4.3 Open-ended
  {
    id: "ITSEA_W13_Q20",
    type: "open-ended",
    tags: ["code quality"],
    sectionLabel: "4.3",
    text: "Measurements collected **while software is running** are known as ________ metrics. *(Supply the missing word only.)*",
    correctAnswers: ["Dynamic", "dynamic"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 10,
      allowPartialMatch: false,
    },
    explanation:
      "**Dynamic metrics** are collected during *software execution* — for example, response time, memory usage, CPU utilisation, and defect discovery rates during testing.\n\nThey are contrasted with **static metrics**, which are derived from examining software artefacts (source code, documentation) without running the program — for example, lines of code, cyclomatic complexity, and coupling measurements.",
  },

  // Q4.4 Multiple Choice
  {
    id: "ITSEA_W13_Q21",
    type: "multiple-choice",
    tags: ["project management", "software processes"],
    sectionLabel: "4.4",
    text: "Which metric would be considered a **process metric**?",
    options: [
      "Cyclomatic complexity",
      "Number of methods per class",
      "Time taken to complete code inspections",
      "Number of database tables",
    ],
    correctAnswers: ["Time taken to complete code inspections"],
    points: 1,
    explanation:
      "**Process metrics** measure characteristics of the *development process* — activities, workflows, and team performance — rather than the software product itself.\n\n**Time taken to complete code inspections** measures an activity, making it a process metric.\n\nThe other options are all **product metrics**:\n- *Cyclomatic complexity* — measures code structural complexity\n- *Number of methods per class* — measures object-oriented design\n- *Number of database tables* — measures data architecture\n\nAll three describe properties of the software artefact, not the process used to create it.",
  },

  // Q4.5 Essay
  {
    id: "ITSEA_W13_Q22",
    type: "show-answer",
    tags: ["project management", "managerial impact", "code quality"],
    sectionLabel: "4.5",
    text: "Helios intends to build a predictive analytics program that uses **software metrics** to improve project forecasting.\n\n**Critically discuss** how software measurement can support management decision-making, while also explaining the **limitations and risks** of relying heavily on metrics.",
    correctAnswers: [
      "Software measurement provides organisations with objective information that can improve planning, quality management, and project control. By collecting quantitative data, Helios can move from intuition-based management to evidence-based decision-making.\n\n**Benefits of measurement:**\n\n*Effort estimation* improves when managers analyse historical project data — previous effort, defect density, and inspection effectiveness all inform more accurate forecasts. *Product metrics* such as cyclomatic complexity identify components most likely to contain defects, enabling targeted quality assurance before testing.\n\n*Process metrics* help evaluate organisational performance. Inspection duration, defect discovery rates, and issue resolution times allow managers to identify bottlenecks and improve efficiency. *Software analytics* extends these capabilities by analysing large volumes of operational and development data to uncover trends and support strategic decisions.\n\n**Limitations of measurement:**\n\nMany important quality attributes — maintainability, usability, and reliability as experienced by users — cannot be directly measured. Managers instead rely on *proxy measurements* that may not accurately represent actual quality. For example, low cyclomatic complexity does not guarantee that a module is easy to understand or modify.\n\n*Context matters significantly.* A metric that predicts quality in one project may be meaningless in another — team experience, technology stack, domain complexity, and organisational environment all affect interpretation.\n\nMetrics can also be *misinterpreted*: correlation does not imply causation. A complex component may contain more defects not because complexity causes defects, but because both result from unclear requirements.\n\nFinally, measurement introduces *administrative overhead* and can create *perverse incentives* — teams may focus on improving metrics rather than improving software if performance evaluation relies too heavily on quantitative targets.\n\n**Conclusion:**\n\nSoftware measurement is a powerful management tool, but it should *inform* managerial judgement rather than replace it. The most effective organisations combine quantitative metrics with professional expertise, contextual awareness, and continuous critical evaluation of what their measurements actually mean.",
    ],
    markingGuide: `| Criterion | Marks |\n|---|---|\n| Benefits of measurement (estimation, decision support) | 2 |\n| Product metrics discussion (complexity, defect prediction) | 1 |\n| Process metrics discussion (inspection time, bottlenecks) | 1 |\n| Software analytics / forecasting discussion | 1 |\n| Limitations (unmeasurable qualities, context, misinterpretation, overhead) | 2 |\n| Balanced critical conclusion | 1 |\n| **Total** | **8** |\n\n**Common errors:**\n- Treating metrics as inherently beneficial without discussing limitations\n- Confusing product metrics with process metrics\n- Failing to discuss the risk of perverse incentives or proxy measurement weaknesses\n- Generic conclusion that does not address the Helios scenario`,
    points: 8,
    image: {
        src: "/images/ITSEA_W13_Q22.png",
        alt: "Software engineering dashboard displaying trends in defects, code complexity, productivity indicators, requirement changes, release frequency, and inspection findings across multiple software modules.",
        caption: "Figure 4: Engineering performance data collected from the Helios Health Technologies software programme."
        }
  },
];