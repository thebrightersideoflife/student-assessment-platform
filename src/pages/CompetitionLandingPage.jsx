// src/pages/CompetitionLandingPage.jsx
import { useRef } from "react";
import { STEP, useCompetitionFlow } from "../hooks/useCompetitionFlow";
import { useTypingAccent } from "../hooks/useTypingAccent";
import Breadcrumb from "../components/Breadcrumb";
import CompetitionIntroHero from "../components/typing/CompetitionIntroHero";
import CompetitionTypingTest from "../components/typing/CompetitionTypingTest";
import CompetitionRaceTrackLive from "../components/typing/CompetitionRaceTrackLive";
import CompetitionResults from "../components/typing/CompetitionResults";
import BestChallengeNotice from "../components/typing/BestChallengeNotice";

export default function CompetitionLandingPage() {
  const { accentColor } = useTypingAccent();
  const flow = useCompetitionFlow();
  const {
    step, selectedModule, selectedMode, passage, loadingModule, result,
    unlockState, ghosts, saveRejectedReason, priorBest, pendingChallenge,
    handleStartRace, handleAcceptChallenge, handleFinish, handleRaceAgain, handleChallengeBest, handleChangeModule,
    handleBackToModule,
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
          unlockState={unlockState}
          onRaceAgain={handleRaceAgain}
          onChallengeBest={handleChallengeBest}
          onChangeModule={handleChangeModule}
          onBackToModule={handleBackToModule}
        />
      )}

      {/* Best-challenge notice — rendered on top of whatever STEP is
          currently showing (still STEP.INTRO underneath at this point;
          see handleStartRace/handleRaceAgain in useCompetitionFlow.js).
          Passage + ghosts are already fully prepared by the time this
          appears; accepting just flips the step to reveal the race screen
          sitting ready underneath. No dismiss path by design — see the
          component itself. */}
      {pendingChallenge && (
        <BestChallengeNotice
          onAccept={handleAcceptChallenge}
          isFirstAttempt={pendingChallenge.isFirstAttempt}
        />
      )}
    </div>
  );
}