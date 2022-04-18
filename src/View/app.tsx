import { ReactElement, FC, useMemo, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { Body } from "../atoms";
import NavBar from "../components/NavBar";
import { useRecoilState } from "recoil";
import { atomDarkTheme } from "../state/atoms";
import { createTheme } from "@mui/material/styles";

// import { Container } from './styles';

interface Props {
  children: ReactElement;
}

const View: FC<Props> = ({ children }) => {
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
      <Body>{children}</Body>
    </ThemeProvider>
  );
};

export default View;
