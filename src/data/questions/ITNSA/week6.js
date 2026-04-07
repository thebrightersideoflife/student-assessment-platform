// src/data/questions/ITNSA/week6.js
// Advanced Network & Security Architecture — Week 6 Assessment
// Total Marks: 40 | Time Allocation: 60 Minutes

export default [

  // ─────────────────────────────────────────────
  // QUESTION 1: Global VPN Architecture & Scaling
  // ─────────────────────────────────────────────

  {
    id: "SCENARIO_ITNSA_W6_Q1",
    type: "scenario",
    title: "Question 1: Global VPN Architecture & Scaling Strategy (15 Marks)",
    context: `A rapidly scaling software engineering firm is redesigning its network topology. They require a dedicated connection between their primary data center and a newly established remote development hub. The core network engineering team insists on retaining granular control over their own routing policies and maintaining the absolute privacy of their internal network topology.\n\nAdditionally, the firm is deploying a fleet of 500 remote developers who require secure, low-overhead access to the central network from various operating systems (Linux, macOS, Windows). Finally, the firm recently acquired a partner company with an overlapping 10.*.*.* IP address scheme and needs to establish a dynamic VPN connection without causing IP collisions.`,
  },

  {
    id: "ITNSA_W6_Q1_1A",
    type: "show-answer",
    sectionLabel: "1.1",
    text: "Recommend whether an L2VPN or L3VPN is more appropriate for the inter-office connection between the data center and the development hub. Provide two specific justifications based on the scenario. (4 Marks)",
    correctAnswers: [
      "An L2VPN (Layer 2 VPN) is the correct recommendation for the inter-office connection. Justification 1: L2VPN allows the firm to retain full, granular control over its own routing policies (e.g., running OSPF or BGP across the link), as the customer manages the IP layer entirely — unlike L3VPN where the service provider participates in routing. Justification 2: L2VPN ensures the privacy of the internal network topology, because the service provider's core infrastructure remains invisible to the firm and the provider does not need visibility into the firm's private address structure."
    ],
    markingGuide: "Award 1 mark for correctly recommending L2VPN. Award 1 mark for the justification that L2VPN allows the customer to manage their own routing/policies. Award 1 mark for the justification that L2VPN preserves topology privacy from the service provider. Award 1 mark for linking justifications explicitly to the scenario constraints (routing control + privacy requirement).",
    points: 4,
  },

  {
    id: "ITNSA_W6_Q1_1B",
    type: "show-answer",
    sectionLabel: "1.2",
    text: "Recommend between a Software-based or Hardware-based VPN solution for the 500 remote developers. Provide two justifications supporting this choice. (4 Marks)",
    correctAnswers: [
      "A Software-based VPN is the correct recommendation for the remote developer fleet. Justification 1: Software VPNs (e.g., OpenVPN, Cisco AnyConnect) install directly on existing endpoints — Linux, macOS, and Windows — requiring no additional hardware. This makes deployment across a heterogeneous, geographically distributed fleet of 500 developers significantly faster and more cost-effective. Justification 2: Software VPNs have considerably lower administration overhead; updates can be pushed via MDM (Mobile Device Management) tools without any physical maintenance. A Hardware VPN would require procuring, shipping, and physically maintaining 500 separate appliances, which is operationally impractical."
    ],
    markingGuide: "Award 1 mark for correctly recommending a Software-based VPN. Award 1 mark for the justification around cross-platform compatibility / heterogeneous OS support (Linux, macOS, Windows must be referenced). Award 1 mark for the justification around reduced cost and lower operational/administration overhead compared to hardware appliances. Award 1 mark for contextualising the answer to the scale of 500 developers.",
    points: 4,
  },

  {
    id: "ITNSA_W6_Q1_1C",
    type: "show-answer",
    sectionLabel: "1.3",
    text: "Explain the specific type of VPN Network Address Translation (NAT) required to solve the overlapping IP issue with the partner company. Contrast this with conventional NAT, explaining why conventional NAT fails in VPN environments. (7 Marks)",
    correctAnswers: [
      "The firm must implement VPN NAT (also referred to as Policy NAT or NAT for VPNs), specifically configured to prevent IP address conflicts. This allows local addresses to be translated into addresses that are compatible with the partner's overlapping 10.*.*.* scheme before the VPN tunnel is used, resolving the collision. Conventional NAT (Source NAT/PAT) translates many private IP addresses into a single public IP address to conserve address space. However, conventional NAT fails in IPsec VPN environments because it modifies the IP headers after the IPsec Security Associations (SAs) have been negotiated and after the Authentication Header (AH) or Encapsulating Security Payload (ESP) has signed or encrypted the packet — causing an integrity check failure and dropping the connection. VPN NAT resolves this by performing address translation before the IKE phase negotiates the Security Association and before IPsec encryption is applied, so the cryptographic integrity of the packet is maintained throughout the tunnel."
    ],
    markingGuide: "Award 1 mark for correctly naming the solution as VPN NAT / Policy NAT. Award 1 mark for explaining that translation occurs before IPsec/IKE SA negotiation. Award 2 marks for explaining what conventional NAT does (private-to-public translation) and why it is insufficient here. Award 2 marks for explaining the specific failure mechanism — that NAT modifies IP headers after AH/ESP has signed them, causing an integrity check failure. Award 1 mark for explicitly linking the solution back to the overlapping 10.*.*.* scenario.",
    diagram: {
      type: "mermaid",
      code: `graph LR
  subgraph FirmA["Firm A (10.0.0.0/24)"]
    A[Dev Host]
  end
  subgraph Tunnel["VPN Tunnel"]
    T["VPN NAT Mapping\n(occurs BEFORE IPsec SA)"]
  end
  subgraph PartnerB["Partner B (10.0.0.0/24)"]
    B[Target Server]
  end
  A -->|"Internal Traffic\n10.0.0.x"| T
  T -->|"Translated to\n172.16.0.x"| B`,
    },
    points: 7,
  },

  // ─────────────────────────────────────────────
  // QUESTION 2: Penetration Testing & Covert Channels
  // ─────────────────────────────────────────────

  {
    id: "SCENARIO_ITNSA_W6_Q2",
    type: "scenario",
    title: "Question 2: Penetration Testing & Covert Channel Analysis (15 Marks)",
    context: `You are the lead security auditor for a financial institution. During a recent rigorous security audit of the Demilitarized Zone (DMZ), the incident response team suspects that advanced persistent threats (APTs) might have bypassed the Next-Generation Firewall (NGFW) using covert communication channels, allowing them to exfiltrate data from a supposedly secure internal zone.`,
  },

  {
    id: "ITNSA_W6_Q2_2A",
    type: "show-answer",
    sectionLabel: "2.1",
    text: "Drawing on historical cyber incidents, explain how an attacker could utilize DNS Tunneling to extract sensitive data past the firewall without being detected by traditional security controls. (5 Marks)",
    correctAnswers: [
      "Attackers can establish a covert channel using DNS Tunneling — a method notably used by sophisticated APT groups such as the Carbanak gang. The attacker begins by compromising an internal host and registering an external authoritative DNS server under their control. Sensitive data (e.g., credentials, card numbers) is then encoded and encapsulated inside standard DNS query strings, such as queries for subdomains like 'exfiltrateddata.attacker-domain.com'. Because firewalls universally permit outbound DNS traffic on UDP Port 53 to resolve domain names, this malicious traffic appears as legitimate DNS protocol traffic. Traditional network security devices and intrusion detection systems do not inspect DNS payload content, allowing the attacker's authoritative nameserver to receive the queries and de-encapsulate the stolen data on the other side of the firewall."
    ],
    markingGuide: "Award 1 mark for correctly identifying DNS Tunneling as a covert channel technique. Award 1 mark for mentioning that DNS traffic is permitted through firewalls (Port 53 UDP). Award 1 mark for explaining the encapsulation mechanism — data is encoded inside DNS query strings. Award 1 mark for explaining why it bypasses detection — DNS traffic is not inspected by traditional security devices. Award 1 mark for contextualising with a real-world example or the concept of an attacker-controlled authoritative nameserver.",
    points: 5,
  },

  {
    id: "ITNSA_W6_Q2_2B",
    type: "show-answer",
    sectionLabel: "2.2",
    text: "As the lead auditor, you must execute the 13-step firewall testing methodology to verify the firewall's resilience. Detail your approach and the expected outcomes for Step 4 (Acquisition of Banners), Step 8 (Firewalking), and Step 9 (Inspection of Port Redirection). (10 Marks)",
    correctAnswers: [
      "Step 4 — Acquisition of Banners (Banner Grabbing): The auditor uses a tool such as Netcat or Telnet to craft deliberate connection requests to open ports on the firewall and connected services. The objective is to retrieve the service banner that is returned. The expected outcome is the disclosure of the firewall's operating system version, software version, and vendor identity (e.g., 'Cisco Adaptive Security Appliance Software v9.1'). This information is critical because it allows the auditor — and by extension an attacker — to map identified versions against known CVEs and available exploits in public vulnerability databases.\n\nStep 8 — Firewalking: The auditor uses the Firewalk network auditing tool, which applies traceroute-style TTL (Time To Live) manipulation. Packets are crafted with a TTL value set to exactly one hop beyond the firewall. If a port is open and the packet passes through, an 'ICMP Time Exceeded' message is returned from the next hop. If the firewall drops the packet, no response is received. The expected outcome is a complete map of which ports and protocols are permitted to traverse the firewall's ACLs (Access Control Lists), effectively revealing the topology of devices sitting behind it.\n\nStep 9 — Inspection of Port Redirection: The auditor tests whether a blocked port can be bypassed by exploiting port redirection on a compromised internal machine. Using a tool such as Fpipe, the auditor configures a listener on an allowed port (e.g., Port 53, which the firewall permits for DNS) and redirects that traffic internally to a restricted port (e.g., Port 80). The expected outcome demonstrates that the firewall's security policy can be circumvented — traffic that should be blocked reaches its destination by 'tunnelling' through a permitted port, exposing a gap in the firewall's enforcement logic."
    ],
    markingGuide: "Step 4 — Award 2 marks: 1 mark for the method (Netcat/Telnet to open ports), 1 mark for the outcome (version/OS disclosure enabling CVE identification). Step 8 — Award 4 marks: 1 mark for naming the Firewalk tool, 1 mark for explaining TTL manipulation, 1 mark for explaining ICMP Time Exceeded analysis, 1 mark for the outcome (mapping open ports / ACL enumeration). Step 9 — Award 4 marks: 1 mark for naming Fpipe or equivalent tool, 1 mark for explaining the listener setup on an allowed port, 1 mark for explaining the redirection to a blocked port, 1 mark for the outcome (demonstrating firewall bypass of a restricted port).",
    points: 10,
  },

  // ─────────────────────────────────────────────
  // QUESTION 3: Secure Remote Administration & Endpoint Defence
  // ─────────────────────────────────────────────

  {
    id: "SCENARIO_ITNSA_W6_Q3",
    type: "scenario",
    title: "Question 3: Secure Remote Administration & Endpoint Defense (10 Marks)",
    context: `A senior systems administrator needs to perform critical maintenance on a remote Windows Server from a non-Windows device over an untrusted public Wi-Fi network. The company's security policy mandates strict endpoint protection and robust authentication.`,
  },

  {
    id: "ITNSA_W6_Q3_3A",
    type: "show-answer",
    sectionLabel: "3.1",
    text: "Evaluate the fundamental differences between using Secure Shell (SSH) and the Remote Desktop Protocol (RDP) for this administrative task, focusing specifically on how each protocol handles the user interface and establishes secure authentication. (6 Marks)",
    correctAnswers: [
      "User Interface: SSH is a command-line interface (CLI) protocol. It is lightweight, low-bandwidth, and designed for executing commands and transferring data via a terminal. It does not stream graphical output. RDP, conversely, provides a full graphical user interface (GUI) that pixel-streams the entire desktop of the remote device to the client, enabling mouse and keyboard interaction with the visual desktop environment. This makes RDP high-bandwidth by comparison but suitable for tasks that require a graphical interface.\n\nAuthentication & Security: SSH establishes its secure connection using asymmetric (public key) cryptography. The server holds a public key, and the connecting client must possess the corresponding private key. This means that even if a password is intercepted on the untrusted Wi-Fi network, the session cannot be compromised without the private key file. SSH creates an encrypted tunnel for the shell session.\n\nRDP enhances security through Network Level Authentication (NLA). NLA requires the connecting user to authenticate successfully against the Credential Security Support Provider (CredSSP) before a full remote desktop session is even established on the server. This prevents unauthorised users from reaching the Windows login screen entirely and also protects the RDP service from certain Denial-of-Service attacks targeting the session initiation phase."
    ],
    markingGuide: "Award 2 marks for the UI comparison: 1 mark for correctly identifying SSH as CLI-based (low bandwidth, terminal), 1 mark for correctly identifying RDP as GUI-based (graphical desktop streaming). Award 2 marks for the SSH authentication explanation: 1 mark for identifying asymmetric/public key cryptography, 1 mark for explaining the private/public key pair and its security advantage. Award 2 marks for the RDP authentication explanation: 1 mark for identifying Network Level Authentication (NLA), 1 mark for explaining that NLA authenticates the user before the full desktop session is established.",
    diagram: {
      type: "mermaid",
      code: `classDiagram
  class SSH {
    +Interface: CLI Terminal
    +Authentication: Public Key Cryptography
    +Bandwidth: Low
    +OS Affinity: Cross-platform
    +connectViaKeyPair()
    +encryptedTunnel()
  }
  class RDP {
    +Interface: Full GUI Desktop
    +Authentication: Network Level Auth (NLA)
    +Bandwidth: High
    +OS Affinity: Optimised for Windows
    +authenticateViaCredSSP()
    +streamDesktop()
  }`,
    },
    points: 6,
  },

  {
    id: "ITNSA_W6_Q3_3B",
    type: "show-answer",
    sectionLabel: "3.2",
    text: "To secure the administrator's endpoint device from malicious software attempting to secretly alter operating system processes during the session, recommend and describe the operational function of a Host-based Intrusion Prevention System (HIPS). (4 Marks)",
    correctAnswers: [
      "A Host-based Intrusion Prevention System (HIPS) is the appropriate recommendation. Unlike a network firewall — which inspects inbound and outbound network traffic — a HIPS operates at the individual host level, examining events occurring directly on the endpoint to detect and block suspicious activity. Operationally, a HIPS uses behavioral analysis to continuously monitor active processes, files, and registry keys on the operating system. It establishes a baseline by computing a checksum for critical system objects (such as core OS files and registry entries). During the administrator's session, if any malware process attempts to modify a system file (e.g., kernel32.dll) or alter a registry key, the HIPS detects the deviation — the computed checksum no longer matches the baseline in its safe database — and immediately terminates the offending process before the change can take effect. It also intercepts and analyses system calls to identify unauthorised behaviour patterns in real time."
    ],
    markingGuide: "Award 1 mark for correctly recommending and naming HIPS. Award 1 mark for distinguishing HIPS from a network firewall (HIPS monitors host internals / OS-level events, not just network traffic). Award 1 mark for describing the behavioral analysis / checksum mechanism (baseline computation of system objects). Award 1 mark for explaining the prevention action — detecting checksum deviation and blocking/terminating the malicious process before damage occurs.",
    points: 4,
  },

  // ─────────────────────────────────────────────
  // PART 1: Technical Synthesis — Multiple Choice
  // ─────────────────────────────────────────────

  {
    id: "SCENARIO_ITNSA_W6_MCQ",
    type: "scenario",
    title: "Part 1: Technical Synthesis — Multiple Choice",
    context: `The following questions require synthesis and diagnostic thinking. Two options will appear technically plausible — read carefully and apply your understanding of protocol-level behaviour.`,
  },

  {
    id: "ITNSA_W6_MCQ1",
    type: "multiple-choice",
    sectionLabel: "MCQ 1",
    text: "A network engineer implements an IPsec VPN. During testing, packets are being dropped specifically when passing through a standard Source-NAT (PAT) gateway. Which component of the IPsec suite is primarily responsible for this failure?",
    options: [
      "The ESP protocol, because it encrypts the IP header, making NAT translation impossible.",
      "The AH protocol, because it signs the IP header; NAT changes the header, causing an integrity check failure.",
      "The IKE Phase 1 handshake, because NAT prevents the exchange of Diffie-Hellman public keys.",
      "The Layer 2 Header, because NAT operates at Layer 3 and cannot see the MAC address.",
    ],
    correctAnswers: [
      "The AH protocol, because it signs the IP header; NAT changes the header, causing an integrity check failure.",
    ],
    points: 2,
  },

  {
    id: "ITNSA_W6_MCQ2",
    type: "multiple-choice",
    sectionLabel: "MCQ 2",
    text: "A Host-based Intrusion Prevention System (HIPS) identifies a Zero-Day attack on a local machine without a signature update. What is the mechanical reason for this detection?",
    options: [
      "It compares the file's MD5 hash against a global database of known malware signatures.",
      "It monitors network traffic for specific port-scanning patterns such as Firewalking TTL probes.",
      "It detects a deviation in a system object's checksum compared to a known-good baseline in its safe database.",
      "It acts as a stateful firewall, blocking all inbound traffic that was not initiated locally.",
    ],
    correctAnswers: [
      "It detects a deviation in a system object's checksum compared to a known-good baseline in its safe database.",
    ],
    points: 2,
  },

  // ─────────────────────────────────────────────
  // PART 2: Terminological Precision — Open-Ended
  // ─────────────────────────────────────────────

  {
    id: "SCENARIO_ITNSA_W6_OE",
    type: "scenario",
    title: "Part 2: Terminological Precision — Short Answer",
    context: `The following questions require the exact technical name of a tool or protocol concept from your course materials. Answer in 1–3 words.`,
  },

  {
    id: "ITNSA_W6_OE1",
    type: "open-ended",
    sectionLabel: "SA 1",
    text: "What is the specific name of the tool used in Step 8 of the firewall testing methodology to determine which ports are open by analyzing TTL-expired ICMP messages?",
    correctAnswers: ["Firewalk", "Firewalk network auditing tool"],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 10,
    },
  },

  {
    id: "ITNSA_W6_OE2",
    type: "open-ended",
    sectionLabel: "SA 2",
    text: "OpenVPN uses a specific type of virtual network adapter to interface between the software and the operating system kernel. Name either of the two device types used.",
    correctAnswers: ["tun", "tap", "tun device", "tap device"],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
  },

  // ─────────────────────────────────────────────
  // PART 3: Logical Flow — Fill-in-the-Blank
  // ─────────────────────────────────────────────

  {
    id: "SCENARIO_ITNSA_W6_FITB",
    type: "scenario",
    title: "Part 3: Logical Flow — Fill in the Blanks",
    context: `Complete the technical sequences below by selecting the correct term for each blank. Understanding the order of operations in security protocols is essential.`,
  },

  {
    id: "ITNSA_W6_FITB1",
    type: "fill-in-the-blank",
    sectionLabel: "FITB 1",
    text: "In a scenario with overlapping subnets, the VPN NAT mapping must occur ___ the Security Association is negotiated. This ensures that the ___ (integrity check) remains valid after the IP header is translated.",
    blanks: [
      {
        id: "b1",
        options: ["AFTER", "DURING", "BEFORE", "INDEPENDENTLY OF"],
        correctAnswer: "BEFORE",
      },
      {
        id: "b2",
        options: ["SEQUENCE NUMBER", "HMAC/CHECKSUM", "PADDING LENGTH", "SPI VALUE"],
        correctAnswer: "HMAC/CHECKSUM",
      },
    ],
    points: 2,
  },

  {
    id: "ITNSA_W6_FITB2",
    type: "fill-in-the-blank",
    sectionLabel: "FITB 2",
    text: "In the Incident Response process, the stage that focuses on stopping the spread of the threat is called ___, which is immediately followed by the ___ stage, where the root cause of the incident is removed from the environment.",
    blanks: [
      {
        id: "b1",
        options: ["IDENTIFICATION", "CONTAINMENT", "DETECTION", "POST-INCIDENT ACTIVITY"],
        correctAnswer: "CONTAINMENT",
      },
      {
        id: "b2",
        options: ["RECOVERY", "REMEDIATION", "ERADICATION", "PREPARATION"],
        correctAnswer: "ERADICATION",
      },
    ],
    points: 2,
  },

];