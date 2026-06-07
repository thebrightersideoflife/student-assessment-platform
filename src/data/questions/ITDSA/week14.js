// src/data/questions/ITDSA/week14.js
export default [

  // ─────────────────────────────────────────────
  // QUESTION 1 — EduLink Africa
  // ─────────────────────────────────────────────

  {
    id: "ITDSA_W14_Q1",
    type: "scenario",
    sectionLabel: "1",
    context: "**EduLink Africa — Graph Database Implementation**\n\nEduLink Africa is a rapidly growing educational technology company operating across several African countries. The company connects **Students**, **Courses**, **Lecturers**, **Learning Centres**, and **Certifications**.\n\nManagement has identified several challenges:\n- Students frequently enrol in multiple courses.\n- Courses are taught by multiple lecturers.\n- Learning centres host different courses.\n- Students often complete certification programmes that depend on prerequisite courses.\n- Existing relational systems require excessive JOIN operations and are becoming difficult to maintain.\n\nThe company has decided to migrate to **Neo4j**.",
  },

  {
    id: "ITDSA_W14_Q2",
    type: "multiple-choice",
    tags: ["DBMS concepts", "database design"],
    sectionLabel: "1.1",
    text: "The Chief Data Officer argues that Neo4j is more suitable than a traditional relational database because the organisation's data is highly interconnected.\n\nWhich characteristic of Neo4j **most directly** addresses this requirement?",
    options: [
      "Fixed schema enforcement",
      "Native graph traversal without complex joins",
      "Mandatory normalisation of all entities",
      "Sequential storage of records",
    ],
    correctAnswers: ["Native graph traversal without complex joins"],
    points: 2,
    explanation:
      "Neo4j stores relationships as **first-class citizens** in the graph. Traversing connected entities does not require expensive `JOIN` operations typically associated with relational databases — the connections are already embedded in the structure.",
  },

  {
    id: "ITDSA_W14_Q3",
    type: "open-ended",
    tags: ["database design"],
    sectionLabel: "1.2",
    text: "In Neo4j, entities such as Students and Courses are represented by __________.",
    correctAnswers: ["Nodes", "Node"],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
      allowPartialMatch: true,
    },
    explanation:
      "**Nodes** represent entities in the graph model. Note that **labels** (e.g. `Student`, `Course`) *classify* nodes — they are not the nodes themselves. Students frequently confuse the two.",
  },

  {
    id: "ITDSA_W14_Q4",
    type: "open-ended",
    tags: ["DBMS concepts"],
    sectionLabel: "1.3",
    text: "What Cypher clause is primarily used to **search for existing patterns** in a graph?",
    correctAnswers: ["MATCH"],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    explanation:
      "`MATCH` is Neo4j's primary pattern **retrieval** mechanism. It scans the graph for nodes and relationships that fit the given pattern. Distinguish it from `CREATE` and `MERGE`, which are used for **creation**.",
  },

  {
    id: "ITDSA_W14_Q5",
    type: "multiple-choice",
    tags: ["keys & constraints", "database design"],
    sectionLabel: "1.4",
    text: "A database designer wants to ensure that when creating a Lecturer node, an existing lecturer is **reused** if it already exists rather than creating duplicates.\n\nWhich Cypher clause is most appropriate?",
    options: [
      "CREATE",
      "REMOVE",
      "MERGE",
      "DELETE",
    ],
    correctAnswers: ["MERGE"],
    points: 3,
    explanation:
      "`MERGE` first attempts to **match** an existing pattern. Only if no match is found does it **create** the pattern. This makes it the correct tool for avoiding duplicate nodes — making it fundamentally a **data integrity** clause, not just a query-writing one.",
  },

  {
    id: "ITDSA_W14_Q6",
    type: "show-answer",
    tags: ["database design", "ER modelling"],
    sectionLabel: "1.5",
    text: "Using the **EduLink Africa** scenario, identify:\n\n1. Three **node labels**\n2. Three **relationship types**\n3. Two **properties** for any one node\n\nFormat your answer as:\n- **Labels:**\n- **Relationships:**\n- **Properties (node):**",
    correctAnswers: [
      {
        text: "**Labels:**\n- `Student`\n- `Course`\n- `Lecturer`\n\n*(Also valid: `Certification`, `LearningCentre`)*\n\n**Relationships:**\n- `ENROLLED_IN`\n- `TEACHES`\n- `COMPLETED`\n\n*(Also valid: `HOSTS`, `AWARDED_TO`, `PREREQUISITE_FOR`)*\n\n**Properties (Student node):**\n- `studentID`\n- `studentName`\n\n*(Other valid examples: `courseCode`, `certificationName`, `centreLocation`)*",
        diagram: {
          type: "mermaid",
          code: `graph LR
Student["Student"]
Course["Course"]
Lecturer["Lecturer"]
Certification["Certification"]
LearningCentre["Learning Centre"]
Student -->|ENROLLED_IN| Course
Lecturer -->|TEACHES| Course
Student -->|COMPLETED| Certification
Course -->|PREREQUISITE_FOR| Certification
LearningCentre -->|HOSTS| Course`,
        },
      },
    ],
    markingGuide: `| Requirement | Marks |
|---|---|
| Three valid node labels | 3 |
| Three valid relationship types | 2 |
| Two valid properties for any one node | 1 |
| **Total** | **6** |

**Common errors:**
- Confusing labels (e.g. \`Student\`) with properties (e.g. \`studentName\`)
- Writing relationship types in lowercase (e.g. \`enrolled_in\` instead of \`ENROLLED_IN\`)
- Marks are awarded for **semantic correctness**, not exact wording`,
    points: 6,
  },

  {
    id: "ITDSA_W14_Q7",
    type: "show-answer",
    tags: ["DBMS concepts", "data integration", "managerial impact"],
    sectionLabel: "1.6",
    text: "EduLink Africa's management team is uncertain whether moving from a relational database to Neo4j is justified.\n\n**Critically evaluate** the suitability of Neo4j for this organisation. Your discussion should include:\n- Graph database characteristics\n- Neo4j building blocks (nodes, relationships, properties, labels)\n- Advantages of graph traversal over relational joins\n- Data flexibility and schema design\n- Scalability and ACID support\n- Business implications for EduLink Africa",
    correctAnswers: [
      "EduLink Africa's environment contains highly interconnected data involving students, courses, lecturers, certifications and learning centres. Such relationships form a natural graph structure, making Neo4j a highly suitable database solution.\n\nNeo4j stores information using **nodes**, **relationships**, **labels** and **properties**. Students, lecturers and courses become nodes, while interactions such as `ENROLLED_IN`, `TEACHES` and `COMPLETED` become relationships connecting them.\n\nUnlike relational databases, which often require numerous `JOIN` operations to discover indirect relationships, Neo4j uses **graph traversal**. This allows queries such as prerequisite chains, student learning pathways and lecturer influence networks to execute efficiently — because relationships are stored directly rather than inferred at query time.\n\nThe platform also provides **schema flexibility**. New educational programmes, certifications and partnerships can be incorporated without extensive redesign of existing structures.\n\nNeo4j supports **ACID transactions**, ensuring consistency during enrolments, certification awards and academic updates.\n\nFrom a **managerial perspective**, Neo4j improves organisational visibility, enables more advanced analytics and recommendation systems, and supports strategic decision-making. The reduction of data silos aligns with EduLink Africa's expansion objectives across multiple countries.\n\nConsequently, Neo4j provides both technical and business advantages that directly address the company's operational requirements.",
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Correct explanation of graph structures (nodes, relationships, labels, properties) | 2 |
| Discussion of graph traversal advantage over relational joins | 2 |
| Flexibility and schema extensibility | 2 |
| Scalability and ACID support | 2 |
| Business implications linked to the EduLink scenario | 2 |
| **Total** | **10** |

**Common errors:**
- Listing Neo4j features without linking them to the scenario — *do not award full marks*
- Failing to mention ACID support
- Vague business implications not grounded in EduLink's specific context`,
    points: 10,
  },

  // ─────────────────────────────────────────────
  // QUESTION 2 — StreamSphere
  // ─────────────────────────────────────────────

  {
    id: "ITDSA_W14_Q8",
    type: "scenario",
    sectionLabel: "2",
    context: "**StreamSphere Media Analytics Platform**\n\nStreamSphere is a digital streaming platform. The organisation stores information about **Users**, **Movies**, **Actors**, **Genres**, and **Viewing History**.\n\nManagement wishes to analyse:\n- Most watched genres\n- User viewing patterns\n- Actor popularity\n- Relationships between movies and genres\n\nThe database already contains nodes and relationships.",
  },

  {
    id: "ITDSA_W14_Q9",
    type: "multiple-choice",
    tags: ["DBMS concepts"],
    sectionLabel: "2.1",
    text: "A data analyst wants to **retrieve all Movie nodes**.\n\nWhich query pattern is correct?",
    options: [
      "RETURN (Movie)",
      "MATCH (m:Movie) RETURN m",
      "CREATE (m:Movie) RETURN m",
      "MERGE (m:Movie)",
    ],
    correctAnswers: ["MATCH (m:Movie) RETURN m"],
    points: 2,
    explanation:
      "`MATCH` retrieves existing nodes — it is the correct clause for **reading** data. `CREATE` and `MERGE` are used to **write** data. `RETURN (Movie)` without a `MATCH` clause is invalid Cypher syntax.",
  },

  {
    id: "ITDSA_W14_Q10",
    type: "fill-in-the-blank",
    tags: ["DBMS concepts"],
    sectionLabel: "2.2",
    text: "The Cypher clause used to arrange query results in a specific order is ___.",
    blanks: [
      {
        id: "b1",
        options: [ "SORT BY", "LIMIT", "GROUP BY", "ORDER BY","ARRANGE BY" ],
        correctAnswer: "ORDER BY",
      },
    ],
    explanation:
      "`ORDER BY` sorts query results according to one or more attributes, either ascending (`ASC`) or descending (`DESC`). Note that `GROUP BY` is SQL syntax — it does not exist in Cypher.",
  },

  {
    id: "ITDSA_W14_Q11",
    type: "open-ended",
    tags: ["DBMS concepts"],
    sectionLabel: "2.3",
    text: "Which **aggregation function** would you use to determine how many `Movie` nodes exist?",
    correctAnswers: ["COUNT", "COUNT()"],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
      allowPartialMatch: true,
    },
    explanation:
      "`COUNT` returns the number of matched rows or elements. For example: `MATCH (m:Movie) RETURN COUNT(m)` returns the total number of Movie nodes in the graph.",
  },

  {
    id: "ITDSA_W14_Q12",
    type: "multiple-choice",
    tags: ["DBMS concepts", "performance monitoring"],
    sectionLabel: "2.4",
    text: "A query returns thousands of rows, but management only wants the **top five results**.\n\nWhich clause should be used?",
    options: [
      "RETURN",
      "LIMIT",
      "WITH",
      "MERGE",
    ],
    correctAnswers: ["LIMIT"],
    points: 3,
    explanation:
      "`LIMIT` restricts the number of rows returned by a query. It is typically combined with `ORDER BY` to retrieve the *top N* results. Note: `SKIP` controls the **starting position** of results, not the quantity — a common point of confusion.",
  },

  {
    id: "ITDSA_W14_Q13",
    type: "show-answer",
    tags: ["DBMS concepts", "database design"],
    sectionLabel: "2.5",
    text: "Consider the following query:\n\n```cypher\nMATCH (u:User)-[:WATCHED]->(m:Movie)\nRETURN m.genre, COUNT(*) AS Views\nORDER BY Views DESC\nLIMIT 3\n```\n\nAnswer the following:\n\na) What is the purpose of `MATCH`? *[1]*\nb) What is being counted? *[2]*\nc) Why is `ORDER BY` used? *[1]*\nd) Why is `LIMIT` used? *[2]*",
    correctAnswers: [
      "**a) Purpose of `MATCH`:**\n`MATCH` identifies **Users** connected to **Movies** through `WATCHED` relationships. It defines the pattern the query will search for across the graph.\n\n**b) What is being counted:**\n`COUNT(*)` counts the number of `WATCHED` relationship occurrences per genre — in other words, **how many times users watched movies belonging to each genre**. This produces a viewing frequency per genre.\n\n**c) Why `ORDER BY` is used:**\n`ORDER BY Views DESC` sorts the genres by their viewing count from **highest to lowest**, so the most-watched genres appear first.\n\n**d) Why `LIMIT` is used:**\n`LIMIT 3` restricts the output to the **three most-watched genres** only, preventing the query from returning the full list of all genres.",
    ],
    markingGuide: `| Part | Marks |
|---|---|
| a) MATCH identifies users connected to movies via WATCHED | 1 |
| b) Counts WATCHED occurrences per genre (full explanation) | 2 |
| b) Partial understanding (e.g. "counts movies") | 1 |
| c) Sorts by viewing count from highest to lowest | 1 |
| d) Restricts output to three results | 2 |
| **Total** | **6** |

**Examiner note:** This question tests whether students can interpret **query intent**, not merely read syntax.`,
    points: 6,
    image: {
      src: "/images/ITDSA_W14_Q13.png",
      alt: "Graph database showing users connected to movies through WATCHED relationships. Two movies belong to the Action genre and one movie belongs to the Sci-Fi genre.",
      caption: "Figure 2: StreamSphere Viewing Network"
    }
  },

  {
    id: "ITDSA_W14_Q14",
    type: "show-answer",
    tags: ["keys & constraints", "performance monitoring", "data quality"],
    sectionLabel: "2.6",
    text: "StreamSphere's database administrator proposes implementing **indexes and unique constraints** before the platform expands internationally.\n\n**Critically discuss:**\n- Why indexes improve performance\n- When indexes are most beneficial\n- The role of unique constraints\n- Data integrity implications\n- Potential business risks of *not* implementing these mechanisms",
    correctAnswers: [
      "**Indexes** improve query performance by allowing Neo4j to locate nodes **without scanning the entire graph**. Queries involving `MATCH`, `WHERE` and property-based lookups execute substantially faster when the target property is indexed.\n\nIndexes become particularly valuable as data volume grows. As StreamSphere expands internationally, the volume of users, movies, actors and viewing records will increase substantially. Without indexes, response times will degrade as the graph scales.\n\nIndexes are **most beneficial** on frequently searched properties — such as `userID`, `movieID`, or `actorName` — where the same attribute is repeatedly used in lookup conditions.\n\n**Unique constraints** enforce data integrity by ensuring specified properties cannot be duplicated. For example, each `UserID` should uniquely identify a single user, and each movie in the catalogue should have a distinct identifier. These constraints prevent duplicate nodes from being created and ensure reliable `MERGE` operations.\n\nWithout constraints, duplicate records may accumulate, producing **inaccurate analytics**, unreliable recommendation systems and inconsistent reports.\n\nFrom a **business perspective**, poor query performance reduces user satisfaction and platform responsiveness. Duplicated data undermines strategic decision-making, skews viewing statistics and erodes trust in the platform's reporting. Together, indexes and constraints contribute to **scalability**, **reliability**, and **trustworthy organisational data** — all critical as StreamSphere grows internationally.",
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Index purpose explained (avoids full graph scan) | 2 |
| Performance benefits linked to query types / data growth | 2 |
| Unique constraint purpose explained | 2 |
| Data integrity implications (duplicates, MERGE reliability) | 2 |
| Business implications tied to StreamSphere's expansion | 2 |
| **Total** | **10** |

**Common errors:**
- Explaining indexes correctly but failing to connect them to organisational growth — *cap at 7/10*
- Describing constraints without explaining the consequence of *not* having them
- Vague business risks not grounded in the StreamSphere scenario`,
    points: 10,
  },
];