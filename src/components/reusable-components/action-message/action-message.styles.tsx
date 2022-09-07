import styled from "styled-components"

export type ActionMessageProps = {
  bottom: string;
  right: string;
  width?: string;
  children?: string;
}

export const ActionMessageContainer = styled.p<ActionMessageProps>`
  position: absolute;
  bottom: ${props => props.bottom};
  right: ${props => props.right};
  width: ${props => props.width || '7rem'};
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