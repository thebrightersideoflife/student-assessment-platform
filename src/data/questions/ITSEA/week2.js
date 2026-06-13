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
    explanation: `Managing changing requirements is essential because the NSTS operates in a dynamic environment where technologies, policies, and user needs continually evolve.

If these changes are not handled effectively, it can result in:
- Costly rework
- System inconsistencies
- Increased expenses

Proper management guarantees that the system remains functional, relevant, and properly aligned with stakeholder needs throughout the development lifecycle.`,
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
    explanation: `**Change Anticipation:** This involves predicting potential changes early in the project. For example, developers can build prototypes to explore system features and clarify requirements before moving to full implementation.

**Change Tolerance:** This involves designing the system's architecture so that modifications can be incorporated easily. This is typically achieved through incremental development, where updates can be applied to specific increments without disrupting the whole system.

Together, both approaches significantly reduce rework costs and improve project flexibility.`,
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
    explanation: `Applying a single uniform approach across the entire system is inefficient because different subsystems have distinct constraints and requirements.

- The **real-time monitoring** subsystem requires real-time processing and high-performance techniques to handle continuous data streams without any delay.
- The **ticketing** subsystem requires strict data integrity mechanisms and transaction processing to ensure the reliability and accuracy of payments.
- The **predictive maintenance** subsystem utilizes data analysis and evolving models, which require an approach focused on flexibility and iterative refinement.

Applying tailored software engineering techniques to each specific subsystem improves the overall reliability, performance, and long-term maintainability of the NSTS.`,
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
    explanation: `**The Waterfall Model:** This model relies on strictly sequential phases (requirements, design, implementation, and testing), where each phase is completed before the next begins. Its primary advantage is strong process control and documentation. It is highly suited for stable, well-defined requirements but is inflexible to change and delays testing until late in the project. This poses a major risk for the NSTS, where requirements are evolving and unclear.

**The Incremental Model:** This model builds software in small, iterative releases guided by ongoing feedback. It handles changing requirements effectively and allows for the early delivery of usable features. However, disadvantages include potential degradation of the system structure over time and reduced process visibility for management.

**Conclusion:** Because the NSTS has evolving requirements and would benefit greatly from early functionality, the incremental model is far more suitable than the Waterfall model.`,
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
    explanation: `The incremental development model is the most suitable recommendation for the NSTS.

- **Requirement Volatility:** Because requirements are highly volatile, incremental development allows for iterative updates as needs clarify and change over time.
- **Early Delivery:** The project's need for early delivery is fulfilled by releasing functional increments (like the ticketing or monitoring subsystems) before the full system is completed.
- **System Complexity:** System complexity is managed by breaking the workload into smaller, controllable pieces, which effectively reduces overall risk.

Furthermore, continuous stakeholder feedback ensures the platform evolves in alignment with actual real-world needs.`,
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
    explanation: `The three main stages of software validation testing, in order, are **Component** testing, **System** testing, and **Customer** testing.`,
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
    explanation: `Software validation serves the purpose of ensuring that the system fulfills its specifications and meets the expectations of end-users.

- **Component testing** verifies individual parts in isolation.
- **System testing** verifies that integrated components function correctly together.
- **Customer testing** evaluates the software against real-world scenarios.

In the NSTS project, system testing must precede customer testing to ensure all integrated subsystems (ticketing, monitoring, maintenance) work together correctly before user exposure. Releasing an unvalidated integrated system risks critical failures that are difficult and costly to diagnose.`,
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
    explanation: `Incremental development provides the benefit of early delivery for core features; for example, the payment module can be released to students before the rest of the platform is finished.

Continuous user feedback ensures that each subsequent increment accurately reflects real campus needs. Additionally, the cost of implementing requirement changes is much lower because adjustments are made to individual increments instead of the entire system.

This progressive enhancement leads to improved user satisfaction as the platform visibly gets better over time.`,
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
    explanation: `**Problem 1: Lack of Process Visibility**
Because the system is built in increments, it can be challenging for managers to measure overall progress and accurately gauge remaining work. For CampusServe, this makes it difficult to plan timeline releases and appropriately allocate resources across different modules, such as payments and notifications.

**Problem 2: System Structure Degradation**
Continuous additions and changes across releases can result in poorly structured code that is difficult to maintain. In the context of CampusServe, this risks increasing technical debt, which makes adding future features (like new payment types) much more costly and error-prone.`,
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
    explanation: `In the CampusServe project, requirements are recorded as **user stories**, which describe functionality from the end-user's perspective. This requires high levels of **customer involvement** to ensure that each increment adds real value to students and staff.`,
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
    explanation: `User stories explicitly define system functionality from the perspective of the staff and students (e.g., "As a student, I want to pay for printing from my phone"). This allows the development team to prioritize the features that deliver the most immediate value.

Customer involvement provides continuous feedback throughout the lifecycle, ensuring the platform evolves based on actual user behavior rather than development assumptions.

Together, these practices support iterative development, improve requirement accuracy, and guarantee genuine value delivery.`,
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
    explanation: `**Test-first development** is the practice of writing automated test cases before implementing the corresponding functional code.`,
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
    explanation: `Test-first development involves writing automated test cases prior to implementing the functional code. This practice guarantees that every feature is built to meet its exact requirements from the very beginning, drastically reducing the likelihood of defects. For CampusServe, writing tests before coding the notification or payment modules ensures they behave correctly immediately upon release.

Continuous testing runs these automated suites throughout development to detect regression and integration issues early on.

Together, these practices increase confidence in every incremental release and yield higher quality, more maintainable software.`,
  },

];