// src/data/questions/ITSEA/week6.js
// Module: Software Process, Architecture Design and Quality Assurance
// Week 6 Assessment — Software Evolution & Legacy Systems
// Total Marks: 50

export default [

  // ── SECTION A SCENARIO ──────────────────────────────────────────────────────

  {
    id: "SCENARIO_ITSEA_W6_A",
    type: "scenario",
    title: "Question 1: Software Evolution in Practice (25 Marks)",
    context: `A national e-Government Tax Management System has been in operation for over 12 years. It processes tax returns, manages citizen data, and integrates with banking systems. Due to changing tax laws, increasing cybersecurity threats, and demand for real-time analytics, the system must continuously evolve. However, the system has become increasingly complex, and maintenance costs are rising.`,
  },

  // ── QUESTION 1.1 (3 Marks) ──────────────────────────────────────────────────

  {
    id: "ITSEA_W6_Q1_1",
    type: "show-answer",
    sectionLabel: "1.1",
    text: "Consider the environmental and business factors surrounding the e-Government Tax System. Formulate an argument explaining why software evolution in this context is an inevitable, continuous process rather than a final, solvable phase.",
    correctAnswers: [
      "Software evolution is inevitable and continuous for three key reasons:\n\n1. Constant environmental change: The system must adapt to new tax laws, cybersecurity threats, and changing user expectations. These external forces are never static — a system that cannot respond to them becomes progressively less useful and compliant.\n\n2. Technological adaptation: As new architectures, security standards, and integration requirements emerge (e.g., real-time analytics, new banking APIs), the system must be updated to remain compatible and secure.\n\n3. Lehman's Law of Continuing Change: Systems that are used in real-world environments must be continually adapted to remain satisfactory. Failure to evolve means the system becomes increasingly misaligned with business reality, eventually becoming a liability rather than an asset.",
    ],
    markingGuide:
      "Award 1 mark for discussing constant changes in the external environment (e.g., new tax laws, cybersecurity threats). Award 1 mark for explaining the need to adapt to new technological architectures or security standards. Award 1 mark for referencing Lehman's Law of Continuing Change — that systems must evolve or progressively become less useful.",
    points: 3,
  },

  // ── QUESTION 1.2 (4 Marks) ──────────────────────────────────────────────────

  {
    id: "ITSEA_W6_Q1_2A",
    type: "open-ended",
    sectionLabel: "1.2 Part A",
    text: "Which specific evolutionary model explicitly incorporates risk analysis and iterative cycles, making it highly suited for the long-term maintenance of the Tax Management System?",
    correctAnswers: ["Spiral Model", "The Spiral Model", "Spiral"],
    validationOptions: {
      caseSensitive: false,
      tolerance: 10,
    },
    points: 1,
  },

  {
    id: "ITSEA_W6_Q1_2B",
    type: "show-answer",
    sectionLabel: "1.2 Part B",
    text: "Based on the Spiral Model identified in Part A, discuss how its structure specifically supports the long-term maintenance of the Tax Management System.",
    correctAnswers: [
      "The Spiral Model supports long-term maintenance through three structural properties:\n\n1. Iterative loops allow continuous evaluation of evolving requirements: Each spiral cycle revisits planning, design, and evaluation — meaning new tax law requirements or analytics demands can be incorporated in the next loop without disrupting the entire system.\n\n2. Dedicated risk assessment mitigates the danger of breaking complex legacy code: Before each implementation phase, risks are explicitly identified and evaluated. For a 12-year-old system with rising complexity, this prevents reckless changes that could cause cascading failures.\n\n3. Prototyping ensures new requirements are accurately validated before full deployment: For example, new tax calculation rules can be prototyped and simulated with real data before being released to the public, dramatically reducing the chance of compliance errors.",
    ],
    markingGuide:
      "Award 1 mark for explaining how iterative loops allow continuous evaluation of evolving requirements. Award 1 mark for explaining how the dedicated risk assessment phase mitigates the danger of modifying complex legacy code. Award 1 mark for explaining how prototyping ensures new tax regulations are accurately validated before full deployment.",
    points: 3,
  },

  // ── QUESTION 1.3 (6 Marks) ──────────────────────────────────────────────────

  {
    id: "ITSEA_W6_Q1_3A",
    type: "fill-in-the-blank",
    sectionLabel: "1.3 Part A",
    text: "The standard software evolution process follows a sequence of key activities. The cycle begins with Change Analysis, moves to ___ planning, followed by system implementation, and concludes with system ___.",
    blanks: [
      {
        id: "b1",
        options: ["evolution", "resource", "release", "strategic"],
        correctAnswer: "release",
      },
      {
        id: "b2",
        options: ["validation", "deployment", "integration", "maintenance"],
        correctAnswer: "deployment",
      },
    ],
    points: 2,
  },

  {
    id: "ITSEA_W6_Q1_3B",
    type: "show-answer",
    sectionLabel: "1.3 Part B",
    text: "Analyse how Change Analysis and Release Planning (the first two activities in the evolution process) contribute to managing system changes effectively and preventing uncontrolled complexity.",
    correctAnswers: [
      "Change Analysis: This activity evaluates the cost, impact, and feasibility of a proposed change before any implementation begins. For the Tax Management System, this means assessing how a new tax regulation change will affect existing components — such as the tax calculation engine, reporting modules, and banking integrations. By identifying ripple effects early, the team prevents breaking stable parts of the system and avoids costly emergency fixes later. It is the gatekeeping step that separates necessary changes from unnecessary complexity.\n\nRelease Planning: Once changes are approved, release planning prioritises them, groups logically related changes into cohesive releases, and schedules them to minimise disruption. For a live government system, this is critical — changes cannot be deployed in an ad hoc manner. By batching related tax law updates into a single planned release, the team ensures the system remains stable and users are not subjected to frequent, disruptive partial updates.",
    ],
    markingGuide:
      "Award 2 marks for Change Analysis: must explain evaluating cost/impact/feasibility (1 mark) and how this prevents breaking the system or introducing uncontrolled complexity (1 mark). Award 2 marks for Release Planning: must explain prioritisation and grouping of changes (1 mark) and how this keeps the system stable during transitions (1 mark).",
    points: 4,
  },

  // ── QUESTION 1.4 (4 Marks) ──────────────────────────────────────────────────

  {
    id: "ITSEA_W6_Q1_4",
    type: "multiple-choice",
    sectionLabel: "1.4",
    text: "The Tax System is transitioning from its original plan-based development team to an agile evolution team. Which of the following represents the MOST severe challenge the agile team will face during this handover?",
    options: [
      "The agile team will be unable to use iterative sprints because the system is already deployed.",
      "The plan-based team will have produced extensive documentation, but the agile team's methodology lacks the structure to maintain or update it effectively, leading to knowledge degradation over time.",
      "Agile methodologies strictly prohibit the maintenance of older systems built with waterfall models.",
      "The agile team will require real-time analytics, which a plan-based legacy system cannot provide under any circumstances.",
    ],
    correctAnswers: [
      "The plan-based team will have produced extensive documentation, but the agile team's methodology lacks the structure to maintain or update it effectively, leading to knowledge degradation over time.",
    ],
    points: 4,
  },

  // ── QUESTION 1.5 (4 Marks) ──────────────────────────────────────────────────

  {
    id: "ITSEA_W6_Q1_5",
    type: "show-answer",
    sectionLabel: "1.5",
    text: "The system is currently experiencing a high number of urgent change requests due to snap changes in tax regulations. Discuss WHY these urgent changes bypass standard protocols, and evaluate the specific risks this introduces to the system.",
    correctAnswers: [
      "Why urgent changes bypass standard protocols:\nUrgent changes occur when waiting for the standard change analysis and release planning cycle is operationally impossible. For the Tax Management System, examples include: a critical security vulnerability discovered in the citizen data module (leaving it unpatched exposes millions of citizens to data theft), or a sudden change in tax law with a government-mandated compliance deadline that cannot wait for the next scheduled release. In both cases, the cost of inaction outweighs the risk of bypassing standard procedures.\n\nRisks introduced by bypassing standard processes:\n1. Poor or missing documentation: Changes made under pressure are rarely documented thoroughly, degrading the system's knowledge base and making future maintenance increasingly difficult.\n2. Lack of regression testing: Without proper testing cycles, the urgent fix may inadvertently break other components — for example, a patch to the tax calculation engine could corrupt integration with the banking system.\n3. Architectural degradation: Repeated emergency patches introduce technical debt, reduce code cohesion, and increase system complexity — directly contributing to the rising maintenance costs described in the scenario.",
    ],
    markingGuide:
      "Award 2 marks for explaining why urgent changes occur — must reference specific valid drivers such as critical security flaws or sudden legal compliance mandates where delay is unacceptable (1 mark per valid reason, up to 2). Award 2 marks for the risks — must identify specific consequences such as poor documentation, lack of regression testing, or architectural degradation linked to real maintenance impact (1 mark per valid risk, up to 2).",
    points: 4,
  },

  // ── QUESTION 1.6 (4 Marks) ──────────────────────────────────────────────────

  {
    id: "ITSEA_W6_Q1_6A",
    type: "multiple-choice",
    sectionLabel: "1.6 Part A",
    text: "Which of the following accurately distinguishes between the 'Servicing' and 'Phase-out' stages of a system lifecycle?",
    options: [
      "Servicing involves adding major new architectural features; Phase-out involves migrating data to the cloud.",
      "Servicing involves only essential tactical changes (e.g., critical bug fixes) with no architectural updates; Phase-out involves keeping the system operational to extract data while no further changes of any kind are made.",
      "Servicing is synonymous with evolution; Phase-out is when the system is immediately shut down and replaced.",
      "Servicing focuses exclusively on hardware maintenance; Phase-out focuses on retiring software licences.",
    ],
    correctAnswers: [
      "Servicing involves only essential tactical changes (e.g., critical bug fixes) with no architectural updates; Phase-out involves keeping the system operational to extract data while no further changes of any kind are made.",
    ],
    points: 3,
  },

  {
    id: "ITSEA_W6_Q1_6B",
    type: "open-ended",
    sectionLabel: "1.6 Part B",
    text: "Based on the scenario provided — where the Tax Management System continues to receive new features and updates driven by regulatory and technological demands — state the exact lifecycle stage this system is currently in.",
    correctAnswers: ["Evolution", "The Evolution stage", "Evolution stage"],
    validationOptions: {
      caseSensitive: false,
      tolerance: 10,
    },
    points: 1,
  },

  // ── SECTION B SCENARIO ──────────────────────────────────────────────────────

  {
    id: "SCENARIO_ITSEA_W6_B",
    type: "scenario",
    title: "Question 2: Legacy Systems and Strategic Decision-Making (25 Marks)",
    context: `A large insurance company relies on a legacy claims processing system built on outdated technology. The system is reliable but difficult to modify, poorly documented, and incompatible with modern mobile platforms.\n\nThe company wants to introduce new features such as AI-based risk assessment and mobile claims submission.`,
  },

  // ── QUESTION 2.1 (3 Marks) ──────────────────────────────────────────────────

  {
    id: "ITSEA_W6_Q2_1A",
    type: "fill-in-the-blank",
    sectionLabel: "2.1 Part A",
    text: "A legacy system is an older, often ___ socio-technical computer system that remains in use because it is essential to core business processes.",
    blanks: [
      {
        id: "b1",
        options: ["obsolete", "distributed", "documented", "standardized"],
        correctAnswer: "obsolete",
      },
    ],
    points: 1,
  },

  {
    id: "ITSEA_W6_Q2_1B",
    type: "show-answer",
    sectionLabel: "2.1 Part B",
    text: "Explain why the insurance company cannot simply turn off this legacy system despite its obvious limitations.",
    correctAnswers: [
      "The insurance company cannot turn off the legacy system for two critical reasons:\n\n1. Business continuity: The system is actively processing current insurance claims and generating revenue. Shutting it down immediately would halt all claims processing, creating massive financial and legal liability for the company.\n\n2. Embedded undocumented business rules and historical data: Over years of operation, critical business logic — such as how specific claim types are assessed, what fraud thresholds trigger investigations, and how regulatory compliance is enforced — has been embedded directly in the system's code, often without documentation. Turning the system off risks permanently losing these rules and the historical claims data, making any replacement system non-compliant from day one.",
    ],
    markingGuide:
      "Award 1 mark for explaining business continuity — the system is actively processing claims and generating operational revenue. Award 1 mark for explaining the risk of losing historical data or embedded, undocumented business rules that are vital to ongoing operations and compliance.",
    points: 2,
  },

  // ── QUESTION 2.2 (6 Marks) ──────────────────────────────────────────────────

  {
    id: "ITSEA_W6_Q2_2A",
    type: "multiple-choice",
    sectionLabel: "2.2 Part A",
    text: "A socio-technical legacy system is made up of several distinct components. Which of the following sets lists THREE components that are ALL legitimately part of a legacy socio-technical system — with no items that belong to a different category (such as project management artefacts or network infrastructure) incorrectly included?",
    options: [
      "Hardware; Application Software; Sprint Backlog",
      "Support Software; Business Processes; Application Data",
      "Source Code Repository; Business Policies; End-User Devices",
      "Organisational Processes; Change Request Log; Hardware",
    ],
    correctAnswers: [
      "Support Software; Business Processes; Application Data",
    ],
    points: 3,
  },

  {
    id: "ITSEA_W6_Q2_2B",
    type: "show-answer",
    sectionLabel: "2.2 Part B",
    text: "Explain how a change in the 'Application Software' component of the insurance legacy system forces a cascading effect on the other components you identified.",
    correctAnswers: [
      "A change in the Application Software triggers a cascading effect across the entire socio-technical system because all components are interdependent:\n\nFor example, updating the claims processing software to support AI-based risk assessment may require upgraded Hardware (new servers with GPU capability for ML inference), which in turn demands updated Support Software (new operating systems and runtime environments compatible with the hardware). Staff operating the system must then adapt their Business Processes (new claims workflows reflecting how AI assessments are reviewed and overridden), and the Application Data formats may need restructuring to feed the new AI models with correctly structured input. Finally, Business Policies governing claim approval authority may need rewriting to define when a human must override an AI decision.\n\nThis cascading effect illustrates why changes to legacy systems are expensive and risky — a seemingly simple software update ripples through every dimension of the socio-technical system.",
    ],
    markingGuide:
      "Award up to 3 marks for a logical, well-reasoned explanation of the cascading socio-technical interaction. The answer must clearly trace how an Application Software change forces changes in at least two other named components (1 mark each), and should demonstrate an understanding that the components are interdependent rather than isolated (1 mark for overall coherence of the argument).",
    points: 3,
  },

  // ── QUESTION 2.3 (4 Marks) ──────────────────────────────────────────────────

  {
    id: "ITSEA_W6_Q2_3",
    type: "multiple-choice",
    sectionLabel: "2.3",
    text: "The insurance company is considering completely replacing the legacy claims system. Which of the following represents the most significant HIDDEN risk associated with a full replacement strategy?",
    options: [
      "The cost of purchasing modern cloud-based server hardware.",
      "The new system may run faster, causing users to make data-entry errors due to reduced processing time.",
      "Critical, undocumented business rules embedded in the legacy code over decades may be lost during replacement, causing compliance failures and incorrect claim processing.",
      "Modern programming languages are inherently less secure than older, established languages like COBOL.",
    ],
    correctAnswers: [
      "Critical, undocumented business rules embedded in the legacy code over decades may be lost during replacement, causing compliance failures and incorrect claim processing.",
    ],
    points: 4,
  },

  // ── QUESTION 2.4 (6 Marks) ──────────────────────────────────────────────────

  {
    id: "ITSEA_W6_Q2_4A",
    type: "open-ended",
    sectionLabel: "2.4 Part A",
    text: "The insurance company wants to improve maintainability by restructuring and rewriting parts of the system without changing its core business functionality. What specific legacy management strategy is this?",
    correctAnswers: ["Reengineering", "System Reengineering", "Software Reengineering"],
    validationOptions: {
      caseSensitive: false,
      tolerance: 20,
    },
    points: 2,
  },

  {
    id: "ITSEA_W6_Q2_4B",
    type: "show-answer",
    sectionLabel: "2.4 Part B",
    text: "The company wants to add AI-based risk assessment and mobile claims submission. Evaluate the three legacy management strategies of Maintain, Reengineer, and Replace. Then recommend the most suitable strategy and justify your choice in the context of the scenario.",
    correctAnswers: [
      "Maintain: Keeping the system as-is with only minimal bug fixes is clearly inadequate for this scenario. It does not address the fundamental incompatibility with mobile platforms and provides no pathway to integrating AI-based risk assessment. While cheapest in the short term, it guarantees the company falls further behind competitors and accumulates further technical debt.\n\nReengineer: Reengineering improves code structure and maintainability while preserving existing business logic. This could allow the system to be modernised incrementally — for example, exposing claims data via APIs that a new mobile front-end could consume. However, if the core architecture is fundamentally incompatible with ML workloads (e.g., a batch-processing system designed for overnight runs), reengineering alone may not deliver real-time AI capabilities.\n\nReplace: Full replacement carries the highest cost and risk (lost business rules, project failure risk, operational disruption during migration), but it is the only strategy that truly enables the introduction of modern AI inference pipelines and native mobile applications built on contemporary architectures.\n\nRecommendation: Replace (or a phased Replace via API wrapping/Strangler Pattern) is most appropriate. The business requirements — AI-based risk assessment and mobile-first claims — demand a fundamentally different technical architecture. Reengineering alone cannot bridge this gap. The replacement should be executed incrementally to preserve operational continuity and recover embedded business rules before decommissioning the legacy system.",
    ],
    markingGuide:
      "Award 1 mark for evaluating Maintain (must identify its failure to meet mobile/AI requirements). Award 1 mark for evaluating Reengineer (must acknowledge both its benefit and its architectural limitation for AI/mobile). Award 1 mark for evaluating Replace (must acknowledge both its transformative potential and its high risk/cost). Award 1 mark for a clear recommendation with a justification directly linked to the scenario's AI and mobile requirements.",
    points: 4,
  },

  // ── QUESTION 2.5 (4 Marks) ──────────────────────────────────────────────────

  {
    id: "ITSEA_W6_Q2_5",
    type: "multiple-choice",
    sectionLabel: "2.5",
    text: "When assessing the legacy claims system, the company determines it has HIGH Business Value (it processes millions in active claims) but LOW Technical Quality (outdated, hard to modify, poorly documented). According to standard legacy system portfolio assessment models, what is the most appropriate strategic response?",
    options: [
      "Scrap the system entirely and immediately to stop accumulating technical debt.",
      "Continue normal maintenance and accept the technical debt as a permanent cost of business.",
      "Reengineer the system to improve its technical quality while deliberately preserving its high business value and embedded business rules.",
      "Replace the system with off-the-shelf insurance software and discard all historical claims data.",
    ],
    correctAnswers: [
      "Reengineer the system to improve its technical quality while deliberately preserving its high business value and embedded business rules.",
    ],
    points: 4,
  },

  // ── QUESTION 2.6 (2 Marks) ──────────────────────────────────────────────────

  {
    id: "ITSEA_W6_Q2_6",
    type: "fill-in-the-blank",
    sectionLabel: "2.6",
    text: "When deciding the future of a legacy system, specific system metrics are analysed. Tracking the volume of data processed by the system helps assess system ___, while tracking the number of change requests submitted over time helps evaluate system ___.",
    blanks: [
      {
        id: "b1",
        options: ["availability", "scalability", "complexity", "interoperability"],
        correctAnswer: "complexity",
      },
      {
        id: "b2",
        options: ["reliability", "instability", "maintainability", "usability"],
        correctAnswer: "maintainability",
      },
    ],
    points: 2,
  },
];