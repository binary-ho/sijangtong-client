import React, {useState} from "react";
import { over } from 'stompjs';
import SockJS from 'sockjs-client';

var stompClient = null;

const ChatRoom = () => {
  const [ publicChats, setPublicChats ] = useState(new []);
  const [ privateChats, setPrivateChats ] = useState(new Map());
  const [ tab, setTab ] = useState("CHATROOM");
  const [ userData, setUserData ] = useState({
    username: '',
    receivername: '',
    connected: false,
    message: ''
  })

  const handleValue = (event) => {
    const { value, name } = event.target;
    setUserData({ ...userData, [name] : value });
  }

    
  const handleMessage = (event) => {
    const {value}=event.target;
    setUserData({...userData, 'message' : value});
  }

  // TODO
  const registerUser = () => {
    let Sock = new SockJS('http://localhost:8080/websocket');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  }

  // TODO
  const onConnected = () => {
    setUserData({...userData, "connected":true});
    stompClient.subscribe('/chatroom/public', onPublicMessageReceived);
    stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessageReceived);
    userJoin();
  }

  const userJoin = () => {
    let chatMessage = {
      senderName: userData.username,
      status:'JOIN'
    };
    stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
  }

  const onError = (error) => {
    console.log(error);
  }

  const onPublicMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case 'JOIN':
        if (!privateChats.get(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, []);
          setPrivateChats(new Map(privateChats));
        }
        break;
      case 'MESSAGE':
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        break;
      default: break;
    }
  }

  const onPrivateMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload);

    if(privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
    } else {
      let list =[];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
    }
    setPrivateChats(new Map(privateChats));
  }

  const sendPublicMessage = () =>{
    if(stompClient) {
      let chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: 'MESSAGE'
      };
      stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
      setUserData({...userData, 'message': ''});
    }
  }

  const sendPrivateMessage =()=>{
    if (stompClient) {
      let chatMessage = {
        senderName: userData.username,
        receivername: tab,
        message: userData.message,
        status: 'MESSAGE'
      };
    if(userData.username !== tab) {
      privateChats.get(tab).push(chatMessage);
      setPrivateChats(new Map(privateChats));
    }
    stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
    setUserData({...userData, "message": ""});
  }
  }

  return (
    <div className="container">
      { userData.connected ?
        <div className="chat-box">
          <div className='member-list'>
            <ul>
              <li onClick={() => { setTab('CHATROOM')}} className={`member ${ tab === "CHATROOM" && 'active' }`}> Chatroom </li>
              {
                [...privateChats.keys()].map((name, index) => (
                  <li onClick={() => { setTab('CHATROOM')}} className={`member ${ tab ===name && 'active' }`} key={index}>
                    {name}
                  </li>
                ))
              }
            </ul>
          </div>
            {
              tab === 'CHATROOM' && <div className='chat-content'>
                <ul className='chat-messages'>
                  {
                    [publicChats.keys()].map((chat,index)=>(
                      <li className='message' key={index}>
                        { chat.senderName !== userData.username && <div className='avatar'> {chat.senderName} </div> }
                        <div className='message-data'>{chat.message}</div>
                        { chat.senderName === userData.username && <div className='avatar self'> {chat.senderName} </div> }
                      </li>
                    ))
                  }
                </ul>
                <div className='send-message'>
                  <input type='text' className= 'input-message'
                    name= 'message' placeholder= 'enter public message' value={userData.message}
                    onChange={handleValue}/>
                  <button type='button' className='send-button' onClick={sendPublicMessage}> send </button>
                </div>
              </div>
            }
            {
              tab !== 'CHATROOM' && <div className='chat-content'>
                {
                  [...publicChats.get(tab)].map((chat,index)=>(
                    <li className='message' key={index}>
                      { chat.senderName !== userData.username && <div className='avatar'>{chat.senderName}</div>}
                      <div className='message-data'> {chat.message} </div>
                      { chat.senderName === userData.username && <div className='avatar self'>{chat.senderName}</div>}
                    </li>
                  ))
                }
                <div className='send-message'>
                  <input type='text' className='input-message'
                    name ='message' placeholder={`enter private message for ${tab}`} value={userData.message} onChange={handleValue}/>
                  <button type='button' className='send-button' onClick={sendPrivateMessage}>send</button>
                </div>
              </div>
            }
        </div> 
      : 
      <div className='register'>
        <input id ='user-name' name='username'
          placeholder='Enter the user name' value={userData.username}
          onChange={handleValue}
        />
        <button type='button' onClick={registerUser}>
          connect
        </button>
      </div> 
      }
    </div>
  )
}

export default ChatRoom