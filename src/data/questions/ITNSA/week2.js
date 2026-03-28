// ITNSA — Week 2
// Parts: I Hell-Level Multiple Choice | II Hell-Level Open Ended | III Hell-Level Scenario Analysis
export default [
  // ========================================
  // Part I: Hell-Level Multiple Choice (10 questions)
  // ========================================
  {
    id: "ITNSA_W2_Q1",
    type: "multiple-choice",
    text: "A multinational corporation requires a network topology for its internal high-frequency trading floor. The primary constraints are microsecond-latency data transfer and zero tolerance for collision-based delays. Reliability is critical, but the budget is secondary. Which topology and hardware configuration is the absolute optimal choice, and why?",
    options: [
      "Full Mesh Topology using Layer 3 Routers, because every node has a dedicated route to every other node, eliminating all collisions",
      "Star Topology using unmanaged Layer 2 switches, because the central hub effectively manages all traffic flow and reduces cabling costs compared to Mesh",
      "Full Mesh Topology using high-speed Layer 2 Switches, because it offers dedicated point-to-point links for every device pair, maximizing bandwidth and redundancy while bypassing the processing overhead of routing",
      "Ring Topology using Token Passing, because the deterministic nature of the token ensures that no collisions ever occur, guaranteeing the most stable latency"
    ],
    correctAnswers: ["Full Mesh Topology using high-speed Layer 2 Switches, because it offers dedicated point-to-point links for every device pair, maximizing bandwidth and redundancy while bypassing the processing overhead of routing"],
    points: 4
  },
  {
    id: "ITNSA_W2_Q2",
    type: "multiple-choice",
    text: "An attacker has successfully infiltrated a target network and is currently installing a Rootkit and creating a 'backdoor' user account with administrative privileges. According to the standard Hacking Phases, which stage is the attacker currently executing, and what is the primary objective of this specific action?",
    options: [
      "Gaining Access; the objective is to escalate privileges from a standard user to an administrator to steal data immediately",
      "Maintaining Access; the objective is to ensure persistent control over the system even if the initial vulnerability is patched or the system is rebooted",
      "Scanning & Enumeration; the objective is to map out the internal OS structure to find where to hide files",
      "Covering Tracks; the objective is to modify system logs so the administrator does not see the new user account"
    ],
    correctAnswers: ["Maintaining Access; the objective is to ensure persistent control over the system even if the initial vulnerability is patched or the system is rebooted"],
    points: 4
  },
  {
    id: "ITNSA_W2_Q3",
    type: "multiple-choice",
    text: "You are analyzing a subnetting scheme for a legacy Class C network (192.168.10.0). The previous administrator left a note saying the network uses a /28 subnet mask. You need to assign the last usable host address in the fourth available subnet to a critical gateway. What is that IP address?",
    options: [
      "192.168.10.62",
      "192.168.10.63",
      "192.168.10.46",
      "192.168.10.54"
    ],
    correctAnswers: ["192.168.10.62"],
    points: 4
  },
  {
    id: "ITNSA_W2_Q4",
    type: "multiple-choice",
    text: "A 'Hacktivist' group targets a pharmaceutical company. Unlike a 'Script Kiddie' or a 'State-Sponsored Actor,' what is the most likely combination of motivation and attack vector for this specific threat actor?",
    options: [
      "Motivation: Financial Gain; Attack Vector: Ransomware to lock patient data until a fee is paid",
      "Motivation: Ideology/Political Beliefs; Attack Vector: DDoS attacks and website defacement to disrupt operations and damage public reputation",
      "Motivation: Espionage; Attack Vector: Advanced Persistent Threat (APT) to quietly steal R&D formulas over months",
      "Motivation: Thrill/Ego; Attack Vector: Using pre-made scripts to exploit unpatched Windows servers"
    ],
    correctAnswers: ["Motivation: Ideology/Political Beliefs; Attack Vector: DDoS attacks and website defacement to disrupt operations and damage public reputation"],
    points: 4
  },
  {
    id: "ITNSA_W2_Q5",
    type: "multiple-choice",
    text: "Consider a network designed with a 'Bus' topology using a coaxial backbone. If a user connects a device with a malfunctioning Network Interface Card (NIC) that continuously chatters (broadcasts noise) at high voltage, what is the immediate impact on the rest of the network, and why?",
    options: [
      "Only the devices immediately adjacent to the faulty node will be affected due to signal attenuation",
      "The network will function normally, but the faulty device will be isolated by the terminators at the ends of the bus",
      "The entire network will collapse (Denial of Service) because the bus is a shared medium; the noise will be interpreted as a collision or jam signal by all other nodes",
      "The central server will detect the noise and logically disconnect the specific port associated with the bus cable"
    ],
    correctAnswers: ["The entire network will collapse (Denial of Service) because the bus is a shared medium; the noise will be interpreted as a collision or jam signal by all other nodes"],
    points: 4
  },
  {
    id: "ITNSA_W2_Q6",
    type: "multiple-choice",
    text: "Which of the following scenarios best describes the 'Reconnaissance' phase of an attack, specifically distinguishing Passive from Active reconnaissance?",
    options: [
      "Active: Monitoring company Wi-Fi traffic from the parking lot; Passive: Running an NMAP scan on the company firewall",
      "Active: Calling the helpdesk claiming to be a new employee (Social Engineering); Passive: Reading the company's publicly posted job listings to identify the antivirus software they use",
      "Active: Sending a phishing email to the CEO; Passive: Using Wireshark to capture packets on the local LAN",
      "Active: Attempting to login with default passwords; Passive: Changing the timestamps on modified files to hide activity"
    ],
    correctAnswers: ["Active: Calling the helpdesk claiming to be a new employee (Social Engineering); Passive: Reading the company's publicly posted job listings to identify the antivirus software they use"],
    points: 4
  },
  {
    id: "ITNSA_W2_Q7",
    type: "multiple-choice",
    text: "You are replacing a legacy 'Hub' in a high-traffic department with a 'Layer 2 Switch.' Regarding security and traffic flow, what is the most significant architectural change this introduces?",
    options: [
      "It moves the network from a single Broadcast Domain to multiple Broadcast Domains",
      "It eliminates the need for IP addressing on the connected workstations",
      "It moves the network from a single Collision Domain to multiple Collision Domains (one per port), preventing 'promiscuous mode' sniffing of unicast traffic between other nodes",
      "It automatically acts as a firewall, blocking all ports not explicitly opened by the administrator"
    ],
    correctAnswers: ["It moves the network from a single Collision Domain to multiple Collision Domains (one per port), preventing 'promiscuous mode' sniffing of unicast traffic between other nodes"],
    points: 4
  },
  {
    id: "ITNSA_W2_Q8",
    type: "multiple-choice",
    text: "An organization is migrating from IPv4 to IPv6 (Dual Stack). A junior engineer configures a firewall rule to block all ICMP traffic to improve security. Why is this a potentially catastrophic error for the IPv6 implementation?",
    options: [
      "IPv6 relies heavily on ICMPv6 for Neighbor Discovery Protocol (NDP) and Router Advertisement; blocking it will break local connectivity and address assignment",
      "IPv6 addresses are 128-bit, so they require ICMP to fragment packets that are too large for the MTU",
      "It isn't an error; blocking ICMP is a standard hardening practice for both IPv4 and IPv6 to prevent Ping of Death attacks",
      "IPv6 does not use ARP; it uses DHCPv6 exclusively, so ICMP is irrelevant"
    ],
    correctAnswers: ["IPv6 relies heavily on ICMPv6 for Neighbor Discovery Protocol (NDP) and Router Advertisement; blocking it will break local connectivity and address assignment"],
    points: 4
  },
  {
    id: "ITNSA_W2_Q9",
    type: "multiple-choice",
    text: "In a 'Defense in Depth' strategy, which sequence of controls correctly orders protections from the Network Perimeter inward to the Data?",
    options: [
      "Antivirus -> Firewall -> VLAN ACLs -> User Training",
      "Edge Router -> Firewall -> Internal Switch (VLAN) -> Host-based IPS -> File Permissions",
      "Switch Port Security -> Edge Router -> Firewall -> Biometric Locks",
      "File Encryption -> Firewall -> Router -> DMZ"
    ],
    correctAnswers: ["Edge Router -> Firewall -> Internal Switch (VLAN) -> Host-based IPS -> File Permissions"],
    points: 4
  },
  {
    id: "ITNSA_W2_Q10",
    type: "multiple-choice",
    text: "A 'Linear Daisy Chain' topology is often criticized for its lack of redundancy. However, if you convert a Linear Daisy Chain into a Ring Topology, you solve the single-point-of-failure issue only if:",
    options: [
      "The data transmission is unidirectional",
      "The Ring is configured to be bidirectional (or dual-ring), allowing data to traverse the opposite direction if a link fails",
      "You replace all cabling with fiber optics to prevent signal loss",
      "You add a central Hub to manage the token passing"
    ],
    correctAnswers: ["The Ring is configured to be bidirectional (or dual-ring), allowing data to traverse the opposite direction if a link fails"],
    points: 4
  },

  // ========================================
  // Part II: Hell-Level Open Ended (10 questions)
  // ========================================
  {
    id: "ITNSA_W2_Q11",
    type: "open-ended",
    text: "In the context of the Hacking Process, what is the specific term for the sub-phase of 'Scanning' where the attacker aggressively probes the target network to identify user accounts, shared resources, and specific software versions?",
    correctAnswers: ["Enumeration"],
    points: 4,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0
    }
  },
  {
    id: "ITNSA_W2_Q12",
    type: "open-ended",
    text: "You are examining a binary IP address: 11000000.10101000.00001010.10000000. Convert this to Dotted Decimal Notation. (Format: xxx.xxx.xxx.xxx)",
    correctAnswers: ["192.168.10.128"],
    points: 4,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0
    }
  },
  {
    id: "ITNSA_W2_Q13",
    type: "open-ended",
    text: "A Star topology relies on a central node. If this central node is a 'switch,' it uses a specific internal database to filter traffic by physical address. What is the acronym for this database?",
    correctAnswers: ["CAM", "CAM Table", "MAC Address Table"],
    points: 4,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0
    }
  },
  {
    id: "ITNSA_W2_Q14",
    type: "open-ended",
    text: "Identify the specific type of 'Social Engineering' attack where a perpetrator physically follows an authorized employee through a secure door without presenting their own credentials.",
    correctAnswers: ["Tailgating"],
    points: 4,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0
    }
  },
  {
    id: "ITNSA_W2_Q15",
    type: "open-ended",
    text: "In an IPv6 address, the '::' (double colon) notation can be used to compress the address. How many times can this double colon appear in a single IPv6 address?",
    correctAnswers: ["1", "Once", "One"],
    points: 4,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0
    }
  },
  {
    id: "ITNSA_W2_Q16",
    type: "open-ended",
    text: "Which specific network device functions at Layer 1 (Physical) of the OSI model, does not amplify signals but regenerates them bit-by-bit to extend network reach, and has no intelligence regarding data destinations?",
    correctAnswers: ["Repeater"],
    points: 4,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0
    }
  },
  {
    id: "ITNSA_W2_Q17",
    type: "open-ended",
    text: "A hacker is motivated purely by 'Ideology' rather than financial gain. They launch a coordinated attack to flood a web server with traffic, rendering it inaccessible to legitimate users. What is the specific three-letter acronym for this type of attack?",
    correctAnswers: ["DoS", "DDoS"],
    points: 4,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0
    }
  },
  {
    id: "ITNSA_W2_Q18",
    type: "open-ended",
    text: "You have a network address 10.0.0.0/14. How many usable host IP addresses does this single subnet support? (Enter the exact number)",
    correctAnswers: ["262142"],
    points: 4,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0
    }
  },
  {
    id: "ITNSA_W2_Q19",
    type: "open-ended",
    text: "In a Token Ring network, a specific packet is passed around the network to authorize transmission. If a node wants to transmit but does not possess this packet, what state must it remain in?",
    correctAnswers: ["Waiting", "Idle"],
    points: 4,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0
    }
  },
  {
    id: "ITNSA_W2_Q20",
    type: "open-ended",
    text: "What is the name of the specific protocol used by IPv4 to map a known IP address to an unknown physical (MAC) address?",
    correctAnswers: ["ARP", "Address Resolution Protocol"],
    points: 4,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0
    }
  },

  // ========================================
  // Part III: Hell-Level Scenario Analysis (5 questions)
  // ========================================
  {
    id: "ITNSA_W2_Q21",
    type: "show-answer",
    text: "Scenario: The 'Invisible' Breach. An attacker performs Passive Reconnaissance on a target company for three weeks. They then use Open Source Intelligence (OSINT) to find the personal email address of the lead System Administrator. The attacker sends a carefully crafted email (Spear Phishing) containing a zero-day exploit in a PDF attachment. The Admin opens it, and the attacker gains shell access. Immediately after gaining this initial shell access, the attacker executes a script to patch the very vulnerability they just exploited. Why would an attacker patch the victim's system, and which 'Phase of Hacking' does this action support?",
    correctAnswers: [
      "The attacker patches the vulnerability to prevent other attackers from compromising the system using the same exploit, thereby maintaining exclusivity over the compromised system. This ensures they retain control and prevents rival hackers from taking over the same machine. This action falls under the 'Maintaining Access' phase of hacking, as it creates a persistent and exclusive foothold in the target system. By closing the door behind them, the attacker secures their ownership of the zombie/bot and protects their investment in the initial compromise."
    ],
    points: 10
  },
  {
    id: "ITNSA_W2_Q22",
    type: "show-answer",
    text: "Scenario: Topology Disaster. A startup company connects 50 computers using a Bus Topology because it is cheap and easy to install. As the company grows, they add 20 more users and start transferring large video files. The network slows to a crawl, and users report constant 'connection drops.' Diagnostically, what is the specific technical phenomenon causing the slowness, and what physical characteristic of the Bus topology makes it impossible to isolate the specific user causing the issue without physically checking cables?",
    correctAnswers: [
      "The specific technical phenomenon causing the slowness is 'Packet Collisions' (or network congestion). In a Bus Topology, all nodes share a single cable backbone as a common transmission medium. As the number of devices and bandwidth consumption increases, multiple devices attempt to transmit simultaneously on the shared medium, leading to collisions. The physical characteristic that makes isolation impossible is the 'Shared Medium' (single backbone cable). Since all devices are connected to the same physical cable, device failure or the source of excessive traffic is difficult to locate without physically testing the cable at each connection point. There is no central switch or segmentation that would allow logical isolation of problematic nodes."
    ],
    points: 10
  },
  {
    id: "ITNSA_W2_Q23",
    type: "show-answer",
    text: "Scenario: The Subnet Puzzle. You have been given the network block 172.16.0.0/16. You need to create subnets for 5 different departments. The largest department (Sales) requires 4000 hosts. The smallest (HR) requires 50 hosts. Using Variable Length Subnet Masking (VLSM) to preserve address space, what is the most efficient Subnet Mask (in /CIDR notation) you would assign to the Sales department, and how many wasted (unused but allocated) addresses would that leave you with (assuming exactly 4000 hosts are connected)?",
    correctAnswers: [
      "The most efficient subnet mask for the Sales department is /20 (or 255.255.240.0). Calculation: For 4000 hosts, we need 2^12 = 4096 total IP addresses (which requires 12 host bits). This means 32 - 12 = 20 network bits, giving us a /20 subnet. The /20 block provides 4096 total addresses. Subtracting 2 for the Network ID and Broadcast address leaves 4094 usable host addresses. With exactly 4000 hosts connected, this results in 4094 - 4000 = 94 wasted (unused but allocated) addresses. This is the most efficient choice because using /21 would only provide 2046 usable addresses (insufficient), while /19 would provide 8190 usable addresses (significantly more wasteful)."
    ],
    points: 10
  },
  {
    id: "ITNSA_W2_Q24",
    type: "show-answer",
    text: "Scenario: Security by Design. You are designing a secure network for a classified government facility. You must choose between a Star Topology and a Full Mesh Topology. Constraints: (1) If any single cable is cut, no connectivity can be lost. (2) If the central switch fails, the network must survive. (3) You must prevent 'Packet Sniffing' where a compromised node can see traffic meant for others. Which topology do you choose, and what specific additional hardware or configuration is required to meet Constraint 3 in that topology?",
    correctAnswers: [
      "The correct choice is Full Mesh Topology. This is the only topology that satisfies all three constraints: (1) Full Mesh provides multiple redundant paths, so cutting any single cable does not interrupt connectivity between other nodes. (2) There is no central switch in a Mesh topology, so Constraint 2 is inherently satisfied. However, to meet Constraint 3 (preventing packet sniffing), the physical topology alone is insufficient. The required additional security control is Link Encryption (such as IPSec or MACsec). While the Mesh topology ensures robust security and privacy through dedicated point-to-point links, encryption is necessary because a compromised router or node could still inspect unencrypted traffic it forwards. Link-layer or network-layer encryption ensures that even if a node is compromised, it cannot read the contents of packets traversing through it."
    ],
    points: 10
  },
  {
    id: "ITNSA_W2_Q25",
    type: "show-answer",
    text: "Scenario: The Gateway Conflict. A user manually configures their workstation with the IP 192.168.1.15 and a Subnet Mask of 255.255.255.0. They set their Default Gateway to 192.168.1.1. However, they cannot access the internet. A ping to 127.0.0.1 works. A ping to 192.168.1.1 fails. The user's physical link light is on. You discover that the Router (Gateway) has been configured with the IP 192.168.1.1 but with a Subnet Mask of 255.255.255.128. Explain exactly why the communication is failing at the packet logic level (Layer 3).",
    correctAnswers: [
      "The communication is failing due to an Inconsistent Subnet Configuration (Broadcast Domain Mismatch) at Layer 3. The user's workstation (192.168.1.15/24) believes the network ranges from 192.168.1.0 to 192.168.1.255, with a broadcast address of 192.168.1.255. However, the router (192.168.1.1/25) believes the network ranges from 192.168.1.0 to 192.168.1.127, with a broadcast address of 192.168.1.127. While both IP addresses physically overlap in the lower half of the address block, the logical boundaries are incompatible. When the workstation sends packets, many router operating systems will drop them due to Ingress Filtering or fail to process return traffic correctly because they disagree on the Broadcast Address. If the user sends a broadcast to 192.168.1.255, the router interprets this as remote traffic (outside its subnet) and drops it. This subnet mask mismatch breaks the logical boundaries of the Network Layer, preventing proper Layer 3 communication despite physical Layer 1/2 connectivity."
    ],
    points: 10
  }
];