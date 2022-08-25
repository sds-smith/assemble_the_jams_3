import styled from "styled-components"

export const ActionMessageContainer = styled.p`
  position: absolute;
  bottom: 2.2rem;
  right: 10px;
  width: 7rem;
  height: 2rem;
  background-color: rgba(0,0,0,.6);
  border-radius: 1rem;
  font-size: .75rem;
  text-align: center;
  padding-top: 5px;

  &:empty {
    background-color: unset;
  }
`