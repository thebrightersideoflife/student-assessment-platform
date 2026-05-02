import OfflineBanner from "./components/OfflineBanner";
import AppRouter from "./routes/AppRouter";
import ScrollToggleButton from "./components/ScrollToggleButton";

export default function App() {

  return (
    <>
      <OfflineBanner />
      <AppRouter />
      <ScrollToggleButton />
    </>
  );
}
