import { ReactElement, useMemo, useEffect, memo } from "react";
import { ThemeProvider } from "styled-components";
import { Body } from "../atoms";
import NavBar from "../components/NavBar";
import { useRecoilState } from "recoil";
import { atomDarkTheme } from "../state/atoms";
import { createTheme } from "@mui/material/styles";
import AppRouter from "../routes";

const Initialized = (): ReactElement => {
  const [prefersDarkMode, setPrefersDarkMode] = useRecoilState(atomDarkTheme);

  useEffect(() => {
    const isDarker: any = localStorage.getItem("darkMode");
    if (isDarker) {
      setPrefersDarkMode(!!isDarker);
    }
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Body>
        <AppRouter />
      </Body>
    </ThemeProvider>
  );
};

export default memo(Initialized);
