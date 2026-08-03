// src/data/questions/ITPMA/week1.js
export default [

  // ───────────────────────────────────────────────────────────
  // Scenario — introduces Questions 1–4
  // ───────────────────────────────────────────────────────────
  {
    id: 'SCENARIO_ITPMA_W1',
    type: 'scenario',
    title: 'Questions 1–4: Ubuntu Digital Healthcare Initiative (100 Marks)',
    context: `The South African Department of Health has launched the **Ubuntu Digital Healthcare Initiative**, a nationwide programme intended to modernise healthcare delivery by integrating public hospitals, clinics, pharmacies and laboratories through a single digital platform.

The initiative includes several related projects, including:
• Developing a national patient registration system
• Implementing an electronic medical records system
• Deploying hospital networking infrastructure
• Introducing an online appointment booking platform
• Training healthcare professionals on the new technologies

The Department appointed a project manager to oversee the implementation of the patient registration system. Throughout the first six months, several challenges emerged:
• Different provincial hospitals requested additional functionality after development had begun
• Treasury reduced the available budget midway through implementation
• Several senior hospital administrators questioned the project's value despite positive technical progress
• Different departments disagreed over priorities and resource allocation
• Engineers continued refining requirements as they learned more about hospital workflows
• The Department must determine whether the initiative has been successful and how future digital projects should be managed

Unless otherwise stated, answer all questions with reference to the Ubuntu Digital Healthcare Initiative.`,
  },

  // ═══════════════════════════════════════════════════════════
  // QUESTION 1 — Understanding Projects and Project Management (25 Marks)
  // ═══════════════════════════════════════════════════════════

  // 1.1 MCQ
  {
    id: 'ITPMA_W1_Q1',
    type: 'multiple-choice',
    sectionLabel: '1.1',
    tags: ['project management'],
    text: 'Which characteristic most clearly distinguishes the patient registration implementation from the daily administrative work already performed by hospital staff?',
    options: [
      'It requires financial resources',
      'It is performed by employees',
      'It is temporary and produces a unique result',
      'It supports organisational objectives',
    ],
    correctAnswers: ['It is temporary and produces a unique result'],
    points: 2,
    explanation: 'A project is defined as a **temporary endeavour** undertaken to create a unique product, service, or result. The patient registration implementation has a defined beginning and end and a unique deliverable, whereas routine hospital administration continues indefinitely and represents **operations**, not a project. Financial resources, employees, and support for organisational objectives are all shared by both projects and operations, so they do not distinguish the two.',
  },

  // 1.2 Essay
  {
    id: 'ITPMA_W1_Q2',
    type: 'show-answer',
    sectionLabel: '1.2',
    text: 'Using the Ubuntu Digital Healthcare Initiative, critically analyse **FOUR project attributes** and explain how each attribute influences the way the project should be planned and managed.',
    correctAnswers: [
      {
        text: 'A project possesses several defining characteristics that influence both planning and execution.\n\n'
          + '**1. Temporary Nature**\n\nThe Ubuntu Digital Healthcare Initiative exists only until the patient registration system has been implemented and formally accepted, with a clearly defined beginning and end. *Management implication:* planning must include initiation, execution, monitoring, and closure — resources cannot be assumed to remain indefinitely available.\n\n'
          + '**2. Unique Purpose**\n\nAlthough hospitals already register patients, the project creates an entirely new integrated national registration platform, making the deliverable unique. *Management implication:* uniqueness introduces uncertainty because previous experience cannot simply be copied, requiring careful planning, stakeholder consultation, and iterative refinement.\n\n'
          + '**3. Progressive Elaboration**\n\nAs hospitals provide additional information, requirements become clearer over time. *Management implication:* project plans cannot remain static — schedules, scope, and resource allocation must evolve as understanding improves while maintaining formal change control.\n\n'
          + '**4. Uncertainty**\n\nLarge government IT projects involve numerous unknowns, including changing regulations, budget reductions, technology risks, and stakeholder disagreement. *Management implication:* the project manager must continuously identify, monitor, and respond to uncertainty instead of assuming the original plan will remain accurate.\n\n'
          + '**Critical evaluation:** these attributes do not exist independently — progressive elaboration is largely a consequence of uncertainty, while uniqueness increases both planning complexity and stakeholder involvement. Successful project management therefore requires balancing structured planning with sufficient flexibility to accommodate change without losing control of project objectives.',
      },
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Correct identification of four attributes | 4 |
| Appropriate explanation | 2 |
| Application to scenario | 1 |
| Critical evaluation linking attributes | 1 |
| **Total** | **8** |

**Examiner note:** excellent answers apply every attribute directly to the scenario and explain *why* it matters rather than reproducing textbook definitions.`,
    points: 8,
    image: {
        src: "/images/ITPMA_W1_Q2.png",
        alt: "Executive project lifecycle timeline for the Ubuntu Digital Healthcare Initiative showing five project phases and major project milestones across an 18-month implementation schedule.",
        caption: "Figure 1. Project timeline for the Ubuntu Digital Healthcare Initiative. Review the timeline and milestone events before answering the questions."
        }
  },

  // 1.3 Fill in the blank
  {
    id: 'ITPMA_W1_Q3',
    type: 'fill-in-the-blank',
    sectionLabel: '1.3',
    tags: ['project management', 'requirements analysis'],
    text: 'The process of continually refining project plans and requirements as additional information becomes available is known as ___.',
    blanks: [
      {
        id: 'b1',
        options: ['Scope creep', 'Progressive elaboration', 'Portfolio management', 'Change control'],
        correctAnswer: 'Progressive elaboration',
      },
    ],
  },

  // 1.4 Short factual (list) — show-answer
  {
    id: 'ITPMA_W1_Q4',
    type: 'show-answer',
    sectionLabel: '1.4',
    text: 'State the three components of the traditional **triple constraint**.',
    correctAnswers: [
      { text: 'The traditional triple constraint consists of **Scope**, **Time (Schedule)**, and **Cost**. These three variables constrain every project, and changing one usually affects at least one of the others.' },
    ],
    markingGuide: `| Component | Marks |
|---|---|
| Scope | 1 |
| Time (Schedule) | 1 |
| Cost | 1 |
| **Total** | **2** |

Do not award marks for quality, stakeholders, or risk — these influence projects but are not part of the traditional triple constraint.`,
    points: 2,
  },

  // 1.5 MCQ
  {
    id: 'ITPMA_W1_Q5',
    type: 'multiple-choice',
    sectionLabel: '1.5',
    tags: ['project management', 'requirements analysis'],
    text: 'Hospital administrators request several new reporting features after development has already begun. Which project attribute best explains why these requests may legitimately influence planning?',
    options: [
      'Temporary nature',
      'Progressive elaboration',
      'Primary sponsorship',
      'Organisational structure',
    ],
    correctAnswers: ['Progressive elaboration'],
    points: 2,
    explanation: 'Progressive elaboration explains why project plans evolve as understanding improves — the requests from provincial hospitals may represent legitimate clarification rather than project failure. Temporary nature concerns duration, sponsors provide authority and funding, and organisational structure influences governance, but none of these explain evolving requirements.',
  },

  // 1.6 Essay
  {
    id: 'ITPMA_W1_Q6',
    type: 'show-answer',
    sectionLabel: '1.6',
    text: 'Treasury reduced the project budget while insisting that the original completion date be maintained. Critically evaluate how this decision affects the project\'s triple constraints and discuss the role of the project manager in balancing these competing demands.',
    correctAnswers: [
      {
        text: 'Reducing the project budget while maintaining the original completion date significantly affects the project\'s triple constraints.\n\n'
          + 'First, reduced funding limits the resources available for implementation. If the completion date remains fixed, fewer financial resources must achieve the same amount of work, forcing the project manager to make difficult decisions regarding staffing, procurement, and prioritisation.\n\n'
          + 'Second, maintaining both scope and schedule despite reduced cost increases project risk. Without adjustment, quality may decline or team burnout may occur. The project manager should therefore negotiate realistic trade-offs with stakeholders rather than attempting to satisfy incompatible objectives.\n\n'
          + 'Possible responses include prioritising essential functionality, reallocating resources, improving scheduling efficiency, or requesting revised scope where appropriate. Effective project management requires balancing competing constraints rather than optimising only one.',
      },
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Explains effect on cost | 1 |
| Explains relationship with schedule | 1 |
| Explains impact on scope | 1 |
| Discusses managerial role | 2 |
| Critical evaluation | 1 |
| **Total** | **6** |

**Examiner note:** high-distinction answers explicitly explain the *interdependency* between constraints rather than discussing each one separately.`,
    points: 6,
    image: {
        src: "/images/ITPMA_W1_Q1.6.png",
        alt: "Project management triple constraint triangle labelled Scope, Cost and Time with executive change notices relating to budget reductions, unchanged deadlines and additional requirements.",
        caption: "Figure 2. Executive summary illustrating key project constraints affecting the healthcare system implementation."
        }
  },

  // 1.7 Short factual (list) — show-answer
  {
    id: 'ITPMA_W1_Q7',
    type: 'show-answer',
    sectionLabel: '1.7',
    text: 'Name **THREE** examples of Information Technology projects other than the patient registration system.',
    correctAnswers: [
      { text: 'Any three realistic IT projects that are temporary and produce a unique deliverable, for example: a mobile banking application, a hospital information system, a cloud migration project, a national vaccination database, an enterprise resource planning implementation, a university learning management system, a cybersecurity upgrade, or a smart traffic management system.' },
    ],
    markingGuide: `| Example | Marks |
|---|---|
| Example 1 | 1 |
| Example 2 | 1 |
| Example 3 | 1 |
| **Total** | **3** |

Award marks for any realistic IT project demonstrating uniqueness, temporary duration, and an identifiable deliverable. Do **not** award marks for operational activities such as "answering helpdesk calls" or "daily database backups."`,
    points: 3,
  },

  // ═══════════════════════════════════════════════════════════
  // Scenario — introduces Question 2
  // ═══════════════════════════════════════════════════════════
  {
    id: 'SCENARIO_ITPMA_W1_Q2',
    type: 'scenario',
    title: 'Questions 2: Project Success, Stakeholders and Knowledge Areas (25 Marks)',
    context: `Following deployment, the patient registration system was delivered **two months late** and **8% over budget**, but:
• waiting times decreased by 45%
• patient records became accessible nationally
• hospital staff expressed high satisfaction
• the Department approved expansion to all provinces`,
  },

  // 2.1 Essay
  {
    id: 'ITPMA_W1_Q8',
    type: 'show-answer',
    sectionLabel: '2.1',
    text: 'Critically evaluate whether the Ubuntu Digital Healthcare Initiative should be regarded as a successful project. Support your answer using recognised project success criteria.',
    correctAnswers: [
      {
        text: 'Project success should not be evaluated solely against the traditional triple constraint of **scope, time and cost**. While these remain important measures of project performance, modern project management recognises that success also depends on whether the project delivers business value and satisfies stakeholders.\n\n'
          + 'From a traditional perspective, the project underperformed because it exceeded both its planned duration and allocated budget, indicating weaknesses in planning, estimating, or project control.\n\n'
          + 'However, the project achieved several strategic outcomes: waiting times decreased significantly, a nationally integrated patient record system was successfully introduced, healthcare professionals expressed high satisfaction, and government approved national rollout — demonstrating confidence that the project generated organisational value.\n\n'
          + 'A balanced evaluation therefore concludes that although project management performance regarding cost and schedule requires improvement, the initiative itself should be regarded as successful because it achieved its intended organisational objectives. This illustrates the distinction between **project management success** (delivering within constraints) and **project success** (delivering organisational value).',
      },
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Recognises traditional success measures | 2 |
| Explains limitations of triple constraint | 1 |
| Evaluates organisational benefits | 2 |
| Applies discussion to scenario | 2 |
| Balanced critical conclusion | 1 |
| **Total** | **8** |`,
    points: 8,
    image: {
        src: "/images/ITPMA_W1_Q2.1.png",
        alt: "Executive project performance dashboard displaying budget, schedule, stakeholder satisfaction, service availability, patient waiting time and rollout progress for the Ubuntu Digital Healthcare Initiative.",
        caption: "Figure 3. Monthly project performance dashboard presented to the Digital Healthcare Steering Committee."
        }
  },

  // 2.2 MCQ
  {
    id: 'ITPMA_W1_Q9',
    type: 'multiple-choice',
    sectionLabel: '2.2',
    tags: ['project management'],
    text: 'Which statement best reflects the modern understanding of project success?',
    options: [
      'A project is successful only if completed within budget',
      'Success depends solely on satisfying the project sponsor',
      'Success includes meeting objectives while satisfying stakeholders and delivering organisational value',
      'Technical completion alone determines project success',
    ],
    correctAnswers: ['Success includes meeting objectives while satisfying stakeholders and delivering organisational value'],
    points: 2,
    explanation: 'Current project management theory recognises that success extends beyond delivering on time and within budget. Projects exist to generate value — if the organisation achieves strategic objectives and stakeholders benefit, the project may still be regarded as successful despite minor deviations from schedule or budget.',
  },

  // 2.3 Fill in the blank
  {
    id: 'ITPMA_W1_Q10',
    type: 'fill-in-the-blank',
    sectionLabel: '2.3',
    tags: ['project management'],
    text: 'Individuals or organisations who are involved in, affected by, or capable of influencing a project are known as ___.',
    blanks: [
      {
        id: 'b1',
        options: ['Sponsors', 'Contractors', 'Stakeholders', 'Regulators'],
        correctAnswer: 'Stakeholders',
      },
    ],
  },

  // 2.4 Short factual (list) — show-answer
  {
    id: 'ITPMA_W1_Q11',
    type: 'show-answer',
    sectionLabel: '2.4',
    text: 'Name **THREE** stakeholder groups that would be involved in the Ubuntu Digital Healthcare Initiative.',
    correctAnswers: [
      { text: 'Any three legitimate stakeholder groups, for example: the Department of Health, the project sponsor, the project manager, provincial hospitals, doctors, nurses, patients, IT developers, system administrators, government regulators, Treasury, software vendors, or contractors.' },
    ],
    markingGuide: `| Stakeholder | Marks |
|---|---|
| First | 1 |
| Second | 1 |
| Third | 1 |
| **Total** | **3** |

Award marks for any legitimate stakeholder group demonstrating involvement or influence. Do not award marks for generic answers such as "employees" unless contextualised.`,
    points: 3,
  },

  // 2.5 Essay
  {
    id: 'ITPMA_W1_Q12',
    type: 'show-answer',
    sectionLabel: '2.5',
    text: 'Several provincial hospitals disagree on implementation priorities. Analyse why effective stakeholder management is essential for project success and explain how poor stakeholder engagement could contribute to project failure.',
    correctAnswers: [
      {
        text: 'Stakeholder management is fundamental because projects are implemented for people rather than technology alone. Different provincial hospitals possess different operational requirements, priorities, and expectations. Without structured stakeholder engagement, these competing interests may create conflict that delays decision-making and reduces commitment to the project.\n\n'
          + 'Effective stakeholder management enables the project manager to identify stakeholder expectations, communicate project objectives clearly, negotiate competing priorities, resolve conflicts before they escalate, and maintain organisational support throughout the project lifecycle.\n\n'
          + 'Poor stakeholder engagement may lead to resistance to organisational change, misunderstandings regarding project scope, delayed approvals, conflicting requirements, reduced user acceptance, and ultimately project failure despite technical success.\n\n'
          + 'The Ubuntu Digital Healthcare Initiative demonstrates that successful implementation depends not only on software quality but also on managing relationships between diverse stakeholder groups — stakeholder management therefore represents both a communication and leadership responsibility rather than a purely administrative activity.',
      },
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Explains stakeholder importance | 2 |
| Analyses consequences of poor engagement | 2 |
| Applies to scenario | 1 |
| Critical evaluation | 1 |
| **Total** | **6** |`,
    points: 6,
    image: {
        src: "/images/ITPMA_W1_Q2.5.png",
        alt: "Stakeholder power-interest matrix plotting government executives, healthcare professionals, patients, vendors, developers and regulatory authorities according to their organisational influence and interest.",
        caption: "Figure 4. Stakeholder analysis prepared during governance planning for the Ubuntu Digital Healthcare Initiative."
        }
  },

  // 2.6 MCQ
  {
    id: 'ITPMA_W1_Q13',
    type: 'multiple-choice',
    sectionLabel: '2.6',
    tags: ['project management', 'systems thinking'],
    text: 'Which Project Management Knowledge Area would primarily focus on ensuring that all components of the project work together as a coordinated whole?',
    options: [
      'Resource Management',
      'Integration Management',
      'Risk Management',
      'Procurement Management',
    ],
    correctAnswers: ['Integration Management'],
    points: 2,
    explanation: 'Integration Management coordinates every component of the project into a unified whole, ensuring planning, execution, monitoring, and change management remain aligned throughout the project. Resource Management concerns people and equipment, Risk Management identifies and responds to uncertainty, and Procurement Management concerns purchasing goods and services.',
  },

  // 2.7 Short factual (list) — show-answer
  {
    id: 'ITPMA_W1_Q14',
    type: 'show-answer',
    sectionLabel: '2.7',
    text: 'Name **TWO** Project Management Knowledge Areas concerned primarily with communication and relationships rather than technical delivery.',
    correctAnswers: [
      { text: 'The preferred answers are **Communications Management** and **Stakeholder Management**, since these knowledge areas focus primarily on managing interactions between people rather than producing technical deliverables.' },
    ],
    markingGuide: `| Knowledge Area | Marks |
|---|---|
| First | 1 |
| Second | 1 |
| **Total** | **2** |`,
    points: 2,
  },

  // ═══════════════════════════════════════════════════════════
  // Scenario — introduces Question 3
  // ═══════════════════════════════════════════════════════════
  {
    id: 'SCENARIO_ITPMA_W1_Q3',
    type: 'scenario',
    title: 'Question 3: Programmes, Portfolios and Organisational Project Management (25 Marks)',
    context: `The Department of Health decides that the patient registration project should become part of a larger national digital transformation initiative that also includes pharmacy systems, emergency response platforms, hospital infrastructure upgrades, and staff training.`,
  },

  // 3.1 Essay
  {
    id: 'ITPMA_W1_Q15',
    type: 'show-answer',
    sectionLabel: '3.1',
    text: 'Differentiate clearly between a **project**, a **programme**, and a **project portfolio** using examples from the Ubuntu Digital Healthcare Initiative.',
    correctAnswers: [
      {
        text: '**Project:** A project is a temporary endeavour undertaken to create a unique product, service, or result. The implementation of the **National Patient Registration System** is a project because it has clearly defined objectives, a fixed beginning and end, allocated resources, and unique deliverables. Its primary objective is to successfully deliver one specific system.\n\n'
          + '**Programme:** A programme consists of multiple related projects managed together to achieve benefits that could not be realised if the projects were managed independently. The Department of Health manages several projects simultaneously — the National Patient Registration System, Electronic Medical Records, Hospital Network Infrastructure, Online Appointment Booking, and Staff Training — each contributing toward the common objective of modernising South Africa\'s healthcare delivery. Managing these collectively enables better coordination of resources, schedules, and organisational change.\n\n'
          + '**Portfolio:** A portfolio represents the organisation\'s entire collection of projects and programmes, whether related or unrelated, selected to achieve strategic business objectives. For the Department of Health, the Digital Healthcare Programme may form only one component of a broader government portfolio that also includes Digital Education, Smart Border Management, National Treasury Systems, and Police Modernisation. Unlike programmes, portfolio projects do not need to be related — their common characteristic is strategic alignment with organisational objectives.\n\n'
          + '**Critical evaluation:** the distinction lies primarily in *purpose* rather than size. Projects focus on **delivery**, programmes focus on **benefits**, and portfolios focus on **strategic investment**. Confusing these levels often leads organisations to optimise individual projects while failing to maximise overall organisational value.',
        diagram: {
          type: 'mermaid',
          code: `graph TD
    A[Department of Health Portfolio]
    A --> B[Digital Healthcare Programme]
    B --> C[Patient Registration Project]
    B --> D[Electronic Records Project]
    B --> E[Hospital Networking Project]
    B --> F[Appointment Booking Project]
    B --> G[Staff Training Project]
    A --> H[Digital Education Programme]
    A --> I[Border Management Programme]`,
        },
      },
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Defines project | 1 |
| Defines programme | 1 |
| Defines portfolio | 1 |
| Applies examples | 2 |
| Compares concepts | 2 |
| Critical evaluation | 1 |
| **Total** | **8** |

**Examiner note:** excellent candidates distinguish *purpose*, not merely *size*. Many weaker students incorrectly state that a programme is simply "a bigger project."`,
    points: 8,
    image: {
        src: "/images/ITPMA_W1_Q3.1.png",
        alt: "Hierarchical organisational diagram showing a Department of Health strategic portfolio containing multiple programmes and several digital healthcare projects beneath the Digital Healthcare Modernisation programme.",
        caption: "Figure 5. Organisational hierarchy showing the relationship between strategic portfolios, programmes and projects."
        }
  },

  // 3.2 MCQ
  {
    id: 'ITPMA_W1_Q16',
    type: 'multiple-choice',
    sectionLabel: '3.2',
    tags: ['project management', 'systems thinking'],
    text: 'Which management approach is primarily responsible for selecting projects that best support organisational strategy?',
    options: [
      'Project Management',
      'Programme Management',
      'Portfolio Management',
      'Resource Management',
    ],
    correctAnswers: ['Portfolio Management'],
    points: 2,
    explanation: 'Portfolio Management ensures organisational resources are invested in projects that best support strategic objectives, answering questions such as which projects should be funded, cancelled, or produce the greatest organisational value. Project Management concerns delivery of one project, Programme Management coordinates related projects, and Resource Management allocates people and equipment.',
  },

  // 3.3 Fill in the blank
  {
    id: 'ITPMA_W1_Q17',
    type: 'fill-in-the-blank',
    sectionLabel: '3.3',
    tags: ['project management', 'systems thinking'],
    text: 'Managing related projects together in order to obtain benefits unavailable from managing them individually is known as ___.',
    blanks: [
      {
        id: 'b1',
        options: ['Programme Management', 'Portfolio Management', 'Organisational Project Management', 'Resource Management'],
        correctAnswer: 'Programme Management',
      },
    ],
  },

  // 3.4 Short factual (list) — show-answer
  {
    id: 'ITPMA_W1_Q18',
    type: 'show-answer',
    sectionLabel: '3.4',
    text: 'State **THREE** responsibilities typically performed by a programme manager.',
    correctAnswers: [
      { text: 'Any three of: coordinating related projects, resolving inter-project conflicts, allocating shared resources, monitoring programme benefits, aligning projects with programme objectives, managing programme risks, reporting programme performance, or coordinating project managers.' },
    ],
    markingGuide: `| Responsibility | Marks |
|---|---|
| First | 1 |
| Second | 1 |
| Third | 1 |
| **Total** | **3** |

Award marks only where responsibilities clearly occur above individual project level.`,
    points: 3,
  },

  // 3.5 Essay
  {
    id: 'ITPMA_W1_Q19',
    type: 'show-answer',
    sectionLabel: '3.5',
    text: 'Critically analyse why a national digital healthcare initiative should be managed as a programme rather than as several completely independent projects.',
    correctAnswers: [
      {
        text: 'The Ubuntu Digital Healthcare Initiative consists of multiple interdependent projects that collectively support a single strategic objective. Managing these independently would create significant coordination challenges.\n\n'
          + 'Firstly, projects share resources such as technical specialists, funding, and infrastructure — programme management enables coordinated resource allocation, reducing duplication and improving efficiency.\n\n'
          + 'Secondly, project outcomes depend on one another. For example, the Appointment Booking System relies on the successful implementation of the National Patient Registration System. Independent management could result in incompatible schedules, duplicated effort, or technical integration problems.\n\n'
          + 'Programme management also provides centralised governance — shared risks, organisational change initiatives, and stakeholder communication can be managed consistently across all projects. Most importantly, programme management focuses on delivering **business benefits**, whereas individual project management focuses primarily on delivering specific outputs.\n\n'
          + 'Therefore, managing the initiative as a programme maximises organisational value while improving coordination, governance, and benefit realisation.',
      },
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Explains shared objectives | 1 |
| Discusses coordination | 2 |
| Discusses benefits | 1 |
| Applies scenario | 1 |
| Critical evaluation | 1 |
| **Total** | **6** |`,
    points: 6,
  },

  // 3.6 MCQ
  {
    id: 'ITPMA_W1_Q20',
    type: 'multiple-choice',
    sectionLabel: '3.6',
    tags: ['project management', 'systems thinking'],
    text: 'Organisational Project Management primarily aims to:',
    options: [
      'Eliminate project managers',
      'Integrate portfolios, programmes and projects to achieve organisational strategy',
      'Replace traditional project planning',
      'Reduce stakeholder involvement',
    ],
    correctAnswers: ['Integrate portfolios, programmes and projects to achieve organisational strategy'],
    points: 2,
    explanation: 'Organisational Project Management integrates projects, programmes, and portfolios to achieve organisational strategy, providing governance across every management level. Project managers remain essential, OPM complements rather than replaces planning, and stakeholder involvement becomes more important, not less.',
  },

  // 3.7 Short factual — open-ended
  {
    id: 'ITPMA_W1_Q21',
    type: 'open-ended',
    sectionLabel: '3.7',
    tags: ['project management', 'systems thinking'],
    text: 'Name the management approach responsible for evaluating projects as organisational investments before they are approved.',
    correctAnswers: ['Portfolio Management'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    explanation: 'Portfolio Management evaluates competing investments to maximise organisational strategy and return on investment.',
  },

  // ═══════════════════════════════════════════════════════════
  // Scenario — introduces Question 4
  // ═══════════════════════════════════════════════════════════
  {
    id: 'SCENARIO_ITPMA_W1_Q4',
    type: 'scenario',
    title: 'Question 4: Project Managers, Leadership, Professionalism and Ethics (25 Marks)',
    context: `During implementation, conflict develops between technical specialists, hospital managers, and provincial administrators. Some engineers believe only technical expertise matters, while hospital executives argue communication and leadership are equally important.

At the same time, a vendor offers the project manager an expensive overseas conference trip in exchange for favourable procurement decisions.`,
  },

  // 4.1 Essay
  {
    id: 'ITPMA_W1_Q22',
    type: 'show-answer',
    sectionLabel: '4.1',
    text: 'Critically evaluate the role of the project manager in balancing technical expertise, leadership and stakeholder expectations throughout the Ubuntu Digital Healthcare Initiative.',
    correctAnswers: [
      {
        text: 'A project manager is responsible not only for technical coordination but also for integrating people, processes, and organisational objectives to achieve project success.\n\n'
          + 'From a technical perspective, the project manager oversees planning, scheduling, budgeting, risk management, and quality assurance to ensure the patient registration system is delivered effectively. However, technical competence alone is insufficient for large public-sector IT initiatives.\n\n'
          + 'Leadership is equally important. The project manager must motivate multidisciplinary teams, resolve conflict between provincial hospitals, communicate a shared vision, and facilitate collaboration across diverse stakeholder groups. Strong interpersonal skills improve trust and reduce resistance to organisational change.\n\n'
          + 'Stakeholder management represents another critical responsibility. Different groups — including government officials, healthcare professionals, patients, and software developers — have competing priorities, and the project manager must negotiate these interests while maintaining alignment with project objectives.\n\n'
          + 'Ultimately, successful project managers balance technical knowledge with leadership, communication, and ethical decision-making. Projects rarely fail because of technology alone; they more commonly fail due to ineffective leadership, poor communication, and inadequate stakeholder engagement.',
      },
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Technical responsibilities | 2 |
| Leadership discussion | 2 |
| Stakeholder discussion | 2 |
| Critical evaluation | 2 |
| **Total** | **8** |`,
    points: 8,
  },

  // 4.2 MCQ
  {
    id: 'ITPMA_W1_Q23',
    type: 'multiple-choice',
    sectionLabel: '4.2',
    tags: ['project management'],
    text: 'Which leadership style is primarily focused on developing individuals through coaching and improving their long-term performance?',
    options: [
      'Commanding',
      'Pacesetting',
      'Coaching',
      'Democratic',
    ],
    correctAnswers: ['Coaching'],
    points: 2,
    explanation: 'A coaching leadership style develops individuals by improving capability, confidence, and long-term performance rather than focusing only on immediate task completion. Commanding prioritises control and rapid decision-making, pacesetting focuses on high performance through example, and democratic encourages participation but does not specifically emphasise individual development.',
  },

  // 4.3 Fill in the blank
  {
    id: 'ITPMA_W1_Q24',
    type: 'fill-in-the-blank',
    sectionLabel: '4.3',
    tags: ['project management'],
    text: 'The professional organisation responsible for administering the internationally recognised PMP® certification is the ___.',
    blanks: [
      {
        id: 'b1',
        options: ['International Organization for Standardization (ISO)', 'PRINCE2 Foundation', 'Agile Alliance', 'Project Management Institute (PMI)'],
        correctAnswer: 'Project Management Institute (PMI)',
      },
    ],
  },

  // 4.4 Short factual (list) — show-answer
  {
    id: 'ITPMA_W1_Q25',
    type: 'show-answer',
    sectionLabel: '4.4',
    text: 'Name **THREE** components of the PMI Talent Triangle.',
    correctAnswers: [
      { text: 'The three components of the **PMI Talent Triangle** are **Ways of Working**, **Power Skills**, and **Business Acumen**, reflecting that successful project managers require technical capability, interpersonal competence, and business understanding.' },
    ],
    markingGuide: `| Component | Marks |
|---|---|
| Ways of Working | 1 |
| Power Skills | 1 |
| Business Acumen | 1 |
| **Total** | **3** |`,
    points: 3,
  },

  // 4.5 Essay
  {
    id: 'ITPMA_W1_Q26',
    type: 'show-answer',
    sectionLabel: '4.5',
    text: 'Analyse the ethical issues raised by the vendor\'s offer. Discuss how professional ethics contribute to maintaining public trust in large government IT projects.',
    correctAnswers: [
      {
        text: 'Accepting gifts or incentives from vendors during procurement creates an actual or perceived conflict of interest. Even if the project manager remains impartial, public confidence in procurement decisions may be undermined.\n\n'
          + 'Professional ethics require project managers to act with honesty, fairness, responsibility, and transparency. Decisions should be based solely on objective project criteria rather than personal benefit.\n\n'
          + 'The appropriate response would be to decline the offer, disclose the incident according to organisational policy, and ensure procurement decisions remain transparent and auditable.\n\n'
          + 'Ethical conduct is particularly important in government IT projects because public funds are involved and procurement decisions must withstand public scrutiny. Maintaining professional ethics protects organisational reputation, promotes stakeholder trust, and supports fair competition among vendors.',
      },
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Identifies ethical issue | 2 |
| Applies ethical principles | 2 |
| Justifies importance | 2 |
| **Total** | **6** |

**Examiner note:** students should discuss *conflict of interest*, not bribery alone — ethics includes avoiding situations that create even the appearance of bias.`,
    points: 6,
  },

  // 4.6 MCQ
  {
    id: 'ITPMA_W1_Q27',
    type: 'multiple-choice',
    sectionLabel: '4.6',
    tags: ['project management'],
    text: 'Which leadership style would be **most appropriate** when the project requires team members to participate actively in reaching a shared decision?',
    options: [
      'Commanding',
      'Democratic',
      'Pacesetting',
      'Visionary',
    ],
    correctAnswers: ['Democratic'],
    points: 2,
    explanation: 'Democratic leadership encourages participation in decision-making and is appropriate where team collaboration improves the quality of decisions. Commanding is useful during crises requiring rapid decisions, pacesetting is appropriate for highly experienced teams but may reduce collaboration, and visionary provides direction rather than shared decision-making.',
  },

  // 4.7 Short factual — open-ended
  {
    id: 'ITPMA_W1_Q28',
    type: 'open-ended',
    sectionLabel: '4.7',
    tags: ['project management'],
    text: 'Name the internationally recognised project management certification awarded by the Project Management Institute.',
    correctAnswers: ['Project Management Professional (PMP)', 'PMP', 'Project Management Professional'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      allowPartialMatch: true,
    },
    explanation: 'The **PMP** credential is PMI\'s internationally recognised certification demonstrating competence in project management.',
  },

];