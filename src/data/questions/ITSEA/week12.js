// src/data/questions/ITSEA/week12.js
export default [
  // ── Scenario ────────────────────────────────────────────────────────────────
  {
    id: "SCENARIO_ITSEA_W12",
    type: "scenario",
    title: "Questions 1–4: Systems Engineering & Real-Time Software Engineering (50 Marks)",
    context: `The City of **Metrovia** is deploying an **Autonomous Urban Rail Transit System (AURTS)** to reduce traffic congestion and improve public transportation reliability.

**The system consists of:**
- Driverless trains
- Trackside sensors
- Control centres
- Passenger information displays
- Emergency response systems
- Mobile applications used by commuters
- Human operators supervising rail operations
- Maintenance engineers
- Municipal transportation managers

The rail system continuously monitors *train positions, passenger loads, weather conditions, track health, power supply status, and emergency incidents*.

AURTS must respond **immediately** to hazardous situations such as track obstructions, power failures, signalling faults, and emergency stop requests. The system is expected to operate continuously for **decades** while supporting future expansion into neighbouring cities.

*All questions in this assessment refer to this scenario.*`,
  },

  // ── Question 1: Understanding the System Context (12 Marks) ─────────────────

  {
    id: "ITSEA_W12_Q1",
    type: "multiple-choice",
    tags: ["systems thinking"],
    sectionLabel: "1.1",
    text: "AURTS includes trains, software, operators, maintenance personnel, management policies, and operating procedures.\n\nWhich classification **best** describes the overall system?",
    options: [
      "Technical Computer-Based System",
      "Embedded Software System",
      "Sociotechnical System",
      "Distributed Database System",
    ],
    correctAnswers: ["Sociotechnical System"],
    points: 2,
    explanation:
      "A **Sociotechnical System** encompasses not only hardware and software but also people, organisational structures, and operating procedures. A Technical Computer-Based System (TCBS) excludes these human and organisational elements. The presence of operators, maintenance personnel, and management policies means AURTS fits the sociotechnical definition.",
  },

  {
    id: "ITSEA_W12_Q2",
    type: "fill-in-the-blank",
    tags: ["systems thinking"],
    sectionLabel: "1.2",
    text: "Properties such as reliability, security, and usability that arise from interactions among system components are called ___ properties.",
    blanks: [
      {
        id: "b1",
        options: ["functional", "non-functional", "emergent", "inherited"],
        correctAnswer: "emergent",
      },
    ],
    explanation:
      "**Emergent properties** are characteristics that cannot be attributed to any single component — they arise only when components interact within the wider system. Reliability, security, and usability are classic examples: a highly reliable software module does not guarantee a reliable system if operators are poorly trained.",
  },

  {
    id: "ITSEA_W12_Q3",
    type: "open-ended",
    tags: ["system design", "requirements analysis"],
    sectionLabel: "1.3",
    text: "Which systems engineering phase is responsible for defining the purpose and high-level vision of AURTS?",
    correctAnswers: [
      "Conceptual Design",
      "conceptual design",
      "Concept Design",
      "concept design",
    ],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 20,
      allowPartialMatch: true,
    },
    explanation:
      "**Conceptual Design** is the phase that investigates feasibility and communicates the overall vision of the proposed system to decision-makers. It precedes detailed technical design and focuses on *what* the system must achieve rather than *how* it will be built.",
  },

  {
    id: "ITSEA_W12_Q4",
    type: "multiple-choice",
    tags: ["legal & compliance", "managerial impact"],
    sectionLabel: "1.4",
    text: "The transportation authority decides that the new system must comply with recently enacted national railway safety legislation.\n\nThis decision driver is best classified as:",
    options: [
      "Business reorganisation",
      "Available budget",
      "External competition",
      "Regulatory compliance",
    ],
    correctAnswers: ["Regulatory compliance"],
    points: 2,
    explanation:
      "New legislation creates an external regulatory requirement that the organisation must satisfy. This is **Regulatory compliance** — an externally imposed constraint rather than an internal business decision, budgetary consideration, or market pressure.",
  },

  {
    id: "ITSEA_W12_Q5",
    type: "show-answer",
    tags: ["systems thinking", "managerial impact", "cultural challenges"],
    sectionLabel: "1.5",
    text: "The Metrovia government argues that purchasing advanced software and hardware alone will guarantee project success.\n\nCritically evaluate this claim using systems engineering principles. Your answer should discuss **sociotechnical systems**, **organisational influences**, **emergent properties**, and **success criteria**.",
    correctAnswers: [
      {
        text: "The assertion that advanced hardware and software alone guarantee success is fundamentally flawed because AURTS is a **sociotechnical system** rather than merely a technical system.\n\nAURTS consists of interconnected technical components, including trains, sensors, communication networks, and control software. However, it also includes human operators, maintenance engineers, management structures, operational procedures, and organisational policies. The performance of the overall system therefore depends on interactions between both technical and non-technical elements.\n\n**Organisational influences** play a significant role in determining success. New operational procedures may require retraining staff, while employees may resist changes that alter established workflows. Changes to authority structures or decision-making processes may also create political resistance within the organisation.\n\nThe system exhibits **emergent properties** such as reliability, usability, security, and safety. These properties cannot be attributed to a single subsystem. For example, reliable software may still produce an unreliable overall system if operators are poorly trained or maintenance procedures are inadequate.\n\n**Success criteria** are also subjective. Passengers may prioritise punctuality and safety, engineers may emphasise reliability and maintainability, while government stakeholders may focus on cost-effectiveness and public satisfaction.\n\nTherefore, successful deployment requires alignment between technology, people, organisational processes, and strategic objectives.",
      },
    ],
    markingGuide: `| Criterion | Marks |\n|---|---|\n| Defines sociotechnical system correctly | 2 |\n| Explains organisational influences | 1 |\n| Discusses emergent properties | 2 |\n| Discusses stakeholder-dependent success criteria | 1 |\n| **Total** | **6** |\n\n**Examiner note:** Top-performing answers explicitly connect human and organisational elements to system outcomes rather than merely listing them.`,
    points: 6,
  },

  // ── Question 2: System Engineering Decisions (13 Marks) ──────────────────────

  {
    id: "ITSEA_W12_Q6",
    type: "multiple-choice",
    tags: ["system design", "project management"],
    sectionLabel: "2.1",
    text: "During procurement, Metrovia selects a supplier primarily because of a low bid price. Three years later, integration problems delay deployment significantly.\n\nWhich systems engineering principle was most likely violated?",
    options: [
      "Reliability depends only on hardware quality.",
      "Procurement decisions strongly influence later development stages.",
      "Conceptual design occurs after deployment.",
      "System evolution eliminates integration risk.",
    ],
    correctAnswers: [
      "Procurement decisions strongly influence later development stages.",
    ],
    points: 2,
    explanation:
      "**Procurement decisions** made early in the system lifecycle — particularly when driven by cost alone — can introduce integration difficulties, increase complexity, and cause significant delays in later development stages. Systems engineering recognises that the consequences of early decisions compound throughout the project.",
  },

  {
    id: "ITSEA_W12_Q7",
    type: "fill-in-the-blank",
    tags: ["software maintenance"],
    sectionLabel: "2.2",
    text: "Existing systems that continue operating and require ongoing maintenance are often called ___ systems.",
    blanks: [
      {
        id: "b1",
        options: ["embedded", "legacy", "distributed", "real-time"],
        correctAnswer: "legacy",
      },
    ],
    explanation:
      "**Legacy systems** are existing operational systems that continue to require support, maintenance, and evolution despite their age. Organisations often retain them because replacement is costly and risky, even when the technology is outdated.",
  },

  {
    id: "ITSEA_W12_Q8",
    type: "open-ended",
    tags: ["managerial impact", "risk management"],
    sectionLabel: "2.3",
    text: "Name **one** factor that may justify retaining an existing large-scale system rather than replacing it.",
    correctAnswers: [
      "Replacement cost",
      "Investment cost",
      "Return on investment",
      "Risks of change",
      "System dependencies",
      "Loss of expertise",
      "cost",
      "risk",
      "dependencies",
      "expertise",
    ],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 20,
      allowPartialMatch: true,
    },
    explanation:
      "Any of the following justify retaining an existing system: **Replacement cost** (infrastructure, software, and training investments are already sunk), **Risks of change** (transition failures can have severe operational consequences), **System dependencies** (dependent systems may also require modification), or **Loss of expertise** (the organisation may no longer have the knowledge to specify a replacement accurately).",
  },

  {
    id: "ITSEA_W12_Q9",
    type: "multiple-choice",
    tags: ["project management"],
    sectionLabel: "2.4",
    text: "Several engineering teams disagree on the meaning of the term *response time*. Software engineers refer to computation latency, while railway engineers refer to signal propagation delay.\n\nThis is an example of:",
    options: [
      "Emergent behaviour",
      "Professional boundaries",
      "Communication difficulties",
      "Operator unreliability",
    ],
    correctAnswers: ["Communication difficulties"],
    points: 2,
    explanation:
      "**Communication difficulties** arise when different disciplines use identical terminology with different meanings. This is a common challenge in multidisciplinary systems engineering projects, where shared vocabulary cannot be assumed and terminology must be explicitly defined.",
  },

  {
    id: "ITSEA_W12_Q10",
    type: "show-answer",
    tags: ["software maintenance", "systems thinking", "risk management"],
    sectionLabel: "2.5",
    text: "Metrovia plans to expand AURTS into neighbouring cities over the next twenty years.\n\nDiscuss the **major challenges** associated with system evolution and explain why large systems often remain operational far longer than originally expected.",
    correctAnswers: [
      {
        text: "System evolution is unavoidable because organisational goals, regulations, operational requirements, and technologies change continuously throughout the system lifecycle.\n\nAs Metrovia expands into neighbouring cities, the railway system must accommodate new routes, stations, operational procedures, and user requirements. Such modifications require both technical and business analysis before implementation.\n\n**Technical challenges** arise because changes frequently affect multiple interconnected subsystems. Unexpected dependencies may introduce new failures or performance problems. Documentation may be incomplete, making original design decisions difficult to understand and reproduce. Continuous modifications may also gradually degrade the original architecture.\n\n**Organisational and economic reasons** explain why large systems persist. Replacement costs are extremely high — significant investments have already been made in infrastructure, software, personnel training, and operational procedures. Organisations may also lack the expertise needed to specify replacement systems accurately.\n\nAdditionally, replacing a mission-critical system introduces substantial risks. Existing dependent systems may require modification, and failures during transition can have severe operational consequences.\n\nConsequently, organisations often evolve legacy systems incrementally rather than replacing them entirely.",
      },
    ],
    markingGuide: `| Criterion | Marks |\n|---|---|\n| Explains need for evolution | 2 |\n| Discusses technical challenges | 2 |\n| Discusses organisational/economic reasons | 2 |\n| Strong conclusion | 1 |\n| **Total** | **7** |\n\n**Examiner note:** Many students describe evolution but fail to explain why organisations tolerate legacy systems despite their limitations.`,
    points: 7,
  },

  // ── Question 3: Real-Time Railway Operations (12 Marks) ──────────────────────

  {
    id: "ITSEA_W12_Q11",
    type: "multiple-choice",
    tags: ["system design"],
    sectionLabel: "3.1",
    text: "A train approaches a broken section of track. The control system must issue a stop command within 100 milliseconds to prevent a collision.\n\nThis requirement most closely describes:",
    options: [
      "Soft real-time operation",
      "Hard real-time operation",
      "Batch processing",
      "Eventual consistency",
    ],
    correctAnswers: ["Hard real-time operation"],
    points: 2,
    explanation:
      "**Hard real-time** systems are those where missing a deadline constitutes a system failure — the output is incorrect regardless of its functional accuracy. A 100 ms stop command deadline in a safety-critical collision-avoidance context is a textbook hard real-time requirement: a late response is as dangerous as no response.",
  },

  {
    id: "ITSEA_W12_Q12",
    type: "fill-in-the-blank",
    tags: ["system design"],
    sectionLabel: "3.2",
    text: "A real-time system is considered correct only when it produces the correct output and meets the required ___ constraints.",
    blanks: [
      {
        id: "b1",
        options: ["functional", "security", "storage", "timing"],
        correctAnswer: "timing",
      },
    ],
    explanation:
      "Real-time correctness has two dimensions: **functional correctness** (the right output) and **timing correctness** (the output is produced within the required deadline). A system that produces the right answer too late is considered incorrect in a real-time context.",
  },

  {
    id: "ITSEA_W12_Q13",
    type: "open-ended",
    tags: ["system design"],
    sectionLabel: "3.3",
    text: "Stimuli occurring at predictable time intervals are known as what type of stimuli?",
    correctAnswers: [
      "Periodic",
      "periodic stimuli",
      "periodic",
    ],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
      allowPartialMatch: true,
    },
    explanation:
      "**Periodic stimuli** occur at regular, predictable intervals — for example, a sensor that is polled every 50 ms. This is contrasted with **aperiodic stimuli**, which occur at irregular or unpredictable times (such as an emergency stop request).",
  },

  {
    id: "ITSEA_W12_Q14",
    type: "multiple-choice",
    tags: ["system design"],
    sectionLabel: "3.4",
    text: "A passenger information display updates every 30 seconds. If an update is delayed by a few seconds, passengers may experience inconvenience but system operation remains acceptable.\n\nThis is best classified as:",
    options: [
      "Hard real-time",
      "Safety-critical real-time",
      "Soft real-time",
      "Embedded control",
    ],
    correctAnswers: ["Soft real-time"],
    points: 2,
    explanation:
      "**Soft real-time** systems remain useful even when deadlines are occasionally missed — performance degrades gracefully rather than catastrophically. A delayed passenger display update causes inconvenience but no safety risk, which is the defining characteristic of soft real-time behaviour.",
  },

  {
    id: "ITSEA_W12_Q15",
    type: "show-answer",
    tags: ["system design", "software processes", "systems thinking"],
    sectionLabel: "3.5",
    text: "Metrovia engineers initially propose a single sequential processing loop to manage all sensors, train controls, emergency systems, passenger displays, and communication networks.\n\nEvaluate this proposal using principles of **real-time software engineering**.",
    correctAnswers: [
      {
        text: "A single sequential processing loop is unsuitable for a complex real-time system because different events have different deadlines and priorities.\n\nSafety-critical events such as **emergency braking** require immediate processing, while passenger information displays can tolerate delays. In a sequential architecture, lower-priority tasks may block critical tasks, causing deadlines to be missed and creating unsafe system states.\n\n**Real-time systems** therefore employ concurrent processes managed by a real-time operating system or executive controller. Separate processes monitor sensors, control trains, manage communications, and update displays simultaneously.\n\nSuch architectures improve responsiveness, scheduling flexibility, and reliability. **Timing analysis** can then be performed on individual processes to determine deadlines, execution times, and scheduling frequencies. This is not possible within a monolithic sequential loop.\n\nConsequently, a concurrent real-time architecture provides significantly greater safety and predictability than a simple sequential loop.",
        diagram: {
          type: "mermaid",
          code: `graph TD
    RTOS[Real-Time OS / Executive]
    RTOS --> P1[Emergency Braking Process\nHighest Priority]
    RTOS --> P2[Obstacle Detection Process\nHigh Priority]
    RTOS --> P3[Train Control Process\nMedium Priority]
    RTOS --> P4[Passenger Display Process\nLow Priority]
    RTOS --> P5[Communication Process\nLow Priority]`,
        },
      },
    ],
    markingGuide: `| Criterion | Marks |\n|---|---|\n| Identifies problem with sequential loop | 2 |\n| Discusses deadlines and priorities | 1 |\n| Explains concurrent processing approach | 2 |\n| Justifies superiority of concurrent design | 1 |\n| **Total** | **6** |`,
    points: 6,
    image: {
        src: "/images/ITSEA_W12_Q15.png",
        alt: "Side-by-side comparison of a sequential processing loop and a concurrent real-time architecture controlled by an RTOS scheduler.",
        caption: "Alternative Architectures for Urban Rail Control"
        }
  },

  // ── Question 4: System Reliability and Real-Time Design (13 Marks) ───────────

  {
    id: "ITSEA_W12_Q16",
    type: "multiple-choice",
    tags: ["systems thinking"],
    sectionLabel: "4.1",
    text: "AURTS experiences failures because operators frequently misinterpret warning messages, even though hardware and software are functioning correctly.\n\nWhich reliability factor is **primarily** responsible?",
    options: [
      "Hardware reliability",
      "Software reliability",
      "Operator reliability",
      "Environmental reliability",
    ],
    correctAnswers: ["Operator reliability"],
    points: 2,
    explanation:
      "**Operator reliability** refers to the consistency and accuracy with which human operators perform their duties. When hardware and software function correctly but the system still fails due to human misinterpretation, the failure originates from the human element — illustrating why reliability must be treated as an emergent property of the entire sociotechnical system.",
  },

  {
    id: "ITSEA_W12_Q17",
    type: "fill-in-the-blank",
    tags: ["system design"],
    sectionLabel: "4.2",
    text: "The component of a real-time operating system responsible for deciding which process executes next is called the ___.",
    blanks: [
      {
        id: "b1",
        options: ["scheduler", "dispatcher", "interrupt handler", "allocator"],
        correctAnswer: "scheduler",
      },
    ],
    explanation:
      "The **scheduler** is the RTOS component that determines which process receives CPU time and when, based on priorities, deadlines, and scheduling policy (e.g. rate-monotonic or earliest-deadline-first). It is central to ensuring that high-priority real-time processes meet their deadlines.",
  },

  {
    id: "ITSEA_W12_Q18",
    type: "open-ended",
    tags: ["UML & modelling"],
    sectionLabel: "4.3",
    text: "What type of model is commonly used to represent state transitions in real-time systems?",
    correctAnswers: [
      "State machine",
      "state machine model",
      "finite state machine",
      "FSM",
      "state diagram",
    ],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 20,
      allowPartialMatch: true,
    },
    explanation:
      "**State machines** (also called finite state machines or state diagrams) model a system as a set of states and the transitions between them triggered by events. They are well-suited to real-time systems because behaviour depends on both the current input *and* the current state — for example, a train behaving differently when `STOPPED` vs `IN_MOTION`.",
      image: {
        src: "/images/ITSEA_W12_Q18.png",
        alt: "UML state machine diagram representing the lifecycle of a passenger entering and completing a train journey.",
        caption: "Autonomous Train Station Entry Process"
        }
  },

  {
    id: "ITSEA_W12_Q19",
    type: "multiple-choice",
    tags: ["system design"],
    sectionLabel: "4.4",
    text: "Engineers determine that obstacle-detection sensors must be checked 20 times per second to ensure safety requirements are met.\n\nWhich timing analysis factor does this represent?",
    options: ["Deadline", "Frequency", "Execution time", "Reliability"],
    correctAnswers: ["Frequency"],
    points: 2,
    explanation:
      "**Frequency** specifies how often a process must execute within a given time period to satisfy its timing requirements. In this case, 20 checks per second (50 ms period) is the frequency requirement for the obstacle-detection process. This is distinct from *deadline* (the latest point by which a single execution must complete) and *execution time* (how long each execution takes).",
  },

  {
    id: "ITSEA_W12_Q20",
    type: "show-answer",
    tags: [
      "systems thinking",
      "risk management",
      "system design",
      "managerial impact",
    ],
    sectionLabel: "4.5",
    text: "A severe thunderstorm causes power fluctuations, communication interruptions, sensor failures, and operator workload increases across AURTS.\n\nUsing concepts from both **Systems Engineering** and **Real-Time Software Engineering**, analyse how the system should be designed to remain effective under these conditions.",
    correctAnswers: [
      {
        text: "The thunderstorm scenario demonstrates why effective systems engineering and real-time engineering must operate together in a unified design approach.\n\n**From a systems engineering perspective**, AURTS is a sociotechnical system involving technical infrastructure, operators, maintenance personnel, emergency services, and organisational policies. Reliability is an emergent property arising from interactions among all components.\n\n- **Hardware reliability** is required to withstand environmental stress — backup power systems and fault-tolerant components reduce the impact of power fluctuations.\n- **Software reliability** ensures correct responses to abnormal conditions, including graceful degradation when sensors fail.\n- **Operator reliability** is equally critical — staff must correctly interpret alarms and execute emergency procedures under high cognitive load.\n\n**From a real-time engineering perspective**, safety-critical functions must continue meeting deadlines despite degraded conditions:\n\n- Emergency braking, obstacle detection, and power-failure responses must receive the **highest scheduling priority**.\n- A real-time operating system should **dynamically allocate resources** and isolate safety-critical processes from non-essential services such as passenger information systems.\n- **Timing analysis** under worst-case conditions must verify that critical deadlines remain achievable even when some processes are unavailable.\n\n**Organisationally**, contingency plans, maintenance procedures, operator training programmes, and emergency communication policies must complement the technical design.\n\nThe most resilient design therefore integrates technical reliability, real-time responsiveness, organisational preparedness, and human competence into a unified sociotechnical solution.",
      },
    ],
    markingGuide: `| Criterion | Marks |\n|---|---|\n| Applies sociotechnical perspective | 2 |\n| Discusses reliability factors (hardware, software, operator) | 2 |\n| Applies real-time concepts (priority, scheduling, timing analysis) | 2 |\n| Integrates organisational considerations | 1 |\n| **Total** | **7** |\n\n**Examiner note:** Distinction-level answers synthesise both chapters. Weak answers discuss either systems engineering or real-time engineering in isolation, not both together.`,
    points: 7,
    image: {
        src: "/images/ITSEA_W12_Q20.png",
        alt: "Fault propagation diagram showing the cascading effects of a severe thunderstorm on an autonomous rail system including power failures, communication delays and sensor failures.",
        caption: "Storm Event Impact on Autonomous Rail Operations"
        }
  },
];