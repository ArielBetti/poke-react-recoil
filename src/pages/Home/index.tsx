import { FC, ReactElement, useEffect } from "react";
import {
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { atomPokemonList } from "../../state/atoms";
import { getAllSeasonOnePokemons } from "../../state/selectors";

import * as Atom from './atoms';

const Home: FC<any> = (): ReactElement => {
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
    <Atom.ContainerWrapper>
      <Atom.ListWrapper>
        {pokemonDefaultList?.map((item: any, index: number) => (
          <Atom.ListItemWrapper key={item.name}>
            <ListItemAvatar>
              <Avatar
                sx={{ backgroundColor: '#f5f5f5' }}
                src={`https://cdn.traction.one/pokedex/pokemon/${
                  index + 1
                }.png`}
              />
            </ListItemAvatar>
            <ListItemText primary={item.name} />
          </Atom.ListItemWrapper>
        ))}
      </Atom.ListWrapper>
    </Atom.ContainerWrapper>
  );
};

export default Home;
