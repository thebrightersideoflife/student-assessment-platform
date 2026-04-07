// src/data/questions/ITNSA/week4.js
// Advanced Network Security & Architecture Assessment
// Total Marks: 40
// Focus: Firewall Topologies, Edge Security, pfSense Practical Implementation, and SIEM.

export default [

  // ─────────────────────────────────────────────────────────────
  // SCENARIO 1: The "Titan" Breach & Perimeter Defense
  // ─────────────────────────────────────────────────────────────
  {
    id: "SCENARIO_ITNSA_W4_S1",
    type: "scenario",
    title: "Scenario 1: The \"Titan\" Breach & Perimeter Defense (14 Marks)",
    context: `A major financial institution, "Titan," recently suffered a catastrophic data breach. The attacker bypassed the perimeter by exploiting a misconfigured firewall, utilizing a forged internal IP address to execute a Server-Side Request Forgery (SSRF). Simultaneously, the organization's legacy packet-filtering firewalls failed to drop the spoofed internal packets. Titan's SIEM system was active, yet the data exfiltration continued for three months before triggering an actionable alert.`,
  },

  // Q1.1 — Stateless vs. Stateful Firewalls (show-answer, 8 marks)
  {
    id: "ITNSA_W4_Q1",
    type: "show-answer",
    sectionLabel: "1.1",
    text: "The Titan breach utilized a forged internal IP address to bypass edge security. Evaluate why a Stateless Packet Filtering Firewall is inherently vulnerable to this type of IP spoofing compared to a Stateful Packet Filtering Firewall. In your analysis, explain how the firewall's physical placement in the network topology dictates its ability to detect source address fraud.",
    correctAnswers: [
      "A Stateless Packet Filter examines packets in isolation based solely on static headers (Source/Destination IP, Port, Protocol) without any knowledge of connection context. It is vulnerable to the Titan breach because it cannot distinguish a forged packet from a legitimate response unless an explicit rule exists for both directions. Since it does not track the state of a TCP three-way handshake, an attacker can inject a packet with a forged internal IP address and the firewall will permit it if the static ACL allows traffic to that destination — there is no session validation to fail.\n\nIn contrast, a Stateful Firewall maintains a State Table (also called a Connection Table). It recognizes whether a packet belongs to an established, valid session. Even if an attacker spoofs an internal source IP, the stateful firewall drops the packet because it does not correspond to any pre-existing entry in the state table initiated legitimately from the internal network.\n\nRegarding physical placement, the firewall must be positioned at the Network Edge (Gateway). This is the only location at which Ingress Filtering can be applied — dropping packets with internal source addresses arriving from an external interface. Simultaneously, Egress Filtering can drop packets with external source addresses that appear to originate from inside the network. A firewall placed internally or on a core switch cannot perform this boundary enforcement because it never sees the contrast between inside and outside address space."
    ],
    markingGuide: "Award 3 marks for a clear distinction between isolated packet inspection (stateless) vs. state table and handshake tracking (stateful). Award 3 marks for a specific explanation of why stateless firewalls fail against spoofing — the answer must reference the absence of connection context, not just say 'stateful is better.' Award 2 marks for correctly identifying Edge placement and the role of both Ingress and Egress filtering.",
    points: 8,
  },

  // Q1.2 — SIEM Configuration Failures (show-answer, 6 marks)
  {
    id: "ITNSA_W4_Q2",
    type: "show-answer",
    sectionLabel: "1.2",
    text: "Titan's IT team had a SIEM deployed, but their Mean Time To Detect (MTTD) was over 90 days. Based on the principles of Event Correlation and Incident Monitoring, diagnose three specific configuration failures in their SIEM deployment that allowed the massive anomalous movement of data to go unnoticed.",
    correctAnswers: [
      "1. Improper Log Source Integration: The SIEM likely lacked visibility into internal East-West traffic. If logs were collected only from North-South perimeter devices, the SSRF-triggered lateral movement and internal data staging would remain completely invisible to the correlation engine — the exfiltration path was never monitored.\n\n2. Lack of Behavior Baselines and Thresholding: The SIEM failed to trigger an alert because 'normal' data transfer volumes had never been defined for the environment. Without an established baseline, a three-month low-and-slow exfiltration blends into standard background noise — no threshold existed to cross.\n\n3. Ineffective Correlation Rules: The system treated the forged IP traffic and the anomalous outbound data volume as isolated, unrelated events. A properly configured SIEM requires a correlation rule that links 'Internal IP Accessing Sensitive Cloud Metadata Endpoint' with 'Sustained High-Volume Outbound Traffic to External IP' to produce a single high-severity incident — no such rule was present."
    ],
    markingGuide: "Award 2 marks per valid diagnosis, for a maximum of 3 diagnoses (6 marks total). Each diagnosis must include both a technical root cause and the resulting security gap it created. Generic answers such as 'alerts were not configured' without explaining the specific mechanism do not qualify for full marks.",
    points: 6,
  },

  // ─────────────────────────────────────────────────────────────
  // SCENARIO 2: Global Tech Enterprises — Edge Routing & Interception
  // ─────────────────────────────────────────────────────────────
  {
    id: "SCENARIO_ITNSA_W4_S2",
    type: "scenario",
    title: "Scenario 2: Global Tech Enterprises — Edge Routing & Interception (14 Marks)",
    context: `Global Tech is deploying mission-critical web applications across three continents. They are under constant threat of volumetric Distributed Denial-of-Service (DDoS) attacks. They need to ensure their origin servers are never exposed directly to the public internet, while also minimizing the computational overhead of SSL/TLS encryption on those same origin servers.`,
  },

  // Q2.1 (a) — MCQ: pfSense deployment mechanics
  {
    id: "ITNSA_W4_Q3",
    type: "multiple-choice",
    sectionLabel: "2.1 A",
    text: "A Reverse Proxy sits between internet clients and origin servers. Which of the following best describes the correct traffic flow when SSL offloading is active?",
    options: [
      "Client → Origin Server (HTTPS) → Reverse Proxy (HTTP) → Client",
      "Client → Reverse Proxy (HTTPS) → Origin Server (HTTP or light HTTPS) → Reverse Proxy → Client",
      "Client → Reverse Proxy (HTTP) → Origin Server (HTTPS) → Reverse Proxy → Client",
      "Client → Origin Server (HTTPS) → Reverse Proxy (HTTPS) → Client"
    ],
    correctAnswers: ["Client → Reverse Proxy (HTTPS) → Origin Server (HTTP or light HTTPS) → Reverse Proxy → Client"],
    points: 2,
  },

  // Q2.1 (b) — Open-ended: SSL offloading term
  {
    id: "ITNSA_W4_Q4",
    type: "open-ended",
    sectionLabel: "2.1 B",
    text: "What specific term describes the process where a Reverse Proxy handles the computationally expensive SSL/TLS handshake on behalf of the origin servers, thereby reducing their CPU load?",
    correctAnswers: ["SSL Offloading", "TLS Offloading", "SSL Termination", "TLS Termination"],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 10,
    },
  },

  // Q2.1 (c) — Show-answer: Full Reverse Proxy architecture justification
  {
    id: "ITNSA_W4_Q5",
    type: "show-answer",
    sectionLabel: "2.1 C",
    text: "Evaluate why a Reverse Proxy is superior to a standard Port Forward (DNAT) for protecting an origin server against SSL-based volumetric attacks. In your answer, address DDoS absorption, SSL offloading, Global Server Load Balancing (GSLB), and origin IP masking.",
    correctAnswers: [
      "A Reverse Proxy is superior to DNAT in four key dimensions:\n\n1. DDoS Absorption: A DNAT port forward passes all traffic — including attack traffic — directly to the origin server, which must handle the volumetric load with its own CPU and RAM. A Reverse Proxy absorbs the attack at the proxy layer; the origin server only receives traffic the proxy has validated and forwarded, preserving origin server resources.\n\n2. SSL Offloading: With DNAT, the origin server must perform every SSL/TLS handshake itself. A Reverse Proxy terminates the SSL session at the proxy (SSL Termination), handling the expensive asymmetric cryptography centrally. Traffic to the origin can then be sent over unencrypted HTTP on a secure internal segment, or with lighter symmetric encryption, dramatically reducing origin server CPU overhead.\n\n3. Global Server Load Balancing (GSLB): A DNAT rule targets a single fixed IP. A Reverse Proxy can route client requests to the nearest or least-loaded origin server across multiple geographic regions based on IP geolocation or latency measurements, providing continent-level redundancy.\n\n4. Origin IP Masking: DNAT exposes the origin server's IP in certain configurations. A Reverse Proxy ensures the origin's IP is never revealed to the public internet — clients only ever see and communicate with the proxy's IP, eliminating direct targeted attacks against the origin."
    ],
    markingGuide: "Award 1.5 marks each for accurately addressing all four justifications (DDoS absorption, SSL offloading, GSLB, IP masking) = 6 marks total. Deduct marks if the student conflates the Reverse Proxy with the origin server in their traffic flow description.",
    diagram: {
      type: "mermaid",
      code: `graph LR
    subgraph Public_Internet
    C[Client / Attacker]
    end
    subgraph DMZ
    RP[Reverse Proxy\nSSL Termination / GSLB]
    end
    subgraph Private_Network
    OS1[Origin Server\nRegion A]
    OS2[Origin Server\nRegion B]
    end
    C -- HTTPS Traffic --> RP
    RP -- Cleaned HTTP Traffic --> OS1
    RP -- Cleaned HTTP Traffic --> OS2
    OS1 -- Data --> RP
    OS2 -- Data --> RP
    RP -- Encrypted Response --> C
    style RP fill:#f96,stroke:#333,stroke-width:2px
    style OS1 fill:#69f,stroke:#333,stroke-width:2px
    style OS2 fill:#69f,stroke:#333,stroke-width:2px`,
    },
    points: 6,
  },

  // Q2.2 — MCQ: pfSense deployment mode (4 marks)
  {
    id: "ITNSA_W4_Q6",
    type: "multiple-choice",
    sectionLabel: "2.2",
    text: "Global Tech must insert a pfSense firewall between their existing upstream ISP router and the new Reverse Proxy. They are forbidden from changing any IP subnets or routing tables and need the firewall to operate with no IP address assigned to its filtered interfaces. Which pfSense configuration mode is strictly required?",
    options: [
      "Layer 3 Routing with Static Routes",
      "Virtual Wire (Transparent Bridge)",
      "OSPF Dynamic Routing",
      "NAT Port Forwarding (DNAT)"
    ],
    correctAnswers: ["Virtual Wire (Transparent Bridge)"],
    points: 4,
  },

  // ─────────────────────────────────────────────────────────────
  // SCENARIO 3: pfSense Administrative Security & Identity Management
  // ─────────────────────────────────────────────────────────────
  {
    id: "SCENARIO_ITNSA_W4_S3",
    type: "scenario",
    title: "Scenario 3: pfSense Administrative Security & Identity Management (12 Marks)",
    context: `To prevent insider threats and credential stuffing, Global Tech's CISO mandates that the pfSense management interface must not be accessible via the standard data plane, and the default "admin" account must be eradicated in favor of centralized identity management.`,
  },

  // Q3.1 — Open-ended: What is the term for isolated management network?
  {
    id: "ITNSA_W4_Q7",
    type: "open-ended",
    sectionLabel: "3.1 A",
    text: "What is the industry term for a dedicated, physically or logically isolated network used exclusively for device administration traffic, completely separated from the standard data plane?",
    correctAnswers: ["Out-of-Band Management", "OoB Management", "Out-of-Band", "OoB", "Management Network"],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 10,
    },
  },

  // Q3.1 — Show-answer: OoB management full explanation + critique
  {
    id: "ITNSA_W4_Q8",
    type: "show-answer",
    sectionLabel: "3.1 B",
    text: "Detail the process of securing the pfSense management plane using an Out-of-Band (OoB) approach. In your explanation, critique the use of an Interface Management Profile (enabling SSH/HTTPS) directly on a data plane interface and explain why it is considered a critical security risk.",
    correctAnswers: [
      "Out-of-Band (OoB) Management: This approach dedicates a physically separate or logically isolated network interface — such as a distinct VLAN tagged only on the management switch, or a dedicated 'MGMT' physical port — exclusively to administrative traffic. This network is completely unreachable from the standard LAN or WAN data planes. Administrators connect to the firewall only via this isolated segment, ensuring that management traffic never travels through the same path as production data.\n\nCritique of Interface Management Profile on a Data Plane Interface: Enabling SSH or HTTPS management via an Interface Management Profile on the LAN or WAN interface is a critical security risk for two reasons. First, it exposes the administrative attack surface — the WebGUI and SSH daemon — directly to the same traffic path used by potentially untrusted or compromised hosts. Any device on that segment can attempt to reach the management interface. Second, if a vulnerability exists in the pfSense WebGUI (web server) or the SSH service itself, an attacker already present on the data plane can directly exploit the firewall — the 'brains' of the entire network — without needing to traverse any additional security boundary. The firewall is supposed to protect the network; placing its management interface in-band means an attacker who penetrates the data plane has a direct path to compromise the device protecting that same plane."
    ],
    markingGuide: "Award 3 marks for a clear and correct definition of OoB management — must include the concept of physical or logical isolation from data plane traffic, not merely 'a separate login.' Award 3 marks for an effective critique of management on a data plane interface — must identify both the increased attack surface and the direct exposure of the firewall's administrative services to untrusted traffic.",
    points: 6,
  },

  // Q3.2 (a) — Fill-in-the-blank: pfSense LDAP + MFA sequential configuration
  {
    id: "ITNSA_W4_Q9",
    type: "fill-in-the-blank",
    sectionLabel: "3.2 A",
    text: "To integrate LDAP with MFA in pfSense, you first define the connection to Active Directory by creating an ___ Server Profile (specifying Server IP, Base DN, and Bind Credentials). Next, under the ___ tab, you create a policy for the second factor (e.g., TOTP or Duo). Finally, you combine both into an ___ which is then assigned to the admin user group.",
    blanks: [
    {
        id: "b1",
        options: ["RADIUS", "LDAP", "TACACS+", "Directory"],
        correctAnswer: "LDAP",
    },
    {
        id: "b2",
        options: ["Tokens", "Certificates", "Settings", "Factors"],
        correctAnswer: "Factors",
    },
    {
        id: "b3",
        options: ["Authentication Profile", "Server Group", "Gateway Group", "Access Policy"],
        correctAnswer: "Authentication Profile",
    },
    ],
    points: 3,
  },

  // Q3.2 (b) — Show-answer: Full LDAP + MFA configuration and mitigation reasoning
  {
    id: "ITNSA_W4_Q10",
    type: "show-answer",
    sectionLabel: "3.2 B",
    text: "Outline the sequential configuration steps required in pfSense to transition from local static passwords to an LDAP Server Profile combined with a Multi-Factor Authentication (MFA) Profile. Explain how this specific combination actively mitigates the risk of compromised remote logins.",
    correctAnswers: [
      "Sequential Configuration Steps:\n\n1. LDAP Server Profile: Navigate to System > Authentication Servers and create a new server of type LDAP. Configure the Server IP (Active Directory Domain Controller), Port (389 for LDAP or 636 for LDAPS), Base DN (e.g., dc=globaltech,dc=com), and Bind Credentials (a service account with read access to the directory).\n\n2. Authentication Server Assignment: Set this new LDAP profile as the active Authentication Server for pfSense administrative logins under System > User Manager > Settings.\n\n3. MFA Profile (Factors Tab): Under the authentication configuration, navigate to the Factors tab and create a new MFA profile. Select the second-factor provider — for example, Time-based One-Time Password (TOTP) via an authenticator app, or an external Duo Security push notification service.\n\n4. Combined Authentication Profile: Create a combined Authentication Profile that binds the LDAP Server profile with the MFA Policy. This is the critical step — simply having both configured in pfSense does not enforce dual-factor authentication unless they are explicitly linked in a single profile.\n\n5. User/Group Mapping: Assign the combined Authentication Profile to the administrative user group in pfSense, and ensure the legacy local 'admin' account is either disabled or removed.\n\nMitigation of Compromised Credentials: This combination ensures that even if an attacker obtains a valid Active Directory password through phishing, credential stuffing, or a data breach, they cannot authenticate to the pfSense management interface without also possessing the physical MFA device (phone with authenticator app or hardware token). The LDAP component verifies 'something you know' (password), while the MFA component enforces 'something you have' (token), making credential-only attacks ineffective."
    ],
    markingGuide: "Award 4 marks for presenting a logical and complete configuration sequence — must include: LDAP Server Profile creation, Authentication Server assignment, MFA/Factors profile creation, and the Combined Authentication Profile binding step (candidates who omit the Combined Profile step lose 2 marks). Award 2 marks for a clear explanation of why the LDAP+MFA combination neutralizes compromised-credential attacks — must reference both factors explicitly.",
    points: 4,
  },

];