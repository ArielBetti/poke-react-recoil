import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

// pages
import { Home, Pokemon } from "./pages";

const AppRouter = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/pokemon" element={<Pokemon />}>
            <Route path=":pokemon" />
          </Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default AppRouter;
