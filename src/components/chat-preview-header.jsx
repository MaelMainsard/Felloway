import React,{useState,useEffect} from 'react';
import GetUserAvatar from '../fetcher/fetcher-avatar-chat-preview-header'
import GetModalNewConv from '../modals/modal-new-conv';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import { getLoggedUser } from "../config/util";

const ChatMenuHeader = ({state_show_message,state_set_show_message,set_open_chat,set_chat}) => {

  const [avatar, setAvatar] = useState(null);
  const [showModalNewConv, setShowModalNewConv] = useState(false);
  let user_id = getLoggedUser().uid;
  
  useEffect(() => {
    GetUserAvatar({user_id,setAvatar});
    
  }, [user_id,state_show_message]);


  return (
    <>
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle p-0">
              {avatar}
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><a href="/#">A implémenter</a></li>
            </ul>
          </div>
        </div>
        <div className="rounded-full p-1 bg-grey-1">
        <button
          type="button"  // Assurez-vous d'ajuster le type en fonction de vos besoins
          className={`w-20 h-8 rounded-full ${!state_show_message ? ' bg-grey-1 text-font-2' : ' bg-blue-1 text-white'}`}
          onClick={() => state_set_show_message(true)}
        >
          DM
        </button>
        <button
          type="button"
          className={` w-20 h-8 rounded-full ${state_show_message ? ' bg-grey-1 text-font-2' : ' bg-blue-1 text-white'}`}
          onClick={() => state_set_show_message(false)}
        >
          Groupes
        </button>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle" onClick={()=> setShowModalNewConv(true)}>
            <MapsUgcIcon className="h-5 w-5 text-font-2" />
          </button>
        </div>
      </div>
      <GetModalNewConv showModal={showModalNewConv} closeModal={()=>setShowModalNewConv(false)} user_id={user_id} show_conv={state_set_show_message} set_open_chat={set_open_chat} set_chat={set_chat}/>
    </>
  );
};

export default ChatMenuHeader;