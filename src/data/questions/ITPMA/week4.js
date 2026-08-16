// src/data/questions/ITPMA/week4.js
export default [

  // ── Scenario ─────────────────────────────────────────────
  {
    id: 'SCENARIO_ITPMA_W4',
    type: 'scenario',
    title: 'NexaCore Manufacturing Systems — Project Schedule & Cost Management (100 Marks)',
    context: `NexaCore is a South African technology and manufacturing company undertaking a project to replace several disconnected systems used by its **Production, Inventory, Sales and Finance** departments.

The project will introduce an integrated project-management and information system. Senior management has approved the project in principle, but the project sponsor has imposed two important constraints:

- The system must be ready for the beginning of the company's next financial year.
- The project must remain within its approved cost baseline.

The project manager, **Ayesha Naidoo**, has discovered that the original project schedule was produced very quickly. Several activities were listed without clearly documenting their dependencies, some estimates came directly from management rather than the people performing the work, and different departments have conflicting expectations about completion dates.

The project team must therefore establish a realistic schedule, identify activities that could threaten the completion date, and monitor whether the project is performing within its approved budget.

All questions below relate to the NexaCore project unless otherwise stated.`,
  },

  // ============================================================
  // QUESTION 1 — Establishing the Schedule Foundation (14 marks)
  // ============================================================

  {
    id: 'ITPMA_W4_Q1_1',
    type: 'multiple-choice',
    sectionLabel: '1.1',
    tags: ['schedule management', 'project management software'],
    text: 'Ayesha begins by reviewing how the project schedule will be managed. The project team proposes simply entering activities into project-management software and allowing the software to generate the dates automatically. Which response best explains why Ayesha should **not** begin by relying on the software\'s automatically generated schedule?',
    options: [
      'Project-management software cannot represent dependencies between activities',
      'Software can calculate schedules effectively, but only when the underlying activities, dependencies, estimates and project-specific assumptions have been properly established',
      'Project-management software is primarily designed for financial reporting and should not be used for scheduling',
      'Software-generated schedules are inherently less accurate than manually calculated schedules',
    ],
    correctAnswers: ['Software can calculate schedules effectively, but only when the underlying activities, dependencies, estimates and project-specific assumptions have been properly established'],
    points: 2,
    explanation: 'Project-management software is a **support tool**, not a substitute for sound project planning. The quality of the schedule it produces depends entirely on the quality of the activities, dependencies, estimates and assumptions supplied to it.',
  },

  {
    id: 'ITPMA_W4_Q1_2',
    type: 'open-ended',
    sectionLabel: '1.2',
    tags: ['schedule management'],
    text: 'The first project schedule-management process, concerned with deciding **how the schedule will be managed throughout the project**, is called:',
    correctAnswers: ['Planning schedule management', 'Plan schedule management'],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 15,
      requiredTerms: ['schedule', 'management'],
    },
  },

  {
    id: 'ITPMA_W4_Q1_3',
    type: 'fill-in-the-blank',
    sectionLabel: '1.3',
    tags: ['schedule management'],
    text: 'Ayesha wants the schedule-management plan to establish how accurately activities will be estimated and what units will be used to express those estimates. These two elements are known respectively as the level of ___ and units of ___.',
    blanks: [
      { id: 'b1', options: ['precision', 'confidence', 'accuracy', 'risk'], correctAnswer: 'accuracy' },
      { id: 'b2', options: ['currency', 'priority', 'measurement', 'resource'], correctAnswer: 'measurement' },
    ],
  },

  {
    id: 'ITPMA_W4_Q1_4',
    type: 'multiple-choice',
    sectionLabel: '1.4',
    tags: ['activity definition', 'schedule management'],
    text: 'The Production Manager tells Ayesha: "Do not bother breaking the manufacturing-system migration into smaller activities. Just put \'Migrate manufacturing system\' into the schedule." Why would this approach create a fundamental scheduling problem?',
    options: [
      'A schedule may only contain activities that involve financial expenditure',
      'Activities need sufficient detail to determine resource and schedule estimates',
      'Only senior managers are permitted to define project activities',
      'Activities should only be defined after the critical path has been calculated',
    ],
    correctAnswers: ['Activities need sufficient detail to determine resource and schedule estimates'],
    points: 2,
    explanation: 'Defining activities involves decomposing project work into an activity list and attributes containing the information needed to sequence, resource and estimate the work. A single broad activity hides this necessary detail.',
  },

  {
    id: 'ITPMA_W4_Q1_5',
    type: 'show-answer',
    sectionLabel: '1.5',
    tags: ['activity definition', 'schedule management'],
    points: 7,
    text: 'Ayesha discovers that the project team has created a schedule containing broad statements such as **"Prepare system"**, **"Test system"** and **"Deploy system"**. The team argues that additional detail is unnecessary because the project-management software can handle the scheduling.\n\n**Critically evaluate this approach.** Explain how properly defining activities contributes to the quality and usefulness of NexaCore\'s eventual schedule. Your answer should consider *activity detail*, *resource estimation*, *schedule estimation* and *the information contained in activity attributes*.',
    correctAnswers: [
      'The three activities, "Prepare system", "Test system" and "Deploy system", are too broad to provide a sufficiently reliable basis for schedule development. **Defining activities** requires the project work to be decomposed into manageable activities that can be sequenced, assigned resources and estimated.\n\nFor NexaCore, "Prepare system" could involve several distinct activities, such as configuration, environment preparation and data preparation. Identifying these separately allows the team to determine **which activities depend on one another**, rather than treating the entire preparation stage as a single block.\n\nProper activity definition also improves **resource estimation**. Different activities may require different people, skills or resources. If everything is represented by one broad activity, it becomes difficult to determine realistically who is required and when.\n\nIt also improves **duration estimation**. Smaller, clearly defined activities can be estimated individually, while broad activities may hide uncertainty and make an overall duration difficult to justify.\n\nFinally, **activity attributes** provide supporting information such as predecessors and successors, logical relationships, leads/lags, resources, constraints, dates and assumptions. This information provides the foundation for developing and controlling the schedule.\n\nTherefore, project-management software should be used *after* the project team has established meaningful activities and their relationships. Software can help calculate and communicate the resulting schedule, but it cannot compensate for poorly defined project work.',
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Identifies that broad activities lack sufficient detail | 1 |
| Explains activity definition/decomposition | 1 |
| Connects activity definition to resource estimation | 1 |
| Connects activity definition to duration estimation | 1 |
| Explains importance of dependencies/sequencing | 1 |
| Applies activity attributes to the scenario | 1 |
| Evaluates the role/limitation of project-management software | 1 |
| **Total** | **7** |`,
  },

  // ============================================================
  // QUESTION 2 — Dependencies and Network Logic (16 marks)
  // ============================================================

  {
    id: 'SCENARIO_ITPMA_W4_Q2',
    type: 'scenario',
    title: 'Questions 2.1–2.6: Dependencies and Network Logic (16 Marks)',
    context: `After redefining the activities, the project team identifies the following relationships:

| Activity | Description | Duration |
|---|---|---:|
| A | Analyse existing systems | 4 days |
| B | Document migration requirements | 3 days |
| C | Configure new system | 6 days |
| D | Prepare migration data | 5 days |
| E | Test configured system | 4 days |
| F | Migrate validated data | 3 days |
| G | Conduct user acceptance testing | 3 days |
| H | Deploy system | 2 days |

The following dependencies apply:
- A must finish before B can begin.
- B must finish before C can begin.
- B must finish before D can begin.
- C must finish before E can begin.
- D must finish before F can begin.
- E and F must both finish before G can begin.
- G must finish before H can begin.`,
  },

  {
    id: 'ITPMA_W4_Q2_1',
    type: 'multiple-choice',
    sectionLabel: '2.1',
    tags: ['dependencies', 'network diagrams'],
    text: 'The dependency between **B — Document migration requirements** and **C — Configure new system** is best described as:',
    options: [
      'External dependency',
      'Discretionary dependency',
      'Mandatory dependency',
      'Independent dependency',
    ],
    correctAnswers: ['Mandatory dependency'],
    points: 2,
    explanation: 'A mandatory dependency, also called **hard logic**, is inherent in the nature of the work. Configuration cannot logically begin until the requirements have been documented.',
  },

  {
    id: 'ITPMA_W4_Q2_2',
    type: 'open-ended',
    sectionLabel: '2.2',
    tags: ['dependencies'],
    text: 'What is the general term for the sequencing relationship between project activities?',
    correctAnswers: ['Dependency','Dependencies'],
    points: 1,
    validationOptions: {
      allowPartialMatch: true,
      caseSensitive: false,
      tolerance: 10,
    },
  },

  {
    id: 'ITPMA_W4_Q2_3',
    type: 'multiple-choice',
    sectionLabel: '2.3',
    tags: ['network diagrams'],
    text: 'Ayesha wants to communicate the logical relationships between these activities to the project team. Which technique is specifically designed for this purpose?',
    options: [
      'Cost baseline',
      'Network diagram',
      'Cash-flow analysis',
      'Project charter',
    ],
    correctAnswers: ['Network diagram'],
    points: 2,
    image: {
        src: "/images/ITPMA_W4_Q2.3.png",
        alt: "NexaCore project activity network showing activities A through H, their durations, and the dependencies between project activities.",
        caption: "Figure 1: NexaCore project activity network."
        },
    explanation: 'Network diagrams provide a graphical representation of activities and their logical relationships, using either the PDM or ADM approach.',
  },

  {
    id: 'ITPMA_W4_Q2_4',
    type: 'fill-in-the-blank',
    sectionLabel: '2.4',
    tags: ['network diagrams'],
    text: 'In the Precedence Diagramming Method (PDM), activities are represented by ___, whereas in the Arrow Diagramming Method (ADM), activities are represented by ___.',
    blanks: [
      { id: 'b1', options: ['arrows', 'milestones', 'floats', 'nodes'], correctAnswer: 'nodes' },
      { id: 'b2', options: ['arrows', 'nodes', 'diamonds', 'bars'], correctAnswer: 'arrows' },
    ],
  },

  {
    id: 'ITPMA_W4_Q2_5',
    type: 'multiple-choice',
    sectionLabel: '2.5',
    tags: ['dependencies'],
    text: 'Suppose the Finance Department requires an external regulatory approval before NexaCore may deploy the system. This relationship would most appropriately be classified as:',
    options: [
      'Mandatory dependency',
      'Discretionary dependency',
      'External dependency',
      'Finish-to-finish relationship',
    ],
    correctAnswers: ['External dependency'],
    points: 2,
    explanation: 'The approval sits outside NexaCore\'s own project activities and depends on an external party or regulatory requirement, which is the defining feature of an external dependency.',
  },

  {
    id: 'ITPMA_W4_Q2_6',
    type: 'show-answer',
    sectionLabel: '2.6',
    tags: ['dependencies', 'network diagrams'],
    points: 7,
    text: 'A senior manager proposes changing the sequence so that **user acceptance testing begins immediately after configuration**, arguing that "there is no reason to wait for the migration activities." Using the dependency structure provided above, **evaluate the manager\'s proposal**. Your answer should identify the relevant dependencies, explain why activity sequencing matters, distinguish legitimate parallel work from an invalid dependency change, and explain how an incorrectly sequenced activity could affect the eventual project schedule.',
    correctAnswers: [
      {
        text: 'The manager\'s proposal is not valid because **G — User Acceptance Testing** has two predecessors: **E — Test Configured System** and **F — Migrate Validated Data**. Both must be completed before G can begin.\n\nThe proposed change would effectively remove the dependency between **F and G**. This is problematic because user acceptance testing is positioned after the required configuration testing and data migration activities. Starting it before the migration has been completed would mean users are potentially testing a system that does not yet contain the validated migrated data.\n\nSome project work can legitimately occur in parallel. For example, **C and D can both begin after B**, because their dependencies do not require one to wait for the other.\n\nHowever, removing a genuine dependency merely to produce an earlier completion date would create an unrealistic schedule. Schedule sequencing exists to represent the logical relationships between activities. Incorrect sequencing can therefore produce a schedule that appears achievable on paper but cannot be executed correctly.',
        diagram: {
          type: 'mermaid',
          code: `flowchart LR
    A["A: Analyse existing systems (4d)"] --> B["B: Document requirements (3d)"]
    B --> C["C: Configure new system (6d)"]
    B --> D["D: Prepare migration data (5d)"]
    C --> E["E: Test configured system (4d)"]
    D --> F["F: Migrate validated data (3d)"]
    E --> G["G: User acceptance testing (3d)"]
    F --> G
    G --> H["H: Deploy system (2d)"]`,
        },
      },
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Identifies G's dependencies on E and F | 2 |
| Explains why F → G is important | 1 |
| Distinguishes legitimate parallel work C/D | 1 |
| Explains purpose of dependency sequencing | 1 |
| Explains consequence of invalid sequencing | 1 |
| Applies reasoning clearly to NexaCore | 1 |
| **Total** | **7** |`,
  },

  // ============================================================
  // QUESTION 3 — Schedule Analysis and Critical Path (18 marks)
  // ============================================================

  {
    id: 'ITPMA_W4_Q3_1',
    type: 'multiple-choice',
    sectionLabel: '3.1',
    tags: ['critical path'],
    text: 'Ayesha now uses the network developed in Question 2 to determine which activities have the greatest influence on the project\'s completion date. Which statement most accurately describes NexaCore\'s **critical path**?',
    options: [
      'The path containing the activities with the highest individual costs',
      'The shortest sequence of activities from project initiation to deployment',
      'The longest path through the network that determines the earliest possible project completion time',
      'The path containing the greatest number of activities, regardless of their durations',
    ],
    correctAnswers: ['The longest path through the network that determines the earliest possible project completion time'],
    points: 2,
    explanation: 'The critical path is the **longest path through the network** and has the least available slack/float. Delays to critical-path activities can delay the overall project.',
  },

  {
    id: 'ITPMA_W4_Q3_2',
    type: 'open-ended',
    sectionLabel: '3.2',
    tags: ['critical path'],
    text: 'The amount of time by which an activity may be delayed without delaying a succeeding activity or the project finish date is called:',
    correctAnswers: ['Float', 'Slack'],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 10,
    },
  },

  {
    id: 'ITPMA_W4_Q3_3',
    type: 'show-answer',
    sectionLabel: '3.3',
    tags: ['critical path'],
    points: 4,
    text: 'Using the activity information in Question 2, determine:\n\n**a.** The total duration of the path A → B → C → E → G → H\n\n**b.** The total duration of the path A → B → D → F → G → H\n\n**c.** Which path is the **critical path**?',
    correctAnswers: [
      'a. Path A → B → C → E → G → H: $4+3+6+4+3+2 = 22$ days\n\nb. Path A → B → D → F → G → H: $4+3+5+3+3+2 = 20$ days\n\nc. The critical path is **A → B → C → E → G → H**, since it is the longer of the two paths at **22 days**.',
    ],
    image: {
        src: "/images/ITPMA_W4_Q3.3.png",
        alt: "NexaCore project activity network with activity durations and dependencies for critical path analysis.",
        caption: "Figure 2: NexaCore activity network for critical path analysis."
        },
    markingGuide: `| Component | Marks |
|---|---|
| Correct first path calculation (22 days) | 1 |
| Correct second path calculation (20 days) | 1 |
| Correct comparison | 1 |
| Correct critical path identified | 1 |
| **Total** | **4** |`,
  },

  {
    id: 'ITPMA_W4_Q3_4',
    type: 'multiple-choice',
    sectionLabel: '3.4',
    tags: ['critical path'],
    text: 'Suppose Activity C, which lies on NexaCore\'s critical path, takes two additional days. Assuming no corrective action is taken, what is the most appropriate conclusion?',
    options: [
      'The project completion date will necessarily remain unchanged because only one activity changed',
      'The project completion date is likely to move by two days because C lies on the critical path',
      'The cost baseline will automatically increase by two days',
      'Activity C will cease to be part of the project',
    ],
    correctAnswers: ['The project completion date is likely to move by two days because C lies on the critical path'],
    points: 2,
    explanation: 'Because C lies on the critical path, additional duration directly affects the path determining project completion, assuming no corrective action or schedule adjustment is made.',
  },

  {
    id: 'ITPMA_W4_Q3_5',
    type: 'multiple-choice',
    sectionLabel: '3.5',
    tags: ['gantt charts'],
    text: 'Ayesha is preparing a visual schedule for senior management showing activities against calendar dates, with bars representing their durations. Which tool is most appropriate?',
    options: [
      'Network diagram',
      'Gantt chart',
      'Cost baseline',
      'Activity attribute register',
    ],
    correctAnswers: ['Gantt chart'],
    points: 2,
    image: {
        src: "/images/ITPMA_W4_Q3.5.png",
        alt: "Gantt chart showing the scheduled activities, durations, sequence, and milestone for the NexaCore systems replacement project.",
        caption: "Figure 3: NexaCore project Gantt chart."
        },
    explanation: 'A Gantt chart displays activities against time and uses bars to communicate activity duration and scheduling information.',
  },

  {
    id: 'ITPMA_W4_Q3_6',
    type: 'fill-in-the-blank',
    sectionLabel: '3.6',
    tags: ['gantt charts'],
    text: 'On a conventional Gantt chart, a ___ represents a milestone, while horizontal bars represent task ___.',
    blanks: [
      { id: 'b1', options: ['circle', 'diamond', 'arrow', 'triangle'], correctAnswer: 'diamond' },
      { id: 'b2', options: ['cost', 'ownership', 'priority', 'duration'], correctAnswer: 'duration' },
    ],
  },

  {
    id: 'ITPMA_W4_Q3_7',
    type: 'show-answer',
    sectionLabel: '3.7',
    tags: ['schedule management', 'critical path'],
    points: 5,
    text: 'NexaCore\'s sponsor says: "The schedule is only useful if it tells us when the project will finish." Explain why this view is too narrow. Discuss **at least three ways** in which a well-developed project schedule can support project management beyond simply displaying the final completion date.',
    correctAnswers: [
      'A project schedule provides much more than the final completion date.\n\nFirst, it communicates **what work must occur and when**, allowing project participants to understand their responsibilities and the project\'s timeframe.\n\nSecond, the schedule communicates **dependencies and sequencing**. This allows the project team to understand which activities must precede others and which activities can potentially occur in parallel.\n\nThird, schedule analysis can identify the **critical path**, allowing management to focus attention on activities with the greatest potential effect on project completion. A delay to a critical-path activity can delay the project.\n\nFourth, the schedule provides a basis for **monitoring and controlling project progress**. Ayesha can compare actual progress against the planned schedule and identify deviations requiring management attention.\n\nTherefore, a schedule is a management and communication mechanism, not merely a final-date prediction.',
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Communication of work/time | 1 |
| Dependencies/sequencing | 1 |
| Critical-path management | 1 |
| Monitoring/control | 1 |
| Coherent application to project management | 1 |
| **Total** | **5** |`,
  },

  // ============================================================
  // QUESTION 4 — Uncertainty, Estimation and Schedule Decisions (14 marks)
  // ============================================================

  {
    id: 'SCENARIO_ITPMA_W4_Q4',
    type: 'scenario',
    title: 'Questions 4.1–4.5: Uncertainty, Estimation and Schedule Decisions (14 Marks)',
    context: `The project manager reviews the estimates for the system migration. The technical team provides three estimates because the migration depends on the quality of historical data.

For the migration activity:
- Optimistic estimate: 2 days
- Most likely estimate: 5 days
- Pessimistic estimate: 11 days

The Finance Manager argues that the project should simply use the most likely estimate because it is "the most realistic number."`,
  },

  {
    id: 'ITPMA_W4_Q4_1',
    type: 'multiple-choice',
    sectionLabel: '4.1',
    tags: ['estimation', 'uncertainty'],
    text: 'Which estimation technique is most directly associated with using the **optimistic, most likely and pessimistic** estimates?',
    options: [
      'Analogous estimating',
      'Bottom-up estimating',
      'Three-point estimating',
      'Parametric estimating',
    ],
    correctAnswers: ['Three-point estimating'],
    points: 2,
    image: {
        src: "/images/ITPMA_W4_Q4.1.png",
        alt: "Three-point duration estimates for a NexaCore project activity showing optimistic, most likely, and pessimistic estimates.",
        caption: "Figure 4: Three-point activity-duration estimates."
        },
    explanation: 'Three-point estimating uses **optimistic, most likely and pessimistic** estimates to account for uncertainty in activity durations.',
  },

  {
    id: 'ITPMA_W4_Q4_2',
    type: 'open-ended',
    sectionLabel: '4.2',
    tags: ['estimation', 'uncertainty'],
    text: 'What technique uses probabilistic time estimates based on optimistic, most likely and pessimistic estimates to account for uncertainty?',
    correctAnswers: ['PERT'],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
  },

  {
    id: 'ITPMA_W4_Q4_3',
    type: 'multiple-choice',
    sectionLabel: '4.3',
    tags: ['estimation', 'uncertainty'],
    text: 'Why is the technical team\'s use of three estimates particularly appropriate in this situation?',
    options: [
      'Three-point estimates eliminate uncertainty from the project',
      'Three-point estimates acknowledge uncertainty in individual activity-duration estimates',
      'Three-point estimates guarantee that the pessimistic estimate will become the actual duration',
      'Three-point estimates are only appropriate when no project team members are available',
    ],
    correctAnswers: ['Three-point estimates acknowledge uncertainty in individual activity-duration estimates'],
    points: 2,
    explanation: 'The purpose is not to eliminate uncertainty, but to **represent it explicitly** in the estimating process.',
  },

  {
    id: 'ITPMA_W4_Q4_4',
    type: 'multiple-choice',
    sectionLabel: '4.4',
    tags: ['estimation', 'uncertainty'],
    text: 'The project manager discovers that the technical team estimated the migration at 5 days, but the manager reduced it to 2 days because senior management wanted an earlier completion date. Which issue identified in the course material is most directly illustrated?',
    options: [
      'Human beings may be biased toward underestimation',
      'Network diagrams cannot represent uncertainty',
      'Gantt charts automatically cause inaccurate estimates',
      'Milestones eliminate estimation errors',
    ],
    correctAnswers: ['Human beings may be biased toward underestimation'],
    points: 2,
    explanation: 'A manager reducing an estimate to satisfy a desired date substitutes a management target for an evidence-based estimate, illustrating bias toward underestimation.',
  },

  {
    id: 'ITPMA_W4_Q4_5',
    type: 'show-answer',
    sectionLabel: '4.5',
    tags: ['estimation', 'uncertainty'],
    points: 7,
    text: 'The project sponsor insists that all activity estimates must be "precise" because the board wants a single completion date. **Critically explain why producing a single precise-looking number does not necessarily produce a reliable schedule.** In your answer, discuss the role of *uncertainty*, *people performing the work*, *expert review*, *three-point estimates* and *the relationship between effort and duration*.',
    correctAnswers: [
      'A single precise-looking number can create an **illusion of certainty**. The duration of an activity is affected by uncertainty, assumptions, resources and the conditions under which the work is performed. Therefore, stating that an activity will take exactly five days does not mean that five days is objectively guaranteed.\n\nA more reliable approach is to recognise the uncertainty explicitly. NexaCore\'s technical team has provided optimistic, most likely and pessimistic estimates. This allows the project team to consider a range of plausible outcomes rather than pretending that one number is certain.\n\nThe **people performing the work** should also contribute to estimates because they possess knowledge of the technical work and its likely difficulties. **Expert review** can therefore improve the credibility of estimates.\n\n**Three-point estimating** provides a structured way of incorporating uncertainty, while **PERT** can be used when probabilistic scheduling is appropriate.\n\nFinally, **effort and duration are not identical**. More effort does not necessarily translate directly into a shorter calendar duration because activities can depend on resources, sequencing and other constraints.\n\nConsequently, the objective should not be to manufacture a precise number for the Board. The objective should be to create a **credible estimate whose assumptions and uncertainty are understood**.',
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Explains false precision/uncertainty | 1 |
| Explains importance of people performing work | 1 |
| Explains expert judgement/review | 1 |
| Applies three-point estimating | 1 |
| Explains PERT/uncertainty | 1 |
| Distinguishes effort from duration | 1 |
| Integrated critical evaluation | 1 |
| **Total** | **7** |`,
  },

  // ============================================================
  // QUESTION 5 — Cost Planning and Estimation (16 marks)
  // ============================================================

  {
    id: 'SCENARIO_ITPMA_W4_Q5',
    type: 'scenario',
    title: 'Questions 5.1–5.6: Cost Planning and Estimation (16 Marks)',
    context: `While the schedule is being finalised, NexaCore's Finance Department discovers that the project team's cost estimate has changed significantly.

The original estimate was prepared during the early project-selection stage using information from a previous, similar implementation. The team is now much closer to implementation and has detailed information about individual work items.`,
  },

  {
    id: 'ITPMA_W4_Q5_1',
    type: 'multiple-choice',
    sectionLabel: '5.1',
    tags: ['cost estimation'],
    text: 'Which estimating technique was most likely used for the **original early estimate**?',
    options: [
      'Bottom-up estimating',
      'Analogous estimating',
      'Three-point estimating',
      'Parametric estimating',
    ],
    correctAnswers: ['Analogous estimating'],
    points: 2,
    explanation: 'Analogous estimating uses information from a **previous, similar project** as a basis for estimating the current project, and is typically used at an early project stage.',
  },

  {
    id: 'ITPMA_W4_Q5_2',
    type: 'multiple-choice',
    sectionLabel: '5.2',
    tags: ['cost estimation'],
    text: 'The project team now estimates the cost of individual work items and adds them together to determine the total project cost. This is:',
    options: [
      'Analogous estimating',
      'Bottom-up estimating',
      'Parametric estimating',
      'Cash-flow analysis',
    ],
    correctAnswers: ['Bottom-up estimating'],
    points: 2,
    explanation: 'Bottom-up estimating estimates the cost of individual work components and aggregates them into the overall project estimate.',
  },

  {
    id: 'ITPMA_W4_Q5_3',
    type: 'fill-in-the-blank',
    sectionLabel: '5.3',
    tags: ['cost estimation'],
    text: 'The estimating technique that uses project characteristics or parameters within a mathematical model to estimate project cost is called ___ estimating.',
    blanks: [
      { id: 'b1', options: ['analogous', 'bottom-up', 'parametric', 'discretionary'], correctAnswer: 'parametric' },
    ],
  },

  {
    id: 'ITPMA_W4_Q5_4',
    type: 'multiple-choice',
    sectionLabel: '5.4',
    tags: ['cost estimation'],
    text: 'NexaCore is now approximately eight months from completion. Which type of estimate would generally provide a more appropriate classification than a very early ROM estimate?',
    options: [
      'Definitive estimate',
      'Initial strategic estimate',
      'Conceptual estimate',
      'Exploratory estimate',
    ],
    correctAnswers: ['Definitive estimate'],
    points: 2,
    explanation: 'Estimates become more refined as the project progresses and more information becomes available, moving from ROM through budgetary to definitive estimates.',
  },

  {
    id: 'ITPMA_W4_Q5_5',
    type: 'multiple-choice',
    sectionLabel: '5.5',
    tags: ['cost estimation'],
    text: 'The project team has spent considerable time producing its estimates, but Ayesha is concerned because several estimates were produced by people with little estimating experience and were completed under severe time pressure. Which conclusion is most appropriate?',
    options: [
      'The estimates are reliable because more than one person contributed to them',
      'The estimates may be inaccurate because insufficient time and estimating experience can contribute to inaccurate IT cost estimates',
      'Cost estimates become accurate automatically once they are entered into project-management software',
      'Estimates produced under time pressure are more reliable because they eliminate unnecessary analysis',
    ],
    correctAnswers: ['The estimates may be inaccurate because insufficient time and estimating experience can contribute to inaccurate IT cost estimates'],
    points: 2,
    explanation: 'Common IT cost-estimating problems include limitations around estimating experience and the circumstances under which estimates are produced, such as time pressure.',
  },

  {
    id: 'ITPMA_W4_Q5_6',
    type: 'show-answer',
    sectionLabel: '5.6',
    tags: ['cost estimation'],
    points: 6,
    text: 'The Finance Manager argues that the project should use the **lowest available estimate** because this gives management "the best chance of staying within budget." Critically evaluate this reasoning. Your response should distinguish between *producing an estimate* and *using an estimate responsibly for project decision-making*, drawing on the cost-estimation problems and techniques covered in the course.',
    correctAnswers: [
      'The Finance Manager\'s reasoning is flawed because an estimate is intended to provide a **credible prediction of expected cost**, not the smallest possible number.\n\nSelecting the lowest estimate simply because it creates the appearance of budget control can produce an unrealistic budget. If the estimate is systematically too low, the project may appear financially healthy at approval but later experience cost overruns.\n\nNexaCore should instead select an estimating approach appropriate to the project\'s information and maturity. Earlier in the project, **analogous estimating** may be appropriate when detailed information is unavailable. As the project becomes better understood, **bottom-up estimating** can provide a more detailed estimate by estimating individual components. **Three-point estimating** can additionally recognise uncertainty, while **parametric estimating** can use measurable project characteristics where an appropriate relationship exists.\n\nThe quality of the resulting estimate also depends on the quality of the information and the estimating process. Common IT estimating difficulties mean management should not assume that the lowest number is automatically the best number.\n\nTherefore, Ayesha should recommend the **most defensible estimate**, supported by an appropriate technique and available evidence, rather than deliberately selecting the lowest figure.',
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Rejects "lowest = best" reasoning | 1 |
| Explains consequences of unrealistic estimates | 1 |
| Applies analogous estimating | 1 |
| Applies bottom-up estimating | 1 |
| Recognises uncertainty/alternative techniques | 1 |
| Provides integrated management judgement | 1 |
| **Total** | **6** |`,
  },

  // ============================================================
  // QUESTION 6 — Budget, Baseline and Cost Control (18 marks)
  // ============================================================

  {
    id: 'SCENARIO_ITPMA_W4_Q6',
    type: 'scenario',
    title: 'Questions 6.1–6.6: Budget, Baseline and Cost Control (18 Marks)',
    context: `After estimating the project costs, NexaCore's project team allocates the expected costs to individual work items over time. The approved budget is established as the project's reference point for monitoring cost performance.

Three months into implementation, the project manager receives the following information:

| Measure | Amount |
|---|---:|
| Planned Value (PV) | R600 000 |
| Earned Value (EV) | R540 000 |
| Actual Cost (AC) | R675 000 |`,
  },

  {
    id: 'ITPMA_W4_Q6_1',
    type: 'multiple-choice',
    sectionLabel: '6.1',
    tags: ['cost management', 'budget'],
    text: 'The activity of allocating the overall project cost estimate to individual work items over time is part of:',
    options: [
      'Planning cost management',
      'Estimating costs',
      'Determining the budget',
      'Controlling the schedule',
    ],
    correctAnswers: ['Determining the budget'],
    points: 2,
    explanation: 'Determining the budget involves aggregating estimated costs and establishing the approved, time-phased project cost baseline.',
  },

  {
    id: 'ITPMA_W4_Q6_2',
    type: 'fill-in-the-blank',
    sectionLabel: '6.2',
    tags: ['cost management', 'budget'],
    text: 'The time-phased budget used by project managers to measure and monitor cost performance is called the cost ___.',
    blanks: [
      { id: 'b1', options: ['baseline', 'variance', 'index', 'estimate'], correctAnswer: 'baseline' },
    ],
  },

  {
    id: 'ITPMA_W4_Q6_3',
    type: 'show-answer',
    sectionLabel: '6.3',
    tags: ['earned value management'],
    points: 4,
    text: 'Using the figures provided (PV = R600 000, EV = R540 000, AC = R675 000):\n\n**a.** Calculate the Cost Variance (CV)\n\n**b.** Calculate the Schedule Variance (SV)\n\n**c.** State whether each result indicates favourable or unfavourable performance.\n\nUse: $CV = EV - AC$ and $SV = EV - PV$',
    correctAnswers: [
      'a. $CV = EV - AC = 540{,}000 - 675{,}000 = -R135\\,000$ — this is **unfavourable**.\n\nb. $SV = EV - PV = 540{,}000 - 600{,}000 = -R60\\,000$ — this is **unfavourable**.',
    ],
    markingGuide: `| Component | Marks |
|---|---|
| Correct CV calculation | 1 |
| Correct CV interpretation | 1 |
| Correct SV calculation | 1 |
| Correct SV interpretation | 1 |
| **Total** | **4** |`,
image: {
        src: "/images/ITPMA_W4_Q6.3.png",
        alt: "Earned Value Management data showing planned value, earned value, and actual cost for the NexaCore project.",
        caption: "Figure 5: NexaCore Earned Value Management data."
        }
  },

  {
    id: 'ITPMA_W4_Q6_4',
    type: 'show-answer',
    sectionLabel: '6.4',
    tags: ['earned value management'],
    points: 4,
    text: 'Calculate:\n\n**a.** Cost Performance Index (CPI)\n\n**b.** Schedule Performance Index (SPI)\n\nUse: $CPI = EV \\div AC$ and $SPI = EV \\div PV$. Then interpret what each result tells Ayesha about project performance.',
    correctAnswers: [
      'a. $CPI = \\dfrac{EV}{AC} = \\dfrac{540{,}000}{675{,}000} = 0.80$\n\nFor every R1.00 of actual cost, the project is generating approximately R0.80 of earned value. This indicates **unfavourable cost performance**.\n\nb. $SPI = \\dfrac{EV}{PV} = \\dfrac{540{,}000}{600{,}000} = 0.90$\n\nThe project is achieving approximately 90% of the planned schedule performance represented by the earned value measure. This indicates **unfavourable schedule performance**.',
    ],
    markingGuide: `| Component | Marks |
|---|---|
| CPI calculation | 1 |
| CPI interpretation | 1 |
| SPI calculation | 1 |
| SPI interpretation | 1 |
| **Total** | **4** |`,
  },

  {
    id: 'ITPMA_W4_Q6_5',
    type: 'multiple-choice',
    sectionLabel: '6.5',
    tags: ['earned value management'],
    text: 'Ayesha notices that the project\'s CPI is below 1. Which interpretation is most appropriate?',
    options: [
      'The project is obtaining less earned value per unit of actual cost than the planned cost efficiency would imply',
      'The project is necessarily ahead of schedule',
      'The project has completed more work than planned for the amount of money spent',
      'The project\'s cost baseline should automatically be deleted',
    ],
    correctAnswers: ['The project is obtaining less earned value per unit of actual cost than the planned cost efficiency would imply'],
    points: 2,
    explanation: 'A CPI below 1 indicates unfavourable cost performance because the earned value is less than the actual cost incurred.',
  },

  {
    id: 'ITPMA_W4_Q6_6',
    type: 'show-answer',
    sectionLabel: '6.6',
    tags: ['earned value management'],
    points: 4,
    text: 'The Project Sponsor says: "We\'ve spent R675 000, so the project is obviously behind budget." Explain why **Actual Cost alone is insufficient** to properly assess NexaCore\'s performance. Your answer must explain how PV, EV and AC work together to provide a more meaningful assessment.',
    correctAnswers: [
      'Actual Cost (**AC**) tells Ayesha how much has actually been spent, but it does not tell her whether that amount represents good or poor performance.\n\nFor example, R675 000 could be entirely reasonable if the project had completed significantly more work than planned. Conversely, the same amount could represent poor performance if relatively little work had been completed.\n\nThis is why **PV, EV and AC must be considered together**.\n\n- **PV** indicates the value of work that was planned to have been completed.\n- **EV** indicates the value of work actually completed in relation to the approved plan.\n- **AC** indicates what was actually spent.\n\nComparing these measures produces **cost variance, schedule variance, CPI and SPI**, providing a more meaningful picture of project performance.',
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Explains limitation of AC alone | 1 |
| Explains PV | 1 |
| Explains EV | 1 |
| Explains combined EVM interpretation | 1 |
| **Total** | **4** |`,
  },

  // ============================================================
  // QUESTION 7 — Integrated Management Decision (4 marks)
  // ============================================================

  {
    id: 'ITPMA_W4_Q7_1',
    type: 'show-answer',
    sectionLabel: '7.1',
    tags: ['schedule control'],
    points: 4,
    text: 'Two months later, NexaCore\'s project board receives the following information: a critical-path activity is taking longer than planned; the project has an unfavourable cost variance; some stakeholders are requesting changes to the schedule; the project team is considering changing the schedule baseline; and senior management wants immediate assurance that the project remains controllable.\n\nAs project manager, explain the **four key objectives of schedule control** that should guide your response to the situation. Your answer should demonstrate how schedule control goes beyond merely observing whether activities are late.',
    correctAnswers: [
      'The four key objectives of schedule control are to:\n\n1. **Monitor the current status of the project schedule** and determine whether actual progress corresponds with the planned schedule.\n2. **Identify factors that cause schedule changes**, including deviations or emerging problems.\n3. **Manage changes to the actual schedule**, rather than allowing changes to occur without control.\n4. **Update the schedule appropriately** so that it remains a useful representation of the project\'s current position.\n\nFor NexaCore, Ayesha should therefore not simply observe that the critical-path activity is late. She should determine why the delay occurred, assess its effect on the schedule, manage any required change, and maintain an updated schedule that accurately reflects the project\'s status.',
    ],
    markingGuide: `| Required objective | Marks |
|---|---|
| Monitor/determine schedule status | 1 |
| Identify causes/factors producing changes | 1 |
| Manage/control schedule changes | 1 |
| Update/maintain the schedule | 1 |
| **Total** | **4** |`,
  },

  // ============================================================
  // QUESTION 8 — Executive-Level Synthesis (10 marks)
  // ============================================================

  {
    id: 'ITPMA_W4_Q8_1',
    type: 'show-answer',
    sectionLabel: '8.1',
    tags: ['schedule management', 'cost management'],
    points: 10,
    text: 'The NexaCore Board has asked Ayesha to give a recommendation on whether the current project-control approach is sufficiently reliable. The Board\'s argument is: "We have a Gantt chart, a budget and project-management software. Therefore, the project is under control."\n\n**Critically evaluate the Board\'s conclusion.** Construct an evidence-based response explaining how schedule management and cost management must work together to provide meaningful project control. Your answer should integrate: *activity definition*; *dependencies*; *schedule development*; *critical path*; *uncertainty in estimates*; *cost estimation*; *determining the budget*; *cost baseline*; *earned value information*; *schedule/cost performance indicators*; and *the appropriate use and limitations of project-management software*.',
    correctAnswers: [
      'The Board\'s conclusion is **not sufficient**. A Gantt chart, budget and project-management software are useful project-management tools, but their existence does not demonstrate that the underlying project information is reliable or that the project is under control.\n\nFirst, NexaCore requires properly **defined activities**. Activities need sufficient detail to establish resources, durations, dependencies, assumptions and constraints. Poorly defined activities produce weak scheduling information regardless of which software is used.\n\nSecond, the activities must be **correctly sequenced**. Dependencies determine how activities relate to one another, and network diagrams provide a way of representing those relationships. Incorrect dependencies can make a schedule appear achievable when it is not.\n\nThird, the resulting schedule needs to be analysed. **Critical Path Analysis** identifies the longest path through the network and therefore the activities that have the greatest influence on the project completion date.\n\nFourth, schedule estimates must recognise **uncertainty**. Three-point estimating and PERT provide approaches for dealing with uncertainty rather than presenting uncertain durations as if they were guaranteed.\n\nCost management must receive the same level of discipline. NexaCore should use an appropriate cost-estimation technique, such as analogous, bottom-up, three-point or parametric estimating, depending on the information available and nature of the estimate.\n\nOnce costs have been estimated and aggregated, the approved budget becomes the **cost baseline**. This provides the reference against which project cost performance can be assessed.\n\nHowever, the baseline alone does not demonstrate that the project is performing well. Earned Value Management combines **PV, EV and AC**, allowing Ayesha to calculate indicators such as CV, SV, CPI and SPI. These measures reveal relationships between planned work, completed work and actual expenditure that a simple statement of "money spent" cannot reveal.\n\nThe schedule and cost systems are also interconnected. For example, a critical-path delay may require additional resources or extended project duration, potentially increasing costs. Conversely, cost constraints may influence resource availability and therefore the schedule.\n\nFinally, project-management software should be treated as an **enabling tool rather than a replacement for project judgement**. It can support communication, scheduling, trade-off analysis and time management, but incorrect dependencies, poor assumptions or inappropriate templates can produce misleading results.\n\nTherefore, the Board should not ask simply whether NexaCore has a Gantt chart, budget and software. It should ask whether the **activities, dependencies, estimates, baseline and performance information underlying those tools are credible and actively controlled**.',
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Critically challenges the Board's conclusion | 1 |
| Activity definition | 1 |
| Dependencies/network scheduling | 1 |
| Critical path | 1 |
| Uncertainty/estimation | 1 |
| Cost-estimation techniques | 1 |
| Cost baseline/budget | 1 |
| PV/EV/AC and EVM | 1 |
| Integration of schedule and cost management | 1 |
| Evaluation of project-management software and overall synthesis | 1 |
| **Total** | **10** |`,
image: {
        src: "/images/ITPMA_W4_Q8.png",
        alt: "NexaCore project-control dashboard showing schedule and cost performance information for the systems replacement project.",
        caption: "Figure 6: NexaCore project-control dashboard."
        }
  },

];