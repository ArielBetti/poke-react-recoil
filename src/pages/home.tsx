import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { FC, useEffect } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { atomPokemonList } from "../state/atoms";
import { getAllSeasonOnePokemons } from "../state/selectors";

const Home: FC<any> = () => {
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
    <List>
      {pokemonDefaultList?.map((item: any, index: number) => (
        <ListItem key={item.name}>
          <ListItemAvatar>
            <Avatar
              src={`https://cdn.traction.one/pokedex/pokemon/${index + 1}.png`}
            />
          </ListItemAvatar>
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default Home;
