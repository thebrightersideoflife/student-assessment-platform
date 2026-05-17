// src/data/questions/ITSSA/week3.js
export default [

  // ─── SCENARIO ────────────────────────────────────────────────────────────────

  {
    id: "ITSSA_W3_S1",
    type: "scenario",
    context: "Asterion Dynamics is a multinational manufacturer specialising in industrial robotics, IoT-enabled medical devices, and autonomous logistics systems.\n\nAfter a rapid digital transformation initiative, the company migrated legacy applications into a unified cloud-connected infrastructure. Shortly afterwards, several suspicious incidents occurred:\n\n• Production servers unexpectedly executed shell commands\n• Browser sessions belonging to managers were hijacked\n• Internal redirects sent users to fraudulent login portals\n• A robotics control process crashed after receiving malformed telemetry packets\n• Security researchers identified exploitable memory corruption vulnerabilities in legacy code\n\nAsterion Dynamics has commissioned an independent cyber-forensics team to evaluate the system architecture, identify attack vectors, and recommend mitigation strategies. All questions in this assessment relate to this organisational ecosystem unless otherwise stated.",
  },

  // ─── QUESTION 1 — Injection Vulnerabilities ──────────────────────────────────

  {
    id: "ITSSA_W3_Q1",
    type: "multiple-choice",
    tags: ["application security", "threat modelling"],
    sectionLabel: "1.1",
    text: "A backend reporting service dynamically constructs operating-system commands using user-submitted filenames:\n\n```cpp\nchar cmd[100] = \"/bin/report \";\nstrcat(cmd, userInput);\nsystem(cmd);\n```\n\nAn attacker submits:\n\n```bash\nquarterly.txt; rm -rf /\n```\n\nWhich underlying condition MOST fundamentally enabled this attack?",
    options: [
      "The server lacked encryption for transmitted files",
      "The application failed to validate shell metacharacters before invoking an interpreter",
      "The operating system permitted symbolic links in the filesystem",
      "The attacker exploited heap fragmentation to overwrite return addresses",
    ],
    correctAnswers: [
      "The application failed to validate shell metacharacters before invoking an interpreter",
    ],
    points: 2,
    explanation:
      "The vulnerability is not merely 'bad input validation' in the abstract — the key issue is **unsafe interpreter interaction**. Shell metacharacters such as `;`, `&&`, pipes, and backticks alter command execution flow once interpreted by the shell. The other options describe unrelated attack vectors: transport security, filesystem behavior, and memory corruption respectively.",
  },

  {
    id: "ITSSA_W3_Q2",
    type: "fill-in-the-blank",
    tags: ["application security"],
    sectionLabel: "1.2",
    text: "A security strategy that blocks only *known dangerous input patterns* is called a ___ approach.",
    blanks: [
      {
        id: "b1",
        options: ["parameterized", "whitelist", "blacklist", "sandbox"],
        correctAnswer: "blacklist",
      },
    ],
    explanation:
      "A **blacklist** (also called a denylist) attempts to deny known dangerous inputs rather than permitting only safe inputs. Modern attackers bypass blacklists using encoding, alternate syntax, obfuscation, or interpreter-specific quirks. A **whitelist** (allowlist) is the more secure alternative.",
  },

  {
    id: "ITSSA_W3_Q3",
    type: "open-ended",
    tags: ["SQL", "application security"],
    sectionLabel: "1.3",
    text: "Which SQL attack technique combines results from multiple queries into one output set?\n\n**Answer in 1–3 words only.**",
    correctAnswers: ["UNION injection", "UNION-based injection", "UNION attack"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 10,
      allowPartialMatch: true,
    },
    explanation:
      "The **UNION** operator combines result sets from multiple `SELECT` statements, enabling attackers to extract data from unintended tables. This is distinct from general SQL injection — the term 'UNION injection' specifically identifies this technique.",
  },

  {
    id: "ITSSA_W3_Q4",
    type: "multiple-choice",
    tags: ["SQL", "application security"],
    sectionLabel: "1.4",
    text: 'An administrator enters the following into a login form:\n\n```sql\n" OR ""="\n```\n\nWhy does this payload often bypass authentication systems?',
    options: [
      "It forces the DBMS to ignore indexes during execution",
      "It creates a condition that evaluates to TRUE for all rows",
      "It overwrites the password hash stored in memory",
      "It exploits Unicode conversion inconsistencies in SQL interpreters",
    ],
    correctAnswers: [
      "It creates a condition that evaluates to TRUE for all rows",
    ],
    points: 2,
    explanation:
      'Authentication bypass occurs because the injected logical condition `"" = ""` is always true, causing every row to satisfy the `WHERE` clause. The intended credential check becomes meaningless — the database returns a result regardless of what password was stored.',
  },

  {
    id: "ITSSA_W3_Q5",
    type: "show-answer",
    tags: [
      "application security",
      "risk management",
      "security policies",
      "threat modelling",
    ],
    sectionLabel: "1.5",
    text: "Investigators discovered that several departments within Asterion Dynamics independently developed small automation tools that directly invoke shell commands using runtime user input.\n\nThe board requests a technical briefing explaining:\n\n- Why command injection vulnerabilities emerge in enterprise systems\n- The distinction between **command injection** and **code injection**\n- How attackers leverage interpreters and metacharacters\n- The organisational risks posed by these vulnerabilities\n- A comparative evaluation of **complete**, **strong**, and **weak** mitigation approaches\n- Why blacklist-based defenses frequently fail in modern infrastructures",
    correctAnswers: [
      "**Command injection** vulnerabilities emerge when applications pass unsanitised user input into operating-system interpreters such as Bash, PowerShell, or CMD. The root problem is misplaced trust in external input combined with unsafe runtime command construction.\n\nIn enterprise environments, command injection often appears in automation scripts, deployment tools, reporting systems, file-management utilities, and legacy integration middleware.\n\n**Command injection vs. code injection:** Command injection manipulates *existing* interpreter functionality already present in the application — the attacker abuses legitimate command execution pathways. Code injection inserts *entirely new* executable code into the application runtime, often exploiting a language's `eval()` or similar dynamic execution mechanisms.\n\n**Metacharacter exploitation:** Interpreters parse special shell metacharacters that allow attackers to terminate intended commands and append malicious operations:\n\n- `;` — separates sequential commands\n- `&&` — executes the second command if the first succeeds\n- `|` — pipes output between commands\n- Backticks and `$()` — execute sub-commands inline\n\nFor example, `report.txt; wget malware.sh` causes the shell to execute both commands sequentially.\n\n**Organisational risks** are severe because command execution frequently inherits the privileges of the vulnerable application process. Consequences include data destruction, ransomware execution, privilege escalation, lateral movement, production downtime, and supply-chain compromise.\n\n**Mitigation comparison:**\n\n*Complete mitigation* — avoid shell interpreters entirely. Applications should use secure APIs or parameterised library calls instead of dynamic shell execution.\n\n*Strong mitigation* — strict allowlists and constrained inputs: fixed command templates, regex validation, enumerated filenames, and restricted execution environments.\n\n*Weak mitigation* — blacklist filtering attempts to block dangerous characters or strings.\n\n**Why blacklists fail:** Attackers encode payloads (URL, hex, unicode), shells support alternate syntax for the same operations, filters cannot predict every dangerous pattern, and interpreter behaviour evolves continuously. Modern security architecture therefore requires defense in depth, least privilege, sandboxing, monitoring, and secure software engineering practices.",
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Explains command injection correctly | 2 |
| Distinguishes from code injection | 2 |
| Explains shell metacharacter exploitation | 2 |
| Discusses enterprise/organisational impact | 2 |
| Evaluates mitigation approaches comparatively | 1 |
| Critiques blacklist limitations deeply | 1 |
| **Total** | **10** |

**Common weaknesses:** Merely defining command injection without discussing interpreter behavior or mitigation hierarchy. Listing risks without explaining privilege inheritance.`,
    points: 10,
    image: {
        src: "/images/ITSSA_W3_Q5.png",
        alt: "Enterprise command injection trust-boundary diagram showing unsanitized user input flowing through a web application into a shell interpreter and operating system execution layer.",
        caption: "Figure 1 — Enterprise command injection pathway illustrating interpreter abuse, shell metacharacter exploitation, and unsafe command execution flow across trust boundaries."
        }
  },

  {
    id: "ITSSA_W3_Q6",
    type: "multiple-choice",
    tags: ["application security", "access control"],
    sectionLabel: "1.6",
    text: "Which scenario BEST represents **LDAP injection**?",
    options: [
      "A malicious JavaScript payload executes inside a browser comment section",
      "User input modifies a dynamically constructed directory-service query",
      "A telemetry packet overwrites a stack return address",
      "An attacker forces an AJAX request to replay stale session cookies",
    ],
    correctAnswers: [
      "User input modifies a dynamically constructed directory-service query",
    ],
    points: 2,
    explanation:
      "**LDAP injection** mirrors SQL injection conceptually but targets directory-service query interpreters instead of relational databases. When unsanitised user input is inserted into a dynamically constructed LDAP query, attackers can manipulate the query logic to bypass authentication or extract directory data.",
  },

  {
    id: "ITSSA_W3_Q7",
    type: "fill-in-the-blank",
    tags: ["SQL", "application security"],
    sectionLabel: "1.7",
    text: "The SQL defense mechanism where placeholders such as `@0` are used is known as ___ queries.",
    blanks: [
      {
        id: "b1",
        options: ["parameterized", "blacklisted", "encoded", "stored"],
        correctAnswer: "parameterized",
      },
    ],
    explanation:
      "**Parameterized queries** (also called prepared statements) separate SQL code from data by using placeholders. The database treats the user-supplied value strictly as data — never as executable SQL — which completely prevents SQL injection regardless of the input content.",
  },

  {
    id: "ITSSA_W3_Q8",
    type: "open-ended",
    tags: ["network protocols", "application security"],
    sectionLabel: "1.8",
    text: "Name the protocol commonly targeted in directory-service injection attacks.\n\n**Answer in 1–3 words only.**",
    correctAnswers: [
      "LDAP",
      "Lightweight Directory Access Protocol",
      "Lightweight Directory Access Protocol (LDAP)",
    ],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      allowPartialMatch: true,
      tolerance: 0,
    },
    explanation:
      "**LDAP** (Lightweight Directory Access Protocol) is widely used for enterprise authentication and directory services (e.g., Microsoft Active Directory). Because many applications dynamically construct LDAP queries from user input, it is a frequent injection target.",
  },

  // ─── QUESTION 2 — XSS, Session Exploitation & AJAX Security ─────────────────

  {
    id: "ITSSA_W3_Q9",
    type: "multiple-choice",
    tags: ["application security", "threat modelling"],
    sectionLabel: "2.1",
    text: "A malicious payload stored inside customer feedback forms executes whenever administrators review submitted tickets.\n\nThis attack is BEST classified as:",
    options: [
      "Reflected XSS",
      "Stored XSS",
      "Command Injection",
      "Heap Smashing",
    ],
    correctAnswers: ["Stored XSS"],
    points: 2,
    explanation:
      "**Persistence** distinguishes stored XSS from reflected XSS. In stored (persistent) XSS, the malicious payload is saved server-side — in a database, comment field, or ticket — and delivered repeatedly to every victim who views that content. Reflected XSS requires the victim to click a crafted URL each time.",
  },

  {
    id: "ITSSA_W3_Q10",
    type: "fill-in-the-blank",
    tags: ["application security"],
    sectionLabel: "2.2",
    text: "Cross-Site Scripting is fundamentally a ___-side code injection attack.",
    blanks: [
      {
        id: "b1",
        options: [ "server", "network", "client", "database"],
        correctAnswer: "client",
      },
    ],
    explanation:
      "XSS is a **client**-side injection attack — malicious scripts execute inside the victim's browser, not on the server. The server may serve the malicious content, but the code runs in the client environment, allowing attackers to steal cookies, manipulate the DOM, or redirect users.",
  },

  {
    id: "ITSSA_W3_Q11",
    type: "open-ended",
    tags: ["application security", "network security"],
    sectionLabel: "2.3",
    text: "What browser security concept restricts scripts from accessing resources across different domains?\n\n**Answer in 1–3 words only.**",
    correctAnswers: [
      "Same-Origin Policy",
      "SOP",
      "same origin policy",
      "same-origin policy",
    ],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      allowPartialMatch: true,
      tolerance: 10,
    },
    explanation:
      "The **Same-Origin Policy (SOP)** is a fundamental browser security mechanism that restricts how a document or script loaded from one origin can interact with resources from a different origin. An origin is defined by the combination of protocol, domain, and port. XSS attacks are particularly dangerous because injected scripts run within the victim's origin, bypassing SOP.",
  },

  {
    id: "ITSSA_W3_Q12",
    type: "multiple-choice",
    tags: ["application security", "access control"],
    sectionLabel: "2.4",
    text: "Which mitigation MOST directly reduces the impact of session-cookie theft through JavaScript execution?",
    options: [
      "Data Execution Prevention",
      "Stack Canaries",
      "HTTPOnly Cookies",
      "Address Space Layout Randomization",
    ],
    correctAnswers: ["HTTPOnly Cookies"],
    points: 2,
    explanation:
      "The `HTTPOnly` flag on a cookie prevents JavaScript (including injected XSS scripts) from reading the cookie value via `document.cookie`. This directly blocks the most common XSS session-hijacking vector. DEP, Stack Canaries, and ASLR are memory-protection mechanisms — they address memory corruption, not browser-side cookie theft.",
  },

  {
    id: "ITSSA_W3_Q13",
    type: "show-answer",
    tags: [
      "application security",
      "risk management",
      "security policies",
      "threat modelling",
    ],
    sectionLabel: "2.5",
    text: "Security analysts discovered that Asterion Dynamics' browser-based administration portal uses AJAX extensively for real-time monitoring.\n\nA penetration-testing team successfully:\n- Manipulated AJAX request parameters\n- Injected scripts into asynchronous responses\n- Hijacked authenticated sessions\n- Redirected managers to fraudulent portals\n\nPrepare a technical security assessment explaining:\n- How AJAX manipulation attacks occur\n- The relationship between AJAX vulnerabilities and XSS\n- How session hijacking emerges\n- How attackers exploit parameter tampering\n- The role of anti-CSRF protections\n- How **CSP**, **HTTPS**, **secure cookies**, and **output encoding** collectively reduce risk",
    correctAnswers: [
      "**AJAX manipulation** vulnerabilities emerge because asynchronous browser-server communication frequently trusts client-side logic excessively. Attackers exploit this trust by intercepting, modifying, replaying, or injecting malicious data into asynchronous requests and responses.\n\nAJAX itself is not inherently insecure — insecurity arises from insufficient server-side validation, unsafe DOM updates, poor session handling, and insecure API design.\n\n**Parameter tampering** involves manipulating identifiers, tokens, or resource references within requests to alter application behaviour or access unauthorised data (e.g., changing a user ID from `42` to `1` to access another account's data). When validation occurs only in JavaScript, attackers bypass controls entirely using proxies or browser developer tools.\n\n**Relationship with XSS:** AJAX responses are frequently injected directly into the DOM. Unsanitised responses allow malicious scripts to execute inside authenticated user sessions — producing reflected or stored XSS from within the asynchronous data pipeline.\n\n**Session hijacking** emerges when injected scripts steal cookies, when sessions travel over unencrypted HTTP, when session identifiers are predictable, or when XSS exposes authentication tokens. Once an attacker possesses a valid session token, they can impersonate the victim, perform unauthorised actions, or redirect them to phishing portals.\n\n**Layered mitigations:**\n\n*Content Security Policy (CSP)* restricts trusted script origins, reducing execution of injected payloads even when injection occurs.\n\n*HTTPS* protects session tokens and all AJAX traffic during transmission, preventing interception.\n\n*Output encoding* ensures browsers interpret user-supplied data as content rather than executable code — the primary defense against XSS in dynamic content.\n\n*Secure & HTTPOnly cookie flags* prevent client-side script access and reduce interception exposure.\n\n*Anti-CSRF tokens* validate request legitimacy, ensuring that cross-site requests cannot forge authenticated actions.\n\n*Server-side validation* eliminates reliance on client-side controls — all inputs must be treated as hostile.\n\nSecurity architecture should assume all client input is adversarial and enforce validation server-side at every boundary.",
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Explains AJAX manipulation clearly | 2 |
| Explains relationship with XSS | 2 |
| Explains parameter tampering | 2 |
| Explains session hijacking | 2 |
| Integrates mitigations meaningfully | 2 |
| **Total** | **10** |

**Common weaknesses:** Simply listing defenses without explaining *why* each works. Failing to connect asynchronous architectures to trust-boundary failures.`,
    points: 10,
    image: {
        src: "/images/ITSSA_W3_Q13.png",
        alt: "AJAX manipulation and session hijacking sequence diagram showing intercepted requests, modified responses, injected JavaScript, and stolen session cookies.",
        caption: "Figure 2 — AJAX manipulation attack sequence demonstrating parameter tampering, response injection, XSS exploitation, and authenticated session hijacking."
        }
  },

  {
    id: "ITSSA_W3_Q14",
    type: "multiple-choice",
    tags: ["application security"],
    sectionLabel: "2.6",
    text: "Which characteristic MOST clearly distinguishes reflected XSS from stored XSS?",
    options: [
      "Reflected XSS requires browser plugins",
      "Stored XSS permanently persists on the target system",
      "Reflected XSS can only occur through AJAX",
      "Stored XSS relies exclusively on SQL interpreters",
    ],
    correctAnswers: ["Stored XSS permanently persists on the target system"],
    points: 2,
    explanation:
      "**Persistence** is the defining distinction. Stored XSS payloads are saved on the server (e.g., in a database) and delivered to every subsequent visitor. Reflected XSS requires the victim to trigger each attack individually via a crafted link — the payload is not stored anywhere.",
  },

  {
    id: "ITSSA_W3_Q15",
    type: "fill-in-the-blank",
    tags: ["application security"],
    sectionLabel: "2.7",
    text: "The security policy that restricts trusted resource origins in browsers is called ___ Security Policy.",
    blanks: [
      {
        id: "b1",
        options: ["Cookie", "Content", "Client", "Cross-Origin"],
        correctAnswer: "Content",
      },
    ],
    explanation:
      "**Content Security Policy (CSP)** is an HTTP response header that instructs the browser to only load scripts, styles, and other resources from explicitly trusted origins. It significantly reduces the impact of XSS by preventing the browser from executing injected scripts from unauthorised sources.",
  },

  {
    id: "ITSSA_W3_Q16",
    type: "multiple-choice",
    tags: ["application security", "threat modelling"],
    sectionLabel: "2.8",
    text: "An attacker intercepts and modifies asynchronous responses returned to a browser in order to inject executable scripts.\n\nThis attack MOST directly demonstrates:",
    options: [
      "Response manipulation",
      "Stack smashing",
      "Pointer subterfuge",
      "V-table smashing",
    ],
    correctAnswers: ["Response manipulation"],
    points: 2,
    explanation:
      "**Response manipulation** describes the interception and modification of server responses (including AJAX responses) to inject malicious content before it reaches the victim's browser. Stack smashing, pointer subterfuge, and V-table smashing are all memory-corruption attacks — unrelated to browser-side response interception.",
  },

  {
    id: "ITSSA_W3_Q17",
    type: "open-ended",
    tags: ["application security", "access control"],
    sectionLabel: "2.9",
    text: "What type of attack tricks authenticated users into unknowingly sending malicious requests?\n\n**Answer in 1–3 words only.**",
    correctAnswers: [
      "CSRF",
      "Cross-Site Request Forgery",
      "Cross Site Request Forgery",
    ],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      allowPartialMatch: true,
      tolerance: 10,
    },
    explanation:
      "**CSRF (Cross-Site Request Forgery)** exploits the trust a web application places in the authenticated user's browser. By tricking a logged-in user into visiting a malicious page, attackers cause the victim's browser to send forged requests to the target application using the victim's credentials — without their knowledge.",
  },

  // ─── QUESTION 3 — Memory Injection & Memory Corruption ───────────────────────

  {
    id: "ITSSA_W3_Q18",
    type: "multiple-choice",
    tags: ["application security", "code quality"],
    sectionLabel: "3.1",
    text: "A robotics-control service receives external input directly into a stack-allocated array without bounds checking.\n\nWhich vulnerability category is MOST likely?",
    options: [
      "Reflected Script Injection",
      "Stack Smashing",
      "SQL Injection",
      "LDAP Injection",
    ],
    correctAnswers: ["Stack Smashing"],
    points: 2,
    explanation:
      "**Stack smashing** occurs when input written into a stack-allocated buffer exceeds its bounds and overwrites adjacent control data such as return addresses or frame pointers. Without bounds checking, the attacker can redirect execution flow. The other options are injection attacks targeting interpreters — unrelated to stack memory management.",
  },

  {
    id: "ITSSA_W3_Q19",
    type: "fill-in-the-blank",
    tags: ["application security"],
    sectionLabel: "3.2",
    text: "A memory protection mechanism that randomises memory-layout locations is abbreviated as ___.",
    blanks: [
      {
        id: "b1",
        options: ["DEP", "NX", "CSP", "ASLR"],
        correctAnswer: "ASLR",
      },
    ],
    explanation:
      "**ASLR (Address Space Layout Randomisation)** randomises the base addresses of stack, heap, and libraries each time a process starts. This makes it significantly harder for attackers to predict memory locations needed to construct reliable exploits, since hardcoded addresses will be invalid on each run.",
  },

  {
    id: "ITSSA_W3_Q20",
    type: "open-ended",
    tags: ["application security", "code quality"],
    sectionLabel: "3.3",
    text: "What type of vulnerability occurs when data is written beyond the intended limits of a buffer?\n\n**Answer in 1–3 words only.**",
    correctAnswers: [
      "buffer overflow",
      "buffer overrun",
      "buffer overwrite",
      "stack overflow",
    ],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      allowPartialMatch: true,
      tolerance: 15,
    },
    explanation:
      "A **buffer overflow** (also called a buffer overrun) occurs when a program writes more data to a buffer than it was allocated to hold. The excess data spills into adjacent memory regions, potentially overwriting control structures such as return addresses — enabling attackers to redirect execution.",
  },

  {
    id: "ITSSA_W3_Q21",
    type: "multiple-choice",
    tags: ["application security", "OOP principles"],
    sectionLabel: "3.4",
    text: "Which condition is ESSENTIAL for pointer subterfuge exploitation?",
    options: [
      "User-controlled overwriting of a pointer before dereferencing",
      "Browser execution of injected JavaScript",
      "SQL interpreters accepting UNION clauses",
      "CSP policies allowing inline scripts",
    ],
    correctAnswers: [
      "User-controlled overwriting of a pointer before dereferencing",
    ],
    points: 2,
    explanation:
      "**Pointer subterfuge** requires that an attacker be able to overwrite a data pointer with an attacker-controlled value *before* the application dereferences (reads from or writes to) that pointer. Once dereferenced, the corrupted pointer redirects memory access to an attacker-chosen location, altering program behavior or enabling code execution.",
  },

  {
    id: "ITSSA_W3_Q22",
    type: "show-answer",
    tags: [
      "application security",
      "risk management",
      "code quality",
      "software testing",
    ],
    sectionLabel: "3.5",
    text: "Asterion Dynamics' legacy robotics controller is written in unmanaged C++ and interfaces directly with industrial hardware. During forensic analysis, researchers identified stack overflows, unsafe pointer manipulation, corrupted virtual method tables, and heap corruption vulnerabilities.\n\nWrite a technical report evaluating:\n- How memory injection attacks alter program flow\n- Why von Neumann architectures inherently enable code/data ambiguity\n- How **stack smashing**, **heap smashing**, **pointer subterfuge**, and **V-table smashing** differ\n- The operational risks these vulnerabilities create in industrial systems\n- How modern defenses such as **DEP**, **ASLR**, **stack canaries**, **bounds checking**, **static analysis**, and **fuzzing** mitigate these threats",
    correctAnswers: [
      "**Memory injection attacks** manipulate runtime memory to alter intended execution flow. Vulnerable software cannot distinguish legitimate data from attacker-controlled memory manipulation — once an attacker can write arbitrary values into critical memory regions, they control what code the processor executes next.\n\n**Von Neumann architecture** fundamentally contributes to this risk because instructions and data share the same address space and the same physical memory. When an attacker corrupts a code pointer or overflows a buffer into an executable region, the CPU has no inherent mechanism to recognise that it is executing attacker-supplied data rather than legitimate program instructions.\n\n**Memory corruption attack categories:**\n\n*Stack smashing* — stack-allocated buffers overflow into adjacent control data such as return addresses, frame pointers, or exception handlers. Overwriting the return address redirects execution to attacker-chosen code when the function returns.\n\n*Heap smashing* — dynamically allocated memory regions are corrupted, affecting allocator metadata, adjacent buffers, function pointers, or object structures. Heap exploitation can enable arbitrary code execution or cause unpredictable application behaviour.\n\n*Pointer subterfuge* — data pointers are overwritten with attacker-controlled values. When the application subsequently dereferences the corrupted pointer, it accesses or writes to an unintended memory location, changing program behaviour or leaking sensitive data.\n\n*V-table smashing* — in object-oriented systems using polymorphism, virtual function tables (V-tables) contain pointers used for dynamic dispatch. If an attacker overwrites V-table entries, malicious functions execute whenever the application makes virtual method calls on that object.\n\n**Operational risks in industrial systems** are exceptionally severe:\n- Manipulation of robotics behavior causing physical harm\n- Manufacturing sabotage and production disruption\n- Denial of service to safety-critical control processes\n- Firmware compromise enabling persistent access\n- Industrial espionage through sensor data exfiltration\n- Infrastructure disruption affecting supply chains\n\n**Modern mitigations:**\n\n*DEP/NX (Data Execution Prevention / No-Execute)* marks memory regions as non-executable, preventing injected payload execution even when an attacker successfully overwrites a return address.\n\n*ASLR* randomises memory locations, making it statistically improbable for attackers to predict addresses needed to construct reliable exploits.\n\n*Stack canaries* place a known sentinel value between local variables and the return address. Before a function returns, the runtime checks the canary — if it has been modified, the process terminates.\n\n*Bounds checking* validates that writes remain within allocated buffer boundaries, preventing the overflow from occurring.\n\n*Static analysis* identifies unsafe coding patterns (e.g., `strcpy`, unchecked `scanf`) during development before deployment.\n\n*Fuzzing* generates large volumes of malformed or unexpected input to discover crash conditions and previously unknown vulnerability paths.\n\nNo single defense fully eliminates memory corruption risk. Effective protection requires layered defensive architecture combined with secure coding discipline and memory-safe language choices where feasible.",
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Explains memory injection conceptually | 2 |
| Explains von Neumann implications | 2 |
| Distinguishes all four attack categories correctly | 4 |
| Discusses industrial/operational risks | 2 |
| Explains mitigations accurately and with integration | 2 |
| **Total** | **12** |

**Common weaknesses:** Conflating stack and heap corruption. Describing mitigations in isolation without explaining why layering is necessary.`,
    points: 12,
    image: {
        src: "/images/ITSSA_W3_Q22.png",
        alt: "V-table smashing diagram showing corruption of a polymorphic object's virtual table pointer and redirection to malicious function pointers.",
        caption: "Figure 4 — V-table smashing exploit demonstrating virtual function pointer corruption and malicious control-flow redirection in object-oriented systems."
        }
  },

  {
    id: "ITSSA_W3_Q23",
    type: "multiple-choice",
    tags: ["application security", "OOP principles"],
    sectionLabel: "3.6",
    text: "Which vulnerability specifically targets polymorphic object-oriented systems through manipulation of virtual function structures?",
    options: [
      "AJAX Manipulation",
      "V-Table Smashing",
      "Cookie Theft",
      "SQL UNION Injection",
    ],
    correctAnswers: ["V-Table Smashing"],
    points: 2,
    explanation:
      "**V-table smashing** targets the virtual function table — a structure used in C++ and other OOP languages for dynamic dispatch (polymorphism). Each object with virtual methods holds a pointer to its V-table. By corrupting this pointer or the table entries, an attacker causes the application to call malicious functions whenever a virtual method is invoked.",
  },

  {
    id: "ITSSA_W3_Q24",
    type: "fill-in-the-blank",
    tags: ["application security"],
    sectionLabel: "3.7",
    text: "A protection mechanism that prevents execution in marked memory regions is called Data Execution ___.",
    blanks: [
      {
        id: "b1",
        options: ["Policy", "Prevention", "Protection", "Partition"],
        correctAnswer: "Prevention",
      },
    ],
    explanation:
      "**Data Execution Prevention (DEP)** — also known as the NX (No-Execute) bit at the hardware level — marks memory pages as either executable or non-executable. Code can only execute from regions marked executable, preventing attackers from running shellcode injected into data regions such as the stack or heap.",
  },

  {
    id: "ITSSA_W3_Q25",
    type: "multiple-choice",
    tags: ["application security", "code quality"],
    sectionLabel: "3.8",
    text: "Why are VAR-ARG vulnerabilities especially dangerous in low-level languages like C?",
    options: [
      "They inherently bypass HTTPS encryption",
      "They can permit uncontrolled stack access through malformed formatting input",
      "They automatically escalate privileges to kernel mode",
      "They disable memory randomization protections",
    ],
    correctAnswers: [
      "They can permit uncontrolled stack access through malformed formatting input",
    ],
    points: 2,
    explanation:
      "VAR-ARG (variable argument) functions like `printf` in C read arguments from the stack based on format specifiers provided by the caller. If an attacker controls the format string, they can supply specifiers (e.g., `%x`, `%n`) that cause the function to read from or write to arbitrary stack locations — a **format string vulnerability**. This can leak sensitive data or corrupt memory.",
  },

  {
    id: "ITSSA_W3_Q26",
    type: "open-ended",
    tags: ["application security", "system design"],
    sectionLabel: "3.9",
    text: "What memory region commonly stores local variables and function parameters?\n\n**Answer in 1–3 words only.**",
    correctAnswers: ["stack", "the stack", "call stack", "program stack"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      allowPartialMatch: true,
      tolerance: 0,
    },
    explanation:
      "The **stack** is a LIFO (Last In, First Out) memory region that stores local variables, function parameters, return addresses, and frame pointers for each active function call. Its structured, predictable layout makes it a primary target for buffer overflow attacks — particularly stack smashing.",
  },

  // ─── QUESTION 4 — Integrated Security Architecture ───────────────────────────

  {
    id: "ITSSA_W3_Q27",
    type: "multiple-choice",
    tags: ["application security", "threat modelling"],
    sectionLabel: "4.1",
    text: "Which principle BEST explains why relying solely on client-side validation is insecure?",
    options: [
      "Browsers cannot execute JavaScript consistently",
      "Attackers can manipulate requests outside intended interfaces",
      "CSP disables server-side validation mechanisms",
      "SQL interpreters ignore malformed requests automatically",
    ],
    correctAnswers: [
      "Attackers can manipulate requests outside intended interfaces",
    ],
    points: 2,
    explanation:
      "Client-side validation (JavaScript form checks, UI restrictions) is entirely bypassable. Attackers use tools like Burp Suite, `curl`, or browser developer tools to craft and send requests that completely bypass the browser UI — submitting whatever values they choose directly to the server. Server-side validation is the only authoritative control.",
  },

  {
    id: "ITSSA_W3_Q28",
    type: "fill-in-the-blank",
    tags: ["risk management", "security policies"],
    sectionLabel: "4.2",
    text: "Security mechanisms that apply multiple overlapping controls are implementing ___ in depth.",
    blanks: [
      {
        id: "b1",
        options: ["defense", "security", "validation", "encryption"],
        correctAnswer: "defense",
      },
    ],
    explanation:
      "**Defense in depth** is a layered security strategy where multiple independent controls protect the same assets. If one layer fails or is bypassed, additional layers continue to provide protection. For example, combining parameterized queries, input validation, WAF rules, and least-privilege database accounts against SQL injection.",
  },

  {
    id: "ITSSA_W3_Q29",
    type: "show-answer",
    tags: [
      "application security",
      "SDLC",
      "security policies",
      "risk management",
      "threat modelling",
    ],
    sectionLabel: "4.3",
    text: "Asterion Dynamics plans to redesign its entire software-security architecture after the incidents described throughout this examination.\n\nAs the lead security consultant, prepare an **executive-level technical strategy** explaining:\n- Why modern organisations must treat injection vulnerabilities as systemic engineering failures rather than isolated coding bugs\n- How insecure software design decisions propagate across enterprise ecosystems\n- Why secure development lifecycle (SDLC) practices are critical\n- How organisational policy, developer education, and secure coding standards interact\n- How layered technical defenses should be prioritised across web applications, APIs, memory-safe systems, and enterprise infrastructure\n\nYour response should integrate: command injection, SQL injection, XSS, AJAX manipulation, session hijacking, memory corruption, and enterprise mitigation strategy.",
    correctAnswers: [
      "Modern organisations must treat injection vulnerabilities as **systemic engineering failures** because these attacks emerge from broken trust assumptions embedded throughout software ecosystems — not from isolated programmer errors.\n\nInjection vulnerabilities share a common root cause: applications that trust external input, expose interpreters unsafely, fail to validate boundaries, or improperly separate code from data. These are **architectural failures** that appear consistently across teams, codebases, and years of development.\n\n**Propagation across enterprise ecosystems:** In interconnected infrastructure, a single trust failure cascades rapidly. A vulnerable AJAX endpoint compromises browser sessions; insecure session handling enables privilege escalation; legacy C++ services introduce memory corruption risks accessible from the network; and a compromised API exposes downstream internal systems. Asterion's incidents demonstrate exactly this pattern — multiple distinct vulnerabilities exploited across the same ecosystem.\n\n**Secure SDLC** is therefore not optional — it is the primary engineering control. Security must be integrated across every phase:\n\n- *Requirements:* threat modelling identifies trust boundaries and attack surfaces early\n- *Design:* secure architecture patterns (allowlists, parameterized interfaces, least privilege)\n- *Implementation:* secure coding standards and language/library choices (e.g., memory-safe languages where feasible)\n- *Testing:* penetration testing, static analysis, fuzzing, and dependency auditing\n- *Deployment:* secure defaults, environment hardening, monitoring\n- *Maintenance:* patch management and continuous security review\n\n**Organisational governance** amplifies technical controls. Developer education addresses the root cause — many vulnerabilities originate from misunderstanding interpreter behaviour, memory management, encoding contexts, or trust boundaries. Security policies enforce minimum standards. Least-privilege principles limit blast radius. Executive-level risk ownership ensures security receives adequate resourcing and accountability.\n\n**Layered technical defenses by threat class:**\n\n| Threat | Defensive Measures |\n|---|---|\n| Command Injection | Allowlists, safe APIs, sandboxing, no shell invocation |\n| SQL Injection | Parameterized queries, stored procedures, ORM |\n| XSS | CSP, output encoding, input sanitization |\n| Session Hijacking | HTTPS, HTTPOnly/Secure cookies, session rotation |\n| Memory Corruption | ASLR, DEP, stack canaries, bounds checking, safe languages |\n| AJAX Abuse | Server-side validation, anti-CSRF tokens, output encoding |\n\nCybersecurity resilience cannot be treated as a compliance checkbox or afterthought. It is an ongoing engineering discipline requiring continuous threat modelling, secure architectural decision-making, and an organisational culture where security is a first-class engineering value — not a feature bolted on after release.",
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Frames vulnerabilities systemically (not as individual bugs) | 3 |
| Explains propagation across interconnected ecosystems | 3 |
| Integrates SDLC and security engineering practices | 4 |
| Discusses organisational governance and developer education | 3 |
| Integrates layered mitigations across all vulnerability classes | 4 |
| **Total** | **17** |

**Common weaknesses:** Remaining purely technical without addressing governance or culture. Listing mitigations without integrating them into a coherent architectural strategy. Treating each vulnerability class in isolation rather than as a systemic pattern.`,
    points: 17,
    image: {
        src: "/images/ITSSA_W3_Q29.png",
        alt: "Enterprise defense-in-depth cybersecurity architecture diagram showing layered protections against injection attacks and memory corruption vulnerabilities.",
        caption: "Figure 5 — Defense-in-depth enterprise security architecture illustrating layered mitigations against SQL injection, XSS, command injection, session hijacking, and memory corruption attacks."
        }
  },
];