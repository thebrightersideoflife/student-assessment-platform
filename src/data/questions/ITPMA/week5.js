// src/data/questions/ITPMA/week5.js

export default [
  // ══════════════════════════════════════════════════════════════
  // QUESTION 1 — PROJECT QUALITY MANAGEMENT IN A DIGITAL MANUFACTURING PROJECT (20 Marks)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'SCENARIO_ITPMA_W5_Q1',
    type: 'scenario',
    title: 'Question 1: Project Quality Management in a Digital Manufacturing Project (20 Marks)',
    context: `**Apex Electronics International (AEI)** is a multinational manufacturer of smart electronic devices. AEI has launched the **OnePlant Digital Operations Project**, intended to replace fragmented production-monitoring systems used across its manufacturing plants.

The new system will integrate production information, inventory information, equipment-performance information and management reporting. Senior management expects the project to improve operational decision-making and productivity.

During the first implementation cycle, however, several problems have emerged:
- Some reports contain incorrect production figures.
- A monitoring screen technically conforms to the documented specification but is difficult for production supervisors to use.
- Different project team members interpret "acceptable system performance" differently.
- Project management has concentrated heavily on finding defects after development rather than preventing them.
- Management wants the project delivered quickly and has questioned whether quality activities are "worth the additional cost."

The project manager has therefore asked the team to reconsider how quality is defined, planned, managed and controlled.`,
  },

  // 1.1 — MCQ | 2 marks
  {
    id: 'ITPMA_W5_Q1_1',
    type: 'multiple-choice',
    tags: ['quality management', 'fitness for use'],
    sectionLabel: '1.1',
    text: 'The monitoring screen satisfies every feature explicitly stated in the approved specification, but production supervisors cannot practically use it to perform their work efficiently. Which interpretation of quality is **most directly** being challenged?',
    options: [
      'Conformance to requirements',
      'Fitness for use',
      'Cost of conformance',
      'Statistical sampling',
    ],
    correctAnswers: ['Fitness for use'],
    points: 2,
    explanation: 'Conformance means satisfying written specifications; **fitness for use** concerns whether the product can actually be used as intended. The scenario deliberately separates technical compliance from practical usefulness.',
  },

  // 1.2 — Fill in the blank | 2 marks
  {
    id: 'ITPMA_W5_Q1_2',
    type: 'fill-in-the-blank',
    tags: ['quality management', 'quality planning'],
    sectionLabel: '1.2',
    text: 'The process of identifying which quality standards are relevant to the project and determining how those standards will be satisfied is called ___ quality management.',
    blanks: [
      {
        id: 'b1',
        options: ['controlling', 'managing', 'auditing', 'planning'],
        correctAnswer: 'planning',
      },
    ],
  },

  // 1.3 — MCQ | 2 marks
  {
    id: 'ITPMA_W5_Q1_3',
    type: 'multiple-choice',
    tags: ['quality management', 'defect prevention'],
    sectionLabel: '1.3',
    text: 'The project manager wants to prevent defects rather than discover them after the system has already been developed. Which action is **most consistent** with the quality-management approach taught in the course?',
    options: [
      'Increase the number of defects recorded during final testing',
      'Select appropriate materials, train people in quality and plan processes that produce the desired outcome',
      'Wait until the customer identifies defects and then perform rework',
      'Accept minor defects so that the project can finish earlier',
    ],
    correctAnswers: ['Select appropriate materials, train people in quality and plan processes that produce the desired outcome'],
    points: 2,
    explanation: 'Quality planning is **preventive**. Selecting appropriate materials, training people in quality, and planning processes that produce the appropriate outcome are the taught defect-prevention methods, as opposed to detecting defects only after the fact.',
  },

  // 1.4 — Short factual (open-ended) | 2 marks
  {
    id: 'ITPMA_W5_Q1_4',
    type: 'open-ended',
    tags: ['quality management', 'continuous improvement'],
    sectionLabel: '1.4',
    text: 'What is the Japanese term used in the course for continuous improvement or change for the better? Answer in 1–3 words.',
    correctAnswers: ['Kaizen'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 10,
    },
  },

  // 1.5 — Essay (show-answer) | 6 marks
  {
    id: 'ITPMA_W5_Q1_5',
    type: 'show-answer',
    tags: ['quality management', 'planning managing controlling quality'],
    sectionLabel: '1.5',
    text: 'AEI\'s project manager argues:\n\n*"Quality is primarily the testing department\'s responsibility. If the final product passes inspection, the project has achieved quality."*\n\nCritically evaluate this statement. In your answer, distinguish between **planning quality management, managing quality and controlling quality**, and explain why treating quality purely as final inspection creates weaknesses in the AEI project.',
    correctAnswers: [
      'The statement is incorrect because quality management is not simply a final inspection activity. **Planning quality management** identifies the relevant quality standards and determines how those standards will be satisfied.\n\n'
      + '**Managing quality** translates the quality-management plan into executable quality activities and includes quality-assurance activities and continuous improvement.\n\n'
      + '**Controlling quality** monitors specific project results to determine whether they comply with relevant quality standards.\n\n'
      + 'In AEI\'s case, concentrating on final inspection means defects and process weaknesses may only become visible after considerable development effort has already been spent. Prevention-oriented planning, training and appropriate processes can reduce the likelihood of defects occurring in the first place. Managing quality then ensures that the planned quality approach is actually implemented, while controlling quality provides evidence about whether the resulting outputs satisfy the standards.\n\n'
      + 'Therefore, inspection remains important, but it is only one component of a broader quality-management system.',
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Correctly rejects the "testing department owns quality" proposition | 1 |
| Explains planning quality management | 1 |
| Explains managing quality/quality assurance | 1 |
| Explains controlling quality | 1 |
| Applies all three to AEI rather than merely defining them | 1 |
| Explains the weakness of relying exclusively on final inspection | 1 |
| **Total** | **6** |`,
    points: 6,
  },

  // 1.6 — MCQ | 2 marks
  {
    id: 'ITPMA_W5_Q1_6',
    type: 'multiple-choice',
    tags: ['quality management', 'benchmarking'],
    sectionLabel: '1.6',
    text: 'AEI wants to compare its defect-prevention practices with those used by another successful electronics manufacturer in order to identify opportunities for improvement. Which quality-management technique is being described?',
    options: [
      'Statistical sampling',
      'Benchmarking',
      'Rework',
      'Acceptance decision',
    ],
    correctAnswers: ['Benchmarking'],
    points: 2,
    explanation: '**Benchmarking** compares project practices or product characteristics with those of other projects or products to generate ideas for improvement.',
  },

  // 1.7 — Essay (show-answer) | 4 marks
  {
    id: 'ITPMA_W5_Q1_7',
    type: 'show-answer',
    tags: ['quality management', 'cost of quality'],
    sectionLabel: '1.7',
    text: 'AEI discovers that a large proportion of its project budget is being spent correcting defects **after customers have received the system**. Explain why this situation is strategically concerning by distinguishing between **cost of conformance** and **cost of nonconformance**, and identify the relevant quality-cost category involved.',
    correctAnswers: [
      'The **cost of quality** consists of the cost of conformance and the cost of nonconformance. Conformance costs are associated with delivering products that meet requirements and are fit for use, while nonconformance costs arise when failures occur or quality expectations are not met.\n\n'
      + 'Because AEI\'s defects are being discovered **after customers have received the system**, the situation represents an **external failure cost**. External failure costs arise from errors that were not detected and corrected before delivery to the customer.\n\n'
      + 'This is strategically concerning because AEI is paying to correct problems after delivery rather than preventing them earlier, potentially increasing the financial and reputational consequences of poor quality.',
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Defines/distinguishes conformance and nonconformance | 1 |
| Correctly identifies external failure cost | 1 |
| Explains why post-delivery failure is costly | 1 |
| Connects prevention to improved quality economics | 1 |
| **Total** | **4** |`,
    points: 4,
  },

  // ══════════════════════════════════════════════════════════════
  // QUESTION 2 — QUALITY CONTROL AND DECISION-MAKING (20 Marks)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'SCENARIO_ITPMA_W5_Q2',
    type: 'scenario',
    title: 'Question 2: Quality Control and Decision-Making (20 Marks)',
    context: `Six months into the OnePlant Digital Operations Project, AEI begins formally measuring system quality.

The project team records:
- number of defects discovered,
- frequency of defects,
- locations where defects occur,
- whether products/services meet acceptance requirements,
- corrective actions performed,
- process changes introduced after quality measurements.

The quality manager proposes using several graphical and analytical tools rather than relying on informal observations.`,
  },

  // 2.1 — MCQ | 2 marks
  {
    id: 'ITPMA_W5_Q2_1',
    type: 'multiple-choice',
    tags: ['quality control', 'quality tools'],
    sectionLabel: '2.1',
    text: 'A quality analyst wants to identify the **relationship between two variables**, such as the number of hours a system component is tested and the number of defects subsequently discovered. Which tool is most appropriate?',
    options: [
      'Histogram',
      'Scatter diagram',
      'Pareto chart',
      'Checksheet',
    ],
    correctAnswers: ['Scatter diagram'],
    points: 2,
    image: {
        src: "/images/ITPMA_W5_Q2.1.png",
        alt: "Scatter diagram showing the relationship between testing hours and the number of defects detected in the AEI software project.",
        caption: "Figure 1: AEI Project Testing and Defect Data"
        },
    explanation: 'A **scatter diagram** is used to examine the relationship between two variables.',
  },

  // 2.2 — Short factual (open-ended) | 2 marks
  {
    id: 'ITPMA_W5_Q2_2',
    type: 'open-ended',
    tags: ['quality control', 'quality tools'],
    sectionLabel: '2.2',
    text: 'Name the quality-control tool used to display the distribution of numerical observations into intervals. Answer in 1–3 words.',
    correctAnswers: ['Histogram'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 10,
    },
    image: {
        src: "/images/ITPMA_W5_Q2.2.png",
        alt: "Histogram showing the frequency distribution of a numerical software project quality measure across several intervals.",
        caption: "Figure 2: Distribution of AEI Project Quality Measurements"
        }
  },

  // 2.3 — MCQ | 2 marks
  {
    id: 'ITPMA_W5_Q2_3',
    type: 'multiple-choice',
    tags: ['quality control', 'pareto chart'],
    sectionLabel: '2.3',
    text: 'A quality manager wants to identify which relatively small number of defect categories account for the largest proportion of the project\'s quality problems. Which tool would be most appropriate?',
    options: [
      'Pareto chart',
      'Control chart',
      'Flowchart',
      'Scatter diagram',
    ],
    correctAnswers: ['Pareto chart'],
    points: 2,
    image: {
        src: "/images/ITPMA_W5_Q2.3.png",
        alt: "Combined bar and cumulative-percentage chart showing the frequencies of different software project defect categories.",
        caption: "Figure 3: AEI Project Defect Categories"
        },
    explanation: 'The **Pareto chart** is appropriate when the objective is to identify the relatively small number of categories contributing to a large proportion of problems.',
  },

  // 2.4 — Fill in the blank | 2 marks
  {
    id: 'ITPMA_W5_Q2_4',
    type: 'fill-in-the-blank',
    tags: ['quality control', 'sampling'],
    sectionLabel: '2.4',
    text: 'The quality-control activity in which only part of a population is selected for inspection is known as statistical ___.',
    blanks: [
      {
        id: 'b1',
        options: ['sampling', 'benchmarking', 'auditing', 'rework'],
        correctAnswer: 'sampling',
      },
    ],
  },

  // 2.5 — MCQ | 2 marks
  {
    id: 'ITPMA_W5_Q2_5',
    type: 'multiple-choice',
    tags: ['quality control', 'rework'],
    sectionLabel: '2.5',
    text: 'A batch of system outputs has been rejected because they do not meet agreed requirements. The team modifies the outputs so that they comply with the required specifications. This is an example of:',
    options: [
      'Acceptance',
      'Rework',
      'Benchmarking',
      'Prevention',
    ],
    correctAnswers: ['Rework'],
    points: 2,
    explanation: '**Rework** brings rejected items into compliance with requirements, specifications or stakeholder expectations.',
  },

  // 2.6 — Essay (show-answer) | 6 marks
  {
    id: 'ITPMA_W5_Q2_6',
    type: 'show-answer',
    tags: ['quality control', 'controlling quality outputs'],
    sectionLabel: '2.6',
    text: 'The quality manager tells the project steering committee:\n\n*"Our quality-control measurements are useful only if they lead to decisions."*\n\nUsing the AEI scenario, explain the **three main outputs of controlling quality** and show how each could result from information gathered during quality control.',
    correctAnswers: [
      'The three principal outputs are **acceptance decisions, rework and process adjustments**.\n\n'
      + 'An **acceptance decision** determines whether the resulting product or service should be accepted or rejected. For example, AEI could determine that a production report satisfies all agreed quality criteria and therefore accept it.\n\n'
      + '**Rework** occurs when an output is rejected and must be corrected so that it complies with requirements or expectations. If AEI identifies incorrect production calculations, developers may correct the underlying system and regenerate the affected reports.\n\n'
      + '**Process adjustments** modify the process to correct or prevent further quality problems. If AEI discovers that the same class of defect repeatedly originates from an inadequate review procedure, the development or testing process could be changed.\n\n'
      + 'The important distinction is that quality control does not merely produce measurements; those measurements can lead to decisions about the **product and the process**.',
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Acceptance decisions accurately explained | 2 |
| Rework accurately explained | 1 |
| Process adjustments accurately explained | 2 |
| Applied example showing how measurements lead to decisions | 1 |
| **Total** | **6** |`,
    points: 6,
    image: {
        src: "/images/ITPMA_W5_Q2.6.png",
        alt: "Quality-control results table showing testing, defects, and acceptance information for several AEI software components.",
        caption: "Figure 4: AEI Software Quality-Control Results"
        }
  },

  // 2.7 — Essay (show-answer) | 4 marks
  {
    id: 'ITPMA_W5_Q2_7',
    type: 'show-answer',
    tags: ['quality control', 'sampling'],
    sectionLabel: '2.7',
    text: 'AEI has 20,000 production records that could potentially be inspected. Inspecting every record would consume substantial project resources. Explain why **statistical sampling** may be appropriate and discuss the principle that should determine how large the sample should be.',
    correctAnswers: [
      'Statistical sampling allows AEI to inspect a portion of a large population rather than every individual item. This is useful where inspecting all 20,000 records would consume excessive time and resources.\n\n'
      + 'However, the sample must be sufficiently representative of the population. Sample size depends on how representative the sample needs to be, using the formula:\n\n'
      + '$$Sample\\ size = .25 \\times \\left(\\frac{certainty\\ factor}{acceptable\\ error}\\right)^2$$\n\n'
      + 'Therefore, AEI should not choose a convenient sample size arbitrarily; the required certainty and acceptable error should influence the sample.',
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Explains why sampling reduces inspection burden | 1 |
| Explains representativeness | 1 |
| Identifies certainty/acceptable error as relevant | 1 |
| Correctly uses/recognises the supplied formula | 1 |
| **Total** | **4** |`,
    points: 4,
  },

  // ══════════════════════════════════════════════════════════════
  // QUESTION 3 — PROJECT RESOURCE MANAGEMENT AND ORGANISATIONAL DESIGN (20 Marks)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'SCENARIO_ITPMA_W5_Q3',
    type: 'scenario',
    title: 'Question 3: Project Resource Management and Organisational Design (20 Marks)',
    context: `The OnePlant Digital Operations Project has entered a difficult implementation phase.

AEI's project team contains:
- software developers,
- production specialists,
- business analysts,
- database specialists,
- project managers,
- technical support staff,
- external consultants.

Several departments are competing for the same specialists. Team members are uncertain about who is responsible for certain deliverables. Management has also noticed that some resources are heavily overloaded while others are underutilised.

The project manager decides that the project's resource-management arrangements need to be formalised.`,
  },

  // 3.1 — MCQ | 2 marks
  {
    id: 'ITPMA_W5_Q3_1',
    type: 'multiple-choice',
    tags: ['resource management'],
    sectionLabel: '3.1',
    text: 'Which statement **best describes project resource management** in the context of AEI?',
    options: [
      'Managing only the project\'s financial expenditure',
      'Making the most effective use of the human and physical resources involved in the project',
      'Ensuring that all project employees report directly to the project manager',
      'Monitoring only the technical resources used by developers',
    ],
    correctAnswers: ['Making the most effective use of the human and physical resources involved in the project'],
    points: 2,
    explanation: 'Project resource management covers making the most effective use of **both human and physical resources** involved in the project.',
  },

  // 3.2 — Fill in the blank | 2 marks
  {
    id: 'ITPMA_W5_Q3_2',
    type: 'fill-in-the-blank',
    tags: ['resource management', 'resource management plan'],
    sectionLabel: '3.2',
    text: 'A document that identifies and documents project resources, roles, responsibilities, skills and reporting relationships is called the resource management ___.',
    blanks: [
      {
        id: 'b1',
        options: ['chart', 'histogram', 'plan', 'charter'],
        correctAnswer: 'plan',
      },
    ],
  },

  // 3.3 — MCQ | 2 marks
  {
    id: 'ITPMA_W5_Q3_3',
    type: 'multiple-choice',
    tags: ['resource management', 'responsibility assignment matrix'],
    sectionLabel: '3.3',
    text: 'The project manager wants to show **who is responsible for performing particular project work and how responsibilities are allocated**. Which artefact is most directly suited to this purpose?',
    options: [
      'Resource histogram',
      'Responsibility assignment matrix',
      'Team charter',
      'Quality audit',
    ],
    correctAnswers: ['Responsibility assignment matrix'],
    points: 2,
    image: {
        src: "/images/ITPMA_W5_Q3.3.png",
        alt: "Project responsibility matrix mapping AEI project roles to major project activities using responsibility indicators.",
        caption: "Figure 5: AEI Project Responsibilities"
        },
    explanation: 'The **responsibility assignment matrix (RAM)** is specifically used to connect project work with responsibilities.',
  },

  // 3.4 — Short factual (open-ended) | 2 marks
  {
    id: 'ITPMA_W5_Q3_4',
    type: 'open-ended',
    tags: ['resource management', 'staffing management plan'],
    sectionLabel: '3.4',
    text: 'What document describes when and how people are added to and removed from a project team?',
    correctAnswers: ['Staffing management plan', 'Staffing plan'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 15,
      allowPartialMatch: true,
    },
  },

  // 3.5 — MCQ | 2 marks
  {
    id: 'ITPMA_W5_Q3_5',
    type: 'multiple-choice',
    tags: ['resource management', 'resource histogram'],
    sectionLabel: '3.5',
    text: 'AEI\'s project manager needs to determine how many programmers, business analysts and technical writers will be required during each month of the project. Which tool would provide the most useful visual representation?',
    options: [
      'Resource histogram',
      'Quality audit',
      'Pareto chart',
      'Team charter',
    ],
    correctAnswers: ['Resource histogram'],
    points: 2,
    image: {
        src: "/images/ITPMA_W5_Q3.5.png",
        alt: "Resource histogram showing the number of developers required across six weeks compared with available developer capacity.",
        caption: "Figure 6: AEI Project Developer Resource Requirements"
        },
    explanation: 'A **resource histogram** can show the number of people needed in different areas across project periods.',
  },

  // 3.6 — Essay (show-answer) | 6 marks
  {
    id: 'ITPMA_W5_Q3_6',
    type: 'show-answer',
    tags: ['resource management', 'organisational design'],
    sectionLabel: '3.6',
    text: 'The project manager discovers that several team members have unclear responsibilities and that different departments have conflicting expectations about who should perform certain activities.\n\nExplain how **a project organisational chart, responsibility assignment matrix, staffing management plan/resource histogram, and team charter** could collectively address these problems.\n\nYour answer must distinguish the purpose of each rather than merely defining the terms.',
    correctAnswers: [
      'The four artefacts address different aspects of AEI\'s resource-management problem.\n\n'
      + 'A **project organisational chart** shows the structure of the project and reporting relationships. It would help team members understand where different roles fit within the project.\n\n'
      + 'A **responsibility assignment matrix (RAM)** associates project activities with responsible individuals or groups. It is particularly useful for AEI because departments are currently uncertain about who owns particular activities.\n\n'
      + 'A **staffing management plan** addresses the timing of human-resource requirements by describing when people are added to and removed from the project. A **resource histogram** provides a visual representation of resource requirements over time and could expose periods in which specialists are overloaded or underutilised.\n\n'
      + 'Finally, a **team charter** establishes guidance for how the team will operate and supports teamwork and communication.\n\n'
      + 'Thus, these are complementary rather than interchangeable: the organisational chart addresses structure, the RAM addresses responsibility, the staffing plan and histogram address resource timing/capacity, and the charter addresses team operating arrangements.',
    ],
    markingGuide: `| Component | Marks |
|---|---|
| Organisational chart — purpose + application | 1 |
| RAM — purpose + application | 2 |
| Staffing plan/resource histogram — purpose + application | 2 |
| Team charter — purpose + application | 1 |
| **Total** | **6** |`,
    points: 6,
  },

  // 3.7 — MCQ | 2 marks
  {
    id: 'ITPMA_W5_Q3_7',
    type: 'multiple-choice',
    tags: ['resource management', 'expert judgment'],
    sectionLabel: '3.7',
    text: 'Before estimating the resources required for a highly specialised activity, the project manager consults experienced specialists who have worked on similar projects. Which resource-estimation technique is most directly being used?',
    options: [
      'Expert judgment',
      'Process adjustment',
      'Benchmarking',
      'Statistical sampling',
    ],
    correctAnswers: ['Expert judgment'],
    points: 2,
    explanation: '**Expert judgment** is explicitly identified as a resource-estimation technique.',
  },

  // 3.8 — Essay (show-answer) | 2 marks
  {
    id: 'ITPMA_W5_Q3_8',
    type: 'show-answer',
    tags: ['resource management', 'IT project challenges'],
    sectionLabel: '3.8',
    text: 'Why can effective resource management be particularly difficult in an IT project such as AEI\'s? Give **two tightly connected reasons** based on the scenario and course material.',
    correctAnswers: [
      'IT projects are particularly dependent on specialised human expertise, and qualified IT personnel can be difficult to find and retain. In AEI, specialists are also shared across departments, creating competition for scarce resources. Effective resource management must therefore balance project requirements with both organisational needs and individual resource constraints.',
    ],
    markingGuide: `- **1 mark:** Recognises scarcity/specialisation of IT skills.
- **1 mark:** Applies this to competing organisational/project resource demands.

**Examiner note:** Two well-connected reasons are required. Listing unrelated difficulties does not demonstrate understanding.`,
    points: 2,
  },

  // ══════════════════════════════════════════════════════════════
  // QUESTION 4 — MOTIVATION, LEADERSHIP AND TEAM DEVELOPMENT (20 Marks)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'SCENARIO_ITPMA_W5_Q4',
    type: 'scenario',
    title: 'Question 4: Motivation, Leadership and Team Development (20 Marks)',
    context: `As the project moves closer to deployment, tensions within the AEI team increase.

Some developers are highly motivated because they enjoy solving technically difficult problems. Others are primarily motivated by bonuses attached to successful implementation.

A senior developer complains that the project provides insufficient recognition for exceptional performance. Another team member argues that the working environment and available equipment are inadequate.

At the same time, the team has begun disagreeing about technical decisions. The project manager notices that the team's behaviour has changed significantly since its formation.`,
  },

  // 4.1 — MCQ | 2 marks
  {
    id: 'ITPMA_W5_Q4_1',
    type: 'multiple-choice',
    tags: ['motivation', 'intrinsic motivation'],
    sectionLabel: '4.1',
    text: 'A developer continues working on a difficult technical problem because they genuinely enjoy solving challenging problems, even though no additional reward is offered. This is best classified as:',
    options: [
      'Extrinsic motivation',
      'Intrinsic motivation',
      'Coercive power',
      'Legitimate power',
    ],
    correctAnswers: ['Intrinsic motivation'],
    points: 2,
    explanation: '**Intrinsic motivation** comes from participating in an activity for its own enjoyment or satisfaction, rather than primarily for an external reward.',
  },

  // 4.2 — MCQ | 2 marks
  {
    id: 'ITPMA_W5_Q4_2',
    type: 'multiple-choice',
    tags: ['motivation', 'herzberg'],
    sectionLabel: '4.2',
    text: 'AEI provides improved equipment, better working conditions and health benefits. These changes reduce dissatisfaction but do not necessarily create strong long-term job satisfaction. According to Herzberg\'s theory as presented in the course, these are primarily:',
    options: [
      'Motivators',
      'Hygiene factors',
      'Referent factors',
      'Intrinsic rewards',
    ],
    correctAnswers: ['Hygiene factors'],
    points: 2,
    explanation: 'Herzberg distinguishes **motivators**, which contribute to job satisfaction, from **hygiene factors**, whose absence can cause dissatisfaction but whose presence does not strongly motivate.',
  },

  // 4.3 — Fill in the blank | 2 marks
  {
    id: 'ITPMA_W5_Q4_3',
    type: 'fill-in-the-blank',
    tags: ['team development', 'tuckman model'],
    sectionLabel: '4.3',
    text: 'According to the Tuckman model, the team-development stage immediately preceding Performing is ___.',
    blanks: [
      {
        id: 'b1',
        options: ['Norming', 'Storming', 'Forming', 'Adjourning'],
        correctAnswer: 'Norming',
      },
    ],
    image: {
        src: "/images/ITPMA_W5_Q4.3.png",
        alt: "Five-stage timeline showing the changing behaviours of an AEI project team from initial formation through project completion.",
        caption: "Figure 7: AEI Project Team Development"
        }
  },

  // 4.4 — MCQ | 2 marks
  {
    id: 'ITPMA_W5_Q4_4',
    type: 'multiple-choice',
    tags: ['leadership', 'power'],
    sectionLabel: '4.4',
    text: 'A project manager persuades a senior technical specialist to support a project decision primarily because the specialist respects the manager\'s expertise and technical knowledge. Which type of power is most directly involved?',
    options: [
      'Coercive',
      'Legitimate',
      'Expert',
      'Reward',
    ],
    correctAnswers: ['Expert'],
    points: 2,
    explanation: 'The project manager is influencing the specialist through recognised expertise rather than formal authority, reward or punishment — this is **expert power**.',
  },

  // 4.5 — Short factual (open-ended) | 2 marks
  {
    id: 'ITPMA_W5_Q4_5',
    type: 'open-ended',
    tags: ['leadership', 'emotional intelligence'],
    sectionLabel: '4.5',
    text: 'What term describes the ability to understand and manage one\'s own emotions while understanding the emotions of others?',
    correctAnswers: ['Emotional intelligence'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 10,
    },
  },

  // 4.6 — Essay (show-answer) | 6 marks
  {
    id: 'ITPMA_W5_Q4_6',
    type: 'show-answer',
    tags: ['leadership', 'influence and power'],
    sectionLabel: '4.6',
    text: 'AEI\'s project manager has begun using authority, penalties and financial incentives as the main ways of influencing the team.\n\nThe project manager argues:\n\n*"People respond to power, so this is the most efficient way to manage them."*\n\nCritically evaluate this approach using the course concepts of **influence and power**. Explain why reliance on authority, money or penalties can create weaknesses and identify more appropriate bases for influencing project team members.',
    correctAnswers: [
      'The project manager\'s approach is too dependent on formal or coercive mechanisms. The course distinguishes **influence** from **power**: influence involves ways of persuading or affecting behaviour, while power is the potential ability to influence behaviour and may be exercised more forcefully. The course identifies coercive, legitimate, expert, reward and referent power.\n\n'
      + 'Power itself is not necessarily inappropriate. However, projects are more likely to fail when managers rely too heavily on **authority, money or penalties**. In AEI, excessive dependence on these mechanisms may produce compliance without genuine commitment or collaboration.\n\n'
      + 'The manager should therefore make greater use of expertise, constructive work challenges, interpersonal skills and appropriate leadership. Leadership should also be adapted to the circumstances because there is no single best leadership style.\n\n'
      + 'The strongest approach is consequently not to eliminate power, but to avoid making coercion and rewards the primary mechanisms through which the team is managed.',
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Distinguishes influence and power | 1 |
| Identifies relevant forms of power | 1 |
| Recognises that power itself is not inherently wrong | 1 |
| Explains weakness of excessive authority/money/penalties | 1 |
| Proposes better influence/leadership mechanisms | 1 |
| Applies reasoning to AEI | 1 |
| **Total** | **6** |`,
    points: 6,
  },

  // 4.7 — Essay (show-answer) | 4 marks
  {
    id: 'ITPMA_W5_Q4_7',
    type: 'show-answer',
    tags: ['team development', 'tuckman model'],
    sectionLabel: '4.7',
    text: 'The AEI team has moved from **Forming** into a period of serious disagreement. Team members are questioning one another\'s decisions and competing for influence.\n\nUsing the **Tuckman model**, explain what is happening and recommend what the project manager should focus on to help the team progress toward effective performance.',
    correctAnswers: [
      'The team is entering the **Storming** stage of Tuckman\'s model. This stage is characterised by disagreement as team members establish relationships, responsibilities and ways of working.\n\n'
      + 'The project manager should not automatically suppress the disagreement. Instead, they should establish clearer expectations, facilitate communication, encourage constructive interaction and use appropriate team-development activities. Training can also address individual or team-development needs.\n\n'
      + 'The objective is to help the team develop effective norms and progress toward **Norming**, followed by **Performing**, where members can work together effectively toward project objectives.',
    ],
    markingGuide: `- **1 mark:** Correctly identifies Storming.
- **1 mark:** Explains why the behaviour is consistent with Storming.
- **1 mark:** Gives appropriate managerial response.
- **1 mark:** Connects response to progression toward Performing.`,
    points: 4,
    image: {
        src: "/images/ITPMA_W5_Q4.7.png",
        alt: "Five-phase illustration showing how the AEI project team changes from initial formation to project completion.",
        caption: "Figure 8: AEI Project Team Lifecycle"
        }
  },

  // ══════════════════════════════════════════════════════════════
  // QUESTION 5 — MANAGING CONFLICT AND PROJECT TEAM PERFORMANCE (20 Marks)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'SCENARIO_ITPMA_W5_Q5',
    type: 'scenario',
    title: 'Question 5: Managing Conflict and Project Team Performance (20 Marks)',
    context: `Three months before deployment, a serious disagreement develops between AEI's production specialists and software developers.

The production specialists want the system changed immediately because the current workflow is inconvenient for factory staff. Developers argue that changing the workflow now would introduce unacceptable technical risks.

During a project meeting:
- one manager attempts to impose his preferred solution;
- another attempts to avoid discussing the issue;
- a third person proposes that both sides give up some of their requirements;
- eventually, the project manager asks both groups to explain their underlying concerns and work toward a solution incorporating the strongest aspects of both viewpoints.

The project manager also discovers that the team has begun performing poorly because members are avoiding disagreement rather than challenging weak ideas.`,
  },

  // 5.1 — MCQ | 2 marks
  {
    id: 'ITPMA_W5_Q5_1',
    type: 'multiple-choice',
    tags: ['conflict management', 'forcing'],
    sectionLabel: '5.1',
    text: 'The manager who attempts to impose a preferred solution is using which conflict-handling approach?',
    options: [
      'Smoothing',
      'Forcing',
      'Withdrawal',
      'Collaborating',
    ],
    correctAnswers: ['Forcing'],
    points: 2,
    explanation: '**Forcing** is a win–lose approach where one party imposes their preferred solution.',
  },

  // 5.2 — MCQ | 2 marks
  {
    id: 'ITPMA_W5_Q5_2',
    type: 'multiple-choice',
    tags: ['conflict management', 'withdrawal'],
    sectionLabel: '5.2',
    text: 'A team member deliberately avoids discussing a disagreement and retreats from the situation. Which conflict-handling mode does this represent?',
    options: [
      'Compromise',
      'Forcing',
      'Withdrawal',
      'Confrontation',
    ],
    correctAnswers: ['Withdrawal'],
    points: 2,
    explanation: '**Withdrawal** involves retreating from an actual or potential disagreement.',
  },

  // 5.3 — Fill in the blank | 2 marks
  {
    id: 'ITPMA_W5_Q5_3',
    type: 'fill-in-the-blank',
    tags: ['conflict management', 'compromise'],
    sectionLabel: '5.3',
    text: 'The conflict-handling approach that uses a give-and-take method is called ___.',
    blanks: [
      {
        id: 'b1',
        options: ['Forcing', 'Compromise', 'Withdrawal', 'Smoothing'],
        correctAnswer: 'Compromise',
      },
    ],
  },

  // 5.4 — MCQ | 2 marks
  {
    id: 'ITPMA_W5_Q5_4',
    type: 'multiple-choice',
    tags: ['conflict management', 'collaborating'],
    sectionLabel: '5.4',
    text: 'The project manager asks both groups to incorporate their different viewpoints and insights into a solution intended to achieve consensus and commitment. Which conflict-handling approach is this?',
    options: [
      'Smoothing',
      'Collaborating',
      'Forcing',
      'Withdrawal',
    ],
    correctAnswers: ['Collaborating'],
    points: 2,
    explanation: '**Collaboration** involves incorporating different viewpoints and insights to develop consensus and commitment.',
  },

  // 5.5 — Essay (show-answer) | 6 marks
  {
    id: 'ITPMA_W5_Q5_5',
    type: 'show-answer',
    tags: ['conflict management', 'task vs emotional conflict', 'groupthink'],
    sectionLabel: '5.5',
    text: 'The production manager argues:\n\n*"Conflict is always harmful. A high-performing project team should avoid disagreement."*\n\nUsing the AEI scenario and the course material, critically assess this claim. Your answer should distinguish between **task-related conflict and emotional conflict**, explain how conflict can sometimes improve project performance, and explain the danger of **groupthink**.',
    correctAnswers: [
      'The claim that conflict is always harmful is incorrect. Conflict can produce **new ideas, better alternatives and motivation to work harder and more collaboratively**.\n\n'
      + 'In AEI, the disagreement between production specialists and developers is initially **task-related conflict** because the parties disagree about a project decision. Such conflict can be beneficial if it exposes legitimate differences and forces the team to examine alternative solutions.\n\n'
      + 'This differs from **emotional conflict**, which can damage team performance. Task-related conflict can improve team performance whereas emotional conflict can depress it.\n\n'
      + 'Avoiding all disagreement can also encourage **groupthink**, where members conform to group values or views because conflicting viewpoints are absent. This may prevent weak assumptions from being challenged.\n\n'
      + 'The appropriate objective is therefore not to eliminate conflict, but to manage it so that task disagreement remains constructive while emotional conflict is prevented from damaging relationships and performance.',
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Rejects "all conflict is harmful" | 1 |
| Explains beneficial nature of task-related conflict | 2 |
| Distinguishes emotional conflict | 1 |
| Explains groupthink | 1 |
| Applies distinction to AEI | 1 |
| **Total** | **6** |`,
    points: 6,
  },

  // 5.6 — Essay (show-answer) | 8 marks
  {
    id: 'ITPMA_W5_Q5_6',
    type: 'show-answer',
    tags: ['team performance', 'integrated leadership response'],
    sectionLabel: '5.6',
    text: 'You have been appointed as the project manager of AEI immediately after the meeting described above.\n\nDevelop an integrated response to the team\'s performance problems. Your answer should incorporate **at least four** of the following course concepts:\n\n- emotional intelligence;\n- leadership;\n- influence and power;\n- team development;\n- team-building activities;\n- training;\n- reward and recognition;\n- conflict management;\n- interpersonal and team skills;\n- project management information systems.\n\nFor each concept selected, explain **how it would be applied to this particular team problem and why it would be preferable to simply imposing management authority**.',
    correctAnswers: [
      'AEI\'s performance problem requires an integrated response rather than a single intervention.\n\n'
      + 'First, the manager should use **emotional intelligence** to understand both their own emotional response and the emotions of the team members. This is important because a technical disagreement can become destructive if participants feel personally attacked or ignored.\n\n'
      + 'Second, the manager should apply **appropriate conflict management**. The current disagreement contains legitimate differences between operational and technical requirements, so collaboration would be appropriate because it incorporates different viewpoints and seeks consensus and commitment.\n\n'
      + 'Third, the manager should consider the team\'s **stage of development**. If the team is experiencing Storming, the manager should help members establish effective norms rather than simply suppress disagreement.\n\n'
      + 'Fourth, **training and team-building** can be used where weaknesses in individual or team capability contribute to poor performance.\n\n'
      + 'Fifth, **reward and recognition** should reinforce collaborative behaviour. Team-based rewards can encourage people to work toward shared goals rather than compete against one another.\n\n'
      + 'Finally, the manager should use **leadership and influence**, rather than relying exclusively on formal authority. There is no single best leadership style, and effective leaders adapt their approach to situational needs.\n\n'
      + 'This combination is superior to imposing authority because the underlying problem is not simply disobedience. It concerns relationships, differing technical perspectives, team development and the way conflict is being managed. A sustainable solution therefore needs to improve the team\'s capacity to collaborate rather than merely force agreement.',
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Appropriate integrated diagnosis of the team problem | 1 |
| Correct application of emotional intelligence | 1 |
| Correct application of conflict management | 1 |
| Correct application of team development | 1 |
| Correct application of training/team building | 1 |
| Correct application of reward/recognition or another valid taught concept | 1 |
| Correct application of leadership/influence | 1 |
| Explains why integrated intervention is superior to imposing authority | 1 |
| **Total** | **8** |`,
    points: 8,
  },
];