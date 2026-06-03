import { useEffect } from "react";
import OfflineBanner from "./components/OfflineBanner";
import AppRouter from "./routes/AppRouter";
import ScrollToggleButton from "./components/ScrollToggleButton";
import AssessmentStorage from "./utils/assessmentStorage.js";

export default function App() {
  // Check and validate app version on mount
  // If user's stored version doesn't match current app version,
  // their cached data is cleared to avoid showing stale content
  useEffect(() => {
    AssessmentStorage.initializeVersion();
  }, []);

  return (
    <>
      <OfflineBanner />
      <AppRouter />
      <ScrollToggleButton />
    </>
  );
}
