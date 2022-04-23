import { memo, ReactElement } from "react";
import { RecoilRoot } from "recoil";
import Initialized from "./initialized";

const App = (): ReactElement => (
  <RecoilRoot>
    <Initialized />
  </RecoilRoot>
);

export default memo(App);
