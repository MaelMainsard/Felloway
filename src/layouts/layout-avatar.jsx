
export const AvatarLayoutModal = ({ user_array }) => {

    const name = user_array.firstName || '?';

    return (
        <div className='avatar'>
            <div className="w-8 rounded-full">
                {user_array.avatar ? (
                    <img src={user_array.avatar} alt="Avatar" className='object-cover rounded-full w-8 avatar' />
                ) : (
                    <span className='text-grey_2 text-center justify-center w-8 h-8 pt-1 rounded-full font-semibold avatar'>
                        {name.charAt(0).toUpperCase()}
                    </span>
                )}
            </div>
        </div>
    );
};

export const AvatarLayoutPreview = ({ group_preview }) => {


  return (
    <div className='avatar mr-3'>
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

    if(!message_preview.title){
      return <div></div>
    }

    return (
        <div className='chat-image avatar'>
          <div className="w-10 rounded-full">
            {
              message_preview.avatar ?
                <img src={message_preview.avatar} className='object-cover rounded-full w-14' alt="Avatar"  /> :
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-14">
                    <span className="text-2xl">{message_preview.title.charAt(0).toUpperCase()}</span>
                  </div>
                </div>
            }
          </div>
        </div>
      );
};