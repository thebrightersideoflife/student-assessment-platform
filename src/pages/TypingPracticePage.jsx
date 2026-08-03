// src/pages/TypingPracticePage.jsx
// Orchestrates the typing practice flow. Two test types:
//   Timed Mode — module → (test-type gate) → duration → difficulty → typing → results
//   Unit Typing — module → (test-type gate) → difficulty → ONE untimed unit → results
// First-timers (no saved duration yet) see the test-type gate right after
// picking a module. Returning users with a saved duration skip straight to
// a timed test as before; Unit Typing is then reachable via the "Unit Test"
// / "Timed Mode" toggle button on the results screen (see handleStartUnitTest
// / handleStartTimedTest in useTypingPracticeFlow.js).
//
// All step/session/goal state and handlers live in useTypingPracticeFlow —
// this file is just "call the hook, switch on step, render the right piece."
//
// ── SettingsModal ──────────────────────────────────────────────────────────
// "Set daily goal", "Change difficulty", and "Change time" all open the same
// SettingsModal (defined in TypingResults / passed down). The modal has four
// sections: goal WPM, goal time (default 15 min), difficulty, duration.
// Each action button opens the modal pre-focused on the relevant tab.

import { useNavigate } from "react-router-dom";
import { STEP, useTypingPracticeFlow } from "../hooks/useTypingPracticeFlow";
import { useTypingAccent } from "../hooks/useTypingAccent";
import Breadcrumb from "../components/Breadcrumb";
import { DurationSelect, TestTypeSelect, UnitModeSelect } from "../components/typing/TypingSetup";
import TypingPracticeHero from "../components/typing/TypingPracticeHero";
import TypingPracticeSettingsModal from "../components/typing/TypingPracticeSettingsModal";
import TypingModuleSelectStep from "../components/typing/TypingModuleSelectStep";
import TypingTest from "../components/typing/TypingTest";
import UnitTypingTest from "../components/typing/UnitTypingTest";
import TypingResults from "../components/typing/TypingResults";
import { getTodayPracticeSeconds } from "../utils/typingStorage";

