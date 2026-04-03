// src/data/questions/ITSEA/week4.js
// Module: Software Process, Architecture Design and Quality Assurance
// Week 4 Assessment — Architectural Design & Patterns
// Total Marks: 50

export default [

  // ── SECTION A SCENARIO ──────────────────────────────────────────────────────

  {
    id: "SCENARIO_ITSEA_W4_A",
    type: "scenario",
    title: "Section A: Architectural Design & Decisions (25 Marks)",
    context: `A multinational logistics corporation is developing a "Global Logistics & Tracking Hub" (GLTH). The system must manage real-time tracking data from millions of packages globally, provide a customer-facing interface for status updates, and generate complex quarterly reports for management.\n\nBecause the system operates across various international jurisdictions, it must ensure high security for sensitive shipping data and remain operational 24/7. The development team is considering whether to use a monolithic approach or a more modular, architectural-pattern-driven design.`,
  },

  // ── QUESTION 1.1 ────────────────────────────────────────────────────────────

  {
    id: "ITSEA_W4_Q1_1A",
    type: "fill-in-the-blank",
    sectionLabel: "1.1 Part A",
    text: 'Architectural design is described as the "critical link" because it acts as the bridge between ___ (what the system must do) and ___ (how to build it).',
    blanks: [
      {
        id: "b1",
        options: [
          "requirements engineering",
          "systems analysis",
          "business modeling",
          "domain analysis",
          "process elicitation",
        ],
        correctAnswer: "requirements engineering",
      },
      {
        id: "b2",
        options: [
          "software design",
          "software architecture",
          "implementation modeling",
          "system coding",
          "technical specification",
        ],
        correctAnswer: "software design",
      },
    ],
    points: 2,
  },

  {
    id: "ITSEA_W4_Q1_1B",
    type: "show-answer",
    sectionLabel: "1.1 Part B",
    text: "Define architectural design in terms of system structure and explain its primary goal.",
    correctAnswers: [
      "Architectural design is the process of defining the overall structure of a software system, identifying its main components, and establishing how those components are organized and relate to one another. Its primary goal is to act as the critical link between what the system must do (requirements) and how it will be built (software design), translating abstract needs into a concrete structural model.",
    ],
    markingGuide:
      "Award 1 mark for defining architectural design as the process of defining overall structure and identifying components. Award 1 mark for explaining its role as the bridge/link between requirements engineering and software design.",
    points: 2,
  },

  // ── QUESTION 1.2 ────────────────────────────────────────────────────────────

  {
    id: "ITSEA_W4_Q1_2A",
    type: "multiple-choice",
    sectionLabel: "1.2 Part A",
    text: "The GLTH project manager suggests skipping early architectural design to favour Agile's incremental emergence. According to architectural principles, what is the primary technical reason this suggestion should be rejected for a system of this scale?",
    options: [
      "Agile methodologies strictly forbid any form of incremental design.",
      "Developers require complete UML diagrams before writing any tracking code.",
      "Refactoring core architectural structures later incurs massive technical debt and cost.",
      "International jurisdictions require a physical architecture document for legal compliance.",
    ],
    correctAnswers: [
      "Refactoring core architectural structures later incurs massive technical debt and cost.",
    ],
    points: 1,
  },

  {
    id: "ITSEA_W4_Q1_2B",
    type: "show-answer",
    sectionLabel: "1.2 Part B",
    text: "Expand on your choice above. Evaluate why deferring architectural design is particularly dangerous for the GLTH project specifically.",
    correctAnswers: [
      "While Agile allows for incremental change, it is generally accepted that an early stage of the Agile process should still focus on designing an overall system architecture. For a large-scale system like GLTH — with strict non-functional requirements such as 24/7 availability and high security for international data — failing to establish a robust structural framework early would lead to prohibitive costs and technical debt when core components inevitably need to be replaced or restructured to meet those NFRs.",
    ],
    markingGuide:
      "Award 1 mark for the correct stance (reject the suggestion) with reference to Agile still requiring an early architectural stage. Award 1 mark for a well-reasoned explanation of the cost and risk of refactoring core architectural structures, specifically linked to the GLTH's scale and NFRs (security, availability).",
    points: 2,
  },

  // ── QUESTION 1.3 ────────────────────────────────────────────────────────────

  {
    id: "ITSEA_W4_Q1_3A",
    type: "open-ended",
    sectionLabel: "1.3 Part A",
    text: "To meet the strict security requirements for international shipping data, which architectural pattern isolates the database and business logic into protected inner rings?",
    correctAnswers: ["Layered Architecture", "Layered Pattern", "Layered architectural pattern"],
    validationOptions: {
      caseSensitive: false,
      tolerance: 20,
    },
    points: 1,
  },

  {
    id: "ITSEA_W4_Q1_3B",
    type: "open-ended",
    sectionLabel: "1.3 Part B",
    text: "To meet the 24/7 operational availability requirement, what specific structural element must be explicitly designed into the GLTH architecture to ensure fault tolerance?",
    correctAnswers: ["Redundant components", "Redundancy", "Redundant systems"],
    validationOptions: {
      caseSensitive: false,
      tolerance: 20,
    },
    points: 1,
  },

  {
    id: "ITSEA_W4_Q1_3C",
    type: "show-answer",
    sectionLabel: "1.3 Part C",
    text: "Justify how the two architectural strategies identified above (Layered Architecture and Redundancy) directly address the GLTH's non-functional requirements.",
    correctAnswers: [
      "A Layered Architecture isolates the database and sensitive business logic in inner layers, allowing security to be managed and validated at each specific level — protecting the GLTH's sensitive international shipping data from external threats. Redundancy ensures fault tolerance by maintaining duplicate components; if one global tracking node or data centre fails, redundant components can seamlessly take over operations, ensuring the system remains available 24/7 without disruption.",
    ],
    markingGuide:
      "Award 2 marks for a correct and specific explanation of how Layered Architecture addresses the security NFR (must mention isolation of layers or validation at each level). Award 2 marks for a correct and specific explanation of how Redundancy addresses the 24/7 availability NFR (must mention fault tolerance and component failover).",
    points: 4,
  },

  // ── QUESTION 1.4 ────────────────────────────────────────────────────────────

  {
    id: "ITSEA_W4_Q1_4A",
    type: "multiple-choice",
    sectionLabel: "1.4 Part A",
    text: "Which architectural concept is concerned with integrating various independent tracking systems, customer interfaces, and management reporting systems across different platforms?",
    options: [
      "Architecture in the small",
      "Architecture in the large",
      "Component-level design",
      "Object-oriented architecture",
    ],
    correctAnswers: ["Architecture in the large"],
    points: 1,
  },

  {
    id: "ITSEA_W4_Q1_4B",
    type: "show-answer",
    sectionLabel: "1.4 Part B",
    text: 'Briefly contrast "Architecture in the small" with "Architecture in the large," and justify which applies to the GLTH.',
    correctAnswers: [
      "Architecture in the small is concerned with the internal structure of individual programs or sub-systems — how a single component is organised. Architecture in the large is concerned with complex enterprise systems that integrate multiple separate systems, programs, and platforms together. The GLTH requires Architecture in the large because it must integrate various international tracking systems, customer-facing interfaces, management reporting systems, and data sources across different jurisdictions and platforms.",
    ],
    markingGuide:
      "Award 1 mark for a correct definition of Architecture in the small (individual programs/sub-systems). Award 1 mark for a correct definition of Architecture in the large (complex enterprise systems integrating multiple systems). Award 1 mark for selecting 'in the large'. Award 1 mark for a valid justification referencing the GLTH's complexity and integration requirements.",
    points: 4,
  },

  // ── QUESTION 1.5 ────────────────────────────────────────────────────────────

  {
    id: "ITSEA_W4_Q1_5A",
    type: "fill-in-the-blank",
    sectionLabel: "1.5 Part A",
    text: "An explicit architectural model benefits stakeholders in three key ways: it provides a high-level representation for stakeholder ___, allows for early system ___ of non-functional requirements, and identifies components for large-scale ___.",
    blanks: [
      {
        id: "b1",
        options: ["communication", "negotiation", "abstraction", "conceptualization"],
        correctAnswer: "communication",
      },
      {
        id: "b2",
        options: ["analysis", "validation", "integration", "evaluation"],
        correctAnswer: "analysis",
      },
      {
        id: "b3",
        options: ["reuse", "scaling", "distribution", "refactoring"],
        correctAnswer: "reuse",
      },
    ],
    points: 3,
  },

  {
    id: "ITSEA_W4_Q1_5B",
    type: "show-answer",
    sectionLabel: "1.5 Part B",
    text: "Select ONE of the three benefits identified in 1.5 Part A (communication, analysis, or reuse) and explain exactly how it benefits the GLTH developers, managers, or clients.",
    correctAnswers: [
      "Accept any ONE of the following:\n\n1. COMMUNICATION: An explicit architectural model provides a high-level visual representation that allows non-technical logistics clients and executives to engage in meaningful discussions about the GLTH's structure without needing to understand underlying code. It aligns all stakeholders on the system's scope.\n\n2. ANALYSIS: The model allows managers and architects to identify and verify security and 24/7 reliability requirements before full-scale development begins, enabling early risk identification and costly design flaws to be caught before code is written.\n\n3. REUSE: Developers can identify tracking or reporting components within the GLTH architecture that can be reused across different international regions or integrated into future logistics systems, significantly reducing development time and cost.",
    ],
    markingGuide:
      "Award up to 4 marks for a well-developed explanation of ONE benefit. Breakdown: Award 2 marks for correctly naming and defining the benefit. Award 2 marks for a specific, contextualised explanation of how it applies to the GLTH stakeholders (developers, managers, or clients).",
    points: 4,
  },

  // ── SECTION B SCENARIO ──────────────────────────────────────────────────────

  {
    id: "SCENARIO_ITSEA_W4_B",
    type: "scenario",
    title: "Section B: Patterns and Application Architectures (25 Marks)",
    context: `A new "Smart City" initiative requires a system that collects data from thousands of street sensors (traffic flow, air quality, emergency alerts).\n\nEmergency Services need immediate, filtered access to alert data.\nCity Planners need to access a central database of historical sensor data for long-term urban development.\nPublic Users need a mobile-friendly interface to see current traffic levels.`,
  },

  // ── QUESTION 2.1 ────────────────────────────────────────────────────────────

  {
    id: "ITSEA_W4_Q2_1A",
    type: "multiple-choice",
    sectionLabel: "2.1 Part A",
    text: "In the MVC pattern for the Smart City mobile interface, which component defines and manages how the data is presented to the public user (e.g., the traffic map on the mobile app)?",
    options: ["Model", "View", "Controller", "Router"],
    correctAnswers: ["View"],
    points: 1,
  },

  {
    id: "ITSEA_W4_Q2_1B",
    type: "show-answer",
    sectionLabel: "2.1 Part B",
    text: "The team plans to add a smart-watch interface in the future, but the exact requirements are currently unknown. Justify why the Model-View-Controller (MVC) pattern is the ideal architectural choice for this scenario. In your answer, describe the role of the Model, View, and Controller.",
    correctAnswers: [
      "In MVC: the Model manages the system data and associated operations (e.g., live sensor states and traffic levels). The View defines and manages how that data is presented to the user (e.g., the traffic map on the mobile app). The Controller manages user interactions and passes them to the Model and View. MVC is ideal because it decouples data representation (View) from data management (Model). Because they are decoupled, the team can add an entirely new View — such as a smart-watch UI — later without rewriting or disrupting the underlying data logic in the Model.",
    ],
    markingGuide:
      "Award 1 mark each for a correct description of the Model, View, and Controller roles in this context (3 marks total). Award 2 marks for a justification that explicitly references the decoupling of View from Model as the reason MVC supports adding future interfaces (like a smart-watch) without changing business logic.",
    points: 5,
  },

  // ── QUESTION 2.2 ────────────────────────────────────────────────────────────

  {
    id: "ITSEA_W4_Q2_2A",
    type: "open-ended",
    sectionLabel: "2.2 Part A",
    text: "Which architectural pattern is best suited for the Smart City system to centrally manage and share the huge volumes of historical sensor data accessed by both City Planners and Emergency Services?",
    correctAnswers: ["Repository Pattern", "Repository"],
    validationOptions: {
      caseSensitive: false,
      tolerance: 20,
    },
    points: 2,
  },

  {
    id: "ITSEA_W4_Q2_2B",
    type: "show-answer",
    sectionLabel: "2.2 Part B",
    text: "State one major advantage and one severe architectural disadvantage (risk) of implementing the Repository Pattern for the Smart City's database.",
    correctAnswers: [
      "Advantage: The Repository Pattern is an efficient way to store and share massive volumes of data across multiple, different sub-systems simultaneously. In the Smart City context, both City Planners and Emergency Services can access the same central historical sensor data without requiring complex data-sharing agreements between components.\n\nDisadvantage: It creates a single point of failure. If the central repository database goes offline — due to a hardware fault, network failure, or a cyberattack — every connected city sub-system (Emergency Services, City Planning, Public Interface) loses access to data simultaneously, making the entire system non-functional.",
    ],
    markingGuide:
      "Award 2 marks for a correct and specific advantage referencing efficient centralised sharing across multiple sub-systems. Award 2 marks for identifying the single point of failure as the key disadvantage and explaining its cascading impact on the Smart City system.",
    points: 4,
  },

  // ── QUESTION 2.3 ────────────────────────────────────────────────────────────

  {
    id: "ITSEA_W4_Q2_3A",
    type: "open-ended",
    sectionLabel: "2.3 Part A",
    text: "A system module takes raw sensor signals, converts them to digital tokens, checks them for errors, and formats them for the database. Name the most appropriate architectural pattern for this sequential data-transformation module.",
    correctAnswers: ["Pipe and Filter", "Pipe and Filter pattern", "Pipes and Filters"],
    validationOptions: {
      caseSensitive: false,
      tolerance: 20,
    },
    points: 1,
  },

  {
    id: "ITSEA_W4_Q2_3B",
    type: "fill-in-the-blank",
    sectionLabel: "2.3 Part B",
    text: "Two major advantages of the Pipe and Filter pattern are high maintainability (allowing new data ___ steps to be added easily without changing other filters) and the ability to handle high-frequency sensor signals efficiently through ___ processing.",
    blanks: [
      {
        id: "b1",
        options: ["transformation", "filter", "processing", "translation"],
        correctAnswer: "filter",
      },
      {
        id: "b2",
        options: ["asynchronous", "concurrent", "parallel", "pipelined"],
        correctAnswer: "concurrent",
      },
    ],
    points: 2,
  },

  // ── QUESTION 2.4 ────────────────────────────────────────────────────────────

  {
    id: "ITSEA_W4_Q2_4A",
    type: "multiple-choice",
    sectionLabel: "2.4 Part A",
    text: "The Smart City system acts as a Transaction Processing System (TPS). What is the correct generic structural flow for a TPS application?",
    options: [
      "Processing Logic → Database Update → Output → Input",
      "Input/Request → Database Update → Processing Logic → Output",
      "Input/Request → Processing Logic → Database Update → Output/Confirmation",
      "Database Update → Input/Request → Output/Confirmation → Processing Logic",
    ],
    correctAnswers: [
      "Input/Request → Processing Logic → Database Update → Output/Confirmation",
    ],
    points: 1,
  },

  {
    id: "ITSEA_W4_Q2_4B",
    type: "show-answer",
    sectionLabel: "2.4 Part B",
    text: "The Information Systems Architecture relies on a layered approach. Outline the four distinct layers required for the web-based version of the Smart City application and briefly describe what each layer handles in this specific context.",
    correctAnswers: [
      "The four layers for the web-based Smart City application are:\n\n1. User Interface Layer: The web browser interface that displays current traffic data, emergency alerts, and sensor readings to public users and city officials.\n\n2. User Communications Layer: Manages web sessions, user authentication, and secure communication channels — ensuring only authorised Emergency Services personnel access restricted alert data.\n\n3. Information Retrieval Layer: Contains the business logic that coordinates queries, filters emergency alerts for Emergency Services, and retrieves relevant historical data for City Planners.\n\n4. Database Layer: Houses the underlying historical sensor data, real-time traffic readings, air quality records, and emergency alert logs — the persistent data store for the entire system.",
    ],
    markingGuide:
      "Award 1 mark per layer correctly named (up to 4 marks). Award 1 mark per layer for a contextualised description specific to the Smart City system (up to 4 marks). Award 1 additional mark for a response that correctly sequences all four layers in order and demonstrates a clear understanding of how data flows through them.",
    points: 9,
  },
];