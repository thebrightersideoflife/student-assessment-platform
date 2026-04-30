// src/data/questions/ITDSA/week10.js
// Advanced SQL & Database Design Assessment — 50 Marks, 90 Minutes

export default [

  // ─────────────────────────────────────────────
  // SCENARIO BLOCK
  // ─────────────────────────────────────────────
  {
    id: "SCENARIO_ITDSA_W10",
    type: "scenario",
    title: "Question 1 – 3: Advanced SQL & Database Design (50 Marks)",
    context: `NexaTech is a fast-growing logistics company operating across multiple regions. The company manages:

• Customers placing shipment orders
• Warehouses storing inventory
• Products being shipped
• Orders containing multiple products
• Employees managing warehouse operations

The current system suffers from poor query performance, redundant data storage, and inconsistent product pricing across warehouses. The team also struggles to generate reports such as "Top customers by order value", "Products never ordered", and "Orders with above-average value".

You are part of the data engineering team tasked with redesigning and querying the database system.`,
  },

  // ─────────────────────────────────────────────
  // QUESTION 1 — Database Design, Constraints & DDL [20 Marks]
  // ─────────────────────────────────────────────

  {
    id: "ITDSA_W10_Q1",
    type: "multiple-choice",
    sectionLabel: "1.1",
    text: "Which of the following best explains why a FOREIGN KEY constraint is critical in NexaTech's order management system?",
    options: [
      "It ensures that duplicate product records cannot exist",
      "It enforces referential integrity between related tables",
      "It automatically indexes all related columns",
      "It restricts NULL values in child tables",
    ],
    correctAnswers: ["It enforces referential integrity between related tables"],
    points: 2,
  },

  {
    id: "ITDSA_W10_Q2",
    type: "fill-in-the-blank",
    sectionLabel: "1.2",
    text: "A constraint that ensures a column cannot contain duplicate values (but still permits NULL) is called a ___ constraint, whereas a constraint that prevents any row from containing a NULL value in that column is called a ___ constraint.",
    blanks: [
      {
        id: "b1",
        options: ["NON-DUPLICATE", "PRIMARY KEY", "UNIQUE", "CANDIDATE KEY"],
        correctAnswer: "UNIQUE",
      },
      {
        id: "b2",
        options: ["REQUIRED", "NON-NULLABLE", "MANDATORY", "NOT NULL"],
        correctAnswer: "NOT NULL",
      },
    ],
    points: 2,
  },

  {
    id: "ITDSA_W10_Q3",
    type: "open-ended",
    sectionLabel: "1.3",
    text: "What SQL command category does `CREATE TABLE` belong to? (Provide the abbreviation or full name.)",
    correctAnswers: ["DDL", "Data Definition Language"],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
  },

  {
    id: "ITDSA_W10_Q4",
    type: "multiple-choice",
    sectionLabel: "1.4",
    text: "NexaTech wants to ensure that when a warehouse record is deleted, all related inventory records are also automatically removed. Which clause achieves this?",
    options: [
      "ON UPDATE CASCADE",
      "ON DELETE CASCADE",
      "ON DELETE SET NULL",
      "ON UPDATE SET DEFAULT",
    ],
    correctAnswers: ["ON DELETE CASCADE"],
    points: 2,
  },

  {
    id: "ITDSA_W10_Q5",
    type: "show-answer",
    sectionLabel: "1.5",
    text: `Design a partial database schema for NexaTech that includes the following entities: **Customer**, **Order**, **Product**, and **OrderLine**.

Your answer must:
- Define **primary keys and foreign keys** for each table
- Include at least **two constraints beyond PK/FK** (e.g. UNIQUE, CHECK, NOT NULL, DEFAULT)
- Justify your design decisions based on **data integrity and business rules**`,
    correctAnswers: [
      {
        text: `**Schema Definition:**

\`\`\`sql
CREATE TABLE Customer (
  CustomerID   INT          PRIMARY KEY,
  Name         VARCHAR(100) NOT NULL,
  Email        VARCHAR(150) UNIQUE NOT NULL
);

CREATE TABLE Orders (
  OrderID      INT          PRIMARY KEY,
  CustomerID   INT          NOT NULL,
  OrderDate    DATE         DEFAULT SYSDATE,
  FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);

CREATE TABLE Product (
  ProductID    INT           PRIMARY KEY,
  Description  VARCHAR(255)  NOT NULL,
  Price        DECIMAL(10,2) NOT NULL CHECK (Price > 0)
);

CREATE TABLE OrderLine (
  OrderID      INT  NOT NULL,
  ProductID    INT  NOT NULL,
  Quantity     INT  NOT NULL CHECK (Quantity > 0),
  PRIMARY KEY (OrderID, ProductID),
  FOREIGN KEY (OrderID)   REFERENCES Orders(OrderID),
  FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);
\`\`\`

**Justifications:**
- **PK** on each table enforces *entity integrity* — every record is uniquely identifiable.
- **FK (Orders → Customer)** enforces *referential integrity*: an order cannot exist without a valid customer, preventing orphaned records.
- **UNIQUE (Email)** prevents duplicate customer registrations — a real business risk in a logistics platform where billing and notifications depend on a single identity per customer.
- **CHECK (Price > 0)** ensures no product is stored with a zero or negative price, protecting downstream revenue calculations.
- **CHECK (Quantity > 0)** prevents logically invalid order lines (e.g. ordering zero units).
- **Composite PK (OrderID, ProductID)** on OrderLine resolves the many-to-many relationship between Orders and Products, and prevents the same product from being listed twice on a single order.
- **DEFAULT SYSDATE** on OrderDate automates timestamping and ensures no order is recorded without a date.`,
        diagram: {
          type: "mermaid",
          code: `erDiagram
    CUSTOMER {
        int CustomerID PK
        string Name
        string Email "UNIQUE"
    }
    ORDERS {
        int OrderID PK
        int CustomerID FK
        date OrderDate "DEFAULT"
    }
    PRODUCT {
        int ProductID PK
        string Description
        decimal Price "CHECK > 0"
    }
    ORDERLINE {
        int OrderID "PK, FK"
        int ProductID "PK, FK"
        int Quantity "CHECK > 0"
    }
    CUSTOMER ||--o{ ORDERS : places
    ORDERS ||--o{ ORDERLINE : contains
    PRODUCT ||--o{ ORDERLINE : included_in`,
        },
      },
    ],
    markingGuide: `| Component | Marks |
|---|---|
| All four entities correctly identified with appropriate attributes | 2 |
| Primary keys correctly defined on all tables | 2 |
| Foreign keys correctly defined (at least 3 FKs) | 3 |
| At least two constraints beyond PK/FK (UNIQUE, CHECK, NOT NULL, DEFAULT) | 2 |
| Composite PK on OrderLine correctly resolving the many-to-many relationship | 2 |
| Quality of justification linking each constraint to a real business rule | 1 |
| **Total** | **12** |

**Common errors (cap at 8/12):**
- Missing composite PK on OrderLine
- No justification provided for constraint choices
- Using surrogate key on OrderLine instead of composite PK`,
    points: 12,
  },

  // ─────────────────────────────────────────────
  // QUESTION 2 — Data Manipulation & Query Logic [20 Marks]
  // ─────────────────────────────────────────────

  {
    id: "ITDSA_W10_Q6",
    type: "multiple-choice",
    sectionLabel: "2.1",
    text: "Which query correctly retrieves products priced between 100 and 500 inclusive?",
    options: [
      "WHERE Price > 100 AND Price < 500",
      "WHERE Price BETWEEN 100 AND 500",
      "WHERE Price IN (100, 500)",
      "WHERE Price >= 100 OR Price <= 500",
    ],
    correctAnswers: ["WHERE Price BETWEEN 100 AND 500"],
    points: 2,
  },

  {
    id: "ITDSA_W10_Q7",
    type: "fill-in-the-blank",
    sectionLabel: "2.2",
    text: "In SQL query processing order, the clause evaluated immediately after `FROM` is ___, while groups of rows are filtered using the ___ clause.",
    blanks: [
      {
        id: "b1",
        options: ["JOIN", "ON", "GROUP BY", "WHERE"],
        correctAnswer: "WHERE",
      },
      {
        id: "b2",
        options: ["QUALIFY", "WHERE", "HAVING", "FILTER"],
        correctAnswer: "HAVING",
      },
    ],
    points: 2,
  },

  {
    id: "ITDSA_W10_Q8",
    type: "open-ended",
    sectionLabel: "2.3",
    text: "Which SQL clause is used to filter **groups** (produced by GROUP BY) rather than individual rows?",
    correctAnswers: ["HAVING"],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
  },

  {
    id: "ITDSA_W10_Q9",
    type: "multiple-choice",
    sectionLabel: "2.4",
    text: "Which approach correctly returns customers who placed orders AND spent more than 1000 in total?",
    options: [
      "Use WHERE with a SUM() function directly",
      "Use GROUP BY and HAVING with SUM()",
      "Use ORDER BY and WHERE together",
      "Use DISTINCT only",
    ],
    correctAnswers: ["Use GROUP BY and HAVING with SUM()"],
    points: 2,
  },

  {
    id: "ITDSA_W10_Q10",
    type: "show-answer",
    sectionLabel: "2.5",
    text: `Write a SQL query to retrieve all customers and their total order value, but **only include customers whose total exceeds the average total order value across all customers**.

Your answer must:
- Use **aggregation** (SUM, AVG)
- Include a **subquery**
- Clearly explain each part of your logic`,
    correctAnswers: [
      {
        text: `\`\`\`sql
SELECT CustomerID, SUM(OrderTotal) AS TotalSpent
FROM Orders
GROUP BY CustomerID
HAVING SUM(OrderTotal) > (
    SELECT AVG(TotalPerCustomer)
    FROM (
        SELECT SUM(OrderTotal) AS TotalPerCustomer
        FROM Orders
        GROUP BY CustomerID
    )
);
\`\`\`

**Logical breakdown:**
1. **Innermost subquery** — groups all orders by CustomerID and computes each customer's total spend (\`SUM(OrderTotal)\`).
2. **Outer subquery** — computes the average of those per-customer totals (\`AVG(TotalPerCustomer)\`).
3. **Main query** — groups the Orders table by CustomerID again and uses \`HAVING\` to retain only customers whose total exceeds that average.

**Key insight:** \`WHERE\` cannot be used with aggregate functions like \`SUM()\` — \`HAVING\` is required to filter on grouped results. Nesting aggregation inside a subquery is necessary because SQL does not allow \`AVG(SUM(...))\` directly.`,
        diagram: {
          type: "mermaid",
          code: `flowchart TD
    A[Orders Table] --> B[Group by CustomerID]
    B --> C[Compute SUM per Customer]
    C --> D[Compute AVG of all totals]
    C --> E{SUM > AVG?}
    D --> E
    E -->|Yes| F[Include in result]
    E -->|No| G[Exclude]`,
        },
      },
    ],
    markingGuide: `| Component | Marks |
|---|---|
| Correct use of SUM() with GROUP BY on the main query | 3 |
| Subquery correctly computes AVG of per-customer totals | 3 |
| Correct use of HAVING (not WHERE) to filter grouped results | 2 |
| Clear logical explanation of all three layers | 2 |
| **Deductions** | |
| Using WHERE with SUM() (major conceptual error) | −3 |
| Missing subquery (compares to literal instead of computed average) | −2 |
| **Total** | **10** |`,
    points: 12,
  },

  // ─────────────────────────────────────────────
  // QUESTION 3 — Joins, Subqueries & Advanced Retrieval [10 Marks]
  // ─────────────────────────────────────────────

  {
    id: "ITDSA_W10_Q11",
    type: "multiple-choice",
    sectionLabel: "3.1",
    text: "Which JOIN type ensures that all customers are shown in the result, even if they have never placed an order?",
    options: [
      "INNER JOIN",
      "LEFT OUTER JOIN",
      "RIGHT OUTER JOIN",
      "NATURAL JOIN",
    ],
    correctAnswers: ["LEFT OUTER JOIN"],
    points: 2,
  },

  {
    id: "ITDSA_W10_Q12",
    type: "open-ended",
    sectionLabel: "3.2",
    text: "What is the correct term for a query that is nested inside another query?",
    correctAnswers: ["subquery", "sub-query", "nested query", "inner query"],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
  },

  {
    id: "ITDSA_W10_Q13",
    type: "multiple-choice",
    sectionLabel: "3.3",
    text: "Which operator is most appropriate when you need to compare a single value against **multiple values returned by a subquery**?",
    options: [
      "= (equals)",
      "IN",
      "BETWEEN",
      "LIKE",
    ],
    correctAnswers: ["IN"],
    points: 2,
  },

  {
    id: "ITDSA_W10_Q14",
    type: "show-answer",
    sectionLabel: "3.4",
    text: `Construct a SQL query to generate a NexaTech order report showing:
- Customer name
- Order ID
- Product description
- Total value per order line (Quantity × Price)

Your answer must:
- Join at least **four tables**
- Include a **calculated column**
- Explain how each join contributes to the final result`,
    correctAnswers: [
      {
        text: `\`\`\`sql
SELECT C.CustomerName,
       O.OrderID,
       P.Description        AS ProductDescription,
       (OL.Quantity * P.Price) AS LineTotal
FROM   Customer  C
JOIN   Orders    O  ON C.CustomerID = O.CustomerID
JOIN   OrderLine OL ON O.OrderID    = OL.OrderID
JOIN   Product   P  ON OL.ProductID = P.ProductID;
\`\`\`

**Join explanations:**
- \`Customer → Orders\` — identifies which customer placed each order (resolves the one-to-many relationship between customers and orders).
- \`Orders → OrderLine\` — links each order to its individual line items (resolves the one-to-many relationship between an order and its products).
- \`OrderLine → Product\` — retrieves the product details (description and price) for each line item (resolves the many-to-many relationship through the associative entity).
- **Calculated column** \`(OL.Quantity * P.Price) AS LineTotal\` — computes the monetary value of each order line directly in the query, avoiding the need for application-level calculation.

**Key best practices applied:**
- Table aliases keep the query readable.
- All joins use explicit ON conditions — no Cartesian product risk.
- No redundant joins or unnecessary columns selected.`,
        diagram: {
          type: "mermaid",
          code: `graph LR
    Customer -->|CustomerID| Orders
    Orders -->|OrderID| OrderLine
    OrderLine -->|ProductID| Product`,
        },
      },
    ],
    markingGuide: `| Component | Marks |
|---|---|
| All four tables correctly joined with valid ON conditions | 2 |
| Calculated column (Quantity × Price) correctly expressed | 1 |
| Clear explanation of what each join contributes | 1 |
| **Total** | **4** |

**Common errors:**
- Missing a join condition (produces a Cartesian product)
- Incorrect column references (e.g. referencing Price from OrderLine instead of Product)
- Omitting table aliases causing ambiguous column names`,
    points: 4,
  },

];