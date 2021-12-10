import React, { useEffect, useState } from 'react';
import Footer from './components/footer/Footer';
import Login from './components/Login/Login'
import { Routes, Route } from "react-router-dom";
import Error from './components/404/Error'
import Profile from './components/Profile/Profile'
import OtherProfile from './components/otherProfile/OtherProfile'
import Message from './components/Messages/Messenger'
import Main from './components/Home/Home'
import People from './components/People/People'
import { saveUser } from "./redux/action/index"
import Notification from "./components/Notifications/Notification"
import { useDispatch } from "react-redux"
import Blog from './components/Blog/Blog'
import Signup from './components/Login/Signup'
import Search from './components/Search/Search'
import TechShorts from './components/TechShorts/TechShorts'
import { url } from './components/config'
// import ImageBay from './components/imageBay/ImageBay';
function App() {
  const [suc, setsuc] = React.useState(false)

  const dispatch = useDispatch();

  function check() {
    const token = localStorage.getItem("token");
    if (token) {
      const data = {
        "token": token
      }
      fetch(url + 'api/v1/checkToken', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(response => response.json())
        .then(data => {
          dispatch(saveUser({ data, token }))
          if (data.success) {
            setsuc(true)
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }
  useEffect(() => {
    check()
  }, [])

  return (
    <div className="App">

      {suc ?

        <>
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/notification" element={<Notification />} />
            <Route exact path="/Search/:Search" element={<Search />} />
            <Route exact path="/me" element={<Profile />} />
            <Route exact path="/in/:id" element={<OtherProfile />} />
            <Route exact path="peopleyoumayno" element={<People />} />
            <Route exact path="/Techshort" element={<TechShorts />} />
            <Route exact path="/img" element={<ImageBay />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
        </>
        :
        <Routes>
          <Route exact path="Signup" element={<Signup />} />
          <Route exact path="/" element={<Login />} />
          <Route exact path="/Techshort" element={<TechShorts />} />
          {/* <Route exact path="/ImageBay" element={<ImageBay />} /> */}
          <Route path="*" element={<Error />} />

        </Routes>
      }

    </div >
  );
}


export default App;
