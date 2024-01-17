
export const AvatarLayoutModal = ({ user_array }) => {

  const name = user_array.firstName || '?';

  return (
    <div className='avatar'>
        {user_array.avatar ? (
               <div className="w-8 rounded-full">
          <img src={user_array.avatar} alt="Avatar" className='object-cover rounded-full w-8 avatar' />
          </div>
        ) : (
            <div className="bg-neutral text-neutral-content rounded-full w-8">
              <span className='text-center justify-center w-8 h-8 pt-2 rounded-full font-semibold avatar'>
                {name.charAt(0).toUpperCase()}
              </span>
            </div>
        )}
      </div>
  );
};

export const AvatarLayoutPreview = ({ group_preview }) => {

  return (
    <div className={`avatar mr-3 ${group_preview.is_chat ? (group_preview.online ? 'online' : 'offline') : ''}`}>
      <div className="w-14 rounded-full">
        {group_preview.avatar ? (
          <img src={group_preview.avatar} alt="Avatar" className='object-cover rounded-full w-14' />
        ) : (
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-14">
              <span className="text-2xl">{group_preview.title.charAt(0).toUpperCase()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const AvatarLayoutPage = ({ message_preview }) => {


  return (
    <div className='chat-image avatar'>
      {
        message_preview.sender_img ?
          <div className="w-10 rounded-full">
            <img src={message_preview.sender_img} className='object-cover rounded-full w-14' alt="Avatar" />
          </div> :
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-10">
              <span className='text-center justify-center w-8 h-8 pt-1 rounded-full font-semibold avatar'>
                {message_preview.sender_name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
      }
    </div>
  );
};