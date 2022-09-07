import styled from "styled-components"

type ActionMessageContainerProps = {
  bottom: string;
  right: string;
  width: string;
}

export const ActionMessageContainer = styled.p<ActionMessageContainerProps>`
  position: absolute;
  bottom: ${props => props.bottom};
  right: ${props => props.right};
  width: ${props => props.width};
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