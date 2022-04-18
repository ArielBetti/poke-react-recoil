import styled from "styled-components";

export const Body = styled.div`
  background-color: ${({ theme }) => theme?.palette?.background?.default};
  min-height: 100vh;
`;
