// src/data/questions/ITDSA/week9.js
// Database Systems — Enterprise Data Management & Database Implementation
// Structure: 2 questions × 25 marks each = 50 marks total
// Each question uses genuinely mixed types throughout

export default [

  // ═══════════════════════════════════════════════════════════════════════════
  // QUESTION 1 — TechWave Solutions (25 Marks)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: "SCENARIO_ITDSA_W9_Q1",
    type: "scenario",
    title: "Question 1: Enterprise Data Management & DBMS Environment (25 Marks)",
    context: `TechWave Solutions is a rapidly growing technology company that provides cloud-based services and software solutions to clients worldwide. The company currently stores its data in separate spreadsheets and isolated applications across departments such as Human Resources, Finance, Customer Support, and Product Development.\n\nThis fragmented approach has led to:\n• Data inconsistency and duplication\n• Limited data sharing between departments\n• Poor decision-making due to lack of reliable data\n• Security vulnerabilities and unauthorised access risks\n\nTo address these issues, TechWave Solutions has decided to implement a centralised Database Management System (DBMS). The system will support multiple users, enforce data security, and ensure proper data backup and recovery mechanisms.\n\nManagement has emphasised the need for standardised business procedures, improved data governance, and alignment between technology, people, and processes. A Database Administrator (DBA) and a data analyst have been tasked with evaluating system requirements through staff interviews and operational manuals.`
  },

  // ── Q1.1 MCQ (2 marks) ────────────────────────────────────────────────────

  {
    id: "ITDSA_W9_Q1",
    type: "multiple-choice",
    sectionLabel: "1.1",
    text: "TechWave's management wants to treat organisational data as a strategic asset rather than a departmental by-product. Which factor is MOST critical in ensuring the new DBMS aligns with this goal?",
    options: [
      "Hardware specifications",
      "Business procedures and rules",
      "Network bandwidth",
      "Data storage capacity"
    ],
    correctAnswers: ["Business procedures and rules"],
    points: 2
  },

  // ── Q1.1 Justification — open-ended (2 marks) ─────────────────────────────

  {
    id: "ITDSA_W9_Q2",
    type: "open-ended",
    sectionLabel: "1.1 (Justify)",
    text: "You selected an answer in Q1.1. In 1–2 sentences, explain why that answer is more appropriate than ONE of the other options in the context of TechWave.",
    correctAnswers: [
      "Business procedures define how data is created, used, and controlled across departments. Without aligning the DBMS to these rules, even advanced hardware will not resolve TechWave's inconsistency and duplication problems."
    ],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 30,
      requiredTerms: ["business", "procedures"]
    }
  },

  // ── Q1.2 Short Answer — Conceptual precision (3 marks) ────────────────────

  {
    id: "ITDSA_W9_Q3",
    type: "open-ended",
    sectionLabel: "1.2a",
    text: "TechWave's departments each maintain their own records without any shared rules for how data is captured or used. What is the term for the guidelines that govern how data must be handled within an organisation?",
    correctAnswers: ["Business rules", "Data governance rules", "Data policies"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 10
    }
  },

  {
    id: "ITDSA_W9_Q4",
    type: "open-ended",
    sectionLabel: "1.2b",
    text: "TechWave's DBA and data analyst interview department heads and review operational manuals before designing the DBMS. What is this information-gathering activity called?",
    correctAnswers: ["Requirements gathering", "Requirements analysis", "Needs analysis"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 10
    }
  },

  {
    id: "ITDSA_W9_Q5",
    type: "open-ended",
    sectionLabel: "1.2c",
    text: "After implementing the DBMS, all departments at TechWave will draw from one consistent pool of data instead of their own isolated copies. What two-word term describes this principle of treating data as a shared company-wide resource?",
    correctAnswers: ["Data integration", "Shared resource", "Data asset", "Shared data"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 10
    }
  },

  // ── Q1.3 Fill-in-the-blank + Explanation (6 marks) ────────────────────────

  {
    id: "ITDSA_W9_Q6",
    type: "fill-in-the-blank",
    sectionLabel: "1.3",
    text: "A DBMS improves organisational efficiency by reducing data ___, which is the unnecessary storing of the same data in multiple places. Structuring data so it is consistent and non-contradictory is referred to as maintaining data ___. When an organisation ensures its data reflects real-world facts accurately, it is upholding data ___.",
    blanks: [
      {
        id: "b1",
        options: ["redundancy", "abstraction", "encryption", "migration"],
        correctAnswer: "redundancy"
      },
      {
        id: "b2",
        options: ["availability", "integrity", "portability", "scalability"],
        correctAnswer: "integrity"
      },
      {
        id: "b3",
        options: ["sovereignty", "warehousing", "accuracy", "normalisation"],
        correctAnswer: "accuracy"
      }
    ]
  },

  {
    id: "ITDSA_W9_Q7",
    type: "open-ended",
    sectionLabel: "1.3 (Explain)",
    text: "From the three concepts you completed above (redundancy, integrity, accuracy), choose ONE and explain in 2–3 sentences how it directly applies to TechWave's current situation.",
    correctAnswers: [
      "Data redundancy occurs when the same information is stored in multiple places — for example, TechWave's HR and Finance departments both storing employee details in separate spreadsheets. This leads to conflicting records and wasted storage. A centralised DBMS eliminates this by storing each piece of data only once."
    ],
    points: 3,
    validationOptions: {
      caseSensitive: false,
      tolerance: 40,
      requiredTerms: ["techwave"]
    }
  },

  // ── Q1.4a Essay Part A — Data as a resource + Business procedures (6 marks)

  {
    id: "ITDSA_W9_Q8",
    type: "show-answer",
    sectionLabel: "1.4 Part A",
    text: "Discuss how treating data as a shared organisational resource and aligning business procedures with the DBMS will address TWO of TechWave's current challenges. (6 marks)",
    correctAnswers: [
      "Treating data as a shared organisational resource means all departments access the same centralised, consistent information rather than maintaining isolated spreadsheets. For TechWave, this directly resolves data inconsistency and duplication — when HR updates an employee record, Finance and Customer Support immediately see the same change, eliminating conflicting data. It also addresses limited data sharing, since a centralised DBMS allows cross-departmental queries and reporting that were previously impossible with siloed systems.\n\nAligning business procedures with the DBMS ensures that the rules governing how data is captured, updated, and used are enforced at a system level. At TechWave, this means standardising how customer orders are recorded in Product Development versus how they are billed in Finance, preventing the contradictions that currently undermine decision-making. Procedures also define who is responsible for data quality, ensuring accountability across departments."
    ],
    markingGuide: "Award 2 marks for explaining data as a shared resource with clear scenario linkage (e.g. centralisaton resolving duplication or sharing). Award 2 marks for explaining how business procedures address a specific TechWave challenge (e.g. standardising data entry, enforcing consistency). Award 2 marks for identifying and discussing TWO distinct TechWave challenges — answers that address only one challenge are capped at 4 marks.",
    points: 6
  },

  // ── Q1.4b Essay Part B — Technology and people interaction (6 marks) ──────

  {
    id: "ITDSA_W9_Q9",
    type: "show-answer",
    sectionLabel: "1.4 Part B",
    text: "Explain the interaction between technology and people in a DBMS implementation, and discuss what can go wrong at TechWave if this interaction is poorly managed. (6 marks)",
    correctAnswers: [
      "The interaction between technology and people is at the heart of any DBMS implementation. While the DBMS provides the technical infrastructure — centralised storage, query tools, security controls — it only delivers value if the people using it understand how to interact with it correctly. At TechWave, staff across HR, Finance, and other departments must be trained to enter data consistently, follow access protocols, and trust the system's outputs over their old spreadsheets.\n\nIf this interaction is poorly managed, several problems can arise. Employees who resist the change may continue using personal spreadsheets in parallel, recreating the very duplication the DBMS was meant to eliminate. Poorly trained staff may enter data inconsistently, corrupting the integrity of the centralised database. Management who do not understand the system's capabilities may fail to leverage it for decision-making, meaning the investment yields no strategic benefit. In the worst case, cultural resistance can cause the entire implementation to fail — not because the technology is flawed, but because the human dimension was neglected."
    ],
    markingGuide: "Award 2 marks for explaining what the technology–people interaction means in a DBMS context (not just a definition — must show the dependency). Award 2 marks for identifying at least TWO specific consequences of poor management of this interaction at TechWave. Award 2 marks for demonstrating that the student understands technology alone is insufficient — full marks require acknowledgement that human factors (training, culture, adoption) are equally critical.",
    points: 6
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // QUESTION 2 — EduSmart Institute (25 Marks)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: "SCENARIO_ITDSA_W9_Q2",
    type: "scenario",
    title: "Question 2: Database Implementation, Roles & Organisational Impact (25 Marks)",
    context: `EduSmart Institute is introducing an online learning platform that will store student records, course materials, assessment results, and instructor data in a centralised database system.\n\nThe institution plans to deploy the system using Oracle Database Express Edition (XE) and provide access through an online interface such as Oracle LiveSQL.\n\nThe implementation has raised several organisational and technical considerations:\n• Staff require training to use the system effectively\n• Data must be accurate, consistent, and secure\n• The institution must adapt its existing processes to align with the new system\n• The DBA must ensure smooth installation, configuration, and maintenance\n\nSenior management must define governance policies, while department heads must align their workflows with the new system. The cultural shift from manual, paper-based administration to a fully digital database environment is significant.`
  },

  // ── Q2.1 MCQ (2 marks) ────────────────────────────────────────────────────

  {
    id: "ITDSA_W9_Q10",
    type: "multiple-choice",
    sectionLabel: "2.1",
    text: "EduSmart's senior management is deciding who controls access to student data, what retention policies apply, and how data quality will be maintained. Which activity BEST represents this responsibility?",
    options: [
      "Installing Oracle XE",
      "Writing SQL queries",
      "Defining data governance policies",
      "Monitoring query performance"
    ],
    correctAnswers: ["Defining data governance policies"],
    points: 2
  },

  // ── Q2.1 Justification — open-ended (1 mark) ──────────────────────────────

  {
    id: "ITDSA_W9_Q11",
    type: "open-ended",
    sectionLabel: "2.1 (Justify)",
    text: "In one sentence, explain why the activity you selected in Q2.1 is a managerial responsibility rather than a technical one.",
    correctAnswers: [
      "Data governance defines the rules and policies that govern data use, which is a decision-making function belonging to management rather than a hands-on technical task performed by the DBA."
    ],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 35,
      requiredTerms: ["management", "governance"]
    }
  },

  // ── Q2.2 Short Answer — DBA responsibilities (4 marks) ────────────────────

  {
    id: "ITDSA_W9_Q12",
    type: "open-ended",
    sectionLabel: "2.2a",
    text: "Identify and explain ONE DBA responsibility at EduSmart that directly supports system reliability. Your answer must name the responsibility and explain what the DBA actually does.",
    correctAnswers: [
      "Backup management — the DBA schedules and monitors regular backups of the database so that student records, assessment results, and course data can be restored if the system fails or data is corrupted."
    ],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 35,
      requiredTerms: ["backup", "recovery", "performance", "maintenance"]
    }
  },

  {
    id: "ITDSA_W9_Q13",
    type: "open-ended",
    sectionLabel: "2.2b",
    text: "Identify and explain a SECOND DBA responsibility at EduSmart that is different from your answer above, and explain how it supports the institution's long-term system needs.",
    correctAnswers: [
      "Performance monitoring — the DBA continuously monitors database performance, identifying slow queries or bottlenecks, and optimises storage and indexing to ensure the system remains responsive as EduSmart's data grows over time."
    ],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 35,
      requiredTerms: ["dba", "database", "edusmart", "system"]
    }
  },

  // ── Q2.3 Fill-in-the-blank + Explanation (6 marks) ────────────────────────

  {
    id: "ITDSA_W9_Q14",
    type: "fill-in-the-blank",
    sectionLabel: "2.3",
    text: "EduSmart will install Oracle ___ locally on its servers as the core database engine. Staff who are off-campus can use Oracle ___ to run SQL queries through a browser without any installation. Before any user can access the system, the DBA must complete the process of system ___, which tailors the database to meet the institution's specific requirements.",
    blanks: [
      {
        id: "b1",
        options: ["LiveSQL", "XE", "Apex", "CLI"],
        correctAnswer: "XE"
      },
      {
        id: "b2",
        options: ["XE", "Studio", "LiveSQL", "Express"],
        correctAnswer: "LiveSQL"
      },
      {
        id: "b3",
        options: ["migration", "normalisation", "configuration", "replication"],
        correctAnswer: "configuration"
      }
    ]
  },

  {
    id: "ITDSA_W9_Q15",
    type: "open-ended",
    sectionLabel: "2.3 (Explain)",
    text: "Explain in 2–3 sentences why proper system configuration is critical at EduSmart. Your answer should reference what could go wrong if configuration is done poorly.",
    correctAnswers: [
      "Proper system configuration ensures the database is set up to match EduSmart's specific data structures, user roles, and security policies before any data is entered. If configuration is done poorly, users may be granted incorrect access levels — for example, students accessing instructor-only records — or data may be stored in formats incompatible with the institution's reporting requirements. Poor configuration can also cause performance issues as the database grows, requiring costly and disruptive rework later."
    ],
    points: 3,
    validationOptions: {
      caseSensitive: false,
      tolerance: 40,
      requiredTerms: ["edusmart", "configuration"]
    }
  },

  // ── Q2.4a Essay Part A — Technological + Managerial impact (6 marks) ──────

  {
    id: "ITDSA_W9_Q16",
    type: "show-answer",
    sectionLabel: "2.4 Part A",
    text: "Evaluate the TECHNOLOGICAL and MANAGERIAL impacts of implementing a DBMS at EduSmart Institute. For each impact, explain what it means in practice and how it affects the institution. (6 marks)",
    correctAnswers: [
      "Technologically, EduSmart must acquire and configure compatible server infrastructure to host Oracle XE, ensure network reliability so staff and students can access Oracle LiveSQL remotely, and establish maintenance routines to keep the system updated and secure. This represents a significant shift from the institution's previous manual or spreadsheet-based systems, requiring investment in both hardware and technical expertise. The DBA plays a central role here — without proper installation and configuration, the system cannot function reliably.\n\nManagerially, EduSmart's leadership must make strategic decisions that go beyond the technical setup. They must define data governance policies — determining who owns student data, how long it is retained, and who is permitted to access it. Management must also allocate budget for training, support, and ongoing maintenance, and they must communicate clearly to staff why the change is happening and what is expected of them. Weak managerial decisions create ambiguity, leading to inconsistent data practices and resistance from staff who are unsure of their responsibilities under the new system."
    ],
    markingGuide: "Award 1 mark for identifying the technological impact. Award 2 marks for explaining technological impact with specific EduSmart detail (infrastructure, Oracle XE, DBA role). Award 1 mark for identifying the managerial impact. Award 2 marks for explaining managerial impact with specific EduSmart detail (governance, policy, budget, communication). Generic textbook answers without scenario application are capped at 3 marks total.",
    points: 6
  },

  // ── Q2.4b Essay Part B — Cultural impact + Interdependence (6 marks) ──────

  {
    id: "ITDSA_W9_Q17",
    type: "show-answer",
    sectionLabel: "2.4 Part B",
    text: "Discuss the CULTURAL challenges EduSmart will face when implementing the DBMS, and explain how the technological, managerial, and cultural impacts are interdependent. (6 marks)",
    correctAnswers: [
      "Culturally, EduSmart's staff — including administrative personnel, instructors, and department heads — must transition from familiar manual processes to a fully digital, centralised database environment. Many employees may resist this change, not because the technology is difficult, but because it disrupts established routines and requires learning new skills. This resistance can manifest as continued use of paper records, reluctance to enter data into the system, or general scepticism about whether the new platform is an improvement. EduSmart must invest in structured training programmes, provide ongoing support, and foster a culture that values data accuracy and digital competence.\n\nThese three impacts — technological, managerial, and cultural — are deeply interdependent. Poor technology implementation (e.g. an unreliable system) gives staff a legitimate reason to distrust and avoid it, deepening cultural resistance. Weak management decisions (e.g. no training budget or unclear policies) leave staff without the guidance needed to adapt. Conversely, cultural resistance that is not addressed will undermine even a technically excellent system — if instructors refuse to enter assessment results correctly, the database's integrity is compromised regardless of its architecture. A successful implementation requires all three dimensions to be managed simultaneously and with equal seriousness."
    ],
    markingGuide: "Award 1 mark for identifying cultural resistance as the core challenge. Award 2 marks for explaining cultural impact with specific EduSmart examples (e.g. staff reverting to paper, reluctance to adopt the system). Award 3 marks for a clear, well-reasoned discussion of interdependence — specifically showing cause-and-effect relationships between at least two of the three impact areas. Answers that list impacts separately without discussing their connections are capped at 4 marks.",
    points: 6
  }

];