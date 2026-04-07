// src/data/questions/ITDSA/week8.js
// DATABASE SYSTEMS EXAMINATION — Data Manipulation, Definition & Control
// Total: 50 Marks

export default [

  // ════════════════════════════════════════════════════════
  // QUESTION 1 — Global Retail Group (25 Marks)
  // ════════════════════════════════════════════════════════

  {
    id: "SCENARIO_ITDSA_W8_Q1",
    type: "scenario",
    title: "Question 1: Global Retail Group — SQL Operations & Data Integrity (25 Marks)",
    context: `Global Retail Group is an international e-commerce company managing thousands of daily transactions across multiple regions. The organisation has recently migrated to a centralised database system to improve reporting and operational efficiency.\n\nManagement has identified several issues:\n• Incorrect and inconsistent customer data\n• Duplicate product records\n• Delayed reporting due to inefficient queries\n• Security concerns regarding unauthorised access\n• Occasional system failures requiring transaction recovery\n\nThe company now requires database specialists to ensure accurate data manipulation, enforce integrity, and optimise reporting queries.`,
  },

  // ── Q1.1 Part A — Fill-in-the-Blank: INSERT keyword ──

  {
    id: "ITDSA_W8_Q1_1A",
    type: "fill-in-the-blank",
    sectionLabel: "1.1 Part A",
    text: "Global Retail Group needs to add a new region to the Sales table. Complete the missing keyword: ___ INTO Sales (OrderID, Region) VALUES (105, 'North America');",
    blanks: [
      {
        id: "b1",
        options: ["UPDATE", "SELECT", "INSERT", "MERGE"],
        correctAnswer: "INSERT",
      },
    ],
    points: 1,
  },

  // ── Q1.1 Part B — Multiple-Choice: DELETE + WHERE clause ──

  {
    id: "ITDSA_W8_Q1_1B",
    type: "multiple-choice",
    sectionLabel: "1.1 Part B",
    text: "Management wants to remove duplicate product records. Which clause is essential to include with the DELETE command to prevent wiping the entire table?",
    options: [
      "FROM",
      "WHERE",
      "DROP",
      "SET",
    ],
    correctAnswers: ["WHERE"],
    points: 2,
  },

  // ── Q1.1 Part C — Open-Ended: UPDATE command ──

  {
    id: "ITDSA_W8_Q1_1C",
    type: "open-ended",
    sectionLabel: "1.1 Part C",
    text: "Which DML command is used to modify the TotalAmount of an existing order in the Sales table?",
    correctAnswers: ["UPDATE"],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
  },

  // ── Q1.1 Part D — Multiple-Choice: DML vs DDL distinction ──

  {
    id: "ITDSA_W8_Q1_1D",
    type: "multiple-choice",
    sectionLabel: "1.1 Part D",
    text: "Which of the following correctly identifies a Data Manipulation Language (DML) command?",
    options: [
      "CREATE TABLE",
      "ALTER TABLE",
      "INSERT INTO",
      "DROP TABLE",
    ],
    correctAnswers: ["INSERT INTO"],
    points: 3,
  },

  // ── Q1.2 Part A — Multiple-Choice: ROLLBACK ──

  {
    id: "ITDSA_W8_Q1_2A",
    type: "multiple-choice",
    sectionLabel: "1.2 Part A",
    text: "A system crash occurs midway through a multi-step update at Global Retail Group — inventory has been reduced but the order has not yet been recorded. Which TCL command ensures the database returns to its last consistent state?",
    options: [
      "COMMIT",
      "SAVEPOINT",
      "ROLLBACK",
      "TRUNCATE",
    ],
    correctAnswers: ["ROLLBACK"],
    points: 3,
  },

  // ── Q1.2 Part B — Show-Answer: Atomicity / TCL scenario ──

  {
    id: "ITDSA_W8_Q1_2B",
    type: "show-answer",
    sectionLabel: "1.2 Part B",
    text: "Describe the 'All-or-Nothing' principle of atomicity in the context of Global Retail Group's payment processing system. Your answer must explain both COMMIT and ROLLBACK and include a real-world failure scenario.",
    correctAnswers: [
      "Atomicity means that a transaction is treated as a single indivisible unit — either all steps complete successfully, or none of them take effect. In Global Retail Group's payment processing, a single transaction might involve multiple steps: reducing available inventory, recording the order, and charging the customer. If a system failure occurs after inventory is reduced but before the order is recorded, the database would be left in an inconsistent state. ROLLBACK reverts all partial changes, restoring the database to its last consistent state before the transaction began. Once all steps complete successfully, COMMIT permanently saves all changes to the database. Together, COMMIT and ROLLBACK enforce the 'All-or-Nothing' principle, ensuring data integrity is maintained even during system failures."
    ],
    markingGuide: "Award 2 marks for a clear explanation of atomicity ('all-or-nothing'). Award 2 marks for correctly explaining COMMIT (permanent save) and ROLLBACK (undo partial changes). Award 2 marks for a realistic failure scenario that links both TCL commands to a business consequence (e.g. inventory reduced but no order recorded).",
    points: 6,
  },

  // ── Q1.3 — Fill-in-the-Blank: SQL skeleton query ──

  {
    id: "ITDSA_W8_Q1_3",
    type: "fill-in-the-blank",
    sectionLabel: "1.3",
    text: "Global Retail Group needs a report showing only regions with total sales exceeding R600, sorted highest first. Fill in the three missing SQL keywords:\n\nSELECT Region, SUM(TotalAmount) AS TotalSales\nFROM Sales\n___ BY Region\n___ SUM(TotalAmount) > 600\n___ BY TotalSales DESC;",
    blanks: [
        {
          id: "b1",
          options: ["ORDER", "GROUP", "SORT", "HAVING", "CLUSTER"],
          correctAnswer: "GROUP",
        },
        {
          id: "b2",
          options: ["WHERE", "FILTER", "QUALIFY", "HAVING", "GROUP"],
          correctAnswer: "HAVING",
        },
        {
          id: "b3",
          options: ["SORT", "LIMIT", "ORDER", "ARRANGE", "GROUP"],
          correctAnswer: "ORDER",
        },
      ],
    points: 6,
  },

  // ════════════════════════════════════════════════════════
  // QUESTION 2 — Smart Manufacturing Ltd (25 Marks)
  // ════════════════════════════════════════════════════════

  {
    id: "SCENARIO_ITDSA_W8_Q2",
    type: "scenario",
    title: "Question 2: Smart Manufacturing Ltd — Database Structure & Control (25 Marks)",
    context: `Smart Manufacturing Ltd produces electronic components and maintains a database to track employees, production batches, and inventory.\n\nDue to rapid expansion, the company needs to:\n• Redesign its database structure\n• Enforce strict data constraints\n• Control user access to sensitive production data\n• Ensure consistent and valid data entry\n\nThe IT team must now design and implement a robust database system.`,
  },

  // ── Q2.1 Part A — Open-Ended: ALTER TABLE ──

  {
    id: "ITDSA_W8_Q2_1A",
    type: "open-ended",
    sectionLabel: "2.1 Part A",
    text: "Smart Manufacturing Ltd needs to add a Department column to the existing Employee table. Which DDL command would you use?",
    correctAnswers: ["ALTER TABLE", "ALTER"],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
      allowPartialMatch: true,
    },
  },

  // ── Q2.1 Part B — Open-Ended: DROP TABLE ──

  {
    id: "ITDSA_W8_Q2_1B",
    type: "open-ended",
    sectionLabel: "2.1 Part B",
    text: "The OldInventory table is no longer needed. Which DDL command permanently removes the entire table and its structure from the database?",
    correctAnswers: ["DROP TABLE", "DROP"],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
      allowPartialMatch: true,
    },
  },

  // ── Q2.1 Part C — Multiple-Choice: DDL vs DML ──

  {
    id: "ITDSA_W8_Q2_1C",
    type: "multiple-choice",
    sectionLabel: "2.1 Part C",
    text: "Smart Manufacturing Ltd's IT team wants to build the Employee table from scratch. Which command should they use?",
    options: [
      "INSERT INTO Employee",
      "CREATE TABLE Employee",
      "UPDATE Employee",
      "ADD TABLE Employee",
    ],
    correctAnswers: ["CREATE TABLE Employee"],
    points: 3,
  },

  // ── Q2.1 Part D — Show-Answer: DDL commands overview ──

  {
    id: "ITDSA_W8_Q2_1D",
    type: "show-answer",
    sectionLabel: "2.1 Part D",
    text: "Explain the roles of CREATE, ALTER, and DROP in managing Smart Manufacturing Ltd's database structure. For each command, provide a practical example relevant to the scenario.",
    correctAnswers: [
      "CREATE is used to build new database objects such as tables. Smart Manufacturing would use CREATE TABLE to define the Employee table with columns for EmployeeID, Name, and Salary. ALTER is used to modify an existing table's structure without losing data — for example, ALTER TABLE Employee ADD Department VARCHAR(50) adds a new column as the company expands. DROP permanently removes an entire table and its structure from the database — for example, DROP TABLE OldInventory deletes a legacy table that is no longer needed. A key distinction: DROP removes structure, while DELETE removes data rows. All three are DDL commands — they define and manage the schema rather than manipulate records."
    ],
    markingGuide: "Award 1 mark per correct definition (3 marks). Award 1 mark per scenario-relevant example (3 marks). Award up to 3 marks for clearly distinguishing DDL from DML and explaining the DROP vs DELETE distinction.",
    points: 9,
  },

  // ── Q2.2 — Multiple-Choice: DECIMAL data type ──

  {
    id: "ITDSA_W8_Q2_2A",
    type: "multiple-choice",
    sectionLabel: "2.2 Part A",
    text: "Smart Manufacturing Ltd needs to store the HourlyRate for employees, ensuring no rounding errors occur during payroll calculations. Which data type is most suitable?",
    options: [
      "FLOAT",
      "INT",
      "DECIMAL",
      "VARCHAR",
    ],
    correctAnswers: ["DECIMAL"],
    points: 2,
  },

  // ── Q2.2 Part B — Multiple-Choice: VARCHAR ──

  {
    id: "ITDSA_W8_Q2_2B",
    type: "multiple-choice",
    sectionLabel: "2.2 Part B",
    text: "The ProductName column in Smart Manufacturing's inventory table stores names of varying length. Which data type is most efficient for this purpose?",
    options: [
      "CHAR(255)",
      "VARCHAR",
      "INT",
      "BOOLEAN",
    ],
    correctAnswers: ["VARCHAR"],
    points: 2,
  },

  // ── Q2.2 Part C — Show-Answer: Four data types ──

  {
    id: "ITDSA_W8_Q2_2C",
    type: "show-answer",
    sectionLabel: "2.2 Part C",
    text: "Explain four data types that would be appropriate for Smart Manufacturing Ltd's database. For each, provide a practical column example and justify why it is suitable for that use case.",
    correctAnswers: [
      "INT stores whole numbers with no decimal component. It is suitable for EmployeeID because identifiers are always integers and INT supports efficient indexing. VARCHAR stores variable-length text strings. It is suitable for ProductName because product names vary in length, and VARCHAR allocates only the storage actually needed rather than padding to a fixed width. DECIMAL stores precise numeric values with a defined number of decimal places. It is suitable for Salary and HourlyRate because financial values require exact precision — FLOAT can introduce rounding errors that corrupt payroll calculations. DATETIME stores both a date and time value. It is suitable for ProductionDate or BatchTimestamp because it enables accurate time-based reporting, shift tracking, and audit trails across production batches."
    ],
    markingGuide: "Award 1 mark per correctly identified data type (4 marks). Award 1 mark per practical column example (4 marks). Deduct marks where the justification is missing or merely restates the definition without linking it to a business need.",
    points: 8,
  },

  // ── Q2.3 — Show-Answer: PRIMARY KEY constraint ──

  {
    id: "ITDSA_W8_Q2_3",
    type: "show-answer",
    sectionLabel: "2.3",
    text: "Smart Manufacturing Ltd has identified a risk: multiple employees may accidentally be assigned the same ID. Additionally, production records are being saved with missing Product Names, and duplicate email addresses are appearing in the HR system.\n\nFor each problem, identify the appropriate column constraint, explain how it functions, and describe how it improves data quality in this scenario.",
    correctAnswers: [
      "PRIMARY KEY prevents the duplicate employee ID problem. It enforces two rules simultaneously: every value in the column must be unique (no two employees share an ID), and the column cannot be left empty (NOT NULL is implied). This guarantees that each employee record is unambiguously identifiable. NOT NULL prevents missing Product Names. It enforces that a column must always contain a value — an INSERT or UPDATE that leaves the column empty is rejected by the database engine. This ensures critical production records are never saved without identifying information. UNIQUE prevents duplicate email addresses in the HR system. Unlike PRIMARY KEY, a UNIQUE constraint allows NULL values (unless NOT NULL is also applied), but ensures that any non-null value appears only once across all rows. This stops the same email address from being registered to multiple employee accounts while still allowing optional fields."
    ],
    markingGuide: "Award 2 marks per constraint (6 marks): 1 mark for a correct explanation of how the constraint functions, 1 mark for linking it directly to the stated business risk. Award up to 2 marks for clearly distinguishing PRIMARY KEY from UNIQUE (both enforce uniqueness, but PRIMARY KEY also implies NOT NULL and a table can only have one).",
    points: 8,
  },

];