import styled from "styled-components";
import { Button, Checkbox } from "@material-ui/core";

export const div = styled.div`
  position: absolute;
  width: 250px;
  background-color: white;
  top: center;
  left: center;
`;

export const btn = styled(Button)<any>`
  background-color: #b2dfdb;
  color: white;
  font-size: small;
  font-weight: 600;
  padding: 10px auto;

  &:hover {
    background-color: #009688;
  }
`;

export const checkbox = styled(Checkbox)<any>`
  color: #b2dfdb;

  &:checked {
    color: #009688;
  }
`;
