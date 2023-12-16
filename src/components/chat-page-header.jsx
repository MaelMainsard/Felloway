import React,{useState,useEffect} from 'react';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import GetUserAvatar from '../fetcher/fetcher-avatar-chat-page-header';

const ChatPageHeader = ({open_chat,user_id, chat_id, set_chat_id}) => {

  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
      GetUserAvatar({user_id,setAvatar,chat_id});
    
  }, [chat_id]);
  

  return (
    <>
      {chat_id && (
        <div className="navbar">
          <div className="navbar-start">
            <button className="btn btn-ghost btn-circle" onClick={() => open_chat(false)}>
              <ArrowBackIosNewIcon className="h-5 w-5" />
            </button>
          </div>
          {avatar}
          <div className="navbar-end">
            {/* Contenu de la navbar-end */}
          </div>
        </div>
      )}
    </>
  );

  };
  
  export default ChatPageHeader;