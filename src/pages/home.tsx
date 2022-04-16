import { FC, useEffect, useState} from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { atomPokemonList } from "../state/atoms";
import { getAllSeasonOnePokemons } from "../state/selectors";

const Home: FC<any> = () => {
  const [pokemonDefaultList, setPokemonDefaultList] = useRecoilState(atomPokemonList);
  const loadablePokemonList = useRecoilValueLoadable(getAllSeasonOnePokemons('?limit=151'));

  useEffect(() => {
    setPokemonDefaultList(loadablePokemonList.contents);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadablePokemonList.state]);

  console.log(pokemonDefaultList);

  return <div>Home</div>;
};

export default Home;
