import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

// pages
import { Home } from "./pages";

const AppRouter = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/pokemon" element={<div>Pokemon</div>} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default AppRouter;
