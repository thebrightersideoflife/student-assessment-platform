// File: src/data/questions/ITNSA/week7.js
// Topic: Endpoint Protection — Antivirus, Anti-Malware, HIPS, Real-Time Protection
// Total marks: 50

export default [

  // ─────────────────────────────────────────────
  // SECTION A: SCENARIO-BASED ANALYSIS
  // ─────────────────────────────────────────────

  {
    id: "SCENARIO_ITNSA_W7_Q1",
    type: "scenario",
    title: "Question 1: FinSecure Ltd Incident (15 Marks)",
    context: `A financial services company, FinSecure Ltd, has recently experienced unusual system behaviour across several employee workstations. Employees report that applications are being modified without authorisation, unknown processes are running in the background, and sensitive files appear to be accessed and altered.\n\nFurther investigation reveals that attackers are attempting to modify system-level files and registry entries to maintain persistence. Critically, the company's traditional antivirus software has not flagged any of these activities as threats.`,
  },

  // ── Q1.1 — show-answer (5 marks) ──
  {
    id: "ITNSA_W7_Q1_1",
    type: "show-answer",
    sectionLabel: "1.1",
    text: "Critically evaluate why the existing antivirus solution at FinSecure Ltd failed to detect the threat.",
    correctAnswers: [
      "The antivirus solution failed primarily due to its reliance on signature-based detection, which is ineffective against unknown or zero-day threats. The attacker's actions — modifying system files and registry entries — suggest the use of fileless or polymorphic malware that does not match any known virus signatures stored in the antivirus database. Additionally, traditional antivirus tools focus mainly on file scanning and do not monitor behavioural anomalies at the system level, such as unauthorised process execution or registry manipulation. The failure therefore stems from: (1) an inability to detect threats without a matching signature, (2) a lack of behavioural analysis capabilities, and (3) limited visibility into system-level changes such as registry and process activity."
    ],
    markingGuide: "Award 2 marks for clearly explaining the signature-based limitation and why it fails against unknown/zero-day threats. Award 1 mark for referencing fileless or polymorphic malware. Award 1 mark for identifying the lack of system-level monitoring (registry, processes). Award 1 mark for a clear, structured conclusion linking all points.",
    points: 5,
  },

  // ── Q1.2 — show-answer (6 marks) ──
  {
    id: "ITNSA_W7_Q1_2",
    type: "show-answer",
    sectionLabel: "1.2",
    text: "Explain how a Host-Based Intrusion Prevention System (HIPS) would detect and prevent the attack at FinSecure Ltd. Your answer must reference: behavioural analysis, system monitoring (files, registry, processes), and response mechanisms.",
    correctAnswers: [
      "A Host-Based Intrusion Prevention System (HIPS) would detect and prevent this attack through continuous behavioural analysis and granular system monitoring. HIPS monitors all system-level activity in real time, including file modifications, registry changes, and running processes — the exact vectors exploited in this attack. It maintains a baseline database of known-good system objects, each assigned a checksum. Any deviation from this baseline — such as an unauthorised file modification — immediately triggers an alert. Behavioural analysis allows HIPS to identify suspicious patterns even when no matching signature exists, for example detecting that a process is attempting to write to protected registry keys or spawn unexpected child processes. Upon detection, HIPS responds by blocking the malicious action in real time, alerting the system administrator, and logging the event for forensic review. This prevents the attacker from establishing or maintaining persistence."
    ],
    markingGuide: "Award 2 marks for explaining system monitoring (files, registry, processes) with reference to the scenario. Award 2 marks for explaining behavioural analysis and how it identifies threats without signatures. Award 1 mark for referencing the baseline/checksum mechanism. Award 1 mark for describing the response mechanism (blocking, alerting, logging).",
    points: 6,
  },

  // ── Q1.3 — show-answer (4 marks) ──
  {
    id: "ITNSA_W7_Q1_3",
    type: "show-answer",
    sectionLabel: "1.3",
    text: "Differentiate between antivirus and anti-malware in the context of the FinSecure Ltd scenario, and justify which would provide broader protection.",
    correctAnswers: [
      "Antivirus software is designed primarily to detect and remove known threats — mainly viruses — using signature-based detection. It compares files against a database of known malicious signatures and blocks matches. Anti-malware, by contrast, provides broader protection against a wider range of malicious software, including spyware, Trojans, rootkits, ransomware, and advanced persistent threats. It often incorporates heuristic analysis and behavioural detection in addition to signature matching. In the FinSecure Ltd scenario, anti-malware provides more comprehensive protection because the threat involves unknown, system-level behavioural attacks that bypass signature-based detection entirely. Anti-malware's broader detection techniques — including heuristics — make it better equipped to identify and contain the type of fileless or polymorphic attack described."
    ],
    markingGuide: "Award 2 marks for a clear, accurate distinction between antivirus (signature, known threats) and anti-malware (broader scope, heuristics, advanced threats). Award 1 mark for explaining the broader scope of anti-malware. Award 1 mark for a justified recommendation tied directly to the scenario context.",
    points: 4,
  },

  // ─────────────────────────────────────────────
  // SECTION B: APPLIED SECURITY DESIGN
  // ─────────────────────────────────────────────

  {
    id: "SCENARIO_ITNSA_W7_Q2",
    type: "scenario",
    title: "Question 2: DataCore Systems — Endpoint Security Strategy (15 Marks)",
    context: `A multinational company, DataCore Systems, is implementing a new endpoint security strategy following a ransomware incident that spread through employee laptops. The IT department must design a layered endpoint protection approach to prevent: unknown (zero-day) threats, unauthorised system changes, and malware propagation across endpoints.\n\nThe approved technologies are limited to: Antivirus, Anti-malware, and HIPS.`,
  },

  // ── Q2.1 — show-answer (9 marks) ──
  {
    id: "ITNSA_W7_Q2_1",
    type: "show-answer",
    sectionLabel: "2.1",
    text: "Propose a multi-layered endpoint security solution for DataCore Systems using ONLY the following technologies: HIPS, Antivirus, and Anti-malware. Explain how each layer contributes to the overall protection strategy.",
    correctAnswers: [
      "A layered endpoint security model for DataCore Systems should be designed as follows:\n\n1. Antivirus Layer — The first layer provides real-time protection against known threats through signature-based detection. It scans incoming files and processes against a continuously updated signature database, preventing common malware infections before they can execute. This layer addresses the most common, well-documented threat vectors.\n\n2. Anti-malware Layer — The second layer extends protection to a broader range of threats, including spyware, Trojans, rootkits, and ransomware variants. Anti-malware performs deep scanning and can identify and remove threats that evade traditional antivirus detection through heuristic and behavioural analysis. It directly addresses the ransomware risk DataCore faces.\n\n3. HIPS Layer — The third and most advanced layer acts as the behavioural enforcement mechanism. HIPS monitors all system activity in real time, detects zero-day attacks through behavioural analysis, blocks unauthorised system changes, and prevents exploitation attempts. It catches what the first two layers miss.\n\nThis layered approach implements 'defence-in-depth': antivirus prevents known threats, anti-malware detects and removes advanced malware, and HIPS enforces behavioural control — together eliminating single points of failure in the security posture."
    ],
    markingGuide: "Award 3 marks for the antivirus layer: role described (signature detection, known threats, real-time scanning). Award 3 marks for the anti-malware layer: broader scope, heuristics, ransomware relevance. Award 3 marks for the HIPS layer: zero-day detection, behavioural analysis, system-level enforcement. Full marks require a defence-in-depth conclusion showing how the layers work together.",
    points: 9,
  },

  // ── Q2.2 — multiple-choice (3 marks) ──
  {
    id: "ITNSA_W7_Q2_2",
    type: "multiple-choice",
    sectionLabel: "2.2",
    text: "DataCore Systems' ransomware spread across endpoints before the security team was alerted. Which statement BEST explains why real-time protection is critical in preventing this outcome?",
    options: [
      "Real-time protection generates detailed forensic logs for post-incident analysis",
      "Real-time protection detects and responds to threats at the point of execution, before they can spread laterally",
      "Real-time protection ensures all endpoint software is kept up to date automatically",
      "Real-time protection restricts users from installing unauthorised applications"
    ],
    correctAnswers: ["Real-time protection detects and responds to threats at the point of execution, before they can spread laterally"],
    points: 3,
  },

  // ── Q2.3 — open-ended (3 marks) ──
  {
    id: "ITNSA_W7_Q2_3",
    type: "open-ended",
    sectionLabel: "2.3",
    text: "Explain how endpoint threat mitigation strategies reduce organisational risk beyond just detecting threats.",
    correctAnswers: [
      "Endpoint threat mitigation reduces risk by preventing attacks before they execute, containing damage through isolation and blocking, and ensuring system integrity by preventing unauthorised changes — transforming security from reactive to proactive.",
      "Mitigation goes beyond detection by actively blocking threats, limiting lateral spread, and preserving system integrity to reduce both the likelihood and the impact of a successful attack.",
      "Threat mitigation prevents execution of attacks, contains compromised endpoints to stop propagation, and enforces system integrity — reducing both probability and impact of incidents."
    ],
    validationOptions: {
      caseSensitive: false,
      requiredTerms: ["prevent", "contain"],
      allowPartialMatch: true
    },
    points: 3,
  },

  // ─────────────────────────────────────────────
  // SECTION C: CRITICAL THINKING & APPLICATION
  // ─────────────────────────────────────────────

  {
    id: "SCENARIO_ITNSA_W7_Q3",
    type: "scenario",
    title: "Question 3: Zero-Day Malware Analysis (10 Marks)",
    context: `An attacker deploys malware that does not match any known virus signature. The malware alters system files gradually, mimics legitimate processes, and attempts to disable logging mechanisms. Traditional antivirus software has not raised any alerts.`,
  },

  // ── Q3.1 — fill-in-the-blank (4 marks, auto-calculated) ──
  {
    id: "ITNSA_W7_Q3_1",
    type: "fill-in-the-blank",
    sectionLabel: "3.1",
    text: "Signature-based detection fails against this malware because it relies on matching files against a database of ___ threats. Since the malware has no existing entry, it produces no ___, allowing it to execute without triggering any ___. This makes signature-based detection insufficient against ___ or polymorphic attacks.",
    blanks: [
      {
        id: "b1",
        options: ["latent", "known", "heuristic", "zero-day"],
        correctAnswer: "known",
      },
      {
        id: "b2",
        options: ["hash collision", "buffer overflow", "signature match", "false positive"],
        correctAnswer: "signature match",
      },
      {
        id: "b3",
        options: ["quarantine actions", "alerts", "updates", "audit trails"],
        correctAnswer: "alerts",
      },
      {
        id: "b4",
        options: ["brute-force", "insider", "zero-day", "persistent"],
        correctAnswer: "zero-day",
      },
    ],
    points: 4,
  },

  // ── Q3.2 — show-answer (6 marks) ──
  {
    id: "ITNSA_W7_Q3_2",
    type: "show-answer",
    sectionLabel: "3.2",
    text: "Discuss how HIPS uses system object tracking and checksums to identify the type of malware described in this scenario.",
    correctAnswers: [
      "HIPS detects this threat through a combination of system object tracking and checksum verification. When HIPS is initialised, it scans all protected system objects — including critical files, executables, and registry entries — and generates a unique checksum for each. These checksums are stored in a secure baseline database that represents the known-good state of the system. When the malware begins to alter system files gradually, HIPS continuously re-checks the current checksum of each monitored object against the stored baseline. Any inconsistency — such as a changed checksum on a system file — is immediately flagged as a potential intrusion, even if the malware has no known signature. Additionally, HIPS monitors process behaviour: if a process mimics a legitimate application but attempts to write to protected registry keys, spawn unexpected child processes, or disable logging mechanisms, the behavioural anomaly triggers an alert and a blocking action. This two-pronged approach — file integrity via checksums and behavioural analysis of running processes — allows HIPS to detect this malware despite its zero-day nature."
    ],
    markingGuide: "Award 2 marks for accurately explaining the checksum concept (each object gets a unique hash stored at baseline). Award 1 mark for describing the baseline database and its role as a reference point. Award 2 marks for explaining the detection process (comparing current checksums to baseline, identifying inconsistencies). Award 1 mark for describing the response action (alert, block) and linking it to the specific malware behaviour in the scenario.",
    diagram: {
      type: "mermaid",
      code: `flowchart TD
  A[System Initialisation] --> B[HIPS scans all protected objects]
  B --> C[Generates checksum per object]
  C --> D[Stores checksums in Baseline Database]
  D --> E[Continuous Monitoring Loop]
  E --> F{Checksum changed?}
  F -- No --> E
  F -- Yes --> G[Inconsistency Detected]
  G --> H[Compare against Baseline]
  H --> I[Behavioural Analysis of Process]
  I --> J[Alert Administrator]
  I --> K[Block Malicious Action]
  I --> L[Log Event for Forensics]`,
    },
    points: 6,
  },

  // ─────────────────────────────────────────────
  // SECTION D: STRUCTURAL / DIAGRAMMATIC QUESTION
  // ─────────────────────────────────────────────

  {
    id: "SCENARIO_ITNSA_W7_Q4",
    type: "scenario",
    title: "Question 4: Endpoint Protection Interaction Model (10 Marks)",
    context: `A cybersecurity analyst at a large organisation is tasked with documenting how different endpoint protection mechanisms interact during an attack lifecycle. The components to be represented are: User/System Activity, HIPS, Antivirus, Anti-malware, and Threat Detection and Response.`,
  },

  // ── Q4.1 — show-answer with Mermaid diagram (10 marks) ──
  {
    id: "ITNSA_W7_Q4_1",
    type: "show-answer",
    sectionLabel: "4.1",
    text: "Design a conceptual model showing how the following endpoint protection components interact during an attack lifecycle: User/System Activity, HIPS, Antivirus, Anti-malware, and Threat Detection and Response. Your answer must clearly show the flow and relationships between all components.",
    correctAnswers: [
      "The conceptual model shows User/System Activity as the starting point — all endpoint actions originate here. These activities are simultaneously monitored by three parallel protection layers: Antivirus (which scans for known signature matches), Anti-malware (which performs heuristic and deep scanning for advanced threats), and HIPS (which conducts real-time behavioural analysis and system object monitoring). Each layer feeds its findings into a central Threat Detection and Response hub. When a threat is confirmed, the response mechanism executes three actions: Block (preventing the threat from executing), Alert (notifying the administrator), and Remove/Quarantine (isolating or eliminating the threat). This architecture ensures that no single point of failure exists — a threat that bypasses Antivirus is caught by Anti-malware or HIPS before reaching the Response stage."
    ],
    markingGuide: "Award 3 marks for including all five required components correctly labelled. Award 3 marks for a logical, directional flow from User Activity through the protection layers to the response mechanism. Award 2 marks for clearly showing the relationships between components (parallel monitoring converging to a central response). Award 2 marks for correct and valid Mermaid syntax that renders without errors.",
    diagram: {
      type: "mermaid",
      code: `flowchart TD
  A[👤 User / System Activity] --> B[Antivirus]
  A --> C[Anti-Malware]
  A --> D[HIPS]
  B --> E{Known Threat Signature?}
  C --> F{Advanced / Heuristic Match?}
  D --> G{Behavioural Anomaly?}
  E -- Yes --> H[Threat Detection & Response]
  E -- No --> I[Pass — No Action]
  F -- Yes --> H
  F -- No --> I
  G -- Yes --> H
  G -- No --> I
  H --> J[🚫 Block Execution]
  H --> K[🔔 Alert Administrator]
  H --> L[🗑️ Remove / Quarantine Threat]`,
    },
    points: 10,
  },

  // ─────────────────────────────────────────────
  // BONUS: MIXED MCQ / SHORT-ANSWER BANK
  // (Reinforcement questions for in-week practice)
  // ─────────────────────────────────────────────

  {
    id: "SCENARIO_ITNSA_W7_PRACTICE",
    type: "scenario",
    title: "Practice Questions: Endpoint Protection Concepts",
    context: `The following questions test your understanding of the core endpoint protection concepts covered in this week's material. These questions are drawn from the examination content and are designed to reinforce precision in terminology and application.`,
  },

  // MCQ 1
  {
    id: "ITNSA_W7_P1",
    type: "multiple-choice",
    text: "A malware strain modifies registry keys and mimics legitimate system processes, but the installed antivirus raises no alerts. Which is the MOST likely reason for this failure?",
    options: [
      "The antivirus software is not licensed for registry monitoring",
      "The antivirus relies primarily on signature-based detection and has no matching signature for this threat",
      "The antivirus cannot scan files that are currently in use by the operating system",
      "The antivirus only monitors inbound network traffic and not local processes"
    ],
    correctAnswers: ["The antivirus relies primarily on signature-based detection and has no matching signature for this threat"],
    points: 2,
  },

  // MCQ 2
  {
    id: "ITNSA_W7_P2",
    type: "multiple-choice",
    text: "Which endpoint security component is BEST suited to detecting a zero-day attack that alters system files without matching any known malware signature?",
    options: [
      "Antivirus with real-time scanning",
      "A firewall with deep packet inspection",
      "A Host-Based Intrusion Prevention System (HIPS)",
      "An email filtering gateway"
    ],
    correctAnswers: ["A Host-Based Intrusion Prevention System (HIPS)"],
    points: 2,
  },

  // Open-ended 1
  {
    id: "ITNSA_W7_P3",
    type: "open-ended",
    text: "What term describes the stored reference point of known-good system object states that HIPS uses to detect file integrity violations?",
    correctAnswers: ["baseline", "baseline database", "secure baseline"],
    validationOptions: {
      caseSensitive: false,
      tolerance: 10,
      allowPartialMatch: true
    },
    points: 2,
  },

  // Open-ended 2
  {
    id: "ITNSA_W7_P4",
    type: "open-ended",
    text: "What cryptographic value does HIPS generate for each monitored system object to detect unauthorised modifications?",
    correctAnswers: ["checksum", "hash", "checksum value", "hash value"],
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
      allowPartialMatch: true
    },
    points: 2,
  },

  // Fill-in-the-blank — layered defence chain
  {
    id: "ITNSA_W7_P5",
    type: "fill-in-the-blank",
    text: "A layered endpoint security model uses ___ to detect known threats via signature matching, ___ to identify and remove advanced and broader malware categories, and ___ to monitor behavioural anomalies and enforce system integrity.",
    blanks: [
      {
        id: "b1",
        options: ["Endpoint Detection and Response", "Antivirus", "Heuristic Analysis", "Intrusion Prevention"],
        correctAnswer: "Antivirus",
      },
      {
        id: "b2",
        options: ["Data Loss Prevention", "File Integrity Monitoring", "Anti-malware", "Application Whitelisting"],
        correctAnswer: "Anti-malware",
      },
      {
        id: "b3",
        options: ["HIPS", "Sandboxing", "Stateless Firewall", "Network Access Control"],
        correctAnswer: "HIPS",
      },
    ],
    points: 3,
  },

  // Fill-in-the-blank — attack detection chain
  {
    id: "ITNSA_W7_P6",
    type: "fill-in-the-blank",
    text: "During an attack, HIPS first establishes a ___ of normal system behaviour. When a file is modified, the object's ___ changes. HIPS compares this against the stored value and, if inconsistent, triggers a ___ action to stop the malicious activity.",
    blanks: [
      {
        id: "b1",
        options: ["Heuristic Profile", "Baseline", "Anomaly Threshold", "Audit Log"],
        correctAnswer: "Baseline",
      },
      {
        id: "b2",
        options: ["Metadata Tag", "Entropy Score", "Checksum", "Attribute Flag"],
        correctAnswer: "Checksum",
      },
      {
        id: "b3",
        options: ["Quarantine", "Reporting", "Blocking", "Rollback"],
        correctAnswer: "Blocking",
      },
    ],
    points: 3,
  },

];