// src/data/questions/ITPMA/week6.js

export default [
  // ── Scenario ──────────────────────────────────────────────────────
  {
    id: 'SCENARIO_ITPMA_W6',
    type: 'scenario',
    title: 'Questions 1–7: Nova Electronics Digital Operations Project (100 Marks)',
    context: `Nova Electronics is a South African-based multinational manufacturer of electronic devices. The organisation has approved a major IT project to replace several disconnected systems used by its Production, Inventory, Sales, Finance and Customer Service divisions.

The proposed solution will integrate operational information into a centralised project environment. Senior management expects the project to improve the quality of management information, reduce duplication between departments and support better operational decision-making.

The project has a cross-functional team consisting of a project manager, departmental managers, technical specialists, business representatives and representatives from senior management.

During the early stages of the project, the project manager asks the team to develop a formal approach for managing uncertainty. Several stakeholders argue that the team should "just start building" because the project has already been approved. Others believe that considerable uncertainty exists around technology, people, suppliers, costs and organisational processes.

During an initial workshop, the following potential events are identified:

**R1:** The integration technology may not perform at the required scale.
**R2:** A key technical specialist may leave the project.
**R3:** A supplier may deliver required equipment later than planned.
**R4:** The project team may discover that an existing supplier can provide a component at substantially lower cost.
**R5:** A new business unit may become interested in using the system, creating an opportunity to extend the project's organisational benefits.
**R6:** Departmental users may misunderstand how the new system will affect their existing responsibilities.

The project manager also discovers that previous projects contain lessons-learned reports, the organisation has existing risk-management policies and templates, and different senior stakeholders have different levels of tolerance for risk.

The project team subsequently creates a risk register. During a review meeting, the following information is recorded for one risk:

**Risk R6 — User resistance**
The new system changes several existing departmental procedures. Some employees may resist the changes because they believe the new processes will reduce their control over existing work.

**Category:** People risk
**Root cause:** Insufficient understanding of the proposed changes
**Trigger:** Repeated complaints and requests to continue using existing procedures
**Potential response:** The project manager will engage affected departments and clarify the proposed changes.
**Risk owner:** Project manager
**Probability:** High
**Impact:** High
**Status:** Response planning in progress

The team then performs a qualitative assessment of the identified risks using a probability/impact matrix. Several risks are classified as high, medium or low.

Three months later, the project manager discovers that one previously low-priority risk has become much more significant. A new risk has also emerged that was not present in the original risk register. The project manager therefore instructs the team to review the risk register and assess whether existing responses remain effective.

The scenario reflects the central principle that project risk management involves identifying, analysing and responding to risk throughout the project rather than treating risk assessment as a once-off activity.`,
  },

  // ── QUESTION 1 — Establishing the Risk Management Approach (16 marks) ──
  {
    id: 'ITPMA_W6_Q1_1',
    type: 'multiple-choice',
    tags: ['risk management', 'project management', 'risk planning'],
    sectionLabel: '1.1',
    text: 'At the beginning of the Nova Electronics project, the project manager argues that risk management should be planned **before** individual risks are formally analysed. Which statement BEST explains why this approach is appropriate?',
    options: [
      'Risk planning eliminates uncertainty before the project begins, making subsequent risk identification unnecessary.',
      'Risk planning establishes how risk-management activities will be performed, including approaches, responsibilities and methods for assessing and tracking risks.',
      'Risk planning is primarily concerned with assigning a risk owner to every possible future risk.',
      'Risk planning is performed only after risks have been ranked so that the project team can document the final risk responses.',
    ],
    correctAnswers: ['Risk planning establishes how risk-management activities will be performed, including approaches, responsibilities and methods for assessing and tracking risks.'],
    points: 2,
    explanation: 'Planning Risk Management establishes **how** risk management will be approached — the framework within which later identification, analysis, response and monitoring activities occur. Risk owners are only one component of the broader plan, and planning precedes rather than depends on completed risk ranking.',
  },
  {
    id: 'ITPMA_W6_Q1_2',
    type: 'open-ended',
    tags: ['risk management', 'risk planning'],
    sectionLabel: '1.2',
    text: 'What is the **main output** of the Planning Risk Management process?',
    correctAnswers: ['Risk management plan'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 10,
      allowPartialMatch: true,
    },
    explanation: 'The prescribed material explicitly identifies the **risk management plan** as the main output of Planning Risk Management. It documents the procedures for managing risk throughout the project.',
  },
  {
    id: 'ITPMA_W6_Q1_3',
    type: 'multiple-choice',
    tags: ['risk management', 'organisational knowledge'],
    sectionLabel: '1.3',
    text: "The project team discovers that Nova Electronics already has corporate risk-management policies, templates and lessons-learned reports from previous projects. What is the **strongest reason** for reviewing these resources when developing the project's risk management approach?",
    options: [
      'They remove the need for project-specific risk identification.',
      'They provide organisational knowledge and established practices that can inform how risk will be managed on the new project.',
      'They guarantee that every risk experienced by previous projects will occur again.',
      'They allow the project manager to transfer responsibility for all risks to senior management.',
    ],
    correctAnswers: ['They provide organisational knowledge and established practices that can inform how risk will be managed on the new project.'],
    points: 2,
    explanation: 'The key distinction is between using previous organisational knowledge to inform the approach and assuming that previous risks will automatically repeat.',
  },
  {
    id: 'ITPMA_W6_Q1_4',
    type: 'fill-in-the-blank',
    tags: ['risk management', 'risk planning'],
    sectionLabel: '1.4',
    text: "The project team's documented approach for managing risk throughout the project is called the risk management ___.",
    blanks: [
      {
        id: 'b1',
        options: ['plan', 'register', 'report', 'framework'],
        correctAnswer: 'plan',
      },
    ],
    explanation: 'The precise term used in the source material is **risk management plan** — the output of the Planning Risk Management process. "Register" and "report" refer to different, later-stage documents.',
  },
  {
    id: 'ITPMA_W6_Q1_5',
    type: 'show-answer',
    tags: ['risk management', 'project management', 'stakeholder tolerance'],
    sectionLabel: '1.5',
    text: 'Nova Electronics has stakeholders with different tolerances for risk. The project manager proposes that the risk management plan should explicitly address stakeholder tolerances rather than simply applying one generic risk threshold to everyone.\n\n**Critically explain why stakeholder risk tolerance should be considered when planning risk management for Nova Electronics. Your answer must also discuss at least THREE other areas that should be addressed when establishing the project\'s risk management approach.**\n\n*Examiner insight: A high-level answer should move beyond defining a risk management plan. It should demonstrate how the plan establishes the rules by which risk management will operate on the project.*',
    correctAnswers: [
      'Stakeholder risk tolerance must be considered because different stakeholders may have different levels of willingness to accept uncertainty. A risk considered acceptable by one stakeholder may be considered unacceptable by another because of differences in organisational responsibilities, objectives or exposure to the consequences.\n\n'
      + 'For Nova Electronics, this is particularly important because the project affects multiple departments and stakeholders. A risk affecting Production may have different consequences from one affecting Finance or senior management. The risk management plan should therefore establish how stakeholder tolerances will influence risk assessment and decisions.\n\n'
      + 'Other areas that should be addressed include **methodology**, which establishes how risk management will be performed and what tools and data sources will be used; **roles and responsibilities**, which establish who is accountable for risk-related tasks and deliverables; and **budget and schedule**, which establish the resources and timing required for risk-management activities.\n\n'
      + 'The plan should also address **risk categories**, **probability and impact assessment**, **tracking**, and **risk documentation/reporting**. Together, these establish a consistent framework for identifying, analysing, responding to and monitoring uncertainty throughout the project.',
    ],
    markingGuide: '| Criterion | Marks |\n|---|---|\n| Explains why stakeholder risk tolerance matters | 2 |\n| Applies stakeholder tolerance to Nova Electronics | 1 |\n| Correctly explains methodology | 1 |\n| Correctly explains roles/responsibilities | 1 |\n| Correctly explains budget/schedule | 1 |\n| Correctly explains additional planning areas | 1 |\n| Demonstrates integrated understanding of the risk management plan | 1 |\n| **Total** | **8** |\n\n**Common error:** Writing "stakeholder tolerance determines whether a risk is high, medium or low" without explaining that tolerance represents stakeholders\' willingness to accept uncertainty and influences how risks are interpreted and managed.',
    points: 8,
  },

  // ── QUESTION 2 — Identifying Risks and Understanding Their Sources (16 marks) ──
  {
    id: 'ITPMA_W6_Q2_1',
    type: 'multiple-choice',
    tags: ['risk management', 'risk identification'],
    sectionLabel: '2.1',
    text: 'The project team is discussing R1: "The integration technology may not perform at the required scale." Which action would BEST represent **risk identification** rather than risk analysis or risk response planning?',
    options: [
      'Classifying the risk as high probability and high impact.',
      'Recording the potential technology failure and documenting its characteristics in the risk register.',
      'Deciding to replace the technology to eliminate the risk.',
      "Assigning a numerical score to determine the risk's priority.",
    ],
    correctAnswers: ['Recording the potential technology failure and documenting its characteristics in the risk register.'],
    points: 2,
    explanation: 'Risk identification concerns recognising potential events that may hurt or enhance the project and documenting their characteristics. Option A is analysis, C is response planning, and D is prioritisation.',
  },
  {
    id: 'ITPMA_W6_Q2_2',
    type: 'open-ended',
    tags: ['risk management', 'risk identification techniques'],
    sectionLabel: '2.2',
    text: 'Name **one** formal technique from the course material that could be used to identify risks by obtaining views from knowledgeable individuals through structured interaction.',
    correctAnswers: ['Interviewing'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 15,
      allowPartialMatch: true,
    },
    // Q2 — Distributed-system architecture
    image: {
      src: "/images/ITPMA_W6_Q2.1.png",
      alt: "MedaGrid distributed-system architecture showing the client application, API gateway, appointment, records, billing and notification services, service databases, message queue, and external hospital integration.",
      caption: "Figure 1: MedaGrid distributed-system architecture."
    },
    explanation: '**Interviewing** is explicitly identified as a risk-identification technique that gathers views from experienced or knowledgeable individuals through direct, structured discussion.',
  },
  {
    id: 'ITPMA_W6_Q2_3',
    type: 'multiple-choice',
    tags: ['risk management', 'delphi technique'],
    sectionLabel: '2.3',
    text: 'A project team wants to identify risks without allowing the opinion of the most senior manager in the room to dominate the views of other participants. Which technique would be particularly appropriate?',
    options: [
      'Delphi Technique',
      'Risk acceptance',
      'Probability/impact matrix',
      'Top Ten Risk Item Tracking',
    ],
    correctAnswers: ['Delphi Technique'],
    points: 2,
    explanation: 'The Delphi Technique gathers informed views (often anonymously) while reducing the dominance of individual participants. A probability/impact matrix analyses and prioritises identified risks — it does not primarily identify them.',
  },
  {
    id: 'ITPMA_W6_Q2_4',
    type: 'fill-in-the-blank',
    tags: ['risk management', 'risk event'],
    sectionLabel: '2.4',
    text: 'A specific uncertain event that may either harm or enhance project objectives is called a risk ___.',
    blanks: [
      {
        id: 'b1',
        options: ['event', 'incident', 'threat', 'trigger'],
        correctAnswer: 'event',
      },
    ],
    explanation: 'A **risk event** is a specific, uncertain occurrence that may either harm or enhance project objectives if it happens. This distinguishes it from a "trigger" (a warning sign) or a general "threat" (a purely negative term).',
  },
  {
    id: 'ITPMA_W6_Q2_5',
    type: 'show-answer',
    tags: ['risk management', 'risk sources', 'project management'],
    sectionLabel: '2.5',
    text: 'The Nova Electronics team initially identifies only technology-related risks. The project manager believes this is inadequate because the project involves several departments, suppliers and organisational processes.\n\n**Analyse THREE different sources of risk that should be considered for this project and explain how failing to recognise each source could affect project outcomes.**\n\nYour answer should distinguish between merely naming a risk source and explaining **why that source creates uncertainty for this particular project**.',
    correctAnswers: [
      'Three important sources are **technology risk, people risk, and structure/process risk**.\n\n'
      + '**Technology risk** is relevant because the proposed system depends on integration technology. If the technology fails to perform at the required scale, the project may fail to meet its intended objectives.\n\n'
      + '**People risk** is relevant because employees may resist changes to existing procedures and responsibilities. This could delay implementation, reduce adoption or undermine the intended organisational benefits of the system.\n\n'
      + '**Structure/process risk** is also important because Nova Electronics is replacing disconnected departmental processes with an integrated environment. Existing processes may not align with the proposed system, creating uncertainty about how work will be performed and how responsibilities will change.\n\n'
      + 'Other relevant sources include **financial risk** and **market risk**. The important principle is that risk identification should consider multiple dimensions rather than treating technology as the only source of uncertainty.',
    ],
    markingGuide: '| Criterion | Marks |\n|---|---|\n| Technology risk correctly identified and applied | 2 |\n| People risk correctly identified and applied | 2 |\n| Structure/process risk correctly identified and applied | 2 |\n| Explains consequences rather than merely naming sources | 1 |\n| Demonstrates awareness of broader risk categories | 1 |\n| **Total** | **8** |\n\nA response saying "Technology, people and financial risk" without explaining their relevance should not receive more than 3/8. The question tests whether the student can **translate risk categories into project-specific uncertainty**.',
    points: 8,
  },

  // ── QUESTION 3 — The Risk Register as a Decision-Making Tool (18 marks) ──
  {
    id: 'ITPMA_W6_Q3_1',
    type: 'multiple-choice',
    tags: ['risk management', 'risk register', 'trigger'],
    sectionLabel: '3.1',
    text: 'The project manager records the following information: "Repeated complaints from departmental users that the new system will interfere with their existing procedures." Within a risk register, this information is MOST appropriately treated as the:',
    options: [
      'Root cause',
      'Trigger',
      'Risk owner',
      'Risk category',
    ],
    correctAnswers: ['Trigger'],
    points: 2,
    // Q3 — Authentication and token flow
    image: {
      src: "/images/ITPMA_W6_Q3.1.png",
      alt: "UML-style sequence diagram showing authentication, token issuance, API access, inter-service communication, and logout within the MedaGrid platform.",
      caption: "Figure 2: MedaGrid authentication and service interaction flow."
    },
    explanation: 'A trigger is an observable indicator that a risk event is occurring or becoming imminent. Repeated complaints and requests to retain old procedures are indicators associated with the user-resistance risk.',
  },
  {
    id: 'ITPMA_W6_Q3_2',
    type: 'open-ended',
    tags: ['risk management', 'risk owner'],
    sectionLabel: '3.2',
    text: 'Who is the person responsible for taking ownership of a particular project risk?',
    correctAnswers: ['Risk owner'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 10,
      allowPartialMatch: true,
    },
    explanation: 'The **risk owner** is the individual assigned accountability for monitoring a specific risk and carrying out its planned response. In R6, this is the project manager.',
  },
  {
    id: 'ITPMA_W6_Q3_3',
    type: 'fill-in-the-blank',
    tags: ['risk management', 'root cause'],
    sectionLabel: '3.3',
    text: 'The underlying reason that gives rise to a risk is its ___ cause.',
    blanks: [
      {
        id: 'b1',
        options: ['root', 'main', 'primary', 'triggering'],
        correctAnswer: 'root',
      },
    ],
    explanation: 'The **root cause** is the underlying reason a risk exists — for R6, insufficient understanding of the proposed changes. This is different from a trigger, which is the observable sign that the risk may be occurring.',
  },
  {
    id: 'ITPMA_W6_Q3_4',
    type: 'multiple-choice',
    tags: ['risk management', 'risk register'],
    sectionLabel: '3.4',
    text: "Why would it be poor practice for the Nova Electronics team to record only the name of each risk in its risk register?",
    options: [
      'A risk name is sufficient for qualitative analysis but cannot be used during risk identification.',
      'The register should contain enough information to understand, assess, assign and respond to risks rather than merely list their names.',
      'Risk names are only required for positive risks and are unnecessary for negative risks.',
      'Risk registers are intended primarily to document completed risks rather than potential events.',
    ],
    correctAnswers: ['The register should contain enough information to understand, assess, assign and respond to risks rather than merely list their names.'],
    points: 2,
    explanation: 'The risk register contains information such as descriptions, categories, causes, triggers, responses, owners, probability, impact and status. It is a management tool, not merely an inventory of risk names.',
  },
  {
    id: 'ITPMA_W6_Q3_5',
    type: 'show-answer',
    tags: ['risk management', 'risk register', 'R6'],
    sectionLabel: '3.5',
    text: 'Using **R6 — User resistance** from the scenario, explain how the following elements work together to make the risk register useful to the project manager:\n\n- Risk description\n- Category\n- Root cause\n- Trigger\n- Potential response\n- Risk owner\n- Probability\n- Impact\n- Status\n\nYour answer should not merely define each term independently. **Show how the information collectively supports managerial decision-making and subsequent risk monitoring.**\n\n*Examiner insight: Strong answers will demonstrate that the register is an operational management tool, not simply an administrative record.*',
    correctAnswers: [
      'The **risk description** establishes what may happen and provides context for understanding the uncertainty. In R6, the risk concerns employee resistance to changes introduced by the new system.\n\n'
      + 'The **category** classifies the risk as people risk, allowing management to identify patterns across categories and determine whether particular areas are producing concentrations of risk.\n\n'
      + 'The **root cause** explains why the risk exists. Here, insufficient understanding of the proposed changes is the underlying cause. This is important because an effective response should address the cause rather than merely react to the symptoms.\n\n'
      + 'The **trigger** provides an observable indicator that the risk may be materialising. Repeated complaints and requests to continue using existing procedures therefore provide evidence that user resistance is becoming significant.\n\n'
      + 'The **potential response** identifies an action the project could take, while the **risk owner** establishes accountability for managing the risk.\n\n'
      + '**Probability and impact** help establish priority. R6 has both high probability and high impact, making it a significant risk requiring management attention.\n\n'
      + 'Finally, **status** provides information about the current state of the risk and response. "Response planning in progress" indicates that the risk has been recognised but that the response has not yet been fully implemented.\n\n'
      + 'Collectively, these fields allow the project manager to understand the risk, identify its cause and warning signs, assign accountability, prioritise it, decide how to respond and monitor progress. The register therefore supports active decision-making rather than simply recording information.',
    ],
    markingGuide: '| Criterion | Marks |\n|---|---|\n| Description | 1 |\n| Category | 1 |\n| Root cause | 1 |\n| Trigger | 1 |\n| Potential response | 1 |\n| Risk owner | 1 |\n| Probability | 1 |\n| Impact | 1 |\n| Status | 1 |\n| Integrated explanation of how the fields support decisions | 1 |\n| **Total** | **10** |\n\n**A+ indicator:** The strongest students show how **cause → trigger → assessment → response → ownership → monitoring** forms a coherent management chain.',
    points: 10,
  },

  // ── QUESTION 4 — Qualitative Risk Analysis (16 marks) ──
  {
    id: 'SCENARIO_ITPMA_W6_Q4',
    type: 'scenario',
    title: 'Question 4: Qualitative Risk Analysis (16 Marks)',
    context: `The project team has classified four risks as follows:

| Risk | Probability | Impact |
|---|---|---|
| R1 — Technology failure | High | High |
| R2 — Specialist departure | Medium | High |
| R3 — Supplier delay | High | Medium |
| R4 — Lower-cost supplier opportunity | Low | High |`,
  },
  {
    id: 'ITPMA_W6_Q4_1',
    type: 'multiple-choice',
    tags: ['risk management', 'probability impact matrix'],
    sectionLabel: '4.1',
    text: 'Which risk should receive the **greatest immediate attention** if the project team is prioritising according to probability and impact?',
    options: ['R1', 'R2', 'R3', 'R4'],
    correctAnswers: ['R1'],
    points: 2,
    // Q4 — Secure coding / injection artefact
    image: {
      src: "/images/ITPMA_W6_Q4.1.png",
      alt: "Code-review artefact containing C++, Java SQL, and Java directory-service code fragments from the MedaGrid archival and patient-record systems.",
      caption: "Figure 3: MedaGrid code extracts under security review."
    },
    explanation: 'R1 has both high probability and high impact, giving it the strongest immediate qualitative priority among the listed risks.',
  },
  {
    id: 'ITPMA_W6_Q4_2',
    type: 'fill-in-the-blank',
    tags: ['risk management', 'probability impact matrix'],
    sectionLabel: '4.2',
    text: 'The technique that places risks according to their relative probability and impact is the probability/___ matrix.',
    blanks: [
      {
        id: 'b1',
        options: ['impact', 'consequence', 'severity', 'risk'],
        correctAnswer: 'impact',
      },
    ],
    explanation: 'The **probability/impact matrix** plots risks by their likelihood of occurring against the severity of their consequences, allowing the team to classify and prioritise risks as high, medium or low.',
  },
  {
    id: 'ITPMA_W6_Q4_3',
    type: 'multiple-choice',
    tags: ['risk management', 'qualitative analysis'],
    sectionLabel: '4.3',
    text: 'The project manager argues that R3 should receive more attention than R2 because R3 has a higher probability of occurring, even though both risks have high potential consequences. Which principle of qualitative risk analysis is the manager applying?',
    options: [
      'Risks should be prioritised by considering both likelihood and impact.',
      'Risks with high impact should always be ignored if their probability is not certain.',
      'Probability is more important than impact in every risk assessment.',
      'A risk can only be prioritised after a quantitative monetary analysis.',
    ],
    correctAnswers: ['Risks should be prioritised by considering both likelihood and impact.'],
    points: 2,
    explanation: 'Qualitative risk analysis assesses both probability and impact to determine risk magnitude and priority.',
  },
  {
    id: 'ITPMA_W6_Q4_4',
    type: 'open-ended',
    tags: ['risk management', 'risk tracking'],
    sectionLabel: '4.4',
    text: 'Name the technique that tracks the most important risks over time using their current and previous rankings.',
    correctAnswers: ['Top Ten Risk Item Tracking'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 15,
      allowPartialMatch: true,
    },
    explanation: '**Top Ten Risk Item Tracking** monitors the most significant risks over time by comparing their current ranking against their previous ranking, along with progress made in resolving each one.',
  },
  {
    id: 'ITPMA_W6_Q4_5',
    type: 'show-answer',
    tags: ['risk management', 'qualitative analysis', 'probability impact matrix'],
    sectionLabel: '4.5',
    text: 'The project sponsor says: "R2 has a medium probability, so we can ignore it."\n\n**Critically evaluate this statement using the principles of qualitative risk analysis.**\n\nYour answer must explain:\n1. Why probability alone is insufficient;\n2. The role of impact;\n3. How a probability/impact matrix assists prioritisation; and\n4. Why qualitative analysis is useful even though it does not produce a detailed numerical estimate of the consequences.\n\nThe course material defines qualitative analysis as assessing likelihood and impact to determine the magnitude and priority of identified risks.',
    correctAnswers: [
      "The sponsor's statement is incomplete because probability alone does not determine risk priority. Qualitative risk analysis considers both the **likelihood of occurrence** and the **impact or consequence** if the risk occurs.\n\n"
      + 'R2 has medium probability but high impact. Therefore, although it is not as likely as a high-probability risk, it may still require substantial attention because the consequences of losing a key specialist could be serious.\n\n'
      + 'A probability/impact matrix provides a structured way of comparing risks according to their relative probability and impact. This allows the project team to identify risks that require greater attention and prioritise management resources.\n\n'
      + 'Qualitative analysis is useful because it provides a practical prioritisation method without necessarily requiring detailed numerical estimation. It helps stakeholders identify which risks are sufficiently significant to require attention.',
    ],
    markingGuide: '| Criterion | Marks |\n|---|---|\n| Explains why probability alone is insufficient | 2 |\n| Explains impact | 2 |\n| Applies reasoning to R2 | 1 |\n| Explains probability/impact matrix | 1 |\n| Explains value of qualitative analysis | 1 |\n| Clear integrated conclusion | 1 |\n| **Total** | **8** |\n\n**Common weak answer:** "R2 is medium probability and high impact, so it is medium-high." That merely repeats the data. The student must explain **why both dimensions matter to prioritisation**.',
    points: 8,
    // Q4.5 — File-system / archival architecture
    image: {
      src: "/images/ITPMA_W6_Q4.5.png",
      alt: "MedaGrid archival module connected to an administrative user and a server file-system hierarchy containing application, archive, report, and system directories.",
      caption: "Figure 4: MedaGrid archival module and server file-system structure."
    }
  },

  // ── QUESTION 5 — Selecting Risk Responses (18 marks) ──
  {
    id: 'ITPMA_W6_Q5_1',
    type: 'multiple-choice',
    tags: ['risk management', 'risk avoidance', 'negative risk response'],
    sectionLabel: '5.1',
    text: "The project manager decides to change the project's technical approach so that the technology-related threat R1 can no longer occur. Which response strategy for a **negative risk** is most appropriate?",
    options: ['Acceptance', 'Avoidance', 'Enhancement', 'Exploitation'],
    correctAnswers: ['Avoidance'],
    points: 2,
    // Q5 — CI/CD and configuration management
    image: {
      src: "/images/ITPMA_W6_Q5.1.png",
      alt: "MedaGrid CI/CD pipeline showing development, version control, build and testing environments, staging, production deployment, multiple regions, configuration sources, and application credentials.",
      caption: "Figure 5: MedaGrid deployment and configuration workflow."
    },
    explanation: 'Avoidance changes the project approach so that the threat is eliminated or no longer applicable.',
  },
  {
    id: 'ITPMA_W6_Q5_2',
    type: 'multiple-choice',
    tags: ['risk management', 'risk exploitation', 'positive risk response'],
    sectionLabel: '5.2',
    text: 'Nova Electronics discovers that an existing supplier could provide a component at a substantially lower cost, creating a potential opportunity for the project. The project manager deliberately structures the project to ensure that this opportunity occurs. Which response strategy is MOST appropriate?',
    options: ['Risk exploitation', 'Risk mitigation', 'Risk transference', 'Risk avoidance'],
    correctAnswers: ['Risk exploitation'],
    points: 2,
    explanation: 'Exploitation is a positive-risk strategy in which the organisation deliberately acts to ensure an opportunity is realised.',
  },
  {
    id: 'ITPMA_W6_Q5_3',
    type: 'fill-in-the-blank',
    tags: ['risk management', 'risk mitigation'],
    sectionLabel: '5.3',
    text: 'The negative-risk response strategy that involves reducing the probability or impact of a threat is risk ___.',
    blanks: [
      {
        id: 'b1',
        options: ['mitigation', 'avoidance', 'acceptance', 'transference'],
        correctAnswer: 'mitigation',
      },
    ],
    explanation: '**Risk mitigation** reduces the probability and/or impact of a negative risk to an acceptable threshold, without necessarily eliminating the risk entirely (which would instead be avoidance).',
  },
  {
    id: 'ITPMA_W6_Q5_4',
    type: 'open-ended',
    tags: ['risk management', 'risk sharing', 'positive risk response'],
    sectionLabel: '5.4',
    text: 'Name the positive-risk response strategy that involves working with another party to increase the probability of achieving an opportunity.',
    correctAnswers: ['Sharing', 'Risk sharing'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 15,
      allowPartialMatch: true,
    },
    explanation: '**Risk sharing** is a positive-risk strategy where the project partners with another party (e.g. through a joint venture or partnership) to improve the chances of the opportunity being realised.',
  },
  {
    id: 'ITPMA_W6_Q5_5',
    type: 'multiple-choice',
    tags: ['risk management', 'risk transference', 'negative risk response'],
    sectionLabel: '5.5',
    text: 'Nova Electronics cannot eliminate R3, the supplier-delay risk, and decides to allocate responsibility for the consequences to another party through an appropriate contractual arrangement. Which response is being applied?',
    options: ['Acceptance', 'Mitigation', 'Transference', 'Exploitation'],
    correctAnswers: ['Transference'],
    points: 2,
    explanation: 'The project is shifting responsibility for the consequences of the negative risk to another party through an appropriate arrangement — this is risk transference.',
  },
  {
    id: 'ITPMA_W6_Q5_6',
    type: 'show-answer',
    tags: ['risk management', 'risk response strategies'],
    sectionLabel: '5.6',
    text: 'The project manager proposes the following responses:\n\n- **R1 — Technology failure:** change the technical approach.\n- **R2 — Specialist departure:** accept the possibility because the probability is only medium.\n- **R3 — Supplier delay:** develop actions intended to reduce the likelihood or impact of delay.\n- **R4 — Lower-cost supplier opportunity:** deliberately structure the project to realise the opportunity.\n\n**Evaluate whether each proposed response is conceptually appropriate. Where appropriate, identify the response strategy being applied and justify your reasoning. Where inappropriate, recommend a more suitable strategy.**\n\nYour answer must distinguish carefully between **negative-risk** and **positive-risk** response strategies. The prescribed material explicitly separates the five strategies for negative risks from those for positive risks.',
    correctAnswers: [
      '**R1 — Technology failure:** Changing the technical approach so that the threat can no longer occur represents **risk avoidance**. This is appropriate where changing the approach can eliminate the threat rather than merely reduce its probability or impact.\n\n'
      + '**R2 — Specialist departure:** Acceptance may be valid if the organisation consciously decides to tolerate the risk. However, the fact that probability is only medium does not automatically make acceptance appropriate. The impact must also be considered. If the specialist\'s departure could seriously damage the project, additional treatment may be justified.\n\n'
      + '**R3 — Supplier delay:** Actions intended to reduce the likelihood or impact of delay represent **risk mitigation**. The response does not necessarily eliminate the supplier risk; instead, it reduces its potential effect.\n\n'
      + '**R4 — Lower-cost supplier opportunity:** Deliberately structuring the project so that the opportunity occurs represents **risk exploitation**. This is appropriate because R4 is a positive risk and the project is actively trying to realise the opportunity.\n\n'
      + 'The fundamental distinction is that negative risks and positive risks have different response strategies. Negative risks include avoidance, acceptance, transference, mitigation and escalation. Positive risks include exploitation, sharing, enhancement, acceptance and escalation.',
    ],
    markingGuide: '| Criterion | Marks |\n|---|---|\n| Correctly classifies R1 as avoidance | 2 |\n| Evaluates R2 rather than automatically accepting it | 2 |\n| Correctly identifies and explains R3 mitigation | 1 |\n| Correctly identifies and explains R4 exploitation | 2 |\n| Distinguishes positive and negative strategies | 1 |\n| **Total** | **8** |\n\nA particularly strong response will **not** say "Medium probability means accept" — acceptance is a deliberate response decision; probability alone does not determine whether acceptance is appropriate.',
    points: 8,
  },

  // ── QUESTION 6 — Implementing and Monitoring Risk Responses (16 marks) ──
  {
    id: 'SCENARIO_ITPMA_W6_Q6',
    type: 'scenario',
    title: 'Question 6: Implementing and Monitoring Risk Responses (16 Marks)',
    context: `Three months after risk responses were approved, the project manager discovers that:

- R6 is still generating complaints despite the planned response.
- A new supplier-related risk has emerged.
- R2 has moved from medium to high probability.
- The owner of one risk has not carried out the agreed response.
- The project team has learned something that could improve risk management on future projects.`,
  },
  {
    id: 'ITPMA_W6_Q6_1',
    type: 'multiple-choice',
    tags: ['risk management', 'risk monitoring'],
    sectionLabel: '6.1',
    text: 'Which activity BEST represents **monitoring risks**?',
    options: [
      'Identifying risks once at the beginning of the project and freezing the register.',
      'Tracking identified risks, identifying new risks and evaluating whether risk responses remain effective throughout the project.',
      'Selecting the initial risk-management methodology before the project begins.',
      'Assigning probability and impact to risks without subsequently reviewing them.',
    ],
    correctAnswers: ['Tracking identified risks, identifying new risks and evaluating whether risk responses remain effective throughout the project.'],
    points: 2,
    // Q6 — Social-engineering helpdesk artefact
    image: {
      src: "/images/ITPMA_W6_Q6.1.png",
      alt: "Fictional internal MedaGrid helpdesk request from a regional hospital IT director urgently requesting an account password reset.",
      caption: "Figure 6: MedaGrid helpdesk account-access request."
    },
    explanation: 'This directly reflects the definition of monitoring risks: an ongoing activity, not a once-off inspection.',
  },
  {
    id: 'ITPMA_W6_Q6_2',
    type: 'open-ended',
    tags: ['risk management', 'risk register', 'monitoring'],
    sectionLabel: '6.2',
    text: 'What document should be updated when the status, probability, impact or response information for a risk changes?',
    correctAnswers: ['Risk register'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 10,
      allowPartialMatch: true,
    },
    explanation: 'The **risk register** must be kept current as risks evolve. Updating status, probability, impact and response information ensures the project manager always has an accurate view of the project\'s risk landscape.',
  },
  {
    id: 'ITPMA_W6_Q6_3',
    type: 'fill-in-the-blank',
    tags: ['risk management', 'workaround'],
    sectionLabel: '6.3',
    text: 'A response to a risk event that was not planned in advance is called a ___.',
    blanks: [
      {
        id: 'b1',
        options: ['workaround', 'contingency plan', 'mitigation', 'response plan'],
        correctAnswer: 'workaround',
      },
    ],
    explanation: 'A **workaround** is an unplanned, reactive response developed on the spot for a risk event that was not anticipated in advance — as opposed to a contingency plan, which is prepared ahead of time.',
  },
  {
    id: 'ITPMA_W6_Q6_4',
    type: 'multiple-choice',
    tags: ['risk management', 'response effectiveness'],
    sectionLabel: '6.4',
    text: 'The project team discovers that the agreed response to R6 was implemented but did not reduce the problem as expected. What should the project manager primarily do?',
    options: [
      'Assume the risk is closed because the planned response was implemented.',
      'Evaluate the effectiveness of the response and determine whether further action or revised responses are necessary.',
      'Delete R6 from the risk register because the response has already been completed.',
      'Wait until project completion before reassessing the risk.',
    ],
    correctAnswers: ['Evaluate the effectiveness of the response and determine whether further action or revised responses are necessary.'],
    points: 2,
    explanation: 'Monitoring includes evaluating the effectiveness of risk responses. Implementing a response does not automatically mean the risk has been successfully controlled.',
  },
  {
    id: 'ITPMA_W6_Q6_5',
    type: 'show-answer',
    tags: ['risk management', 'monitoring', 'project management'],
    sectionLabel: '6.5',
    text: '**Critically explain why risk management at Nova Electronics must continue throughout the project lifecycle rather than ending after the initial risk register and probability/impact analysis have been completed.**\n\nUse the events in the scenario to demonstrate your answer. Your response should integrate:\n\n- changing risk priorities;\n- newly identified risks;\n- implementation of responses;\n- effectiveness of responses;\n- updating project risk documentation; and\n- lessons learned.\n\nThe prescribed material specifically states that monitoring involves ensuring responses are performed, tracking identified risks, identifying and analysing new risks, and evaluating risk-management effectiveness throughout the project.',
    correctAnswers: [
      "Risk management must continue throughout the project because the risk environment is dynamic. The original risk register represents the team's understanding at an earlier point and cannot guarantee that future conditions will remain unchanged.\n\n"
      + 'In Nova Electronics, R2 has changed from medium to high probability. This demonstrates that an existing risk can change in significance and therefore require reassessment.\n\n'
      + 'The emergence of the new supplier-related risk demonstrates that new risks can arise after the initial identification process. The project team must therefore continue identifying and analysing risks rather than treating the initial register as complete.\n\n'
      + 'Monitoring must also determine whether responses are actually being performed and whether they are effective. R6 is an example where the response may have been implemented without sufficiently resolving the underlying problem. The project manager must therefore evaluate its effectiveness and consider whether further action is necessary.\n\n'
      + 'The risk register and related project documentation should be updated to reflect current information. Lessons learned should also be captured so that experience from the project can improve future risk-management practices.\n\n'
      + 'Therefore, monitoring is a continuous management activity involving tracking existing risks, identifying new risks, implementing responses and evaluating their effectiveness.',
    ],
    markingGuide: '| Criterion | Marks |\n|---|---|\n| Explains changing risk environment | 1 |\n| Applies changing probability of R2 | 1 |\n| Applies emergence of new risk | 1 |\n| Explains implementation monitoring | 1 |\n| Explains response effectiveness | 1 |\n| Explains documentation updates | 1 |\n| Explains lessons learned | 1 |\n| Integrates monitoring as continuous activity | 1 |\n| **Total** | **8** |\n\n**A+ response:** Treats monitoring as a **feedback loop**, not a final inspection.',
    points: 8,
  },

  // ── QUESTION 7 — Integrated Risk Management Judgement (16 marks) ──
  {
    id: 'SCENARIO_ITPMA_W6_Q7',
    type: 'scenario',
    title: 'Question 7: Integrated Risk Management Judgement (16 Marks)',
    context: `The project sponsor is considering cancelling the formal risk-management process. The sponsor argues:

"We already identified the risks, ranked them and assigned owners. Continuing to spend time on risk management is taking resources away from development."

The project manager disagrees.`,
  },
  {
    id: 'ITPMA_W6_Q7_1',
    type: 'multiple-choice',
    tags: ['risk management', 'project management', 'value of risk management'],
    sectionLabel: '7.1',
    text: "Which argument BEST supports the project manager's position?",
    options: [
      'Once risks have been documented, they become issues and no longer require monitoring.',
      'Risk management can influence project selection, scope, scheduling and cost estimates and should therefore be integrated throughout the project.',
      'Risk management is primarily an administrative requirement with little effect on project success.',
      'Risk management is useful only for projects involving unfamiliar technology.',
    ],
    correctAnswers: ['Risk management can influence project selection, scope, scheduling and cost estimates and should therefore be integrated throughout the project.'],
    points: 2,
    // Q7.1 — UML class diagram
    image: {
      src: "/images/ITPMA_W6_Q7.1.png",
      alt: "UML class diagram for the MedaGrid telehealth platform showing User, Patient, Doctor, Appointment, AppointmentService, and AuditLog classes and their relationships.",
      caption: "Figure 7: MedaGrid UML class model."
    },
    explanation: 'The prescribed material explicitly identifies benefits of risk management including project selection, scope determination, and realistic schedule and cost estimates.',
  },
  {
    id: 'ITPMA_W6_Q7_2',
    type: 'fill-in-the-blank',
    tags: ['risk management', 'overall project risk'],
    sectionLabel: '7.2',
    text: 'The overall effect of uncertainty on the project as a whole is known as overall project ___.',
    blanks: [
      {
        id: 'b1',
        options: ['risk', 'exposure', 'uncertainty', 'impact'],
        correctAnswer: 'risk',
      },
    ],
    // Q7.2 — UML sequence diagram
    image: {
      src: "/images/ITPMA_W6_Q7.2.png",
      alt: "UML sequence diagram showing a patient appointment request flowing through the MedaGrid application, appointment service, records service, and notification service.",
      caption: "Figure 8: MedaGrid appointment-booking sequence."
    },
    explanation: '**Overall project risk** refers to the combined effect of uncertainty on the project as a whole, rather than any single risk in isolation. It is a key element reported in the risk report to senior stakeholders.',
  },
  {
    id: 'ITPMA_W6_Q7_3',
    type: 'multiple-choice',
    tags: ['risk management', 'risk report'],
    sectionLabel: '7.3',
    text: "Suppose the project has identified 30 individual risks. Senior management asks for a concise view of the project's overall risk exposure rather than a detailed description of every risk. Which output would be MOST appropriate?",
    options: ['Risk report', 'Risk owner list', 'Project schedule', 'Lessons-learned register'],
    correctAnswers: ['Risk report'],
    points: 2,
    explanation: 'A risk report provides summary information about overall project risk, including sources of risk, drivers of exposure, numbers of risks, categories, metrics and trends — more appropriate for senior management than inspecting every register entry.',
  },
  {
    id: 'ITPMA_W6_Q7_4',
    type: 'show-answer',
    tags: ['risk management', 'project management', 'integrated risk management'],
    sectionLabel: '7.4',
    text: 'You have been appointed as the project manager of Nova Electronics.\n\n**Prepare a reasoned argument to senior management explaining how a mature risk-management approach could improve the probability of project success.**\n\nYour answer must integrate **at least five** of the following:\n\n- planning risk management;\n- risk identification;\n- risk register;\n- qualitative risk analysis;\n- probability/impact matrix;\n- risk response strategies;\n- implementation of responses;\n- monitoring;\n- risk reporting;\n- positive risks/opportunities;\n- organisational learning.\n\nDo not simply provide definitions. Use the Nova Electronics project to demonstrate **how the activities interact as a management process**.\n\n*Examiner insight: This is the highest-integration question in the paper. A top answer should demonstrate that risk management is a continuous managerial process rather than a collection of isolated techniques.*',
    correctAnswers: [
      {
        text: "A mature risk-management approach improves Nova Electronics' probability of success because it provides a systematic way of dealing with uncertainty throughout the project rather than waiting for problems to occur.\n\n"
        + '**Planning Risk Management** establishes the methodology, responsibilities, risk categories, assessment methods, tracking approach and documentation requirements. This gives the project a consistent framework for managing uncertainty.\n\n'
        + '**Risk identification** allows the team to recognise both threats and opportunities. Techniques such as brainstorming, Delphi and interviewing can expose risks that may otherwise remain unidentified.\n\n'
        + 'The **risk register** provides a structured record of identified risks and their characteristics, including causes, triggers, owners, probability, impact, responses and status. This creates visibility and accountability.\n\n'
        + '**Qualitative risk analysis** then allows the project team to prioritise risks according to probability and impact. A probability/impact matrix provides a practical method for identifying risks requiring greater attention.\n\n'
        + '**Risk responses** convert assessment into action. Negative risks can be avoided, accepted, transferred, mitigated or escalated, while positive risks can be exploited, shared, enhanced, accepted or escalated.\n\n'
        + '**Implementing risk responses** ensures that approved strategies are actually carried out. However, implementation alone is insufficient because responses must subsequently be monitored.\n\n'
        + '**Monitoring** provides the feedback mechanism. Existing risks can change, new risks can emerge and responses can prove ineffective. Continuous monitoring therefore enables the project team to adapt its approach.\n\n'
        + '**Risk reporting and lessons learned** provide management visibility and organisational learning. A risk report can communicate overall risk exposure and trends to senior management, while lessons learned can improve future projects.\n\n'
        + 'Therefore, mature risk management is not a collection of isolated administrative activities. It is a continuous decision-making process linking planning, identification, assessment, response and monitoring to the project\'s objectives.',
        diagram: {
          type: 'mermaid',
          code: `flowchart LR
    A[Plan Risk Management] --> B[Identify Risks]
    B --> C[Qualitative Risk Analysis]
    C --> D[Plan Risk Responses]
    D --> E[Implement Risk Responses]
    E --> F[Monitor Risks]
    F --> B`,
        },
      },
    ],
    // Q7.4 — Audit logging architecture
    image: {
      src: "/images/ITPMA_W6_Q7.4.png",
      alt: "MedaGrid security architecture showing patients, doctors, application services, records, audit logging, system administration, and audit-log storage.",
      caption: "Figure 9: MedaGrid audit logging architecture."
    },
    markingGuide: '| Criterion | Marks |\n|---|---|\n| Planning Risk Management | 1 |\n| Risk identification | 1 |\n| Risk register | 1 |\n| Qualitative analysis | 1 |\n| Probability/impact analysis | 1 |\n| Risk response strategies | 1 |\n| Implementation | 1 |\n| Monitoring | 1 |\n| Reporting / lessons learned | 1 |\n| Overall integration and application to Nova Electronics | 1 |\n| **Total** | **10** |\n\n**What makes this an A+ answer?** The strongest response demonstrates: **Plan → Identify → Analyse → Respond → Implement → Monitor → Learn → Reassess**. The student does not need the exact sequence, but the answer should demonstrate this underlying logic.',
    points: 10,
  },
];