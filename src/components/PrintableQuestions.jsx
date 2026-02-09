export default function PrintableQuestions({ 
  moduleId, 
  moduleName,
  weekId,
  questions,
  examData = null
}) {
  function handlePrint() {
    window.print();
  }

  const currentDate = new Date().toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Support both exam structure and simple question array
  const sections = examData?.sections || [];
  const allQuestions = examData?.questions || questions || [];
  
  // Filter printable questions (exclude show-answer type)
  const printableQuestions = allQuestions.filter(q => 
    q.type === "open-ended" || q.type === "multiple-choice"
  );

  const totalMarks = examData?.totalMarks || printableQuestions.reduce((sum, q) => sum + (q.points || 1), 0);
  const timeLimit = examData?.timeLimit || 120; // minutes
  const examBy = examData?.examBy || "Course Instructor";

  // If no sections, create a default section with all questions
  const finalSections = sections.length > 0 ? sections : [
    {
      id: "default",
      title: `Week ${weekId} Questions`,
      description: "",
      instructions: "Answer all questions. Show all working where applicable."
    }
  ];

  return (
    <div 
      id="printable-questions"
      style={{
        background: "var(--bg-card)",
        padding: "0",
        maxWidth: "210mm", // A4 width
        margin: "0 auto",
        fontFamily: "'Times New Roman', serif",
        fontSize: "12pt",
        lineHeight: "1.5",
        color: "var(--text-primary)"
      }}
    >
      {/* ============================================================
          EXAM COVER PAGE - IEB STYLE
          ============================================================ */}
      <div style={{
        padding: "40px",
        pageBreakAfter: "always"
      }}>
        {/* Copyright Notice */}
        <div style={{
          fontSize: "9pt",
          marginBottom: "20px",
          color: "var(--text-secondary)"
        }}>
          Student Assessment Platform © {new Date().getFullYear()}
          <span style={{ float: "right", fontWeight: "bold" }}>PLEASE TURN OVER</span>
        </div>

        {/* Header Box */}
        <div style={{
          border: "2px solid var(--text-primary)",
          padding: "15px",
          marginBottom: "30px",
          textAlign: "center"
        }}>
          <h1 style={{
            fontSize: "16pt",
            fontWeight: "bold",
            marginBottom: "10px",
            letterSpacing: "1px"
          }}>
            WEEKLY ASSESSMENTS AND EXAMINATION
          </h1>
          <h2 style={{
            fontSize: "14pt",
            marginBottom: "5px"
          }}>
            {new Date().getFullYear()}
          </h2>
          <h2 style={{
            fontSize: "16pt",
            fontWeight: "bold",
            marginTop: "15px"
          }}>
            {moduleId.toUpperCase()} - {moduleName.toUpperCase()}
          </h2>
          {examData?.title && (
            <h3 style={{
              fontSize: "12pt",
              marginTop: "10px",
              fontWeight: "normal"
            }}>
              {examData.title}
            </h3>
          )}
        </div>

        {/* Assessment Details Box */}
        <div style={{
          border: "2px solid var(--text-primary)",
          padding: "20px",
          marginBottom: "30px"
        }}>
          <div style={{
            fontSize: "11pt",
            fontWeight: "bold",
            marginBottom: "15px",
            textAlign: "center",
            letterSpacing: "2px"
          }}>
            STUDENT NUMBER
          </div>
          <div style={{
            width: "100%",
            height: "40px",
            border: "2px solid var(--border-color)",
            marginBottom: "20px"
          }}></div>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            fontSize: "11pt"
          }}>
            <div>
              <strong>Time:</strong> {timeLimit} minutes
            </div>
            <div>
              <strong>Total Marks:</strong> {totalMarks}
            </div>
          </div>
        </div>

        {/* Mark Summary Table */}
        <div style={{
          marginBottom: "30px"
        }}>
          <div style={{
            fontSize: "11pt",
            fontWeight: "bold",
            marginBottom: "10px"
          }}>
            MARK SUMMARY & COMMENTARY (For Educators/Moderators):
          </div>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "2px solid var(--text-primary)"
          }}>
            <thead>
              <tr style={{
                backgroundColor: "var(--bg-secondary)",
                borderBottom: "2px solid var(--text-primary)"
              }}>
                <th style={{
                  border: "1px solid var(--border-color)",
                  padding: "8px",
                  textAlign: "left",
                  fontSize: "10pt"
                }}>
                  Section
                </th>
                <th style={{
                  border: "1px solid var(--border-color)",
                  padding: "8px",
                  textAlign: "center",
                  fontSize: "10pt",
                  width: "100px"
                }}>
                  Mark (E/M)
                </th>
                <th style={{
                  border: "1px solid var(--border-color)",
                  padding: "8px",
                  textAlign: "center",
                  fontSize: "10pt",
                  width: "100px"
                }}>
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {finalSections.map((section, idx) => {
                // FIXED: Correctly get section questions
                const sectionQuestions = sections.length > 0
                  ? printableQuestions.filter(q => q.sectionId === section.id)
                  : printableQuestions; // Use all questions for default section
                const sectionMarks = sectionQuestions.reduce((sum, q) => sum + (q.points || 1), 0);
                return (
                  <tr key={section.id}>
                    <td style={{
                      border: "1px solid var(--border-color)",
                      padding: "8px",
                      fontSize: "10pt"
                    }}>
                      {section.title}
                    </td>
                    <td style={{
                      border: "1px solid var(--border-color)",
                      padding: "8px",
                      textAlign: "center"
                    }}></td>
                    <td style={{
                      border: "1px solid var(--border-color)",
                      padding: "8px",
                      textAlign: "center",
                      fontWeight: "bold"
                    }}>
                      {sectionMarks}
                    </td>
                  </tr>
                );
              })}
              <tr style={{
                borderTop: "2px solid var(--text-primary)",
                fontWeight: "bold"
              }}>
                <td style={{
                  border: "1px solid var(--border-color)",
                  padding: "8px",
                  fontSize: "10pt"
                }}>
                  TOTAL
                </td>
                <td style={{
                  border: "1px solid var(--border-color)",
                  padding: "8px",
                  textAlign: "center"
                }}></td>
                <td style={{
                  border: "1px solid var(--border-color)",
                  padding: "8px",
                  textAlign: "center"
                }}>
                  {totalMarks}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Instructions Section */}
        <div style={{
          border: "2px solid var(--text-primary)",
          padding: "20px",
          marginBottom: "30px",
          background: "var(--bg-secondary)"
        }}>
          <div style={{
            fontSize: "11pt",
            fontWeight: "bold",
            marginBottom: "15px",
            letterSpacing: "1px"
          }}>
            INSTRUCTIONS AND INFORMATION
          </div>
          <ol style={{
            fontSize: "10pt",
            lineHeight: "1.8",
            paddingLeft: "25px"
          }}>
            <li>This question paper consists of {printableQuestions.length} questions.</li>
            <li>Answer ALL the questions.</li>
            <li>Number your answers exactly as the questions are numbered.</li>
            <li>You may use a non-programmable calculator.</li>
            <li>Show ALL working. Answers without working will receive limited credit.</li>
            <li>Round off final answers to TWO decimal places unless stated otherwise.</li>
            <li>Write neatly and legibly.</li>
          </ol>
        </div>

        {/* Created By */}
        <div style={{
          fontSize: "10pt",
          textAlign: "center",
          color: "var(--text-secondary)",
          marginTop: "40px"
        }}>
          <div>Prepared by: <strong>{examBy}</strong></div>
          <div>Date: <strong>{currentDate}</strong></div>
        </div>
      </div>

      {/* ============================================================
          QUESTION PAGES
          ============================================================ */}
      {finalSections.map((section, sIdx) => {
        // FIXED: Correctly get questions for each section
        const sectionQuestions = sections.length > 0
          ? printableQuestions.filter(q => q.sectionId === section.id)
          : printableQuestions; // Use all questions for default section

        if (sectionQuestions.length === 0) return null;

        return (
          <div 
            key={section.id}
            style={{
              padding: "40px",
              paddingTop: sIdx > 0 ? "60px" : "40px",
              pageBreakBefore: sIdx > 0 ? "always" : "auto"
            }}
          >
            {/* Section Header */}
            <div style={{
              marginBottom: "30px",
              paddingBottom: "15px",
              borderBottom: "3px solid var(--text-primary)"
            }}>
              <h2 style={{
                fontSize: "14pt",
                fontWeight: "bold",
                marginBottom: "10px",
                letterSpacing: "1px"
              }}>
                {section.title}
              </h2>
              {section.description && (
                <div style={{
                  fontSize: "10pt",
                  fontStyle: "italic",
                  marginBottom: "8px",
                  color: "var(--text-secondary)"
                }}>
                  {section.description}
                </div>
              )}
              {section.instructions && (
                <div style={{
                  fontSize: "10pt",
                  padding: "10px",
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-color)",
                  borderLeft: "4px solid var(--accent-primary)",
                  marginTop: "10px"
                }}>
                  <strong>Instructions:</strong> {section.instructions}
                </div>
              )}
            </div>

            {/* Questions */}
            {sectionQuestions.map((question, qIdx) => (
              <div 
                key={question.id}
                style={{
                  marginBottom: "40px",
                  pageBreakInside: "avoid"
                }}
              >
                {/* Question Header */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "15px",
                  paddingBottom: "8px",
                  borderBottom: "2px solid var(--border-color)"
                }}>
                  <div style={{
                    fontSize: "12pt",
                    fontWeight: "bold",
                    marginRight: "15px"
                  }}>
                    QUESTION {question.questionNumber || (qIdx + 1)}
                  </div>
                  <div style={{
                    marginLeft: "auto",
                    fontSize: "10pt",
                    fontWeight: "bold"
                  }}>
                    [{question.points || 1} mark{(question.points || 1) !== 1 ? 's' : ''}]
                  </div>
                </div>

                {/* Question Image (if exists) */}
                {question.image && (
                  <div style={{
                    marginBottom: "15px",
                    textAlign: "center",
                    padding: "10px",
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border-color)"
                  }}>
                    <div style={{
                      fontSize: "9pt",
                      fontWeight: "bold",
                      marginBottom: "8px",
                      color: "var(--text-secondary)"
                    }}>
                      Figure {question.questionNumber || (qIdx + 1)}
                    </div>
                    <div style={{
                      minHeight: "150px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "white",
                      padding: "15px"
                    }}>
                      <div style={{
                        fontSize: "9pt",
                        color: "var(--text-secondary)",
                        fontStyle: "italic"
                      }}>
                        [Image: {question.image.alt || question.image.caption}]
                      </div>
                    </div>
                    {question.image.caption && (
                      <div style={{
                        fontSize: "9pt",
                        fontStyle: "italic",
                        marginTop: "8px",
                        color: "var(--text-secondary)"
                      }}>
                        {question.image.caption}
                      </div>
                    )}
                  </div>
                )}

                {/* Question Text */}
                <div style={{
                  fontSize: "11pt",
                  marginBottom: "15px",
                  lineHeight: "1.6"
                }}>
                  {question.text || question.question}
                </div>

                {/* Answer Space */}
                {question.type === "multiple-choice" ? (
                  <div style={{ marginTop: "15px" }}>
                    {question.options?.map((option, optIdx) => (
                      <div 
                        key={optIdx}
                        style={{
                          padding: "12px 15px",
                          marginBottom: "10px",
                          border: "2px solid var(--border-color)",
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "center",
                          background: "var(--bg-secondary)"
                        }}
                      >
                        <div style={{
                          width: "22px",
                          height: "22px",
                          border: "2px solid var(--text-primary)",
                          borderRadius: "50%",
                          marginRight: "15px",
                          flexShrink: 0
                        }} />
                        <span style={{ fontSize: "10pt" }}>
                          {String.fromCharCode(65 + optIdx)}. {option}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{
                    marginTop: "15px",
                    minHeight: "120px",
                    border: "2px solid var(--border-color)",
                    borderRadius: "4px",
                    padding: "15px",
                    background: "var(--bg-secondary)"
                  }}>
                    <div style={{
                      fontSize: "9pt",
                      color: "var(--text-secondary)",
                      fontStyle: "italic",
                      marginBottom: "10px"
                    }}>
                      Write your answer below. Show all working:
                    </div>
                    {[...Array(4)].map((_, i) => (
                      <div 
                        key={i}
                        style={{
                          borderBottom: "1px solid var(--border-color)",
                          marginBottom: "12px",
                          paddingBottom: "10px",
                          minHeight: "20px"
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Grading Box */}
                <div style={{
                  marginTop: "15px",
                  padding: "10px 15px",
                  background: "var(--bg-card)",
                  border: "1px dashed var(--border-color)",
                  borderRadius: "4px",
                  fontSize: "9pt",
                  color: "var(--text-secondary)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <span style={{ fontStyle: "italic" }}>For Examiner Use Only:</span>
                  <div style={{ display: "flex", gap: "20px", fontWeight: "bold" }}>
                    <span>Mark: _______</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}

      {/* ============================================================
          END OF ASSESSMENT
          ============================================================ */}
      <div style={{
        padding: "40px",
        pageBreakBefore: "always",
        textAlign: "center"
      }}>
        <div style={{
          border: "3px solid var(--text-primary)",
          padding: "30px",
          marginTop: "100px"
        }}>
          <h2 style={{
            fontSize: "18pt",
            fontWeight: "bold",
            marginBottom: "20px",
            letterSpacing: "2px"
          }}>
            END OF ASSESSMENT
          </h2>
          <div style={{
            fontSize: "11pt",
            marginTop: "30px",
            color: "var(--text-secondary)"
          }}>
            Total: {totalMarks} marks
          </div>
          <div style={{
            fontSize: "9pt",
            marginTop: "40px",
            fontStyle: "italic",
            color: "var(--text-secondary)"
          }}>
            Student Assessment Platform © {new Date().getFullYear()}
          </div>
        </div>
      </div>

      {/* Print Button (hidden when printing) */}
      <div 
        className="no-print"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          zIndex: 1000
        }}
      >
        <button
          className="button"
          onClick={handlePrint}
          style={{
            padding: "15px 40px",
            fontSize: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            background: "var(--accent-primary)"
          }}
        >
          🖨️ Print Paper
        </button>
      </div>
    </div>
  );
}