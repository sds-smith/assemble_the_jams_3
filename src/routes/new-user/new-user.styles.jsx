import styled from "styled-components";

export const RegistrationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: calc(100vh - 100px);
    background-image: linear-gradient(135deg, green, black);
`

export const CloseButton = styled.img`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 24px;
    height: auto;
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

    h2 {
        line-height: 40px;
        width: inherit;
    }
    p {
        text-align: center;
        line-height: 30px;
    }

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