const ChatMenuMesssage = ({message}) => {
  
    return (
      <div className="chatMessage">
        <div className="chatMessageImg">
            <img src={message.img}  alt="messageImg"/>
        </div>
        <div className="chatMessageBody">
            <div className="chatMessageHeader">
                <h4>{message.name}</h4>
                <h6>{message.last_time}</h6>
            </div>
            <div className="chatMessageBottom">
                <h5>{message.last_message}</h5>
                <div className="notifiCircle">
                    <h4>{message.number_message}</h4>
                </div>
            </div>
        </div>
      </div>
    );
  };
  
  export default ChatMenuMesssage;