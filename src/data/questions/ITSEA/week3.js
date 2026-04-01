// src/data/questions/ITSEA/week2.js
//
// ITSEA — Software Engineering
// Week 3 Assessment: Requirements Engineering & System Modeling
//
// Total: 40 Marks
//
// Structure:
//   Question 1: National Emergency Response System — NERS (25 marks)
//     1.1  Functional vs Non-Functional Requirements   (6 marks)
//     1.2  Elicitation Process & Challenges            (6 marks)
//     1.3  Elicitation Techniques                      (5 marks)
//     1.4  Requirements Validation                     (5 marks)
//     1.5  Requirements Change & Management            (6 marks)
//   Question 2: Smart Healthcare Monitoring System     (15 marks)
//     2.1  System Perspectives                         (8 marks)
//     2.2  Use Case Diagram                            (5 marks)
//     2.3  Sequence Diagram                            (5 marks)
//     2.4  Data-driven vs Event-driven                 (4 marks) — wait, total = 22, adjusted below
//
// NOTE on points: normalizePoints() caps show-answer at 8.
// Real exam marks are preserved in markingGuide strings.
// Platform scoring reflects relative weight only.
//
// Question type key:
//   scenario          — context block, no answer, not graded
//   multiple-choice   — auto-graded on selection
//   open-ended        — student types answer, validated by answerValidator
//   fill-in-the-blank — inline blanks with word bank
//   show-answer       — student reads prompt, reveals model memo to self-grade
//                       diagram field renders Mermaid after the text answer (show-answer only)

