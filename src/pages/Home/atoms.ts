import { List, ListItem } from '@mui/material';
import styled from 'styled-components';

export const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ListWrapper = styled(List)`
  min-width: 300px;
`;

export const ListItemWrapper = styled(ListItem)`
  background-color: #FFF;
  margin: 5px;
  box-shadow: 0px 0px 5px #eeeeee;
  border-radius: 5px;
  border: 1px solid #f5f5f5;
`;