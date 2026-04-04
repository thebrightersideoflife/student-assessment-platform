// src/data/questions/ITSEA/week7.js
// Module: Software Process, Architecture, and Quality Assurance
// Week 7 Assessment — Dependability, Reliability Engineering & Legacy Maintenance
// Total Marks: 35

export default [

  // ── SECTION A SCENARIO ──────────────────────────────────────────────────────

  {
    id: "SCENARIO_ITSEA_W7_A",
    type: "scenario",
    title: "Question 1: Dependability and Reliability Engineering (20 Marks)",
    context: `The South African National Power Grid (SANPG) is implementing "Grid-Guardian" — a safety-critical and availability-critical sociotechnical system designed to manage real-time electricity distribution and fault detection.\n\nThe architecture must handle sensor data from thousands of substations. The government requires that the system remains operational even if specific hardware components fail or if the software encounters an erroneous state.`,
  },

  // ── QUESTION 1.1 ────────────────────────────────────────────────────────────

  {
    id: "ITSEA_W7_Q1_1A",
    type: "fill-in-the-blank",
    sectionLabel: "1.1 Part A",
    text: "According to the Randell (2000) Fault-Error-Failure model, a human programmer makes a mistake which introduces a system ___ into the code. If activated at runtime, this places the system into an incorrect state. If not handled, this manifests externally as a system ___.",
    blanks: [
      {
        id: "b1",
        options: ["fault", "vulnerability", "exception", "anomaly"],
        correctAnswer: "fault",
      },
      {
        id: "b2",
        options: ["failure", "crash", "interruption", "deviation"],
        correctAnswer: "failure",
      },
    ],
    points: 2,
  },

  {
    id: "ITSEA_W7_Q1_1B",
    type: "show-answer",
    sectionLabel: "1.1 Part B",
    text: "Using the Grid-Guardian scenario, provide a specific hypothetical example for each stage of the Fault → Error → Failure sequence.",
    correctAnswers: [
      "Human Error / Fault: A programmer incorrectly implements the load-shedding logic, failing to account for a negative integer input from a frequency sensor. The code contains a divide-by-zero bug triggered when sensor values drop below zero — this is the latent defect embedded in the software.\n\nSystem Error: During a live storm event, a damaged sensor glitches and transmits a value of -1. The system enters an erroneous internal state: the calculation service attempts to divide by this negative value, crashes, and the distribution controller now holds an invalid voltage threshold in memory.\n\nSystem Failure: Because the Grid-Guardian is in an erroneous state, it fails to deliver the 'Automated Trip' service. The protective shutdown command is never issued. A power surge propagates unchecked through the substation, resulting in physical transformer damage and a regional blackout.",
    ],
    markingGuide:
      "Award 1 mark for each stage correctly defined AND linked to a specific Grid-Guardian example (up to 3 marks, one per stage). Award 1 additional mark for an answer that clearly distinguishes between the Fault (the static bug in the code) and the Error (the incorrect runtime state triggered when the fault is activated) — this distinction is the key A+ differentiator.",
    points: 2,
  },

  // ── QUESTION 1.2 ────────────────────────────────────────────────────────────

  {
    id: "ITSEA_W7_Q1_2",
    type: "multiple-choice",
    sectionLabel: "1.2",
    text: "The Grid-Guardian team is considering Formal Methods for the core switching logic. Which of the following correctly pairs a genuine BENEFIT with a genuine LIMITATION of this approach?",
    options: [
      "Benefit: It guarantees 100% bug-free hardware components; Limitation: It is too inexpensive to be taken seriously in industry.",
      "Benefit: It forces a detailed mathematical analysis of requirements, reducing specification omissions; Limitation: It requires specialised mathematical expertise and is extremely time-consuming to apply.",
      "Benefit: It replaces the need for all subsequent software testing once a proof is completed; Limitation: It is prohibited from use on safety-critical systems by international standards.",
      "Benefit: It significantly accelerates the overall development lifecycle; Limitation: It cannot be applied to switching logic or real-time control systems.",
    ],
    correctAnswers: [
      "Benefit: It forces a detailed mathematical analysis of requirements, reducing specification omissions; Limitation: It requires specialised mathematical expertise and is extremely time-consuming to apply.",
    ],
    points: 4,
  },

  // ── QUESTION 1.3 ────────────────────────────────────────────────────────────

  {
    id: "ITSEA_W7_Q1_3A",
    type: "open-ended",
    sectionLabel: "1.3 Part A",
    text: "Between 'Protection Systems' and 'Self-Monitoring Architecture,' which is specifically designed to act as an independent, external layer that takes corrective action (such as tripping a circuit breaker) when it detects a hazard — even if the primary control system has failed?",
    correctAnswers: [
      "Protection System",
      "Protection Systems",
      "Protection system architecture",
    ],
    validationOptions: {
      caseSensitive: false,
      tolerance: 20,
    },
    points: 2,
  },

  {
    id: "ITSEA_W7_Q1_3B",
    type: "show-answer",
    sectionLabel: "1.3 Part B",
    text: "Compare Protection Systems and Self-Monitoring Architecture. Justify why Protection Systems are more appropriate for stopping a power surge in the Grid-Guardian scenario.",
    correctAnswers: [
      "Self-Monitoring Architecture includes internal redundancy — the system validates its own state using duplicate hardware channels (e.g., two processors cross-checking outputs). If one channel produces an anomalous result, the system detects the discrepancy and can initiate a controlled shutdown. However, this approach depends on the primary system itself remaining sufficiently operational to perform that self-check.\n\nProtection Systems are architecturally separate and physically independent from the main control software. They monitor the environment or physical process directly (e.g., measuring actual voltage and current at the substation level) and take corrective action — such as triggering a circuit breaker — autonomously, without relying on any signal from the Grid-Guardian software.\n\nRecommendation — Protection Systems: In a power surge scenario, the surge itself may corrupt or physically damage the primary Grid-Guardian controller hardware, rendering any self-monitoring logic inoperable at exactly the moment it is needed most. Because the Protection System is independent, it remains functional even if the main control software has crashed entirely. This independence is the defining requirement for a safety-critical system where the hazard (the surge) is also the likely cause of primary system failure.",
    ],
    markingGuide:
      "Award 1 mark for a correct description of Self-Monitoring Architecture (internal redundancy, cross-checking internal state). Award 1 mark for a correct description of Protection Systems (independent external monitor, acts on the physical process directly). Award 1 mark for the correct recommendation (Protection Systems). Award 3 marks for a technically sound justification that explains WHY independence matters — specifically that the surge event may compromise the primary controller, making self-monitoring unreliable at the critical moment.",
    points: 4,
  },

  // ── QUESTION 1.4 ────────────────────────────────────────────────────────────

  {
    id: "ITSEA_W7_Q1_4A_1",
    type: "open-ended",
    sectionLabel: "1.4 Part A — Continuous Monitor",
    text: "The Grid-Guardian distribution monitor runs 24/7 and must be available at all times. Which reliability metric (AVAIL or POFOD) is most appropriate for measuring the dependability of this continuously running sub-system?",
    correctAnswers: [
      "AVAIL",
      "Availability",
      "Availability (AVAIL)",
    ],
    validationOptions: {
      caseSensitive: false,
      tolerance: 10,
    },
    points: 1,
  },

  {
    id: "ITSEA_W7_Q1_4A_2",
    type: "open-ended",
    sectionLabel: "1.4 Part A — Emergency Shutdown",
    text: "The Grid-Guardian emergency shutdown sub-system only activates when a fault is detected. Which reliability metric (AVAIL or POFOD) is most appropriate for a sub-system that only runs on demand?",
    correctAnswers: [
      "POFOD",
      "Probability of Failure on Demand",
      "Probability of failure on demand (POFOD)",
    ],
    validationOptions: {
      caseSensitive: false,
      tolerance: 20,
    },
    points: 1,
  },

  {
    id: "ITSEA_W7_Q1_4B",
    type: "show-answer",
    sectionLabel: "1.4 Part B",
    text: "Explain the role of an Operational Profile in statistical testing. Then explain why statistical testing is difficult — and sometimes impractical — when ultra-high reliability is required for a system like Grid-Guardian.",
    correctAnswers: [
      "Role of an Operational Profile: An operational profile is a structured set of test data that represents the actual distribution of inputs and usage patterns the system will experience in the real world. Rather than testing all possible inputs equally, statistical testing uses the operational profile to generate test cases that are proportionally weighted — high-frequency operations (e.g., routine voltage readings every second) are tested far more extensively than rare edge cases (e.g., a simultaneous multi-substation fault). This ensures that the most commonly exercised code paths are the most thoroughly validated.\n\nDifficulty for ultra-high reliability: When a system specification requires ultra-high reliability — such as a POFOD of 0.001 or lower — the target failure rate is so rare that an enormous number of test executions are needed to observe even a single failure. For the Grid-Guardian emergency shutdown system, which may only be invoked during actual grid faults, simulating a statistically sufficient number of genuine demand events to mathematically confirm a failure probability of 1-in-1000 could require years of continuous testing. This makes statistical testing alone impractical for certifying ultra-high reliability, and is why formal methods or safety case arguments are used alongside testing for safety-critical systems.",
    ],
    markingGuide:
      "Award 2 marks for a correct explanation of the Operational Profile — must mention that it represents real-world input distributions/usage patterns (1 mark) and that test cases are weighted proportionally to how often operations occur in practice (1 mark). Award 2 marks for the difficulty argument — must identify that ultra-high reliability requires a statistically impractical number of test cases to observe rare failures (1 mark) and link this to the time or scale infeasibility for a system like Grid-Guardian (1 mark).",
    points: 4,
  },

  // ── SECTION B SCENARIO ──────────────────────────────────────────────────────

  {
    id: "SCENARIO_ITSEA_W7_B",
    type: "scenario",
    title: "Question 2: Legacy System Assessment and Maintenance (15 Marks)",
    context: `A major South African financial institution uses "BankCore-90," a 30-year-old system for processing mortgage applications. While the system is reliable, maintenance costs are skyrocketing. The bank's CTO must decide whether to re-engineer, replace, scrap, or continue maintaining the system.`,
  },

  // ── QUESTION 2.1 ────────────────────────────────────────────────────────────

  {
    id: "ITSEA_W7_Q2_1A",
    type: "multiple-choice",
    sectionLabel: "2.1 Part A",
    text: "The bank must assess the Business Value of BankCore-90. Which of the following sets contains ONLY valid Business Value factors — and no System Quality factors that have been incorrectly mixed in?",
    options: [
      "How frequently the system is used daily; whether the system's outputs feed other critical business processes; the system's failure rate over the past year.",
      "Whether core mortgage workflows depend entirely on the system; how often the system is used by staff; the degree to which the system supports regulatory compliance processes.",
      "The quality of the system's internal code documentation; whether the system is used daily; whether business processes would halt if the system were unavailable.",
      "The system's hardware failure rate; the number of active users; whether the outputs are used in downstream financial reporting.",
    ],
    correctAnswers: [
      "Whether core mortgage workflows depend entirely on the system; how often the system is used by staff; the degree to which the system supports regulatory compliance processes.",
    ],
    points: 3,
  },

  {
    id: "ITSEA_W7_Q2_1B",
    type: "multiple-choice",
    sectionLabel: "2.1 Part B",
    text: "The bank must also assess the System Quality of BankCore-90. Which of the following sets contains ONLY valid System Quality factors — and no Business Value factors that have been incorrectly mixed in?",
    options: [
      "The degree to which mortgage staff depend on the system daily; how well the codebase is documented; the current hardware failure rate.",
      "The system's failure rate and reliability history; the quality of internal code documentation; the integrity and consistency of the mortgage data stored.",
      "How many business processes the system supports; the complexity of the existing codebase; whether the system produces outputs used in other departments.",
      "The number of change requests submitted per quarter; the system's importance to core revenue streams; the age of the underlying hardware.",
    ],
    correctAnswers: [
      "The system's failure rate and reliability history; the quality of internal code documentation; the integrity and consistency of the mortgage data stored.",
    ],
    points: 3,
  },

  // ── QUESTION 2.2 ────────────────────────────────────────────────────────────

  {
    id: "ITSEA_W7_Q2_2A",
    type: "multiple-choice",
    sectionLabel: "2.2 Part A",
    text: "Updating BankCore-90 to comply with new 'Section 13' financial reporting regulations — where the system itself has not broken, but the external legal environment has changed — is an example of which maintenance type?",
    options: [
      "Corrective Maintenance",
      "Adaptive Maintenance",
      "Perfective Maintenance",
      "Preventive Maintenance",
    ],
    correctAnswers: ["Adaptive Maintenance"],
    points: 1,
  },

  {
    id: "ITSEA_W7_Q2_2B",
    type: "fill-in-the-blank",
    sectionLabel: "2.2 Part B",
    text: "Maintenance costs for BankCore-90 are high due to several compounding factors. When original developers leave the organisation, the team loses institutional knowledge — this is called team ___. The code is also hard to understand because of poor ___, meaning every change takes longer than it should. Running the original 30-year-old servers is far more expensive than modern infrastructure — this is an ageing ___ cost. Finally, ___ corruption occurs when every emergency fix introduces a new subtle bug, gradually degrading the system's structural integrity.",
    blanks: [
      {
        id: "b1",
        options: ["instability", "rotation", "exhaustion", "turnover"],
        correctAnswer: "instability",
      },
      {
        id: "b2",
        options: ["documentation", "versioning", "encapsulation", "abstraction"],
        correctAnswer: "documentation",
      },
      {
        id: "b3",
        options: ["hardware", "licensing", "procurement", "operational"],
        correctAnswer: "hardware",
      },
      {
        id: "b4",
        options: ["program", "database", "logic", "interface"],
        correctAnswer: "program",
      },
    ],
    points: 4,
  },

  // ── QUESTION 2.3 ────────────────────────────────────────────────────────────

  {
    id: "ITSEA_W7_Q2_3",
    type: "show-answer",
    sectionLabel: "2.3",
    text: "Discuss Software Diversity as a strategy for improving dependability. Why is it practically harder to achieve true diversity in software systems (e.g., N-version programming) than it is in hardware systems?",
    correctAnswers: [
      "Software Diversity (N-version programming): The concept involves commissioning multiple independent teams to implement the same functional specification using different programming languages, tools, and design approaches. The resulting versions run in parallel, and a voting mechanism selects the output that the majority of versions agree on. The goal is to ensure that a fault in one version is unlikely to exist in the others — so even if one version fails on a particular input, the others continue to produce correct outputs, preventing a common-mode failure.\n\nWhy true diversity is harder in software than hardware: In hardware, components from different manufacturers fail due to independent physical processes — material fatigue, thermal stress, electromagnetic interference — which are genuinely random and uncorrelated. Two resistors from different suppliers are extremely unlikely to fail at the same moment for the same physical reason.\n\nIn software, faults are not physical and random — they are logical. If different development teams all work from the same specification, and that specification contains an ambiguity or an error, all teams are likely to make the same logical mistake when interpreting it. For example, if the BankCore-90 specification ambiguously defines how to handle a mortgage application with a zero-valued asset, multiple independent teams may all implement the same flawed interpretation. This means diverse software versions can and do fail on exactly the same input conditions — undermining the entire premise of diversity. This is the 'common specification' problem, and it is the fundamental reason N-version programming is harder to guarantee than hardware redundancy.",
    ],
    markingGuide:
      "Award 2 marks for a correct explanation of Software Diversity / N-version programming — must describe multiple independent implementations (1 mark) and the goal of preventing common-mode failure through independent failure modes (1 mark). Award 2 marks for the difficulty argument — must identify that software faults are logical rather than physical/random (1 mark) and explain the common specification problem: teams working from the same flawed spec are likely to make the same logical errors, meaning diverse versions can still fail on the same inputs (1 mark).",
    points: 4,
  },
];