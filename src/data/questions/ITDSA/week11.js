// src/data/questions/ITDSA/week11.js
// Database Systems — Advanced Applied Assessment
// Total: 50 Marks | Topics: Transactions, Views, Stored Procedures, Indexing, Triggers

export default [

  // ─────────────────────────────────────────────────────────────────────────
  // SCENARIO BLOCK
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "SCENARIO_ITDSA_W11",
    type: "scenario",
    title: "Questions 1 – 5: Database Systems — Advanced Applied Assessment (50 Marks)",
    context: `NexaTech is a global e-commerce enterprise managing millions of transactions daily across multiple regions. The company operates a centralised database system that integrates:
• Customer orders and order items
• Product inventory and pricing
• Financial transactions and tax calculations
• Reporting systems for management

Due to rapid expansion, NexaTech is experiencing:
• Performance degradation when querying large datasets
• Data inconsistencies during high-volume transactions
• Security concerns around sensitive financial data
• Complex reporting requirements across departments

The company plans to optimise its database design using advanced SQL features such as views, indexes, triggers, stored procedures, and transaction control mechanisms.`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // QUESTION 1 — Data Integrity & Transaction Management [15 Marks]
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "ITDSA_W11_Q1",
    type: "multiple-choice",
    sectionLabel: "1.1",
    text: "During a high-volume sale event, a failure occurs after inserting an order record but before updating inventory. Which mechanism BEST ensures database consistency?",
    options: [
      "COMMIT after each SQL statement",
      "ROLLBACK of the entire transaction",
      "CREATE INDEX on the Inventory table",
      "Using a VIEW for order processing",
    ],
    correctAnswers: ["ROLLBACK of the entire transaction"],
    points: 2,
  },

  {
    id: "ITDSA_W11_Q2",
    type: "fill-in-the-blank",
    sectionLabel: "1.2",
    text: "A transaction is finalised permanently using the ___ command.",
    blanks: [
    {
        id: "b1",
        options: ["FINISH", "CHECKPOINT", "GRANT", "COMMIT"],
        correctAnswer: "COMMIT",
    },
    ],
    points: 2,
  },

  {
    id: "ITDSA_W11_Q3",
    type: "open-ended",
    sectionLabel: "1.3",
    text: "What property of transactions ensures that either all operations succeed or none are applied?",
    correctAnswers: ["Atomicity", "atomicity"],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
  },

  {
    id: "ITDSA_W11_Q4",
    type: "show-answer",
    sectionLabel: "1.4",
    text: `Consider the following transaction sequence at NexaTech:\n\nExplain what happens to the database state after recovery if no \`COMMIT\` was executed.`,
    image: {
      src: "/images/ITDSA_W11_Q1.4.png",
      alt: "Transaction sequence table showing BEGIN TRANSACTION through system crash and recovery",
      caption: "Figure 1.4: NexaTech transaction sequence",
    },
    correctAnswers: [
      {
        text: "Since no `COMMIT` was executed, the transaction is considered **incomplete** at the time of the crash.\n\nDuring recovery, the DBMS performs an **implicit ROLLBACK** — it uses the transaction log to identify all uncommitted operations and reverses them:\n\n- The inserted order record is **removed** from the Orders table\n- The inventory update is **undone**, restoring stock to its pre-transaction value\n- The database is returned to its **last consistent state** before the transaction began\n\nThis process is automatic and is governed by the database's **write-ahead logging (WAL)** mechanism, which records all intended changes before they are applied. Because the changes were never committed, they are treated as if they never occurred.",
        diagram: {
          type: "mermaid",
          code: `flowchart TD
    A[BEGIN TRANSACTION] --> B[INSERT INTO Orders]
    B --> C[UPDATE Inventory]
    C --> D{System Crash}
    D --> E[Recovery Process]
    E --> F[No COMMIT found in log]
    F --> G[Implicit ROLLBACK]
    G --> H[INSERT reversed]
    G --> I[UPDATE reversed]
    H --> J[Database restored to consistent state]
    I --> J`,
        },
      },
    ],
    markingGuide: `| Criteria | Marks |
|---|---|
| States that an implicit ROLLBACK occurs during recovery | 2 |
| Explains that the inserted order record is removed | 1 |
| Explains that the inventory update is undone | 1 |
| **Total** | **4** |
**Examiner Insight:**
Top students explicitly mention *implicit rollback during recovery* and the role of the transaction log — not just "the data is lost". Weak answers say "nothing is saved" without explaining the recovery mechanism.`,
    points: 4,
  },

  {
    id: "ITDSA_W11_Q5",
    type: "show-answer",
    sectionLabel: "1.5",
    text: `Critically evaluate how transaction management improves **data integrity and operational reliability** in NexaTech's system.\n\nYour answer must reference:\n- Atomicity and consistency\n- Real-world failure scenarios\n- Business impact`,
    correctAnswers: [
      {
        text: "Transaction management ensures that database operations are executed as a single logical unit, preserving **atomicity** — meaning all operations either complete successfully or are entirely undone.\n\nIn NexaTech's environment, an order involves inserting a record into `Orders` and updating `Inventory`. A failure at any stage — system crash, insufficient stock, network interruption — triggers a **ROLLBACK**, preventing partial updates. This preserves **consistency**: the database never reflects an invalid state such as a confirmed order without a corresponding inventory reduction.\n\nFrom an operational perspective, this prevents financial discrepancies, incorrect stock levels, and customer dissatisfaction. Without transaction control, NexaTech could record sales without reducing stock, leading to overselling, reputational damage, and audit failures. Transaction management is therefore foundational for maintaining **trust, accuracy, and system resilience** in any high-volume enterprise system.",
        diagram: {
          type: "mermaid",
          code: `flowchart TD
    A[BEGIN TRANSACTION] --> B[Insert Order]
    B --> C[Update Inventory]
    C --> D{Error Occurs?}
    D -- Yes --> E[ROLLBACK]
    D -- No --> F[COMMIT]
    E --> G[Database Restored to Consistent State]
    F --> H[Changes Made Permanent]`,
        },
      },
    ],
    markingGuide: `| Criteria | Marks |
|---|---|
| Atomicity correctly explained — all-or-nothing execution | 1 |
| Consistency correctly explained — no invalid database state | 1 |
| Real-world failure scenario applied to NexaTech context | 1 |
| Business impact discussed (financial accuracy, customer trust, stock integrity) | 1 |
| Coherent integration of all concepts into a unified argument | 1 |
| **Total** | **5** |
**A+ indicators:**
- Mentions the *partial updates problem* by name
- Connects atomicity to customer trust and financial accuracy
- Uses NexaTech-specific examples rather than generic definitions

**Examiner Comment:**
Weak answers define terms in isolation. Strong answers *apply concepts to the NexaTech scenario* and draw explicit links between technical failure modes and business consequences.`,
    points: 5,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // QUESTION 2 — Views, Security & Data Abstraction [12 Marks]
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "ITDSA_W11_Q6",
    type: "multiple-choice",
    sectionLabel: "2.1",
    text: "Which is the PRIMARY purpose of a database view in NexaTech's reporting system?",
    options: [
      "Improve disk storage efficiency",
      "Simplify complex queries and restrict data access",
      "Replace base tables permanently",
      "Automatically enforce referential integrity",
    ],
    correctAnswers: ["Simplify complex queries and restrict data access"],
    points: 2,
  },

  {
    id: "ITDSA_W11_Q7",
    type: "fill-in-the-blank",
    sectionLabel: "2.2",
    text: "A view is considered a ___ table because it does not store data physically.",
    blanks: [
    {
        id: "b1",
        options: ["LOGICAL", "MATERIALIZED", "VIRTUAL", "ABSTRACT"],
        correctAnswer: "VIRTUAL",
    },
    ],
    points: 2,
  },

  {
    id: "ITDSA_W11_Q8",
    type: "open-ended",
    sectionLabel: "2.3",
    text: "What SQL command is used to remove a view from the database?",
    correctAnswers: ["DROP VIEW", "drop view"],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
  },

  {
    id: "ITDSA_W11_Q9",
    type: "show-answer",
    sectionLabel: "2.4",
    text: "NexaTech wants to allow finance staff to see only products priced above 500, without exposing the full Product table.\n\nWrite the core SQL logic describing how a view would enforce this restriction. (Full syntax required.)",
    correctAnswers: [
      {
        text: "A view should be created that selects only products where `ProductStandardPrice > 500`. Finance staff are then granted access to the view, never to the underlying `Product` table directly:\n\n```sql\nCREATE VIEW HighValueProducts AS\nSELECT ProductID,\n       ProductDescription,\n       ProductStandardPrice\nFROM   Product\nWHERE  ProductStandardPrice > 500;\n```\n\n**How it enforces the restriction:**\n- Finance staff query `HighValueProducts` — they cannot see products priced at or below 500\n- The `WHERE` clause acts as a persistent filter every time the view is queried\n- Sensitive columns (e.g. supplier cost, internal margin) are excluded from the `SELECT` list, providing **column-level access control** in addition to row-level filtering\n- The base `Product` table remains inaccessible unless separately granted",
        diagram: {
          type: "mermaid",
          code: `flowchart TD
    A[Base Table: Product]
    B[SQL Filter: WHERE Price > 500]
    C[VIEW: HighValueProducts]
    D[Finance Staff Access]
    E[Sensitive rows hidden]
    A --> B
    B --> C
    C --> D
    B --> E`,
        },
      },
    ],
    markingGuide: `| Criteria | Marks |
|---|---|
| Correct \`CREATE VIEW\` syntax with appropriate name | 1 |
| Correct \`WHERE ProductStandardPrice > 500\` filter | 1 |
| Explanation of how the view restricts access (row or column level) | 1 |
| **Total** | **3** |
**Examiner Insight:**
Full syntax *is* required here. Logical correctness of the \`WHERE\` clause carries the most weight. Bonus recognition for noting column-level restriction via the \`SELECT\` list.`,
    points: 3,
  },

  {
    id: "ITDSA_W11_Q10",
    type: "show-answer",
    sectionLabel: "2.5",
    text: "Discuss how views contribute to data security and query efficiency in enterprise systems like NexaTech.",
    correctAnswers: [
      {
        text: "Views act as an **abstraction layer**, allowing users to access only relevant subsets of data without exposing the underlying base tables.\n\nFrom a **security** perspective, NexaTech can restrict finance staff to high-value product data, ensuring sensitive information — such as supplier costs or internal margins — remains hidden. Access control is enforced at the database level rather than relying solely on application code, making it more robust and consistent across all interfaces.\n\nFrom an **efficiency** perspective, views simplify complex joins and aggregations. Instead of repeatedly writing multi-table queries, developers and analysts interact with pre-defined logical datasets. This reduces query errors, improves developer productivity, and enforces consistent business logic across reports.\n\nWhile views do not inherently improve raw query performance (they are re-evaluated on each access), they significantly **reduce cognitive complexity** and provide a stable, versioned interface to underlying data — particularly valuable in large-scale systems where table structures may change.",
        diagram: {
          type: "mermaid",
          code: `flowchart TD
    A[Base Tables: Product, Orders, Customers]
    B[SQL Query Logic and Filters]
    C[VIEW: HighValueProducts]
    D[Finance Staff]
    E[Reporting Tools]
    A --> B
    B --> C
    C --> D
    C --> E`,
        },
      },
    ],
    markingGuide: `| Criteria | Marks |
|---|---|
| Security explanation — restricted access / hiding sensitive data | 1 |
| Query simplification / developer efficiency | 1 |
| Applied to NexaTech context with a concrete example | 1 |
| **Total** | **3** |
**A+ indicators:**
- Mentions *abstraction layer* and *restricted access control* by name
- Notes that views do not automatically improve performance (materialized views do)`,
    points: 3,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // QUESTION 3 — Stored Procedures & Functions [11 Marks]
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "ITDSA_W11_Q11",
    type: "multiple-choice",
    sectionLabel: "3.1",
    text: "Which statement BEST distinguishes a function from a stored procedure?",
    options: [
      "Functions cannot accept parameters",
      "Procedures always return a single value",
      "Functions return a value and can be used in expressions",
      "Procedures cannot modify data",
    ],
    correctAnswers: ["Functions return a value and can be used in expressions"],
    points: 2,
  },

  {
    id: "ITDSA_W11_Q12",
    type: "fill-in-the-blank",
    sectionLabel: "3.2",
    text: "A function must contain at least one ___ statement.",
    blanks: [
      {
        id: "b1",
        options: ["COMMIT", "RETURN", "EXECUTE", "SELECT"],
        correctAnswer: "RETURN",
      },
    ],
    points: 2,
  },

  {
    id: "ITDSA_W11_Q13",
    type: "open-ended",
    sectionLabel: "3.3",
    text: "What type of parameter allows both input and output in stored procedures?",
    correctAnswers: ["INOUT", "inout", "IN OUT", "in out"],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
  },

  {
    id: "ITDSA_W11_Q14",
    type: "show-answer",
    sectionLabel: "3.4",
    text: "NexaTech applies VAT to all products at the point of sale.\n\nShould this VAT calculation logic be implemented as a procedure or a function? Briefly justify your choice.",
    correctAnswers: [
      {
        text: "VAT calculation should be implemented as a **function**.\n\n**Justification:**\n- VAT calculation takes a price as input and returns a single computed value (the VAT-inclusive price)\n- Functions are designed to **return a value** and can be embedded directly inside SQL expressions and `SELECT` statements:\n\n```sql\nSELECT ProductDescription,\n       CalculateVAT(ProductStandardPrice) AS PriceWithVAT\nFROM   Product;\n```\n\n- A procedure would be appropriate if the operation involved multiple steps, side effects (e.g. inserting a log record), or no return value — none of which apply here\n- Using a function ensures the calculation is reusable inline, consistent, and testable in isolation",
      },
    ],
    markingGuide: `| Criteria | Marks |
|---|---|
| Correct choice: function (not procedure) | 1 |
| Justification: returns a single value / can be used in SQL expressions | 1 |
| **Total** | **2** |`,
    points: 2,
  },

  {
    id: "ITDSA_W11_Q15",
    type: "show-answer",
    sectionLabel: "3.5",
    text: "Evaluate the benefits of using stored procedures in a high-performance enterprise system like NexaTech.",
    correctAnswers: [
      {
        text: "Stored procedures encapsulate reusable business logic directly within the database, delivering three key benefits:\n\n**1. Performance**\nProcedures are **precompiled and cached** by the DBMS, meaning the query plan is generated once and reused on subsequent calls. This reduces parsing overhead and network round-trips — critical in NexaTech's high-volume transaction environment where operations like bulk price updates or discount calculations are executed thousands of times per hour.\n\n**2. Maintainability**\nBy centralising logic inside the database, procedures eliminate redundant SQL across multiple applications. If NexaTech's discount policy changes, only the procedure needs updating — all applications calling it automatically inherit the new behaviour without code deployments.\n\n**3. Security**\nProcedures allow controlled data access without exposing base tables directly. Users or roles can be granted `EXECUTE` permission on a procedure without having `INSERT`, `UPDATE`, or `DELETE` rights on the underlying tables. This enforces the **principle of least privilege** at the database layer.",
        diagram: {
          type: "mermaid",
          code: `flowchart LR
    A[Stored Procedure] --> B[Precompiled Execution]
    B --> C[Reduced Network Overhead]
    A --> D[Centralised Logic]
    D --> E[Single Update Point]
    A --> F[Controlled Access]
    F --> G[No Direct Table Exposure]`,
        },
      },
    ],
    markingGuide: `| Criteria | Marks |
|---|---|
| Performance benefit — precompiled execution / reduced overhead | 1 |
| Maintainability — centralised, reusable logic | 1 |
| Security or consistency — controlled access / least privilege | 1 |
| **Total** | **3** |
**A+ indicators:**
- Specifically mentions *reduced network overhead* and *precompiled execution*
- Uses a NexaTech-specific example (bulk price updates, discount calculations)`,
    points: 3,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // QUESTION 4 — Indexing & Query Optimisation [6 Marks]
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "ITDSA_W11_Q16",
    type: "multiple-choice",
    sectionLabel: "4.1",
    text: "What is the PRIMARY function of an index in a database?",
    options: [
      "Store duplicate data for backup",
      "Enforce foreign key constraints",
      "Speed up data retrieval",
      "Replace primary keys",
    ],
    correctAnswers: ["Speed up data retrieval"],
    points: 2,
  },

  {
    id: "ITDSA_W11_Q17",
    type: "fill-in-the-blank",
    sectionLabel: "4.2",
    text: "An index that enforces uniqueness on its indexed column is called a ___ index.",
    blanks: [
    {
        id: "b1",
        options: ["CLUSTERED", "PRIMARY", "UNIQUE", "DETERMINISTIC"],
        correctAnswer: "UNIQUE",
    },
    ],
    points: 2,
  },

  {
    id: "ITDSA_W11_Q18",
    type: "show-answer",
    sectionLabel: "4.3",
    text: "NexaTech's reporting team frequently searches the `Product` table by `ProductDescription`.\n\nWhat type of index should be created on this column, and why?",
    correctAnswers: [
      {
        text: "A **non-unique (secondary) index** should be created on `ProductDescription`.\n\n**Reasoning:**\n- `ProductDescription` is not a unique identifier — multiple products may share similar or identical descriptions (e.g. 'Standard Cable 1m' in different colours)\n- A *non-unique index* allows the DBMS to build a sorted lookup structure over `ProductDescription` without enforcing uniqueness, enabling fast `WHERE` clause searches:\n\n```sql\nCREATE INDEX idx_product_description\nON Product (ProductDescription);\n```\n\n- Without this index, every search performs a **full table scan** — reading every row to find matches. On NexaTech's large product catalogue, this is a significant performance bottleneck\n- With the index, the DBMS uses a **B-tree traversal**, dramatically reducing the number of rows inspected\n\n**Trade-off to note:** Indexes improve read performance but add overhead to `INSERT`, `UPDATE`, and `DELETE` operations, since the index must be maintained alongside the table.",
        diagram: {
          type: "mermaid",
          code: `flowchart TD
    A[Search Query: WHERE ProductDescription = 'Cable']
    B{Index exists?}
    C[B-tree Index on ProductDescription]
    D[Direct row lookup — fast]
    E[Full table scan — slow]
    A --> B
    B -- Yes --> C
    C --> D
    B -- No --> E`,
        },
      },
    ],
    markingGuide: `| Criteria | Marks |
|---|---|
| Correct index type identified: non-unique / secondary index | 1 |
| Justification: multiple products may share descriptions / performance on large table | 1 |
| **Total** | **2** |
**A+ indicators:**
- Mentions the *full table scan vs B-tree traversal* trade-off
- Notes the write-overhead trade-off of maintaining indexes`,
    points: 2,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // QUESTION 5 — Triggers & Automation [6 Marks]
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "ITDSA_W11_Q19",
    type: "multiple-choice",
    sectionLabel: "5.1",
    text: "A trigger is BEST described as:",
    options: [
      "A manual SQL command executed by users",
      "A stored query used for reporting",
      "An automatic action executed in response to database events",
      "A type of index",
    ],
    correctAnswers: ["An automatic action executed in response to database events"],
    points: 2,
  },

  {
    id: "ITDSA_W11_Q20",
    type: "fill-in-the-blank",
    sectionLabel: "5.2",
    text: "Triggers are activated by ___ events such as INSERT, UPDATE, or DELETE.",
    blanks: [
      {
        id: "b1",
        options: ["DML", "DDL", "DCL", "TCL"],
        correctAnswer: "DML",
      },
    ],
    points: 2,
  },

  {
    id: "ITDSA_W11_Q21",
    type: "show-answer",
    sectionLabel: "5.3",
    text: "Explain how triggers can be used to enforce business rules in NexaTech's database system.",
    correctAnswers: [
      {
        text: "Triggers **automatically execute predefined logic** whenever a specified DML event (INSERT, UPDATE, or DELETE) occurs on a table — without requiring any application-level intervention.\n\nIn NexaTech's system, triggers provide two primary enforcement mechanisms:\n\n**1. Data Validation**\nA `BEFORE UPDATE` trigger on the `Product` table can validate that a new price remains within an acceptable range before the update is committed:\n```sql\nCREATE TRIGGER ValidateProductPrice\nBEFORE UPDATE ON Product\nFOR EACH ROW\nBEGIN\n    IF NEW.ProductStandardPrice < 0 THEN\n        SIGNAL SQLSTATE '45000'\n        SET MESSAGE_TEXT = 'Price cannot be negative';\n    END IF;\nEND;\n```\n\n**2. Audit Logging**\nAn `AFTER UPDATE` trigger can automatically write a record to an audit log whenever a price changes — providing a tamper-resistant history for compliance and investigation:\n```sql\nCREATE TRIGGER LogPriceChange\nAFTER UPDATE ON Product\nFOR EACH ROW\nBEGIN\n    INSERT INTO PriceAuditLog (ProductID, OldPrice, NewPrice, ChangedAt)\n    VALUES (OLD.ProductID, OLD.ProductStandardPrice, NEW.ProductStandardPrice, NOW());\nEND;\n```\n\nBy embedding rules at the **database layer**, NexaTech ensures enforcement is consistent regardless of which application, user, or API modifies the data — eliminating the risk of application-level controls being bypassed.",
        diagram: {
          type: "mermaid",
          code: `flowchart TD
    A[UPDATE Product Price]
    B[Trigger Activated]
    C{Condition Met?}
    D[Execute Action: Log change or block update]
    E[No Action — proceed normally]
    A --> B
    B --> C
    C -- Yes --> D
    C -- No --> E`,
        },
      },
    ],
    markingGuide: `| Criteria | Marks |
|---|---|
| Automatic execution in response to DML events explained | 1 |
| Business rule enforcement applied to NexaTech context | 1 |
| **Total** | **2** |
**A+ indicators:**
- Mentions *audit trails* as a trigger use case alongside validation
- Notes that triggers enforce rules at the *database layer*, independent of application code
- Distinguishes between BEFORE and AFTER trigger timing`,
    points: 2,
  },
];