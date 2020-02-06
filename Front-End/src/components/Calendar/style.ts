import styled from 'styled-components';

const Button = styled.button`
  background: white;
  width: 24px;
  height: 24px;
  top: 15px;
  border: none;
  display: inline-block;
`;

const Title = styled.div`
  text-align: 'center';
`

const Table = styled.table`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Th = styled.th`
  border: 1px solid black;
`;

const Td = styled.td`
  border: 1px solid gray;
  width: 200px;
`;

export { Button, Table, Th, Td, Title };