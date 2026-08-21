import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "../ScrollReveal";

const VIDEOS = [  
  {
    id: "SoCF4O1FNYk",
    title: "Student Assessment Platform — Latest Features",
  },
  {
    id: "QW6y-F4Pr3Q",
    title: "Student Assessment Platform — Introduction",
  },
  {
    id: "qo7SuzQMi8w",
    title: "Student Assessment Platform — Walkthrough",
  }
];

export default function VideoSection() {
  const [startIndex, setStartIndex] = useState(0);

  // We show 2 videos on desktop, 1 on mobile.
  // Shifting by 1 allows granular viewing of "view more".
  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    // Stop shifting when the last video is the first visible one
    setStartIndex((prev) => Math.min(VIDEOS.length - 1, prev + 1));
  };

  // Determine if we can still go next.
  // On desktop (2 videos), we can go next if startIndex + 2 < VIDEOS.length.
  // But since it's responsive, we might want to just allow shifting until the last video is at the start.
  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex < VIDEOS.length - 1;

  return (
    <ScrollReveal direction="bottom">
      <section style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "56px 40px 72px",
        position: "relative", zIndex: 1,
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
          flexWrap: "wrap",
          gap: "16px"
        }}>
          <h2 style={{
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            fontWeight: 800,
            margin: 0,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em"
          }}>
            Platform <span style={{ color: "var(--accent-primary)" }}>Walkthroughs</span>
          </h2>

          <div style={{ display: "flex", gap: "12px" }}>
             <button
                onClick={handlePrev}
                disabled={!canGoPrev}
                className="button"
                style={{
                  padding: "10px",
                  borderRadius: "50%",
                  minWidth: "44px",
                  height: "44px",
                  justifyContent: "center",
                  opacity: canGoPrev ? 1 : 0.3,
                  cursor: canGoPrev ? "pointer" : "not-allowed"
                }}
                aria-label="Previous videos"
             >
                <ChevronLeft size={22} />
             </button>
             <button
                onClick={handleNext}
                disabled={!canGoNext}
                className="button"
                style={{
                  padding: "10px",
                  borderRadius: "50%",
                  minWidth: "44px",
                  height: "44px",
                  justifyContent: "center",
                  opacity: canGoNext ? 1 : 0.3,
                  cursor: canGoNext ? "pointer" : "not-allowed"
                }}
                aria-label="Next videos"
             >
                <ChevronRight size={22} />
             </button>
          </div>
        </div>

        <div className="video-grid">
           {VIDEOS.slice(startIndex, startIndex + 2).map((video, idx) => (
             <ScrollReveal key={video.id} direction="bottom" delay={idx * 150}>
               <div style={{
                 position: "relative",
                 paddingTop: "56.25%",
                 width: "100%",
                 borderRadius: "16px",
                 overflow: "hidden",
                 boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
                 background: "var(--bg-card)"
               }}>
                 <iframe
                   src={`https://www.youtube.com/embed/${video.id}`}
                   title={video.title}
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                   allowFullScreen
                   style={{
                     position: "absolute",
                     top: 0, left: 0,
                     width: "100%", height: "100%",
                     border: "none",
                   }}
                 />
               </div>
               <div style={{ marginTop: "16px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
                    {video.title}
                  </h3>
               </div>
             </ScrollReveal>
           ))}
        </div>
      </section>
    </ScrollReveal>
  );
}
