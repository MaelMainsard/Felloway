import React,{useState,useEffect} from 'react';
import GetUserAvatar from '../fetcher/fetcher-avatar-chat-header'
import GetModalNewConv from '../modals/modal-new-conv';

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
              <li><a onClick={()=> setShowModalNewConv(true)}>Nouvelle conversation</a></li>
            </ul>
          </div>
        </div>
        <input type="checkbox" className="toggle" onChange={() => state_set_show_message(!state_show_message)} checked={!state_show_message}/>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>
      </div>
      <GetModalNewConv showModal={showModalNewConv} closeModal={()=>setShowModalNewConv(false)} user_id={user_id} show_conv={state_set_show_message} />
    </>
  );
};

export default ChatMenuHeader;