export default [

  // ════════════════════════════════════════════════════════════════
  // QUESTION 1 — National Emergency Response System (25 Marks)
  // ════════════════════════════════════════════════════════════════

  {
    id: "ITSEA_W3_SCENARIO1",
    type: "scenario",
    title: "Question 1: National Emergency Response System — NERS (25 Marks)",
    context:
      "A government is developing a National Emergency Response System (NERS) to coordinate " +
      "police, ambulance, and fire services. The system must:\n\n" +
      "• Allow citizens to report emergencies via mobile and web platforms\n" +
      "• Dispatch appropriate emergency services in real-time\n" +
      "• Integrate with hospital and law enforcement databases\n" +
      "• Provide real-time tracking and updates\n" +
      "• Operate under strict reliability and performance constraints\n\n" +
      "The system will be used by multiple stakeholders including citizens, operators, emergency " +
      "personnel, and government agencies. Requirements are complex and may conflict due to " +
      "differing stakeholder needs.",
  },

  // ── 1.1 Functional vs Non-Functional Requirements (6 Marks) ─────

  {
    id: "ITSEA_W3_Q1",
    type: "multiple-choice",
    sectionLabel: "1.1",
    text: "Which of the following is a non-functional requirement for the NERS system?",
    options: [
      "The system shall allow citizens to report emergencies via mobile and web platforms.",
      "The system shall dispatch emergency services automatically based on incident type.",
      "The system shall respond to emergency requests within 2 seconds.",
      "The system shall integrate with hospital and law enforcement databases.",
    ],
    correctAnswers: [
      "The system shall respond to emergency requests within 2 seconds.",
    ],
    points: 2,
  },

  {
    id: "ITSEA_W3_Q2",
    type: "fill-in-the-blank",
    sectionLabel: "1.1",
    text: "___ [Blank 1] requirements describe the services a system must provide and how it behaves. " +
      "___ [Blank 2] requirements describe constraints on the system such as performance, reliability, and security.",
    blanks: [
      {
        id: "b1",
        options: ["Functional", "Non-functional", "Behavioral", "Structural", "Operational", "Systemic", "Domain", "Transitional"],
        correctAnswer: "Functional",
      },
      {
        id: "b2",
        options: ["Functional", "Non-functional", "Behavioral", "Structural", "Operational", "Systemic", "Domain", "Transitional"],
        correctAnswer: "Non-functional",
      },
    ],
    points: 2,
  },

  {
    id: "ITSEA_W3_Q3",
    type: "show-answer",
    sectionLabel: "1.1",
    text: "Distinguish between functional and non-functional requirements. " +
      "Provide two examples of each based on the NERS scenario. (6 marks)",
    correctAnswers: [
      "Functional requirements describe the services the system must provide and how it behaves in response to inputs.\n\n" +
      "Examples (NERS):\n" +
      "• The system shall allow users to report emergencies via mobile/web.\n" +
      "• The system shall automatically dispatch the appropriate emergency service.\n\n" +
      "Non-functional requirements describe constraints on the system such as performance, reliability, and security.\n\n" +
      "Examples (NERS):\n" +
      "• The system shall respond to emergency requests within 2 seconds.\n" +
      "• The system shall maintain 99.99% availability at all times.",
    ],
    markingGuide:
      "2 marks: Correct distinction between functional and non-functional requirements. " +
      "2 marks: Two valid functional examples applied to NERS scenario. " +
      "2 marks: Two valid non-functional examples applied to NERS scenario. " +
      "Examiner note: Generic definitions without scenario-based examples = maximum 3 marks.",
    points: 6,
  },

  // ── 1.2 Elicitation Process & Challenges (6 Marks) ──────────────

  {
    id: "ITSEA_W3_Q4",
    type: "open-ended",
    sectionLabel: "1.2",
    text: "Name one of the four stages of the requirements elicitation process.",
    correctAnswers: [
      "Discovery",
      "Classification",
      "Prioritisation",
      "Prioritization",
      "Documentation",
    ],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
  },

  {
    id: "ITSEA_W3_Q5",
    type: "show-answer",
    sectionLabel: "1.2",
    text: "Explain the requirements elicitation process and analyse three challenges " +
      "that may arise when gathering requirements for the NERS system. (6 marks)",
    correctAnswers: [
      "The requirements elicitation process involves working with stakeholders to discover, " +
      "classify, prioritise, and document system needs.\n\n" +
      "Stages:\n" +
      "• Discovery — identifying stakeholder requirements\n" +
      "• Classification — organising requirements into categories\n" +
      "• Prioritisation — ranking requirements by importance\n" +
      "• Documentation — formally recording all requirements\n\n" +
      "Challenges for NERS:\n" +
      "1. Stakeholders may not know what they want — citizens, operators, and emergency personnel " +
      "have different mental models of what the system should do.\n" +
      "2. Conflicting requirements — police priorities (rapid dispatch) may conflict with medical " +
      "priorities (patient triage accuracy).\n" +
      "3. Political and organisational influences — government agencies may impose constraints " +
      "that conflict with technical or operational requirements.",
    ],
    markingGuide:
      "3 marks: Explanation of the elicitation process (all four stages mentioned = full marks). " +
      "3 marks: Any three valid challenges explained and linked to the NERS scenario. " +
      "Examiner note: Listing challenges without explanation = partial marks only.",
    points: 6,
  },

  // ── 1.3 Elicitation Techniques (5 Marks) ────────────────────────

  {
    id: "ITSEA_W3_Q6",
    type: "multiple-choice",
    sectionLabel: "1.3",
    text: "Which elicitation technique is most valuable for uncovering implicit or unstated " +
      "requirements that stakeholders may not even be aware of?",
    options: [
      "Interviews — because they allow direct questioning of stakeholders.",
      "Surveys — because they gather data from large numbers of users quickly.",
      "Ethnography — because it reveals real-world behaviour that differs from what stakeholders describe.",
      "Prototyping — because it lets users see and react to a working model.",
    ],
    correctAnswers: [
      "Ethnography — because it reveals real-world behaviour that differs from what stakeholders describe.",
    ],
    points: 2,
  },

  {
    id: "ITSEA_W3_Q7",
    type: "show-answer",
    sectionLabel: "1.3",
    text: "Evaluate two elicitation techniques and justify their suitability for the NERS system. (5 marks)",
    correctAnswers: [
      "Interviews:\n" +
      "Direct communication with stakeholders such as operators and emergency personnel. " +
      "Effective for capturing explicit requirements and understanding priorities. " +
      "Suitable for NERS because complex, safety-critical requirements need to be discussed in depth " +
      "with domain experts who can explain operational constraints.\n\n" +
      "Ethnography:\n" +
      "Observing users in their real working environments. Reveals implicit or hidden requirements " +
      "that stakeholders themselves may not articulate. Especially valuable for NERS because " +
      "emergency personnel behaviour under stress may differ significantly from what they report " +
      "in interviews — the system must support actual practice, not idealised accounts.\n\n" +
      "Justification: Ethnography is the stronger technique for this system because emergency " +
      "response is a high-pressure, time-critical domain where real-world behaviour is the ground truth.",
    ],
    markingGuide:
      "2 marks: Technique 1 evaluated with NERS-specific justification. " +
      "2 marks: Technique 2 evaluated with NERS-specific justification. " +
      "1 mark: Comparative justification of suitability. " +
      "Examiner note: A+ answers include a direct comparison of the two techniques.",
    points: 5,
  },

  // ── 1.4 Requirements Validation (5 Marks) ───────────────────────

  {
    id: "ITSEA_W3_Q8",
    type: "fill-in-the-blank",
    sectionLabel: "1.4",
    text: "Requirements validation ensures the requirements document defines the system that " +
      "the customer truly wants. Three key validation checks are:\n" +
      "___ [Blank 1] — requirements reflect real user needs.\n" +
      "___ [Blank 2] — no conflicting requirements exist.\n" +
      "___ [Blank 3] — all required functions are included.",
    blanks: [
      {
        id: "b1",
        options: ["Validity", "Consistency", "Completeness", "Feasibility", "Traceability", "Verifiability", "Agility", "Integrity"],
        correctAnswer: "Validity",
      },
      {
        id: "b2",
        options: ["Validity", "Consistency", "Completeness", "Feasibility", "Traceability", "Verifiability", "Agility", "Integrity"],
        correctAnswer: "Consistency",
      },
      {
        id: "b3",
        options: ["Validity", "Consistency", "Completeness", "Feasibility", "Traceability", "Verifiability", "Agility", "Integrity"],
        correctAnswer: "Completeness",
      },
    ],
    points: 3,
  },

  {
    id: "ITSEA_W3_Q9",
    type: "show-answer",
    sectionLabel: "1.4",
    text: "Explain the purpose of requirements validation and discuss three validation checks " +
      "that should be applied to NERS. (5 marks)",
    correctAnswers: [
      "Purpose: Requirements validation ensures that the requirements document correctly defines " +
      "the system the customer actually wants. It catches errors before development begins, " +
      "reducing costly rework.\n\n" +
      "Three validation checks applied to NERS:\n\n" +
      "1. Validity — Does the requirement reflect a genuine need? For NERS, the requirement that " +
      "the system dispatches automatically must reflect actual operational practice, not an " +
      "assumption by developers.\n\n" +
      "2. Consistency — Do requirements conflict with each other? For NERS, a police priority " +
      "for fastest response may conflict with a medical priority for most accurate triage — " +
      "these must be resolved before implementation.\n\n" +
      "3. Completeness — Are all required functions included? For NERS, the requirements must " +
      "cover all emergency types, all user roles, and all failure scenarios — no gaps allowed " +
      "in a safety-critical system.",
    ],
    markingGuide:
      "2 marks: Clear explanation of the purpose of validation. " +
      "3 marks: Any three validation checks correctly identified and explained within the NERS context. " +
      "Examiner note: Listing checks without explanation = capped at partial marks.",
    points: 5,
  },

  // ── 1.5 Requirements Change & Management (6 Marks) ──────────────

  {
    id: "ITSEA_W3_Q10",
    type: "multiple-choice",
    sectionLabel: "1.5",
    text: "Which of the following best explains why requirements change is inevitable in a " +
      "system like NERS?",
    options: [
      "Developers make frequent mistakes during the requirements phase.",
      "Stakeholders initially provide incorrect information on purpose.",
      "The technical environment, legislation, and stakeholder priorities evolve after requirements are captured.",
      "Requirements documents are always incomplete because analysts lack experience.",
    ],
    correctAnswers: [
      "The technical environment, legislation, and stakeholder priorities evolve after requirements are captured.",
    ],
    points: 2,
  },

  {
    id: "ITSEA_W3_Q11",
    type: "show-answer",
    sectionLabel: "1.5",
    text: "Analyse why requirements change is inevitable in the NERS system. " +
      "Then explain the requirements change management process. (6 marks)",
    correctAnswers: [
      "Why change is inevitable in NERS:\n\n" +
      "1. New policies and legislation — Emergency response regulations change frequently. " +
      "A new data-sharing law between police and hospitals would require the system to be updated.\n" +
      "2. Evolving stakeholder needs — Citizens, operators, and agencies develop new expectations " +
      "as they use the system. Early requirements cannot capture future needs.\n" +
      "3. Technology evolution — New mobile platforms, GPS accuracy improvements, or database " +
      "upgrades create both opportunities and constraints that alter existing requirements.\n\n" +
      "Requirements change management process:\n\n" +
      "1. Problem analysis — Identify and verify that the change request is valid and necessary.\n" +
      "2. Change impact analysis — Assess what other requirements and components are affected.\n" +
      "3. Change costing — Estimate the effort and cost of implementing the change.\n" +
      "4. Change implementation — Update the requirements document and propagate changes " +
      "through design and development.",
    ],
    markingGuide:
      "3 marks: Three reasons why change is inevitable, linked to the NERS scenario. " +
      "3 marks: Clear explanation of the change management process with all stages. " +
      "Examiner note: Process stages must be clearly explained, not just listed.",
    points: 6,
  },

  // ════════════════════════════════════════════════════════════════
  // QUESTION 2 — Smart Healthcare Monitoring System (15 Marks)
  // ════════════════════════════════════════════════════════════════

  {
    id: "ITSEA_W3_SCENARIO2",
    type: "scenario",
    title: "Question 2: Smart Healthcare Monitoring System (15 Marks)",
    context:
      "A company is developing a Smart Healthcare Monitoring System that collects patient data " +
      "from wearable devices and alerts healthcare providers in case of anomalies. " +
      "The system monitors vital signs in real time, processes incoming data streams, " +
      "and triggers alerts when readings fall outside safe thresholds.",
  },

  // ── 2.1 System Perspectives (8 Marks) ───────────────────────────

  {
    id: "ITSEA_W3_Q12",
    type: "fill-in-the-blank",
    sectionLabel: "2.1",
    text: "Match the four system modeling perspectives to their definitions:\n\n" +
      "___ [Blank 1] perspective — shows the system in relation to its environment.\n" +
      "___ [Blank 2] perspective — shows how system components communicate with users and each other.\n" +
      "___ [Blank 3] perspective — shows the organisation of system components and data.\n" +
      "___ [Blank 4] perspective — shows how the system responds to events over time.",
    blanks: [
      {
        id: "b1",
        options: ["Context", "Interaction", "Structural", "Behavioral", "Deployment", "Component", "Temporal", "Logical", "Physical"],
        correctAnswer: "Context",
      },
      {
        id: "b2",
        options: ["Context", "Interaction", "Structural", "Behavioral", "Deployment", "Component", "Temporal", "Logical", "Physical"],
        correctAnswer: "Interaction",
      },
      {
        id: "b3",
        options: ["Context", "Interaction", "Structural", "Behavioral", "Deployment", "Component", "Temporal", "Logical", "Physical"],
        correctAnswer: "Structural",
      },
      {
        id: "b4",
        options: ["Context", "Interaction", "Structural", "Behavioral", "Deployment", "Component", "Temporal", "Logical", "Physical"],
        correctAnswer: "Behavioral",
      },
    ],
    points: 4,
  },

  {
    id: "ITSEA_W3_Q13",
    type: "show-answer",
    sectionLabel: "2.1",
    text: "Explain the four system perspectives used in system modeling. " +
      "Apply each perspective to the Smart Healthcare Monitoring System. (8 marks)",
    correctAnswers: [
      "1. Context perspective — defines the system boundary and its relationship with external entities.\n" +
      "Applied: The healthcare system interacts with wearable patient devices, hospital databases, " +
      "and healthcare provider dashboards. These define what is inside and outside the system boundary.\n\n" +
      "2. Interaction perspective — models the communication between users and the system, " +
      "and between system components.\n" +
      "Applied: A doctor interacts with the system to view alerts and patient history. " +
      "The wearable device sends data to the system, which responds with a confirmation.\n\n" +
      "3. Structural perspective — describes the internal organisation of the system: " +
      "its components, data structures, and how they are connected.\n" +
      "Applied: Key components include a data ingestion module, an anomaly detection engine, " +
      "an alert management module, and a patient record database.\n\n" +
      "4. Behavioral perspective — describes how the system responds to events and changes state over time.\n" +
      "Applied: When a patient's heart rate exceeds a threshold, the system transitions from " +
      "monitoring state to alert state, notifies the doctor, and waits for acknowledgement.",
    ],
    markingGuide:
      "4 marks: One mark per correct definition of each perspective. " +
      "4 marks: One mark per correct application to the healthcare system. " +
      "Examiner note: Application must be specific to the scenario — generic descriptions earn half marks.",
    points: 8,
  },

  // ── 2.2 Use Case Diagram (5 Marks) ──────────────────────────────

  {
    id: "ITSEA_W3_Q14",
    type: "open-ended",
    sectionLabel: "2.2",
    text: "Name one actor that must appear in a Use Case Diagram for the Smart Healthcare Monitoring System.",
    correctAnswers: [
      "Patient",
      "Doctor",
      "System Admin",
      "System Administrator",
      "Healthcare Provider",
      "Administrator",
    ],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
  },

  {
    id: "ITSEA_W3_Q15",
    type: "show-answer",
    sectionLabel: "2.2",
    text: "Draw a Use Case Diagram for the Smart Healthcare Monitoring System. " +
      "Your diagram must include at least three actors, four use cases, and clearly show system boundaries. (5 marks)",
    correctAnswers: [
      "The Use Case Diagram must show:\n\n" +
      "Actors: Patient, Doctor, System Admin (minimum three)\n\n" +
      "Use cases within the system boundary:\n" +
      "• Send Health Data (Patient)\n" +
      "• Monitor Patient (Doctor)\n" +
      "• Send Alert (System → Doctor)\n" +
      "• View Reports (Doctor, System Admin)\n\n" +
      "Relationships:\n" +
      "• Patient → Send Health Data\n" +
      "• Send Health Data → Send Alert (include)\n" +
      "• Doctor → Monitor Patient\n" +
      "• Doctor → View Reports\n" +
      "• System Admin → View Reports\n" +
      "• Send Alert → Doctor (notification)\n\n" +
      "The system boundary must enclose all use cases and exclude all actors.",
    ],
    markingGuide:
      "2 marks: Three or more correctly identified actors. " +
      "2 marks: Four or more use cases correctly placed inside the system boundary. " +
      "1 mark: Relationships and system boundary clearly shown. " +
      "Examiner note: Actors outside the boundary, use cases inside — any violation loses the boundary mark.",
    diagram: {
      type: "mermaid",
      code: `flowchart LR
  Patient([Patient])
  Doctor([Doctor])
  Admin([System Admin])

  subgraph boundary [Healthcare Monitoring System]
    UC1(Send Health Data)
    UC2(Monitor Patient)
    UC3(Send Alert)
    UC4(View Reports)
  end

  Patient --> UC1
  UC1 --> UC3
  Doctor --> UC2
  Doctor --> UC4
  UC3 --> Doctor
  Admin --> UC4`,
    },
    points: 5,
  },

  // ── 2.3 Sequence Diagram (5 Marks) ──────────────────────────────

  {
    id: "ITSEA_W3_Q16",
    type: "multiple-choice",
    sectionLabel: "2.3",
    text: "In a sequence diagram for the 'Send Alert' function, which element correctly " +
      "represents a conditional flow where an alert is only sent if the reading is abnormal?",
    options: [
      "A solid arrow labelled sendAlert() from System to Doctor.",
      "A dashed return arrow from Doctor back to PatientDevice.",
      "An alt fragment containing the alert message, showing the condition [abnormal condition].",
      "A loop fragment repeating the health data send every 30 seconds.",
    ],
    correctAnswers: [
      "An alt fragment containing the alert message, showing the condition [abnormal condition].",
    ],
    points: 2,
  },

  {
    id: "ITSEA_W3_Q17",
    type: "show-answer",
    sectionLabel: "2.3",
    text: "Develop a Sequence Diagram for the 'Send Alert' function in the Smart Healthcare " +
      "Monitoring System. Your diagram must show participants, correct message flow, and " +
      "a conditional (alt) interaction. (5 marks)",
    correctAnswers: [
      "Participants: PatientDevice, System, Doctor\n\n" +
      "Flow:\n" +
      "1. PatientDevice sends sendHealthData() to System.\n" +
      "2. System performs analyseData() internally.\n" +
      "3. [alt: abnormal condition] System sends sendAlert() to Doctor.\n" +
      "4. Doctor returns acknowledgeAlert() to System.\n" +
      "5. System returns confirmation to PatientDevice.\n\n" +
      "The alt fragment is essential — it correctly models that alerts only fire under a specific condition.",
    ],
    markingGuide:
      "2 marks: Correct message flow between participants in the right sequence. " +
      "2 marks: All three participants correctly identified and placed. " +
      "1 mark: Alt/conditional fragment correctly used. " +
      "Examiner note: A+ answers include the alt fragment with a labelled condition.",
    diagram: {
      type: "mermaid",
      code: `sequenceDiagram
  participant PatientDevice
  participant System
  participant Doctor

  PatientDevice->>System: sendHealthData()
  System->>System: analyseData()

  alt abnormal condition
    System->>Doctor: sendAlert()
    Doctor-->>System: acknowledgeAlert()
  end

  System-->>PatientDevice: confirmation`,
    },
    points: 5,
  },

  // ── 2.4 Data-driven vs Event-driven (4 Marks) ───────────────────

  {
    id: "ITSEA_W3_Q18",
    type: "multiple-choice",
    sectionLabel: "2.4",
    text: "The Smart Healthcare Monitoring System sends alerts when a patient's heart rate " +
      "exceeds a threshold. Which model best describes this behaviour, and why?",
    options: [
      "Data-driven — because it continuously processes incoming streams of patient data.",
      "Event-driven — because system actions are triggered by a specific condition occurring, not by a scheduled data cycle.",
      "Structural — because the system components are arranged hierarchically.",
      "Behavioral — because the system models state changes over time.",
    ],
    correctAnswers: [
      "Event-driven — because system actions are triggered by a specific condition occurring, not by a scheduled data cycle.",
    ],
    points: 2,
  },

  {
    id: "ITSEA_W3_Q19",
    type: "show-answer",
    sectionLabel: "2.4",
    text: "Explain the difference between data-driven and event-driven models. " +
      "Identify which is more appropriate for the Smart Healthcare Monitoring System and justify your answer. (4 marks)",
    correctAnswers: [
      "Data-driven model: System processing is triggered by the arrival or change of data. " +
      "The system continuously ingests, transforms, and outputs data in a pipeline. " +
      "Example: a batch report that processes all patient readings at midnight.\n\n" +
      "Event-driven model: System processing is triggered by specific events or conditions " +
      "occurring at unpredictable times. The system remains idle until an event fires. " +
      "Example: an alert triggered the moment a heart rate reading exceeds 120 BPM.\n\n" +
      "Best fit: Event-driven. The healthcare monitoring system must react immediately to " +
      "abnormal conditions — these are discrete, unpredictable events, not scheduled data " +
      "cycles. Waiting for a data-driven batch cycle would introduce unacceptable delays " +
      "in a safety-critical medical context.",
    ],
    markingGuide:
      "1 mark: Correct definition of data-driven model. " +
      "1 mark: Correct definition of event-driven model. " +
      "2 marks: Correctly identifying event-driven as the best fit with a specific justification " +
      "tied to the healthcare scenario. " +
      "Examiner note: Must include justification — identification alone earns 1 mark maximum.",
    points: 4,
  },

];