export default function TypingPracticePage() {
  const navigate  = useNavigate();
  const { accentColor, accentRgb } = useTypingAccent();

  const flow = useTypingPracticeFlow();
  const {
    step, selectedModule, selectedDuration, selectedMode,
    passages, loadingModule, result, resultIsUnit, nextTestIsUnit,
    saveRejectedReason,
    moduleQuery, setModuleQuery, hasMadeFirstAttempt, unitIndexRef,
    dailyGoalWpmByMode, dailyGoalTime, dailyGoalWpm,
    settingsModal, setSettingsModal,
    availableModules, filteredModules,
    handleModuleSelect, handleDurationSelect, handleTestTypeSelect,
    handleUnitModeSelect, handleFinish, handleUnitFinish,
    handleRetry, handleNextTest, handleUnitRetry, handleUnitNextTest,
    handleStartUnitTest, handleStartTimedTest, handleChangeModule, handleSettingsSave, handleRaiseGoal,
  } = flow;

  /* ── Render ───────────────────────────────────────────────── */

  return (
    <div style={{ overflowX: "hidden" }}>

      {/* ════════════════════════════════════════════════════
          HERO  — shown only on module-select step
          ════════════════════════════════════════════════════ */}
      {step === STEP.MODULE && (
        <TypingPracticeHero accentColor={accentColor} accentRgb={accentRgb} />
      )}

      {/* ════════════════════════════════════════════════════
          MODULE SELECT
          ════════════════════════════════════════════════════ */}
      {step === STEP.MODULE && (
        <TypingModuleSelectStep
          loadingModule={loadingModule}
          moduleQuery={moduleQuery}
          onModuleQueryChange={setModuleQuery}
          availableModules={availableModules}
          filteredModules={filteredModules}
          accentColor={accentColor}
          accentRgb={accentRgb}
          hasMadeFirstAttempt={hasMadeFirstAttempt}
          onViewProgressReport={() => navigate("/typing/report")}
          onSelectModule={handleModuleSelect}
        />
      )}

      {/* ════════════════════════════════════════════════════
          TEST TYPE GATE (first-timer flow)
          ════════════════════════════════════════════════════ */}
      {step === STEP.TEST_TYPE && selectedModule && (
        <div className="container">
          <Breadcrumb items={[
            { label: "Home", path: "/" },
            { label: "Typing Practice", onClick: handleChangeModule },
            { label: selectedModule.name },
          ]} />
          <TestTypeSelect
            moduleName={selectedModule.name}
            onSelect={handleTestTypeSelect}
            onBack={handleChangeModule}
          />
        </div>
      )}

      {/* ════════════════════════════════════════════════════
          DURATION GATE
          ════════════════════════════════════════════════════ */}
      {step === STEP.DURATION && selectedModule && (
        <div className="container">
          <Breadcrumb items={[
            { label: "Home", path: "/" },
            { label: "Typing Practice", onClick: handleChangeModule },
            { label: selectedModule.name },
          ]} />
          <DurationSelect
            moduleName={selectedModule.name}
            onSelect={handleDurationSelect}
            onBack={() => flow.setStep(STEP.TEST_TYPE)}
          />
        </div>
      )}

      {/* ════════════════════════════════════════════════════
          UNIT TYPING — DIFFICULTY GATE
          ════════════════════════════════════════════════════ */}
      {step === STEP.UNIT_SETUP && selectedModule && (
        <div className="container">
          <Breadcrumb items={[
            { label: "Home", path: "/" },
            { label: "Typing Practice", onClick: handleChangeModule },
            { label: selectedModule.name },
          ]} />
          <UnitModeSelect
            moduleName={selectedModule.name}
            onSelect={handleUnitModeSelect}
            onBack={() => flow.setStep(STEP.TEST_TYPE)}
          />
        </div>
      )}

      {/* ════════════════════════════════════════════════════
          UNIT TYPING TEST — untimed, whole unit typed together
          ════════════════════════════════════════════════════ */}
      {step === STEP.UNIT_TYPING && selectedModule && passages.length > 0 && (
        <div className="container">
          <Breadcrumb items={[
            { label: "Home", path: "/" },
            { label: "Typing Practice", onClick: handleChangeModule },
            { label: selectedModule.name },
          ]} />

          <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "24px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: accentColor }}>
              {selectedModule.name}
            </span>
            <span style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
              Unit Typing · {selectedMode}
            </span>
          </div>

          <UnitTypingTest
            key={`unit-${selectedModule.id}-${selectedMode}-${passages[unitIndexRef.current % passages.length]?.id}`}
            passage={passages[unitIndexRef.current % passages.length]}
            onFinish={handleUnitFinish}
            onFirstAttempt={() => flow.setHasMadeFirstAttempt(true)}
          />
        </div>
      )}

      {/* ════════════════════════════════════════════════════
          TYPING TEST
          ════════════════════════════════════════════════════ */}
      {step === STEP.TYPING && selectedModule && selectedDuration && (
        <div className="container">
          <Breadcrumb items={[
            { label: "Home", path: "/" },
            { label: "Typing Practice", onClick: handleChangeModule },
            { label: selectedModule.name },
          ]} />

          <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "24px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: accentColor }}>
              {selectedModule.name}
            </span>
            <span style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
              {passages.length} passages · {selectedDuration.label} · {selectedMode}
            </span>
          </div>

          <TypingTest
            key={`${selectedModule.id}-${selectedDuration.seconds}-${selectedMode}-${passages[0]?.id}`}
            passages={passages}
            duration={selectedDuration}
            onFinish={handleFinish}
            onFirstAttempt={() => flow.setHasMadeFirstAttempt(true)}
          />
        </div>
      )}

      {/* ════════════════════════════════════════════════════
          RESULTS
          ════════════════════════════════════════════════════ */}
      {step === STEP.RESULTS && selectedModule && result && (resultIsUnit || selectedDuration) && (
        <div className="container">
          <Breadcrumb items={[
            { label: "Home", path: "/" },
            { label: "Typing Practice", onClick: handleChangeModule },
            { label: selectedModule.name },
          ]} />
          <TypingResults
            result={result}
            saveRejectedReason={saveRejectedReason}
            moduleId={selectedModule.id}
            moduleName={selectedModule.name}
            durationLabel={resultIsUnit ? "Unit test" : selectedDuration.label}
            mode={selectedMode}
            dailyGoalWpm={dailyGoalWpm}
            dailyGoalTime={dailyGoalTime}
            isUnitMode={resultIsUnit}
            nextIsUnit={nextTestIsUnit}
            onOpenSettings={(tab) => setSettingsModal(tab)}
            onRaiseGoal={handleRaiseGoal}
            onTypingReport={() => navigate("/typing/report", {
              state: {
                restoreResults: {
                  result, selectedModule, selectedDuration, selectedMode, isUnitMode: resultIsUnit,
                },
              },
            })}
            onGoToModule={() => navigate(`/module/${selectedModule.id}`)}
            onRetry={resultIsUnit ? handleUnitRetry : handleRetry}
            onNextTest={nextTestIsUnit ? handleUnitNextTest : handleNextTest}
            // Toggle button — flips between the two. handleStartUnitTest
            // resets to the next unit in the current pool; handleStartTimedTest
            // resumes (or seeds, if never set up) a timed test. Which one
            // renders/fires is driven by nextIsUnit above.
            onUnitTest={handleStartUnitTest}
            onTimedTest={handleStartTimedTest}
            onChangeModule={handleChangeModule}
          />
        </div>
      )}

      {/* ════════════════════════════════════════════════════
          SETTINGS MODAL (shared)
          ════════════════════════════════════════════════════ */}
      {settingsModal && (
        <TypingPracticeSettingsModal
          initialTab={settingsModal}
          goalWpmByMode={dailyGoalWpmByMode}
          dailyGoalTime={dailyGoalTime}
          selectedDuration={selectedDuration}
          selectedMode={selectedMode}
          onSave={handleSettingsSave}
          onClose={() => setSettingsModal(null)}
        />
      )}

      <style>{`
        @media (max-width: 480px) {
          section { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>
    </div>
  );
}