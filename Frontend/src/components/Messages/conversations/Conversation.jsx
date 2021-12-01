import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { url } from "../../config";
import "./conversation.css";

export default function Conversation({ conversation }) {
  const [user, setUser] = useState({});
  const fuser = useSelector((state) => state.user.state.data.user)

  useEffect(() => {
    console.log(conversation.members.find((m) => m !== fuser._id))
    const friendId = conversation.members.find((m) => m !== fuser._id);
    console.log(friendId)
    const getUser = () => {
      fetch(`${url}api/v1/in/${friendId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => response.json())
        .then(data => {
          console.log(data)
          setUser(data.user);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };
    getUser();
  }, []);
  console.log(user)
  return (
    <div className="conversation">
      <div class="contact">
        <div class="pic ">
          <img src={user?.avatar?.url} style={{width:"50px"}}/>
        </div>
        <div class="badge"></div>
        <div class="name">{user.name}</div>
        {/* <div class="message">That is America's ass 🇺🇸🍑</div> */}
      </div>
    </div>
  );
}
