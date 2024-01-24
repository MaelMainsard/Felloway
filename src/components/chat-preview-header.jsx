import React,{useState,useEffect} from 'react';
import GetUserAvatar from '../fetcher/fetcher-avatar-chat-preview-header'
import GetModalNewConv from '../modals/modal-new-conv';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import { getLoggedUser } from "../config/util";

const ChatMenuHeader = ({show_conv, set_open_chat,set_chat, state_show_message, setShowMessage}) => {

  const [avatar, setAvatar] = useState(null);
  const [showModalNewConv, setShowModalNewConv] = useState(false);
  let user_id = getLoggedUser().uid;
  
  useEffect(() => {
    GetUserAvatar({user_id,setAvatar});
    
  }, [user_id]);


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
        <div className='navbar-center'>
        <div className="rounded-full p-1 bg-grey-1">
        <button
          type="button"  // Assurez-vous d'ajuster le type en fonction de vos besoins
          className={`w-20 h-8 rounded-full ${!state_show_message ? ' bg-grey-1 text-font-2' : ' bg-yellow-1 text-white'}`}
          onClick={() => setShowMessage(true)}
        >
          DM
        </button>
        <button
          type="button"
          className={` w-20 h-8 rounded-full ${state_show_message ? ' bg-grey-1 text-font-2' : ' bg-yellow-1 text-white'}`}
          onClick={() => setShowMessage(false)}
        >
          Groupes
        </button>
      </div>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle" onClick={()=> setShowModalNewConv(true)}>
            <MapsUgcIcon className="h-5 w-5 text-font-2" />
          </button>
        </div>
      </div>
      <GetModalNewConv showModal={showModalNewConv} closeModal={()=>setShowModalNewConv(false)} show_conv={show_conv} set_open_chat={set_open_chat} set_chat={set_chat}/>
    </>
  );
};

export default ChatMenuHeader;