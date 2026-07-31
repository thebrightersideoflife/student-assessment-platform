// src/data/questions/ITPMA/week3.js

export default [

  // ══════════════════════════════════════════════════════════════
  // QUESTION 1 — Project Initiation and the Case for Change (20 Marks)
  // ══════════════════════════════════════════════════════════════

  {
    id: 'SCENARIO_ITPMA_W3_Q1',
    type: 'scenario',
    title: 'Question 1: Project Initiation and the Case for Change (20 Marks)',
    context: `**Apex Manufacturing Group** operates five production facilities across South Africa. Its production, inventory and customer-service departments currently use separate systems and spreadsheets.

Senior management has approved an initiative called **Project Nexus** to create an integrated IT platform that will provide managers with a single view of production information, inventory information and customer-service information.

However, the project has not yet started formally.

During a preliminary meeting, the Chief Executive Officer asks:

*"Why do we need another project? We already have systems in every department."*

The proposed project manager discovers that:

• the existing systems do not communicate effectively;
• managers frequently reconcile information manually;
• some departments use different versions of the same information;
• senior management wants the project to support organisational objectives;
• the project sponsor has not yet formally authorised the project;
• several stakeholders have strong opinions about what the new system should provide.`,
  },

  {
    id: 'ITPMA_W3_Q1',
    type: 'multiple-choice',
    tags: ['project initiation', 'project management', 'stakeholder identification'],
    sectionLabel: '1.1',
    text: 'Which activity would be the **strongest immediate priority** before Apex commits substantial resources to Project Nexus?',
    options: [
      'Begin developing the software so that management can see a working system.',
      'Establish why the project should exist, identify the relevant stakeholders and formally authorise the project.',
      'Create detailed sprint backlogs for every department before speaking to users.',
      'Begin testing the existing departmental systems against one another.',
    ],
    correctAnswers: ['Establish why the project should exist, identify the relevant stakeholders and formally authorise the project.'],
    points: 2,
    explanation: 'Project Nexus is still at the point where its justification, stakeholders and formal authorisation must be established. Beginning execution before these foundations are in place risks committing resources to an inadequately defined or unjustified project.',
  },

  {
    id: 'ITPMA_W3_Q2',
    type: 'open-ended',
    tags: ['project management', 'process groups'],
    sectionLabel: '1.2',
    text: 'What process group formally defines and authorises a project?',
    correctAnswers: ['Initiating'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    explanation: 'The **Initiating** process group formally establishes and authorises the project and identifies its initial stakeholders.',
  },

  {
    id: 'ITPMA_W3_Q3',
    type: 'fill-in-the-blank',
    tags: ['project management', 'project charter'],
    sectionLabel: '1.3',
    text: 'The document that formally authorises a project and provides a basis for proceeding with it is the project ___.',
    blanks: [
      {
        id: 'b1',
        options: ['plan', 'business case', 'charter', 'scope statement'],
        correctAnswer: 'charter',
      },
    ],
    points: 2,
    explanation: 'The **project charter** formally authorises the project and provides the basis for proceeding, distinct from the business case which justifies it.',
  },

  {
    id: 'ITPMA_W3_Q4',
    type: 'multiple-choice',
    tags: ['strategic planning', 'project management'],
    sectionLabel: '1.4',
    text: 'The project manager is asked why strategic planning matters before Project Nexus proceeds. Which answer demonstrates the **best understanding** of its purpose?',
    options: [
      'Strategic planning determines the exact programming language that developers must use.',
      'Strategic planning ensures that the organisation selects projects for appropriate business reasons and aligns them with its vision, goals and strategies.',
      'Strategic planning replaces the need for project planning once the project has been authorised.',
      'Strategic planning is primarily used to determine which Scrum ceremony should occur first.',
    ],
    correctAnswers: ['Strategic planning ensures that the organisation selects projects for appropriate business reasons and aligns them with its vision, goals and strategies.'],
    points: 2,
    explanation: 'Strategic planning provides the basis for deciding which projects are worth pursuing and how they support the organisation\'s broader direction — organisational alignment, not technical implementation.',
  },

  {
    id: 'ITPMA_W3_Q5',
    type: 'show-answer',
    tags: ['project initiation', 'feasibility study', 'stakeholder identification'],
    sectionLabel: '1.5',
    text: 'Senior management argues that because the organisation has already identified the need for an integrated system, the project manager should immediately move into execution.\n\n**Critically evaluate this argument.**\n\nIn your answer, explain what should happen before substantial project execution begins and why these activities reduce the likelihood of the wrong project being pursued or the right project being poorly defined.',
    correctAnswers: [
      'The argument is premature because identifying a business problem does not automatically mean that the organisation is ready to commit substantial resources to execution.\n\n' +
      'Before execution begins, Apex should establish the **business justification and feasibility** of the proposed project, identify relevant stakeholders, clarify initial scope and constraints, appoint an appropriate project manager, and formally authorise the project. The initiating process should establish sufficient agreement about why Project Nexus exists, what it is intended to achieve, who has authority and who will be affected.\n\n' +
      'These activities matter because the organisation could otherwise invest heavily in a technically attractive system that does not adequately address the underlying business problem. Apex still needs to establish what organisational outcomes the proposed solution should produce and whether the project is technically, economically and operationally appropriate.\n\n' +
      'Stakeholder identification is also important because Production, Inventory, Sales and Customer Service may have conflicting expectations. If those expectations are not understood early, the project may encounter major disagreements later when scope, requirements and deliverables have already become expensive to change.\n\n' +
      'Therefore, execution should follow sufficient initiation and planning rather than simply follow recognition of a problem. The purpose is not to delay the project unnecessarily, but to ensure Apex is **doing the right project and has an appropriate basis for doing it successfully**.',
    ],
    markingGuide: '| Criterion | Marks |\n|---|---|\n| Recognises that immediate execution is inappropriate | 1 |\n| Identifies initiation/authorisation activities | 1 |\n| Addresses business justification/feasibility | 1 |\n| Addresses stakeholder identification/alignment | 1 |\n| Explains consequences of inadequate preparation | 1 |\n| Integrates ideas into a scenario-specific critical judgement | 1 |\n| **Total** | **6** |',
    points: 6,
    explanation: 'The trap in this question is treating "we know what we want" as equivalent to "the project is ready for execution." A strong answer distinguishes organisational justification, authorisation and stakeholder identification from later planning and execution.',
  },

  {
    id: 'ITPMA_W3_Q6',
    type: 'multiple-choice',
    tags: ['project initiation', 'project management'],
    sectionLabel: '1.6',
    text: 'A senior manager proposes splitting Project Nexus into three smaller projects because the proposed initiative has become too broad to manage effectively.\n\nWhich statement is **most accurate**?',
    options: [
      'Splitting a project is never appropriate because one project should always produce one integrated result.',
      'Dividing a proposed project into smaller projects can be considered during pre-initiation when doing so makes the initiative more manageable.',
      'Splitting a project is exclusively a Scrum activity.',
      'Splitting a project should only occur after the closing process group.',
    ],
    correctAnswers: ['Dividing a proposed project into smaller projects can be considered during pre-initiation when doing so makes the initiative more manageable.'],
    points: 2,
    explanation: 'Determining whether a proposed project should be divided into two or more smaller projects is explicitly a pre-initiation consideration.',
  },

  {
    id: 'ITPMA_W3_Q7',
    type: 'open-ended',
    tags: ['project sponsor', 'project management'],
    sectionLabel: '1.7',
    text: 'What role provides senior-level support for a project and is identified during project pre-initiation?',
    correctAnswers: ['Project sponsor', 'Sponsor'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
      allowPartialMatch: true,
    },
    explanation: 'The **project sponsor** provides senior-level support and authority for the project.',
  },

  {
    id: 'ITPMA_W3_Q8',
    type: 'fill-in-the-blank',
    tags: ['business case', 'feasibility study'],
    sectionLabel: '1.8',
    text: 'A preliminary justification for undertaking a project is called a business ___.',
    blanks: [
      {
        id: 'b1',
        options: ['plan', 'case', 'charter', 'proposal'],
        correctAnswer: 'case',
      },
    ],
    points: 2,
    explanation: 'The distinction between **business case** and **project charter** is important: the former supports justification; the latter formally authorises the project.',
  },

  // ══════════════════════════════════════════════════════════════
  // QUESTION 2 — Choosing and Applying a Project Management Methodology (20 Marks)
  // ══════════════════════════════════════════════════════════════

  {
    id: 'SCENARIO_ITPMA_W3_Q2',
    type: 'scenario',
    title: 'Question 2: Choosing and Applying a Project Management Methodology (20 Marks)',
    context: `Apex now has approval to investigate Project Nexus.

The project team faces an important decision. The production department wants a comprehensive system specification before development begins. However, the customer-service department says that users are unsure what functionality they actually need and would prefer to see working functionality early.

The project manager considers four methodologies:

• PRINCE2
• Rational Unified Process (RUP)
• Agile
• Six Sigma

The project manager also notes that the organisation already has a general project-management training programme, but managers are uncertain how those general skills should be tailored to Apex's particular needs.`,
  },

  {
    id: 'ITPMA_W3_Q9',
    type: 'multiple-choice',
    tags: ['agile', 'methodology selection', 'requirements analysis'],
    sectionLabel: '2.1',
    text: 'Which methodology is the **best initial fit** for the customer-service portion of Project Nexus if users cannot clearly express the complete scope early but want usable functionality sooner?',
    options: [
      'Agile',
      'Six Sigma',
      'PRINCE2',
      'A methodology that prevents iterative delivery',
    ],
    correctAnswers: ['Agile'],
    points: 2,
    explanation: 'Uncertain requirements combined with a desire to deliver usable functionality earlier are the conditions specifically associated with the suitability of Agile approaches.',
  },

  {
    id: 'ITPMA_W3_Q10',
    type: 'fill-in-the-blank',
    tags: ['project management', 'methodology'],
    sectionLabel: '2.2',
    text: 'A project management ___ describes how project-management activities should be performed, whereas a standard describes what should be done.',
    blanks: [
      {
        id: 'b1',
        options: ['standard', 'framework', 'methodology', 'process'],
        correctAnswer: 'methodology',
      },
    ],
    points: 2,
    explanation: 'A methodology describes **how** project-management activities should be performed, as opposed to a standard, which describes what should be done.',
  },

  {
    id: 'ITPMA_W3_Q11',
    type: 'multiple-choice',
    tags: ['methodology', 'project management'],
    sectionLabel: '2.3',
    text: 'Why might Apex need an organisational IT project-management methodology even though its managers have already received general project-management training?',
    options: [
      'General training automatically determines the exact processes every organisation must use.',
      'A methodology helps tailor project-management practices to the organisation\'s particular needs.',
      'Methodologies eliminate the need for project managers to understand organisational requirements.',
      'Methodologies are used only after a project has been closed.',
    ],
    correctAnswers: ['A methodology helps tailor project-management practices to the organisation\'s particular needs.'],
    points: 2,
    explanation: 'General project-management knowledge does not automatically define how a particular organisation should perform project work; a methodology provides an organisationally appropriate way of doing so.',
  },

  {
    id: 'ITPMA_W3_Q12',
    type: 'open-ended',
    tags: ['prince2', 'methodology'],
    sectionLabel: '2.4',
    text: 'Which methodology was originally developed for IT projects and released as a generic project-management methodology by the UK?',
    correctAnswers: ['PRINCE2'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    explanation: 'PRINCE2 was developed in the UK and subsequently released as a generic project-management methodology.',
  },

  {
    id: 'ITPMA_W3_Q13',
    type: 'multiple-choice',
    tags: ['agile', 'incremental delivery'],
    sectionLabel: '2.5',
    text: 'The customer-service department proposes delivering a useful subset of the system every few weeks rather than waiting until the entire project is complete.\n\nWhich underlying Agile idea does this proposal best demonstrate?',
    options: [
      'Delivering several usable increments rather than waiting for one final product.',
      'Eliminating the need for planning.',
      'Preventing stakeholders from changing requirements.',
      'Completing all requirements before any development begins.',
    ],
    correctAnswers: ['Delivering several usable increments rather than waiting for one final product.'],
    points: 2,
    explanation: 'The important concept is incremental delivery: useful functionality is delivered during iterations rather than withheld until the complete system is finished.',
  },

  {
    id: 'ITPMA_W3_Q14',
    type: 'show-answer',
    tags: ['agile', 'methodology selection', 'requirements analysis'],
    sectionLabel: '2.6',
    text: 'The production manager argues:\n\n*"Agile means we do not know what we are doing. A proper project must have everything specified before development begins."*\n\nUsing the Apex scenario, **evaluate this argument**.\n\nYour answer must distinguish between situations in which an Agile approach is useful and the mistaken assumption that Agile means the project has no structure or planning.',
    correctAnswers: [
      'The production manager\'s argument incorrectly assumes that Agile means the absence of planning or structure.\n\n' +
      'Agile is appropriate when the complete scope cannot be clearly expressed at the beginning of the product life cycle and when stakeholders benefit from receiving potentially shippable functionality earlier. This describes Project Nexus\'s customer-service component because users are uncertain about all of their eventual requirements but want useful functionality delivered early.\n\n' +
      'Agile therefore does not eliminate planning. Instead, planning and development occur in an environment where requirements may evolve. In **Scrum**, for example, the **Product Owner** prioritises work according to business value, the **Scrum Master** facilitates the team\'s effectiveness, and the **development team** organises its own work.\n\n' +
      'Consequently, the relevant distinction is not between "planned" and "unplanned" development. The distinction is between an approach suited to relatively stable requirements and an approach that accommodates evolving requirements through iterative and incremental delivery.\n\n' +
      'For Project Nexus, Agile is therefore defensible for the customer-service component because it allows Apex to learn from delivered functionality and stakeholder feedback while continuing to prioritise the most valuable work.',
    ],
    markingGuide: '| Criterion | Marks |\n|---|---|\n| Rejects the misconception that Agile means no planning | 1 |\n| Identifies evolving/uncertain requirements | 1 |\n| Explains incremental/iterative delivery | 1 |\n| Explains that Agile still has structure | 1 |\n| Applies reasoning specifically to Project Nexus | 1 |\n| Provides a critical rather than purely descriptive judgement | 1 |\n| **Total** | **6** |',
    points: 6,
    explanation: 'A student who has memorised "Agile = flexible" will struggle here. The distinction being assessed is methodology selection based on project circumstances, not a definition recall.',
  },

  {
    id: 'ITPMA_W3_Q15',
    type: 'multiple-choice',
    tags: ['agile', 'requirements analysis', 'methodology selection'],
    sectionLabel: '2.7',
    text: 'Apex decides to use Agile for the customer-service component. Which reason provides the **strongest justification**?',
    options: [
      'The team wants to avoid defining any project objectives.',
      'The business team cannot clearly express all scope early and wants potentially shippable functionality earlier.',
      'The organisation wants to eliminate stakeholders from decision-making.',
      'Agile guarantees that the project will never experience scope changes.',
    ],
    correctAnswers: ['The business team cannot clearly express all scope early and wants potentially shippable functionality earlier.'],
    points: 2,
    explanation: 'Both conditions in the correct option are explicitly associated with the suitability of Agile. The other options are absolute claims that Agile does not actually make.',
  },

  {
    id: 'ITPMA_W3_Q16',
    type: 'fill-in-the-blank',
    tags: ['rup', 'methodology'],
    sectionLabel: '2.8',
    text: 'The methodology associated with IBM that uses an iterative software-development process and focuses on team productivity is the Rational Unified ___.',
    blanks: [
      {
        id: 'b1',
        options: ['Project', 'Process', 'Programme', 'Procedure'],
        correctAnswer: 'Process',
      },
    ],
    points: 2,
    explanation: 'This refers to the Rational Unified Process (RUP), an iterative software-development process associated with IBM.',
  },

  // ══════════════════════════════════════════════════════════════
  // QUESTION 3 — Managing Project Work Through the Process Groups (20 Marks)
  // ══════════════════════════════════════════════════════════════

  {
    id: 'SCENARIO_ITPMA_W3_Q3',
    type: 'scenario',
    title: 'Question 3: Managing Project Work Through the Process Groups (20 Marks)',
    context: `Project Nexus has now been authorised.

The project manager produces an initial plan. The team identifies a project scope statement, WBS, schedule and prioritised risks.

During implementation:

• developers and business representatives coordinate resources;
• project progress is measured regularly;
• a major deviation from the plan is discovered;
• a change request is raised;
• the completed system eventually receives formal stakeholder acceptance.`,
  },

  {
    id: 'ITPMA_W3_Q17',
    type: 'multiple-choice',
    tags: ['process groups', 'project planning'],
    sectionLabel: '3.1',
    text: 'The project manager is developing the workable scheme that will guide how the project addresses Apex\'s organisational needs.\n\nWhich process group is primarily being performed?',
    options: [
      'Initiating',
      'Planning',
      'Executing',
      'Closing',
    ],
    correctAnswers: ['Planning'],
    points: 2,
    explanation: 'The scenario describes developing a workable scheme for addressing organisational needs, including project planning outputs such as scope, schedule and risk plans.',
  },

  {
    id: 'ITPMA_W3_Q18',
    type: 'fill-in-the-blank',
    tags: ['process groups', 'executing'],
    sectionLabel: '3.2',
    text: 'The process group concerned with coordinating people and other resources to carry out project plans is ___.',
    blanks: [
      {
        id: 'b1',
        options: ['Planning', 'Initiating', 'Executing', 'Closing'],
        correctAnswer: 'Executing',
      },
    ],
    points: 2,
    explanation: 'Executing coordinates people and resources to carry out the project plans.',
  },

  {
    id: 'ITPMA_W3_Q19',
    type: 'multiple-choice',
    tags: ['monitoring and controlling', 'process groups'],
    sectionLabel: '3.3',
    text: 'A project manager regularly measures progress against project objectives and takes corrective action when deviations occur.\n\nWhich process group is being demonstrated?',
    options: [
      'Initiating',
      'Planning',
      'Executing',
      'Monitoring and controlling',
    ],
    correctAnswers: ['Monitoring and controlling'],
    points: 2,
    explanation: 'The scenario explicitly describes measuring progress, identifying deviations and taking corrective action — the defining activities of monitoring and controlling.',
  },

  {
    id: 'ITPMA_W3_Q20',
    type: 'open-ended',
    tags: ['closing', 'process groups'],
    sectionLabel: '3.4',
    text: 'Which process group formally ends the project or project phase after acceptance?',
    correctAnswers: ['Closing'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    explanation: 'Closing formally ends the project or project phase after acceptance.',
  },

  {
    id: 'ITPMA_W3_Q21',
    type: 'multiple-choice',
    tags: ['change requests', 'executing', 'process groups'],
    sectionLabel: '3.5',
    text: 'Apex\'s project sponsor is primarily interested in whether the project is producing the required system. The project manager explains that documenting change requests and updating planning documents during execution is also important.\n\nWhy?',
    options: [
      'Execution is concerned only with software development.',
      'Changes and updated information can affect the management and control of the project.',
      'Planning documents become irrelevant once execution starts.',
      'Change requests are created only during project closure.',
    ],
    correctAnswers: ['Changes and updated information can affect the management and control of the project.'],
    points: 2,
    explanation: 'Execution involves carrying out the plans, but change requests and updated project information must also be documented because project conditions and decisions affect subsequent planning and control.',
  },

  {
    id: 'ITPMA_W3_Q22',
    type: 'show-answer',
    tags: ['monitoring and controlling', 'process groups', 'systems thinking'],
    sectionLabel: '3.6',
    text: 'Apex\'s project manager says:\n\n*"Monitoring and controlling only happens after execution is finished. Once the team starts building the system, the project manager should let them work."*\n\nCritically assess this statement.\n\nExplain the role of monitoring and controlling in relation to project progress, deviations, corrective action and the other process groups.',
    correctAnswers: [
      'The statement is incorrect because monitoring and controlling occurs while project work is being performed, rather than only after execution has finished.\n\n' +
      'For Project Nexus, the project manager cannot simply allow the team to work until execution ends because the project may deviate from its planned objectives, schedule or other expectations. Regular monitoring provides information about whether the project is progressing as intended.\n\n' +
      'Monitoring and controlling also affects the other process groups. For example, information obtained during execution may result in a change request or require project-management plans and documents to be updated. This demonstrates that the process groups are interconnected rather than isolated stages.\n\n' +
      'Therefore, effective project management requires the project manager to **execute the work while simultaneously monitoring and controlling its progress**.',
    ],
    markingGuide: '| Criterion | Marks |\n|---|---|\n| States that monitoring occurs during execution | 1 |\n| Explains measuring progress | 1 |\n| Explains identifying deviations | 1 |\n| Explains corrective action | 1 |\n| Explains interaction with changes/documents/other process groups | 1 |\n| Provides an integrated conclusion | 1 |\n| **Total** | **6** |',
    points: 6,
    image: {
        src: "/images/ITPMA_W3_Q22.png",
        alt: "Diagram showing the relationships between project management process groups",
        caption: "Figure 1: Project management process-group relationships"
        },
    explanation: 'The five process groups are not simply five isolated chronological stages. Monitoring and controlling occurs throughout the project life cycle and affects the other process groups.',
  },

  {
    id: 'ITPMA_W3_Q23',
    type: 'multiple-choice',
    tags: ['closing', 'process groups'],
    sectionLabel: '3.7',
    text: 'The completed Project Nexus system has been accepted by the relevant stakeholders. Which activity most appropriately belongs to closing?',
    options: [
      'Creating the first project charter.',
      'Developing the initial product backlog.',
      'Formalising acceptance and recording lessons learned.',
      'Defining the project\'s initial requirements.',
    ],
    correctAnswers: ['Formalising acceptance and recording lessons learned.'],
    points: 2,
    explanation: 'Formalising acceptance and recording lessons learned belong naturally to project closure after the deliverable has been accepted.',
  },

  {
    id: 'ITPMA_W3_Q24',
    type: 'fill-in-the-blank',
    tags: ['milestones', 'process groups'],
    sectionLabel: '3.8',
    text: 'A report that can help focus the project team on completing major milestones is a milestone ___.',
    blanks: [
      {
        id: 'b1',
        options: ['chart', 'log', 'plan', 'report'],
        correctAnswer: 'report',
      },
    ],
    points: 2,
    explanation: 'A milestone report can help focus the project team on completing major milestones and their status.',
  },

  // ══════════════════════════════════════════════════════════════
  // QUESTION 4 — Scrum in an Uncertain Project (20 Marks)
  // ══════════════════════════════════════════════════════════════

  {
    id: 'SCENARIO_ITPMA_W3_Q4',
    type: 'scenario',
    title: 'Question 4: Scrum in an Uncertain Project (20 Marks)',
    context: `The customer-service team has adopted an Agile approach.

The team decides that it will develop the customer-service functionality in several iterations. The first release should allow customers to submit service requests and allow staff to view them. Additional functionality will be considered in later iterations.

A five-to-nine-person cross-functional development team has been assembled.

The following people are involved:

• **Naledi** decides which functionality provides the greatest business value and determines the order of the work.
• **David** facilitates the Daily Scrum, helps the team remain productive and removes obstacles.
• **The development team** organises its own work and produces the desired result for each sprint.`,
  },

  {
    id: 'ITPMA_W3_Q25',
    type: 'multiple-choice',
    tags: ['scrum', 'product owner'],
    sectionLabel: '4.1',
    text: 'Naledi is primarily performing which Scrum role?',
    options: [
      'Scrum Master',
      'Product Owner',
      'Development Team',
      'Project sponsor',
    ],
    correctAnswers: ['Product Owner'],
    points: 2,
    image: {
        src: "/images/ITPMA_W3_Q25.png",
        alt: "Diagram showing elements and interactions within a Scrum-based development workflow",
        caption: "Figure 2: Scrum development workflow"
        },
    explanation: 'The Product Owner is responsible for business value and determining what work should be done and in what order.',
  },

  {
    id: 'ITPMA_W3_Q26',
    type: 'fill-in-the-blank',
    tags: ['scrum', 'product backlog'],
    sectionLabel: '4.2',
    text: 'The Scrum artifact containing features ordered according to business value is the product ___.',
    blanks: [
      {
        id: 'b1',
        options: ['backlog', 'roadmap', 'log', 'plan'],
        correctAnswer: 'backlog',
      },
    ],
    points: 2,
    explanation: 'The product backlog provides the ordered list of functionality according to business value.',
  },

  {
    id: 'ITPMA_W3_Q27',
    type: 'multiple-choice',
    tags: ['scrum', 'scrum master'],
    sectionLabel: '4.3',
    text: 'David discovers that a required business representative is repeatedly preventing the team from making progress. Which Scrum responsibility most directly applies?',
    options: [
      'Deciding the order of the product backlog',
      'Removing barriers that prevent the team from being effective',
      'Accepting every change requested by the customer',
      'Creating the final project report',
    ],
    correctAnswers: ['Removing barriers that prevent the team from being effective'],
    points: 2,
    explanation: 'Removing barriers that prevent the team from being effective is a central Scrum Master responsibility.',
  },

  {
    id: 'ITPMA_W3_Q28',
    type: 'open-ended',
    tags: ['scrum', 'sprint backlog'],
    sectionLabel: '4.4',
    text: 'What Scrum artifact contains the highest-priority work selected for completion during a sprint?',
    correctAnswers: ['Sprint backlog'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
      allowPartialMatch: true,
    },
    explanation: 'The sprint backlog contains the highest-priority work selected for completion during the current sprint.',
  },

  {
    id: 'ITPMA_W3_Q29',
    type: 'multiple-choice',
    tags: ['scrum', 'sprint review'],
    sectionLabel: '4.5',
    text: 'At the end of a sprint, the team wants to show the Product Owner what has actually been completed.\n\nWhich ceremony is most appropriate?',
    options: [
      'Daily Scrum',
      'Sprint planning',
      'Sprint review',
      'Sprint retrospective',
    ],
    correctAnswers: ['Sprint review'],
    points: 2,
    explanation: 'The Sprint Review is used to demonstrate completed work to the Product Owner and inspect the resulting increment, as distinct from the Retrospective, which focuses on improving the process.',
  },

  {
    id: 'ITPMA_W3_Q30',
    type: 'fill-in-the-blank',
    tags: ['scrum', 'burndown chart'],
    sectionLabel: '4.6',
    text: 'The Scrum artifact showing the cumulative work remaining in a sprint on a day-by-day basis is the ___ chart.',
    blanks: [
      {
        id: 'b1',
        options: ['Gantt', 'Pareto', 'Control', 'Burndown', 'Kanban'],
        correctAnswer: 'Burndown',
      },
    ],
    points: 2,
    explanation: 'The burndown chart shows cumulative remaining work over the course of the sprint.',
  },

  {
    id: 'ITPMA_W3_Q31',
    type: 'show-answer',
    tags: ['scrum', 'scrum roles', 'scrum artifacts', 'scrum ceremonies'],
    sectionLabel: '4.7',
    text: 'The production manager proposes that Apex should abandon Scrum because:\n\n*"The team is already having daily meetings, but that does not tell management whether the project is actually improving."*\n\nUsing the scenario, explain how the **Scrum roles, artifacts and ceremonies work together** to provide visibility, prioritisation, coordination and improvement.\n\nYour answer should use at least **two roles, two artifacts and two ceremonies** and should explain their relationships rather than merely listing them.',
    correctAnswers: [
      'The Scrum elements work together to create a system of **prioritisation, coordination, visibility and continuous improvement**.\n\n' +
      'The **Product Owner** is responsible for business value and determines which work should be performed and in what order. This is represented through the **product backlog**, which provides an ordered set of functionality. The **sprint backlog** then identifies the work selected for completion during the current sprint.\n\n' +
      'The **Scrum Master** supports team effectiveness, facilitates Scrum activities and helps remove barriers. The **Daily Scrum** provides a regular mechanism for the development team to communicate progress and challenges and coordinate its immediate work.\n\n' +
      'At the end of the sprint, the **Sprint Review** provides visibility by allowing completed functionality to be demonstrated. The **Sprint Retrospective** then allows the team to consider what could be improved in the product and development process. The **burndown chart** provides an additional visual indication of remaining work.\n\n' +
      'Therefore, the daily meeting should not be assessed in isolation. Scrum provides value because its roles, artifacts and ceremonies form a connected management mechanism: priorities are established, work is selected, progress is discussed, results are reviewed and the process is improved.',
    ],
    markingGuide: '| Criterion | Marks |\n|---|---|\n| Correctly explains Product Owner | 1 |\n| Correctly explains Scrum Master | 1 |\n| Correctly explains product/sprint backlog | 1 |\n| Correctly explains Daily Scrum | 1 |\n| Correctly explains Review/Retrospective/burndown | 1 |\n| Integrates the elements into a coherent system | 1 |\n| **Total** | **6** |',
    points: 6,
    explanation: 'This question rewards students who understand Scrum as a system of complementary responsibilities and practices, rather than memorising "Product Owner = backlog" and "Scrum Master = meetings."',
  },

  {
    id: 'ITPMA_W3_Q32',
    type: 'multiple-choice',
    tags: ['scrum', 'daily scrum'],
    sectionLabel: '4.8',
    text: 'The team meets briefly each day to share progress and challenges and plan its work for the day.\n\nThis is the:',
    options: [
      'Sprint review',
      'Sprint retrospective',
      'Daily Scrum',
      'Sprint planning session',
    ],
    correctAnswers: ['Daily Scrum'],
    points: 2,
    explanation: 'The Daily Scrum is the regular short meeting where the development team shares progress/challenges and plans its immediate work.',
  },

  // ══════════════════════════════════════════════════════════════
  // QUESTION 5 — Scope, Requirements and the Work Breakdown Structure (20 Marks)
  // ══════════════════════════════════════════════════════════════

  {
    id: 'SCENARIO_ITPMA_W3_Q5',
    type: 'scenario',
    title: 'Question 5: Scope, Requirements and the Work Breakdown Structure (20 Marks)',
    context: `As Project Nexus progresses, disagreements emerge.

The sales department wants a customer-history feature. The production department wants additional inventory reports. Finance wants automated financial reporting.

The project manager realises that the phrase **"integrated business system"** is too vague to manage effectively.

The team therefore begins formal scope work.

During requirements collection, users are interviewed and workshops are held. The team documents requirements before creating the project scope statement.

The project manager then creates a WBS that includes:

**1.0 Project Nexus**
**1.1 Project Management**
**1.2 Customer Service**
**1.3 Production**
**1.4 Inventory**
**1.5 Testing**
**1.6 Deployment**`,
  },

  {
    id: 'ITPMA_W3_Q33',
    type: 'multiple-choice',
    tags: ['scope statement', 'requirements analysis'],
    sectionLabel: '5.1',
    text: 'Why is the phrase "integrated business system" insufficient as a project scope statement?',
    options: [
      'Scope should contain only financial information.',
      'The phrase does not provide sufficient detail about deliverables, boundaries, assumptions and acceptance criteria.',
      'Scope statements should never describe project deliverables.',
      'A project scope statement should contain the complete source code.',
    ],
    correctAnswers: ['The phrase does not provide sufficient detail about deliverables, boundaries, assumptions and acceptance criteria.'],
    points: 2,
    explanation: 'A scope statement must make the project sufficiently concrete to support planning, execution, validation and control.',
  },

  {
    id: 'ITPMA_W3_Q34',
    type: 'open-ended',
    tags: ['requirements collection', 'requirements analysis'],
    sectionLabel: '5.2',
    text: 'What is the process of defining and documenting the features and functions required of the product called?',
    correctAnswers: ['Collecting requirements', 'Requirements collection'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 20,
      allowPartialMatch: true,
    },
    explanation: 'Collecting requirements defines and documents the features and functions required of the product and the processes used to create it.',
  },

  {
    id: 'ITPMA_W3_Q35',
    type: 'multiple-choice',
    tags: ['wbs', 'scope decomposition'],
    sectionLabel: '5.3',
    text: 'The project team breaks the major Project Nexus deliverables into smaller, more manageable components.\n\nThis is primarily an example of:',
    options: [
      'Scope validation',
      'Scope decomposition',
      'Scope acceptance',
      'Scope closure',
    ],
    correctAnswers: ['Scope decomposition'],
    points: 2,
    explanation: 'Creating the WBS involves subdividing major deliverables into progressively smaller and more manageable components — decomposition, not simply "making a list."',
  },

  {
    id: 'ITPMA_W3_Q36',
    type: 'fill-in-the-blank',
    tags: ['wbs', 'work package'],
    sectionLabel: '5.4',
    text: 'The lowest level of a WBS is called a work ___.',
    blanks: [
      {
        id: 'b1',
        options: ['unit', 'item', 'package', 'task'],
        correctAnswer: 'package',
      },
    ],
    points: 2,
    image: {
        src: "/images/ITPMA_W3_Q36.png",
        alt: "Hierarchical breakdown of deliverables and project components for Project Nexus",
        caption: "Figure 3: Project Nexus work structure"
        },
    explanation: 'The lowest WBS level is the work package, which represents a manageable unit of work.',
  },

  {
    id: 'ITPMA_W3_Q37',
    type: 'multiple-choice',
    tags: ['scope creep', 'scope control'],
    sectionLabel: '5.5',
    text: 'The finance department asks for a new reporting function after the scope has been approved. The project manager immediately adds the feature without assessing its effect on time and cost.\n\nWhich problem is most directly illustrated?',
    options: [
      'Scope validation',
      'Scope creep',
      'Stakeholder identification',
      'Project initiation',
    ],
    correctAnswers: ['Scope creep'],
    points: 2,
    explanation: 'Scope creep is not simply "change" — it is uncontrolled or inadequately controlled expansion of project scope.',
  },

  {
    id: 'ITPMA_W3_Q38',
    type: 'open-ended',
    tags: ['wbs dictionary', 'wbs'],
    sectionLabel: '5.6',
    text: 'What document provides detailed information about each WBS item?',
    correctAnswers: ['WBS dictionary'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 10,
      allowPartialMatch: true,
    },
    explanation: 'The WBS dictionary provides additional detailed information about individual WBS elements.',
  },

  {
    id: 'ITPMA_W3_Q39',
    type: 'multiple-choice',
    tags: ['wbs', 'analogy approach'],
    sectionLabel: '5.7',
    text: 'Apex\'s project manager wants to create a WBS by examining the WBS of a similar previous project and adapting it to Project Nexus.\n\nWhich WBS development approach is this?',
    options: [
      'Bottom-up approach',
      'Mind-mapping approach',
      'Analogy approach',
      'Top-down approach',
    ],
    correctAnswers: ['Analogy approach'],
    points: 2,
    explanation: 'The analogy approach develops the WBS by examining a similar previous project and adapting its structure to the current project — unlike bottom-up (aggregating detailed components), mind-mapping (branching from a central idea), or top-down (progressive decomposition of the whole).',
  },

  {
    id: 'ITPMA_W3_Q40',
    type: 'show-answer',
    tags: ['scope validation', 'scope control', 'requirements analysis'],
    sectionLabel: '5.8',
    text: 'The project sponsor says:\n\n*"We already interviewed users, so the scope is finished. There is no need to validate the deliverables later."*\n\nCritically evaluate this statement.\n\nExplain the difference between **collecting requirements, defining scope, validating scope and controlling scope**, and show why each remains important during Project Nexus.',
    correctAnswers: [
      'The sponsor\'s statement is incorrect because requirements collection, scope definition, scope validation and scope control are related but distinct processes.\n\n' +
      'First, **collecting requirements** involves identifying and documenting what users and stakeholders need from the product. Apex\'s interviews and workshops are therefore appropriate for discovering requirements from the different departments.\n\n' +
      'Second, **defining scope** uses information such as the project charter and requirements documentation to establish what the project will actually deliver. This converts stakeholder needs into a sufficiently detailed description of the project\'s boundaries and deliverables.\n\n' +
      'Third, **validating scope** is concerned with formal acceptance of completed deliverables. A requirement being documented does not mean that the resulting deliverable has automatically been accepted. The appropriate stakeholder must confirm that the completed deliverable meets the agreed expectations.\n\n' +
      'Finally, **controlling scope** remains necessary because stakeholders may request changes after scope has been established. Apex must evaluate and control those changes rather than simply adding them. Otherwise, the project may experience scope creep and lose control of its original objectives.\n\n' +
      'These processes therefore work together: requirements establish what stakeholders need, scope definition establishes what the project will deliver, validation establishes whether completed deliverables are accepted, and control manages changes to the agreed scope.',
    ],
    markingGuide: '| Criterion | Marks |\n|---|---|\n| Correctly distinguishes collecting requirements | 1 |\n| Correctly distinguishes defining scope | 1 |\n| Correctly explains validating scope | 1 |\n| Correctly explains controlling scope | 1 |\n| Applies the four processes to Apex | 1 |\n| Integrates them into a coherent explanation of scope management | 1 |\n| **Total** | **6** |',
    points: 6,
    explanation: 'The major conceptual trap is confusing requirements with scope acceptance. Requirements collection, scope definition, formal validation and subsequent control of changes are explicitly distinct processes.',
  },

  {
    id: 'ITPMA_W3_Q41',
    type: 'fill-in-the-blank',
    tags: ['scope validation', 'scope control'],
    sectionLabel: '5.9',
    text: 'The process concerned with formalising acceptance of completed project deliverables is scope ___.',
    blanks: [
      {
        id: 'b1',
        options: ['validation', 'control', 'definition', 'closure'],
        correctAnswer: 'validation',
      },
    ],
    points: 2,
    explanation: 'Scope validation formalises acceptance; scope control manages subsequent changes. Keeping these distinct is important.',
  },

];