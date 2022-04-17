import { FC, ReactElement, useEffect } from "react";
import { useNavigate } from "react-router";
import { ListItemAvatar, Avatar, ListItemText, Stack } from "@mui/material";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { atomPokemonList } from "../../state/atoms";
import { getAllSeasonOnePokemons } from "../../state/selectors";

import * as Atom from "./atoms";

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
    return <div>carregando...</div>;
  }

  if (loadablePokemonList.state === "hasError") {
    return <div>error</div>;
  }

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
    >
      {pokemonDefaultList?.map((item: any, index: number) => (
        <Stack margin={1}>
          <Atom.ListItemWrapper
            key={item.name}
            onClick={() => navigate(`/pokemon/${item.name}`)}
          >
            <ListItemAvatar>
              <Avatar
                sx={{ backgroundColor: "#f5f5f5" }}
                src={`https://cdn.traction.one/pokedex/pokemon/${
                  index + 1
                }.png`}
              />
            </ListItemAvatar>
            <ListItemText primary={item.name} />
          </Atom.ListItemWrapper>
        </Stack>
      ))}
    </Stack>
  );
};

export default Home;
