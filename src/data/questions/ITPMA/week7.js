// src/data/questions/ITPMA/week7.js
// ITPMA2 — Week 7 Summative Practice Examination
// Project Stakeholder Management (60 marks)
export default [

  // ── Scenario ─────────────────────────────────────────────────────────
  {
    id: 'SCENARIO_ITPMA_W7',
    type: 'scenario',
    title: 'Questions 1–4: The CareLink Implementation Project (60 Marks)',
    context: `CareLink Health Group operates a network of hospitals and outpatient clinics. The organisation has approved a project to introduce a new digital patient-service platform across its hospitals.

The platform is intended to improve coordination between departments, provide patients with more consistent information, and support staff in accessing information required during routine patient-service activities.

The project involves the central management team, hospital managers, IT staff, administrative employees, clinicians, patients, an external software supplier, and government officials who may be affected by aspects of the project.

The project sponsor, Dr. Maya Singh, strongly supports the project because she believes it will improve the organisation's ability to serve patients.

The project manager, Daniel Mokoena, has discovered that different stakeholders have very different expectations.

Some hospital managers actively support the project and regularly participate in project meetings. Several administrative employees know about the project but are concerned that the new system will disrupt established procedures. One senior clinician has heard about the project but has not yet expressed an opinion. Some patients are not yet aware that the project is taking place.

The external software supplier is enthusiastic about the project and frequently proposes ideas for implementation. However, the supplier's recommendations do not always align with the needs expressed by hospital staff.

The IT department is supportive but is already responsible for several other projects. Senior management wants the project completed quickly and expects problems that could affect the schedule to be raised promptly.

During the first project meeting, Daniel notices that some stakeholders are speaking frequently while others remain silent. A disagreement also develops between the IT manager and a hospital administrator concerning how much the existing procedures should change.

Daniel decides that simply communicating the same information to everyone will not be sufficient. He begins identifying the stakeholders more carefully, recording their requirements and expectations, considering their roles and influence, and determining how each relationship should be managed.

As the project progresses, Daniel intends to monitor stakeholder relationships and change the engagement approach where necessary.`,
  },

  // ═══════════════════════════════════════════════════════════════════
  // QUESTION 1 — IDENTIFYING STAKEHOLDERS (15 marks)
  // ═══════════════════════════════════════════════════════════════════

  {
    id: 'ITPMA_W7_Q1',
    type: 'multiple-choice',
    tags: ['stakeholder management'],
    sectionLabel: '1.1',
    text: 'Daniel discovers that the external software supplier has an important role in the project, while several patients may be affected by the final system even though they have no direct role in developing it. Which statement BEST explains why both groups should be considered when identifying stakeholders?',
    options: [
      'Only people who make project decisions are stakeholders, so patients should be excluded unless they approve project decisions',
      'Stakeholders include people involved in the project as well as people who may be affected by the project or its outcomes',
      'Only internal employees and external suppliers are stakeholders because they directly contribute resources to the project',
      'Patients should be considered stakeholders only after the project has been completed and its outcomes can be measured',
    ],
    correctAnswers: ['Stakeholders include people involved in the project as well as people who may be affected by the project or its outcomes'],
    points: 2,
    explanation: 'The distinction being tested is between **participation in the project** and **being affected by the project**. A stakeholder does not have to be a project decision-maker.',
  },

  {
    id: 'ITPMA_W7_Q2',
    type: 'open-ended',
    tags: ['stakeholder management'],
    sectionLabel: '1.2',
    text: 'Daniel records the name, position, location, project role and contact information of each important stakeholder. What is this collection of information called?',
    correctAnswers: ['Stakeholder register'],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 15,
    },
    explanation: 'A **stakeholder register** contains basic identification, assessment and classification information about project stakeholders.',
  },

  {
    id: 'ITPMA_W7_Q3',
    type: 'fill-in-the-blank',
    tags: ['stakeholder management'],
    sectionLabel: '1.3',
    text: "Daniel also records each stakeholder's major requirements and expectations, potential influence, and the project phases in which the stakeholder has the greatest interest. This is the ___ information contained in a stakeholder register.",
    blanks: [
      {
        id: 'b1',
        options: ['identification', 'classification', 'communication', 'assessment', 'engagement'],
        correctAnswer: 'assessment',
      },
    ],
    explanation: '**Assessment information** in a stakeholder register covers requirements, expectations, influence and project-phase interest — distinct from identification and classification information.',
  },

  {
    id: 'ITPMA_W7_Q4',
    type: 'multiple-choice',
    tags: ['stakeholder management'],
    sectionLabel: '1.4',
    text: 'Which stakeholder would MOST clearly represent an external stakeholder in the CareLink project?',
    options: [
      'The IT manager responsible for implementing the platform',
      'The hospital administrator responsible for existing procedures',
      'The external software supplier providing the platform',
      'The senior manager responsible for approving project decisions',
    ],
    correctAnswers: ['The external software supplier providing the platform'],
    points: 2,
    explanation: 'Internal stakeholders (sponsor, project team, internal staff) are distinguished from external stakeholders such as suppliers, customers and government bodies. The software supplier is external to CareLink.',
  },

  {
    id: 'ITPMA_W7_Q5',
    type: 'open-ended',
    tags: ['stakeholder management'],
    sectionLabel: '1.5',
    text: "A senior clinician knows about the project but has neither expressed support nor opposition. Using the engagement terminology taught in this week, identify the clinician's current engagement level.",
    correctAnswers: ['Neutral'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 10,
    },
    // Q1.5 — Stakeholder Engagement Continuum
    image: {
      src: "/images/ITPMA_W7_Q1.5.png",
      alt: "Stakeholder engagement continuum showing the five levels from Unaware to Leading.",
      caption: "Stakeholder engagement levels: Unaware, Resistant, Neutral, Supportive, and Leading."
    },
    explanation: '**Neutral** describes a stakeholder who is aware of the project but has expressed neither support nor opposition. This differs from *Unaware*, since the clinician already knows about the project.',
  },

  {
    id: 'ITPMA_W7_Q6',
    type: 'show-answer',
    sectionLabel: '1.6',
    text: 'Daniel initially believes that identifying the most obvious stakeholders will be sufficient. You disagree. Explain why stakeholder identification in the CareLink project should extend beyond the project team and sponsor. Identify **FOUR** categories or examples of stakeholders that Daniel should consider and explain why each could matter to the project.',
    correctAnswers: [
      'Stakeholder identification should extend beyond the project team and sponsor because a stakeholder may either **participate directly** in the project or be **affected by** the project\'s work or outcomes. Failing to identify such stakeholders can result in their requirements, expectations or concerns being overlooked.\n\n'
      + 'Four relevant stakeholder groups include:\n\n'
      + '1. **Project sponsor and senior management** — They influence project decisions and organisational priorities and may determine whether the project receives continued support and resources.\n'
      + '2. **Project team and IT staff** — They are directly involved in implementing the project and therefore have practical knowledge of technical requirements, constraints and implementation issues.\n'
      + '3. **Hospital staff and managers** — They are internal stakeholders who may use the new system or have their existing procedures changed. Their expectations and concerns therefore need to be understood.\n'
      + '4. **Patients** — They may be external stakeholders who are affected by the project\'s outcomes even though they are not involved in implementing it. Their needs therefore remain relevant to stakeholder identification.\n\n'
      + 'Other valid examples include the **external software supplier, government officials, customers, competitors, suppliers, support staff, functional managers, other project managers, or concerned citizens**, where justified by the scenario.',
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Explains that stakeholders include people involved **or affected** by the project | 2 |
| Correctly identifies relevant stakeholder 1 + explanation | 1 |
| Correctly identifies relevant stakeholder 2 + explanation | 1 |
| Correctly identifies relevant stakeholder 3 + explanation | 1 |
| Correctly identifies relevant stakeholder 4 + explanation | 1 |
| **Total** | **6** |

**Note:** A response that simply lists four stakeholders without explaining *why* they matter should not receive full marks. The underlying principle — people involved in **or** affected by the project — must be stated and applied.`,
    points: 6,
    // Q1.6 — CareLink Stakeholder Landscape
image: {
  src: "/images/ITPMA_W7_Q1.6.png",
  alt: "Stakeholder landscape for the CareLink digital patient-service project showing internal and external stakeholder groups.",
  caption: "CareLink stakeholder landscape showing internal and external stakeholders surrounding the project."
}
  },

  // ═══════════════════════════════════════════════════════════════════
  // QUESTION 2 — PLANNING STAKEHOLDER ENGAGEMENT (15 marks)
  // ═══════════════════════════════════════════════════════════════════

  {
    id: 'ITPMA_W7_Q7',
    type: 'scenario',
    title: 'Question 2: Planning Stakeholder Engagement (15 Marks)',
    context: `After identifying the stakeholders, Daniel begins determining how each relationship should be handled. The following information has been collected:

Dr. Singh (Sponsor) — Strongly supports the project and actively participates
IT Manager — Supports the project but has limited availability
Hospital Administrator — Aware of the project but strongly concerned about changes to existing procedures
Senior Clinician — Knows about the project but has expressed neither support nor opposition
Patients — Many have not yet heard about the project
Software Supplier — Enthusiastic and frequently proposes implementation ideas`,
  },

  {
    id: 'ITPMA_W7_Q8',
    type: 'multiple-choice',
    tags: ['stakeholder management'],
    sectionLabel: '2.1',
    text: 'Which action BEST represents planning stakeholder engagement?',
    options: [
      'Waiting until stakeholders raise complaints and then responding to each complaint individually',
      'Determining strategies for engaging stakeholders based on their needs, interests and potential impact',
      'Recording completed stakeholder interactions after each project meeting',
      'Replacing stakeholders who do not immediately support the project',
    ],
    correctAnswers: ['Determining strategies for engaging stakeholders based on their needs, interests and potential impact'],
    points: 2,
    explanation: 'Planning stakeholder engagement is a **proactive** activity, not a reactive response to complaints.',
  },

  {
    id: 'ITPMA_W7_Q9',
    type: 'fill-in-the-blank',
    tags: ['stakeholder management'],
    sectionLabel: '2.2',
    text: "Daniel's stakeholder management plan should record the stakeholder's current and ___ engagement level.",
    blanks: [
      {
        id: 'b1',
        options: ['desired', 'previous', 'estimated', 'reported'],
        correctAnswer: 'desired',
      },
    ],
    explanation: 'The stakeholder management plan documents both **current** and **desired** engagement levels, identifying where engagement needs to change.',
  },

  {
    id: 'ITPMA_W7_Q10',
    type: 'multiple-choice',
    tags: ['stakeholder management'],
    sectionLabel: '2.3',
    text: 'Daniel wants to decide how much attention should be given to different stakeholders. Which approach is MOST consistent with the supplied course material?',
    options: [
      'Use exactly the same engagement strategy for every stakeholder to ensure fairness',
      'Develop potential management strategies for individual stakeholders while considering their communication requirements and relationships with other stakeholders',
      'Focus exclusively on stakeholders who support the project because resistant stakeholders are unlikely to change',
      'Attempt to make every stakeholder a leading stakeholder',
    ],
    correctAnswers: ['Develop potential management strategies for individual stakeholders while considering their communication requirements and relationships with other stakeholders'],
    points: 2,
    explanation: 'Effective stakeholder management is **differentiated** — strategies are tailored to each stakeholder rather than applied uniformly.',
  },

  {
    id: 'ITPMA_W7_Q11',
    type: 'open-ended',
    tags: ['stakeholder management'],
    sectionLabel: '2.4',
    text: "What document records stakeholder requirements, expectations, influence and project interest?",
    correctAnswers: ['Stakeholder register'],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 15,
    },
  },

  {
    id: 'ITPMA_W7_Q12',
    type: 'multiple-choice',
    tags: ['stakeholder management'],
    sectionLabel: '2.5',
    text: "The hospital administrator is aware of the project but is concerned that established procedures will be disrupted. Daniel's immediate objective is to understand the administrator's concerns and develop an appropriate engagement strategy. Which response is MOST appropriate?",
    options: [
      'Ignore the administrator because resistance indicates that the stakeholder is not interested in the project\'s success',
      'Give the administrator exactly the same communication provided to all other stakeholders',
      "Consider the administrator's expectations and concerns when determining an appropriate stakeholder engagement strategy",
      'Remove the administrator from project discussions until the project is sufficiently advanced',
    ],
    correctAnswers: ["Consider the administrator's expectations and concerns when determining an appropriate stakeholder engagement strategy"],
    points: 3,
    explanation: 'Resistance provides information about stakeholder expectations — it is not grounds for exclusion.',
  },

  {
    id: 'ITPMA_W7_Q13',
    type: 'show-answer',
    sectionLabel: '2.6',
    text: 'Using the CareLink scenario, explain how Daniel should develop a stakeholder management plan. Your answer must address: current and desired engagement levels; communication requirements; stakeholder interrelationships; management strategies; and why the plan should be appropriate to the individual stakeholder rather than identical for everyone.',
    correctAnswers: [
      'Daniel should first use the stakeholder information already collected to determine each stakeholder\'s **current and desired engagement level**. This provides a basis for identifying where engagement needs to change.\n\n'
      + 'For example, the hospital administrator may currently be **resistant**, while the project may require the administrator to become **supportive**. The senior clinician may currently be **neutral**, while the project may only require that stakeholder to become supportive or appropriately involved. Patients who are unaware of the project may require an initial engagement strategy that makes them aware of relevant project information.\n\n'
      + 'The stakeholder management plan should also document **communication requirements**, including what information stakeholders require and how communication should support productive engagement. It should consider **interrelationships between stakeholders**, because the actions or expectations of one stakeholder can affect another.\n\n'
      + 'Daniel should determine **potential management strategies for each stakeholder** rather than using one identical approach. Stakeholders have different needs, expectations, interests and potential influence. For example, the IT manager may require focused communication because of limited availability, while the hospital administrator may require greater attention to concerns about changes to existing procedures.\n\n'
      + 'The plan should also include a method for **updating the plan**, because stakeholder relationships and engagement can change during the project.',
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Current and desired engagement levels explained and applied | 1 |
| Communication requirements explained | 1 |
| Interrelationships explained | 1 |
| Management strategies explained and differentiated | 2 |
| Need to update/revise the plan explained | 1 |
| **Total** | **6** |

**Note:** Merely listing the five planning elements without connecting them to CareLink stakeholders should not receive more than 3/6.`,
    points: 6,
    // Q2.6 — Stakeholder Management Plan
image: {
  src: "/images/ITPMA_W7_Q2.6.png",
  alt: "Stakeholder management planning table showing stakeholders and fields for current engagement, desired engagement, communication requirements, interrelationships, and management strategy.",
  caption: "Stakeholder management planning framework for the CareLink project."
},
  },

  // ═══════════════════════════════════════════════════════════════════
  // QUESTION 3 — MANAGING STAKEHOLDER ENGAGEMENT (15 marks)
  // ═══════════════════════════════════════════════════════════════════

  {
    id: 'ITPMA_W7_Q14',
    type: 'scenario',
    title: 'Question 3: Managing Stakeholder Engagement (15 Marks)',
    context: `Several weeks into the project, the disagreement between the IT manager and hospital administrator becomes more serious.

The administrator argues that the proposed system will disrupt established procedures. The IT manager argues that the existing procedures are preventing the project from achieving its objectives.

Daniel realises that both stakeholders have legitimate concerns, but the disagreement is beginning to affect project decisions.`,
  },

  {
    id: 'ITPMA_W7_Q15',
    type: 'multiple-choice',
    tags: ['stakeholder management'],
    sectionLabel: '3.1',
    text: 'Which action BEST represents managing stakeholder engagement?',
    options: [
      'Communicating and working with stakeholders to address their needs and expectations while resolving issues and encouraging participation',
      'Monitoring stakeholder relationships without directly interacting with stakeholders',
      'Identifying stakeholders for the first time after the conflict has occurred',
      "Updating only the project's technical documentation",
    ],
    correctAnswers: ['Communicating and working with stakeholders to address their needs and expectations while resolving issues and encouraging participation'],
    points: 2,
  },

  {
    id: 'ITPMA_W7_Q16',
    type: 'open-ended',
    tags: ['stakeholder management'],
    sectionLabel: '3.2',
    text: 'Daniel needs a tool for documenting, monitoring and tracking the disagreement until it is resolved. What should he use?',
    correctAnswers: ['Issue log'],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 15,
    },
    explanation: 'An **issue log** documents, monitors and tracks issues requiring resolution.',
  },

  {
    id: 'ITPMA_W7_Q17',
    type: 'fill-in-the-blank',
    tags: ['stakeholder management'],
    sectionLabel: '3.3',
    text: 'Unresolved stakeholder issues can become a major source of ___ and can result in stakeholder expectations not being met.',
    blanks: [
      {
        id: 'b1',
        options: [ 'documentation', 'planning','conflict', 'budgeting'],
        correctAnswer: 'conflict',
      },
    ],
  },

  {
    id: 'ITPMA_W7_Q18',
    type: 'multiple-choice',
    tags: ['stakeholder management'],
    sectionLabel: '3.4',
    text: "The project sponsor has made it clear that meeting the project's schedule is particularly important. A problem emerges that may cause the project to miss its completion date. What should Daniel do?",
    options: [
      'Avoid informing the sponsor because discussing problems may reduce stakeholder confidence',
      'Alert the project sponsor because the issue may affect an important schedule goal',
      'Wait until the project deadline has passed before discussing the problem',
      'Allow the IT manager to decide whether the sponsor should be informed',
    ],
    correctAnswers: ['Alert the project sponsor because the issue may affect an important schedule goal'],
    points: 2,
    explanation: 'Issues affecting a stakeholder priority — here, schedule — should be escalated promptly to that stakeholder.',
  },

  {
    id: 'ITPMA_W7_Q19',
    type: 'multiple-choice',
    tags: ['stakeholder management'],
    sectionLabel: '3.5',
    text: 'Daniel wants to improve the discussion between the IT manager and hospital administrator. Which principle BEST reflects effective stakeholder engagement?',
    options: [
      'Stakeholder engagement should primarily consist of distributing project documents',
      'Engagement involves dialogue in which people seek understanding and solutions to issues of mutual concern',
      'Stakeholders should be prevented from challenging project decisions',
      'Stakeholders should only be consulted after technical decisions have already been finalised',
    ],
    correctAnswers: ['Engagement involves dialogue in which people seek understanding and solutions to issues of mutual concern'],
    points: 2,
    explanation: 'Effective engagement is **dialogue**, not one-way distribution of documents.',
  },

  {
    id: 'ITPMA_W7_Q20',
    type: 'show-answer',
    sectionLabel: '3.6',
    text: "The conflict between the IT manager and hospital administrator cannot be solved simply by telling one stakeholder to accept the other's position. Explain how Daniel should manage this stakeholder relationship. Your answer should integrate stakeholder expectations, communication/interpersonal skills, issue management and the idea of project success.",
    correctAnswers: [
      'Daniel should first seek to understand the **expectations and concerns of both stakeholders** rather than treating the disagreement as a problem caused by one individual. The hospital administrator is concerned about disruption to established procedures, while the IT manager is concerned that existing procedures may prevent the project from achieving its objectives.\n\n'
      + 'Daniel should use appropriate **communication and interpersonal skills** to establish dialogue between the stakeholders and encourage them to seek a mutually acceptable solution. He should ensure that the disagreement is not simply ignored, because unresolved issues can become a major source of conflict and can result in stakeholder expectations not being met.\n\n'
      + 'The disagreement should also be **documented and tracked using an issue log** so that the issue remains visible and its resolution can be monitored.\n\n'
      + 'Daniel should consider the project\'s different measures of success. **Scope, time and cost** are common measures, while practitioners often also place substantial emphasis on satisfying the customer or sponsor. Therefore, Daniel should not automatically prioritise one stakeholder\'s preference simply because it is technically convenient. He should consider which requirements are most important to the project\'s objectives and stakeholder expectations.\n\n'
      + 'Effective management therefore requires communication, understanding of expectations, resolution of the underlying issue and continued attention to whether the chosen solution supports the project\'s success.',
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Identifies and considers stakeholder expectations | 1 |
| Applies communication/interpersonal skills | 1 |
| Explains engagement as dialogue | 1 |
| Correctly applies issue-log concept | 1 |
| Explains consequences of unresolved issues/conflict | 1 |
| Connects resolution to project success / scope-time-cost or sponsor/customer satisfaction | 1 |
| **Total** | **6** |`,
    points: 6,
    // Q3.6 — Stakeholder Conflict
    image: {
      src: "/images/ITPMA_W7_Q3.6.png",
      alt: "CareLink stakeholder conflict diagram showing competing expectations between the IT Manager and Hospital Administrator and the Project Manager positioned between them.",
      caption: "Stakeholder conflict arising from competing expectations within the CareLink project."
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // QUESTION 4 — MONITORING STAKEHOLDER ENGAGEMENT (15 marks)
  // ═══════════════════════════════════════════════════════════════════

  {
    id: 'ITPMA_W7_Q21',
    type: 'scenario',
    title: 'Question 4: Monitoring Stakeholder Engagement (15 Marks)',
    context: `Three months later, the CareLink project has changed considerably.

The IT manager is now actively participating in project decisions. The hospital administrator has become more supportive after several concerns were addressed. However, a new group of administrative employees has become concerned about the project after hearing informal discussions about changes to their work.

The project team has also begun working in shorter development cycles. The product owner is responsible for deciding what should receive priority in each iteration.

Daniel therefore reviews the stakeholder situation again rather than assuming that the original stakeholder analysis remains correct.`,
  },

  {
    id: 'ITPMA_W7_Q22',
    type: 'multiple-choice',
    tags: ['stakeholder management'],
    sectionLabel: '4.1',
    text: 'Which statement BEST describes monitoring stakeholder engagement?',
    options: [
      'Ensuring that every stakeholder remains at exactly the same engagement level throughout the project',
      'Monitoring stakeholder relationships and adjusting engagement plans and strategies when necessary',
      'Identifying stakeholders only once at project initiation',
      'Measuring only whether stakeholders attend project meetings',
    ],
    correctAnswers: ['Monitoring stakeholder relationships and adjusting engagement plans and strategies when necessary'],
    points: 2,
  },

  {
    id: 'ITPMA_W7_Q23',
    type: 'open-ended',
    tags: ['stakeholder management'],
    sectionLabel: '4.2',
    text: 'Which engagement level describes a stakeholder who actively helps ensure project success?',
    correctAnswers: ['Leading'],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 10,
    },
  },

  {
    id: 'ITPMA_W7_Q24',
    type: 'fill-in-the-blank',
    tags: ['stakeholder management'],
    sectionLabel: '4.3',
    text: 'The five engagement levels taught in this module are Unaware, Resistant, Neutral, Supportive and ___.',
    blanks: [
      {
        id: 'b1',
        options: ['Active', 'Leading', 'Committed', 'Dominant'],
        correctAnswer: 'Leading',
      },
    ],
  },

  {
    id: 'ITPMA_W7_Q25',
    type: 'multiple-choice',
    tags: ['stakeholder management'],
    sectionLabel: '4.4',
    text: 'The new group of administrative employees has become concerned about the project, even though they were not previously considered a significant engagement issue. What is the BEST response?',
    options: [
      'Continue using the original stakeholder management plan because changing it may create inconsistency',
      'Monitor the changed relationship and adjust the stakeholder engagement strategy as necessary',
      'Remove the employees from the stakeholder list because they were not important at project initiation',
      'Treat the employees as leading stakeholders because they are now discussing the project',
    ],
    correctAnswers: ['Monitor the changed relationship and adjust the stakeholder engagement strategy as necessary'],
    points: 3,
    // Q4.4 — Changing Stakeholder Engagement
    image: {
      src: "/images/ITPMA_W7_Q4.4.png",
      alt: "Comparison of CareLink stakeholder engagement levels at the beginning of the project and three months later.",
      caption: "Changes in stakeholder engagement over the course of the CareLink project."
    },
    explanation: 'Monitoring is an **ongoing** activity — new or changing stakeholder concerns require the engagement strategy to be reassessed, not ignored or over-corrected.',
  },

  {
    id: 'ITPMA_W7_Q26',
    type: 'multiple-choice',
    tags: ['stakeholder management'],
    sectionLabel: '4.5',
    text: 'The CareLink project begins using an agile/adaptive approach. Which statement is MOST consistent with the course material?',
    options: [
      'Agile projects require less stakeholder involvement because development occurs in short iterations',
      'Agile projects often require greater stakeholder involvement and faster decision-making',
      'Stakeholder engagement becomes unnecessary because the product owner makes all decisions',
      'Stakeholder engagement should only occur after all iterations have been completed',
    ],
    correctAnswers: ['Agile projects often require greater stakeholder involvement and faster decision-making'],
    points: 2,
    explanation: 'Agile/adaptive projects often require **more** stakeholder involvement and **faster** decision-making; the product owner creates the backlog each iteration so priorities stay clear.',
  },

  {
    id: 'ITPMA_W7_Q27',
    type: 'show-answer',
    sectionLabel: '4.6',
    text: 'Explain how Daniel should monitor stakeholder engagement throughout the remainder of the CareLink project. Your answer must explain why monitoring is an ongoing activity and should include the implications of the project\'s move toward an agile/adaptive environment.',
    correctAnswers: [
      'Daniel should continuously monitor stakeholder relationships because stakeholder engagement can change as the project, its circumstances and stakeholder expectations change. Monitoring is not simply checking whether people attend meetings; it involves assessing relationships and determining whether the existing engagement strategies remain effective.\n\n'
      + "For example, the hospital administrator's engagement has changed from resistance toward greater support, while a new group of administrative employees has become concerned. Daniel should therefore review the engagement situation and **adjust stakeholder engagement plans and strategies where necessary**.\n\n"
      + 'In an agile/adaptive environment, stakeholder involvement can become even more important because such projects often require **greater stakeholder involvement and faster decision-making**. The product owner creates the backlog for each iteration, helping ensure that stakeholder or organisational priorities are clear.\n\n'
      + 'Daniel should therefore continue creating opportunities for meaningful stakeholder involvement, monitor changing expectations and relationships, and revise engagement strategies as the project develops.',
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Explains monitoring as ongoing | 1 |
| Recognises changing stakeholder relationships/engagement | 1 |
| Explains adjustment of engagement plans/strategies | 1 |
| Correctly explains greater stakeholder involvement in agile/adaptive projects | 1 |
| Correctly explains faster decision-making / iteration priorities | 1 |
| **Total** | **5** |`,
    points: 5,
    // Q4.6 — Agile/Adaptive Stakeholder Involvement
    image: {
      src: "/images/ITPMA_W7_Q4.6.png",
      alt: "Iterative CareLink project cycle showing backlog priorities, iteration, review and stakeholder feedback.",
      caption: "Iterative stakeholder involvement and feedback in an agile or adaptive project."
    }
  },
];