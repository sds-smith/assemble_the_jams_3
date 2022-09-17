import styled from "styled-components"

type ActionMessageContainerProps = {
  position: string;
  bottom: string;
  right: string;
  top: string;
  left: string;
  width: string;
  minHeight : string;
}

export const ActionMessageContainer = styled.div<ActionMessageContainerProps>`
  position: ${props => props.position };
  bottom: ${props => props.bottom};
  right: ${props => props.right};
  top: ${props => props.top };
  left: ${props => props.left };
  width: ${props => props.width};
  min-height: ${props => props.minHeight};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,.6);
  border-radius: 1rem;
  font-size: .75rem;
  text-align: center;
  z-index: 20;

  &:empty {
    background-color: unset;
    height: 0px;
    padding: 0px;
  }
`