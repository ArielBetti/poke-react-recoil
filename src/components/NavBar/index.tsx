import {
  AppBar,
  Stack,
  Toolbar,
  Typography,
  Container,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import { ReactElement, useEffect } from "react";
import logo from "../../assets/images/pokebola.png";
import { Box } from "@mui/material";
import { useRecoilState } from "recoil";
import { atomDarkTheme } from "../../state/atoms";
import { DarkModeOutlined } from "@mui/icons-material";

const NavBar = (): ReactElement => {
  const [darkTheme, setDarkTheme] = useRecoilState<boolean>(atomDarkTheme);

  const handleToggleDarkMode = () => {
    if (!darkTheme) {
      localStorage.setItem("darkMode", `${!darkTheme}`);
    } else {
      localStorage.removeItem("darkMode");
    }
    setDarkTheme(!darkTheme);
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 8 }}>
      <AppBar position="fixed">
        <Toolbar variant="regular">
          <Container>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="center">
                <Stack marginY={1} marginRight={2}>
                  <img
                    src={logo}
                    srcSet={logo}
                    alt="Pokebola"
                    loading="lazy"
                    width={40}
                  />
                </Stack>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                >
                  PokeRecoil
                </Typography>
              </Stack>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      color="default"
                      checked={!!darkTheme}
                      onChange={() => handleToggleDarkMode()}
                      aria-label="login switch"
                    />
                  }
                  label={<DarkModeOutlined />}
                />
              </FormGroup>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
