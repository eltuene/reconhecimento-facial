import styled from "styled-components"

const Main = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    background-color: #9acd32;
`

const Header = () => {
    return(
        <Main>
            <h1>Semana Acadêmica</h1>
        </Main>
    )
}

export default Header