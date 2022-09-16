import styled from "styled-components";

type NameInputProps = {
  width: string;
}

export const NameInput = styled.input<NameInputProps>`
    width: ${props => props.width};
    padding: .88rem 0;
    border: 1px solid #fff;
    border-radius: 3px;
    margin-top: 1rem;
    color: #010c3f;
    text-align: center;
    font-size: 1rem;

    &:focus {
        outline: none;
      }
`
