// src/data/questions/ITPMA/week2.js
export default [

  // ── Scenario ─────────────────────────────────────────────────────────
  {
    id: 'SCENARIO_ITPMA_W2',
    type: 'scenario',
    title: 'Questions 1–3: Helios Electronics Group (60 Marks)',
    context: `Helios Electronics Group is a multinational manufacturer of electronic devices operating across South Africa and two other African markets. The company plans to replace fragmented reporting and work-tracking practices with a single enterprise project that will improve coordination across Production, Inventory, Sales, Finance, and Customer Service.

The sponsor believes the project is not merely a technical installation but a change that must be understood in relation to the wider organisation, its business procedures, management structures, and operational manuals. The project will involve department managers, policy makers, top management, a small internal project team, and an external specialist team that works partly off-site.

During early planning, tensions emerged: some managers want rapid delivery with minimal documentation, while others insist on formal reviews, standards, and careful control. The project team must also coordinate across time zones with a distributed group of specialists and decide where agile practices help and where stronger structure is needed.

All questions below relate to Helios Electronics Group unless stated otherwise.`,
  },

  // ── Question 1 — Systems Thinking and Project Life Cycles ───────────

  // 1.1 Multiple-choice
  {
    id: 'ITPMA_W2_Q1',
    type: 'multiple-choice',
    tags: ['systems thinking'],
    sectionLabel: '1.1',
    text: 'The project sponsor says the team must first define the scope of the system, divide it into components, and then identify problems, opportunities, constraints, and needs before choosing a solution. This best describes:',
    options: [
      'A product-innovation workshop',
      'A systems approach to problem solving',
      'A purely functional management review',
      'A procurement-led implementation strategy',
    ],
    correctAnswers: ['A systems approach to problem solving'],
    points: 2,
    image: {
        src: "/images/ITPMA_W2_Q1.png",
        alt: "A systems view diagram showing business, organisation, and technology connected around a project.",
        caption: "Systems thinking in project management."
        },
    explanation: 'The scenario describes defining scope, dividing a system into components, and identifying problems, opportunities, constraints, and needs before designing a solution — the defining sequence of a **systems approach** to problem solving, not general planning or procurement.',
  },

  // 1.2 Open-ended
  {
    id: 'ITPMA_W2_Q2',
    type: 'open-ended',
    tags: ['systems thinking'],
    sectionLabel: '1.2',
    text: 'Name the three spheres of systems management.',
    correctAnswers: [
      'business, organisation, and technology',
      'business, organization, and technology',
    ],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 20,
      requiredTerms: ['business', 'organi', 'technolog'],
      allowPartialMatch: true,
    },
    explanation: 'Systems management must be understood across three interacting spheres: **business**, **organisation**, and **technology**. Leaving out any one of these gives an incomplete picture of the system being managed.',
  },

  // 1.3 Fill-in-the-blank
  {
    id: 'ITPMA_W2_Q3',
    type: 'fill-in-the-blank',
    tags: ['systems thinking', 'project management'],
    sectionLabel: '1.3',
    text: 'The project life cycle is usually a ___ of the product life cycle.',
    blanks: [
      {
        id: 'b1',
        options: ['superset', 'subset', 'duplicate', 'replacement'],
        correctAnswer: 'subset',
      },
    ],
    explanation: 'The project life cycle is usually a **subset** of the broader product life cycle, since many projects exist only to create, update, or improve a product that continues to exist after the project closes.',
  },

  // 1.4 Show-answer (essay)
  {
    id: 'ITPMA_W2_Q4',
    type: 'show-answer',
    tags: ['project management', 'managerial impact'],
    sectionLabel: '1.4',
    text: 'Discuss the four generic phases of the project life cycle that Helios should apply to the enterprise project. For each phase, explain what the team should accomplish and why management review at that point matters.',
    correctAnswers: [
      {
        text: 'The project life cycle for Helios should be treated as a structured sequence of decision and delivery phases.\n\n'
          + 'In **starting the project**, the organisation defines the business need, confirms why the project is necessary, and decides whether the proposed system is worth pursuing. At Helios, this means recognising the harm caused by fragmented reporting and establishing the broad purpose, scope boundaries, and key stakeholders of a centralised enterprise system.\n\n'
          + 'In **organising and preparing**, the team translates the approved idea into a workable plan — refining requirements, defining responsibilities, preparing schedules and resources, and putting controls in place so the project can be managed coherently.\n\n'
          + 'In **carrying out the work**, the project team performs the actual implementation activities: developing, testing, and refining the solution while managing issues and keeping stakeholders informed. Because Helios spans multiple departments, this phase requires careful communication so that no single department\'s needs dominate the others.\n\n'
          + 'In **finishing the project**, deliverables are formally accepted, the project is closed, lessons learnt are recorded, and responsibility is handed over to operations.\n\n'
          + '**Management reviews** act as phase gates at the end of each stage. They confirm whether the project still fits business needs, whether risks remain acceptable, and whether the project should continue, pause, or be corrected. In a cross-functional project like Helios, these reviews are especially valuable because they reduce the chance of scope drift, unresolved interdepartmental conflict, and late discovery of organisational problems.',
      },
    ],
    markingGuide: '| Criterion | Marks |\n'
      + '|---|---|\n'
      + '| Identifies the four phases (starting, organising and preparing, carrying out the work, finishing) | 4 |\n'
      + '| Explains each phase accurately | 6 |\n'
      + '| Explains why management reviews matter (control, accountability, decision gates, risk checking) | 3 |\n'
      + '| Applies answer to the Helios scenario | 1 |\n'
      + '| **Total** | **14** |',
    points: 14,
    image: {
        src: "/images/ITPMA_W2_Q4.png",
        alt: "A clean four-phase project life cycle diagram showing starting the project, organising and preparing, carrying out the work, and finishing the project.",
        caption: "Four generic phases of a project life cycle."
        }
  },

  // ── Question 2 — Organisations, Culture, Stakeholders, and Control ───

  // 2.1 Multiple-choice
  {
    id: 'ITPMA_W2_Q5',
    type: 'multiple-choice',
    tags: ['managerial impact', 'cultural challenges'],
    sectionLabel: '2.1',
    text: 'A department head supports the project in public but quietly blocks access to key staff because the new system may reduce her unit\'s influence. Which organisational frame is most directly being expressed?',
    options: [
      'Structural frame',
      'Human resources frame',
      'Political frame',
      'Symbolic frame',
    ],
    correctAnswers: ['Political frame'],
    points: 2,
    image: {
        src: "/images/ITPMA_W2_Q5.png",
        alt: "A 2x2 organisational frames diagram showing structural, human resources, political, and symbolic frames.",
        caption: "Four organisational frames used to interpret behaviour in organisations."
        },
    explanation: 'Protecting influence, blocking access, and quietly resisting change out of self-interest are classic expressions of the **political frame** — power, turf protection, and internal conflict rather than structure, people development, or symbolism.',
  },

  // 2.2 Open-ended
  {
    id: 'ITPMA_W2_Q6',
    type: 'open-ended',
    tags: ['cultural challenges'],
    sectionLabel: '2.2',
    text: 'Which organisational culture characteristic refers to the degree to which departments are encouraged to coordinate with each other?',
    correctAnswers: ['unit integration'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 15,
    },
    explanation: '**Unit integration** describes the degree to which departments or units within an organisation are encouraged to coordinate their activities with one another, rather than operating as isolated silos.',
  },

  // 2.3 Fill-in-the-blank
  {
    id: 'ITPMA_W2_Q7',
    type: 'fill-in-the-blank',
    tags: ['managerial impact'],
    sectionLabel: '2.3',
    text: 'The degree to which management focuses on outcomes rather than on the techniques and processes used to achieve them is called ___-ends orientation.',
    blanks: [
      {
        id: 'b1',
        options: ['task', 'process', 'function', 'means'],
        correctAnswer: 'means',
      },
    ],
    explanation: '**Means-ends orientation** describes whether management concentrates on the outcomes achieved (the ends) or on the specific techniques and processes used to get there (the means).',
  },

  // 2.4 Show-answer (essay)
  {
    id: 'ITPMA_W2_Q8',
    type: 'show-answer',
    tags: ['managerial impact', 'project management'],
    sectionLabel: '2.4',
    text: 'Helios\' senior executives are debating whether the project should be tightly controlled through standards or allowed to evolve informally. Explain why top management commitment and organisational standards are both critical to the success of this project. In your answer, relate your discussion to departmental politics, project governance, and the need for consistent project practice.',
    correctAnswers: [
      {
        text: '**Top management commitment** is critical because an enterprise project such as Helios\' affects multiple departments, existing routines, and internal power structures. Without visible support from senior leadership, the project will struggle to secure resources, resolve conflicts, and obtain cooperation from departmental managers. Top management does more than approve funding — it gives the project authority, which matters when the project competes with departmental priorities or when staff need to be reassigned to support implementation.\n\n'
          + '**Organisational standards** are equally important because they create consistency. Helios needs standard templates, agreed reporting formats, and common procedures for planning, communication, and status updates. Without standards, each department may manage the project differently, producing confusion, duplicated effort, and poor coordination. Standards reduce dependence on individual preference and help the project team work in a disciplined way — especially important when managers, policy makers, and external specialists must all work together.\n\n'
          + 'The two ideas are connected: top management commitment ensures that standards are enforceable organisational practice rather than optional suggestions, while standards turn management support into day-to-day order. Together they reduce political resistance, improve accountability, and make it easier to manage a complex, cross-functional project. For Helios, this is not simply a technical installation — it is an organisational change effort, and leadership and standards must work together to make it succeed.',
      },
    ],
    markingGuide: '| Criterion | Marks |\n'
      + '|---|---|\n'
      + '| Explains top management commitment (authority, resources, sponsorship, political support) | 4 |\n'
      + '| Explains organisational standards (templates, procedures, consistency, discipline) | 4 |\n'
      + '| Links both to project success (shows how they reinforce one another) | 4 |\n'
      + '| Applies to the Helios cross-functional scenario | 2 |\n'
      + '| **Total** | **14** |',
    points: 14,
  },

  // ── Question 3 — IT Project Context, Diversity, and Delivery Trends ──

  // 3.1 Multiple-choice
  {
    id: 'ITPMA_W2_Q9',
    type: 'multiple-choice',
    tags: ['systems thinking', 'project management'],
    sectionLabel: '3.1',
    text: 'Helios has hardware specialists, database analysts, business analysts, and customer-support representatives on the same project. They often misunderstand one another because they use different technical language. What is the most accurate interpretation of this problem?',
    options: [
      'The team lacks a functional organisational structure',
      'Diverse technologies make communication more difficult',
      'The project does not need stakeholder engagement',
      'The product life cycle has ended',
    ],
    correctAnswers: ['Diverse technologies make communication more difficult'],
    points: 2,
    explanation: 'Specialists from different technical backgrounds using different vocabularies illustrates how **diverse technologies and expertise** make communication harder — not a structural, stakeholder, or life-cycle issue.',
  },

  // 3.2 Open-ended
  {
    id: 'ITPMA_W2_Q10',
    type: 'open-ended',
    tags: ['technological impact'],
    sectionLabel: '3.2',
    text: 'Give one advantage of virtual teams.',
    correctAnswers: [
      'lower costs',
      'reduced costs',
      'access to broader expertise',
      'greater flexibility across time zones',
    ],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 25,
      allowPartialMatch: true,
    },
    explanation: 'Virtual teams offer several advantages, including **lower costs**, access to **broader expertise**, and greater **flexibility** across time zones and geographies.',
  },

  // 3.3 Fill-in-the-blank
  {
    id: 'ITPMA_W2_Q11',
    type: 'fill-in-the-blank',
    tags: ['project management'],
    sectionLabel: '3.3',
    text: 'A group of people who work together despite time and space boundaries using communication technologies is called a ___ team.',
    blanks: [
      {
        id: 'b1',
        options: ['functional', 'virtual', 'matrix', 'cross-departmental'],
        correctAnswer: 'virtual',
      },
    ],
    explanation: 'A **virtual team** works across time and space boundaries, relying on communication technologies rather than physical proximity to coordinate its work.',
  },

  // 3.4 Show-answer (essay)
  {
    id: 'ITPMA_W2_Q12',
    type: 'show-answer',
    tags: ['project management', 'technological impact', 'software processes'],
    sectionLabel: '3.4',
    text: 'Helios is considering outsourcing part of the build, using virtual teams across borders, and adopting agile methods for the rollout. Critically evaluate the advantages and disadvantages of these choices. Your answer should distinguish between why each approach might be selected and what management risks each one introduces.',
    correctAnswers: [
      {
        text: 'Helios is considering three delivery choices that solve different problems: outsourcing, virtual teams, and agile methods.\n\n'
          + '**Outsourcing** may be chosen to access specialised skills, increase delivery capacity, or accelerate parts of the work that the internal team cannot complete quickly enough. It can improve efficiency and reduce pressure on internal resources. However, it introduces dependence on external providers, potential communication gaps, reduced direct control, and the risk that the external team may not fully understand Helios\' internal business context. Outsourcing should be selected for **capability and scale**, not merely because it appears cheaper.\n\n'
          + '**Virtual teams** are suitable because Helios operates across countries and time zones. They can reduce travel costs, broaden access to expertise, and increase flexibility by allowing work to continue beyond a single physical office. However, they can create isolation, reduce informal knowledge sharing, and make trust-building harder, while increasing reliance on technology and the fragility of coordination if communication practices are weak.\n\n'
          + '**Agile** is useful when requirements are likely to evolve and when the organisation needs regular feedback from users. For Helios, agile can help the team deliver increments, learn from stakeholders, and adapt the solution as understanding improves. Agile is not a substitute for discipline — it still requires clear priorities, active participation, and strong team coordination, and can be misused if the organisation expects it to remove the need for planning altogether.\n\n'
          + 'The best management response is to choose these approaches deliberately and for different reasons: outsourcing addresses capability gaps, virtual teams address geography and access to expertise, and agile addresses uncertainty and the need for adaptation. Each is a tool with different strengths and risks, not a competing slogan.',
      },
    ],
    markingGuide: '| Criterion | Marks |\n'
      + '|---|---|\n'
      + '| Explains outsourcing clearly (benefits and risks) | 4 |\n'
      + '| Explains virtual teams clearly (advantages and disadvantages) | 4 |\n'
      + '| Explains agile clearly (why it suits evolving work, plus limitations) | 4 |\n'
      + '| Provides comparative judgement (why each approach is selected for a different reason) | 2 |\n'
      + '| **Total** | **14** |',
    points: 14,
    image: {
        src: "/images/ITPMA_W2_Q12.png",
        alt: "A comparison table for outsourcing, virtual teams, and agile, with columns for option, main benefit, and main risk.",
        caption: "Comparing delivery choices in a cross-border project."
        }
  },
];