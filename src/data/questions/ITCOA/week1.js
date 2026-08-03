// src/data/questions/ITCOA/week1.js

export default [
  // ── Scenario ─────────────────────────────────────────────
  {
    id: 'SCENARIO_ITCOA_W1',
    type: 'scenario',
    title: 'Ubuntu Retail Group (URG) National Infrastructure Upgrade (100 Marks)',
    context: `Ubuntu Retail Group (URG) is one of South Africa's largest retail distributors, operating warehouses, regional offices and retail branches across all nine provinces. The company is replacing its ageing server infrastructure with a centralized Windows Server 2019 environment to improve security, administration, scalability and disaster recovery.

The new infrastructure will include:
• Windows Server 2019 deployed in multiple regional data centres.
• Active Directory services for centralized authentication.
• File and Print services for branch offices.
• Hyper-V virtual machines hosting inventory, payroll and warehouse applications.
• Windows Admin Center for centralized server administration.
• Server Manager for role deployment.
• Remote Desktop for remote administration.
• Standardized operating system deployment for new branch servers.
• A disaster recovery strategy using master server images.
• Performance monitoring for production servers.

Following the pilot deployment, several issues were reported:
• Different branches were running different server configurations.
• One warehouse server became extremely slow during stocktaking despite no hardware failures.
• Administrators manually installed and configured each new branch server.
• A regional office experienced prolonged downtime because replacement servers had to be rebuilt manually.
• Several departments requested additional server roles without understanding their impact.
• IT technicians disagreed on whether virtualization or additional physical servers would provide the best long-term solution.

Unless otherwise stated, all questions relate to Ubuntu Retail Group (URG).`,
  },

  // ═══════════════════════════════════════════════════════════
  // QUESTION 1 — Centralized Server Infrastructure & Deployment Planning (25 Marks)
  // ═══════════════════════════════════════════════════════════

  // ── 1.1 Multiple Choice ──────────────────────────────────
  {
    id: 'ITCOA_W1_Q1',
    type: 'multiple-choice',
    sectionLabel: '1.1',
    tags: ['system configuration'],
    text: 'Which Windows Server technology most directly enables URG to consolidate several physical servers into virtual machines hosted on one server?',
    options: [
      'Active Directory Domain Services',
      'Hyper-V',
      'Windows Defender ATP',
      'Group Policy Management Console',
    ],
    correctAnswers: ['Hyper-V'],
    points: 2,
    explanation: '**Hyper-V** is Microsoft\'s virtualization technology that enables multiple virtual machines to run on a single physical server, improving hardware utilization and simplifying server consolidation.',
  },

  // ── 1.2 Essay ────────────────────────────────────────────
  {
    id: 'ITCOA_W1_Q2',
    type: 'show-answer',
    sectionLabel: '1.2',
    text: 'URG is migrating from standalone branch servers to a centralized Windows Server infrastructure. Critically discuss **three phases** that should be completed before and during the migration to ensure a successful deployment. In your answer, relate each phase directly to the URG scenario.',
    correctAnswers: [
      'A successful migration to Windows Server 2019 requires careful planning, standardized implementation and thorough testing.\n\n' +
      '**Phase 1 — Planning and Assessment**\n\n' +
      'Before deployment, URG should assess its current infrastructure by identifying existing hardware, applications, storage requirements and network capacity. The organisation should determine which server roles are required, such as `Active Directory`, `File Services` and `Hyper-V`, while verifying that existing hardware supports Windows Server 2019. Proper planning reduces implementation risks and ensures the new environment supports business requirements.\n\n' +
      '**Phase 2 — Standardized Deployment and Configuration**\n\n' +
      'Once planning is complete, Windows Server should be deployed using a standardized configuration. Administrators should install the appropriate Windows Server edition, configure networking, apply updates and install only the required server roles using `Server Manager`. Standardizing deployments ensures every branch operates with the same configuration, reducing administrative complexity and configuration drift.\n\n' +
      '**Phase 3 — Testing, Validation and Ongoing Management**\n\n' +
      'Before production deployment, the new environment should be tested in a virtual environment to verify that applications, services and security settings function correctly. After successful testing, `Windows Admin Center` should be used for centralized administration while server performance is continuously monitored to identify issues before they affect users. This reduces downtime and supports long-term operational efficiency.\n\n' +
      '**Conclusion**\n\n' +
      'Following these three phases enables URG to deploy a secure, consistent and scalable Windows Server infrastructure while minimizing operational risk and simplifying future expansion.',
    ],
    markingGuide: '| Assessment Criteria | Marks |\n|---|---|\n| Planning and infrastructure assessment | 3 |\n| Standardized deployment and configuration | 3 |\n| Testing, validation and centralized management | 3 |\n| Overall discussion, organisation and application to URG | 1 |\n| **Total** | **10** |',
    points: 10,
    explanation: 'To obtain full marks, students must discuss each phase and relate it directly to the URG scenario. Answers that merely list deployment steps without explanation should receive limited marks.',
  },

  // ── 1.3 Fill in the Blank ────────────────────────────────
  {
    id: 'ITCOA_W1_Q3',
    type: 'fill-in-the-blank',
    sectionLabel: '1.3',
    tags: ['system configuration'],
    text: 'The Windows Server edition designed to host an unlimited number of Hyper-V virtual machines is the ___ edition.',
    blanks: [
      {
        id: 'b1',
        options: ['Standard', 'Essentials', 'Datacenter', 'Foundation'],
        correctAnswer: 'Datacenter',
      },
    ],
    explanation: 'Windows Server **Datacenter** edition supports an unlimited number of Hyper-V virtual machines, making it suitable for heavily virtualized environments.',
  },

  // ── 1.4 Short Factual ────────────────────────────────────
  {
    id: 'ITCOA_W1_Q4',
    type: 'open-ended',
    sectionLabel: '1.4',
    tags: ['system configuration', 'DBA responsibilities'],
    text: 'Name the Microsoft browser-based tool used for centralized management of Windows Servers.',
    correctAnswers: ['Windows Admin Center', 'WAC'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
      allowPartialMatch: true,
    },
    explanation: '**Windows Admin Center** is Microsoft\'s browser-based management platform used to centrally administer Windows Servers, clusters and client devices.',
  },

  // ── 1.5 Essay ────────────────────────────────────────────
  {
    id: 'ITCOA_W1_Q5',
    type: 'show-answer',
    sectionLabel: '1.5',
    text: 'Evaluate how centralized server management could improve:\n- operational efficiency\n- security\n- configuration consistency\n- long-term maintenance\n\nSupport your answer with examples from the URG scenario.',
    correctAnswers: [
      'Centralized server management allows administrators to manage multiple servers from a single interface instead of configuring each server individually.\n\n' +
      '**Operational efficiency** improves because software updates, role installations, routine maintenance and troubleshooting can be performed remotely using `Windows Admin Center` and `Server Manager`. This reduces the time and effort required to manage servers across multiple branch locations.\n\n' +
      '**Security** is strengthened because administrators can consistently apply operating system updates, patches and security configurations to every server. Standardized management reduces configuration differences that could introduce security vulnerabilities.\n\n' +
      '**Configuration consistency** is achieved because all branch servers are deployed and managed using the same standards. This eliminates configuration drift and ensures that servers perform the same functions regardless of their location.\n\n' +
      '**Long-term maintenance** becomes simpler because administrators manage fewer unique configurations. Monitoring tools allow problems to be detected early, reducing downtime and improving service availability.\n\n' +
      'For URG, centralized management addresses the inconsistent server configurations identified during the pilot deployment while supporting future expansion into additional branches.',
    ],
    markingGuide: '| Assessment Criteria | Marks |\n|---|---|\n| Operational efficiency | 2 |\n| Security improvements | 2 |\n| Configuration consistency | 2 |\n| Long-term maintenance | 2 |\n| Application to the URG scenario | 1 |\n| **Total** | **9** |',
    points: 9,
    explanation: 'Excellent responses evaluate the benefits of centralized management rather than simply describing management tools. Strong answers clearly relate operational improvements to the challenges experienced by URG.',
  },

  // ═══════════════════════════════════════════════════════════
  // QUESTION 2 — Server Roles, Features & Standardized Deployment (25 Marks)
  // ═══════════════════════════════════════════════════════════

  // ── 2.1 Multiple Choice ──────────────────────────────────
  {
    id: 'ITCOA_W1_Q6',
    type: 'multiple-choice',
    sectionLabel: '2.1',
    tags: ['system configuration', 'DBA responsibilities'],
    text: 'Which Windows Server management application is used to install and manage server roles and features?',
    options: [
      'Task Manager',
      'Windows Admin Center',
      'Server Manager',
      'Resource Monitor',
    ],
    correctAnswers: ['Server Manager'],
    points: 2,
    explanation: '**Server Manager** is the primary Windows Server management application used to install, configure and manage server roles and features.',
  },

  // ── 2.2 Essay ────────────────────────────────────────────
  {
    id: 'ITCOA_W1_Q7',
    type: 'show-answer',
    sectionLabel: '2.2',
    text: 'URG has purchased fifty new warehouse servers. Compare manual server installation and configuration with standardized deployment using a master image. Explain why a standardized deployment approach is more suitable for a large enterprise.',
    correctAnswers: [
      'As URG expands its infrastructure, administrators must decide between manually configuring every server or using a standardized deployment process based on a master image.\n\n' +
      '**Manual installation** requires Windows Server to be installed and configured individually on every server. Although this provides flexibility, it is time-consuming, increases the likelihood of human error and often results in inconsistent configurations across branch offices.\n\n' +
      '**Standardized deployment** uses a master server image created with `Sysprep`. The image contains the operating system, updates and standard configurations, allowing identical servers to be deployed repeatedly.\n\n' +
      'For URG, standardized deployment offers several advantages:\n\n' +
      '- Every branch server is configured consistently.\n' +
      '- Deployment time is significantly reduced.\n' +
      '- Human configuration errors are minimized.\n' +
      '- Disaster recovery is faster because failed servers can be rebuilt quickly.\n' +
      '- Future branch expansions become easier to manage.\n\n' +
      'Standardized deployment therefore provides greater efficiency, consistency and scalability than manual installation, making it the preferred solution for a large enterprise.',
    ],
    markingGuide: '| Assessment Criteria | Marks |\n|---|---|\n| Manual installation discussed | 2 |\n| Standardized deployment explained | 3 |\n| Advantages of standardized deployment | 3 |\n| Application to the URG scenario | 2 |\n| **Total** | **10** |',
    points: 10,
    explanation: 'Students should compare both approaches before justifying why standardized deployment is more suitable for a large enterprise. Marks should be awarded for evaluation rather than simple description.',
  },

  // ── 2.3 Fill in the Blank ────────────────────────────────
  {
    id: 'ITCOA_W1_Q8',
    type: 'fill-in-the-blank',
    sectionLabel: '2.3',
    tags: ['system configuration'],
    text: 'The Server Manager wizard used to install Windows Server functionality is called Add ___ and Features.',
    blanks: [
      {
        id: 'b1',
        options: ['Roles', 'Servers', 'Templates', 'Components'],
        correctAnswer: 'Roles',
      },
    ],
    explanation: 'The **Add Roles and Features** Wizard in Server Manager is used to install Windows Server roles and additional features.',
  },

  // ── 2.4 Short Factual ────────────────────────────────────
  {
    id: 'ITCOA_W1_Q9',
    type: 'open-ended',
    sectionLabel: '2.4',
    tags: ['system configuration', 'backup & recovery'],
    text: 'Name the Microsoft tool used to prepare a Windows installation for duplication.',
    correctAnswers: ['Sysprep', 'System Preparation Tool'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
      allowPartialMatch: true,
    },
    explanation: '**Sysprep** (System Preparation Tool) prepares a Windows Server installation for duplication by creating a reusable master image.',
  },

  // ── 2.5 Essay ────────────────────────────────────────────
  {
    id: 'ITCOA_W1_Q10',
    type: 'show-answer',
    sectionLabel: '2.5',
    text: 'Warehouse managers request the installation of several additional server roles. Analyse why installing unnecessary server roles could negatively affect:\n- security\n- performance\n- administration\n- future maintenance\n\nRecommend how administrators should decide which roles should be installed.',
    correctAnswers: [
      'Installing unnecessary server roles increases both administrative complexity and security risks.\n\n' +
      'From a **security** perspective, each additional role increases the server\'s attack surface because more services are installed and require protection through updates and security patches.\n\n' +
      'Unnecessary roles also consume **system resources**, including CPU, memory and storage, potentially reducing overall server performance.\n\n' +
      '**Administration** becomes more difficult because additional roles require ongoing configuration, monitoring and maintenance. This increases the workload for administrators and makes troubleshooting more complex.\n\n' +
      'Administrators should determine which roles to install by analysing organisational requirements before deployment. Only services that directly support business operations — such as `Active Directory`, `File Services` or `Hyper-V` — should be installed. This follows the principle of installing only what is necessary.\n\n' +
      'By limiting installed roles, URG improves security, simplifies maintenance and creates a more efficient server environment.',
    ],
    markingGuide: '| Assessment Criteria | Marks |\n|---|---|\n| Security implications | 3 |\n| Performance and administration | 3 |\n| Recommendation and justification | 3 |\n| **Total** | **9** |',
    points: 9,
    explanation: 'Excellent answers explain why unnecessary roles create additional management overhead and security risks, while recommending a business-driven approach to role selection.',
  },

  // ═══════════════════════════════════════════════════════════
  // QUESTION 3 — Virtualization & Enterprise Infrastructure (25 Marks)
  // ═══════════════════════════════════════════════════════════

  // ── 3.1 Multiple Choice ──────────────────────────────────
  {
    id: 'ITCOA_W1_Q11',
    type: 'multiple-choice',
    sectionLabel: '3.1',
    tags: ['system configuration'],
    text: 'Which characteristic is generally the greatest advantage of virtualization over maintaining many physical servers?',
    options: [
      'Increased electricity consumption',
      'Improved hardware utilization',
      'Larger server rooms',
      'Reduced operating system functionality',
    ],
    correctAnswers: ['Improved hardware utilization'],
    points: 2,
    explanation: 'Virtualization allows multiple virtual machines to share the resources of one physical server, maximizing hardware efficiency while reducing infrastructure costs.',
  },

  // ── 3.2 Essay ────────────────────────────────────────────
  {
    id: 'ITCOA_W1_Q12',
    type: 'show-answer',
    sectionLabel: '3.2',
    text: 'Critically evaluate virtualization as the preferred infrastructure solution for URG. In your discussion, compare virtualization with physical servers in terms of:\n- scalability\n- cost\n- hardware utilization\n- administration\n- disaster recovery',
    correctAnswers: [
      'Virtualization is the preferred infrastructure solution for URG because it improves resource utilisation, simplifies administration and supports future organisational growth.\n\n' +
      'In terms of **scalability**, new virtual machines can be created quickly without purchasing additional hardware. As URG expands, additional services can be deployed rapidly.\n\n' +
      'From a **cost** perspective, virtualization reduces spending on physical servers, electricity, cooling and data centre space by consolidating multiple workloads onto fewer physical machines.\n\n' +
      'Virtualization also improves **hardware utilisation**. Physical servers are often underutilised, whereas `Hyper-V` enables CPU, memory and storage resources to be shared efficiently among several virtual machines.\n\n' +
      '**Administration** becomes easier because virtual machines can be created, managed, backed up and maintained centrally. Routine maintenance causes less disruption and deployments are faster.\n\n' +
      'Virtualization also strengthens **disaster recovery**. Virtual machines can be restored from backups or redeployed much more quickly than rebuilding physical servers, reducing downtime following hardware failures.\n\n' +
      'Although physical servers may still be required for specialised workloads, virtualization provides the most flexible, cost-effective and scalable solution for URG\'s enterprise environment.',
    ],
    markingGuide: '| Assessment Criteria | Marks |\n|---|---|\n| Scalability | 2 |\n| Cost | 2 |\n| Hardware utilisation | 2 |\n| Administration | 2 |\n| Disaster recovery and evaluation | 2 |\n| **Total** | **10** |',
    points: 10,
    explanation: 'High-quality responses compare virtualization and physical servers before justifying why virtualization is the better long-term solution for URG.',
  },

  // ── 3.3 Fill in the Blank ────────────────────────────────
  {
    id: 'ITCOA_W1_Q13',
    type: 'fill-in-the-blank',
    sectionLabel: '3.3',
    tags: ['system configuration'],
    text: 'Software responsible for creating and managing virtual machines is known as a ___.',
    blanks: [
      {
        id: 'b1',
        options: ['Compiler', 'Firewall', 'Load Balancer', 'Hypervisor'],
        correctAnswer: 'Hypervisor',
      },
    ],
    explanation: 'A **hypervisor** is the software layer responsible for creating, managing and allocating resources to virtual machines.',
  },

  // ── 3.4 Short Factual ────────────────────────────────────
  {
    id: 'ITCOA_W1_Q14',
    type: 'open-ended',
    sectionLabel: '3.4',
    tags: ['system configuration', 'backup & recovery'],
    text: 'Name one benefit of using a virtual laboratory before deploying updates to production servers.',
    correctAnswers: [
      'Allows testing of updates without affecting production servers',
      'Reduces risk of downtime',
      'Allows administrators to test software, updates and configurations without affecting production servers',
    ],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 20,
      allowPartialMatch: true,
    },
    explanation: 'Testing in an isolated environment reduces operational risk by preventing failed updates or configuration errors from disrupting business services.',
  },

  // ── 3.5 Essay ────────────────────────────────────────────
  {
    id: 'ITCOA_W1_Q15',
    type: 'show-answer',
    sectionLabel: '3.5',
    text: 'URG plans to test future updates in a virtual laboratory before deploying them to production. Discuss how this practice reduces organizational risk and improves administrative decision-making.',
    correctAnswers: [
      'A virtual laboratory provides an isolated environment where administrators can evaluate updates, software and configuration changes before deploying them to production servers.\n\n' +
      'Testing in a virtual environment allows potential compatibility issues, configuration errors and software failures to be identified without interrupting normal business operations.\n\n' +
      'Virtual laboratories also allow administrators to experiment with new technologies, practise recovery procedures and evaluate server roles without risking production systems.\n\n' +
      'For URG, this approach reduces downtime during future updates, protects business-critical applications and improves confidence in deployment decisions. If problems occur during testing, they can be corrected before affecting users.\n\n' +
      'Using a virtual laboratory is therefore considered good administrative practice because it improves reliability, reduces organisational risk and supports informed decision-making.',
    ],
    markingGuide: '| Assessment Criteria | Marks |\n|---|---|\n| Purpose of a virtual laboratory | 3 |\n| Risk reduction | 3 |\n| Application to the URG scenario | 3 |\n| **Total** | **9** |',
    points: 9,
    explanation: 'Students should explain *how* a virtual laboratory reduces organisational risk rather than simply stating that testing is important.',
  },

  // ═══════════════════════════════════════════════════════════
  // QUESTION 4 — Server Monitoring, Performance & Enterprise Operations (25 Marks)
  // ═══════════════════════════════════════════════════════════

  // ── 4.1 Multiple Choice ──────────────────────────────────
  {
    id: 'ITCOA_W1_Q16',
    type: 'multiple-choice',
    sectionLabel: '4.1',
    tags: ['performance monitoring', 'DBA responsibilities'],
    text: 'Which Windows utility provides the quickest overall view of CPU, memory, disk and network utilization?',
    options: [
      'Registry Editor',
      'Resource Monitor',
      'Task Manager',
      'Device Manager',
    ],
    correctAnswers: ['Task Manager'],
    points: 2,
    explanation: '**Task Manager** provides the quickest overview of CPU, memory, disk and network utilisation, making it the first tool administrators should use when investigating performance issues.',
  },

  // ── 4.2 Essay ────────────────────────────────────────────
  {
    id: 'ITCOA_W1_Q17',
    type: 'show-answer',
    sectionLabel: '4.2',
    text: 'A warehouse server becomes slow during peak stocktaking periods. Analyse how administrators should investigate the problem using the Windows Server monitoring tools covered in this module. Distinguish between the role of Task Manager and Resource Monitor during troubleshooting.',
    correctAnswers: [
      'When the warehouse server experiences poor performance, administrators should follow a structured troubleshooting process before considering hardware upgrades.\n\n' +
      'The investigation should begin with `Task Manager`, which provides a quick overview of CPU, memory, disk and network utilisation. This helps determine whether one or more resources are heavily utilised and identifies processes consuming excessive system resources.\n\n' +
      'If further analysis is required, administrators should use `Resource Monitor`, which provides more detailed information about CPU activity, memory usage, disk access and network performance. Resource Monitor enables administrators to identify bottlenecks and determine which processes are affecting server performance.\n\n' +
      'Administrators should also monitor system performance during peak trading periods to determine whether slow performance is caused by temporary workload spikes or an ongoing resource limitation.\n\n' +
      'Only after collecting and analysing performance data should administrators decide whether hardware upgrades or configuration changes are required. This approach ensures that decisions are based on evidence rather than assumptions.',
    ],
    markingGuide: '| Assessment Criteria | Marks |\n|---|---|\n| Use of Task Manager | 3 |\n| Use of Resource Monitor | 3 |\n| Structured investigation process | 2 |\n| Recommendation based on findings | 2 |\n| **Total** | **10** |',
    points: 10,
    explanation: 'Students should distinguish between the functions of Task Manager and Resource Monitor. Strong answers describe a logical troubleshooting process rather than simply listing monitoring tools.',
  },

  // ── 4.3 Fill in the Blank ────────────────────────────────
  {
    id: 'ITCOA_W1_Q18',
    type: 'fill-in-the-blank',
    sectionLabel: '4.3',
    tags: ['performance monitoring'],
    text: 'The Task Manager tab used to monitor CPU, memory, disk and Ethernet utilization is the ___ tab.',
    blanks: [
      {
        id: 'b1',
        options: ['Details', 'Startup', 'Performance', 'Services'],
        correctAnswer: 'Performance',
      },
    ],
    explanation: 'The **Performance** tab displays CPU, memory, disk and Ethernet utilisation, allowing administrators to monitor overall server resource usage.',
  },

  // ── 4.4 Short Factual ────────────────────────────────────
  {
    id: 'ITCOA_W1_Q19',
    type: 'open-ended',
    sectionLabel: '4.4',
    tags: ['performance monitoring', 'DBA responsibilities'],
    text: 'Name the Windows utility that provides more detailed hardware performance information than Task Manager.',
    correctAnswers: ['Resource Monitor'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
      allowPartialMatch: true,
    },
    explanation: '**Resource Monitor** provides more detailed hardware and process information than Task Manager, making it useful for in-depth performance analysis.',
  },

  // ── 4.5 Essay ────────────────────────────────────────────
  {
    id: 'ITCOA_W1_Q20',
    type: 'show-answer',
    sectionLabel: '4.5',
    text: 'URG\'s IT director argues that purchasing faster hardware should always be the first solution to performance problems. Critically evaluate this statement. In your answer, explain why effective monitoring and analysis should precede hardware upgrades.',
    correctAnswers: [
      'Purchasing faster hardware should not automatically be the first response to performance problems. Hardware upgrades are costly and may not resolve the underlying issue if the cause has not been identified.\n\n' +
      'Administrators should first monitor server performance using tools such as `Task Manager` and `Resource Monitor` to determine whether the problem is caused by high CPU usage, insufficient memory, excessive disk activity or unnecessary applications consuming resources.\n\n' +
      'Performance analysis allows administrators to identify the root cause of the problem and determine whether it can be resolved through configuration changes, software optimisation or routine maintenance instead of purchasing new hardware.\n\n' +
      'For URG, this approach reduces unnecessary expenditure while ensuring that hardware upgrades are only performed when existing resources genuinely cannot meet operational demands. Evidence-based decision-making supports more effective long-term server administration.',
    ],
    markingGuide: '| Assessment Criteria | Marks |\n|---|---|\n| Evaluation of the statement | 3 |\n| Importance of monitoring and analysis | 3 |\n| Recommendation and application to URG | 3 |\n| **Total** | **9** |',
    points: 9,
    explanation: 'High-scoring answers evaluate the statement critically and justify why monitoring and analysis should guide hardware investment decisions.',
  },
];