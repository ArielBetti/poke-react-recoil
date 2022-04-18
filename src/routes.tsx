import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import { Home, Pokemon } from "./pages";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/pokemon" element={<Pokemon />}>
          <Route path=":pokemon" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
