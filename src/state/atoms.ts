import { atom } from 'recoil';

export const atomPokemonList = atom<any>({
  key: 'PokemonList',
  default: undefined,
});
