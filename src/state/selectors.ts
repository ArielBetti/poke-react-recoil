import { selectorFamily, selector } from "recoil";
import { DEFAULT_POKEMONS_ENDPOINT } from "../api/endpoints";
import { requester } from "../api/requester";
import environment from "../environments/environment";

export const getAllSeasonOnePokemons = selectorFamily({
  key: "AllSeasonOnePokemons",
  get:
    (pokemon: string) =>
    async () => {
      const { data } = await requester({
        baseURL: environment.POKEAPI_BASE_URL,
      }).get(DEFAULT_POKEMONS_ENDPOINT(pokemon));

      return data;
    },
});
