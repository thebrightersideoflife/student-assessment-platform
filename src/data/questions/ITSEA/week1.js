// src/data/questions/ITSEA/week1.js
//
// ITSEA — Software Engineering
// Week 1 Assessment: Software Engineering Foundations
//
// Total: 35 marks (+ 5 bonus)
//
// Structure:
//   Question 1: National Smart Infrastructure System (25 marks)
//     1.1  The Need for Software Engineering        (3 marks)
//     1.2  The Abstract Nature of Software          (4 marks)
//     1.3  System Challenges                        (4 marks)
//     1.4  Fundamental Activities                   (8 marks)
//     1.5  Engineering Approaches                   (3 marks)
//     1.6  Ethical Responsibilities                 (3 marks)
//   Question 2: Software Diversity & System Design  (10 marks)
//     2.1  System Classification                    (8 marks)
//     2.2  Heterogeneity                            (2 marks)
//   Question 3: Bonus                               (5 marks)
//     3.1  Generic vs Customised Software           (5 marks)
//
// Question type key:
//   scenario        — context block, no answer, not graded
//   multiple-choice — auto-graded on selection
//   open-ended      — student types answer, validated by answerValidator
//   fill-in-the-blank — inline blanks with word bank
//   show-answer     — student reads prompt, reveals model memo to self-grade

