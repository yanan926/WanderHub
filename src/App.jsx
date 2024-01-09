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
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"))

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://wanderhubserver.onrender.com/destinations`);
        let destionationData = response.data.map((data) => {
          return {
            properties: {
              id: data._id,
              title: `${data.city}, ${data.state}`,
              image: data.image.url,
              imageList: data.imageList,
            },
            description: data.description,
            geometry: data.geometry,
            reviews: data.reviews
          };
        });
        setCitiesData(destionationData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);



  const handleLogin = (token, userId) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", userId);
    setToken(token);
    setUserId(userId)
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId")
    setToken(null);
  };

  return (
    <>
      <BrowserRouter>
        <Header isLogin={Boolean(token)} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<HomePage citiesData={citiesData}/>} />

          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/login"
            element={
              <LoginPage
                handleLogin={handleLogin}
                isRedirect={!Boolean(token)}
                setUserId={setUserId}
              />
            }
          />
          <Route
            path="/:cityId"
            element={
              Boolean(token) ? (
                <ShowPage
                />
              ) : (
                  <Navigate to="/login" replace />
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
