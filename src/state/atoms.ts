import { atom } from 'recoil';

export const atomPokemonList = atom<any>({
  key: 'PokemonList',
  default: undefined,
});

export const atomPokemon = atom<any>({
  key: 'Pokemon',
  default: undefined,
});
