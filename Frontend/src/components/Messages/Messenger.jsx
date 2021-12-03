import Conversation from "./conversations/Conversation";
import Message from "./message/Message";
import ChatOnline from "./chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import SendIcon from '@mui/icons-material/Send';
import { connectAdvanced, useSelector } from "react-redux";
import "./messenger.css";
import Navbar from "../Navbar/Navbar";
import { format } from 'timeago.js'
import { url } from "../config";
export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();
  const user = useSelector((state) => state.user.state.data.user)
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      // setOnlineUsers(
      //   user.link.filter((f) => users.some((u) => u.id === f))
      // );
    });
  }, []);

  useEffect(() => {
    const getConversations = async () => {
      console.log(user)
      try {
        const res = await axios.get(url + `api/v1/conversationsUser/${user._id}`);
        setConversations(res.data.conversation)
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);
  console.log(onlineUsers)
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(url + "api/v1/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user?._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(url + "api/v1/addmsg", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  console.log(messages)
  return (
    <>
      <Navbar />
      <div class="center">
        <div class="contacts">
          <i class="fas fa-bars fa-2x">
          </i>
          <h2>Contacts</h2>
          {conversations.map((c) => (
            <div onClick={() => setCurrentChat(c)}>
              <Conversation conversation={c} currentUser={user} />
            </div>
          ))}
        </div>
        {currentChat == null ? null :
          <div class="chat">
            {/* <div class="contact bar">
              <div class="pic stark">
              </div>
              <div class="name">Tony Stark</div>
              <div class="seen">Today at 12:56</div>
            </div> */}
            <div class="messages" id="chat">
              {messages.map((m) => (
                <div class={user._id == m.sender ? "message stark" : "message parker"} >{m.text}
                {console.log(m)}
                </div>
              ))}
            </div>
            <div class="input">
              <i class="fas fa-camera">
              </i><i class="far fa-laugh-beam">
              </i><input placeholder="Type your message here!" type="text" onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage} />
              <button onClick={handleSubmit}><SendIcon /></button>
              <i class="fas fa-microphone">
              </i></div>
          </div>
        }
      </div>

    </>
  );
}
