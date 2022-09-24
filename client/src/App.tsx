import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './utils/Theme';
import './App.css';
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import SignIn from './pages/SignIn';
import Video from './pages/Video';
import { mobile } from './utils/responsive';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  background-color: ${({ theme }) => theme.bg};
`;

const Main = styled.div`
  flex: 7;
`;

const Wrapper = styled.div`
  padding: 22px 96px;
  height: calc(100% + 56px);
  ${mobile(1300, {
    padding: '22px 22px',
    paddingLeft: '14px',
  })};
  ${mobile(800, { padding: '0' })};
  ${mobile(500, { padding: '0' })};
`;

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path='/'>
                  <Route index element={<Home type='random' />} />
                  <Route path='trends' element={<Home type='trend' />} />
                  <Route path='subscriptions' element={<Home type='sub' />} />
                  <Route path='search' element={<Search />} />
                  <Route path='signin' element={<SignIn />} />
                  <Route path='video'>
                    <Route path=':id' element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
