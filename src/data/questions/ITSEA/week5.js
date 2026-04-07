// src/data/questions/ITSEA/week5.js
// Module: Software Process, Architecture Design and Quality Assurance
// Week 5 Assessment — Software Design, Flowcharts & Testing
// Total Marks: 35

export default [

  // ── SECTION A SCENARIO ──────────────────────────────────────────────────────

  {
    id: "SCENARIO_ITSEA_W5_A",
    type: "scenario",
    title: "Question 1: Disaster Monitoring and Alert System (25 Marks)",
    context: `A national emergency response agency is developing a Disaster Monitoring and Alert System. The system collects data from environmental sensors (temperature, rainfall, wind speed), processes the data, and sends alerts to authorities and the public during disasters such as floods or wildfires.\n\nThe system must:\n- Continuously collect and process real-time data\n- Interact with external systems such as weather services and emergency communication platforms\n- Generate alerts and reports\n- Remain reliable under high data loads\n- Be easy to update as new disaster-response policies are introduced`,
  },

  // ── QUESTION 1.1 ────────────────────────────────────────────────────────────

  {
    id: "ITSEA_W5_Q1_1A",
    type: "multiple-choice",
    sectionLabel: "1.1 Part A",
    text: "The agency needs to add a new 'Tsunami Satellite Feed' service without rewriting the core alert logic. The satellite feed operates as a completely separate external organisation's system. Which architecture best supports this, and what type of interaction boundary is being crossed?",
    options: [
      "Layered Architecture / System-to-System boundary",
      "Monolithic Architecture / User-to-System boundary",
      "Data-Centred Architecture / Repository boundary",
      "Pipe-and-Filter Architecture / Component-to-Component boundary",
    ],
    correctAnswers: ["Layered Architecture / System-to-System boundary"],
    points: 1,
  },

  {
    id: "ITSEA_W5_Q1_1B",
    type: "show-answer",
    sectionLabel: "1.1 Part B",
    text: "Explain why understanding the system context and external interactions is essential before designing this Disaster Monitoring system.",
    correctAnswers: [
      "Understanding the system context and external interactions is essential because it defines the boundaries of the system — clarifying precisely what falls inside the system's responsibility versus what belongs to an external entity such as a weather service or emergency communication platform. This ensures all required data inputs and outputs are identified before design begins. It also helps in designing appropriate interfaces for each external interaction, and prevents functionality from being incorrectly assigned to the wrong system. Without this understanding, the system may fail to integrate effectively, miss critical data sources, or duplicate functionality that an external system already provides.",
    ],
    markingGuide:
      "Award 1 mark for defining system boundaries (what is inside vs. outside the system). Award 1 mark for mentioning the need to design correct interfaces for external entities. Award 1 mark for explaining the impact on design (preventing missing data, duplicate functions, or poor integration).",
    points: 3,
  },

  // ── QUESTION 1.2 ────────────────────────────────────────────────────────────

  {
    id: "ITSEA_W5_Q1_2A",
    type: "multiple-choice",
    sectionLabel: "1.2 Part A",
    text: "During peak disaster season, the sensor data volume triples. The alert generation subsystem starts slowing down, but the data collection subsystem must not be affected. Which architectural property directly enables these two subsystems to fail or degrade independently of one another?",
    options: [
      "Loose coupling through subsystem separation",
      "Tight integration through a shared monolithic codebase",
      "Centralised processing through a single high-performance server",
      "Synchronous data pipelines between all components",
    ],
    correctAnswers: ["Loose coupling through subsystem separation"],
    points: 1,
  },

  {
    id: "ITSEA_W5_Q1_2B",
    type: "show-answer",
    sectionLabel: "1.2 Part B",
    text: "Analyse how a distributed or layered architecture would improve both the reliability and scalability of the Disaster Monitoring system.",
    correctAnswers: [
      "A distributed or layered architecture improves reliability and scalability by separating system components into independent subsystems — for example, data collection, data processing, and alert generation can each operate independently. If the sensor data collection subsystem fails, the alert generation layer can continue processing already-received data without total system failure. This separation also improves scalability: during peak disaster events when data volumes surge, additional processing nodes can be added to the data processing layer without redesigning the entire system. A layered architecture further enhances maintainability, because updates to one layer (such as changing the alerting rules when disaster-response policies change) do not require modifications to other layers.",
    ],
    markingGuide:
      "Award 1 mark for identifying a suitable architecture (distributed or layered). Award 1 mark for explaining how it improves reliability (independent subsystems, fault isolation). Award 1 mark for explaining how it improves scalability (adding nodes/load distribution to specific layers).",
    points: 3,
  },

  // ── QUESTION 1.3 ────────────────────────────────────────────────────────────

  {
    id: "ITSEA_W5_Q1_3A",
    type: "multiple-choice",
    sectionLabel: "1.3 Part A",
    text: "A class in the system 'filters raw sensor noise and compares incoming values against pre-defined disaster threshold limits before passing clean data onwards.' Which class name and responsibility match this description?",
    options: [
      "SensorProcessor — pre-processes and validates raw sensor data",
      "AlertManager — triggers communication platforms when thresholds are exceeded",
      "DisasterMonitoringSystem — coordinates all subsystem interactions",
      "ReportGenerator — compiles historical data into disaster reports",
    ],
    correctAnswers: [
      "SensorProcessor — pre-processes and validates raw sensor data",
    ],
    points: 1,
  },

  {
    id: "ITSEA_W5_Q1_3B",
    type: "multiple-choice",
    sectionLabel: "1.3 Part B",
    text: "A class in the system 'determines which external communication channel to use (SMS broadcast vs. Emergency Radio vs. Authority Portal) based on the alert severity level.' Which class and responsibility match this description?",
    options: [
      "AlertDistributor — selects and triggers the appropriate communication platform",
      "SensorProcessor — filters and validates incoming environmental data",
      "DisasterMonitoringSystem — acts as the central controller for all operations",
      "DataCollector — gathers raw readings from physical sensor hardware",
    ],
    correctAnswers: [
      "AlertDistributor — selects and triggers the appropriate communication platform",
    ],
    points: 1,
  },

  {
    id: "ITSEA_W5_Q1_3C",
    type: "show-answer",
    sectionLabel: "1.3 Part C",
    text: "Identify and describe three key object classes that would exist in this system. For each class, explain its responsibilities and how it maps to a real-world entity.",
    correctAnswers: [
      "Three key object classes:\n\n1. Sensor (or SensorProcessor): Represents a physical environmental device (e.g., a rainfall gauge or thermometer). Responsible for capturing temperature, rainfall, and wind speed readings and supplying clean, validated data to the monitoring system. Maps to the real-world sensors deployed in disaster-prone areas.\n\n2. DisasterMonitoringSystem: Acts as the central controller of the application. Responsible for coordinating data processing, managing subsystem interactions, and applying disaster-detection logic. Maps to the real-world control centre operated by the emergency agency.\n\n3. AlertDistributor (or AlertManager): Responsible for generating, formatting, and dispatching alerts to the appropriate communication channels (SMS, radio, authority portals) based on alert severity. Maps to the real-world emergency notification infrastructure used to warn the public and authorities.",
    ],
    markingGuide:
      "Award 1 mark per class (up to 3 marks) ONLY IF the student provides a clear explanation of its responsibilities AND its mapping to a real-world entity. (Listing class names without explanations yields 0 marks for that specific class).",
    points: 3,
  },

  // ── QUESTION 1.4 ────────────────────────────────────────────────────────────

  {
    id: "ITSEA_W5_Q1_4A",
    type: "multiple-choice",
    sectionLabel: "1.4 Part A",
    text: "For the 'Alert Generation' phase specifically — where the system must show the timed sequence of: SensorProcessor detects threshold breach → DisasterMonitoringSystem evaluates severity → AlertDistributor dispatches to SMS — which design model is MORE critical to produce, and why?",
    options: [
      "A Sequence Diagram (Dynamic), because it shows the timed order of interactions between objects at runtime",
      "A Class Diagram (Structural), because it defines the attributes and methods of each class involved",
      "An Entity-Relationship Diagram, because it maps the data stored during each alert event",
      "A Data Flow Diagram, because it shows the transformations applied to sensor input",
    ],
    correctAnswers: [
      "A Sequence Diagram (Dynamic), because it shows the timed order of interactions between objects at runtime",
    ],
    points: 1,
  },

  {
    id: "ITSEA_W5_Q1_4B",
    type: "show-answer",
    sectionLabel: "1.4 Part B",
    text: "Evaluate the importance of using BOTH structural and dynamic design models when developing this Disaster Monitoring system. Support your answer with one example relevant to each model type.",
    correctAnswers: [
      "Design models are essential because they bridge the gap between requirements and implementation, reducing ambiguity and improving communication among the development team.\n\nStructural models (e.g., Class Diagrams) define the system's components, their attributes, and their relationships. For example, a class diagram of the Disaster Monitoring system would clearly show how the SensorProcessor class relates to the DisasterMonitoringSystem and AlertDistributor — establishing the static architecture before any code is written.\n\nDynamic models (e.g., Sequence Diagrams or State Diagrams) illustrate runtime behaviour and the order in which objects interact. For example, a sequence diagram of the alert generation process would show exactly when the SensorProcessor notifies the DisasterMonitoringSystem of a threshold breach, and in what order the AlertDistributor triggers SMS versus radio broadcasts.\n\nTogether, both model types ensure developers understand both what the system looks like and how it behaves — catching design flaws before they become costly code defects.",
    ],
    markingGuide:
      "Award 1 mark for a correct explanation of structural models with a scenario-relevant example. Award 1 mark for a correct explanation of dynamic models with a scenario-relevant example. Award 1 mark for a concluding statement explicitly detailing the complementary value of using both models together (static vs runtime understanding).",
    points: 3,
  },

  // ── QUESTION 1.5 ────────────────────────────────────────────────────────────

  {
    id: "ITSEA_W5_Q1_5A",
    type: "open-ended",
    sectionLabel: "1.5 Part A",
    text: "The agency wants to manage separate versions of the Disaster Monitoring system deployed across five different provinces, each with slightly different alerting policies. Which specific software engineering process must be strictly implemented to prevent version conflicts and ensure controlled updates?",
    correctAnswers: [
      "Configuration Management",
      "Version Control",
      "Software Configuration Management",
    ],
    validationOptions: {
      caseSensitive: false,
      tolerance: 20,
    },
    points: 1,
  },

  {
    id: "ITSEA_W5_Q1_5B",
    type: "open-ended",
    sectionLabel: "1.5 Part B",
    text: "The development team wants to integrate an existing, already-tested open-source data processing library into the system rather than building it from scratch. What software engineering practice does this represent?",
    correctAnswers: ["Software reuse", "Reuse", "Component reuse"],
    validationOptions: {
      caseSensitive: false,
      tolerance: 20,
    },
    points: 1,
  },

  {
    id: "ITSEA_W5_Q1_5C",
    type: "show-answer",
    sectionLabel: "1.5 Part C",
    text: "Discuss how both software reuse AND configuration management would benefit the development of this Disaster Monitoring system.",
    correctAnswers: [
      "Software reuse allows developers to integrate existing, already-tested components — such as data processing libraries, sensor communication protocols, or alert broadcasting modules — rather than building them from scratch. This reduces development time and improves reliability, since reused components have already been validated in other contexts. For the Disaster Monitoring system, reusing a proven environmental data processing library means the team can focus effort on the unique disaster-response logic.\n\nConfiguration management ensures that all versions of system components are tracked, controlled, and documented. This is critical for the Disaster Monitoring system because it must evolve as government disaster-response policies change across provinces. Without configuration management, deploying an updated alerting policy to one province could accidentally overwrite a different version in another, causing dangerous inconsistencies. Configuration management prevents such errors by enforcing systematic, traceable version updates.",
    ],
    markingGuide:
      "Award 1 mark for correctly explaining a benefit of software reuse linked to the scenario (e.g., reduced time, tested reliability). Award 1 mark for correctly explaining a benefit of configuration management linked to the scenario (e.g., preventing deployment errors across provinces, systematic version control).",
    points: 2,
  },

  // ── QUESTION 1.6 ────────────────────────────────────────────────────────────

  {
    id: "ITSEA_W5_Q1_6A",
    type: "multiple-choice",
    sectionLabel: "1.6 Part A",
    text: "The agency is considering using an open-source alerting framework. The framework's licence requires that any software built using it must also be released publicly as open source. For a government emergency system handling sensitive infrastructure data, what is the PRIMARY risk this licence condition introduces?",
    options: [
      "It may conflict with national security or government confidentiality policies by mandating public disclosure of system source code",
      "It will significantly increase licensing costs beyond the agency's budget",
      "It prevents the development team from modifying the framework's source code",
      "It requires the system to be rebuilt every time the open-source project releases an update",
    ],
    correctAnswers: [
      "It may conflict with national security or government confidentiality policies by mandating public disclosure of system source code",
    ],
    points: 1,
  },

  {
    id: "ITSEA_W5_Q1_6B",
    type: "show-answer",
    sectionLabel: "1.6 Part B",
    text: "Explain how open-source development could support this project. In your answer, define open-source, provide one specific benefit, and explain one potential risk.",
    correctAnswers: [
      "Open-source development refers to software whose source code is publicly available, allowing anyone to view, use, modify, and distribute it. For the Disaster Monitoring system, open-source tools can provide access to widely-tested, reliable components — such as data ingestion frameworks or geospatial mapping libraries — significantly reducing development costs and accelerating delivery, since the team builds on proven foundations rather than starting from scratch.\n\nHowever, a key risk is licensing restrictions. Many open-source licences (such as the GNU GPL) require that any software incorporating the open-source component must itself be released publicly as open source. For a national emergency agency handling sensitive infrastructure data, this could conflict directly with government security or confidentiality policies, potentially exposing critical system design details to adversaries.",
    ],
    markingGuide:
      "Award 1 mark for defining open-source. Award 1 mark for a specific benefit (cost reduction, access to tested components). Award 1 mark for identifying a risk and explaining why it is specifically dangerous for this government emergency system.",
    points: 3,
  },

  // ── SECTION B SCENARIO ──────────────────────────────────────────────────────

  {
    id: "SCENARIO_ITSEA_W5_B",
    type: "scenario",
    title: "Question 2: Student Result Processing System (10 Marks)",
    context: `A university is developing an automated Student Result Processing System. The system must:\n- Accept multiple student marks as input\n- Stop accepting input when a mark of -1 is entered\n- Calculate the average mark across all entered values\n- Display a classification based on the average:\n  • Below 50 → Fail\n  • 50–69 → Pass\n  • 70 and above → Distinction`,
  },

  // ── QUESTION 2.1 ────────────────────────────────────────────────────────────

  {
    id: "ITSEA_W5_Q2_1A",
    type: "multiple-choice",
    sectionLabel: "2.1 Part A",
    text: "In the Student Result Processing flowchart, the sentinel value check (Is mark == -1?) must occur at a specific point in the loop. Where must this check be placed relative to the accumulation steps to ensure no invalid data is processed?",
    options: [
      "Immediately after inputting a mark, before adding it to the total",
      "After adding the mark to the total, before incrementing the counter",
      "After incrementing the counter, before displaying the average",
      "Before the loop begins, as a pre-condition check",
    ],
    correctAnswers: [
      "Immediately after inputting a mark, before adding it to the total",
    ],
    points: 1,
  },

  {
    id: "ITSEA_W5_Q2_1B",
    type: "multiple-choice",
    sectionLabel: "2.1 Part B",
    text: "Which sequence correctly represents the logical order of the main loop body in the flowchart, ensuring the loop terminates correctly and only valid marks are accumulated?",
    options: [
      "Input Mark → Is Mark == -1? → Add Mark to Total → Increment Counter → (loop back)",
      "Input Mark → Add Mark to Total → Is Mark == -1? → Increment Counter → (loop back)",
      "Is Mark == -1? → Input Mark → Add Mark to Total → Increment Counter → (loop back)",
      "Input Mark → Increment Counter → Add Mark to Total → Is Mark == -1? → (loop back)",
    ],
    correctAnswers: [
      "Input Mark → Is Mark == -1? → Add Mark to Total → Increment Counter → (loop back)",
    ],
    points: 1,
  },

  {
    id: "ITSEA_W5_Q2_1C",
    type: "show-answer",
    sectionLabel: "2.1 Part C",
    text: "Design a flowchart to represent the full Student Result Processing System. Your answer must clearly describe: the Start and End points, all input/output operations, the loop structure and its termination condition, and both decision points (sentinel check and classification).",
    correctAnswers: [
      "A correct flowchart must include all of the following elements in logical order:\n\n1. START\n2. Initialise Total = 0, Count = 0\n3. INPUT Mark\n4. DECISION: Is Mark == -1? → YES → go to step 8 | NO → continue\n5. Add Mark to Total (Total = Total + Mark)\n6. Increment Count (Count = Count + 1)\n7. Loop back to step 3 (INPUT Mark)\n8. PROCESS: Calculate Average = Total / Count\n9. DECISION: Is Average < 50? → YES → OUTPUT 'Fail'\n   DECISION: Is Average >= 50 AND < 70? → YES → OUTPUT 'Pass'\n   DECISION: Is Average >= 70? → YES → OUTPUT 'Distinction'\n10. END\n\nKey points: The sentinel check (-1) must occur BEFORE accumulation. The classification decisions must cover all three ranges with no gaps or overlaps. The loop must visibly return to the input step.",
    ],
    markingGuide:
      "Award 1 mark for Start/End points and correctly defining Input/Output operations. Award 1 mark for a correct loop structure that returns to the input step. Award 1 mark for placing the sentinel termination decision correctly before accumulation. Award 1 mark for the classification decision logic covering all three ranges without overlaps.",
    points: 4,
  },

  // ── QUESTION 2.2 ────────────────────────────────────────────────────────────

  {
    id: "ITSEA_W5_Q2_2A",
    type: "multiple-choice",
    sectionLabel: "2.2 Part A",
    text: "In the Result Processing classification logic, which Boolean expression correctly and exclusively identifies a 'Pass' grade (50 to 69 inclusive)?",
    options: [
      "average >= 50 AND average < 70",
      "average > 50 AND average <= 70",
      "average >= 50 OR average <= 69",
      "average > 49 AND average > 70",
    ],
    correctAnswers: ["average >= 50 AND average < 70"],
    points: 1,
  },

  {
    id: "ITSEA_W5_Q2_2B",
    type: "show-answer",
    sectionLabel: "2.2 Part B",
    text: "Explain how decision control (IF…ELSE) is used in the Result Processing flowchart and why it is important for solving this specific problem.",
    correctAnswers: [
      "Decision control is implemented using nested IF…ELSE conditions to evaluate the calculated average and route the program to the correct classification output. For example: IF average < 50, output 'Fail'; ELSE IF average < 70, output 'Pass'; ELSE output 'Distinction'. This structure is essential because the system must produce three mutually exclusive outputs based on a continuous range of possible input values — without decision control, the system cannot differentiate between students and would produce the same output regardless of their marks. The IF…ELSE chain ensures each mark range maps to exactly one classification, with no overlap or gap.",
    ],
    markingGuide:
      "Award 1 mark for explaining why decision control is critical for this specific context (producing mutually exclusive outputs based on a range of continuous input values).",
    points: 1,
  },

  // ── QUESTION 2.3 ────────────────────────────────────────────────────────────

  {
    id: "ITSEA_W5_Q2_3A",
    type: "fill-in-the-blank",
    sectionLabel: "2.3 Part A",
    text: "To perform ___ testing on the average calculation function in isolation, a developer would input marks of 60 and 80 and verify the function returns exactly 70 — without running the full system. Testing the complete flow from entering 10 marks through to seeing the final classification displayed on screen is an example of ___ testing.",
    blanks: [
      {
        id: "b1",
        options: ["integration", "mutation", "unit", "white-box"],
        correctAnswer: "unit",
      },
      {
        id: "b2",
        options: ["integration", "system", "acceptance", "alpha"],
        correctAnswer: "system",
      },
    ],
    points: 2,
  },
];