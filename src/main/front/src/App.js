import React, { createContext } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import StartPage from './components/StartPage';
import Survey from "./components/Survey";
import EndPage from "./components/EndPage";
import './css/common.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const AppContext = createContext();

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    ochre: {
      main: '#E3D026',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
    },
    babyblue: {
        main: '#a7caed',
        light: '#d1edf6',
        dark: '#75a8da',
        contrastText: '#ffffff',
    },
    pupleblue: {
        main: '#4A3AFF',
        light: '#90b7ff',
        dark: '#1d11a9',
        contrastText: '#fff',
    }
  },
});

const baseUrl = "http://ec2-3-39-64-137.ap-northeast-2.compute.amazonaws.com:8080";
//const baseUrl = "http://localhost:8080";

function App() {

    const location = useLocation(); // 현재 위치 가져오기
    const commonData = { baseUrl };

    return (
        <AppContext.Provider value={commonData}>
            <div className="App bg_blue">
                <ThemeProvider theme={theme}>
                    <TransitionGroup>
                        <CSSTransition
                            key={location.key}
                            classNames="slide"
                            timeout={300}>
                            <div className="parent">
                                <div className="child">
                                    <Routes location={location}>
                                        <Route exact path="/" element={<StartPage />} />
                                        <Route path="/startPage" element={<StartPage />} />
                                        <Route path="/survey" element={<Survey />} />
                                        <Route path="/endPage" element={<EndPage />} />
                                    </Routes>
                                </div>
                            </div>
                        </CSSTransition>
                    </TransitionGroup>
                </ThemeProvider>
            </div>
        </AppContext.Provider>
    );
}

const WrappedApp = () => (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

export default WrappedApp;