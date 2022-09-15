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
  bottom: ${props => props.bottom || '0'};
  right: ${props => props.right || '0'};
  top: ${props => props.top || '0'};
  left: ${props => props.left || '0'};
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
  }
`