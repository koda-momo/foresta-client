import "./App.css";
import { Router } from "./Router";
import styled from "styled-components";

function App() {
  return (
    <_App>
      <_Main>
        <Router />
      </_Main>
    </_App>
  );
}

export default App;

const _App = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

const _Main = styled.main`
  flex: 1 1 0%;
`;
