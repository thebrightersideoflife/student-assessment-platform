export default [
  {
    "id": "SCENARIO_ITCOA_W6",
    "type": "scenario",
    "title": "Summative Practice Examination: Redundancy, Failover Clustering & Containers — Case Study: NovaTech Electronics (100 Marks)",
    "context": "NovaTech Electronics is a rapidly growing South African manufacturer of smart-home and industrial electronic devices. Its Johannesburg head office operates a **Windows Server 2019** environment supporting the company's:\n\n- customer-facing product website\n- internal production-management web application\n- FTP-based transfer services\n- remote-access infrastructure\n- virtualised production systems\n- file services\n- several newly developed applications that management wants to deploy using containers\n\nThe company's IT management has identified several concerns.\n\nThe public website experiences severe traffic fluctuations when new products are launched. During these periods, one web server can become overloaded while another remains underutilised.\n\nThe production-management application is more complicated. Unlike the public website, it maintains important operational state and depends on shared data. Management wants the application to remain available if one server fails.\n\nNovaTech currently uses specialised storage hardware, but the finance department has challenged the cost of purchasing additional storage appliances. The infrastructure team has therefore been asked to investigate whether Windows Server can provide a redundant storage solution using standard servers.\n\nFinally, NovaTech's development team wants to package several applications into containers. Some applications require very strong isolation, while others prioritise efficiency and rapid deployment.\n\nThe CIO has therefore asked you, as the infrastructure consultant, to recommend an architecture rather than simply provide installation instructions.\n\n**All questions relate to NovaTech unless otherwise stated.**"
  },
  {
    "id": "ITCOA_W6_Q1_1",
    "type": "multiple-choice",
    "sectionLabel": "1.1",
    "tags": [
      "NLB",
      "system design",
      "technological impact"
    ],
    "text": "NovaTech wants to distribute requests for its **stateless public website** across three Windows Server 2019 web servers. The individual web servers should not need to be aware that traffic is being distributed between them.\n\nWhich technology is the most appropriate?",
    "options": [
      "Failover clustering, because it is designed primarily to distribute TCP/IP traffic between stateless servers.",
      "Network Load Balancing (NLB), because it provides redundancy at the TCP/IP/network layer without requiring the applications to operate as a cluster.",
      "Storage Spaces Direct, because pooling the web servers' storage automatically distributes incoming HTTP requests.",
      "Storage Replica, because synchronising the servers allows each incoming request to be directed to the least-used server."
    ],
    "correctAnswers": [
      "Network Load Balancing (NLB), because it provides redundancy at the TCP/IP/network layer without requiring the applications to operate as a cluster."
    ],
    "points": 2,
    "explanation": "NLB distributes network traffic across servers and is particularly suited to **stateless** workloads. Failover clustering instead provides high availability for **stateful** workloads with shared data."
  },
  {
    "id": "ITCOA_W6_Q1_2",
    "type": "open-ended",
    "sectionLabel": "1.2",
    "tags": [
      "NLB",
      "system design"
    ],
    "text": "NLB is primarily designed for applications that do not maintain long-term connection or memory state. What **one word** describes this type of application?",
    "correctAnswers": [
      "Stateless"
    ],
    "points": 2,
    "validationOptions": {
      "caseSensitive": false,
      "tolerance": 0
    },
    "explanation": "Stateless applications do not depend on data retained between requests, which is why they can be freely load-balanced across servers."
  },
  {
    "id": "ITCOA_W6_Q1_3",
    "type": "multiple-choice",
    "sectionLabel": "1.3",
    "tags": [
      "NLB",
      "failover clustering",
      "system design"
    ],
    "text": "NovaTech's public website is appropriate for NLB, but its stateful production-management application requires shared data and must continue operating if one node fails. Which distinction best explains why failover clustering is more appropriate for the production application?",
    "options": [
      "NLB operates only on physical servers, whereas failover clustering operates only on virtual machines.",
      "NLB provides high availability primarily through TCP/IP traffic distribution, whereas failover clustering provides high availability for stateful workloads that can access shared data.",
      "NLB requires shared storage, whereas failover clustering cannot use shared storage.",
      "NLB is designed for stateful applications, whereas failover clustering is restricted to stateless websites."
    ],
    "correctAnswers": [
      "NLB provides high availability primarily through TCP/IP traffic distribution, whereas failover clustering provides high availability for stateful workloads that can access shared data."
    ],
    "points": 2,
    "explanation": "The two technologies solve different problems: NLB distributes network traffic, while failover clustering keeps stateful, shared-data workloads available across node failure."
  },
  {
    "id": "ITCOA_W6_Q1_4",
    "type": "fill-in-the-blank",
    "sectionLabel": "1.4",
    "tags": [
      "NLB",
      "network protocols"
    ],
    "text": "The virtual IP address through which clients access an NLB cluster is referred to as the ___ IP.",
    "blanks": [
      {
        "id": "b1",
        "options": [
          "Physical",
          "Shared",
          "Virtual",
          "Cluster"
        ],
        "correctAnswer": "Virtual"
      }
    ],
    "points": 2,
    "explanation": "Clients connect to the Virtual IP (VIP) of the NLB cluster rather than to any individual node."
  },
  {
    "id": "ITCOA_W6_Q1_5",
    "type": "show-answer",
    "sectionLabel": "1.5",
    "tags": [
      "NLB",
      "failover clustering",
      "systems thinking",
      "system design"
    ],
    "text": "NovaTech's infrastructure manager argues: \"We should simply use NLB for everything. If one server fails, another server can take over the traffic.\" Critically evaluate this proposal. Your answer must distinguish NLB from failover clustering; explain why the **statefulness of the workload** matters; identify the storage requirement associated with failover clustering; apply the distinction to **both** NovaTech's public website and production-management application; and reach a justified architectural recommendation.",
    "correctAnswers": [
      "NLB provides redundancy at the TCP/IP layer and is particularly suited to **stateless applications** because requests can be handled by different servers without requiring persistent application state. The public website therefore represents a strong NLB use case: requests can be distributed between WEB01, WEB02 and WEB03 without requiring the individual servers to maintain shared application state.\n\nFailover clustering is instead designed to provide high availability for **stateful workloads**, particularly where cluster nodes access shared data. NovaTech's production-management application therefore cannot automatically be treated like its public website — it depends on important operational data, so failover clustering is more appropriate. The cluster nodes require access to the shared storage used by the clustered workload.\n\nThe manager's proposal is therefore too broad: **NLB and failover clustering solve different availability problems**. The correct design is to use NLB for the stateless website while assessing the production application's state and shared-storage requirements before selecting failover clustering."
    ],
    "markingGuide": "| Criterion | Marks |\n|---|---|\n| Correctly explains NLB | 1 |\n| Identifies stateless workload suitability | 1 |\n| Correctly explains failover clustering | 1 |\n| Identifies stateful workload characteristic | 1 |\n| Explains shared-data/storage requirement | 1 |\n| Applies NLB specifically to public website | 1 |\n| Applies failover clustering specifically to production application | 1 |\n| Makes a justified comparative conclusion | 1 |\n| **Total** | **8** |\n\n**Common errors (cap at 4/8):** treating NLB and failover clustering as interchangeable forms of redundancy without discussing statefulness or shared storage.",
    "points": 8
  },
  {
    "id": "ITCOA_W6_Q2_1",
    "type": "multiple-choice",
    "sectionLabel": "2.1",
    "tags": [
      "NLB",
      "system configuration"
    ],
    "text": "NovaTech decides to deploy its public website across WEB01, WEB02 and WEB03 using Windows NLB. The infrastructure team wants to temporarily remove WEB02 from handling new requests while performing maintenance, without shutting down the entire NLB environment. Which approach best fits the purpose of NLB?",
    "options": [
      "Remove the entire NLB cluster and recreate it after maintenance.",
      "Stop NLB processing on the relevant node/NIC so another node can handle the workload.",
      "Convert WEB02 into a failover-cluster node before performing maintenance.",
      "Remove WEB02's shared storage from the cluster."
    ],
    "correctAnswers": [
      "Stop NLB processing on the relevant node/NIC so another node can handle the workload."
    ],
    "points": 2,
    "image": {
        src: "/images/ITCOA_W6_Q2.png",
        alt: "Enterprise web infrastructure showing client traffic entering a network boundary and reaching three equivalent web servers, WEB01, WEB02, and WEB03, through a service entry point.",
        caption: "Figure 2 — NovaTech Web Infrastructure"
        },
    "explanation": "NLB allows an individual node to be taken out of service for maintenance without taking the entire load-balanced environment offline."
  },
  {
    "id": "ITCOA_W6_Q2_2",
    "type": "open-ended",
    "sectionLabel": "2.2",
    "tags": [
      "NLB",
      "system configuration"
    ],
    "text": "What command allows an NLB node to stop accepting new work while allowing existing connections to complete?",
    "correctAnswers": [
      "drainstop"
    ],
    "points": 2,
    "validationOptions": {
      "caseSensitive": false,
      "tolerance": 15,
      "allowPartialMatch": true
    },
    "explanation": "`drainstop` stops a node from accepting new connections while letting existing connections finish gracefully."
  },
  {
    "id": "ITCOA_W6_Q2_3",
    "type": "multiple-choice",
    "sectionLabel": "2.3",
    "tags": [
      "NLB",
      "technological impact"
    ],
    "text": "NovaTech's network team recommends buying a dedicated hardware load balancer because it would provide capabilities beyond Windows NLB. Which capability specifically distinguishes many dedicated load-balancing appliances from the built-in Windows NLB functionality described in the learning material?",
    "options": [
      "TCP/IP traffic distribution",
      "Node removal for maintenance",
      "SSL termination/offloading",
      "Support for stateless applications"
    ],
    "correctAnswers": [
      "SSL termination/offloading"
    ],
    "points": 2,
    "explanation": "Dedicated appliances often add capabilities such as SSL termination/offloading beyond the basic Windows NLB functionality."
  },
  {
    "id": "ITCOA_W6_Q2_4",
    "type": "fill-in-the-blank",
    "sectionLabel": "2.4",
    "tags": [
      "NLB",
      "network protocols"
    ],
    "text": "Windows NLB operates at the ___ level rather than requiring the server operating systems themselves to coordinate application failover.",
    "blanks": [
      {
        "id": "b1",
        "options": [
          "HTTP",
          "Application",
          "TCP/IP",
          "Physical"
        ],
        "correctAnswer": "TCP/IP"
      }
    ],
    "points": 2,
    "explanation": "NLB works at the network/TCP-IP level, distributing incoming traffic among participating nodes."
  },
  {
    "id": "ITCOA_W6_Q2_5",
    "type": "show-answer",
    "sectionLabel": "2.5",
    "tags": [
      "NLB",
      "managerial impact",
      "technological impact"
    ],
    "text": "NovaTech's CIO asks whether it should purchase an expensive dedicated hardware load balancer or use Windows NLB. Recommend an approach for the **public website**, considering: (1) the nature of the workload; (2) cost and environmental complexity; (3) maintenance flexibility; (4) the capabilities of Windows NLB; and (5) a limitation that might justify dedicated hardware. Your answer must make a **context-specific recommendation**, rather than claiming that one technology is universally superior.",
    "correctAnswers": [
      "For NovaTech's public website, Windows NLB is an appropriate choice if the website remains stateless and its requirements are limited to network-level load distribution and availability.\n\nNLB has the advantage of being integrated into the Windows Server environment and can distribute traffic across multiple web servers. Individual nodes can also be taken out of service for maintenance (using `drainstop`), reducing operational disruption.\n\nA dedicated hardware or virtual load-balancing solution may nevertheless be justified if NovaTech requires capabilities beyond NLB, such as **SSL termination/offloading**, or requires more advanced load-balancing functionality.\n\nTherefore, NovaTech should not automatically purchase dedicated hardware merely because it provides more features. If the website's requirements are adequately met by NLB, the simpler Windows-based approach may be preferable. Dedicated infrastructure becomes more compelling when the organisation's requirements exceed what NLB provides."
    ],
    "markingGuide": "| Element | Marks |\n|---|---|\n| Identifies suitability of NLB for website | 1 |\n| Explains NLB's traffic-distribution role | 1 |\n| Identifies operational/maintenance benefit | 1 |\n| Identifies legitimate reason for dedicated hardware | 1 |\n| Considers cost/complexity | 1 |\n| Gives contextual recommendation | 1 |\n| **Total** | **6** |",
    "points": 6
  },
  {
    "id": "ITCOA_W6_Q3_1",
    "type": "multiple-choice",
    "sectionLabel": "3.1",
    "tags": [
      "failover clustering",
      "system design"
    ],
    "text": "NovaTech wants to protect its production virtual machines. The company has two Windows Server 2019 Hyper-V hosts, HV01 and HV02. Both hosts must be capable of running the virtual machines currently hosted in the environment. Which design most directly provides the required high availability?",
    "options": [
      "Place all VMs on HV01 and use NLB to distribute TCP/IP traffic between the VMs.",
      "Cluster HV01 and HV02, provide both hosts with access to shared storage containing the virtual hard disks, and configure failover clustering.",
      "Install Docker on HV01 and package each VM as a container.",
      "Configure Storage Replica between the two hosts without configuring failover clustering."
    ],
    "correctAnswers": [
      "Cluster HV01 and HV02, provide both hosts with access to shared storage containing the virtual hard disks, and configure failover clustering."
    ],
    "points": 2,
    "image": {
        src: "/images/ITCOA_W6_Q3.1.png",
        alt: "Virtualisation environment showing two equivalent hosts, multiple virtual machines, shared storage, a virtual network, and Active Directory.",
        caption: "Figure 3.1 — NovaTech Virtualisation Environment"
        },
    "explanation": "Clustering the Hyper-V hosts with shared storage for the VHDs is the standard architecture for host-level VM high availability."
  },
  {
    "id": "ITCOA_W6_Q3_2",
    "type": "fill-in-the-blank",
    "sectionLabel": "3.2",
    "tags": [
      "failover clustering",
      "system configuration"
    ],
    "text": "In the cluster creation process, the unique name shared by the cluster and represented as an object in Active Directory is called the Cluster Name ___.",
    "blanks": [
      {
        "id": "b1",
        "options": [
          "Server",
          "Node",
          "Domain",
          "Object"
        ],
        "correctAnswer": "Object"
      }
    ],
    "points": 2,
    "explanation": "The Cluster Name Object (CNO) provides the unique cluster identity represented in Active Directory."
  },
  {
    "id": "ITCOA_W6_Q3_3",
    "type": "multiple-choice",
    "sectionLabel": "3.3",
    "tags": [
      "failover clustering",
      "validation & verification"
    ],
    "text": "Before creating the production cluster, the infrastructure team runs cluster validation. Why is this step important?",
    "options": [
      "It automatically converts a non-clustered server into a cluster.",
      "It verifies whether the proposed cluster configuration meets the necessary requirements before the cluster is created.",
      "It distributes web traffic across the proposed nodes.",
      "It replicates all application data to a remote site."
    ],
    "correctAnswers": [
      "It verifies whether the proposed cluster configuration meets the necessary requirements before the cluster is created."
    ],
    "points": 2,
    "explanation": "Validation checks whether the proposed configuration meets requirements before production workloads are placed on the cluster."
  },
  {
    "id": "ITCOA_W6_Q3_4",
    "type": "open-ended",
    "sectionLabel": "3.4",
    "tags": [
      "failover clustering",
      "system configuration"
    ],
    "text": "What Windows Server management tool provides the Validate Configuration and Create Cluster actions described in the learning material?",
    "correctAnswers": [
      "Failover Cluster Manager"
    ],
    "points": 2,
    "validationOptions": {
      "caseSensitive": false,
      "tolerance": 15,
      "allowPartialMatch": true
    },
    "explanation": "Failover Cluster Manager is the MMC snap-in used to validate and create failover clusters."
  },
  {
    "id": "ITCOA_W6_Q3_5",
    "type": "multiple-choice",
    "sectionLabel": "3.5",
    "tags": [
      "failover clustering",
      "validation & verification"
    ],
    "text": "During validation, the team receives a yellow result for one configuration test. According to the material, what is the most appropriate interpretation?",
    "options": [
      "The cluster is guaranteed to fail.",
      "The configuration is completely invalid and cannot be created.",
      "The configuration may work, but the result indicates that recommended best practices are not necessarily being followed.",
      "The test was skipped because yellow means the test was not applicable."
    ],
    "correctAnswers": [
      "The configuration may work, but the result indicates that recommended best practices are not necessarily being followed."
    ],
    "points": 2,
    "explanation": "Green indicates good, red indicates a problem, and yellow indicates the configuration may work but does not necessarily follow best practices."
  },
  {
    "id": "ITCOA_W6_Q3_6",
    "type": "show-answer",
    "sectionLabel": "3.6",
    "tags": [
      "failover clustering",
      "validation & verification",
      "systems thinking"
    ],
    "text": "The CIO asks you to explain why validation should occur before production cluster creation, rather than simply creating the cluster and troubleshooting problems afterwards. Using NovaTech's HV01/HV02 environment, explain: what the validation process establishes; why storage-related tests require particular caution in a production environment; what the cluster creation process subsequently establishes; the role of the Cluster Name Object; and how this process reduces operational risk.",
    "correctAnswers": [
      "Cluster validation should occur before production deployment because it establishes whether the proposed cluster configuration is suitable **before** workloads depend upon it.\n\nFor NovaTech, validation can identify problems in the proposed HV01/HV02 environment before the cluster is created. A new cluster should generally have the recommended validation tests performed so the infrastructure is comprehensively checked.\n\nStorage testing requires particular care on an existing production environment because some storage tests can temporarily take the cluster offline. Such tests should therefore be scheduled with reference to maintenance windows and operational impact.\n\nOnce the configuration has been successfully validated, the Create Cluster wizard identifies the servers that will form the cluster and establishes the cluster's administrative identity, represented as the **Cluster Name Object (CNO)** in Active Directory.\n\nThis sequence reduces operational risk because NovaTech verifies the infrastructure **before** assigning production workloads to it — it is preferable to discover an incompatibility during controlled validation rather than after a production node fails."
    ],
    "markingGuide": "| Element | Marks |\n|---|---|\n| Explains purpose of validation | 1 |\n| Applies validation to HV01/HV02 | 1 |\n| Identifies full testing as appropriate for a new cluster | 1 |\n| Explains storage-test operational risk | 1 |\n| Identifies maintenance-window consideration | 1 |\n| Explains subsequent cluster creation | 1 |\n| Explains CNO | 1 |\n| Connects validation to operational risk reduction | 1 |\n| **Total** | **8** |",
    "points": 8
  },
  {
    "id": "ITCOA_W6_Q4_1",
    "type": "multiple-choice",
    "sectionLabel": "4.1",
    "tags": [
      "clustering tiers",
      "system design"
    ],
    "text": "NovaTech has two different availability requirements. Requirement A: A particular service running inside Windows Server must remain available if its primary server fails. Requirement A is best described as:",
    "options": [
      "Host-layer clustering",
      "Application-layer clustering",
      "Storage replication",
      "Network load balancing"
    ],
    "correctAnswers": [
      "Application-layer clustering"
    ],
    "points": 2,
    image: {
        src: "/images/ITCOA_W6_Q4.1.png",
        alt: "Side-by-side comparison of two infrastructure architectures showing application services on multiple servers in one architecture and virtual machines across multiple hosts in another.",
        caption: "Figure 4.1 — Two Infrastructure Arrangements"
        },
    "explanation": "A single service/role being made redundant is application-layer clustering, not host-layer clustering."
  },
  {
    "id": "ITCOA_W6_Q4_2",
    "type": "fill-in-the-blank",
    "sectionLabel": "4.2",
    "tags": [
      "clustering tiers",
      "system design"
    ],
    "text": "Requirement B: Two physical Hyper-V hosts each run several VMs. If one physical host fails, the other host must be able to run the affected VMs. Requirement B represents clustering at the ___ layer.",
    "blanks": [
      {
        "id": "b1",
        "options": [
          "Application",
          "Storage",
          "Host",
          "Network"
        ],
        "correctAnswer": "Host"
      }
    ],
    "points": 2,
    "explanation": "Protecting the physical Hyper-V hosts so VMs can fail over between them is host-layer clustering."
  },
  {
    "id": "ITCOA_W6_Q4_3",
    "type": "multiple-choice",
    "sectionLabel": "4.3",
    "tags": [
      "clustering tiers",
      "systems thinking"
    ],
    "text": "Which statement best distinguishes the two clustering tiers?",
    "options": [
      "Application-layer clustering makes an entire physical server redundant, whereas host-layer clustering makes only one application redundant.",
      "Application-layer clustering focuses on a particular service or role, whereas host-layer clustering provides redundancy for workloads hosted by physical Hyper-V servers.",
      "Application-layer clustering is used only with NLB, whereas host-layer clustering is used only with S2D.",
      "There is no meaningful difference; the terms refer to the same architecture."
    ],
    "correctAnswers": [
      "Application-layer clustering focuses on a particular service or role, whereas host-layer clustering provides redundancy for workloads hosted by physical Hyper-V servers."
    ],
    "points": 2,
    "explanation": "The two tiers protect different failure domains: a specific service versus the physical host running virtualised workloads."
  },
  {
    "id": "ITCOA_W6_Q4_4",
    "type": "show-answer",
    "sectionLabel": "4.4",
    "tags": [
      "clustering tiers",
      "systems thinking",
      "technological impact"
    ],
    "text": "A junior administrator says: \"If we cluster our application, we don't need to cluster our Hyper-V hosts.\" Explain why this conclusion does not necessarily follow. Use **both clustering tiers** to explain how NovaTech could protect different failure points in its infrastructure.",
    "correctAnswers": [
      "Clustering an application and clustering its host infrastructure protect **different failure domains**.\n\nApplication-layer clustering focuses on a particular service or role. If that service fails on one node, another suitable node can provide the required service.\n\nHost-layer clustering is broader. In NovaTech's Hyper-V environment, the physical hosts themselves are clustered so that the VMs running on a failed Hyper-V host can be brought up on another host.\n\nTherefore, clustering an application does not automatically protect the physical infrastructure hosting it. Conversely, protecting the Hyper-V hosts does not necessarily make every individual application internally redundant.\n\nNovaTech may therefore need **both** levels: application-layer clustering for critical services and host-layer clustering for the virtualisation infrastructure."
    ],
    "markingGuide": "| Element | Marks |\n|---|---|\n| Explains application-layer clustering | 1 |\n| Explains host-layer clustering | 1 |\n| Identifies different failure domains | 1 |\n| Explains why one does not automatically replace the other | 2 |\n| Applies to NovaTech | 1 |\n| **Total** | **6** |",
    "points": 6
  },
  {
    "id": "ITCOA_W6_Q5_1",
    "type": "multiple-choice",
    "sectionLabel": "5.1",
    "tags": [
      "Windows Server 2019",
      "system configuration"
    ],
    "text": "NovaTech has a two-node failover cluster and wants to avoid maintaining a separate Windows Server solely to act as a witness. Which Windows Server 2019 improvement is directly relevant?",
    "options": [
      "Docker image tagging",
      "USB witness",
      "NLB drainstop",
      "Nano Server"
    ],
    "correctAnswers": [
      "USB witness"
    ],
    "points": 2,
    "explanation": "Windows Server 2019 allows a two-node cluster to use a USB-based witness instead of a dedicated Windows Server witness."
  },
  {
    "id": "ITCOA_W6_Q5_2",
    "type": "open-ended",
    "sectionLabel": "5.2",
    "tags": [
      "Storage Replica",
      "backup & recovery"
    ],
    "text": "What technology provides block-level data replication between servers, including across physical sites?",
    "correctAnswers": [
      "Storage Replica"
    ],
    "points": 2,
    "validationOptions": {
      "caseSensitive": false,
      "tolerance": 15
    },
    "explanation": "Storage Replica synchronises data at the block level between servers, including across physical sites."
  },
  {
    "id": "ITCOA_W6_Q5_3",
    "type": "multiple-choice",
    "sectionLabel": "5.3",
    "tags": [
      "Storage Replica",
      "backup & recovery"
    ],
    "text": "NovaTech plans a multi-site failover cluster. Why is Storage Replica particularly important to this design?",
    "options": [
      "It distributes incoming TCP traffic between sites.",
      "It provides the synchronisation of data required to make failover between physical locations possible.",
      "It replaces the need for cluster nodes.",
      "It converts VMs into containers."
    ],
    "correctAnswers": [
      "It provides the synchronisation of data required to make failover between physical locations possible."
    ],
    "points": 2,
    "explanation": "Storage Replica keeps data synchronised across sites, which is required for multi-site failover to work."
  },
  {
    "id": "ITCOA_W6_Q5_4",
    "type": "fill-in-the-blank",
    "sectionLabel": "5.4",
    "tags": [
      "S2D",
      "system configuration"
    ],
    "text": "In Windows Server 2019, ReFS volumes hosted by S2D gained improved support for deduplication and ___.",
    "blanks": [
      {
        "id": "b1",
        "options": [
          "encryption",
          "compression",
          "replication",
          "indexing"
        ],
        "correctAnswer": "compression"
      }
    ],
    "points": 2,
    "explanation": "Windows Server 2019 improved ReFS support for deduplication and compression on S2D volumes."
  },
  {
    "id": "ITCOA_W6_Q5_5",
    "type": "show-answer",
    "sectionLabel": "5.5",
    "tags": [
      "Storage Replica",
      "failover clustering",
      "systems thinking"
    ],
    "text": "NovaTech's IT manager says: \"Storage Replica and failover clustering are basically the same thing because both are about redundancy.\" Explain why this statement is technically incomplete. Your answer should distinguish the **purpose of Storage Replica** from the purpose of **failover clustering**, and explain how the technologies can complement one another.",
    "correctAnswers": [
      "Failover clustering and Storage Replica contribute to redundancy at different levels.\n\nFailover clustering provides high availability by allowing clustered workloads to operate on another node when a node fails, particularly for stateful workloads with appropriate shared storage.\n\nStorage Replica is a **block-level data-replication technology** that synchronises data between servers, including across physical sites. This makes it particularly useful when designing multi-site failover because the relevant data needs to be synchronised between locations.\n\nTherefore, Storage Replica is not itself synonymous with failover clustering. Rather, the technologies can **complement one another**: replication can provide the data synchronisation needed for a multi-site design, while clustering can provide the workload failover mechanism."
    ],
    "markingGuide": "| Element | Marks |\n|---|---|\n| Correctly explains failover clustering | 1 |\n| Correctly explains Storage Replica | 1 |\n| Distinguishes workload failover from data replication | 1 |\n| Explains complementary use | 1 |\n| **Total** | **4** |",
    "points": 4
  },
  {
    "id": "ITCOA_W6_Q6_1",
    "type": "multiple-choice",
    "sectionLabel": "6.1",
    "tags": [
      "S2D",
      "system design"
    ],
    "text": "NovaTech currently operates an expensive traditional storage platform. The infrastructure team proposes Storage Spaces Direct (S2D). Which description best captures the fundamental architectural idea behind S2D as taught in the material?",
    "options": [
      "It requires a specialised SAN and dedicated storage fabric between every cluster node.",
      "It combines storage from Windows Servers connected through networking to create a redundant, software-defined storage platform without requiring specialised storage hardware.",
      "It is Microsoft's replacement for NLB and distributes TCP/IP traffic between servers.",
      "It is a container orchestration platform that stores Docker images."
    ],
    "correctAnswers": [
      "It combines storage from Windows Servers connected through networking to create a redundant, software-defined storage platform without requiring specialised storage hardware."
    ],
    "points": 2,
    image: {
        src: "/images/ITCOA_W6_Q6.1.png",
        alt: "Two servers containing multiple local disks connected through a network to a storage pool and virtual volume supporting an application workload.",
        caption: "Figure 6.1 — NovaTech Storage Architecture"
        },
    "explanation": "S2D is a software-defined storage architecture built from internal storage across networked, clustered Windows Servers."
  },
  {
    "id": "ITCOA_W6_Q6_2",
    "type": "open-ended",
    "sectionLabel": "6.2",
    "tags": [
      "S2D"
    ],
    "text": "What three-letter abbreviation is used for Storage Spaces Direct?",
    "correctAnswers": [
      "S2D"
    ],
    "points": 2,
    "validationOptions": {
      "caseSensitive": false,
      "tolerance": 0
    },
    "explanation": "Storage Spaces Direct is abbreviated as S2D."
  },
  {
    "id": "ITCOA_W6_Q6_3",
    "type": "multiple-choice",
    "sectionLabel": "6.3",
    "tags": [
      "S2D",
      "managerial impact"
    ],
    "text": "NovaTech's finance director asks why S2D could be attractive compared with purchasing a traditional dedicated storage appliance. Which answer is most conceptually accurate?",
    "options": [
      "S2D eliminates the need for networking.",
      "S2D can construct network-based, redundant storage using Windows Servers rather than requiring specialised storage hardware and special storage connectivity.",
      "S2D removes the need for redundancy because each server stores a separate independent copy.",
      "S2D works only when every server comes from exactly the same manufacturer."
    ],
    "correctAnswers": [
      "S2D can construct network-based, redundant storage using Windows Servers rather than requiring specialised storage hardware and special storage connectivity."
    ],
    "points": 2,
    "explanation": "S2D's attraction is architectural: it builds redundant storage from standard, networked Windows Servers rather than specialised hardware."
  },
  {
    "id": "ITCOA_W6_Q6_4",
    "type": "multiple-choice",
    "sectionLabel": "6.4",
    "tags": [
      "S2D",
      "system configuration"
    ],
    "text": "NovaTech wants to manage its S2D environment using Windows Admin Center. Which statement is consistent with the learning material?",
    "options": [
      "WAC cannot manage S2D; only third-party storage software can.",
      "Windows Server 2019 removed all WAC functionality for S2D.",
      "WAC includes tools and functionality for defining and managing S2D clusters.",
      "WAC is required to replace Windows Server clustering completely."
    ],
    "correctAnswers": [
      "WAC includes tools and functionality for defining and managing S2D clusters."
    ],
    "points": 2,
    "explanation": "Windows Admin Center provides tools for configuring and managing S2D environments."
  },
  {
    "id": "ITCOA_W6_Q6_5",
    "type": "show-answer",
    "sectionLabel": "6.5",
    "tags": [
      "S2D",
      "managerial impact",
      "technological impact"
    ],
    "text": "The finance director asks: \"Why would we choose S2D rather than simply buying another traditional SAN?\" Using only concepts relevant to NovaTech's scenario and the material, evaluate the architectural rationale for S2D. Your answer should discuss: the hardware philosophy of S2D; networking; redundancy; scalability/architecture; the role of Windows Server clustering; and why S2D is more than simply \"putting disks in several servers.\"",
    "correctAnswers": [
      "S2D is attractive to NovaTech because it implements a **software-defined storage architecture** using Windows Servers, internal storage and networking rather than requiring a traditional dedicated storage appliance.\n\nThe architecture allows storage from participating servers to form part of a redundant storage platform. Networking therefore becomes an important part of the storage architecture, while **Windows Server clustering** provides the surrounding high-availability framework.\n\nThis can reduce NovaTech's dependence on specialised storage hardware and may provide a more integrated approach in an environment already based on Windows Server.\n\nHowever, S2D should not be understood simply as \"putting disks into multiple servers.\" Its significance is that storage, compute, networking and clustering are combined into a software-defined architecture.\n\nFor NovaTech, S2D is therefore potentially attractive where the organisation wants to reduce dependence on dedicated storage infrastructure while retaining redundancy and centralised management."
    ],
    "markingGuide": "| Element | Marks |\n|---|---|\n| Identifies software-defined storage concept | 1 |\n| Explains use of Windows Servers/internal storage | 1 |\n| Explains networking role | 1 |\n| Explains redundancy/clustering relationship | 1 |\n| Connects to reduced specialised-hardware dependence | 1 |\n| Gives architectural rather than purely installation-based explanation | 1 |\n| **Total** | **6** |",
    "points": 6
  },
  {
    "id": "ITCOA_W6_Q7_1",
    "type": "multiple-choice",
    "sectionLabel": "7.1",
    "tags": [
      "containers",
      "system design"
    ],
    "text": "NovaTech's development department has begun containerising applications. Application B processes commercially sensitive manufacturing information and requires substantially stronger isolation. Which container technology provides the stronger isolation model described in the learning material?",
    "options": [
      "Windows Server containers",
      "Hyper-V containers",
      "NLB containers",
      "S2D containers"
    ],
    "correctAnswers": [
      "Hyper-V containers"
    ],
    "points": 2,
    image: {
        src: "/images/ITCOA_W6_Q7.1.png",
        alt: "Side-by-side container architectures showing multiple containers associated with a Windows kernel in one architecture and separately isolated container environments in another.",
        caption: "Figure 7.1 — Container Deployment Architectures"
        },
    "explanation": "Hyper-V containers give each container its own isolated kernel environment, providing stronger isolation than Windows Server containers."
  },
  {
    "id": "ITCOA_W6_Q7_2",
    "type": "fill-in-the-blank",
    "sectionLabel": "7.2",
    "tags": [
      "containers",
      "system design"
    ],
    "text": "Windows Server containers share the host operating system's ___ resources, contributing to their efficiency.",
    "blanks": [
      {
        "id": "b1",
        "options": [
          "kernel",
          "memory",
          "disk",
          "network"
        ],
        "correctAnswer": "kernel"
      }
    ],
    "points": 2,
    "explanation": "Windows Server containers share the host kernel, which makes them lightweight and efficient."
  },
  {
    "id": "ITCOA_W6_Q7_3",
    "type": "multiple-choice",
    "sectionLabel": "7.3",
    "tags": [
      "containers",
      "technological impact"
    ],
    "text": "Why might NovaTech select Windows Server containers rather than Hyper-V containers for Application A, a lightweight internal reporting application?",
    "options": [
      "Windows Server containers provide stronger isolation than Hyper-V containers.",
      "Windows Server containers share kernel resources and therefore provide an efficient container model when the highest level of isolation is not required.",
      "Windows Server containers require a complete VM for every application.",
      "Windows Server containers cannot run applications."
    ],
    "correctAnswers": [
      "Windows Server containers share kernel resources and therefore provide an efficient container model when the highest level of isolation is not required."
    ],
    "points": 2,
    "explanation": "Windows Server containers are the efficient choice when strong isolation is not the primary requirement."
  },
  {
    "id": "ITCOA_W6_Q7_4",
    "type": "open-ended",
    "sectionLabel": "7.4",
    "tags": [
      "containers",
      "Windows Server 2019"
    ],
    "text": "What lightweight Windows Server technology discussed in the material can be used as a base operating system for containers?",
    "correctAnswers": [
      "Nano Server"
    ],
    "points": 2,
    "validationOptions": {
      "caseSensitive": false,
      "tolerance": 15
    },
    "explanation": "Nano Server is a minimal-footprint installation option well suited as a base OS for containers."
  },
  {
    "id": "ITCOA_W6_Q7_5",
    "type": "show-answer",
    "sectionLabel": "7.5",
    "tags": [
      "containers",
      "systems thinking",
      "technological impact"
    ],
    "text": "The development manager argues: \"Hyper-V containers are pointless because containers are supposed to be lightweight.\" Critically evaluate this statement. Your answer must explain: how Windows Server containers achieve efficiency; the isolation limitation associated with sharing host kernel resources; how Hyper-V containers address the stronger-isolation requirement; why Hyper-V containers can still be more efficient than dedicating a complete Hyper-V VM to the application; and which model you would choose for Applications A and B.",
    "correctAnswers": [
      "The statement confuses lightweight operation with the absence of isolation requirements.\n\nWindows Server containers share the host operating system's **kernel resources**. This contributes to their efficiency and makes them suitable where lightweight deployment is more important than the strongest possible isolation.\n\nHyper-V containers provide a stronger isolation model by using a dedicated Windows kernel environment for each container. They therefore provide isolation closer to that associated with virtualisation while retaining the container model, and remain more efficient than dedicating a complete Hyper-V VM to the application.\n\nNovaTech should consequently use **Windows Server containers for Application A**, where efficiency is the primary requirement, and **Hyper-V containers for Application B**, where commercially sensitive information creates a stronger isolation requirement.\n\nThe correct choice is therefore determined by the application's requirements rather than by assuming that the strongest isolation model is always the best solution."
    ],
    "markingGuide": "| Element | Marks |\n|---|---|\n| Explains Windows Server container efficiency | 1 |\n| Explains shared kernel | 1 |\n| Explains Hyper-V container isolation | 1 |\n| Distinguishes containers from full VMs conceptually | 1 |\n| Correct choice for Application A | 1 |\n| Correct choice for Application B + justification | 1 |\n| **Total** | **6** |",
    "points": 6
  },
  {
    "id": "ITCOA_W6_Q8_1",
    "type": "multiple-choice",
    "sectionLabel": "8.1",
    "tags": [
      "Docker",
      "system configuration"
    ],
    "text": "NovaTech has prepared a Windows Server 2019 container host and now needs to obtain and run application images. Which tool is the primary interface described in the material for downloading, creating, packaging, distributing and running containers?",
    "options": [
      "Kubernetes",
      "Docker",
      "Failover Cluster Manager",
      "Windows Admin Center"
    ],
    "correctAnswers": [
      "Docker"
    ],
    "points": 2,
    "explanation": "Docker is the platform and tooling for obtaining, creating, packaging, distributing and running containers."
  },
  {
    "id": "ITCOA_W6_Q8_2",
    "type": "fill-in-the-blank",
    "sectionLabel": "8.2",
    "tags": [
      "Docker",
      "system configuration"
    ],
    "text": "A repository containing container images that users can download and share is called Docker ___.",
    "blanks": [
      {
        "id": "b1",
        "options": [
          "Registry",
          "Store",
          "Repository",
          "Hub"
        ],
        "correctAnswer": "Hub"
      }
    ],
    "points": 2,
    "explanation": "Docker Hub is the image repository used to obtain and share container images."
  },
  {
    "id": "ITCOA_W6_Q8_3",
    "type": "multiple-choice",
    "sectionLabel": "8.3",
    "tags": [
      "Docker",
      "system configuration"
    ],
    "text": "NovaTech has identified an appropriate container image in an online repository. Which Docker command is most directly associated with downloading the image?",
    "options": [
      "docker run",
      "docker ps",
      "docker pull",
      "docker stop"
    ],
    "correctAnswers": [
      "docker pull"
    ],
    "points": 2,
    "explanation": "`docker pull` retrieves an image from a container image repository."
  },
  {
    "id": "ITCOA_W6_Q8_4",
    "type": "open-ended",
    "sectionLabel": "8.4",
    "tags": [
      "Docker",
      "system configuration"
    ],
    "text": "Which Docker command displays the containers currently running on the system?",
    "correctAnswers": [
      "docker ps"
    ],
    "points": 2,
    "validationOptions": {
      "caseSensitive": false,
      "tolerance": 0
    },
    "explanation": "`docker ps` lists the currently running containers."
  },
  {
    "id": "ITCOA_W6_Q8_5",
    "type": "multiple-choice",
    "sectionLabel": "8.5",
    "tags": [
      "Docker",
      "system configuration"
    ],
    "text": "A developer executes:\n\n```text\ndocker run -it --rm Microsoft\\windowsservercore:ltsc2019\n```\n\nWhich interpretation is most accurate?",
    "options": [
      "The command searches Docker Hub for the image but does not create a container.",
      "The command starts a container using the specified image/tag, provides an interactive shell, and automatically removes the container when it exits.",
      "The command deletes the image immediately and restarts Docker Engine.",
      "The command creates a Kubernetes cluster using the Windows Server Core image."
    ],
    "correctAnswers": [
      "The command starts a container using the specified image/tag, provides an interactive shell, and automatically removes the container when it exits."
    ],
    "points": 2,
    "explanation": "`-it` provides an interactive terminal and `--rm` removes the container automatically once it exits."
  },
  {
    "id": "ITCOA_W6_Q9_1",
    "type": "multiple-choice",
    "sectionLabel": "9.1",
    "tags": [
      "orchestration",
      "systems thinking"
    ],
    "text": "NovaTech initially runs five containers on one host and later plans to scale its application by running many containers across its infrastructure. The development team proposes continuing to manage every container individually using Docker commands. What fundamental problem emerges as NovaTech moves from a few containers to a larger application composed of many containers?",
    "options": [
      "Containers can no longer use images.",
      "The organisation needs orchestration to coordinate how multiple containers operate together.",
      "Docker becomes incapable of running Windows containers.",
      "NLB automatically becomes a container orchestrator."
    ],
    "correctAnswers": [
      "The organisation needs orchestration to coordinate how multiple containers operate together."
    ],
    "points": 2,
    image: {
        src: "/images/ITCOA_W6_Q9.1.png",
        alt: "Distributed containerised application spanning three compute nodes with web, API, and database workloads and a separate management layer.",
        caption: "Figure 9.1 — Distributed Containerised Application"
        },
    "explanation": "As the number of containers grows, manual management becomes inadequate and orchestration is required."
  },
  {
    "id": "ITCOA_W6_Q9_2",
    "type": "fill-in-the-blank",
    "sectionLabel": "9.2",
    "tags": [
      "orchestration",
      "Kubernetes"
    ],
    "text": "Kubernetes is a container ___ solution.",
    "blanks": [
      {
        "id": "b1",
        "options": [
          "virtualization",
          "replication",
          "orchestration",
          "clustering"
        ],
        "correctAnswer": "orchestration"
      }
    ],
    "points": 2,
    "explanation": "Kubernetes is a container orchestration platform that coordinates many containers."
  },
  {
    "id": "ITCOA_W6_Q9_3",
    "type": "multiple-choice",
    "sectionLabel": "9.3",
    "tags": [
      "Docker",
      "Kubernetes",
      "orchestration"
    ],
    "text": "Which statement best distinguishes Docker and Kubernetes in the context of the material?",
    "options": [
      "Docker primarily provides the container platform and tools for working with containers, while Kubernetes orchestrates multiple containers and facilitates their coordinated operation.",
      "Docker is the storage system and Kubernetes is the Windows kernel.",
      "Docker provides failover clustering while Kubernetes provides NLB.",
      "Docker is used only for Linux and Kubernetes is used only for Windows."
    ],
    "correctAnswers": [
      "Docker primarily provides the container platform and tools for working with containers, while Kubernetes orchestrates multiple containers and facilitates their coordinated operation."
    ],
    "points": 2,
    "explanation": "Docker provides the container platform/tooling; Kubernetes provides orchestration across many containers."
  },
  {
    "id": "ITCOA_W6_Q9_4",
    "type": "show-answer",
    "sectionLabel": "9.4",
    "tags": [
      "orchestration",
      "Kubernetes",
      "systems thinking"
    ],
    "text": "NovaTech expects its containerised application to scale up and down as demand changes. Explain why simply knowing how to create a container is insufficient for this requirement, and explain what Kubernetes contributes to the architecture. Your answer should demonstrate the distinction between **container creation/hosting** and **container orchestration**.",
    "correctAnswers": [
      "Creating and running an individual container addresses the problem of packaging and hosting an application. It does not, by itself, solve the problem of coordinating many containers.\n\nAs NovaTech's application grows, the organisation needs to manage multiple containers as components of one larger system. This creates an orchestration requirement.\n\nDocker provides the tools for working with containers and images, whereas **Kubernetes provides container orchestration**, allowing multiple containers to be coordinated and supporting the larger-scale operation of the application.\n\nTherefore, container creation is the foundation, while orchestration addresses the management of the resulting multi-container system."
    ],
    "markingGuide": "| Element | Marks |\n|---|---|\n| Explains individual container limitation | 1 |\n| Identifies scaling/multi-container coordination problem | 1 |\n| Correctly explains Kubernetes | 1 |\n| Distinguishes Docker from Kubernetes | 1 |\n| **Total** | **4** |",
    "points": 4
  },
  {
    "id": "ITCOA_W6_Q10_1",
    "type": "multiple-choice",
    "sectionLabel": "10.1",
    "tags": [
      "systems thinking",
      "system design",
      "technological impact"
    ],
    "text": "The CIO now asks you to produce a final recommendation for the infrastructure project, spanning the public website, stateful production application, virtualised workloads, storage, and containers. Which architecture is the most internally consistent with NovaTech's requirements?",
    "options": [
      "NLB for the website; failover clustering for stateful workloads and Hyper-V hosts; S2D for software-defined redundant storage; Windows Server containers for all applications; Docker alone for future orchestration.",
      "Failover clustering for the stateless website; NLB for stateful production workloads; S2D only for websites; Windows Server containers for every application regardless of isolation requirements.",
      "NLB for the stateless website; failover clustering for appropriate stateful/Hyper-V workloads; S2D where its software-defined storage model fits; container isolation selected according to requirements; Docker for container management and Kubernetes for orchestration.",
      "Kubernetes for the website; Docker for failover clustering; S2D for TCP/IP load balancing; Hyper-V containers for every workload regardless of performance requirements."
    ],
    "correctAnswers": [
      "NLB for the stateless website; failover clustering for appropriate stateful/Hyper-V workloads; S2D where its software-defined storage model fits; container isolation selected according to requirements; Docker for container management and Kubernetes for orchestration."
    ],
    "points": 2,
    image: {
        src: "/images/ITCOA_W6_Q10.1.png",
        alt: "Integrated enterprise infrastructure showing web servers, virtualisation hosts, virtual machines, local storage, containers, networking, Active Directory, and a second site connected by a WAN.",
        caption: "Figure 10.1 — NovaTech Infrastructure Environment"
        },
    "explanation": "This is the only option that maps every technology to the requirement it actually solves, rather than treating the technologies as interchangeable."
  },
  {
    "id": "ITCOA_W6_Q10_2",
    "type": "show-answer",
    "sectionLabel": "10.2",
    "tags": [
      "systems thinking",
      "system design",
      "technological impact",
      "managerial impact"
    ],
    "text": "You are the infrastructure consultant. Prepare a concise architectural recommendation to NovaTech's CIO. Your recommendation must integrate the technologies studied during the week rather than discussing them as isolated products. Specifically, justify: when NLB should be used and when it should not; when failover clustering is appropriate; how clustering can operate at different tiers; the role of Storage Replica in an appropriate multi-site redundancy strategy; why S2D may be attractive to NovaTech; how the choice between Windows Server and Hyper-V containers should be made; the distinct roles of Docker and Kubernetes; and the principle that the infrastructure decision should be driven by the workload and availability/isolation requirement, rather than by choosing the newest technology. Your answer should explicitly identify at least **two situations where choosing the technically more powerful option would not necessarily be the best engineering decision**.",
    "correctAnswers": [
      "NovaTech should not adopt one redundancy or container technology indiscriminately. Each technology should be selected according to the characteristics of the workload.\n\nFor the **public stateless website**, Windows NLB is appropriate because it distributes TCP/IP traffic across multiple servers and is particularly suited to stateless applications. It also allows individual nodes to be removed for maintenance without taking the entire environment offline.\n\nThe **stateful production workloads** should instead be evaluated for failover clustering, which provides high availability for stateful workloads with access to shared data. For the Hyper-V environment, clustering the hosts (host-layer clustering) allows virtual machines to fail over to another Hyper-V host if the original host fails — distinct from application-layer clustering of a single service.\n\nAt the storage level, **Storage Spaces Direct** is potentially attractive because NovaTech can construct a redundant, network-based software-defined storage platform from Windows Servers rather than relying entirely on specialised storage hardware, addressing the finance department's cost concern.\n\nIf NovaTech extends its redundancy architecture across physical sites, **Storage Replica** becomes relevant because it provides block-level data replication between servers, supplying the data synchronisation required for multi-site failover.\n\nFor containers, the choice should be based on the required isolation. **Windows Server containers** are efficient because they share host kernel resources and suit workloads where the isolation requirement is modest. **Hyper-V containers** provide stronger isolation and are more appropriate for NovaTech's sensitive application.\n\nFinally, **Docker and Kubernetes have different roles**: Docker provides the platform and commands for obtaining, creating, packaging, distributing and running containers, while Kubernetes provides orchestration, coordinating many containers as a scalable application.\n\nTwo examples show why the most powerful technology is not automatically the best choice. NovaTech does not need Hyper-V containers merely because they provide stronger isolation if a lightweight application does not require that level of separation. Similarly, it does not need an expensive dedicated hardware load balancer simply because such an appliance can provide capabilities beyond Windows NLB if the public website's requirements can be met adequately by NLB.\n\nThe overarching architectural principle is therefore **requirement-driven selection**: NLB addresses network-level distribution for suitable stateless workloads; failover clustering addresses high availability for appropriate stateful workloads; S2D addresses software-defined redundant storage; Storage Replica supports replicated data between sites; and Docker/Kubernetes address different layers of the container lifecycle."
    ],
    "markingGuide": "| Assessment criterion | Marks |\n|---|---|\n| Correctly justifies NLB for stateless website | 1 |\n| Correctly justifies failover clustering for stateful/Hyper-V workloads | 1 |\n| Correctly distinguishes application/host clustering | 1 |\n| Correctly explains S2D's architectural role | 1 |\n| Correctly explains Storage Replica and distinguishes it from clustering | 1 |\n| Correctly differentiates Windows Server and Hyper-V containers | 1 |\n| Correctly differentiates Docker and Kubernetes | 1 |\n| Provides integrated requirement-driven conclusion with two over-engineering examples | 1 |\n| **Total** | **8** |",
    "points": 8
  }
];