export default [

  // ════════════════════════════════════════════════════════════════
  // QUESTION 1 — National Smart Infrastructure System (25 Marks)
  // ════════════════════════════════════════════════════════════════

  {
    id: "ITSEA_W1_SCENARIO1",
    type: "scenario",
    title: "Question 1: National Smart Infrastructure System (25 Marks)",
    context:
      "A government is planning to develop a National Smart Infrastructure Monitoring System. " +
      "The system will collect real-time data from sensors embedded in roads, bridges, and public utilities " +
      "(e.g., electricity and water systems). It will analyse data to detect faults, predict failures, and " +
      "support maintenance decisions. The system must operate across multiple regions, integrate with existing " +
      "legacy systems, and support future expansion.\n\n" +
      "The system will:\n" +
      "• Collect data from distributed sensors (data collection system)\n" +
      "• Process and analyse large volumes of data (data analysis system)\n" +
      "• Provide dashboards for engineers and decision-makers (information system)\n" +
      "• Operate continuously in harsh environmental conditions\n\n" +
      "The government is concerned about system reliability, scalability, and long-term maintenance costs.",
  },

  // ── 1.1 The Need for Software Engineering (3 Marks) ─────────────

  {
    id: "ITSEA_W1_Q1",
    type: "multiple-choice",
    sectionLabel: "1.1",
    text: "Why is ad hoc programming highly unsuitable for the National Smart Infrastructure System?",
    options: [
      "It requires too many developers to write the initial code.",
      "It focuses too heavily on long-term evolution rather than immediate deployment.",
      "It lacks the structured methods needed to manage the scale, complexity, and reliability of a critical system.",
      "It is only suitable for embedded systems, not data analytics dashboards.",
    ],
    correctAnswers: [
      "It lacks the structured methods needed to manage the scale, complexity, and reliability of a critical system.",
    ],
    points: 2,
  },

  {
    id: "ITSEA_W1_Q2",
    type: "show-answer",
    sectionLabel: "1.1",
    text: "Beyond preventing failure, explain how utilizing formal software engineering principles impacts the long-term financial and operational lifecycle of this government system. (2 marks)",
    correctAnswers: [
      "Utilizing formal software engineering provides structured methods and processes that ensure the system is systematically developed to meet requirements. This makes the system reliable and maintainable over time, significantly reducing long-term costs and allowing it to safely evolve as infrastructure expands.",
    ],
    markingGuide:
      "Award 1 mark for discussing how structured methods improve maintainability / reduce long-term costs. " +
      "Award 1 mark for discussing how it allows the system to systematically scale / evolve.",
    points: 2,
  },

  // ── 1.2 The Abstract Nature of Software (4 Marks) ───────────────

  {
    id: "ITSEA_W1_Q3",
    type: "fill-in-the-blank",
    sectionLabel: "1.2",
    text: "The abstract nature of software means it is not constrained by physical materials, providing the primary benefit of high ___ [Blank 1]. However, this lack of physical limits frequently leads to extreme ___ [Blank 2], making large systems difficult to understand.",
    blanks: [
      {
        id: "b1",
        options: ["adaptability", "versatility", "flexibility", "portability"],
        correctAnswer: "flexibility",
      },
      {
        id: "b2",
        options: ["interdependence", "complexity", "opacity", "redundancy"],
        correctAnswer: "complexity",
      },
    ],
    points: 2,
  },

  {
    id: "ITSEA_W1_Q4",
    type: "show-answer",
    sectionLabel: "1.2",
    text: "Explain how the extreme complexity of abstract software specifically complicates the maintenance phase of the National Smart Infrastructure System. (2 marks)",
    correctAnswers: [
      "Because software has no physical limits, it can grow extremely complex, making it difficult to understand and manage. As the infrastructure system scales, this complexity means that making changes or updates to the software becomes highly costly and error-prone.",
    ],
    markingGuide:
      "Award 1 mark for explaining the difficulty in understanding / managing abstract complexity. " +
      "Award 1 mark for stating that changes become costly and error-prone over time.",
    points: 2,
  },

  // ── 1.3 System Challenges (4 Marks) ─────────────────────────────

  {
    id: "ITSEA_W1_Q5",
    type: "open-ended",
    sectionLabel: "1.3",
    text: "The system must integrate legacy systems, new sensors, and various regional databases. What specific software engineering challenge does this represent?",
    correctAnswers: ["Heterogeneity", "heterogeneity"],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
  },

  {
    id: "ITSEA_W1_Q6",
    type: "open-ended",
    sectionLabel: "1.3",
    text: "The system handles massive volumes of continuous data across a whole nation. What specific software engineering challenge does this represent?",
    correctAnswers: ["Scale", "scale", "Scalability", "scalability"],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
  },

  {
    id: "ITSEA_W1_Q7",
    type: "show-answer",
    sectionLabel: "1.3",
    text: "Identify one other syllabus challenge (e.g., Security/Trust or Business/Social Change) and explain exactly how it manifests in this government infrastructure scenario. (2 marks)",
    correctAnswers: [
      "Security and trust: The system collects sensitive national infrastructure data that must be strictly protected from misuse, hacking, or unauthorized access to prevent national security risks.\n\nOR\n\nBusiness/social change: The system must be able to adapt to evolving government infrastructure policies, regulations, or changes in public utility management.",
    ],
    markingGuide:
      "Award 1 mark for correctly identifying the challenge. " +
      "Award 1 mark for applying it correctly to the scenario context.",
    points: 2,
  },

  // ── 1.4 Fundamental Activities (8 Marks) ────────────────────────

  {
    id: "ITSEA_W1_Q8",
    type: "fill-in-the-blank",
    sectionLabel: "1.4",
    text: "Match the four fundamental software process activities to their scenario application:\n\n" +
      "1. Defining the data collection and analytics requirements: Software ___ [Blank 1]\n" +
      "2. Designing and implementing the sensor integration: Software ___ [Blank 2]\n" +
      "3. Testing the system for real-time accuracy and reliability: Software ___ [Blank 3]\n" +
      "4. Updating the system as new public utilities are added: Software ___ [Blank 4]",
    blanks: [
      {
        id: "b1",
        options: ["Development", "Validation", "Specification", "Evolution"],
        correctAnswer: "Specification",
      },
      {
        id: "b2",
        options: ["Specification", "Validation", "Development", "Evolution"],
        correctAnswer: "Development",
      },
      {
        id: "b3",
        options: ["Evolution", "Validation", "Development", "Specification"],
        correctAnswer: "Validation",
      },
      {
        id: "b4",
        options: ["Development", "Evolution", "Specification", "Validation"],
        correctAnswer: "Evolution",
      },
    ],
    points: 4,
  },

  {
    id: "ITSEA_W1_Q9",
    type: "show-answer",
    sectionLabel: "1.4",
    text: "Choose any two of the four fundamental activities. Analyse in detail why executing those two phases poorly would cause catastrophic failure for the National Smart Infrastructure System. (4 marks)",
    correctAnswers: [
      "Software Specification: Poor specification means the wrong data is collected or analytics needs aren't met, rendering the system useless to engineers.\n\n" +
      "Software Development: Poor design/implementation means sensors fail to integrate properly with dashboards, leading to system crashes or data loss.\n\n" +
      "Software Validation: Inadequate testing means the system might report inaccurate data or fail under real-time conditions, causing critical bridge or road faults to be missed.\n\n" +
      "Software Evolution: Failure to plan for evolution means the system cannot integrate future legacy systems or expand to new regions, making it quickly obsolete.",
    ],
    markingGuide:
      "Award 2 marks per activity chosen (any two): " +
      "1 mark for identifying the consequence of poor execution, " +
      "1 mark for linking it specifically to the scenario.",
    points: 4,
  },

  // ── 1.5 Engineering Approaches (3 Marks) ────────────────────────

  {
    id: "ITSEA_W1_Q10",
    type: "multiple-choice",
    sectionLabel: "1.5",
    text: "Which of the following best describes why different components of this system require different engineering approaches?",
    options: [
      "Different teams prefer using different programming languages.",
      "Sensor systems are constrained by real-time hardware environments, whereas dashboards require user-centric usability design.",
      "The government mandated that multiple vendors must be used for different system parts.",
      "Legacy systems can only be integrated using ad hoc programming.",
    ],
    correctAnswers: [
      "Sensor systems are constrained by real-time hardware environments, whereas dashboards require user-centric usability design.",
    ],
    points: 2,
  },

  {
    id: "ITSEA_W1_Q11",
    type: "show-answer",
    sectionLabel: "1.5",
    text: "Formulate a rule explaining why a \"one-size-fits-all\" software engineering method is a myth, using the analytics dashboard versus the embedded road sensors as your primary example. (2 marks)",
    correctAnswers: [
      "No universal method exists because different software types have vastly different constraints and requirements. Embedded road sensors require real-time system techniques tailored to hardware, whereas the analytics dashboard requires user interface design and scalable data-processing approaches. One method cannot accommodate both sets of needs.",
    ],
    markingGuide:
      "Award 1 mark for stating that requirements/constraints dictate the method. " +
      "Award 1 mark for correctly contrasting the sensor needs with the dashboard needs.",
    points: 2,
  },

  // ── 1.6 Ethical Responsibilities (3 Marks) ──────────────────────

  {
    id: "ITSEA_W1_Q12",
    type: "open-ended",
    sectionLabel: "1.6",
    text: "An engineer discovers a vulnerability in the public utilities data feed but hides it to ensure the project launches on time. Which core ethical responsibility has been violated?",
    correctAnswers: ["Integrity", "integrity"],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
  },

  {
    id: "ITSEA_W1_Q13",
    type: "show-answer",
    sectionLabel: "1.6",
    text: "The system collects sensitive national infrastructure data. Identify two other ethical responsibilities engineers must uphold and explain their importance in protecting this data. (2 marks)",
    correctAnswers: [
      "Confidentiality: Engineers must ensure sensitive infrastructure data is strictly protected from unauthorized access, misuse, or security threats.\n\n" +
      "Competence: Engineers must ensure they actually possess the necessary skills and knowledge to build such a critical, large-scale, and reliable system safely.",
    ],
    markingGuide:
      "Award 1 mark for each ethical principle correctly identified and explained within the context of the scenario. Maximum 2 marks.",
    points: 2,
  },

  // ════════════════════════════════════════════════════════════════
  // QUESTION 2 — Software Diversity & System Design (10 Marks)
  // ════════════════════════════════════════════════════════════════

  {
    id: "ITSEA_W1_SCENARIO2",
    type: "scenario",
    title: "Question 2: Software Diversity & System Design (10 Marks)",
    context:
      "A company is developing a Smart Health Monitoring Ecosystem consisting of:\n" +
      "• A wearable device that tracks heart rate and activity\n" +
      "• A mobile application for users to view health data\n" +
      "• A cloud-based platform for doctors to analyse patient data\n" +
      "• A batch processing system for generating monthly health reports",
  },

  // ── 2.1 System Classification (8 Marks) ─────────────────────────

  {
    id: "ITSEA_W1_Q14",
    type: "fill-in-the-blank",
    sectionLabel: "2.1",
    text: "Classify the software system types present in the Smart Health Ecosystem:\n\n" +
      "1. The wearable device tracking heart rate: ___ [Blank 1]\n" +
      "2. The mobile application for users: ___ [Blank 2]\n" +
      "3. The cloud platform accessed by doctors: ___ [Blank 3]\n" +
      "4. The monthly health report generator: ___ [Blank 4]",
    blanks: [
      {
        id: "b1",
        options: [
          "Embedded system",
          "Interactive transaction system",
          "Stand-alone application",
          "Batch processing system",
        ],
        correctAnswer: "Embedded system",
      },
      {
        id: "b2",
        options: [
          "Stand-alone application",
          "Mobile client",
          "Interactive transaction-based system",
          "Embedded system",
        ],
        correctAnswer: "Stand-alone application",
      },
      {
        id: "b3",
        options: [
          "Interactive transaction-based system",
          "Data analytics batch",
          "Message broker",
          "Stand-alone application",
        ],
        correctAnswer: "Interactive transaction-based system",
      },
      {
        id: "b4",
        options: [
          "Batch processing system",
          "Interactive transaction-based system",
          "Scheduled analytics",
          "Real-time stream processor",
        ],
        correctAnswer: "Batch processing system",
      },
    ],
    points: 4,
  },

  {
    id: "ITSEA_W1_Q15",
    type: "show-answer",
    sectionLabel: "2.1",
    text: "Select any two of the systems you classified above. Justify your classification based on how each system interacts with users, hardware, or data. (4 marks)",
    correctAnswers: [
      "Embedded system (Wearable): Embedded within hardware to directly control and read physical hardware sensors.\n\n" +
      "Stand-alone application (Mobile app): Runs locally on a personal device for an individual user to view their own data.\n\n" +
      "Interactive transaction-based system (Cloud platform): Accessed remotely by multiple users (doctors) simultaneously to query and analyse patient databases.\n\n" +
      "Batch processing system (Monthly reports): Processes large amounts of collected data at a scheduled time rather than in real-time.",
    ],
    markingGuide:
      "Award 2 marks per system chosen (any two): " +
      "1 mark for correct identification, 1 mark for a valid justification linked to how it interacts with users, hardware, or data.",
    points: 4,
  },

  // ── 2.2 Heterogeneity (2 Marks) ─────────────────────────────────

  {
    id: "ITSEA_W1_Q16",
    type: "open-ended",
    sectionLabel: "2.2",
    text: "What term describes the ecosystem's characteristic of needing to operate across vastly different devices, platforms, and networks?",
    correctAnswers: ["Heterogeneity", "heterogeneity"],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
  },

  {
    id: "ITSEA_W1_Q17",
    type: "show-answer",
    sectionLabel: "2.2",
    text: "How does heterogeneity complicate the design phase of the Smart Health Ecosystem? (1 mark)",
    correctAnswers: [
      "Heterogeneity makes design and integration complex because it requires developers to build specific interoperability and compatibility solutions so the different devices and platforms can communicate with each other.",
    ],
    markingGuide:
      "Award 1 mark for explaining the impact on integration / compatibility across different devices and platforms.",
    points: 1,
  },

  // ════════════════════════════════════════════════════════════════
  // QUESTION 3 — Bonus: Professional Software Development (5 Marks)
  // ════════════════════════════════════════════════════════════════

  {
    id: "ITSEA_W1_SCENARIO3",
    type: "scenario",
    title: "Question 3: Professional Software Development — Bonus (5 Marks)",
    context:
      "A startup is developing a generic fitness app for global users, while also offering " +
      "customised versions for corporate clients.",
  },

  // ── 3.1 Generic vs Customised Software (5 Marks) ────────────────

  {
    id: "ITSEA_W1_Q18",
    type: "multiple-choice",
    sectionLabel: "3.1",
    text: "Regarding development control and requirements, which statement correctly contrasts the generic fitness app with the customised corporate versions?",
    options: [
      "The developers control the specifications for the generic app, while the corporate clients control the specifications for the customised versions.",
      "The end-users dictate requirements for both systems, but developers control the budget for the generic app.",
      "Customised software is driven by general market trends, while generic software is driven by strict client contracts.",
      "The developers control the requirements for the customised app, while focus groups control the generic app.",
    ],
    correctAnswers: [
      "The developers control the specifications for the generic app, while the corporate clients control the specifications for the customised versions.",
    ],
    points: 2,
  },

  {
    id: "ITSEA_W1_Q19",
    type: "show-answer",
    sectionLabel: "3.1",
    text: "Based on who controls the specifications, analyse how the long-term evolution (future updates and changes) will differ between the generic global app and the customised corporate apps. (3 marks)",
    correctAnswers: [
      "Generic App Evolution: Because developers control the specifications, long-term evolution is driven by broad market demand, general user feedback, and the developer's strategic vision.\n\n" +
      "Customised App Evolution: Because corporate clients control the requirements, long-term evolution is strictly driven by changing client needs, specific business requests, and individual corporate contracts.",
    ],
    markingGuide:
      "Award 1.5 marks for accurately describing the evolution trigger for the generic app. " +
      "Award 1.5 marks for accurately describing the evolution trigger for the customised app.",
    points: 3,
  },

];