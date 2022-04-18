import { RefreshOutlined } from "@mui/icons-material";
import {
  Button,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Theme } from "@mui/material/styles/experimental_extendTheme";
import { FC, ReactElement, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValueLoadable,
} from "recoil";
import { useTheme } from "styled-components";
import Loader from "../../components/Loader";
import { atomPokemon } from "../../state/atoms";
import { getAllSeasonOnePokemons } from "../../state/selectors";

const Pokemon: FC<any> = (): ReactElement => {
  const { pokemon } = useParams();
  const navigate = useNavigate();
  const theme: Partial<Theme> = useTheme();

  const [selectedPokemon, setSelectedPokemon] = useRecoilState(atomPokemon);

  const loadablePokemon = useRecoilValueLoadable(
    getAllSeasonOnePokemons(`${pokemon}`)
  );
  const retryLoadablePokemon = useRecoilRefresher_UNSTABLE(
    getAllSeasonOnePokemons(`${pokemon}`)
  );

  useEffect(() => {
    if (loadablePokemon.state === "hasValue") {
      setSelectedPokemon(loadablePokemon.contents);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadablePokemon.state]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (loadablePokemon.state === "loading") return <Loader />;

  if (loadablePokemon.state === "hasError")
    return (
      <Container>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          spacing={3}
          paddingY={3}
        >
          <Typography variant="h5" color={`${theme.palette?.text.primary}`}>
            Ocorreu um erro :/
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={() => retryLoadablePokemon()}
            startIcon={<RefreshOutlined />}
          >
            Tentar novamente
          </Button>
        </Stack>
      </Container>
    );

  return (
    <Container>
      <Stack display="block" paddingTop={3}>
        <Button onClick={() => navigate("/")} variant="outlined">
          Voltar
        </Button>
      </Stack>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        flexWrap="wrap"
      >
        <Typography variant="h3" color={`${theme.palette?.text.primary}`}>
          {selectedPokemon?.name}
        </Typography>
        <Stack marginY={3}>
          <img
            width="300px"
            src={`https://cdn.traction.one/pokedex/pokemon/${selectedPokemon?.id}.png`}
            alt=""
          />
        </Stack>
        <TableContainer component={Paper}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            marginY={1}
          >
            <Typography variant="h5">Status</Typography>
          </Stack>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Atributo</TableCell>
                <TableCell>Base</TableCell>
                <TableCell>Ev</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedPokemon?.stats?.map((item: any) => (
                <TableRow key={item.name}>
                  <TableCell>{item?.stat?.name}</TableCell>
                  <TableCell>{item?.base_stat}</TableCell>
                  <TableCell>{item?.effort}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Container>
  );
};

export default Pokemon;
