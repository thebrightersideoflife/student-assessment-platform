// File: src/data/questions/ITDSA/week5.js
// Week 5 — Transaction Management, Concurrency Control & Performance Tuning
// Total: 50 Marks

export default [

  // ─────────────────────────────────────────────────────────────────────────
  // QUESTION 1 SCENARIO — FinTech Global
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "SCENARIO_ITDSA_W5_Q1",
    type: "scenario",
    title: "Question 1: FinTech Global — Transaction Management & Concurrency Control (25 Marks)",
    context: `FinTech Global operates a high-frequency trading and digital wallet platform. The database administration team has observed three critical anomalies threatening system integrity:

Incident A: During a batch of fund transfers, the server experienced a sudden power failure. Upon reboot, audit logs revealed that several users had funds deducted from their accounts, but the corresponding destination accounts were never credited.

Incident B: Financial analysts generating live portfolio summaries reported seeing "phantom" balances. Their aggregate calculations included data from trades that were ultimately aborted and rolled back a few milliseconds later.

Incident C: The system completely halted at 14:00. The DBA traced the issue to three automated trading bots (T1, T2, and T3):
  • T1 locked the EUR_USD asset and was waiting to lock the GBP_USD asset.
  • T2 locked the GBP_USD asset and was waiting to lock the JPY_USD asset.
  • T3 locked the JPY_USD asset and was waiting to lock the EUR_USD asset.`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Q1.1 — Incident A: ACID Violations  (8 Marks)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "ITDSA_W5_Q1_1A",
    type: "multiple-choice",
    sectionLabel: "1.1 Part A",
    text: "In Incident A, funds were deducted from the source account but the destination account was never credited due to a power failure mid-transaction. Which ACID property governs the 'all-or-nothing' rule that was violated here?",
    options: [
      "Consistency — the database moved from one valid state to another.",
      "Atomicity — every operation in the transaction must complete fully, or none of them are applied.",
      "Isolation — the transaction was visible to other concurrent transactions.",
      "Durability — the transaction was committed before the failure occurred.",
    ],
    correctAnswers: [
      "Atomicity — every operation in the transaction must complete fully, or none of them are applied.",
    ],
    points: 3,
  },

  {
    id: "ITDSA_W5_Q1_1B",
    type: "multiple-choice",
    sectionLabel: "1.1 Part B",
    text: "After the power failure in Incident A, the system rebooted and the partial debit remained permanently recorded — the recovery manager failed to undo it. Which ACID property was violated by the system's failure to guarantee that a rolled-back transaction's changes are fully undone after a crash?",
    options: [
      "Atomicity — the transaction was never fully committed.",
      "Consistency — the database schema was corrupted.",
      "Durability — once committed, changes must persist; once aborted, changes must be fully undone and survive crashes.",
      "Isolation — another transaction read the partial state.",
    ],
    correctAnswers: [
      "Durability — once committed, changes must persist; once aborted, changes must be fully undone and survive crashes.",
    ],
    points: 3,
  },

  {
    id: "ITDSA_W5_Q1_1C",
    type: "show-answer",
    sectionLabel: "1.1 Part C",
    text: "Evaluate Incident A. Identify and explain the two specific ACID transaction properties that were violated. For each property, state its definition and explain precisely how the fund transfer failure demonstrates its violation.",
    correctAnswers: [
      "1. Atomicity: States that all operations within a transaction must either complete fully or not be applied at all — the 'all-or-nothing' rule. In Incident A, the debit (Step 1) executed but the credit (Step 2) did not, due to the power failure. Only half the transaction was applied, violating Atomicity. On reboot, the recovery manager should have rolled back the debit to restore the source account balance.\n\n2. Durability: Guarantees that once a transaction is committed, its changes persist through system failures — and if aborted, its changes are fully reversed and do not persist. In Incident A, the partial debit was not reversed after the crash. The transaction log / redo-undo mechanism failed to enforce the correct post-failure state, leaving the database in an inconsistent condition that persisted after reboot. This is a Durability failure.",
    ],
    markingGuide:
      "Award 2 marks for correctly identifying and defining Atomicity. Award 2 marks for correctly identifying and defining Durability. Award 4 marks for discussion explicitly linked to the fund transfer scenario — must mention: the partial debit/credit split, the power failure as the trigger, and the role of the recovery manager. Generic ACID definitions with no scenario linkage are capped at 4/8.",
    points: 8,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Q1.2 — Incident B: Concurrency Problem  (7 Marks)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "ITDSA_W5_Q1_2A",
    type: "multiple-choice",
    sectionLabel: "1.2 Part A",
    text: "In Incident B, the analysts' summary query reads balance data from a trade that is still in progress and is later aborted and rolled back. Which specific concurrency problem is demonstrated, and which locking mechanism would most effectively prevent it?",
    options: [
      "Phantom Read — prevented by Range Locking.",
      "Dirty Read (Uncommitted Dependency) — prevented by exclusive locks (X-locks) that block reads of uncommitted data.",
      "Lost Update — prevented by shared locks (S-locks) on the affected rows.",
      "Inconsistent Retrieval — prevented by Two-Phase Locking (2PL).",
    ],
    correctAnswers: [
      "Dirty Read (Uncommitted Dependency) — prevented by exclusive locks (X-locks) that block reads of uncommitted data.",
    ],
    points: 3,
  },

  {
    id: "ITDSA_W5_Q1_2B",
    type: "show-answer",
    sectionLabel: "1.2 Part B",
    text: "Analyze Incident B. Identify the specific concurrency problem occurring, explain the mechanism by which it arises, and explain why it violates the Isolation property of ACID transactions.",
    correctAnswers: [
      "Problem: Uncommitted Dependency — commonly called a Dirty Read.\n\nMechanism: A Dirty Read occurs when Transaction T1 (the analysts' query) reads data that Transaction T2 (the active trade) is currently modifying but has not yet committed. In Incident B, the analysts' aggregation query read live balance data from trades mid-execution. Those trades were subsequently aborted and rolled back — meaning the data the analysts read never represented a valid, committed database state.\n\nIsolation Violation: The Isolation property requires that a transaction's intermediate states remain invisible to all other concurrent transactions until it commits or aborts. By reading T2's uncommitted data, the analysts' transaction was exposed to T2's internal, in-progress state. This produced inaccurate 'phantom' balance figures. Under full isolation (Serialisable level), the analysts' query would only see the committed pre-trade balances until T2 fully commits or rolls back.",
    ],
    markingGuide:
      "Award 2 marks for correctly naming the problem as Dirty Read / Uncommitted Dependency. Award 2 marks for explaining the mechanism — must mention: reading uncommitted data from an in-progress transaction that is later rolled back. Award 3 marks for linking to Isolation — must explain that isolation requires intermediate states to be invisible and that phantom balances are the direct consequence. Answers naming 'Phantom Read' instead of 'Dirty Read' are capped at 3/7.",
    points: 7,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Q1.3 — Incident C: Deadlock  (10 Marks)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "ITDSA_W5_Q1_3A",
    type: "open-ended",
    sectionLabel: "1.3 Part A",
    text: "Examine Incident C. T1, T2, and T3 are each holding one locked asset and waiting for another, forming a circular chain where no transaction can proceed. What is the specific term for this system state?",
    correctAnswers: ["Deadlock", "deadlock"],
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    points: 2,
  },

  {
    id: "ITDSA_W5_Q1_3B",
    type: "fill-in-the-blank",
    sectionLabel: "1.3 Part B",
    text: "Four conditions must ALL be present simultaneously for a deadlock to occur. Complete each: (1) ___ — only one transaction may hold a lock on a resource at a time. (2) Hold and ___ — a transaction retains its locks while waiting for new ones. (3) No ___ — locks cannot be forcibly removed from the holding transaction. (4) Circular ___ — a closed chain exists where each transaction waits for a resource held by the next.",
    blanks: [
      {
        id: "b1",
        options: ["Atomic Isolation", "Mutual Exclusion", "Exclusive Locking", "Concurrency Control"],
        correctAnswer: "Mutual Exclusion",
      },
      {
        id: "b2",
        options: ["Block", "Queue", "Wait", "Signal"],
        correctAnswer: "Wait",
      },
      {
        id: "b3",
        options: ["Preemption", "Mandatory Release", "Resource Revocation", "Transaction Abort"],
        correctAnswer: "Preemption",
      },
      {
        id: "b4",
        options: ["Dependency", "Wait", "Blocking Chain", "Recursion"],
        correctAnswer: "Wait",
      },
    ],
    points: 4,
  },

  {
    id: "ITDSA_W5_Q1_3C",
    type: "open-ended",
    sectionLabel: "1.3 Part C",
    text: "What is the name of the specific graphical model a DBA uses to detect the circular dependency between T1, T2, and T3 in Incident C? (Two-to-three word answer accepted)",
    correctAnswers: ["Wait-for Graph", "Wait-For Graph", "WFG", "wait-for graph"],
    validationOptions: {
      caseSensitive: false,
      tolerance: 10,
    },
    points: 1,
  },

  {
    id: "ITDSA_W5_Q1_3D",
    type: "show-answer",
    sectionLabel: "1.3 Part D",
    text: "Examine Incident C fully. (1) Identify the system state and apply all four necessary conditions to the T1/T2/T3 scenario. (2) Formulate the scenario as a Wait-For Graph — state the nodes and all directed edges. (3) Explain how the graph structure proves the system is in this state.",
    correctAnswers: [
      "1. State: Deadlock.\n\nFour Conditions applied to Incident C:\n• Mutual Exclusion: EUR_USD, GBP_USD, and JPY_USD can each only be locked by one bot at a time — T1 exclusively holds EUR_USD, T2 holds GBP_USD, T3 holds JPY_USD.\n• Hold and Wait: Each bot holds its current lock while waiting — T1 holds EUR_USD and waits for GBP_USD; T2 holds GBP_USD and waits for JPY_USD; T3 holds JPY_USD and waits for EUR_USD.\n• No Preemption: The system cannot forcibly strip locks from T1, T2, or T3; each bot must release voluntarily.\n• Circular Wait: T1 waits for T2's resource; T2 waits for T3's resource; T3 waits for T1's resource — a closed loop.\n\n2. Wait-For Graph:\nNodes: T1, T2, T3\nDirected Edges:\n  T1 → T2  (T1 waits for resource held by T2)\n  T2 → T3  (T2 waits for resource held by T3)\n  T3 → T1  (T3 waits for resource held by T1)\n\n3. A cycle in the Wait-For Graph (T1 → T2 → T3 → T1) is definitive proof of a deadlock. Every node in the cycle is permanently blocked — no transaction can proceed without acquiring a resource that will never be released. The DBA must resolve this by aborting one transaction (e.g., T3), breaking the cycle and allowing T1 and T2 to proceed.",
    ],
    markingGuide:
      "Award 1 mark for naming Deadlock. Award 4 marks for the four conditions — 1 mark each, must be applied to the T1/T2/T3 scenario specifically (not generic definitions). Award 3 marks for the Wait-For Graph: 1 mark for correct nodes (T1, T2, T3), 2 marks for all three correct directed edges. Award 2 marks for explaining that a cycle proves deadlock and describing resolution. If the loop is not closed (e.g., T3→T1 edge missing), it does not represent a deadlock — deduct graph marks accordingly.",
    diagram: {
      type: "mermaid",
      code: `flowchart LR
    T1["T1\n(holds EUR_USD)"] -->|"waits for GBP_USD"| T2["T2\n(holds GBP_USD)"]
    T2 -->|"waits for JPY_USD"| T3["T3\n(holds JPY_USD)"]
    T3 -->|"waits for EUR_USD"| T1`,
    },
    points: 10,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // QUESTION 2 SCENARIO — OmniCart Retail
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "SCENARIO_ITDSA_W5_Q2",
    type: "scenario",
    title: "Question 2: OmniCart Retail — Database Performance Tuning & Optimisation (25 Marks)",
    context: `OmniCart Retail has recently migrated to a centralised database but is experiencing severe performance bottlenecks during peak shopping hours. The DBA isolated the issue to a massive end-of-day analytical query joining multiple large tables.

Key details observed:
  • The query filters on two columns: Customer_Gender (contains only 'M' or 'F') and Receipt_Number (completely unique for every sale).
  • The system is experiencing high I/O bottlenecks — hard disks are thrashing as they move data to RAM.
  • The database uses a Rule-Based Optimizer (RBO).
  • Developers wrote the SQL query using multiple NOT logical operators and placed the most restrictive AND conditions at the very end of the WHERE clause.`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Q2.1 — Query Processing Phases  (9 Marks)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "ITDSA_W5_Q2_1A",
    type: "fill-in-the-blank",
    sectionLabel: "2.1 Part A",
    text: "During the first phase of query processing, the DBMS validates SQL syntax and checks all table and column names against the ___. It also verifies the user holds sufficient ___ to access the requested data.",
    blanks: [
      {
        id: "b1",
        options: ["Metadata Schema", "Data Dictionary", "System Catalog", "Schema Definition"],
        correctAnswer: "Data Dictionary",
      },
      {
        id: "b2",
        options: ["Authorization Roles", "Privileges", "Access Control Lists", "Permissions"],
        correctAnswer: "Permissions",
      },
    ],
    points: 2,
  },

  {
    id: "ITDSA_W5_Q2_1B",
    type: "multiple-choice",
    sectionLabel: "2.1 Part B",
    text: "After parsing, the DBMS evaluates multiple possible access paths — such as using an index versus a full table scan — and selects the most efficient execution plan before the query runs. Which component performs this step, and what is the phase called?",
    options: [
      "The Buffer Manager performs Caching.",
      "The Query Optimizer performs the Optimisation / Execution Planning phase.",
      "The Transaction Manager performs Scheduling.",
      "The Storage Engine performs the Fetching phase.",
    ],
    correctAnswers: [
      "The Query Optimizer performs the Optimisation / Execution Planning phase.",
    ],
    points: 3,
  },

  {
    id: "ITDSA_W5_Q2_1C",
    type: "show-answer",
    sectionLabel: "2.1 Part C",
    text: "Discuss the three phases of query processing that OmniCart's analytical SQL query will undergo within the DBMS. For each phase, name it, explain what occurs, and apply it to the OmniCart context.",
    correctAnswers: [
      "Phase 1 — Parsing: The DBMS validates SQL syntax, checks that all referenced tables and columns (e.g., Customer_Gender, Receipt_Number) exist in the data dictionary, and verifies the user's access permissions. If any check fails, the query is rejected before any data is touched.\n\nPhase 2 — Optimisation (Execution Planning): The Query Optimizer evaluates multiple access strategies and selects the most efficient execution plan. Since OmniCart uses a Rule-Based Optimizer (RBO), it applies fixed heuristic rules rather than live cost statistics. For example, it decides whether to use an index on Receipt_Number or perform a full table scan on the orders table. The output is an internal execution plan passed to the execution engine.\n\nPhase 3 — Fetching (Execution): The DBMS executes the chosen plan, physically retrieving matching rows from disk storage and loading them into the buffer pool (RAM). The final result set is assembled and returned to the client. This is the phase where OmniCart's disk thrashing is occurring — insufficient buffering and poor query design force large repeated reads from disk into RAM.",
    ],
    markingGuide:
      "Award 3 marks per phase: 1 mark for the correct name, 1 mark for a clear explanation of what occurs, 1 mark for applying it to OmniCart. Naming all three phases with no application: capped at 5/9. Confusing Optimisation and Fetching: deduct 1 mark per affected phase.",
    points: 9,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Q2.2 — Indexing Strategy  (6 Marks)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "ITDSA_W5_Q2_2A",
    type: "open-ended",
    sectionLabel: "2.2 Part A",
    text: "The Customer_Gender column contains only two possible values: 'M' or 'F'. Based on the concept of data cardinality, what specific index type should the DBA implement for this column?",
    correctAnswers: ["Bitmap Index", "Bitmap", "bitmap index", "bitmap"],
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    points: 1,
  },

  {
    id: "ITDSA_W5_Q2_2B",
    type: "multiple-choice",
    sectionLabel: "2.2 Part B",
    text: "The Receipt_Number column contains a completely unique value for every sale. Which index type is most appropriate and why?",
    options: [
      "Bitmap Index — bits map directly to unique row positions efficiently.",
      "Hash Index — best for equality lookups on unique values with no range queries needed.",
      "B-tree Index — ideal for high-cardinality (unique) columns; supports equality and range searches with balanced branching in O(log n) time.",
      "Clustered Index — reorganises the physical table order to match the unique key.",
    ],
    correctAnswers: [
      "B-tree Index — ideal for high-cardinality (unique) columns; supports equality and range searches with balanced branching in O(log n) time.",
    ],
    points: 3,
  },

  {
    id: "ITDSA_W5_Q2_2C",
    type: "show-answer",
    sectionLabel: "2.2 Part C",
    text: "The DBA wants to implement indexing to speed up data access on Customer_Gender and Receipt_Number. Based on the concept of data sparsity (cardinality), recommend the most appropriate index type for each column and fully justify your choices.",
    correctAnswers: [
      "1. Customer_Gender — Bitmap Index.\nJustification: Customer_Gender has very low cardinality — only two distinct values ('M' and 'F'). Bitmap indexes are designed specifically for low-cardinality columns. They create a compact bit vector for each distinct value, where each bit represents whether a row contains that value. With only two values, the bitmaps are tiny and extremely efficient for filtering and aggregation operations. A B-tree on a two-value column would have very poor selectivity and would not justify its overhead.\n\n2. Receipt_Number — B-tree Index.\nJustification: Receipt_Number has very high cardinality — every value is unique across the entire table. B-tree (Balanced Tree) indexes are the standard choice for high-cardinality columns, primary keys, and unique identifiers. They organise values in a balanced hierarchical structure, allowing the DBMS to locate any specific receipt number in O(log n) time through balanced branching rather than a full table scan. B-trees also support range queries, making them more versatile than Hash indexes for analytical workloads.",
    ],
    markingGuide:
      "Award 1 mark for Bitmap on Customer_Gender. Award 2 marks for justification — must mention low cardinality and how bitmaps work for this type. Award 1 mark for B-tree on Receipt_Number. Award 2 marks for justification — must mention high cardinality / unique values and balanced branching / O(log n) efficiency. Common error — recommending Hash for Receipt_Number: award at most 1 mark as Hash does not support range queries.",
    points: 6,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Q2.3 — Performance Tuning  (10 Marks)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "ITDSA_W5_Q2_3A",
    type: "multiple-choice",
    sectionLabel: "2.3 Part A",
    text: "OmniCart's developers used multiple NOT operators (e.g., <>, NOT IN) in their SQL query running under a Rule-Based Optimizer. What is the performance impact, and what should the developers do instead?",
    options: [
      "NOT operators improve query speed by narrowing the result set early; no change needed.",
      "NOT operators typically force a full table scan because the RBO cannot use an index to satisfy a negation; they should be replaced with positive equality operators where possible.",
      "NOT operators cause syntax errors in RBO systems and must be rewritten as CASE statements.",
      "NOT operators only affect queries with JOINs; single-table queries are unaffected.",
    ],
    correctAnswers: [
      "NOT operators typically force a full table scan because the RBO cannot use an index to satisfy a negation; they should be replaced with positive equality operators where possible.",
    ],
    points: 2,
  },

  {
    id: "ITDSA_W5_Q2_3B",
    type: "fill-in-the-blank",
    sectionLabel: "2.3 Part B",
    text: "In a Rule-Based Optimizer, WHERE clause conditions are evaluated from ___ to ___. To maximise performance, the most ___ condition — the one that eliminates the greatest number of rows — should be placed first in the WHERE clause.",
    blanks: [
      {
        id: "b1",
        options: ["left", "bottom", "right", "last"],
        correctAnswer: "last",
      },
      {
        id: "b2",
        options: ["top", "first", "right", "left"],
        correctAnswer: "first",
      },
      {
        id: "b3",
        options: ["complex", "indexed", "restrictive", "selective"],
        correctAnswer: "restrictive",
      },
    ],
    points: 2,
  },

  {
    id: "ITDSA_W5_Q2_3C",
    type: "multiple-choice",
    sectionLabel: "2.3 Part C",
    text: "OmniCart's disks are thrashing — continuously moving large volumes of data between storage and RAM. Which server-side tuning strategy directly addresses this by keeping frequently accessed data pages in memory rather than re-reading them from disk on every query?",
    options: [
      "Data Partitioning — splitting the table into smaller physical segments.",
      "Index Rebuilding — refreshing statistics to improve optimizer decisions.",
      "Increasing the Data Cache (Buffer Pool) size — allocating more RAM to retain hot data pages in memory.",
      "Adding a second CPU — parallelising query execution across cores.",
    ],
    correctAnswers: [
      "Increasing the Data Cache (Buffer Pool) size — allocating more RAM to retain hot data pages in memory.",
    ],
    points: 2,
  },

  {
    id: "ITDSA_W5_Q2_3D",
    type: "show-answer",
    sectionLabel: "2.3 Part D",
    text: "To resolve OmniCart's overall performance bottleneck, the DBA will apply both client-side and server-side tuning. (1) Propose two specific SQL performance tuning (client-side) practices for the developers. (2) Recommend three DBMS performance tuning (server-side) or physical storage practices for the DBA to implement. Justify each recommendation.",
    correctAnswers: [
      "CLIENT-SIDE SQL TUNING:\n\n1. Replace NOT operators with positive equality operators: NOT conditions (e.g., <>, NOT IN) prevent the RBO from using indexes, forcing full table scans. Rewriting as positive equality comparisons (e.g., Gender = 'M' instead of Gender <> 'F') allows available indexes to be utilised, dramatically reducing rows scanned per query.\n\n2. Reorder WHERE clause conditions for RBO: Under RBO, conditions are evaluated from last to first. OmniCart's most restrictive condition is currently at the end, meaning broad conditions are processed first. Moving the most restrictive condition (e.g., the Receipt_Number filter) to the first position ensures maximum row elimination at the earliest step, minimising total I/O.\n\nSERVER-SIDE / PHYSICAL TUNING:\n\n1. Increase the Data Cache (Buffer Pool): Allocating more RAM to the DBMS buffer pool means frequently accessed data pages are retained in memory between queries, directly reducing repeated disk reads and alleviating the observed thrashing.\n\n2. Data Partitioning: Splitting the large sales table into smaller partitions (e.g., by date range or region) ensures the analytical query scans only the relevant partition rather than the entire table, reducing the volume of data loaded from disk per execution.\n\n3. Separate indexes and data files onto different physical disk spindles: Placing data files and index files on separate physical disks eliminates read/write head contention. Index lookups and data page retrievals can then proceed on independent spindles simultaneously, significantly increasing I/O throughput.",
    ],
    markingGuide:
      "Award 4 marks for the two SQL (client-side) practices: 2 marks each — 1 for identifying the practice, 1 for justifying it in the OmniCart context. Award 6 marks for three DBMS/physical (server-side) practices: 2 marks each — 1 for identifying, 1 for justifying in relation to disk thrashing or query performance. Vague answers ('add more memory', 'make it faster') earn 0 per point. Required technical terms for full marks: Buffer Pool, Data Partitioning, Spindles / I/O contention, NOT operators / full table scan, WHERE clause ordering / RBO evaluation order.",
    points: 10,
  },
];