import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import useShapes from "./hooks/useShapes";
import HeaderMenu from "./components/HeaderMenu";
import Canvas from "./components/Canvas";

const App = () => {
  const { shapes, addShape } = useShapes();

  return (
    <div className="container">
      <HeaderMenu />
      <Routes>
        <Route
          path="/"
          element={<Canvas shapes={shapes} addShape={addShape} />}
        />
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
