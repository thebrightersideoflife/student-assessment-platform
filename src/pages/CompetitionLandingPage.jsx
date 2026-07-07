// src/pages/CompetitionLandingPage.jsx
import { useRef } from "react";
import { STEP, useCompetitionFlow } from "../hooks/useCompetitionFlow";
import { useTypingAccent } from "../hooks/useTypingAccent";
import Breadcrumb from "../components/Breadcrumb";
import CompetitionIntroHero from "../components/typing/CompetitionIntroHero";
import CompetitionTypingTest from "../components/typing/CompetitionTypingTest";
import CompetitionRaceTrackLive from "../components/typing/CompetitionRaceTrackLive";
import CompetitionResults from "../components/typing/CompetitionResults";

export default function CompetitionLandingPage() {
  const { accentColor } = useTypingAccent();
  const flow = useCompetitionFlow();
  const {
    step, selectedModule, selectedMode, passage, loadingModule, result,
    unlockState, ghosts, saveRejectedReason, priorBest,
    handleStartRace, handleFinish, handleRaceAgain, handleChangeModule,
  } = flow;

  const onProgressRef = useRef(null);

  if (loadingModule || !selectedModule) {
    return (
      <div className="container">
        <p style={{ color: "var(--text-secondary)", textAlign: "center", padding: "60px 0" }}>
          Loading…
        </p>
      </div>
    );
  }

  return (
    <div className="container">
      <Breadcrumb items={[
        { label: "Home", path: "/" },
        { label: "Typing Practice", onClick: handleChangeModule },
        { label: `${selectedModule.name} · ${selectedMode}` },
      ]} />

      {step === STEP.INTRO && (
        <CompetitionIntroHero
          moduleName={selectedModule.name}
          unlockState={unlockState}
          onStart={handleStartRace}
        />
      )}

      {step === STEP.RACE && passage && (
        <>
          {!unlockState?.unlocked && (
            <div className="card" style={{ padding: "14px 18px", marginBottom: "18px", fontSize: "13px" }}>
              Practice run {(unlockState?.attemptsRecorded ?? 0) + 1} of 3 — ghosts unlock once you've
              completed 3 runs for {selectedModule.name} · {selectedMode}.
            </div>
          )}

          {unlockState?.unlocked && ghosts && (
            <CompetitionRaceTrackLive ghosts={ghosts} onProgressRef={onProgressRef} />
          )}

          <CompetitionTypingTest
            key={`${selectedModule.id}-${selectedMode}-${passage.id}`}
            passage={passage}
            onFinish={handleFinish}
            onProgress={(p) => onProgressRef.current?.(p)}
          />
        </>
      )}

      {step === STEP.RESULTS && result && (
        <CompetitionResults
          result={result}
          ghosts={ghosts}
          saveRejectedReason={saveRejectedReason}
          priorBest={priorBest}
          onRaceAgain={handleRaceAgain}
          onChangeModule={handleChangeModule}
        />
      )}
    </div>
  );
}