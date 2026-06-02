// src/data/questions/ITDSA/week13.js
export default [

  // ── SCENARIO 1 ─────────────────────────────────────────────────────────────
  {
    id: "SCENARIO_ITDSA_W13_Q1",
    type: "scenario",
    title: "Question 1 — MedixCare International Migration Project (25 Marks)",
    context: `MedixCare International operates hospitals throughout South Africa, Kenya, Botswana and Namibia.\n\nThe organisation currently stores patient, appointment, pharmacy and billing information across multiple disconnected systems. Senior management has approved a migration to MongoDB after consultants identified severe problems with scalability, reporting delays and inconsistent data structures across departments.\n\nHistorical patient records are exported from legacy systems in JSON and CSV format. These records must be imported into MongoDB, verified, queried and periodically exported for regulatory audits.\n\nThe database team is evaluating different MongoDB import modes because incoming data feeds may contain records that already exist in the database.`,
  },

  // ── Q1.1 Multiple Choice [2 Marks] ─────────────────────────────────────────
  {
    id: "ITDSA_W13_Q1",
    type: "multiple-choice",
    tags: ["database design", "DBMS concepts"],
    sectionLabel: "1.1",
    text: "A hospital imports a file containing 5 000 patient records. Four hundred records already exist in the collection and should be updated while **preserving fields that are not present in the import file**.\n\nWhich import mode is MOST appropriate?",
    options: [
      "Insert Mode",
      "Delete Mode",
      "Upsert Mode",
      "Merge Mode",
    ],
    correctAnswers: ["Merge Mode"],
    points: 2,
    explanation: "**Merge Mode** updates only the fields supplied in the import file and leaves all other existing fields untouched.\n\n**Upsert Mode** would replace the entire document with the incoming data — any fields absent from the import file would be lost. When partial updates must preserve existing attributes, Merge is always the correct choice.",
  },

  // ── Q1.2 Fill-in-the-Blank [2 Marks] ───────────────────────────────────────
  {
    id: "ITDSA_W13_Q2",
    type: "fill-in-the-blank",
    tags: ["DBMS concepts"],
    sectionLabel: "1.2",
    text: "MongoDB stores documents internally using ___, a binary representation of JSON.",
    blanks: [
      {
        id: "b1",
        options: ["JSON", "XML", "CSV", "BSON", "BSON"],
        correctAnswer: "BSON",
      },
    ],
    explanation: "MongoDB presents data as JSON-like documents but physically stores them as **BSON** (Binary JSON). BSON extends JSON with additional data types (such as `Date` and `BinData`) and uses an efficient binary encoding for faster parsing.",
  },

  // ── Q1.3 Open-Ended [2 Marks] ──────────────────────────────────────────────
  {
    id: "ITDSA_W13_Q3",
    type: "open-ended",
    tags: ["relational model", "DBMS concepts"],
    sectionLabel: "1.3",
    text: "MongoDB collections are most closely equivalent to which object in a relational database?",
    correctAnswers: ["Table", "Relation", "table", "relation"],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
      allowPartialMatch: false,
    },
    explanation: "A **collection** in MongoDB groups documents in the same way a **table** (or relation) groups rows in a relational database. Both serve as the primary container for records of a similar kind.",
  },

  // ── Q1.4 Multiple Choice [3 Marks] ─────────────────────────────────────────
  {
    id: "ITDSA_W13_Q4",
    type: "multiple-choice",
    tags: ["database design", "DBMS concepts", "technological impact"],
    sectionLabel: "1.4",
    text: "Which statement BEST explains why MedixCare selected MongoDB instead of a traditional relational database?",
    options: [
      "MongoDB eliminates the need for primary keys.",
      "MongoDB allows every document in a collection to have a completely identical structure.",
      "MongoDB provides flexible schemas suitable for evolving healthcare data.",
      "MongoDB requires less storage than all relational databases.",
    ],
    correctAnswers: [
      "MongoDB provides flexible schemas suitable for evolving healthcare data.",
    ],
    points: 3,
    explanation: "Healthcare records frequently evolve — new clinical attributes, policy fields, and regulatory requirements emerge over time. MongoDB's **flexible schema** accommodates these changes without requiring costly table restructures or downtime.\n\nThe other options are either factually incorrect (MongoDB uses `_id` as a default primary key) or make unsupported absolute claims.",
  },

  // ── Q1.5 Show-Answer [6 Marks] ─────────────────────────────────────────────
  {
    id: "ITDSA_W13_Q5",
    type: "show-answer",
    tags: ["database design", "data quality", "business rules"],
    sectionLabel: "1.5",
    text: "The hospital receives a JSON file containing a patient update. One document contains only:\n\n```json\n{\n  \"_id\": 1001,\n  \"insuranceProvider\": \"HealthPlus\"\n}\n```\n\nThe existing patient document in the collection is:\n\n```json\n{\n  \"_id\": 1001,\n  \"name\": \"Sarah Jacobs\",\n  \"diagnosis\": \"Asthma\",\n  \"insuranceProvider\": \"MediAid\"\n}\n```\n\nCompare the outcome of importing this file using **(1) Upsert Mode** and **(2) Merge Mode**. Explain which mode should be selected and **justify your answer** in the context of healthcare data management.",
    correctAnswers: [
      {
        text: "**Upsert Mode**\n\nThe existing document would be completely replaced by the incoming document. MongoDB matches on `_id: 1001` and overwrites the entire record.\n\nResult:\n\n```json\n{\n  \"_id\": 1001,\n  \"insuranceProvider\": \"HealthPlus\"\n}\n```\n\nThe `name` and `diagnosis` fields are permanently lost because they were absent from the import file.\n\n**Merge Mode**\n\nMongoDB updates only the supplied field (`insuranceProvider`) while retaining all other existing attributes.\n\nResult:\n\n```json\n{\n  \"_id\": 1001,\n  \"name\": \"Sarah Jacobs\",\n  \"diagnosis\": \"Asthma\",\n  \"insuranceProvider\": \"HealthPlus\"\n}\n```\n\n**Recommended Option: Merge Mode**\n\nHealthcare databases contain critical historical information — patient names, diagnoses, and treatment records — that must never be overwritten unless explicitly intended. Using Upsert Mode on a partial update file would destroy irreplaceable clinical data.\n\nMerge Mode updates only the intended field while preserving data quality, continuity of care, and compliance with healthcare data governance requirements.",
      },
    ],
    markingGuide: `| Criterion | Marks |\n|---|---|\n| Correct Upsert explanation (full replacement, fields lost) | 2 |\n| Correct Merge explanation (partial update, fields preserved) | 2 |\n| Appropriate recommendation (Merge) | 1 |\n| Business justification (data quality / patient safety / compliance) | 1 |\n| **Total** | **6** |\n\n**Common errors:**\n- Describing Merge and Upsert technically but omitting business justification (cap at 4/6)\n- Recommending Upsert without recognising the data loss consequence`,
    points: 6,
    image: {
        src: "/images/ITDSA_W13_Q5.png",
        alt: "MongoDB Compass interface displaying an existing patient record and a separate incoming JSON import record with matching _id values.",
        caption: "Figure 1: Existing database record and incoming import document."
        }
  },

  // ── Q1.6 Multiple Choice [2 Marks] ─────────────────────────────────────────
  {
    id: "ITDSA_W13_Q6",
    type: "multiple-choice",
    tags: ["DBMS concepts", "IDEs & tooling"],
    sectionLabel: "1.6",
    text: "Which command-line tool is specifically designed to **export** MongoDB collections?",
    options: [
      "mongoquery",
      "mongoexport",
      "mongodumpcsv",
      "exportdb",
    ],
    correctAnswers: ["mongoexport"],
    points: 2,
    explanation: "`mongoexport` is MongoDB's dedicated command-line utility for exporting collection data to JSON or CSV format. It is part of the MongoDB Database Tools package and runs from the operating system terminal, not from inside `mongosh`.",
  },

  // ── Q1.7 Fill-in-the-Blank [2 Marks] ───────────────────────────────────────
  {
    id: "ITDSA_W13_Q7",
    type: "fill-in-the-blank",
    tags: ["IDEs & tooling"],
    sectionLabel: "1.7",
    text: "MongoDB Compass allows users to export either a full collection or the results of a ___ filter.",
    blanks: [
      {
        id: "b1",
        options: ["schema", "index", "query", "pipeline"],
        correctAnswer: "query",
      },
    ],
    explanation: "MongoDB Compass provides a graphical export interface. Users can either export the entire collection or apply a **query** filter first so that only matching documents are included in the export file.",
  },

  // ── Q1.8 Show-Answer [6 Marks] ─────────────────────────────────────────────
  {
    id: "ITDSA_W13_Q8",
    type: "show-answer",
    tags: ["data governance", "managerial impact", "data integration"],
    sectionLabel: "1.8",
    text: "MedixCare executives claim that exporting data to JSON and CSV is merely a **technical activity with little business value**.\n\nCritically evaluate this statement. Your answer should address:\n- Regulatory compliance\n- Data sharing\n- Auditing\n- Reporting\n- System migration",
    correctAnswers: [
      "The statement is inaccurate. Data export provides substantial business value that extends well beyond routine technical administration.\n\n**Regulatory Compliance**\n\nExports allow organisations to produce portable snapshots of operational data that satisfy the evidentiary requirements of health regulators and data protection authorities. Without exportable records, demonstrating compliance becomes practically impossible.\n\n**Auditing**\n\nExported datasets create point-in-time records that auditors and external reviewers can inspect independently without requiring direct access to the live production database. This protects both data integrity and system security.\n\n**Data Sharing**\n\nJSON and CSV exports allow departments, partner organisations, and government agencies to access relevant data in a standardised format — eliminating the need to grant privileged database credentials to every external stakeholder.\n\n**Reporting and Analytics**\n\nExported files can be loaded into tools such as Python, Pandas, Excel, and data warehouses to generate business intelligence dashboards, trend analyses, and executive reports that inform strategic decisions.\n\n**System Migration**\n\nExported data provides a vendor-neutral, transferable format for moving information between platforms during technology upgrades or cloud migrations.\n\nConsequently, exporting data is a critical enabler of governance, compliance, interoperability, and evidence-based decision-making — not a peripheral technical task.",
    ],
    markingGuide: `| Criterion | Marks |\n|---|---|\n| Regulatory compliance discussed | 1 |\n| Auditing discussed | 1 |\n| Reporting / analytics discussed | 1 |\n| Data sharing discussed | 1 |\n| System migration discussed | 1 |\n| Integrated conclusion rejecting the executives' claim | 1 |\n| **Total** | **6** |`,
    points: 6,
    image: {
        src: "/images/ITDSA_W13_Q8.png",
        alt: "Enterprise data distribution architecture showing a central MongoDB database connected to finance, auditors, management, regulators, and data science teams.",
        caption: "Figure 2: MedixCare International data distribution model."
        }
  },

  // ── SCENARIO 2 ─────────────────────────────────────────────────────────────
  {
    id: "SCENARIO_ITDSA_W13_Q2",
    type: "scenario",
    title: "Question 2 — RetailHub Supply Chain Analytics (25 Marks)",
    context: `RetailHub operates a nationwide distribution network supplying electronics to more than 300 stores.\n\nEach day suppliers transmit JSON files containing inventory updates. The company imports the files into MongoDB, verifies the results, analyses inventory trends and exports selected datasets to external analysts.\n\nThe data science team also loads exported JSON files into Python DataFrames for advanced reporting.`,
  },

  // ── Q2.1 Multiple Choice [2 Marks] ─────────────────────────────────────────
  {
    id: "ITDSA_W13_Q9",
    type: "multiple-choice",
    tags: ["DBMS concepts", "database design"],
    sectionLabel: "2.1",
    text: "Which characteristic of document databases MOST directly reduces the need for JOIN operations?",
    options: [
      "BSON compression",
      "Embedded related data within documents",
      "Automatic indexing",
      "CSV support",
    ],
    correctAnswers: ["Embedded related data within documents"],
    points: 2,
    explanation: "Document databases allow related data to be **embedded directly inside a single document** rather than split across multiple tables. Because the data is already co-located, there is no need for JOIN operations to reassemble it at query time — the document is retrieved as a complete unit.",
    image: {
        src: "/images/ITDSA_W13_Q9.png",
        alt: "Side-by-side comparison of a relational database schema and a MongoDB document structure representing customer order information.",
        caption: "Figure 3: Alternative approaches to storing customer order information."
        }
  },

  // ── Q2.2 Open-Ended [2 Marks] ──────────────────────────────────────────────
  {
    id: "ITDSA_W13_Q10",
    type: "open-ended",
    tags: ["DBMS concepts"],
    sectionLabel: "2.2",
    text: "What command is commonly appended to a MongoDB query to display results in a more readable, formatted layout?",
    correctAnswers: ["pretty()", ".pretty()", "pretty"],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
      allowPartialMatch: true,
    },
    explanation: "The `.pretty()` method formats query output with indentation and line breaks, making nested document structures significantly easier to read during development and verification.",
  },

  // ── Q2.3 Fill-in-the-Blank [2 Marks] ───────────────────────────────────────
  {
    id: "ITDSA_W13_Q11",
    type: "fill-in-the-blank",
    tags: ["IDEs & tooling"],
    sectionLabel: "2.3",
    text: "To import a CSV file containing column headers, the `mongoimport` command commonly includes the option ___.",
    blanks: [
      {
        id: "b1",
        options: ["--headerline", "--csv", "--fields", "--columns"],
        correctAnswer: "--headerline",
      },
    ],
    explanation: "The `--headerline` flag instructs `mongoimport` to treat the first row of a CSV file as the column (field) names rather than importing it as a data record. Without this flag, the header row would be imported as a document.",
  },

  // ── Q2.4 Multiple Choice [3 Marks] ─────────────────────────────────────────
  {
    id: "ITDSA_W13_Q12",
    type: "multiple-choice",
    tags: ["DBMS concepts"],
    sectionLabel: "2.4",
    text: "A database administrator executes the following command:\n\n```js\ndb.products.find().sort({ \"price\": -1 })\n```\n\nWhat is the expected outcome?",
    options: [
      "Products sorted alphabetically by name",
      "Products sorted by price ascending",
      "Products sorted by price descending",
      "Products grouped by price",
    ],
    correctAnswers: ["Products sorted by price descending"],
    points: 3,
    explanation: "In MongoDB's `sort()` method, a value of **`1`** specifies ascending order and **`-1`** specifies descending order. The query above sorts all product documents from the highest price to the lowest.",
  },

  // ── Q2.5 Show-Answer [4 Marks] ─────────────────────────────────────────────
  {
    id: "ITDSA_W13_Q13",
    type: "show-answer",
    tags: ["database design", "data quality"],
    sectionLabel: "2.5",
    text: "Consider the following MongoDB query:\n\n```js\ndb.orders.find(\n  { \"customer\": \"Moyo\" },\n  { \"customer\": 1, \"amount\": 1 }\n)\n```\n\nExplain the **purpose of the second parameter** and describe its effect on the query results.",
    correctAnswers: [
      "The second parameter is called a **projection**.\n\nA projection controls which fields MongoDB returns in the result documents. Specifying `1` for a field includes it; specifying `0` excludes it.\n\nIn this query, only the `customer` and `amount` fields will appear in the returned documents. All other fields — such as delivery address, order date, or product details — are suppressed.\n\nProjections improve **readability** by limiting output to what is actually needed, reduce **network traffic** by transmitting fewer bytes per document, and prevent inadvertent exposure of sensitive fields.",
    ],
    markingGuide: `| Criterion | Marks |\n|---|---|\n| Correctly identifies the parameter as a projection | 1 |\n| Explains that it limits/controls the fields returned | 1 |\n| Correctly interprets which fields are included | 1 |\n| Identifies a performance or readability benefit | 1 |\n| **Total** | **4** |`,
    points: 4,
    image: {
        src: "/images/ITDSA_W13_Q13.png",
        alt: "Database query results displayed before and after applying a field selection operation, reducing the number of visible columns.",
        caption: "Figure 4: Query results before and after applying a query option."
        }
  },

  // ── Q2.6 Multiple Choice [2 Marks] ─────────────────────────────────────────
  {
    id: "ITDSA_W13_Q14",
    type: "multiple-choice",
    tags: ["IDEs & tooling"],
    sectionLabel: "2.6",
    text: "Which environment should be used to execute a `mongoimport` command?",
    options: [
      "MongoDB Compass document view",
      "Mongo shell (mongosh) only",
      "Operating system command line",
      "JSON editor",
    ],
    correctAnswers: ["Operating system command line"],
    points: 2,
    explanation: "`mongoimport` is part of the **MongoDB Database Tools** package. It is a standalone utility that must be run from the operating system terminal (e.g. Bash, PowerShell, Command Prompt) — not from inside `mongosh` or the Compass GUI.",
  },

  // ── Q2.7 Fill-in-the-Blank [2 Marks] ───────────────────────────────────────
  {
    id: "ITDSA_W13_Q15",
    type: "fill-in-the-blank",
    tags: ["IDEs & tooling"],
    sectionLabel: "2.7",
    text: "The Python library commonly used to load exported JSON data into a DataFrame is ___.",
    blanks: [
      {
        id: "b1",
        options: ["numpy", "pandas", "pymongo", "json"],
        correctAnswer: "pandas",
      },
    ],
    explanation: "**Pandas** provides the `DataFrame` structure that analysts use to load, filter, aggregate, and report on exported data. A typical workflow calls `pd.read_json()` or `pd.read_csv()` to import the exported MongoDB file into a DataFrame for further analysis.",
  },

  // ── Q2.8 Show-Answer [8 Marks] ─────────────────────────────────────────────
  {
    id: "ITDSA_W13_Q16",
    type: "show-answer",
    tags: ["data integration", "business procedures", "data governance"],
    sectionLabel: "2.8",
    text: "RetailHub plans to establish the following workflow:\n\n1. Receive supplier JSON files.\n2. Import files into MongoDB.\n3. Verify imported records.\n4. Query inventory information.\n5. Export selected data.\n6. Analyse exports using Python.\n\n**Design and justify a complete operational process for this workflow.** Your answer must reference `mongoimport`, verification techniques, querying, exporting, JSON/CSV formats, and DataFrame analysis.",
    correctAnswers: [
      {
        text: "**Operational Workflow Design**\n\n**Step 1 — Validate and Import**\n\nIncoming supplier JSON files should be validated for structural completeness and field consistency before ingestion. Files are then imported into the appropriate MongoDB collection using `mongoimport`, with the import mode selected based on business rules — for example, `--mode merge` when supplier feeds partially update existing product records.\n\n**Step 2 — Verify**\n\nAfter import, administrators should confirm successful loading by querying the collection and reviewing the output:\n\n```js\ndb.products.find().pretty()\n```\n\nRecord counts before and after import should be compared, and a sample of updated documents should be spot-checked to confirm field values are correct.\n\n**Step 3 — Query**\n\nInventory information is retrieved using filtering, sorting, and projection to answer operational questions — for example, identifying low-stock items or ranking suppliers by delivery volume:\n\n```js\ndb.products.find({ \"stock\": { \"$lt\": 50 } }).sort({ \"stock\": 1 })\n```\n\n**Step 4 — Export**\n\nRequired datasets are exported using `mongoexport` or MongoDB Compass.\n\n- **JSON** exports preserve nested document structures and are preferable when the downstream consumer needs the full document hierarchy.\n- **CSV** exports produce flat, tabular files suitable for spreadsheet analysis or BI tools.\n\n**Step 5 — DataFrame Analysis**\n\nThe exported file is loaded into a Pandas DataFrame:\n\n```python\nimport pandas as pd\ndf = pd.read_json('products_export.json')\n```\n\nAnalysts then apply filtering, aggregation, and visualisation to identify trends, calculate reorder metrics, and produce business reports.\n\n**Business Value**\n\nThis end-to-end workflow supports data quality through verification, operational transparency through queryable records, governance through exportable audit trails, and evidence-based decision-making through structured DataFrame analysis.",
        diagram: {
          type: "mermaid",
          code: `flowchart LR
    A[Supplier JSON Files] --> B[Validate Data]
    B --> C[mongoimport]
    C --> D[MongoDB Collection]
    D --> E[Verify with find - pretty]
    E --> F[Query &amp; Filter]
    F --> G[mongoexport]
    G --> H[JSON Export]
    G --> I[CSV Export]
    H --> J[Pandas DataFrame]
    I --> J
    J --> K[Business Analytics &amp; Reporting]`,
        },
      },
    ],
    markingGuide: `| Criterion | Marks |\n|---|---|\n| Import process described (mongoimport, mode selection) | 1 |\n| Verification technique described (find / count / spot-check) | 1 |\n| Querying described (filtering, sorting, projection) | 1 |\n| Exporting described (mongoexport or Compass) | 1 |\n| JSON format explained with justification | 1 |\n| CSV format explained with justification | 1 |\n| DataFrame analysis described (pandas, read_json / read_csv) | 1 |\n| Integrated workflow justification linking to business value | 1 |\n| **Total** | **8** |\n\n**Distinction indicators:**\n- Mentions import mode selection rationale\n- Contrasts JSON vs CSV with specific use cases\n- References governance, compliance, or audit value`,
    points: 8,
    image: {
        src: "/images/ITDSA_W13_Q16.png",
        alt: "Business workflow diagram showing supplier inventory files flowing through two unidentified processing stages before reaching analytics outputs.",
        caption: "Figure 5: RetailHub inventory data pipeline."
        }
  },
];