// src/data/questions/ITSEA/week2.js
export default [

  // ─────────────────────────────────────────────
  // SCENARIO BLOCK
  // ─────────────────────────────────────────────
  {
    id: "ITSEA_W2_SCENARIO",
    type: "scenario",
    text: "**MedSync Global: Modernising Healthcare Software Delivery**\n\nMedSync Global is a multinational healthcare technology company that develops software used by hospitals, pharmacies, laboratories, emergency services, and insurance providers.\n\nThe company currently operates a legacy patient-management platform developed over many years using a traditional plan-driven approach. Recently, healthcare regulations have changed rapidly, hospitals have requested new digital services, and competing technology firms have begun releasing innovative features every few weeks.\n\nTo remain competitive, MedSync plans to replace its legacy platform with a cloud-based healthcare ecosystem that includes:\n- Electronic patient records\n- Appointment scheduling\n- Prescription management\n- Real-time ambulance tracking\n- Laboratory integration\n- AI-assisted diagnostic reporting\n\nThe system will be developed by multiple teams located across different countries. Regulatory compliance remains critical because software failures could affect patient safety.\n\nSenior management is debating whether the project should continue using traditional plan-driven approaches or transition toward Agile and Extreme Programming (XP) practices.",
  },

  // ─────────────────────────────────────────────
  // QUESTION 1 — SOFTWARE PROCESS STRATEGY [12]
  // ─────────────────────────────────────────────

  {
    id: "ITSEA_W2_Q1",
    type: "multiple-choice",
    tags: ["software processes", "SDLC"],
    sectionLabel: "1.1",
    text: "A consulting team argues that MedSync should continue using a pure Waterfall model.\n\nWhich factor **most strongly** supports this recommendation?",
    options: [
      "Hospitals frequently change requirements during development.",
      "The system must comply with strict healthcare regulations and extensive documentation requirements.",
      "Customers require software releases every two weeks.",
      "The project relies heavily on user stories and sprint reviews.",
    ],
    correctAnswers: [
      "The system must comply with strict healthcare regulations and extensive documentation requirements.",
    ],
    points: 1,
    explanation:
      "Waterfall performs best when requirements are relatively stable, formal documentation is required, regulatory approval is important, and traceability must be maintained. Healthcare systems frequently require compliance evidence and detailed documentation.\n\nOptions A, C, and D all describe conditions that favour **Agile** rather than Waterfall.",
  },

  {
    id: "ITSEA_W2_Q2",
    type: "fill-in-the-blank",
    tags: ["software testing", "SDLC"],
    sectionLabel: "1.2",
    text: "The Waterfall phase that verifies whether all integrated components function together correctly is called ___ and System Testing.",
    blanks: [
      {
        id: "b1",
        options: ["Acceptance", "Unit", "Integration", "Regression"],
        correctAnswer: "Integration",
      },
    ],
  },

  {
    id: "ITSEA_W2_Q3",
    type: "open-ended",
    tags: ["requirements analysis", "software processes"],
    sectionLabel: "1.3",
    text: "What software process activity establishes the services required by a system and its constraints? *(1–3 words)*",
    correctAnswers: ["Software Specification", "Specification"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      allowPartialMatch: true,
    },
    explanation:
      "**Software Specification** defines required services, functional requirements, constraints, and system boundaries *before* design begins.\n\nMany students confuse requirements gathering with specification — specification is broader and formalised.",
  },

  {
    id: "ITSEA_W2_Q4",
    type: "multiple-choice",
    tags: ["software processes", "SDLC"],
    sectionLabel: "1.4",
    text: "A hospital requests a new telemedicine feature halfway through development.\n\nWhich criticism of the Waterfall model becomes **most relevant**?",
    options: [
      "Lack of component reuse",
      "Difficulty accommodating change after development has begun",
      "Excessive customer involvement",
      "Lack of testing",
    ],
    correctAnswers: [
      "Difficulty accommodating change after development has begun",
    ],
    points: 1,
    explanation:
      "Waterfall assumes phases are completed sequentially. Introducing major changes later causes redesign, recoding, retesting, and schedule delays. This is the primary weakness of the Waterfall model when operating in dynamic environments.",
  },

  {
    id: "ITSEA_W2_Q5",
    type: "show-answer",
    tags: [
      "software processes",
      "project management",
      "requirements analysis",
      "software maintenance",
    ],
    sectionLabel: "1.5",
    text: "MedSync's executives ask you to recommend whether the organisation should use:\n- a predominantly **Waterfall** approach,\n- a predominantly **Agile** approach, or\n- a **hybrid** approach.\n\nEvaluate all three possibilities and justify your recommendation using characteristics of:\n- changing requirements,\n- regulatory compliance,\n- project scale,\n- stakeholder diversity,\n- system lifetime.\n\n*(8 marks)*",
    correctAnswers: [
      {
        text:
          "MedSync should adopt a **hybrid software development strategy** that combines the strengths of both Waterfall and Agile approaches.\n\n" +
          "A purely Waterfall approach provides strong governance, documentation, traceability, and compliance management. These characteristics are essential because healthcare software operates in a highly regulated environment where failures may affect patient safety. Formal requirements analysis, documented designs, and structured validation processes support regulatory audits and long-term maintenance.\n\n" +
          "However, Waterfall assumes that requirements remain relatively stable. MedSync operates in a dynamic environment where hospitals continuously request new features and healthcare regulations evolve regularly. A rigid Waterfall approach would make responding to change costly and slow.\n\n" +
          "Conversely, Agile methods support continuous customer involvement, incremental delivery, and rapid adaptation. Hospitals could evaluate working software early and provide feedback before significant resources are committed. This reduces the risk of developing features that do not meet operational needs.\n\n" +
          "Nevertheless, Agile alone may struggle because MedSync's system is large-scale, distributed across multiple teams, integrated with existing systems, and subject to external regulation. Large projects often require architectural planning, governance mechanisms, and extensive documentation that pure Agile approaches may not sufficiently provide.\n\n" +
          "Therefore, the most appropriate strategy is a **hybrid model** where architecture, compliance requirements, risk assessments, security controls, and documentation are planned using structured methods, while individual modules are developed incrementally using Agile techniques.\n\n" +
          "This approach balances flexibility with control and is most likely to deliver a compliant, maintainable, and adaptable healthcare platform.",
        diagram: {
          type: "mermaid",
          code: `graph TD
A[MedSync Strategy Decision]
A --> B[Pure Waterfall]
A --> C[Pure Agile]
A --> D[Hybrid — Recommended]
B --> B1[✅ Documentation & compliance]
B --> B2[✅ Traceability]
B --> B3[❌ Cannot accommodate change]
C --> C1[✅ Incremental delivery]
C --> C2[✅ Customer involvement]
C --> C3[❌ Weak governance at scale]
D --> D1[Structured: architecture, compliance, risk]
D --> D2[Agile: incremental module delivery]
D --> D3[Balances control with adaptability]`,
        },
      },
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Waterfall strengths explained | 2 |
| Waterfall weaknesses explained | 1 |
| Agile strengths explained | 2 |
| Agile limitations explained | 1 |
| Justified recommendation | 2 |
| **Total** | **8** |

**A+ Indicators — student:**
- Compares rather than merely describes
- Evaluates trade-offs explicitly
- Discusses scale, regulation, and changing requirements
- Recommends and justifies the hybrid approach

**Common mistakes:**
- Describing Waterfall and Agile without comparing them
- Recommending pure Agile without addressing regulatory risk
- Not linking argument back to the MedSync scenario`,
    points: 8,
  },

  // ─────────────────────────────────────────────
  // QUESTION 2 — AGILE TRANSFORMATION [13]
  // ─────────────────────────────────────────────

  {
    id: "ITSEA_W2_Q6",
    type: "multiple-choice",
    tags: ["software processes"],
    sectionLabel: "2.1",
    text: "The primary reason Agile methods emerged was:",
    options: [
      "To eliminate testing activities",
      "To reduce customer participation",
      "To better accommodate changing requirements",
      "To replace all documentation",
    ],
    correctAnswers: ["To better accommodate changing requirements"],
    points: 1,
    explanation:
      "Agile was created primarily because software requirements change frequently and traditional approaches struggled to accommodate these changes efficiently. It was **not** designed to eliminate testing, reduce customer participation, or abolish documentation.",
  },

  {
    id: "ITSEA_W2_Q7",
    type: "fill-in-the-blank",
    tags: ["software processes"],
    sectionLabel: "2.2",
    text: "Agile methods emphasise ___ delivery, where software is developed and released in small functional units.",
    blanks: [
      {
        id: "b1",
        options: ["Big-bang", "Waterfall", "Sequential", "Incremental"],
        correctAnswer: "Incremental",
      },
    ],
  },

  {
    id: "ITSEA_W2_Q8",
    type: "multiple-choice",
    tags: ["requirements gathering", "software processes"],
    sectionLabel: "2.3",
    text: "Which Agile principle is being demonstrated when hospital administrators participate continuously throughout development?",
    options: [
      "Maintain simplicity",
      "Customer involvement",
      "Refactoring",
      "System evolution",
    ],
    correctAnswers: ["Customer involvement"],
    points: 1,
    explanation:
      "Continuous stakeholder participation is the Agile principle of **Customer Involvement**. It ensures that end users provide ongoing feedback, reducing the risk of building features that do not meet operational needs.",
  },

  {
    id: "ITSEA_W2_Q9",
    type: "open-ended",
    tags: ["project management", "software processes"],
    sectionLabel: "2.4",
    text: "What Scrum artifact contains the prioritised list of desired features? *(1–3 words)*",
    correctAnswers: ["Product Backlog"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      allowPartialMatch: true,
    },
    explanation:
      "The **Product Backlog** contains prioritised features, requirements, and enhancements. It is owned by the Product Owner and serves as the single source of truth for what the team will build.",
  },

  {
    id: "ITSEA_W2_Q10",
    type: "multiple-choice",
    tags: ["requirements analysis", "software processes"],
    sectionLabel: "2.5",
    text: "Which statement **best distinguishes** Agile from traditional plan-driven development?",
    options: [
      "Agile avoids validation activities.",
      "Agile assumes requirements remain fixed.",
      "Agile integrates requirements discovery with development.",
      "Agile eliminates design activities.",
    ],
    correctAnswers: [
      "Agile integrates requirements discovery with development.",
    ],
    points: 1,
    explanation:
      "The key distinction is that Agile treats requirements as emergent and integrates their discovery with development cycles, rather than treating requirements as a separate upfront activity. Agile does **not** eliminate validation, assume fixed requirements, or abandon design.",
  },

  {
    id: "ITSEA_W2_Q11",
    type: "show-answer",
    tags: [
      "software processes",
      "requirements gathering",
      "project management",
    ],
    sectionLabel: "2.6",
    text: "MedSync plans to release software every two weeks to selected hospitals.\n\nEvaluate how **Agile principles** could improve project outcomes. Discuss:\n- Customer involvement\n- Embracing change\n- Incremental delivery\n- Simplicity\n- People over process\n\n*(8 marks)*",
    correctAnswers: [
      "Agile principles can significantly improve MedSync's project outcomes because healthcare environments evolve continuously.\n\n" +
        "**Customer involvement** ensures doctors, nurses, administrators, and regulatory representatives provide ongoing feedback. This reduces the risk of misunderstanding operational requirements and improves stakeholder satisfaction.\n\n" +
        "The principle of **embracing change** enables the project to adapt rapidly to changing healthcare regulations and emerging patient-care requirements without major redesign efforts.\n\n" +
        "**Incremental delivery** allows MedSync to release usable functionality every few weeks. Hospitals can validate features in real-world settings and identify defects early, before large investments are made.\n\n" +
        "**Maintaining simplicity** encourages developers to build only the functionality currently required rather than anticipating speculative future requirements. This reduces complexity and improves maintainability.\n\n" +
        "The principle of **people over process** recognises that skilled developers are more valuable than rigid procedural compliance. Teams are empowered to solve problems collaboratively and efficiently.\n\n" +
        "Collectively these principles improve responsiveness, quality, stakeholder alignment, and delivery speed.",
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Customer involvement — explained and applied | 2 |
| Embrace change — explained and applied | 2 |
| Incremental delivery — explained and applied | 1 |
| Simplicity — explained and applied | 1 |
| People over process — explained and applied | 1 |
| Integration into MedSync scenario | 1 |
| **Total** | **8** |

**Common mistakes:**
- Listing principles without applying them to MedSync
- Confusing "simplicity" with "poor design"
- Omitting the scenario context entirely`,
    points: 8,
  },

  // ─────────────────────────────────────────────
  // QUESTION 3 — EXTREME PROGRAMMING (XP) [12]
  // ─────────────────────────────────────────────

  {
    id: "ITSEA_W2_Q12",
    type: "multiple-choice",
    tags: ["code quality", "software processes"],
    sectionLabel: "3.1",
    text: "Which XP practice **directly** supports collective ownership of software?",
    options: [
      "Sprint reviews",
      "Pair programming",
      "Requirements freezing",
      "Architectural sign-off",
    ],
    correctAnswers: ["Pair programming"],
    points: 1,
    explanation:
      "**Pair programming** supports collective ownership because knowledge is shared continuously among team members. Both developers are familiar with the code produced, reducing single-point knowledge dependency.",
  },

  {
    id: "ITSEA_W2_Q13",
    type: "fill-in-the-blank",
    tags: ["requirements analysis"],
    sectionLabel: "3.2",
    text: "In XP, requirements are commonly expressed as ___ stories.",
    blanks: [
      {
        id: "b1",
        options: ["User", "Use Case", "Sprint", "Feature"],
        correctAnswer: "User",
      },
    ],
  },

  {
    id: "ITSEA_W2_Q14",
    type: "multiple-choice",
    tags: ["software testing", "validation & verification"],
    sectionLabel: "3.3",
    text: "A developer writes automated tests **before** implementing functionality.\n\nWhich XP practice is being used?",
    options: [
      "Refactoring",
      "Pair programming",
      "Test-first development",
      "Component testing",
    ],
    correctAnswers: ["Test-first development"],
    points: 1,
    explanation:
      "**Test-first development** (also called Test-Driven Development, or TDD) requires tests to be written before implementation. This ensures that functionality is verifiable from the outset and that no code is written without a corresponding test.",
  },

  {
    id: "ITSEA_W2_Q15",
    type: "open-ended",
    tags: ["code quality"],
    sectionLabel: "3.4",
    text: "What XP activity improves software structure without changing system behaviour? *(1 word)*",
    correctAnswers: ["Refactoring"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    explanation:
      "**Refactoring** improves internal code structure — removing duplication, improving naming, simplifying logic — without altering what the system does externally. It keeps the codebase clean and maintainable over time.",
  },

  {
    id: "ITSEA_W2_Q16",
    type: "multiple-choice",
    tags: ["code quality"],
    sectionLabel: "3.5",
    text: "Which scenario provides the **strongest justification** for refactoring?",
    options: [
      "The customer requests documentation.",
      "Similar code fragments appear throughout the system.",
      "The project budget increases.",
      "A sprint review is scheduled.",
    ],
    correctAnswers: ["Similar code fragments appear throughout the system."],
    points: 1,
    explanation:
      "Duplicate code is one of the strongest indicators that refactoring is needed. Repeated code fragments increase maintenance effort, create inconsistency risk, and signal poor abstraction. Refactoring extracts the shared logic into a single reusable unit.",
  },

  {
    id: "ITSEA_W2_Q17",
    type: "show-answer",
    tags: ["code quality", "software testing", "validation & verification"],
    sectionLabel: "3.6",
    text: "MedSync's development team argues that **pair programming** and **test-first development** will slow delivery.\n\nCritically evaluate this claim.\n\n*(7 marks)*",
    correctAnswers: [
      "The claim is **partially correct in the short term** but **incorrect in the long term**.\n\n" +
        "**Pair programming** initially requires two developers to work on a single task. However, it provides continuous peer review, knowledge transfer, and defect prevention. Errors are detected immediately rather than later during testing, which is significantly more expensive to fix.\n\n" +
        "**Test-first development** also appears slower because developers write tests before implementation. However, automated tests provide confidence that future changes do not break existing functionality, supporting continuous integration and reducing regression risk.\n\n" +
        "Together these practices reduce debugging effort, maintenance costs, and integration failures. The reduction in rework frequently outweighs the initial time investment.\n\n" +
        "Consequently, while delivery velocity may appear lower initially, **overall project efficiency and software quality are generally improved**.",
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Pair programming — short-term cost acknowledged | 1 |
| Pair programming — long-term benefits explained | 2 |
| Test-first development — short-term cost acknowledged | 1 |
| Test-first development — long-term benefits explained | 1 |
| Evaluation of trade-off (not one-sided) | 2 |
| **Total** | **7** |

**Common mistakes:**
- Agreeing with the claim without evaluating long-term productivity
- Listing benefits without engaging with the "slower delivery" argument
- Confusing test-first development with test-last (component testing)`,
    points: 7,
  },

  // ─────────────────────────────────────────────
  // QUESTION 4 — SCALING AGILE & PROCESS IMPROVEMENT [13]
  // ─────────────────────────────────────────────

  {
    id: "ITSEA_W2_Q18",
    type: "multiple-choice",
    tags: ["software processes", "project management"],
    sectionLabel: "4.1",
    text: "Which characteristic creates the **greatest challenge** when scaling Agile methods for MedSync?",
    options: [
      "Small co-located teams",
      "Stable requirements",
      "Multiple distributed teams developing interconnected systems",
      "Minimal stakeholder involvement",
    ],
    correctAnswers: [
      "Multiple distributed teams developing interconnected systems",
    ],
    points: 1,
    explanation:
      "Agile becomes significantly more difficult to coordinate when many distributed teams must align work across interconnected systems. Co-location, stable requirements, and strong stakeholder involvement are actually favourable conditions for Agile — not challenges.",
  },

  {
    id: "ITSEA_W2_Q19",
    type: "fill-in-the-blank",
    tags: ["systems thinking", "software processes"],
    sectionLabel: "4.2",
    text: "Large software systems are often described as systems of ___.",
    blanks: [
      {
        id: "b1",
        options: ["components", "modules", "systems", "services"],
        correctAnswer: "systems",
      },
    ],
  },

  {
    id: "ITSEA_W2_Q20",
    type: "multiple-choice",
    tags: ["software processes", "system design"],
    sectionLabel: "4.3",
    text: "Why might **continuous integration** become difficult in very large Agile projects?",
    options: [
      "User stories cannot be written",
      "Multiple independently developed systems must be integrated",
      "Testing is prohibited",
      "Requirements never change",
    ],
    correctAnswers: [
      "Multiple independently developed systems must be integrated",
    ],
    points: 1,
    explanation:
      "Integration becomes significantly more complex when many independently developed systems must work together. Coordination overhead, interface mismatches, and conflicting release cycles all complicate continuous integration at scale.",
  },

  {
    id: "ITSEA_W2_Q21",
    type: "open-ended",
    tags: ["requirements gathering", "software processes"],
    sectionLabel: "4.4",
    text: "Which technique allows users to experiment with system functionality **before** final delivery? *(2 words)*",
    correctAnswers: ["System Prototyping", "Prototyping"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      allowPartialMatch: true,
    },
    explanation:
      "**System Prototyping** allows stakeholders to experiment with and evaluate system functionality before the final product is delivered. It surfaces usability issues and incorrect assumptions early, reducing costly late-stage rework.",
  },

  {
    id: "ITSEA_W2_Q22",
    type: "multiple-choice",
    tags: ["software processes", "project management"],
    sectionLabel: "4.5",
    text: "Which approach **primarily** focuses on reducing process overhead and improving responsiveness?",
    options: [
      "Process maturity",
      "Agile improvement",
      "Waterfall planning",
      "Requirements freezing",
    ],
    correctAnswers: ["Agile improvement"],
    points: 1,
    explanation:
      "**Agile process improvement** focuses on responsiveness and reducing unnecessary process overhead — enabling teams to react quickly without being burdened by excessive bureaucracy. Process maturity models (such as CMMI) emphasise formalisation rather than responsiveness.",
  },

  {
    id: "ITSEA_W2_Q23",
    type: "show-answer",
    tags: ["software processes", "project management", "risk management"],
    sectionLabel: "4.6",
    text: "Senior management proposes using a **purely Agile** approach across all MedSync projects, including safety-critical healthcare systems.\n\nAssess the **risks** of this decision and explain why large-scale systems often require integration between Agile and plan-driven practices.\n\n*(8 marks)*",
    correctAnswers: [
      {
        text:
          "A purely Agile approach presents **significant risks** for safety-critical healthcare systems.\n\n" +
          "Healthcare software must comply with regulations, support audits, provide traceability, and demonstrate verification activities. Pure Agile approaches often rely heavily on informal communication and minimal documentation, which may **not satisfy regulatory requirements** in healthcare contexts.\n\n" +
          "Large-scale systems also involve multiple teams, legacy systems, external stakeholders, and long development lifecycles. These factors introduce complexity that requires structured governance and architectural planning — areas where Agile alone offers limited guidance.\n\n" +
          "**Plan-driven approaches** provide stability through documentation, architecture control, and compliance management. **Agile approaches** provide adaptability through iterative development and stakeholder feedback.\n\n" +
          "Combining both approaches allows organisations to achieve responsiveness without sacrificing governance. High-level planning can coexist with Agile implementation teams, enabling each subsystem to be delivered incrementally while the overall architecture remains controlled.\n\n" +
          "For MedSync, a **hybrid model** reduces risk while maintaining flexibility — satisfying both regulatory requirements and the need for rapid, customer-driven delivery.",
        diagram: {
          type: "mermaid",
          code: `graph LR
A[Pure Agile Risk Areas]
A --> R1[Insufficient documentation for audits]
A --> R2[Weak governance at scale]
A --> R3[Poor traceability]
A --> R4[Coordination failure across teams]

B[Hybrid Model Solution]
B --> S1[Plan-driven: architecture & compliance]
B --> S2[Agile: incremental module delivery]
B --> S3[Structured testing & traceability]
B --> S4[Customer feedback preserved]`,
        },
      },
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Risks of pure Agile identified (at least 2) | 3 |
| Large-system challenges discussed | 2 |
| Need for plan-driven elements explained | 2 |
| Justified recommendation | 1 |
| **Total** | **8** |

**A+ Indicators — student:**
- Identifies *specific* regulatory risks (audit trails, traceability, documentation)
- Discusses coordination challenges across distributed teams
- Argues for integration of approaches rather than wholesale adoption

**Common mistakes:**
- Only discussing Agile benefits without addressing the risks
- Vague statements such as "Agile may not work" without explaining why
- Not linking the answer to safety-critical healthcare context`,
    points: 8,
  },
];