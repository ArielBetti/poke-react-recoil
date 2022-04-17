import {
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
import { FC, ReactElement, useEffect } from "react";
import { useParams } from "react-router";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { atomPokemon } from "../../state/atoms";
import { getAllSeasonOnePokemons } from "../../state/selectors";

const Pokemon: FC<any> = (): ReactElement => {
  const { pokemon } = useParams();

  const [selectedPokemon, setSelectedPokemon] = useRecoilState(atomPokemon);
  const loadablePokemon = useRecoilValueLoadable(
    getAllSeasonOnePokemons(`${pokemon}`)
  );

  useEffect(() => {
    if (loadablePokemon.state === "hasValue") {
      setSelectedPokemon(loadablePokemon.contents);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadablePokemon.state]);

  console.log(selectedPokemon);

  if (loadablePokemon.state === "loading") return <div>carregando</div>;

  if (loadablePokemon.state === "hasError") return <div>erro</div>;

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      flexWrap="wrap"
      marginY={3}
    >
      <Typography variant="h3">{selectedPokemon?.name}</Typography>
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
              <TableCell>Base</TableCell>
              <TableCell>Ev</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedPokemon?.stats?.map((item: any) => (
              <TableRow key={item.name}>
                <TableCell>{item?.base_stat}</TableCell>
                <TableCell>{item?.effort}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default Pokemon;
