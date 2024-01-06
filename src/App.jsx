import HomePage from "./Pages/HomePage/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowPage from "./Pages/ShowPage/ShowPage";
import { useState } from "react";
import cities from "./data";
import { v4 as uuidv4 } from "uuid";
import imageList from "./image";
import Header from "./Components/Header/Header";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import { Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Notification from './Components/Notification/Notification'

function App() {
  let citiesData = cities.map((data, index) => {
    const cityId = uuidv4();
    return {
      properties: {
        id: "" + index,
        title: `${data.city}, ${data.state}`,
        image: `${imageList[Math.floor(Math.random() * imageList.length)]}.`,
      },
      geometry: {
        type: "Point",
        coordinates: [data.longitude, data.latitude, 0],
      },
    };
  });

  const [token, setToken] = useState(sessionStorage.getItem("token"));

  const handleLogin = (token) => {
    sessionStorage.setItem("token", token);
    setToken(token);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
  };

  return (
    <>
      <BrowserRouter>
        <Header isLogin={Boolean(token)} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<HomePage citiesData={citiesData} />} />

          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/login"
            element={<LoginPage handleLogin={handleLogin} isRedirect={!Boolean(token)}/>}
          />
          <Route
            path="/city/:cityId"
            element={
              Boolean(token) ? (
                <ShowPage
                  citiesData={citiesData}
                  isLogin={Boolean(token)}
                  handleLogin={handleLogin}
                />
              ) : <>
              {Notification.error("You need to log in to access this page.")}
              <Navigate to="/login" replace />
            </>
            }
          />
        </Routes>
        <ToastContainer autoClose={1000}/>
      </BrowserRouter>
    </>
  );
}

export default App;
