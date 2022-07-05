import styled from "styled-components";

export const LogInContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: green;
    height: calc(100vh - 100px);
`


export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60%;
    padding: 20px 40px;
    color:#fff;
    background-color: hsla(0, 0%, 0%, 40%);

    .loginMessage {
        margin-bottom: 1rem;
        text-align: center;
      }
    
    #readme {
      color: #1db954;
      font-weight: bold;

      &:hover {
        color:rgba(0, 128, 0, 0.7)
      }
    }
`

export const ButtonsContainer = styled.div`
    display: flex;
    width: 90%;
    justify-content: space-evenly;
    align-items: center;
    background-color: rgba(255, 255, 255, .1);
    color: black;
    padding: 1rem 2rem;
`

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
`

// export const LogInContainer = styled.div`
// 
// `