// src/data/questions/ITCOA/week5.js
// Windows Server Administration -- Week 5 Summative Practice Examination
// Topics assessed: Server Core and PowerShell | Total: 100 Marks

export default [
  {
    "id": "SCENARIO_ITCOA_W5",
    "type": "scenario",
    "title": "Windows Server Administration — Week 5 Summative Practice Examination (Server Core & PowerShell, 100 Marks)",
    "context": "NexaHealth Infrastructure Modernisation\n\nNexaHealth is a growing healthcare technology organisation operating a central data centre and several regional offices. Its Windows Server infrastructure currently contains a mixture of older graphical Windows Server installations and newer virtual machines.\n\nThe organisation is preparing to modernise its server environment. The infrastructure team has identified several requirements:\n• Domain services must remain available to users across the organisation.\n• DNS and DHCP services must be centrally administered.\n• File and storage services are required for departmental data.\n• Some servers will host IIS-based internal applications.\n• The organisation expects to deploy additional servers over the next year.\n• Administrators should be able to manage servers remotely rather than physically accessing each machine.\n• The infrastructure team wants to reduce the software footprint of servers where a graphical interface is unnecessary.\n• Administrators need repeatable command-line methods for configuring and managing servers.\n• The organisation wants to reduce manual administrative work when inspecting services, network configuration and system information.\n• A secondary domain controller will be deployed as part of the modernisation programme.\n\nThe infrastructure manager has asked you, as a junior Windows Server administrator, to participate in the design and implementation of the new environment.\n\nAll questions refer to NexaHealth unless otherwise stated."
  },
  {
    "id": "SCENARIO_ITCOA_W5_Q1",
    "type": "scenario",
    "title": "Question 1 — Choosing and Managing Server Core (20 Marks)",
    "context": "The infrastructure manager proposes deploying Server Core rather than Windows Server with Desktop Experience for several NexaHealth infrastructure servers."
  },
  {
    "id": "ITCOA_W5_Q1",
    "type": "multiple-choice",
    "sectionLabel": "1.1",
    "text": "The infrastructure manager proposes deploying **Server Core** rather than Windows Server with Desktop Experience for several infrastructure servers. Which justification BEST demonstrates an understanding of why Server Core is appropriate?",
    "options": [
      "Server Core provides a complete graphical interface but removes unnecessary administrative tools.",
      "Server Core provides the core server capabilities with a smaller software footprint and reduced attack surface, while allowing remote administration.",
      "Server Core can only be administered locally, making it more appropriate for physically secured data centres.",
      "Server Core automatically eliminates the need for PowerShell because server roles are configured through SConfig."
    ],
    "correctAnswers": [
      "Server Core provides the core server capabilities with a smaller software footprint and reduced attack surface, while allowing remote administration."
    ],
    "points": 2,
    "tags": [
      "server core",
      "system configuration",
      "technological impact"
    ],
    "explanation": "The key distinction is minimal installation does not mean limited server functionality. Server Core reduces the installed footprint while remaining remotely manageable via Windows Admin Center, Server Manager/RSAT and PowerShell."
  },
  {
    "id": "ITCOA_W5_Q2",
    "type": "open-ended",
    "sectionLabel": "1.2",
    "text": "What Windows Server installation option is characterised by a minimal, command-line-driven environment? (Answer: 1–3 words only.)",
    "correctAnswers": [
      "Server Core"
    ],
    "points": 2,
    "validationOptions": {
      "caseSensitive": false,
      "tolerance": 10
    },
    "tags": [
      "server core",
      "system configuration"
    ],
    "explanation": "Server Core is the minimal, headless Windows Server installation option with no default local graphical desktop."
  },
  {
    "id": "ITCOA_W5_Q3",
    "type": "show-answer",
    "sectionLabel": "1.3",
    "text": "The infrastructure manager argues: \"If Server Core has no normal graphical desktop, it will be more difficult and therefore less suitable for a professional enterprise environment.\" Critically evaluate this statement in the context of NexaHealth. Your answer must:\n- explain the fundamental difference between Server Core and Desktop Experience;\n- discuss **two reasons** Server Core may be preferable for appropriate NexaHealth servers;\n- explain how remote administration changes the practical implications of not having a local graphical interface;\n- distinguish between the **absence of a local GUI** and the **absence of management capabilities**.",
    "correctAnswers": [
      "Server Core is a Windows Server installation option that provides the required server operating-system functionality without the conventional local graphical desktop environment. It is therefore appropriate where a server's primary purpose is to provide infrastructure services rather than to be operated interactively by users.\n\nFor NexaHealth, Server Core can be preferable because it has a **smaller software footprint**, meaning fewer components are installed and maintained. This can reduce the potential attack surface and reduce unnecessary servicing and administrative overhead. It is therefore particularly suitable for infrastructure servers such as domain controllers, DNS, file servers or other servers whose functions do not require a local graphical interface.\n\nThe absence of a graphical desktop does not mean that the server lacks management capabilities. Server Core can be administered remotely using **Windows Admin Center, Server Manager/RSAT and PowerShell**. Consequently, administrators can manage the server from another workstation rather than needing to interact directly with the Server Core console.\n\nFor NexaHealth, this makes Server Core a deliberate infrastructure choice rather than simply a more difficult version of Windows Server. The organisation gains a minimal server environment while retaining the ability to perform sophisticated administration remotely."
    ],
    "markingGuide": "| Criterion | Marks |\n|---|---|\n| Correctly explains Server Core / headless nature | 1 |\n| Explains smaller/minimal software footprint | 1 |\n| Connects footprint to reduced attack surface/maintenance | 1 |\n| Applies suitability to NexaHealth infrastructure servers | 1 |\n| Explains remote administration | 1 |\n| Distinguishes lack of GUI from lack of functionality | 1 |\n| Provides coherent evaluative conclusion | 1 |\n| **Total** | **7** |",
    "points": 7,
    "tags": [
      "server core",
      "technological impact",
      "systems thinking"
    ],
    // Question 1.3 — Server Core vs Desktop Experience
        image: {
        src: "/images/ITCOA_W5_Q3.png",
        alt: "Comparison of Windows Server Core and Desktop Experience environments, showing their different administration interfaces and server-management characteristics.",
        caption: "Figure 1: Server Core and Desktop Experience comparison"
        },
    "explanation": "A high-level answer should not simply state that Server Core is 'more secure'. It should connect the reduced installation footprint to administration and deployment decisions."
  },
  {
    "id": "ITCOA_W5_Q4",
    "type": "multiple-choice",
    "sectionLabel": "1.4",
    "text": "NexaHealth has 30 Server Core machines distributed across several locations. The administrator wants a browser-based management interface through which servers can be centrally inspected and configured. Which option is MOST appropriate?",
    "options": [
      "Windows Admin Center",
      "SConfig",
      "Command Prompt",
      "PowerShell ISE running locally on every Server Core machine"
    ],
    "correctAnswers": [
      "Windows Admin Center"
    ],
    "points": 2,
    "tags": [
      "windows admin center",
      "system configuration"
    ],
    "explanation": "SConfig is useful for initial local configuration; it is not the broad browser-based management platform described here. Windows Admin Center provides centralised, browser-based management across many servers."
  },
  {
    "id": "ITCOA_W5_Q5",
    "type": "fill-in-the-blank",
    "sectionLabel": "1.5",
    "text": "The Microsoft management solution that provides a browser-based interface for managing Windows servers is ___.",
    "blanks": [
      {
        "id": "b1",
        "options": [
          "SConfig",
          "PowerShell ISE",          
          "WAC",
          "Server Manager"
        ],
        "correctAnswer": "WAC"
      }
    ],
    "points": 1,
    "tags": [
      "windows admin center",
      "system configuration"
    ],
    "explanation": "Windows Admin Center (WAC) is Microsoft's modern, browser-based management platform. It allows administrators to manage single or multiple Windows servers (both Core and Desktop Experience) through a unified, graphical interface without requiring a local GUI on the target machine."
  },
  {
    "id": "ITCOA_W5_Q6",
    "type": "show-answer",
    "sectionLabel": "1.6",
    "text": "Explain why **remote administration** is particularly important when NexaHealth chooses Server Core. Your answer should compare the operational implications of: 1) administering a Server Core machine locally; and 2) administering it remotely using tools such as Windows Admin Center or PowerShell. Your discussion must make a justified argument rather than merely listing management tools.",
    "correctAnswers": [
      "Remote administration is particularly important with Server Core because Server Core does not provide the conventional local graphical desktop used for interactive administration. Instead of requiring an administrator to physically access every server, NexaHealth can manage servers from administrative workstations.\n\nTools such as **Windows Admin Center** provide a graphical browser-based management experience, while **PowerShell remoting** allows administrators to execute commands and administrative operations remotely. Server Manager and RSAT also provide remote management capabilities.\n\nThis changes the operational model of Server Core. The absence of a local GUI is therefore not necessarily a disadvantage in a centrally managed enterprise. An administrator can configure and monitor servers without travelling to the server location or maintaining a graphical environment on every machine.\n\nFor NexaHealth, this is particularly valuable because servers may be distributed across the main data centre and regional offices. Remote administration makes the reduced Server Core environment operationally practical while reducing dependence on physical access."
    ],
    "markingGuide": "| Criterion | Marks |\n|---|---|\n| Explains absence of local GUI | 1 |\n| Explains remote administration | 1 |\n| Windows Admin Center correctly applied | 1 |\n| PowerShell remoting correctly applied | 1 |\n| Explains operational advantage | 1 |\n| Applies to distributed NexaHealth environment | 1 |\n| **Total** | **6** |",
    "points": 6,
    "tags": [
      "remote administration",
      "technological impact",
      "systems thinking"
    ],
    "explanation": "Strong candidates recognise that remote management is part of the rationale for using Server Core, not merely a workaround for it."
  },
  {
    "id": "SCENARIO_ITCOA_W5_Q2",
    "type": "scenario",
    "title": "Question 2 — Initial Server Core Configuration (20 Marks)",
    "context": "NexaHealth has deployed a new Server Core machine intended to become a domain controller.\n\nCurrent state: IP address and DNS automatically assigned, temporary computer-generated hostname, workgroup membership, default gateway not manually configured.\n\nIntended configuration: IP address 10.20.30.10, prefix length /24, default gateway 10.20.30.1, DNS server 10.20.30.5, hostname NEXA-DC02, domain NEXAHEALTH.LOCAL."
  },
  {
    "id": "ITCOA_W5_Q7",
    "type": "multiple-choice",
    "sectionLabel": "2.1",
    "text": "Which configuration should be established **before promoting the machine to a domain controller**?",
    "options": [
      "A stable network configuration, appropriate hostname and appropriate DNS configuration",
      "A graphical desktop, local IIS installation and DHCP reservation",
      "A temporary IP address, because domain controllers should use DHCP",
      "A PowerShell ISE project containing the server's hostname"
    ],
    "correctAnswers": [
      "A stable network configuration, appropriate hostname and appropriate DNS configuration"
    ],
    "points": 2,
    "tags": [
      "system configuration",
      "systems thinking"
    ],
    "explanation": "A domain controller needs a reliable network identity. Static networking, DNS and a permanent hostname must be established before AD DS installation and promotion."
  },
  {
    "id": "ITCOA_W5_Q8",
    "type": "fill-in-the-blank",
    "sectionLabel": "2.2",
    "text": "The PowerShell cmdlet used to display the current network/IP configuration is ___.",
    "blanks": [
      {
        "id": "b1",
        "options": [
          "Get-NetAdapter",
          "Test-Connection",
          "Get-DnsClientServerAddress",          
          "Get-NetIPConfiguration"
        ],
        "correctAnswer": "Get-NetIPConfiguration"
      }
    ],
    "points": 1,
    "tags": [
      "powershell",
      "system configuration"
    ],
    "explanation": "Get-NetIPConfiguration inspects (but does not change) the current network configuration of the machine."
  },
  {
    "id": "ITCOA_W5_Q9",
    "type": "open-ended",
    "sectionLabel": "2.3",
    "text": "Which Server Core utility provides a menu-driven interface for common initial server configuration tasks? (Answer: 1–3 words only.)",
    "correctAnswers": [
      "SConfig"
    ],
    "points": 2,
    "validationOptions": {
      "caseSensitive": false,
      "tolerance": 10
    },
    "tags": [
      "sconfig",
      "system configuration"
    ],
    "explanation": "SConfig is the menu-driven initial configuration utility included with Server Core. 'PowerShell' is not accepted as it is not the menu-driven utility being asked for."
  },
  {
    "id": "ITCOA_W5_Q10",
    "type": "multiple-choice",
    "sectionLabel": "2.4",
    "text": "An administrator wants to use SConfig to change the computer's hostname. Which SConfig option from the Week 5 material is associated with configuring the hostname?",
    "options": [
      "Option 1",
      "Option 2",
      "Option 8",
      "Option 15"
    ],
    "correctAnswers": [
      "Option 2"
    ],
    "points": 2,
    "tags": [
      "sconfig",
      "system configuration"
    ],
    "explanation": "In the SConfig utility, Option 2 is the dedicated menu item for 'Computer Name'. Selecting this allows an administrator to rename the server, which is a required step for establishing a permanent identity before tasks like domain promotion."
  },
  {
    "id": "ITCOA_W5_Q11",
    "type": "show-answer",
    "sectionLabel": "2.5",
    "text": "Using the NexaHealth scenario, explain the **logical sequence** the administrator should follow when preparing the new Server Core machine for its role as a domain controller. Your answer should integrate: network configuration; DNS configuration; hostname configuration; domain membership; server restart where required; preparation for the subsequent AD DS installation and promotion. Do not merely reproduce a list of commands. Explain why the configuration stages occur in that order.",
    "correctAnswers": [
      "The administrator should first establish the server's network identity and connectivity before attempting domain-controller deployment.\n\nFirst, the server should receive its **static IP configuration**, including its IP address, prefix/subnet information and default gateway. Its DNS configuration should then be established appropriately. The server should also receive its **permanent hostname**, in this case NEXA-DC02.\n\nThe administrator should then verify the network configuration using `Get-NetIPConfiguration` and confirm the hostname. If required, the server should be restarted after the relevant configuration changes.\n\nOnce the basic configuration is stable, the server can be prepared for **domain membership** and subsequently the AD DS role and domain-controller promotion can be performed.\n\nThe ordering is important because the domain controller needs a reliable network identity and DNS configuration. Attempting to build the domain-controller role on an incorrectly configured or temporary network identity creates avoidable infrastructure problems."
    ],
    "markingGuide": "| Element | Marks |\n|---|---|\n| Static IP configuration | 1 |\n| Prefix/subnet and gateway | 1 |\n| DNS configuration | 1 |\n| Permanent hostname | 1 |\n| Verification | 1 |\n| Domain membership/preparation | 1 |\n| Explains logical ordering | 1 |\n| **Total** | **7** |",
    "points": 7,
    "tags": [
      "system configuration",
      "systems thinking"
    ],
    // Question 2.5 — Initial Server Core Configuration
        image: {
        src: "/images/ITCOA_W5_Q11.png",
        alt: "Server Core initial configuration context showing network settings, DNS, hostname, domain membership, restart, and the planned domain-controller role.",
        caption: "Figure 2: Initial Server Core configuration context"
        },
    "explanation": "An answer that simply lists commands without explaining why the stages are ordered should not receive full marks."
  },
  {
    "id": "ITCOA_W5_Q12",
    "type": "fill-in-the-blank",
    "sectionLabel": "2.6",
    "text": "The PowerShell cmdlet used to permanently change the computer name is ___.",
    "blanks": [
      {
        "id": "b1",
        "options": [
          "Set-Computer",
          "Add-Computer",          
          "Rename-Computer",
          "Set-ItemProperty"
        ],
        "correctAnswer": "Rename-Computer"
      }
    ],
    "points": 1,
    "tags": [
      "powershell",
      "system configuration"
    ],
    "explanation": "The `Rename-Computer` cmdlet is the authoritative PowerShell command for changing a machine's hostname. Unlike older methods, it handles the necessary registry and system changes safely and prompts for the required restart to commit the new name."
  },
  {
    "id": "ITCOA_W5_Q13",
    "type": "multiple-choice",
    "sectionLabel": "2.7",
    "text": "The administrator executes:\n\n```powershell\nGet-NetIPConfiguration\n```\n\nWhat is the PRIMARY purpose of this command in the NexaHealth deployment?",
    "options": [
      "To promote the server to a domain controller",
      "To inspect the server's current network configuration",
      "To rename the computer",
      "To establish a remote PowerShell session"
    ],
    "correctAnswers": [
      "To inspect the server's current network configuration"
    ],
    "points": 2,
    "tags": [
      "powershell",
      "system configuration"
    ],
    "explanation": "Get-NetIPConfiguration retrieves information about the machine's current network configuration; it does not change configuration."
  },
  {
    "id": "ITCOA_W5_Q14",
    "type": "open-ended",
    "sectionLabel": "2.8",
    "text": "What PowerShell cmdlet restarts a computer? (Answer: 1–3 words only.)",
    "correctAnswers": [
      "Restart-Computer"
    ],
    "points": 1,
    "validationOptions": {
      "caseSensitive": false,
      "tolerance": 10
    },
    "tags": [
      "powershell",
      "system configuration"
    ],
    "explanation": "Restart-Computer is the standard PowerShell cmdlet used to restart a machine after configuration changes."
  },
  {
    "id": "SCENARIO_ITCOA_W5_Q3",
    "type": "scenario",
    "title": "Question 3 — Building the Domain Controller (20 Marks)",
    "context": "The NexaHealth infrastructure team has successfully installed and configured NEXA-DC02. The machine has a static IP address, permanent hostname and appropriate DNS configuration. The organisation now wants to make it an additional domain controller for NEXAHEALTH.LOCAL."
  },
  {
    "id": "ITCOA_W5_Q15",
    "type": "multiple-choice",
    "sectionLabel": "3.1",
    "text": "Which Windows Server role must first be installed to prepare the server for Active Directory domain controller functionality?",
    "options": [
      "DNS Server",
      "Active Directory Domain Services",
      "Web Server (IIS)",
      "Remote Desktop Services"
    ],
    "correctAnswers": [
      "Active Directory Domain Services"
    ],
    "points": 2,
    "tags": [
      "active directory",
      "system configuration"
    ],
    "explanation": "AD DS is the Windows Server role required to provide Active Directory domain-controller functionality."
  },
  {
    "id": "ITCOA_W5_Q16",
    "type": "fill-in-the-blank",
    "sectionLabel": "3.2",
    "text": "The PowerShell cmdlet used to install a Windows Server role or feature is ___.",
    "blanks": [
      {
        "id": "b1",
        "options": [
          "Install-WindowsFeature",
          "Add-WindowsFeature",
          "New-WindowsFeature",
          "Enable-WindowsFeature"
        ],
        "correctAnswer": "Install-WindowsFeature"
      }
    ],
    "points": 1,
    "tags": [
      "powershell",
      "system configuration"
    ],
    "explanation": "The `Install-WindowsFeature` cmdlet (formerly `Add-WindowsFeature`) is the standard PowerShell tool for managing server roles and features in Windows Server. It allows for automated, scriptable installations that are essential for managing 'headless' Server Core environments."
  },
  {
    "id": "ITCOA_W5_Q17",
    "type": "multiple-choice",
    "sectionLabel": "3.3",
    "text": "Which command from the Week 5 material installs the AD DS role together with its management tools?",
    "options": [
      "Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools",
      "Install-ADDSDomainController -Name AD-Domain-Services",
      "Add-Computer -Role AD-Domain-Services",
      "New-ADDomain -InstallManagementTools"
    ],
    "correctAnswers": [
      "Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools"
    ],
    "points": 2,
    "tags": [
      "active directory",
      "powershell"
    ],
    "explanation": "Installing the AD-Domain-Services role alone does not include the GUI or command-line tools needed to manage it. The `-IncludeManagementTools` parameter ensures that relevant snap-ins and PowerShell modules (like the Active Directory module) are installed alongside the service."
  },
  {
    "id": "ITCOA_W5_Q18",
    "type": "show-answer",
    "sectionLabel": "3.4",
    "text": "NexaHealth wants NEXA-DC02 to become an additional domain controller in NEXAHEALTH.LOCAL. Explain the process you would follow from the completed Server Core installation until the machine has been promoted to a domain controller. Your answer should distinguish clearly between: installing the AD DS role; ensuring the DNS/network configuration is suitable; joining the existing domain; promoting the server to a domain controller; the role of DNS during this process. Where appropriate, include the relevant PowerShell commands from the material.",
    "correctAnswers": [
      "The first step is to ensure that NEXA-DC02 has already been correctly configured with a static IP address, appropriate DNS settings and a permanent hostname. The Week 5 material emphasises that the NIC DNS configuration should point to an existing domain controller when adding an additional domain controller.\n\nThe AD DS role is then installed:\n\n```powershell\nInstall-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools\n```\n\nIf necessary, DNS can also be installed:\n\n```powershell\nInstall-WindowsFeature DNS\n```\n\nThe server is then joined to the existing domain using `Add-Computer`. Once it is an appropriate domain member and the required prerequisites are satisfied, it can be promoted using:\n\n```powershell\nInstall-ADDSDomainController -InstallDns -DomainName NEXAHEALTH.LOCAL\n```\n\nDNS is important because Active Directory relies heavily on DNS for locating domain services. Therefore, the server's DNS configuration must be correct before promotion.\n\nFollowing promotion, the administrator should verify the result through Active Directory Users and Computers, DNS Management and replication status using:\n\n```text\nRepadmin /showrepl\n```\n\nThus, domain-controller deployment is not simply installing one feature: it is a sequence of network, DNS, domain-membership, AD DS and verification activities."
    ],
    "markingGuide": "| Criterion | Marks |\n|---|---|\n| Correct prerequisite network/hostname configuration | 1 |\n| AD DS role installation | 1 |\n| Correct installation command | 1 |\n| DNS consideration | 1 |\n| Domain joining | 1 |\n| Correct promotion concept/command | 1 |\n| Explains DNS/AD relationship | 1 |\n| Verification | 1 |\n| **Total** | **8** |",
    "points": 8,
    "tags": [
      "active directory",
      "system configuration",
      "systems thinking"
    ],
    // Question 3.4 — Building the Domain Controller
        image: {
        src: "/images/ITCOA_W5_Q18.png",
        alt: "Windows Server domain architecture showing an existing domain controller, a Server Core server, Active Directory Domain Services, DNS, domain membership, replication, and verification areas.",
        caption: "Figure 3: Domain controller deployment architecture"
        },
    "explanation": "Full marks require integration. A candidate who writes only the three commands demonstrates procedural recall but not complete understanding of the deployment lifecycle."
  },
  {
    "id": "ITCOA_W5_Q19",
    "type": "multiple-choice",
    "sectionLabel": "3.5",
    "text": "The administrator executes:\n\n```powershell\nAdd-Computer\n```\n\nIn the context of the NexaHealth deployment, what is the most appropriate purpose of this command?",
    "options": [
      "Installing DNS Server",
      "Joining the computer to a domain",
      "Promoting the computer to a domain controller",
      "Displaying the computer's hostname"
    ],
    "correctAnswers": [
      "Joining the computer to a domain"
    ],
    "points": 2,
    "tags": [
      "powershell",
      "active directory"
    ],
    "explanation": "Add-Computer is used to add a computer to a domain. In practice, appropriate parameters and credentials would normally be supplied."
  },
  {
    "id": "ITCOA_W5_Q20",
    "type": "fill-in-the-blank",
    "sectionLabel": "3.6",
    "text": "The PowerShell cmdlet used to promote a server to a domain controller is ___.",
    "blanks": [
      {
        "id": "b1",
        "options": [
          "New-ADDSDomainController",
          "Install-ADDSDomainController",
          "Add-ADDSDomainController",
          "Enable-ADDSDomainController"
        ],
        "correctAnswer": "Install-ADDSDomainController"
      }
    ],
    "points": 1,
    "tags": [
      "active directory",
      "powershell"
    ],
    "explanation": "The `Install-ADDSDomainController` cmdlet is part of the ADDSDeployment module. It initiates the promotion process, configuring the server as a DC in an existing domain, which includes setting up the NTDS database, SYSVOL folder, and necessary service records."
  },
  {
    "id": "ITCOA_W5_Q21",
    "type": "open-ended",
    "sectionLabel": "3.7",
    "text": "What command from the Week 5 material can be used to inspect Active Directory replication status? (Answer: 1–3 words only.)",
    "correctAnswers": [
      "Repadmin",
      "Repadmin /showrepl"
    ],
    "points": 1,
    "validationOptions": {
      "caseSensitive": false,
      "tolerance": 10
    },
    "tags": [
      "active directory",
      "system configuration"
    ],
    "explanation": "The `Repadmin` (Replication Administration) tool is a diagnostic utility for monitoring Active Directory replication. The `/showrepl` switch provides a detailed report of the replication status between domain controllers, helping to verify that a new DC is correctly synchronising with the rest of the forest."
  },
  {
    "id": "ITCOA_W5_Q22",
    "type": "multiple-choice",
    "sectionLabel": "3.8",
    "text": "After promotion, the administrator verifies the new domain controller using Active Directory Users and Computers, DNS Management and replication information. Why is using **multiple verification methods** preferable to simply checking whether the promotion command completed successfully?",
    "options": [
      "Promotion success proves every Active Directory and DNS function is automatically correct.",
      "Different verification methods provide evidence about different aspects of the resulting domain-controller configuration.",
      "Active Directory Users and Computers is required only because Server Core cannot run PowerShell.",
      "DNS Management is unrelated to domain-controller functionality but is required for licensing."
    ],
    "correctAnswers": [
      "Different verification methods provide evidence about different aspects of the resulting domain-controller configuration."
    ],
    "points": 2,
    "tags": [
      "active directory",
      "systems thinking"
    ],
    "explanation": "This question tests the difference between completion of a procedure and verification of a functioning system."
  },
  {
    "id": "SCENARIO_ITCOA_W5_Q4",
    "type": "scenario",
    "title": "Question 4 — PowerShell as an Administrative Tool (20 Marks)",
    "context": "After the domain-controller deployment, NexaHealth's administrators report that they repeatedly perform the same administrative tasks manually. The infrastructure manager wants the team to use PowerShell more effectively."
  },
  {
    "id": "ITCOA_W5_Q23",
    "type": "multiple-choice",
    "sectionLabel": "4.1",
    "text": "Which statement BEST captures the role of PowerShell in the NexaHealth environment?",
    "options": [
      "It is primarily a graphical replacement for Windows Server.",
      "It provides a command-line and scripting environment for administering operating-system resources and automating administrative tasks.",
      "It is used exclusively for configuring Active Directory.",
      "It is a database-management language designed primarily for SQL queries."
    ],
    "correctAnswers": [
      "It provides a command-line and scripting environment for administering operating-system resources and automating administrative tasks."
    ],
    "points": 2,
    "tags": [
      "powershell",
      "technological impact"
    ],
    "explanation": "PowerShell is presented as an administration/scripting environment capable of manipulating operating-system resources, environment variables, registry information, remote systems and variables."
  },
  {
    "id": "ITCOA_W5_Q24",
    "type": "fill-in-the-blank",
    "sectionLabel": "4.2",
    "text": "The PowerShell symbol used to pass the output of one command to another command is the ___.",
    "blanks": [
      {
        "id": "b1",
        "options": [          
          "&",
          ">>",
          "|",
          ";"
        ],
        "correctAnswer": "|"
      }
    ],
    "points": 1,
    "tags": [
      "powershell",
      "system configuration"
    ],
    "explanation": "The pipe operator (|) passes the output object(s) of one PowerShell command to the next command in the pipeline."
  },
  {
    "id": "ITCOA_W5_Q25",
    "type": "multiple-choice",
    "sectionLabel": "4.3",
    "text": "An administrator wants to identify commands containing the word `Restart` and then display detailed information about those commands. Which approach demonstrates PowerShell's pipeline concept?",
    "options": [
      "Get-Command -Name *Restart* | Format-List",
      "Format-List | Get-Command -Name *Restart*",
      "Get-Command -Name *Restart* + Format-List",
      "Restart-Computer | Get-Command"
    ],
    "correctAnswers": [
      "Get-Command -Name *Restart* | Format-List"
    ],
    "points": 2,
    "tags": [
      "powershell",
      "pipelines"
    ],
    "explanation": "The first cmdlet produces the relevant command objects; the pipeline passes those objects to Format-List for formatting."
  },
  {
    "id": "ITCOA_W5_Q26",
    "type": "open-ended",
    "sectionLabel": "4.4",
    "text": "Which PowerShell command provides help for a cmdlet? (Answer: 1–3 words only.)",
    "correctAnswers": [
      "Get-Help"
    ],
    "points": 1,
    "validationOptions": {
      "caseSensitive": false,
      "tolerance": 10
    },
    "tags": [
      "powershell",
      "system configuration"
    ],
    "explanation": "Get-Help displays help information for a specified cmdlet or topic."
  },
  {
    "id": "ITCOA_W5_Q27",
    "type": "multiple-choice",
    "sectionLabel": "4.5",
    "text": "An administrator wants to obtain the current username, computer name and current date and store them in variables before displaying them. Which approach is conceptually correct?",
    "options": [
      "$user = $env:USERNAME\n$RDSH = $env:COMPUTERNAME\n$Date = Get-Date",
      "$user == USERNAME\n$RDSH == COMPUTERNAME\n$Date == DATE",
      "$username = username()\n$computer = computer()\n$date = date()",
      "$user = $USERNAME\n$RDSH = $COMPUTER\n$Date = $DATE"
    ],
    "correctAnswers": [
      "$user = $env:USERNAME\n$RDSH = $env:COMPUTERNAME\n$Date = Get-Date"
    ],
    "points": 2,
    "tags": [
      "powershell",
      "variables"
    ],
    "explanation": "This example correctly demonstrates PowerShell variables, environment variables and the Get-Date cmdlet."
  },
  {
    "id": "ITCOA_W5_Q28",
    "type": "show-answer",
    "sectionLabel": "4.6",
    "text": "The infrastructure manager states: \"PowerShell is useful because it lets administrators type commands faster than using a graphical interface.\" Critically assess this statement. Explain how PowerShell provides value beyond simply typing commands, with reference to: cmdlets; variables; pipelines; formatting; scripting/automation; remote administration. Your answer should explain how these capabilities change the **way administrators manage servers**, rather than merely naming them.",
    "correctAnswers": [
      "PowerShell's value extends beyond typing commands more quickly because it provides a structured administration and scripting environment.\n\n**Cmdlets** provide specialised operations for managing Windows resources. **Variables** allow information such as usernames, computer names and dates to be stored and reused. The **pipeline** allows the output of one command to become the input to another, enabling administrators to construct useful administrative operations from smaller commands.\n\nPowerShell also provides formatting capabilities such as `Format-Table` and `Format-List`, which allow administrative information to be presented appropriately. More importantly, commands can be placed into scripts, making repetitive administration more consistent and repeatable.\n\nFinally, **PowerShell remoting** allows administrators to perform administration against remote servers. For NexaHealth, this means PowerShell can become an administrative framework across many Server Core machines rather than merely a local command prompt."
    ],
    "markingGuide": "| Criterion | Marks |\n|---|---|\n| Cmdlets | 1 |\n| Variables | 1 |\n| Pipeline | 1 |\n| Formatting | 1 |\n| Automation/scripting | 1 |\n| Remote administration | 1 |\n| **Total** | **6** |",
    "points": 6,
    "tags": [
      "powershell",
      "technological impact",
      "systems thinking"
    ],
    "explanation": "The strongest answers explain how PowerShell enables repeatability and scale, not merely speed."
  },
  {
    "id": "ITCOA_W5_Q29",
    "type": "multiple-choice",
    "sectionLabel": "4.7",
    "text": "An administrator runs:\n\n```powershell\nGet-NetIPAddress | Format-Table\n```\n\nWhat is the role of `Format-Table` in this command?",
    "options": [
      "It changes the server's IP addresses.",
      "It retrieves IP addresses from another server.",
      "It formats the output of the preceding command into a table-oriented display.",
      "It validates whether the IP addresses are statically configured."
    ],
    "correctAnswers": [
      "It formats the output of the preceding command into a table-oriented display."
    ],
    "points": 2,
    "tags": [
      "powershell",
      "pipelines"
    ],
    "explanation": "Get-NetIPAddress retrieves information; Format-Table controls how the resulting information is displayed."
  },
  {
    "id": "ITCOA_W5_Q30",
    "type": "open-ended",
    "sectionLabel": "4.8",
    "text": "Name the PowerShell environment from the Week 5 material designed specifically to assist with scripting through features such as syntax highlighting and interactive execution. (Answer: 1–3 words only.)",
    "correctAnswers": [
      "PowerShell ISE"
    ],
    "points": 1,
    "validationOptions": {
      "caseSensitive": false,
      "tolerance": 10
    },
    "tags": [
      "powershell",
      "system configuration"
    ],
    "explanation": "PowerShell ISE (Integrated Scripting Environment) provides syntax highlighting and interactive script execution for PowerShell development."
  },
  {
    "id": "ITCOA_W5_Q31",
    "type": "fill-in-the-blank",
    "sectionLabel": "4.9",
    "text": "In PowerShell ISE, the keyboard shortcut used to **Run Script** is ___.",
    "blanks": [
      {
        "id": "b1",
        "options": [
          "F5",
          "F8",
          "F1",
          "Ctrl+R"
        ],
        "correctAnswer": "F5"
      }
    ],
    "points": 1,
    "tags": [
      "powershell",
      "system configuration"
    ],
    "explanation": "In PowerShell ISE, **F5** is the global shortcut for 'Run Script'. It executes the entire script file currently open in the editor window, which is efficient for testing full automation workflows."
  },
  {
    "id": "ITCOA_W5_Q32",
    "type": "fill-in-the-blank",
    "sectionLabel": "4.10",
    "text": "In PowerShell ISE, the keyboard shortcut used to **Run Selection** is ___.",
    "blanks": [
      {
        "id": "b1",
        "options": [
          "F8",
          "F5",
          "F2",
          "Ctrl+Enter"
        ],
        "correctAnswer": "F8"
      }
    ],
    "points": 1,
    "tags": [
      "powershell",
      "system configuration"
    ],
    "explanation": "In PowerShell ISE, **F8** allows for granular testing by running only the specific lines of code that the administrator has highlighted. This is invaluable for debugging complex scripts one logical block at a time without restarting the entire execution."
  },
  {
    "id": "SCENARIO_ITCOA_W5_Q5",
    "type": "scenario",
    "title": "Question 5 — Remote Administration and Operational Decision-Making (20 Marks)",
    "context": "NexaHealth now has: NEXA-DC01, NEXA-DC02, NEXA-DNS01, NEXA-FILE01, NEXA-WEB01. The machines are distributed between the organisation's main data centre and a regional office.\n\nAn administrator at the regional office needs to investigate a service on NEXA-FILE01. The server is functioning normally, but the administrator does not want to establish an interactive Remote Desktop session simply to execute administrative commands."
  },
  {
    "id": "ITCOA_W5_Q33",
    "type": "multiple-choice",
    "sectionLabel": "5.1",
    "text": "Which approach from the Week 5 material is MOST directly suited to this requirement?",
    "options": [
      "PowerShell remoting",
      "Reinstalling Server Core",
      "SConfig executed locally at the server",
      "Changing the server to Desktop Experience"
    ],
    "correctAnswers": [
      "PowerShell remoting"
    ],
    "points": 2,
    "tags": [
      "remote administration",
      "powershell"
    ],
    "explanation": "The scenario specifically requires remotely executing administrative commands without relying on an interactive RDP desktop."
  },
  {
    "id": "ITCOA_W5_Q34",
    "type": "fill-in-the-blank",
    "sectionLabel": "5.2",
    "text": "The Windows service that supports PowerShell remoting is ___.",
    "blanks": [
      {
        "id": "b1",
        "options": [          
          "WinRS",
          "WinRM",
          "RDP",
          "SMB"
        ],
        "correctAnswer": "WinRM"
      }
    ],
    "points": 1,
    "tags": [
      "remote administration",
      "powershell"
    ],
    "explanation": "PowerShell remoting relies on Windows Remote Management (WinRM)."
  },
  {
    "id": "ITCOA_W5_Q35",
    "type": "multiple-choice",
    "sectionLabel": "5.3",
    "text": "Which command establishes an interactive PowerShell session with the Server Core machine?",
    "options": [
      "Enter-PSSession -ComputerName ServerCore -Credential domain\\administrator",
      "Connect-ServerCore -ComputerName ServerCore",
      "Remote-Computer -Name ServerCore",
      "Start-RDPServer -ComputerName ServerCore"
    ],
    "correctAnswers": [
      "Enter-PSSession -ComputerName ServerCore -Credential domain\\administrator"
    ],
    "points": 2,
    "tags": [
      "powershell",
      "remote administration"
    ],
    "explanation": "Enter-PSSession establishes an interactive PowerShell session with a remote computer."
  },
  {
    "id": "ITCOA_W5_Q36",
    "type": "show-answer",
    "sectionLabel": "5.4",
    "text": "The regional administrator argues that remote PowerShell is unnecessary because RDP already allows remote access. Evaluate this argument. Your answer should: explain what remote PowerShell allows an administrator to do; explain the relationship between PowerShell remoting and remote server administration; explain why remote administration is particularly valuable in a Server Core environment; distinguish command-based administration from an interactive graphical desktop session; apply your reasoning to the NexaHealth regional-office scenario.",
    "correctAnswers": [
      "The argument that remote PowerShell is unnecessary because RDP already provides remote access overlooks the different purposes of the two mechanisms.\n\nRDP provides a remote graphical desktop session, whereas **PowerShell remoting** allows an administrator to execute PowerShell commands against the remote server. The administrator can therefore perform administration without establishing a graphical desktop session.\n\nThis is particularly useful for **Server Core**, because Server Core does not provide the normal local graphical desktop environment. PowerShell remoting therefore provides a natural administration mechanism for Server Core machines.\n\nIn the NexaHealth scenario, the administrator at the regional office can remotely connect to NEXA-FILE01, investigate the server and perform supported administrative tasks without physically travelling to the server or depending on an interactive desktop session.\n\nTherefore, RDP and PowerShell remoting should not be regarded as identical alternatives. They provide different administrative mechanisms, and PowerShell remoting is particularly appropriate for command-driven Server Core administration."
    ],
    "markingGuide": "| Criterion | Marks |\n|---|---|\n| Explains remote PowerShell | 1 |\n| Distinguishes it from RDP | 2 |\n| Explains relevance to Server Core | 1 |\n| Applies to NexaHealth | 1 |\n| Explains operational benefit | 1 |\n| Provides justified conclusion | 1 |\n| **Total** | **7** |",
    "points": 7,
    "tags": [
      "remote administration",
      "powershell",
      "systems thinking"
    ],
    // Question 5.4 — RDP vs PowerShell Remoting
    image: {
      src: "/images/ITCOA_W5_Q36.png",
      alt: "Comparison of Remote Desktop and PowerShell Remoting for administering a remote Windows Server, showing graphical and command-based remote administration approaches.",
      caption: "Figure 4: Remote administration approaches"
    },
    "explanation": "A weak answer says 'PowerShell is faster.' A strong answer explains the different administration models."
  },
  {
    "id": "ITCOA_W5_Q37",
    "type": "multiple-choice",
    "sectionLabel": "5.5",
    "text": "An administrator needs a broad management interface for examining **events, files, firewall settings, network configuration, registry, services, roles and features, and PowerShell** on a Server Core machine. Which solution most closely matches this requirement?",
    "options": [
      "Windows Admin Center",
      "SConfig",
      "hostname",
      "Get-Date"
    ],
    "correctAnswers": [
      "Windows Admin Center"
    ],
    "points": 2,
    "tags": [
      "windows admin center",
      "system configuration"
    ],
    "explanation": "The described combination of browser-based management functions corresponds directly to Windows Admin Center."
  },
  {
    "id": "ITCOA_W5_Q38",
    "type": "open-ended",
    "sectionLabel": "5.6",
    "text": "Which Microsoft tool is designed specifically for centralised remote management of Windows servers through a browser-based interface? (Answer: 1–3 words only.)",
    "correctAnswers": [
      "Windows Admin Center"
    ],
    "points": 1,
    "validationOptions": {
      "caseSensitive": false,
      "tolerance": 10
    },
    "tags": [
      "windows admin center",
      "remote administration"
    ],
    "explanation": "Windows Admin Center is Microsoft's browser-based, centralised remote-management platform for Windows servers."
  },
  {
    "id": "ITCOA_W5_Q39",
    "type": "show-answer",
    "sectionLabel": "5.7",
    "text": "NexaHealth is deciding between **SConfig, PowerShell, Windows Admin Center and Server Manager** for administering its expanding server estate. Recommend how these tools should be used **together**, rather than treating them as competing technologies. Your answer should identify the circumstances in which each tool is particularly appropriate and justify the resulting administrative strategy.",
    "correctAnswers": [
      "The tools should be treated as complementary rather than mutually exclusive.\n\n**SConfig** is particularly useful for the initial configuration of a Server Core machine, including tasks such as hostname and network configuration.\n\n**PowerShell** provides command-based administration, scripting, automation and remote administration. It is therefore particularly appropriate when administrators need repeatable operations across multiple servers.\n\n**Windows Admin Center** provides a broader browser-based management experience and is useful when administrators want graphical visibility into areas such as events, files, networking, firewall configuration, services, roles and PowerShell.\n\n**Server Manager/RSAT** can also be used for remote management of appropriate Windows Server environments.\n\nFor NexaHealth, a sensible strategy would therefore use SConfig during initial Server Core setup, Windows Admin Center for broad interactive remote management, and PowerShell for precise, repeatable and automated administration."
    ],
    "markingGuide": "| Criterion | Marks |\n|---|---|\n| SConfig correctly positioned | 1 |\n| PowerShell correctly positioned | 1 |\n| Windows Admin Center correctly positioned | 1 |\n| Server Manager/RSAT correctly positioned | 1 |\n| Integrated justification | 1 |\n| **Total** | **5** |",
    "points": 5,
    "tags": [
      "sconfig",
      "powershell",
      "windows admin center",
      "systems thinking"
    ],
    // Question 5.7 — Administration Tools
    image: {
      src: "/images/ITCOA_W5_Q39.png",
      alt: "Windows Server administration environment showing SConfig, PowerShell, Windows Admin Center, and Server Manager surrounding a central server estate.",
      caption: "Figure 5: Windows Server administration tools"
    },
    "explanation": "The important word is 'together'. Treating one tool as a universal replacement for all others indicates weak systems understanding."
  },
  {
    "id": "SCENARIO_ITCOA_W5_Q6",
    "type": "scenario",
    "title": "Question 6 — Integrated Infrastructure Decision (15 Marks)",
    "context": "NexaHealth's Chief Information Officer has approved the following proposal: \"All new infrastructure servers should automatically be installed as Server Core, configured locally using SConfig, administered remotely using Windows Admin Center, and automated using PowerShell.\" Before implementation, the infrastructure manager asks you to review the proposal."
  },
  {
    "id": "ITCOA_W5_Q40",
    "type": "multiple-choice",
    "sectionLabel": "6.1",
    "text": "Which criticism is MOST academically defensible?",
    "options": [
      "The proposal is completely incorrect because Server Core cannot be remotely managed.",
      "The proposal is reasonable as a general strategy, but the appropriate management method depends on the task and environment; Server Core does not mean that every administrative task must be performed through SConfig.",
      "The proposal is incorrect because PowerShell cannot manage Server Core.",
      "The proposal is incorrect because Windows Admin Center replaces PowerShell completely."
    ],
    "correctAnswers": [
      "The proposal is reasonable as a general strategy, but the appropriate management method depends on the task and environment; Server Core does not mean that every administrative task must be performed through SConfig."
    ],
    "points": 2,
    "tags": [
      "systems thinking",
      "technological impact"
    ],
    "explanation": "The proposal contains several sound ideas, but no single tool should be treated as the universal administration mechanism."
  },
  {
    "id": "ITCOA_W5_Q41",
    "type": "fill-in-the-blank",
    "sectionLabel": "6.2",
    "text": "A Server Core installation can be managed remotely using Windows Admin Center, RSAT, Server Manager and ___.",
    "blanks": [
      {
        "id": "b1",
        "options": [          
          "Notepad",
          "Disk Cleanup",
          "Task Scheduler UI",
          "PowerShell"
        ],
        "correctAnswer": "PowerShell"
      }
    ],
    "points": 1,
    "tags": [
      "powershell",
      "remote administration"
    ],
    "explanation": "PowerShell is one of the principal remote administration mechanisms identified for Server Core."
  },
  {
    "id": "ITCOA_W5_Q42",
    "type": "multiple-choice",
    "sectionLabel": "6.3",
    "text": "NexaHealth plans to deploy another Server Core server that will provide DNS and file services but will not require a local graphical interface. Which consideration provides the strongest justification for the Server Core choice?",
    "options": [
      "It guarantees that no administrative errors can occur.",
      "Its smaller footprint can reduce the attack surface and servicing/management requirements while retaining the necessary server capabilities.",
      "It prevents all remote administration.",
      "It eliminates the requirement for network configuration."
    ],
    "correctAnswers": [
      "Its smaller footprint can reduce the attack surface and servicing/management requirements while retaining the necessary server capabilities."
    ],
    "points": 2,
    "tags": [
      "server core",
      "technological impact"
    ],
    "explanation": "This captures the underlying architectural reason for choosing Server Core rather than merely stating that it is 'different.'"
  },
  {
    "id": "ITCOA_W5_Q43",
    "type": "show-answer",
    "sectionLabel": "6.4",
    "text": "You have been appointed to present the final Week 5 infrastructure recommendation to the NexaHealth infrastructure manager. Construct a coherent administration strategy for the organisation's new Windows Server environment. Your recommendation must integrate **at least five** of the following concepts: Server Core; reduced software footprint; reduced attack surface; SConfig; static IP configuration; DNS configuration; hostname configuration; domain membership; AD DS installation; domain-controller promotion; DNS in the domain-controller deployment; Windows Admin Center; Server Manager; PowerShell; PowerShell pipelines; PowerShell remoting; PowerShell ISE; verification of domain-controller replication.\n\nYour answer must not simply describe what each technology does. Instead, construct a **defensible operational strategy** explaining: 1) why the organisation would choose particular technologies; 2) which tasks should be performed locally and which remotely; 3) how PowerShell improves repeatability and administration; 4) how Server Core fits into the overall infrastructure strategy; and 5) how the organisation should verify that a newly deployed domain controller is functioning correctly.",
    "correctAnswers": [
      "NexaHealth should adopt Server Core for infrastructure servers where a local graphical desktop is not required. The reduced installation footprint makes Server Core appropriate for services such as domain controllers and DNS, while remote administration allows administrators to manage these systems without relying on a local GUI.\n\nDuring deployment, the administrator should use **SConfig** where appropriate for initial configuration tasks such as establishing the hostname and network settings. The server should receive a stable static IP configuration, appropriate prefix and gateway information, and correct DNS configuration before being incorporated into the domain infrastructure.\n\nOnce the basic configuration is complete, PowerShell should be used for more precise and repeatable administration. For example:\n\n```powershell\nGet-NetIPConfiguration\n```\n\ncan be used to inspect network configuration, while commands such as `Rename-Computer` and `Restart-Computer` support configuration operations.\n\nFor a domain controller, NexaHealth should install AD DS using:\n\n```powershell\nInstall-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools\n```\n\nThe server can then be joined to the domain and promoted using:\n\n```powershell\nInstall-ADDSDomainController -InstallDns -DomainName NEXAHEALTH.LOCAL\n```\n\nDNS must be considered carefully because it is integral to Active Directory operation.\n\nFor ongoing administration, **Windows Admin Center** should provide a broad graphical remote-management capability, while **PowerShell remoting** should be used where command-line administration, automation or repeatability is preferable. This is particularly valuable as NexaHealth's server estate expands.\n\nPowerShell pipelines can also allow administrators to combine administrative operations. For example:\n\n```powershell\nGet-Command -Name *Restart* | Format-List\n```\n\npasses command information into another cmdlet for structured presentation.\n\nFinally, deployment should not be considered complete merely because the promotion command succeeds. NexaHealth should verify the resulting domain controller through **Active Directory Users and Computers, DNS Management and replication status**, including:\n\n```text\nRepadmin /showrepl\n```\n\nThis combination provides a coherent administration strategy: Server Core provides an appropriate minimal server environment; SConfig supports initial configuration; PowerShell supports precise and repeatable administration; Windows Admin Center supports broad remote management; and verification confirms that the resulting infrastructure actually functions as intended."
    ],
    "markingGuide": "| Criterion | Marks |\n|---|---|\n| Justifies Server Core selection | 1 |\n| Explains reduced footprint/attack-surface rationale | 1 |\n| Correctly positions SConfig | 1 |\n| Correctly explains network/DNS/hostname preparation | 1 |\n| Correctly positions PowerShell | 1 |\n| Correct AD DS installation process | 1 |\n| Correct domain-controller promotion concept | 1 |\n| Explains remote administration/WAC | 1 |\n| Explains verification/replication | 1 |\n| Overall integration and justified strategy | 1 |\n| **Total** | **10** |",
    "points": 10,
    "tags": [
      "server core",
      "active directory",
      "powershell",
      "systems thinking",
      "technological impact"
    ],
    "explanation": "This is the highest-level question in the paper. An A+ answer demonstrates the relationship between the technologies rather than treating Server Core, SConfig, PowerShell and Windows Admin Center as isolated topics."
  }
];