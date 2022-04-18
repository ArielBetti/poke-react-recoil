import { FC, ReactElement, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  ListItemAvatar,
  Avatar,
  ListItemText,
  Stack,
  Paper,
  Container,
} from "@mui/material";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { atomPokemonList } from "../../state/atoms";
import { getAllSeasonOnePokemons } from "../../state/selectors";

import * as Atom from "./atoms";
import Loader from "../../components/Loader";

const Home: FC<any> = (): ReactElement => {
  const navigate = useNavigate();

  const [pokemonDefaultList, setPokemonDefaultList] =
    useRecoilState(atomPokemonList);
  const loadablePokemonList = useRecoilValueLoadable(
    getAllSeasonOnePokemons("?limit=151")
  );

  useEffect(() => {
    setPokemonDefaultList(loadablePokemonList.contents?.results);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadablePokemonList.state]);

  if (loadablePokemonList.state === "loading") {
    return <Loader />;
  }

  if (loadablePokemonList.state === "hasError") {
    return <div>error</div>;
  }

  return (
    <Container>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        paddingY={3}
      >
        {pokemonDefaultList?.map((item: any, index: number) => (
          <Stack margin={1}>
            <Paper elevation={3} variant="elevation">
              <Atom.ListItemWrapper
                key={item.name}
                onClick={() => navigate(`/pokemon/${item.name}`)}
              >
                <ListItemAvatar>
                  <Stack marginRight={2}>
                    <Avatar
                      sx={{
                        border: "1px solid #eeeeee",
                        width: 55,
                        height: 55,
                      }}
                      src={`https://cdn.traction.one/pokedex/pokemon/${
                        index + 1
                      }.png`}
                    />
                  </Stack>
                </ListItemAvatar>
                <ListItemText primary={item.name} />
              </Atom.ListItemWrapper>
            </Paper>
          </Stack>
        ))}
      </Stack>
    </Container>
  );
};

export default Home;
