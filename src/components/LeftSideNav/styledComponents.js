import styled from 'styled-components'

export const DivContainer = styled.div`
  width: 25%;
`

export const ListContainer = styled.ul`
  list-style-type: none;
  padding: 0;

  @media (max-width: 767px) {
    position: absolute;
    width: 100%;
    height: 100vh;
    opacity: 1;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #ffffff;
    display: none;
  }
`

export const ListItems = styled.li`
  color: ${props => props.color};
  padding: 10px 0;
  display: flex;
  align-items: center;
  padding: 10px 25px;
  transition: background-color 0.5s;
  transform-origin: center center;
  width: 185px;
  :hover {
    background-color: ${props => props.bgColor};
    color: black;
    .nav-icons {
      color: red;
    }
    .para-dark {
      margin-left: 10px;
      color: white;
    }
    .para {
      margin-left: 10px;
      color: black;
    }
  }
`

export const SpanEl = styled.span`
  padding: 0 10px;
  color: ${props => props.color};
`
