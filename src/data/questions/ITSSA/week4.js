// src/data/questions/ITSSA/week4.js
export default [

  // ── SCENARIO ────────────────────────────────────────────────────────────────
  {
    id: "SCENARIO_ITSSA_W4",
    type: "scenario",
    title: "Questions 1–4: Threat Modeling & Threat Mitigation (100 Marks)",
    context: `Synapse MetroCare Network (SMN) is a rapidly expanding smart-healthcare provider operating hospitals, pharmacies, mobile clinics, and remote patient-monitoring services across several metropolitan regions.

SMN recently introduced an integrated digital healthcare platform called PulseBridge, designed to centralise **patient medical records, smart wearable telemetry, mobile prescription services, insurance claims, remote diagnostics, hospital inventory systems, and emergency response coordination**.

The platform allows doctors to access patient data remotely, patients to schedule appointments through a mobile application, third-party laboratories to upload test results, insurance partners to verify treatment claims, and IoT devices to continuously stream biometric data.

Following deployment, several security incidents were reported:
• A ransomware group encrypted sections of the hospital scheduling system
• Unauthorized users modified medication dosage records
• A fake patient portal was discovered harvesting login credentials
• Network administrators found suspicious traffic patterns originating from internal systems
• The emergency dispatch system became unavailable during peak operating hours
• Several audit logs were mysteriously deleted

The executive board now requires a comprehensive threat-modeling and threat-mitigation review before nationwide expansion.`,
  },

  // ── QUESTION 1 — Threat Modeling Foundations (25 Marks) ─────────────────────

  // Q1.1 Multiple Choice (a)
  {
    id: "ITSSA_W4_Q1",
    type: "multiple-choice",
    tags: ["threat modeling", "security design"],
    sectionLabel: "1.1(a)",
    text: "The **PRIMARY** purpose of conducting threat modeling during the early design phase of PulseBridge is to:",
    options: [
      "Eliminate all future software vulnerabilities",
      "Reduce software development costs by removing testing requirements",
      "Integrate security considerations before architectural weaknesses become embedded",
      "Guarantee compliance with all future cybersecurity legislation",
    ],
    correctAnswers: [
      "Integrate security considerations before architectural weaknesses become embedded",
    ],
    points: 2,
    explanation:
      "Threat modeling is a proactive process. It reduces risk by identifying weaknesses **before** they are baked into the architecture — it cannot eliminate all vulnerabilities or guarantee legislative compliance.",
  },

  // Q1.1 Multiple Choice (b)
  {
    id: "ITSSA_W4_Q2",
    type: "multiple-choice",
    tags: ["DFD", "threat modeling", "data flow diagrams"],
    sectionLabel: "1.1(b)",
    text: "Which component of a Data Flow Diagram (DFD) **BEST** represents a cloud-based database storing archived patient scans?",
    options: ["Interactor", "Processor", "Trust Boundary", "Storage"],
    correctAnswers: ["Storage"],
    points: 2,
    explanation:
      "**Storage** represents any persistent data repository — databases, file stores, or archives. A cloud database holding archived scans is a data-at-rest location, making Storage the correct DFD component.",
  },

  // Q1.1 Multiple Choice (c)
  {
    id: "ITSSA_W4_Q3",
    type: "multiple-choice",
    tags: ["DFD", "trust boundaries", "threat modeling"],
    sectionLabel: "1.1(c)",
    text: "A trust boundary **MOST** directly exists when:",
    options: [
      "Data changes format within memory",
      "Information moves between environments with different security assumptions",
      "Two processors exchange encrypted traffic",
      "A user authenticates successfully",
    ],
    correctAnswers: [
      "Information moves between environments with different security assumptions",
    ],
    points: 2,
    explanation:
      "A **trust boundary** marks the point where data crosses from one security domain into another — for example, from a public mobile app into the internal hospital network. The difference in trust levels, not encryption or authentication alone, defines the boundary.",
  },

  // Q1.1 Multiple Choice (d)
  {
    id: "ITSSA_W4_Q4",
    type: "multiple-choice",
    tags: ["STRIDE", "privilege escalation", "threat identification"],
    sectionLabel: "1.1(d)",
    text: "A hospital employee accesses confidential oncology records beyond their authorised permissions using a manipulated admin token. This **MOST** accurately represents:",
    options: [
      "Repudiation",
      "Spoofing",
      "Elevation of Privilege",
      "Information Disclosure",
    ],
    correctAnswers: ["Elevation of Privilege"],
    points: 2,
    explanation:
      "**Elevation of Privilege** occurs when a user gains access rights beyond what they are legitimately authorised to hold. Manipulating an admin token to bypass access controls is a classic example of this STRIDE category.",
  },

  // Q1.1 Multiple Choice (e)
  {
    id: "ITSSA_W4_Q5",
    type: "multiple-choice",
    tags: ["threat modeling", "threat vs vulnerability", "security concepts"],
    sectionLabel: "1.1(e)",
    text: "Which statement **BEST** distinguishes a threat from a vulnerability?",
    options: [
      "A threat is always technical, while vulnerabilities are procedural",
      "A vulnerability guarantees successful exploitation",
      "A threat is a potential harmful event, whereas a vulnerability is a weakness enabling it",
      "Vulnerabilities only exist in software systems",
    ],
    correctAnswers: [
      "A threat is a potential harmful event, whereas a vulnerability is a weakness enabling it",
    ],
    points: 2,
    explanation:
      "A **threat** is a possible adverse event (e.g., a ransomware attack). A **vulnerability** is a weakness that could be exploited to realise that threat (e.g., unpatched software). Neither guarantees the other — both must align for an exploit to succeed.",
  },

  // Q1.2 Fill-in-the-Blank (a)
  {
    id: "ITSSA_W4_Q6",
    type: "fill-in-the-blank",
    tags: ["STRIDE", "threat modeling", "Microsoft"],
    sectionLabel: "1.2(a)",
    text: "The Microsoft-developed taxonomy used to systematically categorise security threats is called ___.",
    blanks: [
      {
        id: "b1",
        options: ["DREAD", "OWASP", "PASTA", "STRIDE", "VAST"],
        correctAnswer: "STRIDE",
      },
    ],
  },

  // Q1.2 Fill-in-the-Blank (b)
  {
    id: "ITSSA_W4_Q7",
    type: "fill-in-the-blank",
    tags: ["DFD", "data flow diagrams", "threat modeling"],
    sectionLabel: "1.2(b)",
    text: "A graphical representation showing the movement of information through a system is called a ___.",
    blanks: [
      {
        id: "b1",
        options: [ "Entity Relationship Diagram", "Data Flow Diagram", "Sequence Diagram", "Network Topology Map"],
        correctAnswer: "Data Flow Diagram",
      },
    ],
  },

  // Q1.2 Fill-in-the-Blank (c)
  {
    id: "ITSSA_W4_Q8",
    type: "fill-in-the-blank",
    tags: ["penetration testing", "security testing", "threat mitigation"],
    sectionLabel: "1.2(c)",
    text: "The process of staging simulated attacks to evaluate system security is known as ___ testing.",
    blanks: [
      {
        id: "b1",
        options: [ "unit", "penetration", "regression", "integration"],
        correctAnswer: "penetration",
      },
    ],
  },

  // Q1.3 Open-Ended (a)
  {
    id: "ITSSA_W4_Q9",
    type: "open-ended",
    tags: ["DREAD", "risk ranking", "reproducibility"],
    sectionLabel: "1.3(a)",
    text: "Which **DREAD** factor evaluates how easy a vulnerability is to **repeatedly** attack?",
    correctAnswers: ["Reproducibility"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    explanation:
      "**Reproducibility** measures how consistently an attack can be repeated. A high score means the exploit can be triggered reliably every time — making it far more dangerous than a one-off flaw.",
  },

  // Q1.3 Open-Ended (b)
  {
    id: "ITSSA_W4_Q10",
    type: "open-ended",
    tags: ["DFD", "data flow diagrams", "processors"],
    sectionLabel: "1.3(b)",
    text: "Which DFD component represents locations where data is **transformed**?",
    correctAnswers: ["Processors", "Processor"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
      allowPartialMatch: true,
    },
    explanation:
      "**Processors** (also called processes) are the DFD components that receive input data, apply logic or transformation, and produce output. Examples include authentication services, prescription validation engines, and dosage calculators.",
  },

  // Q1.3 Open-Ended (c)
  {
    id: "ITSSA_W4_Q11",
    type: "open-ended",
    tags: ["STRIDE", "repudiation", "audit logs"],
    sectionLabel: "1.3(c)",
    text: "Which **STRIDE** category involves hiding evidence of malicious actions?",
    correctAnswers: ["Repudiation"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    explanation:
      "**Repudiation** covers actions that deny involvement in, or erase evidence of, malicious activity — such as deleting audit logs. Without reliable logging, attackers can claim they never performed an action.",
  },

  // Q1.4 Show-Answer Essay (12 Marks)
  {
    id: "ITSSA_W4_Q12",
    type: "show-answer",
    tags: [
      "threat modeling",
      "STRIDE",
      "DFD",
      "organisational security",
      "security design",
    ],
    sectionLabel: "1.4",
    text: "SMN executives believe that installing stronger firewalls alone will sufficiently secure PulseBridge.\n\nCritically evaluate this belief using principles from threat modeling. In your answer:\n- explain why tooling alone is insufficient,\n- discuss the role of DFDs,\n- analyse at least **FOUR** STRIDE threat categories relevant to the scenario,\n- explain how threat modeling improves organisational decision-making.",
    correctAnswers: [
      {
        text:
          "**Why Tooling Alone Is Insufficient**\n\n" +
          "Stronger firewalls address only perimeter threats. Modern healthcare environments like PulseBridge face threats from external attackers, malicious insiders, third-party laboratories, IoT devices, and misconfigured services — none of which a firewall alone can mitigate. Threat modeling exists precisely because security requires a structured approach to identifying all attack surfaces, not just external network ingress.\n\n" +
          "**The Role of Data Flow Diagrams (DFDs)**\n\n" +
          "DFDs are foundational to threat modeling. They visually map how data enters, moves through, and exits a system. In PulseBridge, a DFD would identify:\n" +
          "- *External interactors* such as patients, laboratories, and insurance providers\n" +
          "- *Processors* handling prescription validation and diagnostic routing\n" +
          "- *Storage* repositories containing medical records and audit logs\n" +
          "- *Trust boundaries* separating hospital internal systems from public-facing mobile applications and IoT streams\n\n" +
          "Without DFDs, hidden attack paths and insecure trust transitions remain undetected.\n\n" +
          "**STRIDE Analysis Applied to PulseBridge**\n\n" +
          "- **Spoofing:** A fake patient portal was discovered harvesting credentials, impersonating the legitimate PulseBridge login interface. Firewalls cannot detect or prevent identity impersonation at the application layer.\n" +
          "- **Tampering:** Unauthorised users modified medication dosage records. This represents integrity violations to critical medical data — a firewall offers no protection against authenticated insiders with manipulated tokens.\n" +
          "- **Repudiation:** Audit logs were deleted, allowing attackers to deny malicious activity. Preventing repudiation requires immutable logging infrastructure, not network perimeter controls.\n" +
          "- **Denial of Service:** The emergency dispatch system became unavailable during peak hours, directly preventing legitimate use. Healthcare systems are high-value DoS targets because availability is life-critical.\n" +
          "- **Elevation of Privilege:** Manipulated administrator tokens granted access beyond authorised permissions. Access control enforcement and privilege separation must be baked into the architecture.\n\n" +
          "**How Threat Modeling Improves Organisational Decision-Making**\n\n" +
          "Threat modeling shifts security from reactive to proactive. It enables management to prioritise high-impact, high-likelihood risks rather than applying generic controls uniformly. Resources are focused where they matter most — for PulseBridge, medication integrity and emergency dispatch availability represent the highest risk to patient safety and operational continuity.\n\n" +
          "Ultimately, security requires coordination across people, processes, architecture, and technology. Stronger firewalls are one control among many — they cannot substitute for a structured, organisation-wide threat-modeling programme.",
      },
    ],
    markingGuide:
      "| Criterion | Marks |\n|---|---|\n| Explains why tooling alone is insufficient (technical + organisational reasoning) | 2 |\n| Discusses the role of DFDs with specific PulseBridge examples | 2 |\n| Analyses at least four STRIDE categories with scenario-specific evidence | 4 |\n| Explains how threat modeling improves decision-making and risk prioritisation | 2 |\n| Integration of technical and organisational reasoning | 1 |\n| Clarity, structure, and precision | 1 |\n| **Total** | **12** |\n\n**Common errors (cap at 8/12):**\n- Listing STRIDE categories without linking them to the PulseBridge incidents\n- Treating threat modeling as only a technical exercise\n- Failing to critique the firewall-only assumption",
    points: 12,
    image: {
        src: "/images/ITSSA_W4_Q12.png",
        alt: "Data Flow Diagram showing the PulseBridge healthcare platform architecture with external entities, internal hospital systems, data stores, and trust boundaries used for threat modelling analysis.",
        caption: "Figure 1: PulseBridge Data Flow Diagram (DFD) illustrating system components, trust boundaries, processors, and data flows for threat-modelling analysis."
        }
  },

  // ── QUESTION 2 — Threat Identification & Risk Ranking (25 Marks) ─────────────

  // Q2.1 Multiple Choice (a)
  {
    id: "ITSSA_W4_Q13",
    type: "multiple-choice",
    tags: ["STRIDE", "tampering", "threat identification"],
    sectionLabel: "2.1(a)",
    text: "Which scenario **BEST** represents tampering?",
    options: [
      "A user denies accessing patient records",
      "An attacker changes insulin dosage values in transit",
      "Attackers overwhelm servers with requests",
      "A fake login page captures passwords",
    ],
    correctAnswers: ["An attacker changes insulin dosage values in transit"],
    points: 2,
    explanation:
      "**Tampering** is the unauthorised modification of data. Altering insulin dosage values in transit is a textbook example — it violates data integrity and directly endangers patient safety.",
  },

  // Q2.1 Multiple Choice (b)
  {
    id: "ITSSA_W4_Q14",
    type: "multiple-choice",
    tags: ["risk ranking", "threat prioritisation", "risk matrix"],
    sectionLabel: "2.1(b)",
    text: "In a risk prioritisation matrix, which quadrant represents threats that are **BOTH** severe **AND** likely?",
    options: ["Quadrant 1", "Quadrant 2", "Quadrant 3", "Quadrant 4"],
    correctAnswers: ["Quadrant 1"],
    points: 2,
    explanation:
      "**Quadrant 1** captures high-severity, high-likelihood threats. These demand immediate mitigation resources because their potential impact and probability of occurrence are both elevated.",
  },

  // Q2.1 Multiple Choice (c)
  {
    id: "ITSSA_W4_Q15",
    type: "multiple-choice",
    tags: ["DREAD", "risk ranking", "affected users"],
    sectionLabel: "2.1(c)",
    text: "Which **DREAD** component evaluates the **number of affected users**?",
    options: [
      "Discoverability",
      "Damage Potential",
      "Affected Users",
      "Exploitability",
    ],
    correctAnswers: ["Affected Users"],
    points: 2,
    explanation:
      "**Affected Users** scores how broadly a threat's impact is distributed. A compromise of PulseBridge's central records repository would score very high here — affecting patients across multiple hospitals simultaneously.",
  },

  // Q2.2 Fill-in-the-Blank (a)
  {
    id: "ITSSA_W4_Q16",
    type: "fill-in-the-blank",
    tags: ["DREAD", "discoverability", "risk ranking"],
    sectionLabel: "2.2(a)",
    text: "The DREAD factor assessing how easy a threat is to **find** is called ___.",
    blanks: [
      {
        id: "b1",
        options: ["Reproducibility", "Discoverability", "Exploitability", "Damage Potential",],
        correctAnswer: "Discoverability",
      },
    ],
  },

  // Q2.2 Fill-in-the-Blank (b)
  {
    id: "ITSSA_W4_Q17",
    type: "fill-in-the-blank",
    tags: ["risk ranking", "risk matrix", "threat prioritisation"],
    sectionLabel: "2.2(b)",
    text: "Threats that are harmless yet likely belong to ___.",
    blanks: [
      {
        id: "b1",
        options: ["Quadrant 1", "Quadrant 2", "Quadrant 3", "Quadrant 4"],
        correctAnswer: "Quadrant 3",
      },
    ],
  },

  // Q2.3 Open-Ended (a)
  {
    id: "ITSSA_W4_Q18",
    type: "open-ended",
    tags: ["STRIDE", "spoofing", "fake portals"],
    sectionLabel: "2.3(a)",
    text: "Which **STRIDE** category includes fake login portals?",
    correctAnswers: ["Spoofing"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    explanation:
      "**Spoofing** involves impersonating a legitimate identity or system. A fake patient portal imitates the real PulseBridge interface to steal credentials — a classic spoofing attack.",
  },

  // Q2.3 Open-Ended (b)
  {
    id: "ITSSA_W4_Q19",
    type: "open-ended",
    tags: ["DREAD", "damage potential", "risk ranking"],
    sectionLabel: "2.3(b)",
    text: "Which **DREAD** factor measures **attack severity**?",
    correctAnswers: ["Damage Potential"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    explanation:
      "**Damage Potential** scores the worst-case harm that could result if the threat were fully exploited — including data loss, patient harm, financial damage, and reputational consequences.",
  },

  // Q2.4 Show-Answer Scenario Analysis (15 Marks)
  {
    id: "ITSSA_W4_Q20",
    type: "show-answer",
    tags: [
      "STRIDE",
      "DREAD",
      "threat identification",
      "risk ranking",
      "threat prioritisation",
    ],
    sectionLabel: "2.4",
    text: "Using the PulseBridge scenario:\n\n1. Identify **ONE** example of each of the following from the reported incidents:\n   - Spoofing\n   - Tampering\n   - Repudiation\n   - Denial of Service\n   - Elevation of Privilege\n\n2. Rank **TWO** of these threats using severity, likelihood, and **DREAD** reasoning.\n\n3. Recommend which threat SMN should **prioritise first** and justify your answer.",
    correctAnswers: [
      {
        text:
          "**Threat Identification**\n\n" +
          "- **Spoofing:** A fake patient portal was discovered harvesting login credentials, impersonating the legitimate PulseBridge interface.\n" +
          "- **Tampering:** Unauthorised users modified medication dosage records, violating the integrity of critical medical data.\n" +
          "- **Repudiation:** Audit logs were mysteriously deleted, enabling attackers to deny evidence of malicious activity.\n" +
          "- **Denial of Service:** The emergency dispatch system became unavailable during peak operating hours, preventing legitimate access.\n" +
          "- **Elevation of Privilege:** Internal users accessed systems using manipulated administrator tokens beyond their authorised permissions.\n\n" +
          "**Threat Ranking**\n\n" +
          "*Medication Tampering* is critically severe because incorrect dosage administration can cause patient death. It is moderately likely given insider access possibilities and the absence of integrity validation controls. DREAD scoring:\n" +
          "- Damage Potential: 10 (patient fatality risk)\n" +
          "- Reproducibility: 8 (can be repeated by any authorised insider)\n" +
          "- Exploitability: 7 (requires insider access but minimal technical skill)\n" +
          "- Affected Users: 9 (all patients receiving medication)\n" +
          "- Discoverability: 6 (changes may go unnoticed without anomaly detection)\n\n" +
          "*Emergency Dispatch Denial of Service* is both severe and highly likely because healthcare systems are well-known ransomware and DoS targets. Unavailability of emergency coordination during an incident directly costs lives. DREAD scoring:\n" +
          "- Damage Potential: 10 (emergency response failure)\n" +
          "- Reproducibility: 9 (DoS attacks are readily repeatable)\n" +
          "- Exploitability: 8 (publicly accessible endpoints are easy targets)\n" +
          "- Affected Users: 10 (all patients requiring emergency services)\n" +
          "- Discoverability: 9 (well-known attack vector against healthcare)\n\n" +
          "**Priority Recommendation**\n\n" +
          "**Medication tampering** should receive highest priority because:\n" +
          "- It directly and silently threatens patient safety\n" +
          "- Modifications may remain undetected without active integrity monitoring\n" +
          "- The regulatory and legal consequences of a patient fatality are catastrophic\n" +
          "- It fundamentally undermines trust in the PulseBridge platform\n\n" +
          "Recommended mitigations include integrity validation on all dosage records, role-based access separation, immutable audit logging, and anomaly detection on medication-related data changes.\n\n" +
          "The Denial of Service threat against emergency dispatch should be addressed concurrently as a close second priority, given its life-critical operational impact.",
      },
    ],
    markingGuide:
      "| Criterion | Marks |\n|---|---|\n| Correctly identifies all five STRIDE examples from the scenario | 5 |\n| DREAD-based ranking of first threat with severity and likelihood reasoning | 3 |\n| DREAD-based ranking of second threat with severity and likelihood reasoning | 3 |\n| Justified priority recommendation using operational and ethical impact | 3 |\n| Technical precision and integration | 1 |\n| **Total** | **15** |\n\n**Common errors (cap at 10/15):**\n- Identifying STRIDE categories without linking them to specific PulseBridge incidents\n- Ranking threats on technical severity alone without operational or ethical reasoning\n- Recommending priority without multi-factor justification",
    points: 15,
  },

  // ── QUESTION 3 — Threat Mitigation Strategies (25 Marks) ────────────────────

  // Q3.1 Multiple Choice (a)
  {
    id: "ITSSA_W4_Q21",
    type: "multiple-choice",
    tags: ["threat mitigation", "deflection", "deception technology"],
    sectionLabel: "3.1(a)",
    text: "A cybersecurity team deploys deceptive decoy servers to lure attackers away from production systems. This is **BEST** classified as:",
    options: ["Detection", "Prevention", "Deflection", "Countermeasure"],
    correctAnswers: ["Deflection"],
    points: 2,
    explanation:
      "**Deflection** redirects attacker effort away from real assets using decoys — honeypots, fake servers, or deceptive credentials. It does not prevent the attack itself but misdirects it, protecting real systems while gathering attacker intelligence.",
  },

  // Q3.1 Multiple Choice (b)
  {
    id: "ITSSA_W4_Q22",
    type: "multiple-choice",
    tags: ["threat mitigation", "deterrence", "security strategy"],
    sectionLabel: "3.1(b)",
    text: "Which mitigation strategy focuses primarily on making attacks **'not worth the effort'**?",
    options: ["Detection", "Deterrence", "Preemption", "Countermeasure"],
    correctAnswers: ["Deterrence"],
    points: 2,
    explanation:
      "**Deterrence** raises the cost or risk of attacking to a point where the attacker concludes the effort is not worthwhile. Examples include public prosecution policies, strong legal penalties, and visible security signalling.",
  },

  // Q3.1 Multiple Choice (c)
  {
    id: "ITSSA_W4_Q23",
    type: "multiple-choice",
    tags: ["threat mitigation", "countermeasures", "active defence"],
    sectionLabel: "3.1(c)",
    text: "Which statement **BEST** describes countermeasures?",
    options: [
      "Passive observation after compromise",
      "Complete elimination of all vulnerabilities",
      "Detection followed by active reaction",
      "Purely legal deterrence mechanisms",
    ],
    correctAnswers: ["Detection followed by active reaction"],
    points: 2,
    explanation:
      "**Countermeasures** combine detection with automated or rapid defensive response — for example, isolating an infected system, blocking a suspicious IP, or locking a compromised account. Passive observation alone is detection, not countermeasure.",
  },

  // Q3.2 Fill-in-the-Blank (a)
  {
    id: "ITSSA_W4_Q24",
    type: "fill-in-the-blank",
    tags: ["threat mitigation", "detection", "intrusion detection"],
    sectionLabel: "3.2(a)",
    text: "The process of identifying suspicious activity **during or after** intrusion attempts is called ___.",
    blanks: [
      {
        id: "b1",
        options: ["Prevention", "Preemption", "Deflection", "Detection", "Deterrence"],
        correctAnswer: "Detection",
      },
    ],
  },

  // Q3.2 Fill-in-the-Blank (b)
  {
    id: "ITSSA_W4_Q25",
    type: "fill-in-the-blank",
    tags: ["threat mitigation", "deflection", "honeypots"],
    sectionLabel: "3.2(b)",
    text: "Creating fake assets to distract attackers is an example of ___.",
    blanks: [
      {
        id: "b1",
        options: [ "Deterrence", "Detection", "Deflection", "Prevention"],
        correctAnswer: "Deflection",
      },
    ],
  },

  // Q3.3 Open-Ended (a)
  {
    id: "ITSSA_W4_Q26",
    type: "open-ended",
    tags: ["threat mitigation", "preemption", "proactive security"],
    sectionLabel: "3.3(a)",
    text: "Which mitigation strategy attempts to **strike before** an attack occurs?",
    correctAnswers: ["Preemption"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    explanation:
      "**Preemption** involves taking offensive or anticipatory action before an attacker can launch their campaign — for example, disabling known malicious infrastructure or patching a zero-day before it is publicly weaponised.",
  },

  // Q3.3 Open-Ended (b)
  {
    id: "ITSSA_W4_Q27",
    type: "open-ended",
    tags: ["threat mitigation", "detection", "monitoring"],
    sectionLabel: "3.3(b)",
    text: "Which mitigation approach is most associated with **alarms and monitoring systems**?",
    correctAnswers: ["Detection"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    explanation:
      "**Detection** relies on surveillance, alerting, and monitoring to identify malicious activity in progress or after the fact. Alarms, SIEM systems, and anomaly-detection engines are all detection mechanisms.",
  },

  // Q3.4 Show-Answer Essay (14 Marks)
  {
    id: "ITSSA_W4_Q28",
    type: "show-answer",
    tags: [
      "threat mitigation",
      "prevention",
      "detection",
      "countermeasures",
      "integrated security",
    ],
    sectionLabel: "3.4",
    text: "SMN leadership is debating whether to prioritise **prevention systems**, **detection systems**, or **countermeasure systems** for national deployment.\n\nWrite a critical evaluation comparing all three strategies. Your answer must:\n- discuss the advantages and disadvantages of each,\n- explain why no single strategy is sufficient,\n- recommend an **integrated mitigation approach** for PulseBridge.",
    correctAnswers: [
      {
        text:
          "**Prevention**\n\n" +
          "Prevention reduces vulnerabilities and hardens systems before attacks occur. For PulseBridge, preventive controls include multi-factor authentication, data encryption, network segmentation, role-based access control, and staff security training.\n\n" +
          "*Advantage:* Reduces attack likelihood substantially and addresses threats before they materialise.\n" +
          "*Disadvantage:* No system can be fully hardened. Determined, well-resourced attackers — including insiders — may still circumvent preventive controls. In complex, interconnected healthcare environments, perfect prevention is unachievable.\n\n" +
          "**Detection**\n\n" +
          "Detection identifies malicious activity through logs, alerts, monitoring dashboards, and anomaly analysis. In PulseBridge, where attacks such as medication tampering and log deletion may remain hidden, detection is essential for visibility.\n\n" +
          "*Advantage:* Provides awareness of threats that have bypassed prevention. Enables rapid investigation and response initiation.\n" +
          "*Disadvantage:* Detection alone cannot stop an attack already in progress. If response mechanisms are too slow, significant damage may occur before intervention. Alert fatigue is also a real risk in high-volume healthcare environments.\n\n" +
          "**Countermeasures**\n\n" +
          "Countermeasures combine detection with automated or rapid defensive reaction — for example, isolating ransomware-infected scheduling servers, locking compromised administrator accounts, or deploying adaptive firewall rules.\n\n" +
          "*Advantage:* Reduces attack impact rapidly by containing active threats before they propagate.\n" +
          "*Disadvantage:* Automated countermeasures risk false positives. An over-eager lockdown of the emergency dispatch system — itself the target of a DoS attack — could cause operational disruption. Countermeasures must be carefully calibrated for life-critical healthcare contexts.\n\n" +
          "**Why No Single Strategy Is Sufficient**\n\n" +
          "PulseBridge operates across hospitals, mobile clinics, IoT streams, third-party laboratories, and insurance integrations. Each surface introduces distinct risks:\n" +
          "- External attackers require prevention and detection at the perimeter\n" +
          "- Insider threats require access controls, audit logging, and anomaly detection\n" +
          "- IoT devices require network segmentation and real-time monitoring\n" +
          "- Life-critical systems require carefully controlled countermeasures that avoid unintended service disruption\n\n" +
          "No single strategy addresses all of these simultaneously.\n\n" +
          "**Recommended Integrated Approach for PulseBridge**\n\n" +
          "- **Prevention** forms the foundation: MFA, encryption, least-privilege access, secure development practices, and staff awareness training\n" +
          "- **Detection** provides continuous visibility: SIEM integration, anomaly detection on medication records and audit logs, and real-time alerting\n" +
          "- **Deflection** protects high-value assets: honeypot servers to divert attackers from patient record systems\n" +
          "- **Countermeasures** contain active incidents: automated isolation of compromised subsystems, with manual override capability for life-critical services such as emergency dispatch\n" +
          "- **Organisational governance** reinforces all layers: incident response plans, regular penetration testing, and defined escalation procedures\n\n" +
          "Security effectiveness emerges from the integration of these layers — not from any single technology.",
      },
    ],
    markingGuide:
      "| Criterion | Marks |\n|---|---|\n| Explains prevention with advantages and disadvantages | 2 |\n| Explains detection with advantages and disadvantages | 2 |\n| Explains countermeasures with advantages and disadvantages | 2 |\n| Argues convincingly why no single strategy is sufficient | 3 |\n| Recommends a coherent integrated approach specific to PulseBridge | 3 |\n| Technical clarity and integration across strategies | 2 |\n| **Total** | **14** |\n\n**Common errors (cap at 9/14):**\n- Discussing strategies in isolation without comparing trade-offs\n- Failing to identify risks of countermeasures (false positives, life-critical disruption)\n- Generic integrated recommendation not grounded in the PulseBridge context",
    points: 14,
  },

  // ── QUESTION 4 — Comprehensive Applied Security Design (25 Marks) ────────────

  // Q4.1 Advanced MCQ
  {
    id: "ITSSA_W4_Q29",
    type: "multiple-choice",
    tags: ["trust boundaries", "IoT security", "threat modeling"],
    sectionLabel: "4.1",
    text: "Which situation **BEST** demonstrates a failure of trust-boundary management?",
    options: [
      "A doctor mistypes a password three times",
      "Internal medical systems directly trust unvalidated external IoT telemetry",
      "A server experiences high CPU usage during backups",
      "An employee forgets to log out of a workstation",
    ],
    correctAnswers: [
      "Internal medical systems directly trust unvalidated external IoT telemetry",
    ],
    points: 2,
    explanation:
      "A **trust boundary failure** occurs when a system accepts input from an external or lower-trust environment without validation. IoT devices stream from external, uncontrolled environments — accepting their data directly into internal medical systems without verification violates the trust boundary between those environments.",
    image: {
        src: "/images/ITSSA_W4_Q29.png",
        alt: "Trust-boundary security architecture diagram separating external healthcare entities from the secure internal hospital network through an API gateway.",
        caption: "Figure 2: Trust Boundary Architecture showing interactions between external systems and the secure internal hospital network."
        }
  },

  // Q4.2 Fill-in-the-Blank
  {
    id: "ITSSA_W4_Q30",
    type: "fill-in-the-blank",
    tags: ["threat modeling", "threat ranking", "risk prioritisation"],
    sectionLabel: "4.2",
    text: "A threat-modeling process that prioritises vulnerabilities based on severity and likelihood is performing threat ___.",
    blanks: [
      {
        id: "b1",
        options: ["ranking", "modeling", "scanning", "auditing"],
        correctAnswer: "ranking",
      },
    ],
  },

  // Q4.3 Open-Ended
  {
    id: "ITSSA_W4_Q31",
    type: "open-ended",
    tags: ["STRIDE", "information disclosure", "network security"],
    sectionLabel: "4.3",
    text: "Which **STRIDE** category is MOST closely associated with **exposure of plaintext network traffic**?",
    correctAnswers: ["Information Disclosure"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    explanation:
      "**Information Disclosure** covers any unauthorised exposure of confidential data. Transmitting sensitive patient information — such as biometric telemetry or medical records — in plaintext over a network exposes that data to anyone capable of intercepting the traffic.",
  },

  // Q4.4 Capstone Show-Answer Essay (20 Marks)
  {
    id: "ITSSA_W4_Q32",
    type: "show-answer",
    tags: [
      "threat modeling",
      "STRIDE",
      "DREAD",
      "DFD",
      "trust boundaries",
      "threat mitigation",
      "organisational security",
      "security architecture",
    ],
    sectionLabel: "4.4",
    text: "You have been appointed as the lead security architect for SMN.\n\nDevelop a **high-level threat-modeling and mitigation strategy** for the national expansion of PulseBridge.\n\nYour response **must** integrate:\n- DFD concepts and trust boundaries,\n- STRIDE analysis with scenario-specific examples,\n- DREAD prioritisation reasoning,\n- layered mitigation strategies,\n- organisational coordination,\n- and continuous security evaluation.",
    correctAnswers: [
      {
        text:
          "**Phase 1: Structured Threat Modeling Before Deployment**\n\n" +
          "The strategy begins with a dedicated threat-modeling exercise during the architectural phase of national expansion — not after deployment. An interdisciplinary team must be assembled including system architects, medical informaticians, network engineers, compliance specialists, and operational managers. Security cannot be treated as solely a technical responsibility.\n\n" +
          "**Phase 2: Data Flow Diagram Construction**\n\n" +
          "Comprehensive DFDs are produced for all PulseBridge data movement pathways:\n" +
          "- *External interactors:* patients (mobile app), doctors (remote access), laboratories (test result uploads), insurance partners (claim verification), IoT wearables (biometric streams)\n" +
          "- *Processors:* prescription validation, diagnostic routing, emergency dispatch coordination, insurance claim processing\n" +
          "- *Storage:* patient medical records, audit logs, wearable telemetry archives, hospital inventory databases\n" +
          "- *Trust boundaries:* between the public internet and internal hospital networks; between IoT device streams and clinical data systems; between third-party laboratory APIs and internal record storage\n\n" +
          "Each trust boundary is documented with the data types crossing it and the validation controls expected at that boundary.\n\n" +
          "**Phase 3: STRIDE Threat Analysis**\n\n" +
          "Applying STRIDE systematically across all DFD components:\n" +
          "- **Spoofing:** Fake patient portals impersonating PulseBridge; mitigated by certificate pinning, MFA, and phishing-resistant authentication\n" +
          "- **Tampering:** Unauthorised modification of medication dosage records; mitigated by integrity hashing, write-protected audit trails, and separation of duties\n" +
          "- **Repudiation:** Deletion of audit logs to conceal malicious actions; mitigated by centralised, immutable logging infrastructure with offsite replication\n" +
          "- **Information Disclosure:** Plaintext transmission of biometric telemetry; mitigated by end-to-end encryption and strict TLS enforcement across all interfaces\n" +
          "- **Denial of Service:** Emergency dispatch outage during peak hours; mitigated by load balancing, rate limiting, and dedicated availability guarantees for life-critical services\n" +
          "- **Elevation of Privilege:** Manipulated administrator tokens granting unauthorised access; mitigated by short-lived signed tokens, role separation, and regular access reviews\n\n" +
          "**Phase 4: DREAD Prioritisation**\n\n" +
          "Each identified threat is scored across Damage Potential, Reproducibility, Exploitability, Affected Users, and Discoverability. The scoring matrix drives resource allocation. Threats impacting patient safety — particularly medication tampering and emergency dispatch availability — receive highest priority because Damage Potential and Affected Users scores are maximal. Threats with high Discoverability but low Damage Potential are addressed in subsequent cycles.\n\n" +
          "**Phase 5: Layered Mitigation Strategy**\n\n" +
          "- *Prevention:* MFA for all clinical access, AES-256 encryption for data at rest and in transit, network segmentation isolating IoT streams from clinical systems, secure coding standards with mandatory code review\n" +
          "- *Detection:* SIEM integration with real-time alerting, anomaly detection on medication record modifications and administrator token usage, continuous monitoring of audit log integrity\n" +
          "- *Deflection:* Honeypot patient record systems to detect and divert lateral movement by internal or external attackers\n" +
          "- *Countermeasures:* Automated containment of ransomware-infected subsystems, account lockdown on suspicious token activity, with manual override capability for emergency services to prevent accidental denial\n" +
          "- *Deterrence:* Published incident response and prosecution policies, security awareness visible to potential insiders\n\n" +
          "**Phase 6: Organisational Coordination**\n\n" +
          "Healthcare security depends as much on people and processes as on technology. A national expansion requires:\n" +
          "- Security awareness training for all clinical and administrative staff\n" +
          "- Clear incident response playbooks with defined escalation chains\n" +
          "- Governance policies mandating least-privilege access and periodic access reviews\n" +
          "- Vendor management controls for third-party laboratory and insurance integrations\n\n" +
          "**Phase 7: Continuous Security Evaluation**\n\n" +
          "The threat landscape evolves continuously. PulseBridge's security architecture must evolve with it:\n" +
          "- Biannual penetration testing across all platform surfaces\n" +
          "- Quarterly threat-model reviews incorporating new incident intelligence\n" +
          "- Continuous vulnerability scanning and patch management\n" +
          "- Post-incident reviews feeding findings back into the threat model\n\n" +
          "The strongest security posture is not achieved through isolated controls but through a living, organisation-wide security architecture that integrates technical, procedural, and human defences into a continuously improving programme.",
      },
    ],
    markingGuide:
      "| Criterion | Marks |\n|---|---|\n| DFD concepts applied with specific PulseBridge components and trust boundaries | 3 |\n| STRIDE analysis covering all six categories with scenario-specific examples | 4 |\n| DREAD prioritisation with reasoning linked to patient safety and operational impact | 2 |\n| Layered mitigation strategy (prevention, detection, deflection, countermeasures) | 4 |\n| Organisational coordination (training, governance, incident response) | 3 |\n| Continuous security evaluation (penetration testing, reviews, monitoring) | 2 |\n| Integration and synthesis across all components into a coherent strategy | 2 |\n| **Total** | **20** |\n\n**Common errors (cap at 13/20):**\n- Treating STRIDE as a checklist without applying it to the specific scenario\n- Omitting organisational factors and treating security as purely technical\n- Describing mitigation layers independently without showing how they integrate\n- No discussion of continuous evaluation — static security posture is insufficient",
    points: 20,
    image: {
        src: "/images/ITSSA_W4_Q32.png",
        alt: "Security Operations Center dashboard displaying suspicious authentication events, audit log deletion alerts, and abnormal database activity in a healthcare environment.",
        caption: "Figure 5: SOC Monitoring Dashboard displaying security events, anomaly alerts, and incident-response indicators for PulseBridge."
        }
  },
];