import styled from "styled-components";

export const RegistrationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100vh - 100px);
    background-image: linear-gradient(135deg, green, black);
`

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60%;
    padding: 20px 40px;
    margin-top: 33px;

    color:#fff;
    background-color: hsla(0, 0%, 0%, 40%);

    transform-origin: top;
    transition: transform 1s;

    .registration {
        display : flex;
        flex-direction: column;
        height: 50%;
        align-items: center;
        padding-top : 60px;

        input {
            width: 287px;
            padding: .88rem 0;
            border: 1px solid #fff;
            border-radius: 3px;
            margin-top : 15px;
            color: #010c3f;
            text-align: center;
            font-size: 1rem;

            &:focus {
                outline: none;
              }
          }

        #email {
            margin-bottom: 15px;
        }
      }
`