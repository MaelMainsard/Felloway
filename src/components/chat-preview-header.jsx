import React,{useState,useEffect} from 'react';
import GetUserAvatar from '../fetcher/fetcher-avatar-chat-header'
import GetModalNewConv from '../modals/modal-new-conv';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import SearchIcon from '@mui/icons-material/Search';

const ChatMenuHeader = ({user_id,state_show_message,state_set_show_message}) => {

  const [avatar, setAvatar] = useState(null);
  const [showModalNewConv, setShowModalNewConv] = useState(false);

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
              <li><a>A implémenter</a></li>
            </ul>
          </div>
        </div>
        <div className="rounded-full p-1 bg-grey_1">
        <button
          type="button"  // Assurez-vous d'ajuster le type en fonction de vos besoins
          className={`w-20 h-8 rounded-full ${!state_show_message ? ' bg-grey_1 text-font_2' : ' bg-blue_1 text-white'}`}
          onClick={() => state_set_show_message(!state_show_message)}
        >
          DM
        </button>
        <button
          type="button"
          className={` w-20 h-8 rounded-full ${state_show_message ? ' bg-grey_1 text-font_2' : ' bg-blue_1 text-white'}`}
          onClick={() => state_set_show_message(!state_show_message)}
        >
          Groupes
        </button>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle" onClick={()=> setShowModalNewConv(true)}>
            <MapsUgcIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      <GetModalNewConv showModal={showModalNewConv} closeModal={()=>setShowModalNewConv(false)} user_id={user_id} show_conv={state_set_show_message} />
    </>
  );
};

export default ChatMenuHeader;