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
  
  // Include all question types in printable version
  const printableQuestions = allQuestions.filter(q => 
    q.type === "open-ended" || q.type === "multiple-choice" || q.type === "show-answer"
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
    <>
      {/* Print-specific styles for proper page margins */}
      <style>
        {`
          @media print {
            @page {
              margin: 20mm 15mm;
            }
            
            /* Add top padding to all content pages (not cover) */
            .content-page {
              padding-top: 40px !important;
            }
            
            /* Ensure proper page breaks */
            .page-break-after {
              page-break-after: always;
            }
            
            .page-break-before {
              page-break-before: always;
            }
          }
        `}
      </style>

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
        <div 
          className="page-break-after"
          style={{
            padding: "40px"
          }}
        >
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
                  const sectionQuestions = sections.length > 0
                    ? printableQuestions.filter(q => q.sectionId === section.id)
                    : printableQuestions;
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
                    Grand Total
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
                    fontSize: "11pt"
                  }}>
                    {totalMarks}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer Information */}
          <div style={{
            marginTop: "40px",
            fontSize: "9pt",
            color: "var(--text-secondary)"
          }}>
            <p style={{ marginBottom: "10px" }}>
              <strong>Prepared by:</strong> {examBy}
            </p>
            <p style={{ marginBottom: "10px" }}>
              <strong>Date:</strong> {currentDate}
            </p>
            <p style={{ marginTop: "20px", fontStyle: "italic" }}>
              This paper consists of {printableQuestions.length} questions.
            </p>
          </div>
        </div>

        {/* ============================================================
            INSTRUCTIONS PAGE
            ============================================================ */}
        <div 
          className="content-page page-break-after"
          style={{
            padding: "40px"
          }}
        >
          <h2 style={{
            fontSize: "14pt",
            fontWeight: "bold",
            marginBottom: "20px",
            textAlign: "center",
            letterSpacing: "1px"
          }}>
            INSTRUCTIONS AND INFORMATION
          </h2>

          <ol style={{
            fontSize: "11pt",
            lineHeight: "1.8",
            paddingLeft: "20px"
          }}>
            <li style={{ marginBottom: "12px" }}>
              Answer <strong>ALL</strong> the questions.
            </li>
            <li style={{ marginBottom: "12px" }}>
              Read the questions carefully before answering.
            </li>
            <li style={{ marginBottom: "12px" }}>
              Number your answers exactly as the questions are numbered.
            </li>
            <li style={{ marginBottom: "12px" }}>
              Write neatly and legibly.
            </li>
            <li style={{ marginBottom: "12px" }}>
              Show <strong>ALL</strong> working where applicable. Answers without working will receive limited credit.
            </li>
            <li style={{ marginBottom: "12px" }}>
              You may use a non-programmable calculator.
            </li>
            <li style={{ marginBottom: "12px" }}>
              Round off your final answers to <strong>TWO</strong> decimal places where applicable.
            </li>
            <li style={{ marginBottom: "12px" }}>
              Write the question number clearly in the margin before each answer.
            </li>
            <li style={{ marginBottom: "12px" }}>
              This question paper consists of <strong>{printableQuestions.length} questions</strong> totaling <strong>{totalMarks} marks</strong>.
            </li>
            <li style={{ marginBottom: "12px" }}>
              The time allowed for this assessment is <strong>{timeLimit} minutes</strong>.
            </li>
          </ol>

          <div style={{
            marginTop: "40px",
            padding: "20px",
            border: "2px solid var(--text-primary)",
            background: "var(--bg-secondary)"
          }}>
            <p style={{
              fontSize: "11pt",
              fontWeight: "bold",
              marginBottom: "10px"
            }}>
              IMPORTANT NOTE:
            </p>
            <p style={{
              fontSize: "10pt",
              lineHeight: "1.6"
            }}>
              Ensure that all your answers are written clearly in the spaces provided or on additional answer sheets if needed. 
              Label all diagrams, graphs, and tables appropriately. Use the correct terminology and show sufficient detail 
              in your explanations to earn full marks.
            </p>
          </div>
        </div>

        {/* ============================================================
            QUESTIONS SECTION
            ============================================================ */}
        {finalSections.map((section, sectionIdx) => {
          // Get questions for this section
          const sectionQuestions = sections.length > 0
            ? printableQuestions.filter(q => q.sectionId === section.id)
            : printableQuestions;

          return (
            <div 
              key={section.id}
              className="content-page"
              style={{
                padding: "40px"
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
                  {section.title.toUpperCase()}
                </h2>
                {section.description && (
                  <p style={{
                    fontSize: "10pt",
                    color: "var(--text-secondary)",
                    marginBottom: "8px"
                  }}>
                    {section.description}
                  </p>
                )}
                {section.instructions && (
                  <p style={{
                    fontSize: "10pt",
                    fontStyle: "italic",
                    color: "var(--text-secondary)"
                  }}>
                    {section.instructions}
                  </p>
                )}
              </div>

              {/* Questions in this section */}
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
                      {question.type === "show-answer" 
                        ? "[Reference - No marks]" 
                        : `[${question.points || 1} mark${(question.points || 1) !== 1 ? 's' : ''}]`}
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
                        <img
                          src={question.image.src}
                          alt={question.image.alt}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "400px",
                            height: "auto",
                            objectFit: "contain"
                          }}
                          onError={(e) => {
                            // Fallback if image fails to load
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                          }}
                        />
                        <div style={{
                          fontSize: "9pt",
                          color: "var(--text-secondary)",
                          fontStyle: "italic",
                          display: "none"
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
                  ) : question.type === "show-answer" ? (
                    <div style={{
                      marginTop: "15px",
                      padding: "15px",
                      border: "2px solid var(--border-color)",
                      borderRadius: "4px",
                      background: "rgba(118, 209, 61, 0.05)"
                    }}>
                      <div style={{
                        fontSize: "9pt",
                        color: "var(--text-secondary)",
                        fontStyle: "italic",
                        marginBottom: "10px",
                        fontWeight: "bold"
                      }}>
                        Reference Answer (For Study):
                      </div>
                      <div style={{
                        fontSize: "11pt",
                        lineHeight: "1.6",
                        color: "var(--text-primary)"
                      }}>
                        {Array.isArray(question.correctAnswers) 
                          ? question.correctAnswers[0] 
                          : question.correctAnswers}
                      </div>
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
                        Write your answer below (show all working if applicable):
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

                  {/* Grading Box - only for gradable questions */}
                  {question.type !== "show-answer" && (
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
                  )}
                </div>
              ))}
            </div>
          );
        })}

        {/* ============================================================
            END OF ASSESSMENT
            ============================================================ */}
        <div 
          className="content-page page-break-before"
          style={{
            padding: "40px",
            textAlign: "center"
          }}
        >
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
    </>
  );
}