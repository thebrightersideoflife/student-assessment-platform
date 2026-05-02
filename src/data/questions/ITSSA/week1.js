// src/data/questions/ITSSA/week1.js
// Software & Security Engineering — Week 1 Assessment
// Scenario: NexaTech Global Security Breach | Total: 50 Marks

export default [

  // ─────────────────────────────────────────────
  // SCENARIO BLOCK
  // ─────────────────────────────────────────────
  {
    id: "SCENARIO_ITSSA_W1",
    type: "scenario",
    title: "Question 1 – 2: Software & Security Engineering (50 Marks)",
    context: `NexaTech Global is a rapidly expanding multinational company that develops and distributes smart home devices. Due to its growth, the organisation relies heavily on interconnected systems across departments such as Research & Development, Manufacturing, Customer Support, and Cloud Services.

Recently, NexaTech experienced a **security incident** involving unauthorised access to customer data. Investigations revealed that:

• A vulnerability in a web application remained **unpatched for several months**
• Attackers gained access and **exfiltrated sensitive customer information**
• Internal monitoring systems failed to detect the breach early
• Some employees ignored basic **security protocols**
• The organisation lacked clear **security awareness training**

Following the breach, NexaTech hired cybersecurity professionals to strengthen system security, review organisational practices, assess attacker behaviour, and implement a more robust, layered security strategy.`,
  },

  // ─────────────────────────────────────────────
  // QUESTION 1 — Security Foundations in Practice [25 Marks]
  // ─────────────────────────────────────────────

  {
    id: "ITSSA_W1_Q1",
    type: "multiple-choice",
    sectionLabel: "1.1",
    text: "Which aspect of the CIA Triad is MOST directly compromised when attackers silently extract customer data over time without detection?",
    options: [
      "Integrity",
      "Availability",
      "Confidentiality",
      "Authenticity",
    ],
    correctAnswers: ["Confidentiality"],
    points: 3,
    explanation: "Confidentiality is compromised when unauthorized parties gain access to sensitive data (exfiltration), as happened with NexaTech's customer information.",
  },

  {
    id: "ITSSA_W1_Q2",
    type: "fill-in-the-blank",
    sectionLabel: "1.2",
    text: "An attack that prevents legitimate users from accessing systems or services is known as a ___ attack.",
    blanks: [
      {
        id: "b1",
        options: ["Man-in-the-middle", "Phishing", "Denial-of-service", "Brute-force"],
        correctAnswer: "Denial-of-service",
      },
    ],
    points: 2,
    explanation: "A DoS attack specifically aims to shut down a machine or network, making it inaccessible to its intended users.",
  },

  {
    id: "ITSSA_W1_Q3",
    type: "open-ended",
    sectionLabel: "1.3",
    text: "What term describes the *unauthorised exposure of private information*? (1–3 words)",
    correctAnswers: ["Disclosure attack", "Data disclosure", "Data breach"],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    explanation: "This term describes the incident where sensitive, protected, or confidential data is copied, transmitted, viewed, or stolen.",
  },

  {
    id: "ITSSA_W1_Q4",
    type: "multiple-choice",
    sectionLabel: "1.4",
    text: "Which of the following BEST explains why NexaTech's failure to patch vulnerabilities is significant?",
    options: [
      "It reduces system performance",
      "It increases system redundancy",
      "It exposes the system to known exploit paths",
      "It improves compatibility with legacy systems",
    ],
    correctAnswers: ["It exposes the system to known exploit paths"],
    points: 3,
    explanation: "Unpatched vulnerabilities are \"open doors\" that allow attackers to use documented methods (exploits) to gain unauthorized access.",
  },

  {
    id: "ITSSA_W1_Q5",
    type: "fill-in-the-blank",
    sectionLabel: "1.5",
    text: "The principle that ensures data remains accurate, complete, and unaltered is called ___.",
    blanks: [
      {
        id: "b1",
        options: ["Confidentiality", "Availability", "Authenticity", "Integrity"],
        correctAnswer: "Integrity",
      },
    ],
    points: 2,
    explanation: "Integrity is the pillar of the CIA triad focused on ensuring data has not been tampered with or altered by unauthorized parties.",
  },

  {
    id: "ITSSA_W1_Q6",
    type: "show-answer",
    sectionLabel: "1.6",
    text: `Analyse the NexaTech breach using the **CIA Triad**. Discuss how each component — Confidentiality, Integrity, and Availability — may have been impacted, even if not explicitly stated in the scenario.`,
    explanation: "This requires applying the CIA Triad to the scenario: Confidentiality was lost via exfiltration; Integrity is questionable due to system access; Availability is impacted by response downtime.",
    correctAnswers: [
      {
        text: `**Confidentiality**
Confidentiality is clearly compromised. Attackers gained unauthorised access to sensitive customer data and exfiltrated it over time — a classic **disclosure attack** in which private information is exposed without the data owner's consent. This is the most directly evidenced breach in the scenario.

**Integrity**
Although not explicitly stated, integrity is potentially compromised. Once attackers have system access, they may alter, corrupt, or plant false data. Even if no modification occurred, the **trustworthiness of all data in the system is now questionable**, which fundamentally undermines system reliability and any decisions made from that data.

**Availability**
Availability was not the direct target of the attack; however, indirect impacts are likely. System downtime during incident response, forensic investigation, and patching can disrupt legitimate user access to services. Furthermore, loss of public trust may reduce the perceived availability of reliable and accurate services.

**Conclusion**
The breach illustrates the **interdependence of the CIA Triad** — a failure in one dimension inevitably creates risk or uncertainty in the others. Effective security cannot address these in isolation.`,
      },
    ],
    markingGuide: `| Component | Marks |
|---|---|
| Confidentiality explained and applied to scenario | 3 |
| Integrity inferred and explained (implicit impact accepted) | 2 |
| Availability discussed (direct or indirect impact) | 2 |
| Integration insight connecting all three components | 1 |
| **Total** | **8** |

**Common errors:**
- Stating only what is explicitly mentioned (no inference = capped at 5/8)
- Confusing Integrity with Confidentiality
- Omitting Availability entirely`,
    points: 8,
  },

  {
    id: "ITSSA_W1_Q7",
    type: "multiple-choice",
    sectionLabel: "1.7",
    text: "Which security control would MOST directly help NexaTech detect the breach earlier?",
    options: [
      "Physical access locks",
      "Intrusion Detection System (IDS)",
      "Backup power supply",
      "Data classification policy",
    ],
    correctAnswers: ["Intrusion Detection System (IDS)"],
    points: 3,
    explanation: "An IDS specifically monitors network traffic and system activity for signs of malicious behavior or security breaches.",
  },

  {
    id: "ITSSA_W1_Q8",
    type: "open-ended",
    sectionLabel: "1.8",
    text: "What type of attack involves **modifying or destroying data**? (1–3 words)",
    correctAnswers: ["Alteration attack", "Integrity attack", "Data alteration"],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    explanation: "Attacks that target the \"Integrity\" of data specifically involve changing or deleting information to make it inaccurate or untrustworthy.",
  },

  // ─────────────────────────────────────────────
  // QUESTION 2 — Attackers, Ethics & Organisational Security [25 Marks]
  // ─────────────────────────────────────────────

  {
    id: "ITSSA_W1_Q9",
    type: "multiple-choice",
    sectionLabel: "2.1",
    text: "Based on the scenario, the attackers at NexaTech are BEST classified as:",
    options: [
      "White hat hackers",
      "Grey hat hackers",
      "Black hat hackers",
      "Ethical testers",
    ],
    correctAnswers: ["Black hat hackers"],
    points: 3,
    explanation: "Black hat hackers are defined by their malicious intent and lack of authorization to access or steal data.",
  },

  {
    id: "ITSSA_W1_Q10",
    type: "fill-in-the-blank",
    sectionLabel: "2.2",
    text: "Hackers who operate between ethical and unethical boundaries are known as ___ hat hackers.",
    blanks: [
      {
        id: "b1",
        options: [ "Red", "White", "Black", "Grey"],
        correctAnswer: "Grey",
      },
    ],
    points: 2,
    explanation: "Grey hat hackers may violate laws or ethical standards but do not usually have the same malicious intent as black hats.",
  },

  {
    id: "ITSSA_W1_Q11",
    type: "multiple-choice",
    sectionLabel: "2.3",
    text: "Which of the following BEST illustrates the *attacker's advantage*?",
    options: [
      "Defenders can choose the timing of an attack",
      "Attackers must follow legal procedures before exploiting systems",
      "Attackers can exploit the weakest point in a system",
      "Defenders only need to secure critical assets",
    ],
    correctAnswers: ["Attackers can exploit the weakest point in a system"],
    points: 3,
    explanation: "Defenders must protect the entire perimeter, whereas an attacker only needs to find and exploit a single vulnerability to succeed.",
  },

  {
    id: "ITSSA_W1_Q12",
    type: "open-ended",
    sectionLabel: "2.4",
    text: "What is the term for a **less-skilled attacker who uses pre-built tools** rather than writing their own? (1–3 words)",
    correctAnswers: ["Script kiddie", "script kiddie"],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    explanation: "This is a derogatory term for amateur hackers who use existing scripts or programs to launch attacks because they lack the skill to write their own.",
  },

  {
    id: "ITSSA_W1_Q13",
    type: "fill-in-the-blank",
    sectionLabel: "2.5",
    text: "The process of verifying data integrity using a computed value derived from the data itself is called ___.",
    blanks: [
      {
        id: "b1",
        options: ["Hashing", "Encryption", "Tokenisation", "Salting"],
        correctAnswer: "Hashing",
      },
    ],
    points: 2,
    explanation: "Hashing creates a fixed-size string (checksum) from data; if the data changes, the hash changes, allowing for integrity verification.",
  },

  {
    id: "ITSSA_W1_Q14",
    type: "show-answer",
    sectionLabel: "2.6",
    text: `Critically evaluate NexaTech's organisational security failures, focusing on **people, processes, and technology**. Propose concrete improvements grounded in security principles for each area.`,
    explanation: "Success requires addressing People (training), Processes (patch management), and Technology (monitoring tools like SIEM).",
    correctAnswers: [
      {
        text: `**People**
Employees ignored security protocols, which indicates insufficient awareness training and a weak security culture. Human error remains one of the most exploited vectors in real-world breaches — attackers rely on it precisely because technical defences cannot compensate for uninformed behaviour.

*Improvement:* Implement continuous, role-specific security awareness programmes. Enforce accountability through clear policies, and promote a security-first culture where reporting concerns is encouraged rather than penalised.

**Processes**
Two major process failures are evident. First, the unpatched vulnerability indicates an absent or ineffective **patch management lifecycle** — vulnerabilities are only dangerous when unaddressed. Second, the failure to detect the breach early signals inadequate **monitoring and incident response procedures**.

*Improvements:*
- Establish a formal patch management policy with defined timelines for critical, high, and medium vulnerabilities
- Implement an incident response plan (IRP) with clear escalation paths
- Conduct regular security audits and vulnerability assessments

**Technology**
The absence of effective monitoring tools allowed attackers to remain in the system undetected. This is a foundational gap — reactive security without visibility cannot protect an organisation of NexaTech's scale.

*Improvement:* Deploy IDS/IPS systems to detect anomalous activity in real time. Implement centralised logging, SIEM tools, and automated alerting for unusual access patterns.

**Integration Insight**
Security must be **multilayered**. No single control is sufficient — a strong firewall cannot compensate for an untrained employee, and awareness training cannot substitute for technical monitoring. Effective organisational security requires all three pillars to operate in concert.`,
      },
    ],
    markingGuide: `| Component | Marks |
|---|---|
| People: failure identified + actionable improvement | 2 |
| Process: both failures identified + specific solutions | 3 |
| Technology: failure identified + specific improvement | 2 |
| Integration insight (multilayered security concept) | 1 |
| **Total** | **8** |

**Common errors:**
- Listing failures without proposing solutions (capped at 4/8)
- Vague improvements such as "improve security" without specifics
- Treating people and processes as the same failure category`,
    points: 8,
  },

  {
    id: "ITSSA_W1_Q15",
    type: "multiple-choice",
    sectionLabel: "2.7",
    text: "Which of the following is a *direct consequence* of the NexaTech breach?",
    options: [
      "Improved system performance",
      "Increased customer trust",
      "Reputational damage",
      "Reduced operational costs",
    ],
    correctAnswers: ["Reputational damage"],
    points: 3,
    explanation: "Data breaches involving customer information typically lead to a loss of public trust and negative brand perception.",
  },

  {
    id: "ITSSA_W1_Q16",
    type: "show-answer",
    sectionLabel: "2.8",
    text: `Explain why **security is considered a "multilayered system"** in modern organisations.`,
    explanation: "Using multiple layers (physical, technical, administrative) ensures that if one security control fails, others are in place to stop the threat.",
    correctAnswers: [
      {
        text: `Security is considered multilayered because threats can target different components of an organisation simultaneously — including hardware, software, networks, and people. No single control can protect against every attack vector.

Effective security requires **multiple overlapping controls** spanning physical, technical, and administrative domains. This ensures that if one layer is compromised or bypassed, additional controls remain in place to detect, contain, or limit the damage. This principle is often referred to as **defence in depth**.`,
      },
    ],
    markingGuide: `| Criteria | Marks |
|---|---|
| Mentions that threats target multiple components (hardware, software, people, etc.) | 1 |
| Explains that overlapping/layered controls prevent single-point failure | 1 |
| **Total** | **2** |`,
    points: 2,
  },

];