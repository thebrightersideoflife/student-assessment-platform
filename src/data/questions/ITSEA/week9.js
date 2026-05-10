// src/data/questions/ITSEA/week9.js
export default [

  // ─── SCENARIO ──────────────────────────────────────────────────────────────

  {
    id: "ITSEA_W9_SCENARIO",
    type: "scenario",
    sectionLabel: "Scenario",
    context: "Aurelia Dynamics is a multinational manufacturer of industrial sensors, smart controllers, and embedded monitoring devices used in energy and transport infrastructure.\n\nOver the last decade, the company grew through acquisitions. As a result:\n- production plants use different legacy control applications,\n- inventory and procurement run on disconnected systems,\n- customer service uses a separate cloud platform,\n- several factories recently introduced smart manufacturing equipment connected to corporate networks.\n\nThree months ago, one production site suffered a cyber incident that corrupted scheduling data and forced a partial shutdown of two assembly lines. Recovery took 19 hours. Senior management now wants a new strategy that simultaneously:\n- strengthens operational resilience,\n- improves cyber-resilience,\n- reduces future development cost through systematic software reuse.\n\nAurelia is considering:\n- introducing a reusable platform for plant software,\n- standardising business operations using a configurable enterprise application,\n- redesigning system architecture so that critical services can continue under disruption.\n\nAll questions below refer to this scenario.",
  },

  // ─── QUESTION 1 — Resilience Engineering ───────────────────────────────────

  {
    id: "ITSEA_W9_Q1",
    type: "multiple-choice",
    tags: ["risk management", "incident response"],
    sectionLabel: "1.1",
    text: "During the cyber incident, plant operators noticed unusual scheduling outputs but production continued for several hours before shutdown.\n\nWhich resilience activity was **most clearly weak**?",
    options: [
      "Reinstatement",
      "Recovery",
      "Recognition",
      "Resistance",
    ],
    correctAnswers: ["Recognition"],
    points: 1,
    explanation: "**Recognition** concerns detecting early symptoms of abnormal system behaviour. The system continued operating despite warning signs — this indicates delayed detection, not failed recovery. Students often confuse recognition and resistance; resistance is action taken *after* detection.",
  },

  {
    id: "ITSEA_W9_Q2",
    type: "fill-in-the-blank",
    tags: ["incident response"],
    sectionLabel: "1.2",
    text: "In resilience engineering, the four core activities are recognition, resistance, recovery, and ___.",
    blanks: [
      {
        id: "b1",
        options: ["redundancy", "restoration", "reinstatement", "remediation"],
        correctAnswer: "reinstatement",
      },
    ],
  },

  {
    id: "ITSEA_W9_Q3",
    type: "open-ended",
    tags: ["threat modelling"],
    sectionLabel: "1.3",
    text: "Which **one-word** asset classification would best apply to the production scheduling database?",
    correctAnswers: ["critical"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    explanation: "The scheduling database directly supports manufacturing continuity. Its failure would cause serious operational disruption, placing it in the **critical** tier of asset classification.",
  },

  {
    id: "ITSEA_W9_Q4",
    type: "multiple-choice",
    tags: ["CIA triad", "encryption"],
    sectionLabel: "1.4",
    text: "Aurelia's security team proposes encrypting all internal production records.\n\nWhich threat does this most directly address?",
    options: [
      "Availability",
      "Integrity",
      "Confidentiality",
      "Reinstatement",
    ],
    correctAnswers: ["Confidentiality"],
    points: 1,
    explanation: "Encryption prevents unauthorised parties from reading sensitive information. Its primary goal is **confidentiality** — one leg of the CIA triad. Note that `Reinstatement` is not a CIA triad concept at all, making it a strong distractor.",
  },

  {
    id: "ITSEA_W9_Q5",
    type: "fill-in-the-blank",
    tags: ["CIA triad"],
    sectionLabel: "1.5",
    text: "A cyberattack that prevents authorised users from accessing production systems is a threat to ___.",
    blanks: [
      {
        id: "b1",
        options: ["confidentiality", "integrity", "availability", "reinstatement"],
        correctAnswer: "availability",
      },
    ],
  },

  {
    id: "ITSEA_W9_Q6",
    type: "multiple-choice",
    tags: ["systems thinking", "cultural challenges"],
    sectionLabel: "1.6",
    text: "A plant engineer accidentally approves a dangerous parameter update because of interface ambiguity and workload pressure.\n\nUnder the **sociotechnical resilience** perspective, this is best interpreted as:",
    options: [
      "deliberate misuse",
      "individual negligence only",
      "a systems-design vulnerability",
      "malicious insider activity",
    ],
    correctAnswers: ["a systems-design vulnerability"],
    points: 1,
    explanation: "The **systems approach** assumes human error often emerges from workload, interface design, and operational conditions — not only from individual fault. This distinguishes it from the *person approach*, which places blame solely on the individual.",
  },

  {
    id: "ITSEA_W9_Q7",
    type: "open-ended",
    tags: ["risk management"],
    sectionLabel: "1.7",
    text: "What metaphor is used to describe layered defensive barriers with shifting vulnerabilities?",
    correctAnswers: ["Swiss cheese", "Swiss cheese model"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 20,
      allowPartialMatch: true,
    },
    explanation: "The **Swiss cheese model** illustrates that each defensive layer has holes (vulnerabilities). A failure only occurs when the holes across all layers align simultaneously — making multiple independent barriers far more robust than relying on a single perfect barrier.",
  },

  {
    id: "ITSEA_W9_Q8",
    type: "show-answer",
    tags: ["incident response", "threat modelling", "systems thinking", "risk management"],
    sectionLabel: "1.8",
    text: "Aurelia's executive board asks you to propose a resilience strategy for future incidents.\n\nYour answer must explain how the company should apply:\n- the **4 Rs of resilience engineering**,\n- **asset-based cyber-resilience planning**,\n- **sociotechnical resilience**, and\n- the idea of **defensive layers**.",
    correctAnswers: [
      {
        text: "Aurelia should begin by identifying **critical services and critical assets**. In this case, production scheduling, plant monitoring, machine coordination, and inventory synchronisation are central to operational continuity.\n\n**Recognition**\n\nThe first weakness in the scenario was delayed detection. Aurelia must improve recognition through anomaly detection, event logging, operator escalation procedures, and behavioural monitoring of abnormal production data.\n\n**Resistance**\n\nResistance reduces the likelihood that abnormal conditions become service failures. This includes network segmentation, validation of production changes, stronger change-control procedures, and integrity monitoring.\n\n**Recovery**\n\nRecovery should prioritise *critical services first*, not all systems simultaneously. Production control and scheduling should be restored before secondary analytics or reporting services.\n\n**Reinstatement**\n\nOnce essential services are stable, full normal operation can be re-established, including full business integration and post-incident verification.\n\n**Asset-Based Planning**\n\nAurelia should classify assets into **critical**, **important**, and **useful** categories. For each major asset class, threats should be identified along with recognition indicators, resistance controls, recovery plans, and reinstatement procedures.\n\n**Sociotechnical Resilience**\n\nResilience is not purely technical. Operators, escalation procedures, training, communication channels, and workload conditions all affect organisational resilience. Human error should not automatically be blamed on individuals — poor interface design and unclear procedures create latent failure conditions.\n\n**Defensive Layers**\n\nAurelia should build multiple barriers:\n- *technical barriers* (segmentation, authentication, logging),\n- *procedural barriers* (approvals, manual overrides, emergency playbooks),\n- *organisational barriers* (training, escalation authority, incident drills).\n\nFailure becomes catastrophic only when vulnerabilities align across layers — the **Swiss cheese** effect.",
        diagram: {
          type: "mermaid",
          code: `flowchart TD
    A[Identify Critical Assets & Services]
    B[Recognition — Anomaly Detection & Escalation]
    C[Resistance — Segmentation, Integrity Controls]
    D[Recovery — Critical Services First]
    E[Reinstatement — Full Normal Operation]
    A --> B --> C --> D --> E`,
        },
      },
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Correct explanation of the 4 Rs | 4 |
| Asset classification + threat planning | 2 |
| Sociotechnical interpretation | 2 |
| Defensive layers / Swiss cheese integration | 2 |
| **Total** | **10** |

**Common errors:**
- Listing theory without applying it to Aurelia's scenario
- Omitting sociotechnical factors (blaming the engineer individually)
- Treating recovery speed as the only resilience metric`,
    points: 10,
  },

  // ─── QUESTION 2 — Survivability Analysis ───────────────────────────────────

  {
    id: "ITSEA_W9_Q9",
    type: "multiple-choice",
    tags: ["threat modelling", "system design"],
    sectionLabel: "2.1",
    text: "Which activity belongs to **survivable systems analysis**?",
    options: [
      "Financial forecasting",
      "Attack simulation",
      "UI usability testing",
      "Code optimisation",
    ],
    correctAnswers: ["Attack simulation"],
    points: 1,
    explanation: "Survivability analysis explicitly includes **attack scenarios and simulation of possible disruptions** to identify which components are both essential and vulnerable.",
  },

  {
    id: "ITSEA_W9_Q10",
    type: "fill-in-the-blank",
    tags: ["threat modelling"],
    sectionLabel: "2.2",
    text: "In survivability analysis, components that are both essential and vulnerable are often called system ___.",
    blanks: [
      {
        id: "b1",
        options: ["hard targets", "critical nodes", "failure points", "soft spots"],
        correctAnswer: "soft spots",
      },
    ],
  },

  {
    id: "ITSEA_W9_Q11",
    type: "open-ended",
    tags: ["risk management"],
    sectionLabel: "2.3",
    text: "Name the organisational capability that focuses on **learning from successful responses** to adverse events.",
    correctAnswers: ["learning"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    explanation: "One of the four characteristics of organisational resilience is the **ability to learn** — using experience from both failures and successful responses to improve future preparedness.",
  },

  {
    id: "ITSEA_W9_Q12",
    type: "show-answer",
    tags: ["risk management", "managerial impact", "incident response"],
    sectionLabel: "2.4",
    text: "Aurelia's CIO argues that cyber resilience should be evaluated **only** by counting how fast systems recover.\n\nCritically evaluate this statement.",
    correctAnswers: [
      "Recovery speed is important but insufficient.\n\nResilience is broader than recovery because it concerns whether **critical services continue under disruption**, not simply how quickly systems return after failure.\n\nA recovery-only view ignores **recognition**. If anomalies are not detected early, damage can spread before recovery even begins.\n\nIt also ignores **resistance**. A resilient organisation may avoid service collapse entirely through early containment or adaptive operational response — never reaching a state where recovery is needed.\n\nFurthermore, resilience is **sociotechnical**. Staff training, escalation pathways, procedural clarity, organisational anticipation, and post-incident learning all shape resilience outcomes but are not captured by a recovery-speed metric.\n\nA more complete evaluation should consider:\n- whether threats were anticipated,\n- how quickly anomalies were *recognised*,\n- whether critical services remained available during disruption,\n- whether recovery prioritised the correct assets,\n- whether lessons from the event improved future resilience.\n\nRecovery time is therefore a useful indicator — but not a sufficient measure of resilience.",
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Explains why recovery alone is insufficient | 2 |
| Correct integration of recognition and resistance | 2 |
| Sociotechnical and organisational reasoning | 2 |
| **Total** | **6** |

**Examiner note:** Top answers distinguish *service continuity* (maintaining critical functions during disruption) from *full restoration* (returning all systems to normal).`,
    points: 6,
  },

  // ─── QUESTION 3 — Software Reuse Strategy ──────────────────────────────────

  {
    id: "ITSEA_W9_Q13",
    type: "multiple-choice",
    tags: ["software processes", "system design"],
    sectionLabel: "3.1",
    text: "Aurelia wants rapid deployment across multiple plants with minimal original development.\n\nWhich reuse strategy is **most immediately** aligned to this objective?",
    options: [
      "Object reuse",
      "Function reuse",
      "Application system reuse",
      "Algorithm redesign",
    ],
    correctAnswers: ["Application system reuse"],
    points: 1,
    explanation: "**Application system reuse** allows rapid deployment of already-developed, already-tested software products with minimal new development effort — exactly what Aurelia needs for fast multi-plant rollout.",
  },

  {
    id: "ITSEA_W9_Q14",
    type: "fill-in-the-blank",
    tags: ["UML & modelling", "system design"],
    sectionLabel: "3.2",
    text: "A reusable web application framework commonly follows the ___-View-Controller pattern.",
    blanks: [
      {
        id: "b1",
        options: ["Module", "Model", "Manager", "Master"],
        correctAnswer: "Model",
      },
    ],
  },

  {
    id: "ITSEA_W9_Q15",
    type: "multiple-choice",
    tags: ["system design", "software processes"],
    sectionLabel: "3.3",
    text: "Which of the following **best distinguishes** a software product line from an application framework?",
    options: [
      "Product lines only support web systems",
      "Product lines embed domain-specific variation",
      "Frameworks cannot be reused",
      "Frameworks require deployment-time configuration only",
    ],
    correctAnswers: ["Product lines embed domain-specific variation"],
    points: 1,
    explanation: "**Software product lines** are built around controlled variation across related applications in the same domain — allowing shared architecture with plant-specific customisation. Application frameworks provide reusable structure but do not manage domain-specific variation in the same way.",
  },

  {
    id: "ITSEA_W9_Q16",
    type: "open-ended",
    tags: ["system configuration"],
    sectionLabel: "3.4",
    text: "What **three-letter acronym** refers to a configurable enterprise-wide application commonly used to support manufacturing, ordering, and invoicing?",
    correctAnswers: ["ERP"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    explanation: "**ERP** stands for Enterprise Resource Planning. These systems support integrated enterprise processes — procurement, inventory, production planning, customer data, and financial reporting — through a single configurable platform.",
  },

  {
    id: "ITSEA_W9_Q17",
    type: "fill-in-the-blank",
    tags: ["cultural challenges"],
    sectionLabel: "3.5",
    text: "In reuse-based development, engineers sometimes reject reusable components because of the not-invented-___ syndrome.",
    blanks: [
      {
        id: "b1",
        options: ["yet", "first", "internally", "here"],
        correctAnswer: "here",
      },
    ],
  },

  {
    id: "ITSEA_W9_Q18",
    type: "multiple-choice",
    tags: ["data integration", "system design"],
    sectionLabel: "3.6",
    text: "Aurelia wants to combine a legacy inventory system, a cloud CRM, and a new procurement platform.\n\nWhich challenge is **most conceptually central**?",
    options: [
      "inheritance depth",
      "data interoperability",
      "abstract class design",
      "polymorphic dispatch",
    ],
    correctAnswers: ["data interoperability"],
    points: 1,
    explanation: "**Data interoperability** is the core challenge when integrating systems that use different data structures, assumptions, and formats. Legacy and cloud systems rarely share a common data model — bridging those differences is the central integration problem.",
  },

  {
    id: "ITSEA_W9_Q19",
    type: "show-answer",
    tags: ["system design", "software processes", "system configuration"],
    sectionLabel: "3.7",
    text: "Aurelia asks whether it should adopt:\n- a **web application framework**,\n- a **software product line**, or\n- a **configurable enterprise application system (ERP-style approach)**.\n\nRecommend the most suitable combination and justify your answer.",
    correctAnswers: [
      {
        text: "Aurelia should **combine** these strategies rather than choosing only one.\n\n**Configurable Enterprise Application (ERP)**\n\nA configurable enterprise application should form the enterprise backbone. It is suitable for procurement, inventory, reporting, finance, and cross-plant coordination. The major advantage is rapid deployment of reliable, already-tested functionality with reduced development risk.\n\n**Software Product Line**\n\nAurelia operates plants with different machinery, local operating constraints, and specialised production processes. Product line engineering is therefore ideal for plant-level operational software — it allows reuse of a shared architecture with *controlled variation* for each plant's specific needs.\n\n**Web Application Framework**\n\nA web application framework is most suitable for dashboards, operator portals, monitoring interfaces, and service-based coordination tools. It is best viewed as an *implementation-level* mechanism rather than a primary enterprise strategy.\n\n**Recommendation**\n\nThe strongest architecture is layered:\n- **ERP / configurable application reuse** → enterprise integration,\n- **product line engineering** → plant-specific operational variation,\n- **framework reuse** → front-end delivery and service-layer applications.\n\nThis combination provides both *standardisation* (through shared platforms) and *adaptability* (through controlled variation), aligning with Aurelia's dual need after a decade of acquisitions.",
        diagram: {
          type: "mermaid",
          code: `flowchart TD
    ERP[Configurable Enterprise Application]
    PL[Software Product Line]
    WAF[Web Application Framework]
    ERP --> Procurement
    ERP --> Inventory
    ERP --> Reporting
    PL --> PlantA[Plant A Control]
    PL --> PlantB[Plant B Control]
    PL --> PlantC[Plant C Control]
    WAF --> Dashboard
    WAF --> Monitoring
    WAF --> ServicePortal`,
        },
      },
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Accurate distinction between all three approaches | 3 |
| Scenario-based justification for each | 3 |
| Coherent integrated recommendation | 2 |
| **Total** | **8** |

**Common errors:**
- Defining the three concepts without applying them to Aurelia
- Recommending only one approach without justifying why a combination is superior
- Treating the web framework as the primary enterprise strategy`,
    points: 8,
    image: {
        src: "/images/ITSEA_W9_Q19.png",
        alt: "Enterprise systems architecture for Aurelia Dynamics showing an ERP core connected to three manufacturing plants, external business applications, and a web application layer.",
        caption: "Figure 1. High-level architecture of Aurelia Dynamics showing enterprise application reuse, plant-specific operational variation, and cross-system integration."
        }
  },

];