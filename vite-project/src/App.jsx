import { Routes, Route } from "react-router-dom";

import ArtGenerate from "./pages/ArtGenerate";
import MainPage from "./pages/MainPage";
import MainMenu from "./components/Elems/MainMenu";
import Test from "./pages/Test";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element = {<MainMenu/>}>
          <Route index element={<MainPage />} />
          <Route path="generate" element={<ArtGenerate />} />
          <Route path="test" element={<Test />} />
          <Route path="help" />
          <Route path="settings" />
          <Route path="community" />
        </Route>
        <Route path="auth/login" />
      </Routes>
    </>
  );
};

export default App;
