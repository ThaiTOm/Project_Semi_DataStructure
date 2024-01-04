import logo from "./logo.svg";
import "./App.css";
import AllRoute from "./components/AllRoute";
import ScrollToTopButton from "./components/buttonScroll";

function App() {
  return (
    <>
      <div>
        <ScrollToTopButton />

        <AllRoute />
      </div>
    </>
  );
}
export default App;
