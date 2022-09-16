import styled from "styled-components"

type ActionMessageContainerProps = {
  position?: string;
  bottom?: string;
  right?: string;
  top?: string;
  left?: string;
  width: string;
}

export const ActionMessageContainer = styled.p<ActionMessageContainerProps>`
  position: ${props => props.position || 'unset' };
  bottom: ${props => props.bottom || 'unset'};
  right: ${props => props.right || 'unset'};
  top: ${props => props.top || 'unset'};
  left: ${props => props.left || 'unset'};
  width: ${props => props.width};
  height: 2rem;
  background-color: rgba(0,0,0,.6);
  border-radius: 1rem;
  font-size: .75rem;
  text-align: center;
  padding-top: 5px;
  z-index: 20;

  &:empty {
    background-color: unset;
    height: 0px;
    padding: 0px;
  }
`