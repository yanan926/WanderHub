import HomePage from "./Pages/HomePage/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowPage from "./Pages/ShowPage/ShowPage";
import { useState, useEffect } from "react";
import Header from "./Components/Header/Header";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";

function App() {
  const [citiesData, setCitiesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/`);
        console.log(response.data);
        let destionationData = response.data.map((data) => {
          return {
            properties: {
              id: data._id,
              title: `${data.city}, ${data.state}`,
              image: data.image.url,
              imageList: data.imageList,
            },
            geometry: data.geometry
          };
        });
        console.log(destionationData)
        setCitiesData(destionationData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

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
            element={
              <LoginPage
                handleLogin={handleLogin}
                isRedirect={!Boolean(token)}
              />
            }
          />
          <Route
            path="/city/:cityId"
            element={
              Boolean(token) ? (
                <ShowPage
                  isLogin={Boolean(token)}
                  handleLogin={handleLogin}
                />
              ) : (
                <>
                  {/* {Notification.error(
                    "You need to log in to access the destination's page."
                  )} */}
                  <Navigate to="/login" replace />
                </>
              )
            }
          />
        </Routes>
        <ToastContainer autoClose={1000} />
      </BrowserRouter>
    </>
  );
}

export default App;
