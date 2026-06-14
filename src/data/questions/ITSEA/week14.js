// src/data/questions/ITSEA/week14.js
export default [

  // ─────────────────────────────────────────────
  // SCENARIO BLOCK
  // ─────────────────────────────────────────────
  {
    id: "ITSEA_W14_SCENARIO",
    type: "scenario",
    context: "**AeroFleet Systems: Configuration Management & Software Evolution**\n\nAeroFleet Systems (AFS) is a technology company that develops safety-critical software for drone fleet operations used in logistics, emergency services, and infrastructure inspection.\n\nThe organisation maintains a large codebase developed across multiple distributed teams. Software is released to clients on a rolling schedule. A critical fault report has recently been received relating to a software release deployed eighteen months ago.\n\nSenior engineers are reviewing the organisation's version management practices, build and release processes, and change management procedures to determine where improvements are needed.",
  },

  // ─────────────────────────────────────────────
  // QUESTION 1 — MANAGING SOFTWARE EVOLUTION [12]
  // ─────────────────────────────────────────────

  {
    id: "ITSEA_W14_Q1",
    type: "multiple-choice",
    tags: ["version control", "software processes"],
    sectionLabel: "1.1",
    text: "AFS has developers located across three continents. The network connection to the central repository is frequently unreliable.\n\nWhich version control strategy **best** supports continued development during outages?",
    options: [
      "Centralised version control because all changes are committed to one server",
      "Distributed version control because developers maintain local repositories containing project history",
      "Manual file naming because it requires no network connection at all",
      "Centralised version control because it prevents branching conflicts",
    ],
    correctAnswers: [
      "Distributed version control because developers maintain local repositories containing project history",
    ],
    points: 1,
    explanation:
      "Distributed version control systems such as Git maintain a **complete local repository** on each developer's machine. Developers can continue committing changes and reviewing full project history while disconnected from the network.\n\nCentralised systems generally require a live connection to the central server for most operations. Manual file naming offers no structured history, branching, or merge support.",
  },

  {
    id: "ITSEA_W14_Q2",
    type: "fill-in-the-blank",
    tags: ["version control", "system design"],
    sectionLabel: "1.2",
    text: "A specific definition of a complete system that identifies the exact versions of components, libraries, and configuration files is called a ___.",
    blanks: [
      {
        id: "b1",
        options: ["release", "snapshot", "baseline", "build"],
        correctAnswer: "baseline",
      },
    ],
    explanation:
      "A **baseline** specifies the exact component versions, libraries, and configurations that collectively define a particular system version.\n\nA release is distributed to customers; a baseline defines a system configuration. These are related but distinct concepts.",
  },

  {
    id: "ITSEA_W14_Q3",
    type: "open-ended",
    tags: ["version control"],
    sectionLabel: "1.3",
    text: "What is the term used for a **sequence of source-code versions** derived from earlier versions? *(1 word)*",
    correctAnswers: ["codeline"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    explanation:
      "A **codeline** represents the evolutionary sequence of software versions over time — the chain of commits from an original version through all its subsequent modifications.\n\n*Do not accept:* \"branch\" or \"repository\" — these are related but structurally different concepts.",
  },

  {
    id: "ITSEA_W14_Q4",
    type: "multiple-choice",
    tags: ["version control", "software processes"],
    sectionLabel: "1.4",
    text: "The diagram below illustrates the development history of a software component at AFS. The main codeline splits into two branches, both of which are later brought back together.\n\nWhat is the **primary purpose** of the merge operations shown?",
    options: [
      "To generate executable software builds",
      "To combine independently developed changes into a single codeline",
      "To archive historical versions of software",
      "To create release documentation",
    ],
    correctAnswers: [
      "To combine independently developed changes into a single codeline",
    ],
    points: 2,
    image: {
        src: "/images/ITSSA_W4_Q4.png",
        alt: "Repository branching and merging diagram showing a main codeline splitting into two development branches that are later merged back into the main branch.",
        caption: "Figure 1. Software component history illustrating branching, parallel development, and merging operations within a version-controlled repository."
        },
    explanation:
      "A **merge** operation consolidates changes made on separate branches back into a single unified version of the software. It is used so that teams or developers working in parallel can independently develop modifications and later combine their approved changes.\n\n**Why the others are incorrect:**\n- **A** — Building involves compiling and linking; a merge does not generate an executable.\n- **C** — Version history is preserved automatically by the VCS through commits, not by merging.\n- **D** — Release documentation is a release management activity, not a version management operation.",
  },

  {
    id: "ITSEA_W14_Q5",
    type: "show-answer",
    tags: ["version control", "project management", "risk management"],
    sectionLabel: "1.5",
    text: "AFS currently manages its source code using manually named files (e.g. `FlightController_v2_final_FINAL2.c`). Multiple developers work on the same components simultaneously.\n\nEvaluate the **organisational and technical importance** of introducing a formal version management system at AFS.\n\nIn your answer, discuss:\n- The role of a project repository and developer workspaces\n- Version identification\n- Change history recording\n- Branching and merging\n- Business risks of the current approach\n\n*(7 marks)*",
    correctAnswers: [
      "AeroFleet Systems requires a formal version management system because software development is inherently collaborative and continuously evolving. The organisation currently relies on manually named files, which introduces ambiguity, inconsistency, and significant operational risk.\n\n" +
        "A version management system establishes a **project repository** that stores authoritative versions of all software components. Developers retrieve components into private **workspaces** (or local repositories in distributed systems), where modifications can be made independently without immediately affecting the main codebase.\n\n" +
        "One major benefit is **version identification**. Every component version can be uniquely identified, ensuring that developers and managers know precisely which version is deployed, tested, or released. This becomes particularly important when customers report faults affecting specific software versions.\n\n" +
        "The system also maintains a detailed **change history**. Each modification is associated with an author, timestamp, and rationale, creating traceability throughout the software lifecycle. This improves debugging, accountability, auditing, and compliance.\n\n" +
        "Because multiple teams may work simultaneously, **branching** enables parallel development while **merging** integrates approved changes into a consolidated version. This prevents developers from overwriting each other's work and supports scalable collaboration.\n\n" +
        "Without version management, AFS faces several business risks including lost source code, conflicting updates, inability to reproduce defects, delayed maintenance, reduced software quality, and customer dissatisfaction. In safety-critical drone operations, these failures could have severe operational and financial consequences.",
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Repository explained correctly | 1 |
| Workspace / private development explained | 1 |
| Version identification discussed | 1 |
| Change history recording discussed | 1 |
| Branching and merging discussed | 1 |
| Business risks identified | 1 |
| Integrated evaluation and application to scenario | 1 |
| **Total** | **7** |

**Band Descriptors:**

| Band | Marks | Description |
|---|---|---|
| Distinction | 6–7 | Integrates all concepts into the AFS scenario; demonstrates both organisational and technical understanding |
| Merit | 4–5 | Explains concepts correctly but lacks evaluation or scenario application |
| Pass | 1–3 | Primarily definitions with little reference to AFS context |

**Common mistakes:**
- Listing VCS features as a bullet list without evaluating their importance
- Confusing a repository with a backup folder
- Not connecting business risks to safety-critical drone operations`,
    points: 7,
  },

  // ─────────────────────────────────────────────
  // QUESTION 2 — BUILDING, CHANGING & RELEASING [13]
  // ─────────────────────────────────────────────

  {
    id: "ITSEA_W14_Q6",
    type: "open-ended",
    tags: ["software testing", "software processes", "validation & verification"],
    sectionLabel: "2.1",
    text: "The diagram below illustrates AFS's Continuous Integration workflow. After a developer commits code, tests run first in the **developer workspace**, then again on the **build server**.\n\nExplain why the workflow requires testing in **both** locations.\n\nYour answer should refer to software quality and collaborative development risks. *(4 marks)*",
    correctAnswers: [
      "Testing in the developer workspace verifies that changes function correctly before they are shared with other developers. Testing on the build server provides an independent verification step after integration with the latest repository version. This identifies conflicts, dependency issues, or defects introduced through interactions with other developers' changes. The second test ensures that the shared baseline remains stable and deployable.",
    ],
    points: 4,
    markingGuide: `| Criterion | Marks |
|---|---|
| Developer-side testing explained (local verification before sharing) | 1 |
| Build-server testing explained (independent post-integration check) | 1 |
| Integration / conflict risk discussed | 1 |
| Quality assurance / stable baseline discussed | 1 |
| **Total** | **4** |`,

    image: {
        src: "/images/ITSSA_W4_Q6.png",
        alt: "Continuous Integration workflow showing checkout, build, automated testing, commit, build server verification, and baseline creation.",
        caption: "Figure 2. Continuous Integration workflow used by AeroFleet Systems to verify changes before incorporation into the system baseline."
        }
  },

  {
    id: "ITSEA_W14_Q7",
    type: "fill-in-the-blank",
    tags: ["system design"],
    sectionLabel: "2.2",
    text: "The platform on which the final software executes is known as the ___ environment.",
    blanks: [
      {
        id: "b1",
        options: ["production", "target", "deployment", "runtime"],
        correctAnswer: "target",
      },
    ],
    explanation:
      "The **target environment** is the specific execution platform where the finished system runs in operation — including its operating system, hardware, and runtime dependencies.\n\n*Common incorrect answers:* production, deployment, runtime — these are related terms but are not the formal configuration management term.",
  },

  {
    id: "ITSEA_W14_Q8",
    type: "open-ended",
    tags: ["risk management", "software maintenance"],
    sectionLabel: "2.3",
    text: "A change request has been submitted to modify AFS's flight-path calculation module.\n\nName **one** factor that change management must evaluate before the change can be approved. *(1–3 words)*",
    correctAnswers: [
      "costs",
      "benefits",
      "users affected",
      "consequences",
      "product release cycle",
    ],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      allowPartialMatch: true,
    },
    explanation:
      "Change management requires evaluating the business and technical impact of a proposed modification before approving it. Accepted factors include: **costs**, **benefits**, **users affected**, **consequences**, and **product release cycle**.\n\nAll of these help the change review board determine whether a change is justified, safe, and appropriately timed.",
  },

  {
    id: "ITSEA_W14_Q9",
    type: "multiple-choice",
    tags: ["software maintenance", "project management"],
    sectionLabel: "2.4",
    text: "A critical bug report arrives at AFS. The engineering manager must decide whether to prioritise the fix above other scheduled work, assess the impact on current releases, and determine which customers are affected.\n\nWhich software engineering process is responsible for this decision-making?",
    options: [
      "Version management",
      "System building",
      "Change management",
      "Continuous integration",
    ],
    correctAnswers: ["Change management"],
    points: 2,
    explanation:
      "**Change management** evaluates the costs, benefits, priorities, and business impact of proposed changes before approving them for implementation.\n\n**Why the others are incorrect:**\n- **Version management** tracks and stores changes — it does not decide whether a change should be made.\n- **System building** compiles and links components into an executable — it is a technical activity, not a governance one.\n- **Continuous integration** automates building and testing — it executes approved changes, not evaluates them.",
  },

  {
    id: "ITSEA_W14_Q10",
    type: "fill-in-the-blank",
    tags: ["software processes", "IDEs & tooling"],
    sectionLabel: "2.5",
    text: "The process of creating a complete executable system by compiling and linking components is called system ___.",
    blanks: [
      {
        id: "b1",
        options: ["building", "deploying", "packaging", "releasing"],
        correctAnswer: "building",
      },
    ],
    explanation:
      "**System building** is the process that transforms source code, libraries, and configuration files into an executable system. It involves compiling source files, resolving dependencies, and linking components into a runnable artefact.",
  },

  {
    id: "ITSEA_W14_Q11",
    type: "show-answer",
    tags: ["software maintenance", "system configuration", "debugging"],
    sectionLabel: "2.6",
    text: "AFS receives a critical fault report relating to a software release deployed **eighteen months ago**.\n\nThe release audit record for that version contains the following:\n- ✅ Source-code version identifiers\n- ✅ Executable build artefacts\n- ❌ Configuration files *(not archived)*\n- ❌ Compiler version *(not recorded)*\n- ❌ Operating-system version *(not recorded)*\n- ❌ Third-party library versions *(not recorded)*\n\nEvaluate whether the release can be **reliably reproduced**.\n\nIn your answer:\n- Identify missing information\n- Explain why the missing information matters\n- Discuss the consequences for debugging and maintenance\n- Recommend improvements to release management\n\n*(6 marks)*",
    correctAnswers: [
      "The release **cannot** be reliably reproduced because several critical artefacts are missing.\n\n" +
        "Although source-code versions and executable builds have been retained, the absence of **configuration files**, **compiler versions**, **operating-system information**, and **library versions** prevents reconstruction of the original execution environment.\n\n" +
        "Configuration files may alter application behaviour significantly, and even minor differences in settings can produce different runtime outcomes. Compiler versions affect how source code is translated into executable instructions — different compiler versions may apply different optimisations or interpret language constructs differently. Third-party library versions may contain API differences or behavioural changes between versions. Operating-system differences may also introduce environment-specific faults that cannot be reproduced on a different OS version.\n\n" +
        "Without these artefacts, engineers may be **unable to recreate the defect**, significantly increasing troubleshooting time and maintenance costs. The customer may experience longer outages, and AFS risks reduced confidence in its product quality.\n\n" +
        "AFS should implement **comprehensive release tracking** procedures, ensuring that every release archives all source-code versions, configuration files, compiler and toolchain versions, third-party library versions, operating-system specifications, and build artefacts. A **release reproduction record** should be maintained so that any historical release can be reconstructed on demand.",
    ],
    markingGuide: `| Criterion | Marks | What the Examiner Looks For |
|---|---|---|
| Identification of missing artefacts | 1 | Correctly identifies configuration files, compiler versions, OS versions, and/or library versions as missing |
| Explanation of importance | 2 | Explains why each missing artefact is needed to recreate the original software environment and behaviour |
| Impact on debugging and maintenance | 1 | Discusses inability to reproduce faults, increased troubleshooting effort, longer maintenance cycles, or reduced reliability |
| Release management recommendations | 1 | Recommends release tracking, release reproduction records, configuration archiving, or preservation of build environments |
| Overall evaluation and scenario application | 1 | Clearly concludes whether the release can be reliably reproduced and relates the answer directly to AFS |
| **Total** | **6** | |

**Common mistakes:**
- Stating only that "information is missing" without specifying what or why it matters
- Listing recommendations without explaining the impact of the current gap
- Not making an explicit judgment about whether reproduction is possible`,
    points: 6,    
    image: {
        src: "/images/ITSSA_W4_Q9.png",
        alt: "Release documentation audit table showing which release artefacts were recorded and which were missing for a historical software release.",
        caption: "Figure 3. Release audit identifying available and missing artefacts required for release reproduction and fault investigation."
        }
  },
];