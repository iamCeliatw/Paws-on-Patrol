import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Chatbox from "./pages/Chatbox";
import GlobslStyles from "./styles/Global";
import { ThemeProvider } from "styled-components";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { css } from "styled-components";
import Account from "./pages/Account";
import Payment from "./pages/Payment";
import { ChatContextProvider } from "./context/ChatContext";
import Success from "./pages/Success";

const theme = {
  colors: {
    background: "rgba(255,255,255,0.9)",
    gray: "#5b5b5b",
    body: "#F5F5F5",
  },
  media: {
    tablet: (...args) => css`
      @media (max-width: 768px) {
        ${css(...args)}
      }
    `,
    laptop: (...args) => css`
      @media (min-width: 1200px) {
        ${css(...args)}
      }
    `,
    mobile: (...args) => css`
      @media (min-width: 400px) {
        ${css(...args)}
      }
    `,
  },
};
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <AuthContextProvider>
          <ChatContextProvider>
            <GlobslStyles />
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/Signup" element={<SignupPage />} />
              <Route path="/Home" element={<HomePage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/Account" element={<Account />} />
                <Route path="/Chatbox" element={<Chatbox />} />
                <Route path="/Payment" element={<Payment />} />
                <Route path="/Success" element={<Success />} />
              </Route>
            </Routes>
          </ChatContextProvider>
        </AuthContextProvider>
      </div>
    </ThemeProvider>
  );
}
export default App;
