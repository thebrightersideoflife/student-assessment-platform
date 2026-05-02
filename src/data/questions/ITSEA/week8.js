// src/data/questions/ITSEA/week8.js
export default [
  // ── Scenario ──────────────────────────────────────────────────────────────
  {
    id: 'SCENARIO_ITSEA_W8',
    type: 'scenario',
    title: 'MedSecure Cloud Platform',
    context: `MedSecure is a cloud-based healthcare platform used by hospitals, clinics, and insurance providers to store and process patient medical records, prescriptions, and billing data.

Due to rapid expansion, the system has evolved without a strong emphasis on security during early design stages. Recently, the following issues have been identified:

• Patient data was modified without authorisation
• A distributed denial-of-service attack caused prolonged downtime
• Some system components share common infrastructure vulnerabilities
• Developers prioritised usability over strict input validation
• Security was added after implementation, leading to performance degradation
• Logs were incomplete, making it difficult to trace malicious actions
• Risk assessments were only conducted at the beginning of the project

MedSecure now plans to redesign its system using secure systems engineering principles, incorporating architectural redesign, risk-driven requirements, and improved testing strategies.`,
  },

  // ── Question 1: Security, Risk, and Requirements Engineering ──────────────
  {
    id: 'SCENARIO_ITSEA_W8_Q1',
    type: 'scenario',
    title: 'Question 1: Security, Risk, and Requirements Engineering (25 Marks)',
    context: '',
  },

  // Q1.1 — Multiple Choice
  {
    id: 'ITSEA_W8_Q1',
    type: 'multiple-choice',
    sectionLabel: '1.1',
    text: 'Which statement **BEST** explains why MedSecure\'s initial approach to security was fundamentally flawed?',
    options: [
      'Security requirements were too detailed during development',
      'Security was treated as an afterthought rather than integrated into design',
      'Security policies were overly restrictive for users',
      'Security testing was prioritised over usability',
    ],
    correctAnswers: ['Security was treated as an afterthought rather than integrated into design'],
    points: 3,
    explanation: 'Security must be **designed into the system**, not added after implementation. Late integration leads to inefficiencies and vulnerabilities.',
  },

  // Q1.2 — Fill-in-the-blank
  {
    id: 'ITSEA_W8_Q2',
    type: 'fill-in-the-blank',
    sectionLabel: '1.2',
    text: 'A threat that allows an attacker to tamper with system data is known as a ___ threat.',
    blanks: [
      {
        id: 'b1',
        options: ['Fabrication', 'Modification', 'Interception', 'Interruption'],
        correctAnswer: 'Modification',
      },
    ],
    explanation: 'A **modification threat** involves the unauthorised alteration of system data.',
  },

  // Q1.3 — Open-ended
  {
    id: 'ITSEA_W8_Q3',
    type: 'open-ended',
    sectionLabel: '1.3',
    text: 'What is the term for requirements that specify **what the system must NOT allow**? *(1–3 words)*',
    correctAnswers: ['shall-not requirements', 'shall not requirements'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    explanation: 'Security requirements define **undesirable behaviour**, specifying what must NOT occur. These are called **shall-not requirements**.',
  },

  // Q1.4 — Multiple Choice
  {
    id: 'ITSEA_W8_Q4',
    type: 'multiple-choice',
    sectionLabel: '1.4',
    text: 'Which of the following **BEST** represents a **risk mitigation requirement** for MedSecure?',
    options: [
      'Prevent all external access to the system',
      'Detect unusual login patterns',
      'Restore patient data from backups after a breach',
      'Identify system assets during analysis',
    ],
    correctAnswers: ['Restore patient data from backups after a breach'],
    points: 3,
    explanation: 'Risk mitigation focuses on **recovery after an attack**, such as restoring data from backups.',
  },

  // Q1.5 — Fill-in-the-blank
  {
    id: 'ITSEA_W8_Q5',
    type: 'fill-in-the-blank',
    sectionLabel: '1.5',
    text: 'The process of identifying assets, threats, and potential losses is called ___.',
    blanks: [
      {
        id: 'b1',
        options: ['Penetration testing', 'Threat modelling', 'Security risk assessment', 'Vulnerability scanning'],
        correctAnswer: 'Security risk assessment',
      },
    ],
    explanation: 'A **security risk assessment** is the structured process of identifying **assets, threats, and potential exposure** to establish appropriate controls.',
  },

  // Q1.6 — Show-answer (Essay)
  {
    id: 'ITSEA_W8_Q6',
    type: 'show-answer',
    sectionLabel: '1.6',
    text: 'Using the MedSecure scenario, critically analyse the **risk-driven security requirements process**. Explain how each stage should have been applied and identify where MedSecure failed.',
    correctAnswers: [
      {
        text: '**Asset Identification**\n\nMedSecure should have identified patient records, billing data, and system availability as critical assets. Failure to prioritise these assets likely contributed to insufficient protection.\n\n**Asset Value Assessment**\n\nPatient data is highly sensitive, with both financial and ethical implications. Underestimating its value may have led to weak controls.\n\n**Exposure Assessment**\n\nThe organisation failed to anticipate reputational damage, legal liability, and operational disruption from breaches.\n\n**Threat Identification**\n\nThreats such as DDoS attacks and unauthorised modification were not adequately considered.\n\n**Attack Assessment**\n\nSpecific attack vectors — for example, exploiting shared infrastructure vulnerabilities — were not analysed in depth.\n\n**Control Identification**\n\nLack of input validation, logging, and distributed protection mechanisms shows weak control selection.\n\n**Feasibility Assessment**\n\nSecurity was added later, suggesting poor evaluation of cost vs benefit early in development.\n\n**Security Requirements Definition**\n\nRequirements were incomplete and reactive rather than proactive.\n\n**Conclusion**\n\nMedSecure\'s key failure was treating risk assessment as a *one-time activity*, rather than a **continuous, iterative process** interleaved with system development.',
      },
    ],
    markingGuide: `| Criterion | Marks |\n|---|---|\n| Correct explanation of each stage (any 6+) | 6 |\n| Scenario linkage | 1 |\n| Integration insight | 1 |\n| **Total** | **8** |\n\n**Examiner Insight:** A+ responses demonstrate **process awareness + scenario application**, not just listing stages.`,
    points: 8,
  },

  // Q1.7 — Multiple Choice
  {
    id: 'ITSEA_W8_Q7',
    type: 'multiple-choice',
    sectionLabel: '1.7',
    text: 'Which type of security requirement is **MOST** directly violated when patient data is altered without authorisation?',
    options: [
      'Privacy requirement',
      'Integrity requirement',
      'Authentication requirement',
      'Nonrepudiation requirement',
    ],
    correctAnswers: ['Integrity requirement'],
    points: 3,
    explanation: 'Unauthorised modification directly violates **data integrity** — the requirement that data remains accurate and unaltered except by authorised processes.',
  },

  // Q1.8 — Open-ended
  {
    id: 'ITSEA_W8_Q8',
    type: 'open-ended',
    sectionLabel: '1.8',
    text: 'What is the term for a threat where **false data is inserted into a system**? *(1–3 words)*',
    correctAnswers: ['fabrication threat', 'fabrication'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    explanation: 'A **fabrication threat** involves inserting false or counterfeit data into the system, compromising data integrity.',
  },

  // ── Question 2: Secure Design, Architecture, and Testing ──────────────────
  {
    id: 'SCENARIO_ITSEA_W8_Q2',
    type: 'scenario',
    title: 'Question 2: Secure Design, Architecture, and Testing (25 Marks)',
    context: '',
  },

  // Q2.1 — Multiple Choice
  {
    id: 'ITSEA_W8_Q9',
    type: 'multiple-choice',
    sectionLabel: '2.1',
    text: 'Which design principle would **MOST** directly address MedSecure\'s reliance on shared infrastructure vulnerabilities?',
    options: [
      'Fail-secure',
      'Defence in depth',
      'Redundancy and diversity',
      'Input validation',
    ],
    correctAnswers: ['Redundancy and diversity'],
    points: 3,
    explanation: '**Redundancy and diversity** reduce reliance on shared components so that a vulnerability in one part does not compromise the entire system.',
  },

  // Q2.2 — Fill-in-the-blank
  {
    id: 'ITSEA_W8_Q10',
    type: 'fill-in-the-blank',
    sectionLabel: '2.2',
    text: 'The principle that ensures systems remain secure even when they fail is called ___.',
    blanks: [
      {
        id: 'b1',
        options: ['Fail-secure', 'Defence in depth', 'Redundancy', 'Input validation'],
        correctAnswer: 'Fail-secure',
      },
    ],
    explanation: 'The **fail-secure** principle ensures that when a system encounters an error or failure, it defaults to a secure state rather than an insecure one.',
  },

  // Q2.3 — Multiple Choice
  {
    id: 'ITSEA_W8_Q11',
    type: 'multiple-choice',
    sectionLabel: '2.3',
    text: 'Which architectural decision **BEST** improves resilience against denial-of-service attacks?',
    options: [
      'Centralising all services on one platform',
      'Distributing system assets across multiple platforms',
      'Removing authentication checks',
      'Increasing user interaction steps',
    ],
    correctAnswers: ['Distributing system assets across multiple platforms'],
    points: 3,
    explanation: 'Distribution reduces the impact of attacks like DDoS and **prevents single points of failure** by spreading risk across multiple platforms.',
  },

  // Q2.4 — Open-ended
  {
    id: 'ITSEA_W8_Q12',
    type: 'open-ended',
    sectionLabel: '2.4',
    text: 'What type of testing involves **external experts attempting to breach the system**? *(1–3 words)*',
    correctAnswers: ['penetration testing', 'pen testing'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 20,
    },
    explanation: '**Penetration testing** involves external security experts simulating real attacks to identify vulnerabilities before malicious actors can exploit them.',
  },

  // Q2.5 — Fill-in-the-blank
  {
    id: 'ITSEA_W8_Q13',
    type: 'fill-in-the-blank',
    sectionLabel: '2.5',
    text: 'Recording who performed an action, when, and on which resource is known as ___.',
    blanks: [
      {
        id: 'b1',
        options: ['Auditing', 'Accountability', 'Logging', 'Non-repudiation'],
        correctAnswer: 'Logging',
      },
    ],
    explanation: '**Logging** records who did what, when, and where — enabling traceability, accountability, and forensic investigation after a security incident.',
  },

  // Q2.6 — Show-answer (Essay)
  {
    id: 'ITSEA_W8_Q14',
    type: 'show-answer',
    sectionLabel: '2.6',
    text: 'Evaluate MedSecure\'s system redesign using **secure design guidelines and architectural principles**. Your answer must integrate:\n\n- Protection layers\n- Distribution strategies\n- Trade-offs (security vs usability vs performance)\n- At least three design guidelines',
    correctAnswers: [
      {
        text: '**Protection Layers**\n\nMedSecure should implement security at multiple levels:\n\n- *Platform-level:* Secure OS configuration and infrastructure hardening\n- *Application-level:* Input validation and strong authentication controls\n- *Record-level:* Fine-grained access restrictions on individual patient records\n\n**Distribution Strategy**\n\nDistributing system assets across multiple platforms reduces the impact of targeted attacks such as DDoS and eliminates single points of failure. No single compromise should bring down the entire system.\n\n**Design Guidelines**\n\n- **Defence in depth:** Multiple independent layers ensure that the failure of one control does not result in total compromise.\n- **Fail-secure:** The system must default to a secure state during unexpected failures, never to an open or insecure one.\n- **Input validation:** All incoming data must be validated to prevent malicious injection.\n- **Logging:** Comprehensive audit logs enable monitoring, accountability, and incident response.\n\n**Trade-offs**\n\nIncreased security inevitably introduces:\n\n- *Reduced usability* — additional checks and authentication steps create friction for legitimate users\n- *Performance overhead* — encryption, validation, and logging all consume processing resources\n\nEffective secure design requires *balancing* these constraints against the risk exposure and sensitivity of the data being protected.',
      },
    ],
    markingGuide: `| Criterion | Marks |\n|---|---|\n| Protection layers | 2 |\n| Distribution strategy | 2 |\n| Design guidelines (any 3 applied) | 3 |\n| Trade-offs | 1 |\n| **Total** | **8** |\n\n**Examiner Insight:** Top answers explicitly show **architectural reasoning**, not generic descriptions.`,
    points: 8,
  },

  // Q2.7 — Multiple Choice
  {
    id: 'ITSEA_W8_Q15',
    type: 'multiple-choice',
    sectionLabel: '2.7',
    text: 'Why is security testing particularly difficult in systems like MedSecure?',
    options: [
      'Security requirements are easy to measure',
      'Attackers behave predictably',
      'Security specifies undesirable behaviour rather than functionality',
      'Testing focuses only on system performance',
    ],
    correctAnswers: ['Security specifies undesirable behaviour rather than functionality'],
    points: 3,
    explanation: 'Security requirements define **what should NOT happen**, making them difficult to test exhaustively — you cannot enumerate every possible attack or undesirable state.',
  },

  // Q2.8 — Show-answer (Diagrammatic Essay)
  {
    id: 'ITSEA_W8_Q16',
    type: 'show-answer',
    sectionLabel: '2.8',
    text: 'Construct a **misuse case representation** for MedSecure, showing at least:\n\n- One legitimate user interaction\n- One associated misuse case (threat)',
    correctAnswers: [
      {
        text: 'The diagram below shows a **legitimate use case** (a doctor accessing a patient record) alongside a **misuse case** (unauthorised data modification). Both interact with the MedSecure system, but the misuse case represents a threat actor exploiting the same interface.\n\nThis representation highlights that **threat actors target the same system entry points** as legitimate users, making access control, input validation, and logging critical defensive layers.',
        diagram: {
          type: 'mermaid',
          code: `flowchart LR
    Doctor[Doctor accesses patient record]
    System[(MedSecure System)]
    Attack((Unauthorized data modification))
    Doctor --> System
    Attack --> System`,
        },
      },
    ],
    markingGuide: `| Criterion | Marks |\n|---|---|\n| Valid legitimate use case | 1 |\n| Relevant misuse case linked to the system | 1 |\n| **Total** | **2** |`,
    points: 2,
  },
];