import { useParams, useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

export default function RoadmapPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container roadmap-print-container">
      {/* Header - Hidden on print */}
      <div 
        className="no-print"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px"
        }}
      >
        <button
          className="button"
          onClick={() => navigate(`/module/${moduleId}`)}
        >
          ← Back to Weeks
        </button>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button
            className="button"
            onClick={handlePrint}
            style={{
              background: "var(--accent-secondary)",
              padding: "10px 20px"
            }}
          >
            🖨️ Print Roadmap
          </button>
          <ThemeToggle />
        </div>
      </div>

      {/* Page Header */}
      <header 
        className="roadmap-print-header"
        style={{
          background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
          borderRadius: "14px",
          padding: "3rem 2rem",
          textAlign: "center",
          marginBottom: "2.5rem",
          border: "1px solid var(--border-color)"
        }}
      >
        <h1 style={{
          margin: 0,
          fontSize: "2.4rem",
          color: "white",
          textShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
            From The Module Guide
        </h1>

        <h1 style={{
          margin: 0,
          fontSize: "2.4rem",
          color: "white",
          textShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          ITJVA – Accelerated Java Learning Roadmap
        </h1>
        <p style={{
          maxWidth: "820px",
          margin: "1rem auto 0",
          color: "rgba(255, 255, 255, 0.95)",
          fontSize: "1.05rem",
          lineHeight: "1.6"
        }}>
          A focused, assessment-aligned resource guide designed to help you master Java,
          Object-Oriented Programming, GUIs, Databases, and Testing efficiently.
        </p>
      </header>

      <main>
        {/* Section 1 */}
        <section className="roadmap-section" style={{ marginBottom: "3.5rem" }}>
          <h2 style={{
            fontSize: "1.7rem",
            borderLeft: "5px solid var(--accent-primary)",
            paddingLeft: "1rem",
            marginBottom: "1.8rem",
            color: "var(--text-primary)"
          }}>
            1. Java Fundamentals (Weeks 1–2)
          </h2>

          <div 
            className="card roadmap-card" 
            style={{
              marginBottom: "1.5rem",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              cursor: "default"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 0 0 1px var(--accent-primary)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <h3 style={{
              marginTop: 0,
              color: "var(--text-primary)",
              fontSize: "1.3rem"
            }}>
              Beginner-Friendly Java Introduction
            </h3>
            <p style={{
              margin: "0.6rem 0",
              color: "var(--text-secondary)",
              lineHeight: "1.7"
            }}>
              Learn Java syntax, variables, operators, control flow, and basic program structure
              with a beginner-friendly explanation style.
            </p>
            <p style={{ margin: "0.8rem 0" }}>
              <strong style={{ color: "var(--text-primary)" }}>Resource:</strong>{" "}
              <a 
                href="https://www.youtube.com/watch?v=hoqLi6RmSMs" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: "var(--accent-primary)",
                  textDecoration: "none",
                  fontWeight: 500
                }}
                onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
                onMouseLeave={(e) => e.target.style.textDecoration = "none"}
              >
                Watch on YouTube
              </a>
            </p>
            <div style={{ marginTop: "1rem" }}>
              <span className="roadmap-tag">Syntax</span>
              <span className="roadmap-tag">Variables</span>
              <span className="roadmap-tag">Loops</span>
              <span className="roadmap-tag">Conditionals</span>
            </div>
          </div>

          <div 
            className="card roadmap-card" 
            style={{
              marginBottom: "1.5rem",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              cursor: "default"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 0 0 1px var(--accent-primary)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <h3 style={{
              marginTop: 0,
              color: "var(--text-primary)",
              fontSize: "1.3rem"
            }}>
              W3Schools – Java Tutorial
            </h3>
            <p style={{
              margin: "0.6rem 0",
              color: "var(--text-secondary)",
              lineHeight: "1.7"
            }}>
              Reinforce core Java concepts with concise explanations, runnable examples,
              and practice exercises ideal for coursework and revision.
            </p>
            <p style={{ margin: "0.8rem 0" }}>
              <strong style={{ color: "var(--text-primary)" }}>Resource:</strong>{" "}
              <a 
                href="https://www.w3schools.com/java/default.asp" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: "var(--accent-primary)",
                  textDecoration: "none",
                  fontWeight: 500
                }}
                onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
                onMouseLeave={(e) => e.target.style.textDecoration = "none"}
              >
                Visit W3Schools
              </a>
            </p>
            <div style={{ marginTop: "1rem" }}>
              <span className="roadmap-tag">Practice</span>
              <span className="roadmap-tag">Exercises</span>
              <span className="roadmap-tag">Reference</span>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="roadmap-section" style={{ marginBottom: "3.5rem" }}>
          <h2 style={{
            fontSize: "1.7rem",
            borderLeft: "5px solid var(--accent-primary)",
            paddingLeft: "1rem",
            marginBottom: "1.8rem",
            color: "var(--text-primary)"
          }}>
            2. Object-Oriented Programming Mastery (Weeks 2–3)
          </h2>

          <div 
            className="card roadmap-card" 
            style={{
              marginBottom: "1.5rem",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              cursor: "default"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 0 0 1px var(--accent-primary)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <h3 style={{
              marginTop: 0,
              color: "var(--text-primary)",
              fontSize: "1.3rem"
            }}>
              Neso Academy – OOP in Java
            </h3>
            <p style={{
              margin: "0.6rem 0",
              color: "var(--text-secondary)",
              lineHeight: "1.7"
            }}>
              A deep-dive series covering classes, objects, methods, constructors,
              inheritance, polymorphism, and UML-to-code relationships.
            </p>
            <p style={{ margin: "0.8rem 0" }}>
              <strong style={{ color: "var(--text-primary)" }}>Resource:</strong>{" "}
              <a 
                href="https://www.youtube.com/watch?v=W-D71ZeMixQ&list=PLBlnK6fEyqRiwWLbSXKFtdGV8OVqr9dZr" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: "var(--accent-primary)",
                  textDecoration: "none",
                  fontWeight: 500
                }}
                onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
                onMouseLeave={(e) => e.target.style.textDecoration = "none"}
              >
                Watch the Playlist
              </a>
            </p>
            <div style={{ marginTop: "1rem" }}>
              <span className="roadmap-tag">OOP</span>
              <span className="roadmap-tag">Classes</span>
              <span className="roadmap-tag">UML</span>
              <span className="roadmap-tag">Design</span>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="roadmap-section" style={{ marginBottom: "3.5rem" }}>
          <h2 style={{
            fontSize: "1.7rem",
            borderLeft: "5px solid var(--accent-primary)",
            paddingLeft: "1rem",
            marginBottom: "1.8rem",
            color: "var(--text-primary)"
          }}>
            3. Problem Solving & Critical Thinking
          </h2>

          <div 
            className="card roadmap-card" 
            style={{
              marginBottom: "1.5rem",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              cursor: "default"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 0 0 1px var(--accent-primary)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <h3 style={{
              marginTop: 0,
              color: "var(--text-primary)",
              fontSize: "1.3rem"
            }}>
              Java Problem-Solving Exercises
            </h3>
            <p style={{
              margin: "0.6rem 0",
              color: "var(--text-secondary)",
              lineHeight: "1.7"
            }}>
              Strengthen logical reasoning, algorithmic thinking, and problem-to-code
              translation – essential for assessments and real-world development.
            </p>
            <p style={{ margin: "0.8rem 0" }}>
              <strong style={{ color: "var(--text-primary)" }}>Resource:</strong>{" "}
              <a 
                href="https://www.youtube.com/watch?v=1T1KYNM9TTk&list=PLvQSG8B7sh6lJEXbVQMpQUX39NHtry0hi" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: "var(--accent-primary)",
                  textDecoration: "none",
                  fontWeight: 500
                }}
                onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
                onMouseLeave={(e) => e.target.style.textDecoration = "none"}
              >
                Watch Exercises Playlist
              </a>
            </p>
            <div style={{ marginTop: "1rem" }}>
              <span className="roadmap-tag">Algorithms</span>
              <span className="roadmap-tag">Logic</span>
              <span className="roadmap-tag">Problem Solving</span>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="roadmap-section" style={{ marginBottom: "3.5rem" }}>
          <h2 style={{
            fontSize: "1.7rem",
            borderLeft: "5px solid var(--accent-primary)",
            paddingLeft: "1rem",
            marginBottom: "1.8rem",
            color: "var(--text-primary)"
          }}>
            4. Arrays, ArrayLists & GUI Development (Weeks 4–5)
          </h2>

          <div 
            className="card roadmap-card" 
            style={{
              marginBottom: "1.5rem",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              cursor: "default"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 0 0 1px var(--accent-primary)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <h3 style={{
              marginTop: 0,
              color: "var(--text-primary)",
              fontSize: "1.3rem"
            }}>
              Collections & GUI Design
            </h3>
            <p style={{
              margin: "0.6rem 0",
              color: "var(--text-secondary)",
              lineHeight: "1.7"
            }}>
              Learn data storage with arrays and ArrayLists and build interactive
              user interfaces using JavaFX and event handling.
            </p>
            <div style={{ marginTop: "1rem" }}>
              <span className="roadmap-tag">Arrays</span>
              <span className="roadmap-tag">ArrayList</span>
              <span className="roadmap-tag">JavaFX</span>
              <span className="roadmap-tag">Event Handling</span>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="roadmap-section" style={{ marginBottom: "3.5rem" }}>
          <h2 style={{
            fontSize: "1.7rem",
            borderLeft: "5px solid var(--accent-primary)",
            paddingLeft: "1rem",
            marginBottom: "1.8rem",
            color: "var(--text-primary)"
          }}>
            5. Databases, Files & Testing (Weeks 6–8)
          </h2>

          <div 
            className="card roadmap-card" 
            style={{
              marginBottom: "1.5rem",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              cursor: "default"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 0 0 1px var(--accent-primary)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <h3 style={{
              marginTop: 0,
              color: "var(--text-primary)",
              fontSize: "1.3rem"
            }}>
              Data Persistence & Quality Assurance
            </h3>
            <p style={{
              margin: "0.6rem 0",
              color: "var(--text-secondary)",
              lineHeight: "1.7"
            }}>
              Covers file handling, JDBC database connectivity, exception handling,
              testing strategies, and technical documentation.
            </p>
            <p style={{ margin: "0.8rem 0" }}>
              <strong style={{ color: "var(--text-primary)" }}>Resource:</strong>{" "}
              <a 
                href="https://www.w3schools.com/java/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: "var(--accent-primary)",
                  textDecoration: "none",
                  fontWeight: 500
                }}
                onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
                onMouseLeave={(e) => e.target.style.textDecoration = "none"}
              >
                W3Schools – Advanced Java Topics
              </a>
            </p>
            <div style={{ marginTop: "1rem" }}>
              <span className="roadmap-tag">JDBC</span>
              <span className="roadmap-tag">Files</span>
              <span className="roadmap-tag">Testing</span>
              <span className="roadmap-tag">Documentation</span>
            </div>
          </div>
        </section>

        {/* Highlight Box */}
        <div 
          className="roadmap-highlight"
          style={{
            background: "linear-gradient(135deg, var(--bg-secondary), var(--bg-card))",
            border: "1px solid var(--accent-secondary)",
            borderLeft: "6px solid var(--accent-secondary)",
            padding: "1.6rem",
            borderRadius: "14px",
            marginTop: "3rem"
          }}
        >
          <strong style={{
            color: "var(--accent-secondary)",
            fontSize: "1.1rem"
          }}>
            Efficiency Principle:
          </strong>
          <p style={{
            margin: "0.5rem 0 0 0",
            color: "var(--text-secondary)",
            lineHeight: "1.7"
          }}>
            Every concept should immediately strengthen Project 1 or assessment performance.
            If it doesn't, deprioritise it.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer 
        className="roadmap-footer"
        style={{
          borderTop: "1px solid var(--border-color)",
          marginTop: "4rem",
          paddingTop: "2rem",
          paddingBottom: "2rem",
          textAlign: "center"
        }}
      >
        <p style={{
          margin: "0.3rem 0",
          fontSize: "0.9rem",
          color: "var(--text-secondary)"
        }}>
          ITJVA – Introduction to Java
        </p>
        <p style={{
          margin: "0.3rem 0",
          fontSize: "0.9rem",
          color: "var(--text-secondary)"
        }}>
          Accelerated learning roadmap
        </p>
      </footer>
    </div>
  );
}