// src/data/questions/ITDSA/week12.js
export default [

  // ── SCENARIO: NexaCart Global ─────────────────────────────────────────────
  {
    id: "SCENARIO_ITDSA_W12_Q1",
    type: "scenario",
    title: "Questions 1–4: Advanced MongoDB Systems Assessment (100 Marks)",
    context: `NexaCart Global is a rapidly expanding multinational e-commerce and logistics enterprise operating across Africa, Europe, and Southeast Asia. The company manages:\n- online retail transactions,\n- warehouse inventory,\n- customer support interactions,\n- courier tracking,\n- multilingual product catalogues,\n- employee performance analytics.\n\nThe organisation previously relied on fragmented relational systems distributed across departments. As transaction volume increased, the systems began suffering from:\n- slow query execution,\n- inflexible schemas,\n- difficult joins across business units,\n- delayed reporting,\n- inconsistent customer data,\n- poor scalability during seasonal sales.\n\nTo modernise operations, NexaCart Global has decided to migrate critical operational systems to MongoDB.\n\nThe executive board requires the new database environment to:\n- support dynamic product structures,\n- store embedded customer interaction histories,\n- process high-volume read/write operations,\n- support real-time reporting,\n- minimise downtime,\n- scale horizontally across regions,\n- support advanced querying and aggregation.\n\nA database engineering team has been appointed to design and implement the system.`,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // QUESTION 1 — Database Architecture & Organisational Design [25 Marks]
  // ══════════════════════════════════════════════════════════════════════════

  // Q1.1 — Multiple Choice
  {
    id: "ITDSA_W12_Q1",
    type: "multiple-choice",
    tags: ["DBMS concepts", "database design", "technological impact"],
    sectionLabel: "1.1",
    text: "A systems architect argues that MongoDB is more suitable for NexaCart than a traditional relational database primarily because the company's product structures vary significantly between regions and categories.\n\nWhich MongoDB characteristic MOST directly addresses this requirement?",
    options: [
      "Strict schema enforcement",
      "Dynamic document structure",
      "Vertical scaling architecture",
      "Fixed table relationships",
    ],
    correctAnswers: ["Dynamic document structure"],
    points: 1,
    explanation:
      "MongoDB's **dynamic schema** allows documents within the same collection to contain different structures and fields. This directly supports highly variable product specifications across regions and categories. Strong students distinguish scalability from schema flexibility — the scenario specifically concerns structural variation in stored data.",
  },

  // Q1.2 — Fill in the Blank
  {
    id: "ITDSA_W12_Q2",
    type: "fill-in-the-blank",
    tags: ["DBMS concepts", "database design"],
    sectionLabel: "1.2",
    text: "In MongoDB, a group of related documents is known as a ___.",
    blanks: [
      {
        id: "b1",
        options: ["table", "schema", "database", "collection", "document"],
        correctAnswer: "collection",
      },
    ],
  },

  // Q1.3 — Open-Ended (Short Response)
  {
    id: "ITDSA_W12_Q3",
    type: "open-ended",
    tags: ["keys & constraints", "DBMS concepts"],
    sectionLabel: "1.3",
    text: "What MongoDB field automatically provides a unique identifier for each document?",
    correctAnswers: ["_id"],
    points: 1,
    validationOptions: {
      caseSensitive: true,
      tolerance: 0,
    },
    explanation:
      "The `_id` field uniquely identifies every MongoDB document and is automatically generated if omitted. Missing the underscore indicates insufficient MongoDB syntax familiarity.",
  },

  // Q1.4 — Multiple Choice
  {
    id: "ITDSA_W12_Q4",
    type: "multiple-choice",
    tags: ["database design", "performance monitoring", "data integration"],
    sectionLabel: "1.4",
    text: "NexaCart's analytics division frequently retrieves customer profiles together with recent support interactions and purchase histories.\n\nWhich MongoDB schema strategy would MOST likely improve read efficiency?",
    options: [
      "Separating all data into isolated collections",
      "Using highly normalised relational structures",
      "Embedding related data within documents",
      "Removing repeated information entirely",
    ],
    correctAnswers: ["Embedding related data within documents"],
    points: 1,
    explanation:
      "**Embedding** related operational data improves read efficiency by reducing the need for joins and repeated queries. High-performing students recognise operational access patterns, not just storage structures.",
  },

  // Q1.5 — Show-Answer (Essay)
  {
    id: "ITDSA_W12_Q5",
    type: "show-answer",
    tags: [
      "DBMS concepts",
      "technological impact",
      "managerial impact",
      "database design",
      "data integration",
    ],
    sectionLabel: "1.5",
    text: "The executive board wants a justification for migrating from a traditional relational database model to MongoDB.\n\n**Critically evaluate** why MongoDB may be appropriate for NexaCart Global. Your answer must discuss:\n- schema flexibility,\n- scalability,\n- replication,\n- document-oriented design,\n- operational efficiency,\n- and organisational implications.",
    correctAnswers: [
      "MongoDB is highly suitable for NexaCart Global because the organisation operates in a dynamic, high-volume commercial environment where traditional relational database systems introduce operational inefficiencies.\n\nThe company's product catalogues differ significantly between regions, suppliers, and product categories. Traditional relational databases rely on rigid schemas that require predefined columns and relationships. MongoDB's **document-oriented architecture** instead allows data to be stored as flexible BSON documents, enabling different products to contain different attributes without expensive schema redesign.\n\nThis **schema flexibility** is particularly valuable for multinational organisations because product metadata evolves continuously. For example, one region may require multilingual warranty information while another stores regulatory compliance data unique to local legislation.\n\nMongoDB also improves **operational efficiency** through embedded document structures. Customer orders, shipment updates, and support histories can be stored together within single documents. This reduces the need for expensive joins, improving read performance and simplifying application logic.\n\n**Scalability** is another critical factor. NexaCart processes large transaction volumes during seasonal promotions and international sales events. MongoDB supports horizontal scaling using *sharding*, distributing collections across multiple nodes. This improves performance, fault tolerance, and workload balancing.\n\n**Replication** further strengthens business continuity. Replica sets maintain synchronised copies of data across multiple servers, enabling automatic failover when primary nodes become unavailable. This minimises downtime and protects operational continuity.\n\nFrom an organisational perspective, MongoDB aligns with agile development methodologies because developers can adapt data structures rapidly without repeatedly restructuring relational schemas. This improves deployment speed and organisational responsiveness.\n\nHowever, MongoDB also introduces trade-offs. Poor schema design may produce excessive document growth or data duplication. Aggregation queries may become computationally expensive in highly analytical workloads. Therefore, effective implementation requires disciplined schema planning and governance practices.\n\nOverall, MongoDB provides NexaCart with scalability, flexibility, operational efficiency, and resilience suited to modern multinational commerce.",
    ],
    markingGuide: `| Criterion | Marks |\n|---|---|\n| Explains document-oriented design | 3 |\n| Discusses schema flexibility | 2 |\n| Explains scalability/sharding | 2 |\n| Explains replication/high availability | 2 |\n| Links architecture to business operations | 3 |\n| Evaluates limitations/trade-offs | 2 |\n| Technical clarity and integration | 1 |\n| **Total** | **15** |\n\n**Common weaknesses:**\n- Listing features without linking them to the scenario\n- Confusing replication with backup systems\n- Discussing SQL joins without operational context\n- Failing to evaluate trade-offs\n\n**A+ characteristics:** Integrates technical and organisational reasoning; uses applied examples from the scenario; evaluates strengths AND limitations; demonstrates architectural understanding.`,
    points: 15,
    image: {
        src: "/images/ITDSA_W4_Q5.png",
        alt: "Enterprise systems architecture comparison showing fragmented departmental databases versus a centralized MongoDB cluster for NexaCart Global.",
        caption: "Figure 1. Legacy silo-based enterprise databases compared with a centralized MongoDB architecture supporting integrated real-time operations."
        }
  },

  // ══════════════════════════════════════════════════════════════════════════
  // QUESTION 2 — Data Modelling & Document Structures [25 Marks]
  // ══════════════════════════════════════════════════════════════════════════

  // Q2.1 — Multiple Choice
  {
    id: "ITDSA_W12_Q6",
    type: "multiple-choice",
    tags: ["database design", "data integration", "performance monitoring"],
    sectionLabel: "2.1",
    text: "A database engineer proposes the following design:\n- Orders collection\n- Embedded array of purchased products\n- Embedded shipment updates\n- Embedded payment records\n\nWhat is the PRIMARY benefit of this design?",
    options: [
      "Reduced storage usage",
      "Elimination of indexing",
      "Faster retrieval of related operational data",
      "Automatic relational integrity enforcement",
    ],
    correctAnswers: ["Faster retrieval of related operational data"],
    points: 1,
    explanation:
      "Embedding related records enables MongoDB to retrieve operationally connected data in a single query. Strong answers recognise **workload optimisation** rather than storage optimisation.",
  },

  // Q2.2 — Fill in the Blank
  {
    id: "ITDSA_W12_Q7",
    type: "fill-in-the-blank",
    tags: ["DBMS concepts"],
    sectionLabel: "2.2",
    text: "MongoDB stores documents internally using a binary representation called ___.",
    blanks: [
      {
        id: "b1",
        options: ["BSON", "JSON", "XML", "CSV"],
        correctAnswer: "BSON",
      },
    ],
  },

  // Q2.3 — Open-Ended (Short Response)
  {
    id: "ITDSA_W12_Q8",
    type: "open-ended",
    tags: ["DBMS concepts", "database design"],
    sectionLabel: "2.3",
    text: "Which MongoDB datatype is specifically designed to store lists of values?",
    correctAnswers: ["Array", "array"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    explanation:
      "**Arrays** store multiple values under a single field and support embedded multi-valued structures in MongoDB documents.",
  },

  // Q2.4 — Multiple Choice
  {
    id: "ITDSA_W12_Q9",
    type: "multiple-choice",
    tags: ["DBMS concepts", "database design"],
    sectionLabel: "2.4",
    text: "A junior developer claims that all documents inside a MongoDB collection must contain identical fields.\n\nWhy is this statement incorrect?",
    options: [
      "MongoDB automatically removes inconsistent fields",
      "MongoDB collections enforce foreign-key dependency instead",
      "MongoDB supports dynamic schemas",
      "MongoDB only validates indexed documents",
    ],
    correctAnswers: ["MongoDB supports dynamic schemas"],
    points: 1,
    explanation:
      "MongoDB collections allow documents with **varying fields and structures**. This is the core principle of MongoDB's dynamic schema model — there is no requirement for every document in a collection to share the same shape.",
  },

  // Q2.5 — Show-Answer (Essay) with Mermaid diagram
  {
    id: "ITDSA_W12_Q10",
    type: "show-answer",
    tags: [
      "database design",
      "data integration",
      "business rules",
      "system design",
    ],
    sectionLabel: "2.5",
    text: "NexaCart plans to redesign its customer-support platform using MongoDB.\n\n**Design and justify** an appropriate MongoDB document structure for storing:\n- customer information,\n- support tickets,\n- ticket updates,\n- and communication history.\n\nYour response must evaluate **embedding versus separation** of data.",
    correctAnswers: [
      {
        text: "An effective MongoDB design **embeds** ticket updates and communication history within support-ticket documents, while maintaining customers in a **separate collection**.\n\n**Conceptual document structure:**\n\n```json\n{\n  \"_id\": \"ObjectId()\",\n  \"customerId\": \"C1021\",\n  \"ticketTitle\": \"Refund Request\",\n  \"status\": \"Open\",\n  \"priority\": \"High\",\n  \"createdDate\": \"ISODate()\",\n  \"messages\": [\n    {\n      \"sender\": \"Customer\",\n      \"message\": \"My order arrived damaged.\",\n      \"timestamp\": \"ISODate()\"\n    },\n    {\n      \"sender\": \"SupportAgent\",\n      \"message\": \"Replacement initiated.\",\n      \"timestamp\": \"ISODate()\"\n    }\n  ]\n}\n```\n\n**Justification for embedding:**\n\nEmbedding communication history improves read efficiency because support agents typically retrieve *complete* ticket histories together. MongoDB performs well when related operational data is stored within the same document, avoiding repeated queries across collections.\n\n**Justification for separation:**\n\nCustomer data should remain in a separate collection because customers may generate many support tickets over time. Embedding all tickets directly inside customer documents could create excessively large documents and reduce maintainability. A `customerId` reference preserves the relationship without coupling the structures.\n\n**Design outcome:**\n\nThis approach balances scalability and operational efficiency. It minimises joins while preserving manageable document sizes. The design also supports flexible ticket structures, enabling future additions such as image attachments or multilingual metadata without schema redesign.",
        diagram: {
          type: "mermaid",
          code: `erDiagram
  CUSTOMER {
    ObjectId _id PK
    string customerName
    string email
    string region
  }
  SUPPORT_TICKET {
    ObjectId _id PK
    string customerId FK
    string ticketTitle
    string status
    string priority
    date createdDate
  }
  MESSAGE_HISTORY {
    string sender
    string message
    date timestamp
  }
  CUSTOMER ||--o{ SUPPORT_TICKET : creates
  SUPPORT_TICKET ||--|{ MESSAGE_HISTORY : contains`,
        },
      },
    ],
    markingGuide: `| Criterion | Marks |\n|---|---|\n| Appropriate document structure | 4 |\n| Correct embedding justification | 3 |\n| Correct separation justification | 3 |\n| Scalability considerations | 2 |\n| Read/write optimisation discussion | 2 |\n| Technical clarity | 1 |\n| **Total** | **15** |\n\n**A+ notes:** Distinguish operational vs analytical access patterns; justify embedding using query behaviour; identify document growth risks; explain why customer data should remain separate.\n\n**Weak responses:** Embed everything blindly; discuss SQL normalisation mechanically; fail to justify design decisions operationally.`,
    points: 15,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // QUESTION 3 — Querying & Data Retrieval [25 Marks]
  // ══════════════════════════════════════════════════════════════════════════

  // Q3.1 — Multiple Choice
  {
    id: "ITDSA_W12_Q11",
    type: "multiple-choice",
    tags: ["DBMS concepts", "performance monitoring"],
    sectionLabel: "3.1",
    text: "A manager wants to retrieve all products with prices greater than 5000.\n\nWhich operator should be used?",
    options: ["$lt", "$eq", "$gte", "$gt"],
    correctAnswers: ["$gt"],
    points: 1,
    explanation:
      "`$gt` returns documents whose field value is *greater than* the specified value. `$gte` would include the value itself (greater than or equal to), which is not what the question asks for.",
  },

  // Q3.2 — Fill in the Blank
  {
    id: "ITDSA_W12_Q12",
    type: "fill-in-the-blank",
    tags: ["DBMS concepts", "database design"],
    sectionLabel: "3.2",
    text: "The MongoDB method used to retrieve documents from a collection is ___.",
    blanks: [
      {
        id: "b1",
        options: ["fetch()", "find()", "get()", "select()", "query()"],
        correctAnswer: "find()",
      },
    ],
  },

  // Q3.3 — Multiple Choice
  {
    id: "ITDSA_W12_Q13",
    type: "multiple-choice",
    tags: ["performance monitoring", "DBMS concepts"],
    sectionLabel: "3.3",
    text: 'A developer executes:\n\n```javascript\ndb.products.find().sort({"price":-1})\n```\n\nWhat is the effect of `-1`?',
    options: [
      "Random ordering",
      "Descending order",
      "Ascending order",
      "Numeric filtering",
    ],
    correctAnswers: ["Descending order"],
    points: 1,
    explanation:
      "A value of `-1` in `sort()` sorts records in **descending order** (largest to smallest). A value of `1` sorts in ascending order (smallest to largest).",
  },

  // Q3.4 — Open-Ended (Short Response)
  {
    id: "ITDSA_W12_Q14",
    type: "open-ended",
    tags: ["DBMS concepts"],
    sectionLabel: "3.4",
    text: "Which MongoDB method formats query results for readability?",
    correctAnswers: ["pretty()", "pretty"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
      allowPartialMatch: true,
    },
    explanation:
      "`pretty()` formats MongoDB query results into a readable, indented structure — useful when inspecting documents in the MongoDB shell.",
  },

  // Q3.5 — Multiple Choice
  {
    id: "ITDSA_W12_Q15",
    type: "multiple-choice",
    tags: ["performance monitoring", "DBMS concepts"],
    sectionLabel: "3.5",
    text: 'NexaCart wants to search product descriptions for the phrase "wireless charger" regardless of letter casing.\n\nWhich MongoDB feature is MOST suitable?',
    options: [
      "Aggregation grouping",
      "Replica sets",
      "Regular expressions with `$options`",
      "Capped collections",
    ],
    correctAnswers: ["Regular expressions with `$options`"],
    points: 1,
    explanation:
      "MongoDB **regular expressions** support pattern matching, and the `$options` flag (e.g., `i` for case-insensitive) allows searches regardless of letter casing. This is the correct tool for flexible text pattern searches.",
  },

  // Q3.6 — Show-Answer (Essay)
  {
    id: "ITDSA_W12_Q16",
    type: "show-answer",
    tags: [
      "performance monitoring",
      "DBA responsibilities",
      "database design",
      "DBMS concepts",
    ],
    sectionLabel: "3.6",
    text: "A regional warehouse system has become slow due to increasing search operations across millions of logistics records.\n\n**Explain how indexing improves query performance in MongoDB.** Your answer should discuss:\n- how indexes work,\n- ascending vs descending indexes,\n- performance implications,\n- and limitations of excessive indexing.",
    correctAnswers: [
      "**Indexes** improve MongoDB query performance by creating ordered lookup structures that reduce the need for full collection scans.\n\n**The problem without indexes:**\n\nWithout indexes, MongoDB performs *collection scans*, examining every document individually. This becomes highly inefficient when collections contain millions of logistics records — every query must traverse the entire dataset regardless of how many matching documents exist.\n\n**How indexes work:**\n\nIndexes store references to field values in sorted order. When queries search indexed fields such as shipment IDs or tracking statuses, MongoDB can quickly identify relevant documents using the index structure rather than scanning the entire collection.\n\n**Ascending vs descending indexes:**\n\nAscending indexes (`1`) organise values from smallest to largest, while descending indexes (`-1`) reverse the ordering. The choice depends on query and sorting requirements — an ascending index on `trackingNumber` suits lookups and range queries, while descending suits retrieval of the most recent records first.\n\nExample:\n\n```javascript\ndb.shipments.ensureIndex({\"trackingNumber\": 1})\n```\n\nThis dramatically improves retrieval speed for shipment lookups.\n\n**Performance implications:**\n\nIndexes significantly improve *read performance* and sorting operations. Queries against indexed fields complete in a fraction of the time compared to unindexed collection scans.\n\n**Limitations of excessive indexing:**\n\nHowever, every insert, update, or delete operation requires *all* relevant indexes to be updated, which may reduce write performance. Indexes also consume additional storage space. An over-indexed collection can therefore degrade write throughput and increase storage costs.\n\nEffective indexing requires strategic analysis of frequent queries and operational workloads rather than indexing every field indiscriminately.",
    ],
    markingGuide: `| Criterion | Marks |\n|---|---|\n| Explains collection scanning problem | 2 |\n| Explains how indexes work | 4 |\n| Ascending vs descending indexes | 2 |\n| Operational performance implications | 3 |\n| Evaluates indexing trade-offs | 3 |\n| Technical precision | 1 |\n| **Total** | **15** |\n\n**Examiner note:** Top students discuss BOTH benefits and costs of indexing. Lower-performing responses present indexes as universally beneficial without addressing write overhead or storage implications.`,
    points: 15,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // QUESTION 4 — Data Manipulation & Aggregation [25 Marks]
  // ══════════════════════════════════════════════════════════════════════════

  // Q4.1 — Fill in the Blank
  {
    id: "ITDSA_W12_Q17",
    type: "fill-in-the-blank",
    tags: ["DBMS concepts", "database design"],
    sectionLabel: "4.1",
    text: "The MongoDB method used to insert multiple documents simultaneously is ___.",
    blanks: [
      {
        id: "b1",
        options: ["insertAll()", "insert()", "insertMany()", "bulkInsert()", "multiInsert()"],
        correctAnswer: "insertMany()",
      },
    ],
  },

  // Q4.2 — Multiple Choice
  {
    id: "ITDSA_W12_Q18",
    type: "multiple-choice",
    tags: ["DBMS concepts", "DBA responsibilities"],
    sectionLabel: "4.2",
    text: "A database administrator executes:\n\n```javascript\ndb.orders.remove()\n```\n\nWhat is the MOST likely result?",
    options: [
      "Only one document is deleted",
      "The collection structure is deleted entirely",
      "All documents inside the collection are deleted",
      "Only indexed documents are removed",
    ],
    correctAnswers: ["All documents inside the collection are deleted"],
    points: 1,
    explanation:
      "Calling `remove()` **without any filter criteria** removes every document from the collection. The collection itself and its indexes remain — only the documents are deleted. This is a critical distinction from `drop()`, which removes the entire collection.",
  },

  // Q4.3 — Multiple Choice
  {
    id: "ITDSA_W12_Q19",
    type: "multiple-choice",
    tags: ["performance monitoring", "DBMS concepts"],
    sectionLabel: "4.3",
    text: "Which MongoDB operation is MOST appropriate for grouping sales records by regional branch?",
    options: ["$regex", "$group", "$set", "$lte"],
    correctAnswers: ["$group"],
    points: 1,
    explanation:
      "`$group` groups documents by specified fields during aggregation operations — similar in concept to `GROUP BY` in SQL. It is the correct aggregation stage for producing region-level summaries.",
  },

  // Q4.4 — Open-Ended (Short Response)
  {
    id: "ITDSA_W12_Q20",
    type: "open-ended",
    tags: ["DBMS concepts", "SQL"],
    sectionLabel: "4.4",
    text: "Which aggregation stage filters documents similarly to an SQL `WHERE` clause?",
    correctAnswers: ["$match", "match"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
      allowPartialMatch: true,
    },
    explanation:
      "The `$match` stage filters documents in an aggregation pipeline, functioning similarly to a SQL `WHERE` clause. Placing `$match` early in a pipeline reduces unnecessary processing by limiting the documents passed to subsequent stages.",
  },

  // Q4.5 — Show-Answer (Essay)
  {
    id: "ITDSA_W12_Q21",
    type: "show-answer",
    tags: [
      "performance monitoring",
      "DBMS concepts",
      "managerial impact",
      "data integration",
    ],
    sectionLabel: "4.5",
    text: "NexaCart executives require a monthly operational dashboard summarising:\n- sales by region,\n- average order values,\n- employee productivity,\n- and shipment trends.\n\n**Explain how MongoDB aggregation can support these reporting requirements.** Your answer should discuss:\n- aggregation pipelines,\n- grouping operations,\n- filtering,\n- operational analytics,\n- and limitations compared with traditional relational reporting systems.",
    correctAnswers: [
      "MongoDB **aggregation pipelines** support operational analytics by processing large volumes of records through sequential transformation stages that produce computed results.\n\n**How pipelines work:**\n\nAggregation pipelines pass documents through a series of stages. Each stage transforms or filters the dataset before passing results to the next stage. This sequential design allows complex analytical operations to be built from simple, composable steps.\n\n**Filtering with `$match`:**\n\nThe `$match` stage filters records similarly to a SQL `WHERE` clause, reducing unnecessary processing early in the pipeline. Placing `$match` at the start improves efficiency by limiting the number of documents passed to later stages.\n\n**Grouping with `$group`:**\n\nThe `$group` stage groups documents according to fields such as region, warehouse, or employee department. Aggregation operators then calculate totals, averages, counts, or other metrics across each group.\n\nExample:\n\n```javascript\ndb.orders.aggregate([\n  { $match: { status: \"Completed\" } },\n  { $group: {\n      _id: \"$region\",\n      totalSales: { $sum: \"$total\" },\n      averageSales: { $avg: \"$total\" },\n      totalOrders: { $sum: 1 }\n  }}\n])\n```\n\nThis enables executives to analyse sales trends across business regions in real time.\n\n**Operational analytics support:**\n\nAggregation pipelines support advanced analytical tasks such as identifying shipment bottlenecks, tracking employee productivity trends, and surfacing customer purchasing patterns — all without exporting data to a separate reporting system.\n\n**Limitations compared to relational reporting:**\n\nHowever, highly complex aggregations may become computationally expensive for deeply nested structures or massive cross-collection operations. Traditional relational reporting systems may outperform MongoDB in structured transactional reporting environments requiring extensive joins across many normalised tables.\n\nMongoDB aggregation is therefore highly effective for *real-time operational dashboards* and scalable business intelligence, but requires careful optimisation for enterprise-scale analytical workloads.",
    ],
    markingGuide: `| Criterion | Marks |\n|---|---|\n| Explains aggregation pipelines | 4 |\n| Explains \`$match\` and filtering | 2 |\n| Explains \`$group\` operations | 3 |\n| Connects aggregation to business analytics | 3 |\n| Evaluates limitations/trade-offs | 2 |\n| Technical clarity | 1 |\n| **Total** | **15** |\n\n**Examiner note:** Exceptional answers connect technical aggregation capabilities to executive decision-making and organisational reporting. Weak responses list pipeline stages without applying them to NexaCart's specific dashboard requirements.`,
    points: 15,
    image: {
        src: "/images/ITDSA_W4_Q21.png",
        alt: "MongoDB aggregation pipeline diagram showing operational data flowing through $match, $group, and $sort stages into an executive analytics dashboard.",
        caption: "Figure 4. MongoDB aggregation pipelines transform operational datasets into structured analytical insights for executive reporting."
        }
  },
];