import { useMemo } from "react";
import { Puzzle, Search, Layers } from "lucide-react";

/**
 * GamePrintable.jsx
 *
 * A print-only component that renders a printable version of a study game.
 * Hidden on screen, visible at print time.
 */
export default function GamePrintable({ type, moduleName, moduleId, weekLabel, data }) {
  const generatedDate = new Date().toLocaleDateString("en-ZA", {
    day: "numeric", month: "long", year: "numeric",
  });

  const renderCrossword = () => {
    const { grid, placedWords } = data;
    const { gridNumbers, numberedClues } = (() => {
      const nums = Array(grid.length).fill(null).map(() => Array(grid[0].length).fill(null));
      let currentNum = 1;
      const sortedStarts = [...placedWords].sort((a, b) => {
          if (a.row !== b.row) return a.row - b.row;
          return a.col - b.col;
      });
      const results = sortedStarts.map(pw => {
          let num = nums[pw.row][pw.col];
          if (num === null) {
              num = currentNum++;
              nums[pw.row][pw.col] = num;
          }
          return { ...pw, number: num };
      });
      return { gridNumbers: nums, numberedClues: results };
    })();

    return (
      <div className="printable-game-content">
        <div className="printable-grid-container crossword" style={{ marginBottom: '24px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${grid.length}, 28px)`,
            gap: '0',
            border: '1px solid #000',
            width: 'fit-content',
            margin: '0 auto'
          }}>
            {grid.map((row, rIdx) =>
              row.map((cell, cIdx) => {
                const isBlack = cell === '';
                const number = gridNumbers[rIdx][cIdx];
                return (
                  <div key={`${rIdx}-${cIdx}`} style={{
                    width: '28px', height: '28px',
                    background: isBlack ? '#444' : '#fff',
                    border: '1px solid #000',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {number && (
                      <span style={{
                        position: 'absolute', top: '1px', left: '2px',
                        fontSize: '7px', fontWeight: 700
                      }}>
                        {number}
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="printable-clues-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          <div>
            <h3 style={{ fontSize: '12px', borderBottom: '1.5px solid #2A5CA7', paddingBottom: '3px', marginBottom: '8px', textTransform: 'uppercase' }}>ACROSS</h3>
            {numberedClues.filter(pw => pw.dr === 0).map(pw => (
              <div key={`across-${pw.number}`} style={{ marginBottom: '6px', fontSize: '10px', lineHeight: 1.4 }}>
                <strong>{pw.number}.</strong> {pw.hint}
              </div>
            ))}
          </div>
          <div>
            <h3 style={{ fontSize: '12px', borderBottom: '1.5px solid #2A5CA7', paddingBottom: '3px', marginBottom: '8px', textTransform: 'uppercase' }}>DOWN</h3>
            {numberedClues.filter(pw => pw.dr === 1).map(pw => (
              <div key={`down-${pw.number}`} style={{ marginBottom: '6px', fontSize: '10px', lineHeight: 1.4 }}>
                <strong>{pw.number}.</strong> {pw.hint}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderWordSearch = () => {
    const { grid, placedWords } = data;
    return (
      <div className="printable-game-content">
        <div className="printable-grid-container wordsearch" style={{ marginBottom: '32px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${grid.length}, 28px)`,
            gap: '0',
            border: '1px solid #000',
            width: 'fit-content',
            margin: '0 auto'
          }}>
            {grid.map((row, rIdx) =>
              row.map((cell, cIdx) => (
                <div key={`${rIdx}-${cIdx}`} style={{
                  width: '28px', height: '28px',
                  background: '#fff',
                  border: '1px solid #ddd',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', fontWeight: 700
                }}>
                  {cell}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="printable-word-list">
          <h3 style={{ fontSize: '12px', borderBottom: '1.5px solid #2A5CA7', paddingBottom: '3px', marginBottom: '12px', textTransform: 'uppercase' }}>WORDS TO FIND</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '10px'
          }}>
            {placedWords.map(pw => (
              <div key={pw.id} style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', border: '1px solid #000', borderRadius: '2px' }}></div>
                {pw.displayAnswer}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderMatching = () => {
    const { terms } = data;
    const shuffledDefs = useMemo(() => [...terms].sort(() => Math.random() - 0.5), [terms]);
    const defLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    return (
      <div className="printable-game-content">
        <p style={{ fontSize: '11px', marginBottom: '20px', fontStyle: 'italic', color: '#4A5A75' }}>
          Instructions: Match each term in Column A with its correct definition in Column B by writing the corresponding letter in the space provided.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '50px' }}>
          <div>
            <h3 style={{ fontSize: '12px', borderBottom: '1.5px solid #2A5CA7', paddingBottom: '3px', marginBottom: '12px', textTransform: 'uppercase' }}>COLUMN A: TERMS</h3>
            {terms.map((t, idx) => (
              <div key={t.id} style={{ marginBottom: '14px', display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                <div style={{ borderBottom: '1px solid #000', width: '24px', textAlign: 'center', paddingBottom: '1px', fontSize: '11px' }}>&nbsp;</div>
                <div style={{ fontSize: '11px', fontWeight: 700 }}>{idx + 1}. {t.displayAnswer}</div>
              </div>
            ))}
          </div>
          <div>
            <h3 style={{ fontSize: '12px', borderBottom: '1.5px solid #2A5CA7', paddingBottom: '3px', marginBottom: '12px', textTransform: 'uppercase' }}>COLUMN B: DEFINITIONS</h3>
            {shuffledDefs.map((t, idx) => (
              <div key={t.id} style={{ marginBottom: '14px', display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                <div style={{ fontWeight: 700, fontSize: '11px', width: '18px' }}>{defLetters[idx]}.</div>
                <div style={{ fontSize: '10px', lineHeight: 1.4 }}>{t.hint}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const icon = type === 'crossword' ? <Puzzle size={24} /> :
               type === 'wordsearch' ? <Search size={24} /> :
               <Layers size={24} />;

  const title = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <>
      <style>{`
        .game-printable-root {
          display: none;
        }

        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }

          .game-printable-root {
            display: block !important;
            font-family: 'Times New Roman', Georgia, serif;
            color: #000;
            background: #fff;
            position: absolute;
            top: 0; left: 0; width: 210mm;
            z-index: 9999999;
          }

          /* SURGICAL HIDING: Hide app scaffolding but NOT the printable root hierarchy */
          #root > *:not(:has(.game-printable-root)) {
            display: none !important;
          }

          /* Siblings of printable root and its ancestors */
          *:has(> .game-printable-root) > *:not(.game-printable-root) {
            display: none !important;
          }

          /* Hide specific interactive elements inside the app that might leak through */
          .app-header, footer, nav, .Breadcrumb, .games-header,
          .action-buttons-group, .action-button-mini, .action-button,
          button, .no-print {
            display: none !important;
          }

          body, html {
            background: #fff !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: visible !important;
            height: auto !important;
          }

          .game-printable-root * {
            visibility: visible !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .printable-page {
            width: 210mm;
            height: 297mm;
            padding: 20mm 18mm;
            background: #fff;
            position: relative;
            box-sizing: border-box;
            page-break-after: always;
            overflow: hidden;
          }

          .printable-page:last-child {
            page-break-after: avoid;
          }

          .printable-header-mini {
            border-bottom: 1px solid #D6E0F5;
            padding-bottom: 8px;
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .printable-footer-mini {
            position: absolute;
            bottom: 15mm;
            left: 18mm;
            right: 18mm;
            border-top: 1px solid #D6E0F5;
            padding-top: 10px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }

          .page-counter::after {
            content: "Page " counter(page) " of 2";
          }
        }
      `}</style>

      <div className="game-printable-root" style={{ counterReset: 'page' }}>
        {/* Page 1: Cover Page */}
        <div className="printable-page cover-page" style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          alignItems: 'center', textAlign: 'center', padding: '20mm'
        }}>
          <div style={{
            width: '70px', height: '70px', borderRadius: '20px',
            background: '#F7FAFF', border: '1.5px solid #D6E0F5',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#2A5CA7', marginBottom: '24px'
          }}>
            {type === 'crossword' ? <Puzzle size={36} /> :
             type === 'wordsearch' ? <Search size={36} /> :
             <Layers size={36} />}
          </div>

          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "#2A5CA7", marginBottom: '10px' }}>
            Student Assessment Platform
          </div>

          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#0B0F1A", margin: "0 0 6px", lineHeight: 1.2 }}>
            Offline Study Activity
          </h1>
          <h2 style={{ fontSize: "18px", fontWeight: 500, color: "#4A5A75", margin: "0 0 40px" }}>
            {title}: {moduleName}
          </h2>

          <div style={{
            width: '100%', maxWidth: '550px',
            borderTop: '1.5px solid #D6E0F5', borderBottom: '1.5px solid #D6E0F5',
            padding: '28px 0', margin: '0 auto 48px',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px',
            textAlign: 'left'
          }}>
            <div>
              <div style={{ fontSize: '10px', color: '#6B8CAE', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Module Code</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#0B0F1A' }}>{moduleId}</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#6B8CAE', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Week Selection</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#0B0F1A' }}>{weekLabel}</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#6B8CAE', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Date Generated</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#0B0F1A' }}>{generatedDate}</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#6B8CAE', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Activity Type</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#0B0F1A' }}>{title}</div>
            </div>
          </div>

          <div style={{ width: '100%', maxWidth: '550px', textAlign: 'left' }}>
            <div style={{ fontSize: '10px', color: '#6B8CAE', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>Student Details</div>
            <div style={{ borderBottom: '1px solid #D6E0F5', padding: '14px 0', color: '#9FB3C8', fontSize: '14px' }}>Name: ___________________________________________________________</div>
            <div style={{ borderBottom: '1px solid #D6E0F5', padding: '14px 0', color: '#9FB3C8', fontSize: '14px' }}>Student ID: ______________________________________________________</div>
          </div>

          <div style={{ marginTop: 'auto', textAlign: 'center', paddingTop: '60px' }}>
            <img src="/images/site-qr-code.png" alt="QR" style={{ width: '100px', height: '100px', marginBottom: '10px', opacity: 0.8 }} />
            <div style={{ fontSize: '11px', color: '#6B8CAE', fontWeight: 600 }}>Scan to return to the online platform.</div>
          </div>
        </div>

        {/* Page 2: The Game */}
        <div className="printable-page main-game-page" style={{ counterIncrement: 'page' }}>
           <div className="printable-header-mini">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <div style={{ color: '#2A5CA7' }}>{icon}</div>
                 <span style={{ fontSize: '11px', fontWeight: 700, color: '#0B0F1A' }}>{moduleName}: {title}</span>
              </div>
              <div style={{ fontSize: '9px', color: '#6B8CAE', fontWeight: 600 }}>{weekLabel} • {moduleId}</div>
           </div>

           {type === 'crossword' && renderCrossword()}
           {type === 'wordsearch' && renderWordSearch()}
           {type === 'matching' && renderMatching()}

           <div className="printable-footer-mini">
              <div style={{ fontSize: "8px", color: "#9FB3C8" }}>
                <span>© {new Date().getFullYear()} Student Assessment Platform — </span>
                <span className="page-counter" style={{ fontWeight: 700, color: '#6B8CAE' }}></span>
              </div>
              <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ fontSize: '8px', color: '#2A5CA7', textAlign: 'right', lineHeight: 1.2 }}>
                   <strong>VISIT ONLINE</strong><br/>student-assessment-platform.vercel.app
                </div>
                <img src="/images/site-qr-code.png" alt="QR" style={{ width: '28px', height: '28px' }} />
              </div>
           </div>
        </div>
      </div>
    </>
  );
}
