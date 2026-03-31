// src/data/questions/ITSEA/week2.js
export default [

  // ── QUESTION 1: National Smart Transportation System ──────────────────────

  {
    id: "SCENARIO_ITSEA_W2_Q1",
    type: "scenario",
    title: "Question 1: National Smart Transportation System (25 Marks)",
    context: `A government agency is developing a National Smart Transportation System (NSTS). The system integrates buses, trains, and traffic sensors to provide real-time route optimisation, digital ticketing, congestion monitoring, and predictive maintenance alerts.\n\nThe system must:\n- Handle large-scale real-time data\n- Integrate with existing legacy systems\n- Remain reliable during peak usage\n- Adapt to frequent policy and infrastructure changes\n\nRequirements are initially unclear and expected to evolve throughout development.`,
  },

  // 1.1 — open-ended (keyword validated, reveal answer)
  {
    id: "ITSEA_W2_Q1_1A",
    type: "show-answer",
    sectionLabel: "1.1",
    text: "Explain why it is essential to manage changing requirements effectively in this project.",
    correctAnswers: [
      "Managing changing requirements is essential because the system operates in a dynamic environment where policies, technologies, and user needs evolve. If changes are not handled effectively, it can lead to rework, increased costs, and system inconsistencies. Proper management ensures the system remains relevant, functional, and aligned with stakeholder needs throughout development."
    ],
    markingGuide: "Award 1 mark for identifying the changing/dynamic environment. Award 1 mark for explaining the impact of poor change management (rework, cost, inconsistencies). Award 1 mark for linking effective management to system success and alignment with stakeholder needs.",
    points: 3,
  },

  // 1.2 — show-answer
  {
    id: "ITSEA_W2_Q1_2",
    type: "show-answer",
    sectionLabel: "1.2",
    text: "Discuss how change anticipation and change tolerance can be applied to reduce the cost of rework in this system.",
    correctAnswers: [
      "Change anticipation involves predicting possible changes early — for example, by developing prototypes to explore system features and refine requirements before full implementation. Change tolerance involves designing the system so that changes can be incorporated easily, typically through incremental development, where modifications can be made to specific increments without affecting the entire system. Together, these approaches reduce rework costs and improve flexibility throughout the project lifecycle."
    ],
    markingGuide: "Award 1 mark for a correct explanation of change anticipation. Award 1 mark for a relevant example (e.g., prototyping). Award 1 mark for a correct explanation of change tolerance. Award 1 mark for linking both concepts to reduced rework cost or improved flexibility.",
    points: 4,
  },

  // 1.3 — show-answer
  {
    id: "ITSEA_W2_Q1_3",
    type: "show-answer",
    sectionLabel: "1.3",
    text: "Analyse why different subsystems (e.g., real-time monitoring, ticketing, maintenance prediction) may require different software engineering approaches or techniques.",
    correctAnswers: [
      "Different subsystems have distinct requirements and constraints, making a single uniform approach inefficient. The real-time monitoring subsystem requires high-performance and real-time processing techniques to handle continuous data streams without delay. The ticketing subsystem requires transaction processing and data integrity mechanisms to ensure payment accuracy and reliability. The predictive maintenance subsystem may use data analysis and evolving models, requiring flexibility and iterative refinement. Applying tailored techniques to each subsystem improves overall performance, reliability, and long-term maintainability of the system."
    ],
    markingGuide: "Award 2 marks for a clear explanation of why differences in subsystem requirements necessitate different approaches. Award 2 marks for correctly describing at least two subsystem examples with appropriate reasoning. Award 1 mark for a conclusion that justifies the need for varied techniques across subsystems.",
    points: 5,
  },

  // 1.4 — show-answer
  {
    id: "ITSEA_W2_Q1_4",
    type: "show-answer",
    sectionLabel: "1.4",
    text: "Compare the Waterfall model and the Incremental development model for this project. Your answer should include key characteristics of each model, as well as their advantages and disadvantages in this context.",
    correctAnswers: [
      "The Waterfall model follows sequential phases — requirements, design, implementation, and testing — each completed before the next begins. Its key advantage is strong documentation and process control, making it suitable for stable, well-defined requirements. However, it is inflexible to change and delays testing until late in the lifecycle, which is a significant risk for NSTS where requirements are unclear and evolving. The Incremental development model builds the system in small, iterative releases with ongoing feedback. It handles changing requirements more effectively and supports early delivery of usable features. Its disadvantages include potential degradation of system structure over time and reduced process visibility for managers. For NSTS, where requirements evolve and early functionality is valuable, the incremental model is more suitable than Waterfall."
    ],
    markingGuide: "Award 2 marks for correctly explaining the Waterfall model with at least one advantage and one disadvantage in context. Award 2 marks for correctly explaining the Incremental model with at least one advantage and one disadvantage in context. Award 2 marks for a contextual comparison that evaluates both models against the specific needs of NSTS.",
    points: 6,
  },

  // 1.5 — show-answer
  {
    id: "ITSEA_W2_Q1_5",
    type: "show-answer",
    sectionLabel: "1.5",
    text: "Recommend the most suitable process model for this system. Justify your answer with reference to: requirement volatility, need for early delivery, and system complexity.",
    correctAnswers: [
      "The incremental development model is the most suitable choice for NSTS. Given high requirement volatility, incremental development supports iterative updates as requirements are clarified and change over time. The need for early delivery is met by releasing functional increments — such as the ticketing or monitoring subsystem — before the full system is complete. The system's complexity is managed by breaking development into smaller, more controllable parts, reducing overall risk. Continuous stakeholder feedback further ensures the system evolves in alignment with real-world needs."
    ],
    markingGuide: "Award 1 mark for correctly identifying the incremental development model. Award 1 mark per well-justified reason tied to the scenario (requirement volatility, early delivery, system complexity) — up to 3 marks. Full marks require at least two strong, scenario-specific justifications.",
    points: 4,
  },

  // 1.6 — fill-in-the-blank (testing stages order) + show-answer for justification
  {
    id: "ITSEA_W2_Q1_6A",
    type: "fill-in-the-blank",
    sectionLabel: "1.6 Part A",
    text: "Software validation ensures the system meets its specifications and user expectations. The three main stages of testing, in order, are: ___ testing, ___ testing, and ___ testing.",
    blanks: [
      {
        id: "b1",
        options: ["Component", "System", "Customer"],
        correctAnswer: "Component",
      },
      {
        id: "b2",
        options: ["Component", "System", "Customer"],
        correctAnswer: "System",
      },
      {
        id: "b3",
        options: ["Component", "System", "Customer"],
        correctAnswer: "Customer",
      },
    ],
    points: 2,
  },

  {
    id: "ITSEA_W2_Q1_6B",
    type: "show-answer",
    sectionLabel: "1.6 Part B",
    text: "Explain the role of software validation (V&V) in ensuring system quality. Include the purpose of validation and briefly justify why System Testing must precede Customer Testing in the NSTS project.",
    correctAnswers: [
      "Software validation ensures that the system meets its specifications and fulfils the expectations of its end users. Component testing verifies individual parts in isolation, system testing integrates all components and verifies that they function correctly together, and customer testing evaluates the system against real user needs and scenarios. System testing must precede customer testing in NSTS because it ensures all integrated subsystems — monitoring, ticketing, and maintenance — work together correctly before exposing the system to end users. Releasing an unvalidated integrated system to customers risks critical failures that are costly and difficult to diagnose."
    ],
    markingGuide: "Award 1 mark for stating the purpose of validation (meeting specifications and user expectations). Award 1 mark for naming and briefly explaining all three testing stages. Award 1 mark for a clear justification of why system testing precedes customer testing, with reference to the NSTS context.",
    points: 3,
  },

  // ── QUESTION 2: CampusServe Smart Services Platform ───────────────────────

  {
    id: "SCENARIO_ITSEA_W2_Q2",
    type: "scenario",
    title: "Question 2: CampusServe Smart Services Platform (10 Marks)",
    context: `CampusServe is developing a Smart Campus Services Platform that allows students and staff to:\n- Pay for services (printing, parking, events)\n- Manage accounts\n- View transaction history\n- Receive real-time notifications\n\nThe system is being developed using an incremental (agile) approach, with frequent releases and ongoing user feedback.`,
  },

  // 2.1 — show-answer
  {
    id: "ITSEA_W2_Q2_1",
    type: "show-answer",
    sectionLabel: "2.1",
    text: "Explain how incremental development benefits this project.",
    correctAnswers: [
      "Incremental development benefits CampusServe by allowing early delivery of core features — for example, the payment module can be released and used by students before the full platform is complete. Continuous user feedback from students and staff ensures each subsequent increment better reflects real needs. The cost of implementing requirement changes is reduced because adjustments are made to individual increments rather than the entire system. Progressive enhancement of features improves user satisfaction over time, as the platform visibly improves with each release."
    ],
    markingGuide: "Award 1 mark per valid, clearly explained benefit directly tied to the CampusServe context. Maximum 4 marks. Generic textbook answers that are not applied to the scenario should receive a maximum of 2 marks.",
    points: 4,
  },

  // 2.2 — multiple-choice (select 2 — implemented as two separate MC questions for auto-grading compatibility)
  {
    id: "ITSEA_W2_Q2_2",
    type: "show-answer",
    sectionLabel: "2.2",
    text: "Discuss two problems associated with incremental development and explain how they may affect the CampusServe system.",
    correctAnswers: [
      "The first problem is lack of process visibility — because the system is built incrementally, it can be difficult for managers to measure overall progress or know exactly how much work remains. For CampusServe, this may make it harder to plan release timelines or allocate resources across modules such as payments and notifications. The second problem is system structure degradation — continuous changes and additions across increments can lead to poorly structured, harder-to-maintain code over time. For CampusServe, this risks increasing technical debt, making future features like new payment types or notification channels more costly and error-prone to implement."
    ],
    markingGuide: "Award 2 marks per problem — 1 mark for correctly identifying and explaining the problem, and 1 mark for clearly linking it to a realistic impact on the CampusServe system. Answers that only list problems without explaining their impact should receive a maximum of 1 mark per problem.",
    points: 4,
  },

  // 2.3 — fill-in-the-blank + show-answer
  {
    id: "ITSEA_W2_Q2_3A",
    type: "fill-in-the-blank",
    sectionLabel: "2.3 Part A",
    text: "In the CampusServe project, requirements are recorded as ___, which describe functionality from the end-user's perspective. This requires high levels of ___ to ensure that each increment adds real value to students and staff.",
    blanks: [
      {
        id: "b1",
        options: ["user stories", "system diagrams", "test cases", "technical specs"],
        correctAnswer: "user stories",
      },
      {
        id: "b2",
        options: ["customer involvement", "automated testing", "code reviews", "sprint planning"],
        correctAnswer: "customer involvement",
      },
    ],
    points: 2,
  },

  {
    id: "ITSEA_W2_Q2_3B",
    type: "show-answer",
    sectionLabel: "2.3 Part B",
    text: "Describe how user stories and customer involvement support the development of the CampusServe system.",
    correctAnswers: [
      "User stories describe system functionality from the perspective of students and staff — for example, 'As a student, I want to pay for printing from my phone.' This helps the development team prioritise features that deliver the most value. Customer involvement ensures continuous feedback throughout development, so the platform evolves in response to real user behaviour and needs rather than assumptions. Together, they improve requirement accuracy, support iterative development, and help ensure the final system delivers genuine value to its users."
    ],
    markingGuide: "Award 2 marks for a clear explanation of how user stories are used and their benefit to the project. Award 2 marks for explaining the role of customer involvement and how it supports iterative development. Top answers should demonstrate how both concepts work together, not in isolation.",
    points: 4,
  },

  // 2.4 — open-ended (term recall) + show-answer
  {
    id: "ITSEA_W2_Q2_4A",
    type: "open-ended",
    sectionLabel: "2.4 Part A",
    text: "The practice of writing automated test cases before writing the actual functional code is known as what type of development?",
    correctAnswers: ["Test-first development", "Test-driven development", "TDD", "Test-first"],
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    points: 1,
  },

  {
    id: "ITSEA_W2_Q2_4B",
    type: "show-answer",
    sectionLabel: "2.4 Part B",
    text: "Explain how test-first development and continuous testing improve software quality in the CampusServe project.",
    correctAnswers: [
      "Test-first development involves writing automated test cases before implementing the corresponding functional code. This ensures that each feature is built to meet its requirements from the outset, reducing the likelihood of defects. In CampusServe, writing tests before coding the payment or notification modules ensures those features behave correctly before release. Continuous testing runs these automated tests throughout development, detecting integration issues and regressions early — before they reach users. Together, these practices lead to higher quality, more maintainable software and increase confidence in each incremental release."
    ],
    markingGuide: "Award 1 mark for a correct definition of test-first development. Award 1 mark for explaining how it ensures code meets requirements from the start or catches errors early. Award 1 mark for explaining the role of continuous testing and linking it to quality improvement in the CampusServe context.",
    points: 3,
  },

];