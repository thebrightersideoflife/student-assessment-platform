// ITNSA — Week 3
// Sections: 2.1 Hacker Motivations | 2.2 Hacking Stages | 2.3 IT Infrastructure Threats |
//           2.4 Types of Attacks | 2.5 Defense in Depth | 2.6 Risk Assessment | 2.7 Firewall Selection
export default [
  // ========================================
  // Section 2.1: Hacker Motivations & Targets (3 questions)
  // ========================================
  {
    id: "ITNSA_W3_Q1",
    type: "multiple-choice",
    text: "Which of the following best synthesizes the primary strategic motivation behind a cybercriminal selecting an outdated Content Management System (CMS) as their initial bridgehead, rather than directly attacking the datacenter?",
    options: [
      "The CMS inherently stores higher-value data than the datacenter.",
      "The datacenter relies on user credentials, which are only stored in the CMS.",
      "The CMS provides a vulnerable, less-guarded entry point to establish a foothold for subsequent lateral movement toward the datacenter.",
      "Social engineering is ineffective against datacenter administrators."
    ],
    correctAnswers: ["The CMS provides a vulnerable, less-guarded entry point to establish a foothold for subsequent lateral movement toward the datacenter."],
    points: 4
  },
  {
    id: "ITNSA_W3_Q2",
    type: "open-ended",
    text: "In the context of \"white-hat\" operations, what specific type of assessment involves authorized hackers attempting to exploit system vulnerabilities to improve organizational security?",
    correctAnswers: ["Penetration Testing", "Ethical Hacking", "Penetration Testing (Ethical Hacking)"],
    points: 4,
    validationOptions: {
      caseSensitive: false,
      allowPartialMatch: false
    }
  },
  {
    id: "ITNSA_W3_Q3",
    type: "show-answer",
    text: "Analyze the shift in hacker targeting strategies from traditional endpoint infection (via phishing) to web application exploitation. Why do modern hackers often favor web apps as their initial bridgehead?",
    correctAnswers: [
      "Hackers increasingly target web apps to bypass the human element (social engineering/phishing), which can be unpredictable, and to avoid the heavy security layers (SPAM filters, endpoint antivirus) typically guarding users. Web apps provide a direct, often less-shielded foothold closer to the ultimate target: the datacenter."
    ],
    points: 10
  },

  // ========================================
  // Section 2.2: Stages of the Hacking Process (4 questions)
  // ========================================
  {
    id: "ITNSA_W3_Q4",
    type: "multiple-choice",
    text: "During which specific stage of the hacking methodology would an adversary most likely employ tools like Nmap and OpenVAS in tandem to transition from passive intelligence gathering to active vulnerability identification?",
    options: [
      "Reconnaissance",
      "Scanning",
      "Enumeration",
      "Covering Tracks"
    ],
    correctAnswers: ["Scanning"],
    points: 4
  },
  {
    id: "ITNSA_W3_Q5",
    type: "open-ended",
    text: "What specific term describes the hacking phase where an attacker installs rootkits or backdoors to ensure persistent, undetected access after an initial breach?",
    correctAnswers: ["Maintaining Access"],
    points: 4,
    validationOptions: {
      requiredTerms: ["maintaining", "access"],
      caseSensitive: false,
      allowPartialMatch: false
    }
  },
  {
    id: "ITNSA_W3_Q6",
    type: "show-answer",
    text: "Evaluate the critical difference between the \"Reconnaissance\" and \"Scanning\" stages in the hacking lifecycle. How does the attacker's interaction with the target's infrastructure change between these two phases?",
    correctAnswers: [
      "Reconnaissance is largely passive, involving gathering intelligence from public records, social media, and company websites without directly engaging the target's core systems. Scanning is active; the attacker directly probes the target's network using tools to identify open ports, map network structure, and detect specific vulnerabilities, thereby actively increasing their risk of detection by security systems."
    ],
    points: 10
  },
  {
    id: "ITNSA_W3_Q7",
    type: "multiple-choice",
    text: "If an ethical hacker is altering system logs and modifying file timestamps to simulate a stealthy adversary, which stage of the hacking process are they currently executing?",
    options: [
      "Privilege Escalation",
      "Enumeration",
      "Covering Tracks",
      "Maintaining Access"
    ],
    correctAnswers: ["Covering Tracks"],
    points: 4
  },

  // ========================================
  // Section 2.3: IT Infrastructure Threats (4 questions)
  // ========================================
  {
    id: "ITNSA_W3_Q8",
    type: "multiple-choice",
    text: "An intrusion prevention system (IPS) detects an anomaly where a compromised endpoint is attempting to communicate with an external server to download additional malware payloads and receive execution instructions. What specific threat infrastructure is the IPS attempting to block?",
    options: [
      "A Command-and-Control (C2) channel",
      "A Distributed Hash Table (DHT)",
      "An ARP poisoning broadcast",
      "A legitimate BGP routing update"
    ],
    correctAnswers: ["A Command-and-Control (C2) channel"],
    points: 4
  },
  {
    id: "ITNSA_W3_Q9",
    type: "open-ended",
    text: "What specific category of malware is primarily used by adversaries to extort businesses by encrypting critical data after exploiting Remote Desktop Protocol (RDP) vulnerabilities?",
    correctAnswers: ["Ransomware"],
    points: 4,
    validationOptions: {
      caseSensitive: false,
      allowPartialMatch: false
    }
  },
  {
    id: "ITNSA_W3_Q10",
    type: "show-answer",
    text: "In the context of network availability, analyze how a resource depletion attack specifically compromises a Wireless Sensor Network (WSN). Why are these specific networks highly susceptible to this threat compared to traditional enterprise LANs?",
    correctAnswers: [
      "A resource depletion attack aims to exhaust the limited battery life, bandwidth, and computing memory of sensor nodes, leading to a permanent node outage. WSNs are highly susceptible because their nodes inherently possess limited energy, processing power, and storage, lacking the robust, continuous power and high-capacity infrastructure of traditional enterprise LANs."
    ],
    points: 10
  },
  {
    id: "ITNSA_W3_Q11",
    type: "multiple-choice",
    text: "Which of the following malware threats is characterized by its ability to silently observe network traffic, capture clear-text passwords, and facilitate active eavesdropping without altering the transmitted data?",
    options: [
      "Ransomware",
      "Packet Sniffer",
      "Fileless Malware",
      "Polymorphic Virus"
    ],
    correctAnswers: ["Packet Sniffer"],
    points: 4
  },

  // ========================================
  // Section 2.4: Types of Attacks (4 questions)
  // ========================================
  {
    id: "ITNSA_W3_Q12",
    type: "multiple-choice",
    text: "An attacker executes an active session hijacking exploit by injecting malicious scripts into a web page, bypassing the need to passively sniff the network. Which specific vulnerability is the attacker exploiting to steal the session ID?",
    options: [
      "ARP Spoofing",
      "Cross-Site Scripting (XSS)",
      "SQL Injection",
      "Session Fixation"
    ],
    correctAnswers: ["Cross-Site Scripting (XSS)"],
    points: 4
  },
  {
    id: "ITNSA_W3_Q13",
    type: "open-ended",
    text: "In a Distributed Denial of Service (DDoS) attack, what term refers to the network of compromised computers coordinated by the attacker to flood the target with traffic?",
    correctAnswers: ["Botnet"],
    points: 4,
    validationOptions: {
      caseSensitive: false,
      allowPartialMatch: false
    }
  },
  {
    id: "ITNSA_W3_Q14",
    type: "show-answer",
    text: "Contrast a Man-in-the-Middle (MitM) attack with a standard passive eavesdropping attack. How does the attacker's capability and level of interaction with the data differ between the two?",
    correctAnswers: [
      "In passive eavesdropping, the attacker merely intercepts and monitors data in transit to steal sensitive information without altering it. In a MitM attack, the attacker acts actively by inserting themselves between two communicating parties, not only intercepting the traffic but possessing the capability to alter, modify, or inject malicious data into the communication stream before passing it along."
    ],
    points: 10
  },
  {
    id: "ITNSA_W3_Q15",
    type: "multiple-choice",
    text: "A threat actor floods a Cisco IOS router with an overwhelming number of EIGRP neighbor announcements, causing the router's CPU to max out and drop legitimate routing updates. Which category of attack does this best represent?",
    options: [
      "Protocol-based Denial of Service (DoS) attack",
      "Distributed Denial of Service (DDoS) Reflected attack",
      "Man-in-the-Middle Routing Hijack",
      "Peer-to-Peer Smurf Attack"
    ],
    correctAnswers: ["Protocol-based Denial of Service (DoS) attack"],
    points: 4
  },

  // ========================================
  // Section 2.5: Defense in Depth & Scalability (4 questions)
  // ========================================
  {
    id: "ITNSA_W3_Q16",
    type: "multiple-choice",
    text: "When designing a highly scalable and resilient enterprise network, an architect implements BGP for external WAN routing and OSPF for internal LAN routing, alongside redundant multilayer switches. How does this routing protocol selection directly support defense in depth and scalability?",
    options: [
      "BGP prevents internal DDoS attacks, while OSPF encrypts LAN traffic.",
      "BGP manages complex, redundant internet connections (Autonomous Systems), while OSPF dynamically calculates the shortest internal paths and only sends updates when network changes occur, minimizing overhead.",
      "BGP acts as a stateful firewall, and OSPF operates at the Physical layer to prevent MAC spoofing.",
      "BGP dynamically assigns IPv6 addresses, while OSPF performs NAT."
    ],
    correctAnswers: ["BGP manages complex, redundant internet connections (Autonomous Systems), while OSPF dynamically calculates the shortest internal paths and only sends updates when network changes occur, minimizing overhead."],
    points: 4
  },
  {
    id: "ITNSA_W3_Q17",
    type: "open-ended",
    text: "What architectural principle relies on employing multiple, overlapping layers of security controls so that if one layer fails, others continue to protect the network?",
    correctAnswers: ["Defense in Depth"],
    points: 4,
    validationOptions: {
      requiredTerms: ["defense", "depth"],
      caseSensitive: false,
      allowPartialMatch: false
    }
  },
  {
    id: "ITNSA_W3_Q18",
    type: "show-answer",
    text: "Analyze the role of subnetting and VLANs in a defense-in-depth network architecture. How do these segmentation techniques limit the blast radius of a successful internal breach?",
    correctAnswers: [
      "Subnetting divides a larger network into isolated, smaller logical segments. By routing traffic between these segments through firewalls or multilayer switches with access controls, administrators can enforce strict communication rules. If an attacker breaches one subnet, their lateral movement is restricted, containing the 'blast radius' to that specific segment rather than exposing the entire enterprise."
    ],
    points: 10
  },
  {
    id: "ITNSA_W3_Q19",
    type: "multiple-choice",
    text: "In evaluating network topologies for a scalable core infrastructure, why is a fully meshed topology generally restricted to WAN backbones rather than deployed across enterprise LAN endpoints?",
    options: [
      "Fully meshed topologies require token ring protocols, which are obsolete.",
      "The required number of physical connections grows exponentially, making it financially and physically unscalable for numerous LAN endpoints.",
      "Mesh topologies cannot support IPv6 addressing.",
      "Switches in a mesh topology cannot process MAC addresses effectively."
    ],
    correctAnswers: ["The required number of physical connections grows exponentially, making it financially and physically unscalable for numerous LAN endpoints."],
    points: 4
  },

  // ========================================
  // Section 2.6: Risk Assessment & Management (4 questions)
  // ========================================
  {
    id: "ITNSA_W3_Q20",
    type: "multiple-choice",
    text: "An organization identifies a critical risk where an unpatched web server could be exploited via SQL injection. The cost of upgrading the legacy application is prohibitively high, so management decides to purchase cyber insurance to cover potential fines and settlement costs in the event of a breach. Which risk treatment strategy did the organization employ?",
    options: [
      "Avoid",
      "Mitigate",
      "Transfer",
      "Accept"
    ],
    correctAnswers: ["Transfer"],
    points: 4
  },
  {
    id: "ITNSA_W3_Q21",
    type: "open-ended",
    text: "In the risk analysis phase, what term describes the probability that a specific threat is capable of exploiting a given vulnerability?",
    correctAnswers: ["Likelihood"],
    points: 4,
    validationOptions: {
      caseSensitive: false,
      allowPartialMatch: false
    }
  },
  {
    id: "ITNSA_W3_Q22",
    type: "show-answer",
    text: "During a cybersecurity risk assessment, why is it critical to explicitly define the \"scope\" of the assessment before identifying threats and vulnerabilities? What are the consequences of a poorly defined scope?",
    correctAnswers: [
      "Defining the scope determines exactly which business units, locations, or specific assets are being evaluated, requiring stakeholder support to prioritize critical elements. A poorly defined scope can lead to an unmanageable assessment, wasted resources on low-priority systems, and the failure to identify critical vulnerabilities in the organization's most essential processes."
    ],
    points: 10
  },
  {
    id: "ITNSA_W3_Q23",
    type: "multiple-choice",
    text: "When determining the potential impact of a risk scenario (e.g., customer data theft), which of the following represents an intangible cost that is notoriously difficult to transfer via third-party cyber insurance?",
    options: [
      "Regulatory fines",
      "Legal settlement funding",
      "Damage to brand reputation",
      "Hardware replacement costs"
    ],
    correctAnswers: ["Damage to brand reputation"],
    points: 4
  },

  // ========================================
  // Section 2.7: Firewall Selection (2 questions)
  // ========================================
  {
    id: "ITNSA_W3_Q24",
    type: "multiple-choice",
    text: "A financial institution requires a firewall solution that goes beyond analyzing standard port numbers and IP addresses. They need to analyze actual packet content, perform TCP handshake checks, and actively detect advanced malware threats. Which type of firewall is strictly required for this specific use case?",
    options: [
      "Packet filtering firewall",
      "Stateful inspection firewall",
      "Next-generation firewall",
      "Passive Intrusion Detection System (IDS)"
    ],
    correctAnswers: ["Next-generation firewall"],
    points: 4
  },
  {
    id: "ITNSA_W3_Q25",
    type: "show-answer",
    text: "Compare and contrast a \"packet filtering\" firewall with a \"stateful inspection\" firewall. Why would a network administrator choose stateful inspection over packet filtering for securing a dynamic internal corporate network?",
    correctAnswers: [
      "A packet filtering firewall operates as a basic checkpoint at the network layer, analyzing individual packets strictly based on static rules like IP address, port number, or protocol. A stateful inspection firewall is more advanced; it operates at both the network and transport layers, actively inspecting the source IP, destination IP, source port, and destination port. Administrators prefer stateful inspection because it dynamically understands the context of traffic flows, offering significantly higher defenses than static packet filtering."
    ],
    points: 10
  }
];