
export const AvatarLayoutModal = ({ user_array }) => {

    let avatar = user_array.images || null;
    avatar = avatar && (avatar.image0 || null);
    const name = user_array.firstName || '?';

    return (
        <div className='avatar'>
            <div className="w-8 rounded-full">
                {avatar ? (
                    <img src={avatar} alt="Avatar" className='object-cover rounded-full w-8 avatar' />
                ) : (
                    <span className='text-grey_2 text-center justify-center w-8 h-8 pt-1 rounded-full font-semibold avatar'>
                        {name.charAt(0).toUpperCase()}
                    </span>
                )}
            </div>
        </div>
    );
};

export const AvatarLayoutPreview = ({ message_preview, user_id }) => {

  const other_user = user_id === Object.keys(message_preview.users)[0] ? Object.keys(message_preview.users)[1] : Object.keys(message_preview.users)[0];

    return (
        <div className='avatar mr-3'>
          <div className="w-14 rounded-full">
            {message_preview.is_chat ?
              message_preview.users[other_user].avatar ?
                <img src={message_preview.users[other_user].avatar} className='object-cover rounded-full w-14' alt="Avatar"  /> :
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-14">
                    <span className="text-2xl">{message_preview.users[other_user].name.charAt(0).toUpperCase()}</span>
                  </div>
                </div> :
              message_preview.group_img ?
                <img src={message_preview.group_img} className='object-fill rounded-full w-14' alt="Avatar"  /> :
                <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-14">
                  <span className="text-2xl">{message_preview.group_name.charAt(0).toUpperCase()}</span>
                </div>
              </div>
            }
          </div>
        </div>
      );
};

export const AvatarLayoutPage = ({ message_preview, user_id }) => {

    const other_user = user_id;

    return (
        <div className='chat-image avatar'>
          <div className="w-10 rounded-full">
            {
              message_preview.users[other_user].avatar ?
                <img src={message_preview.users[other_user].avatar} className='object-cover rounded-full w-14' alt="Avatar"  /> :
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-14">
                    <span className="text-2xl">{message_preview.users[other_user].name.charAt(0).toUpperCase()}</span>
                  </div>
                </div>
            }
          </div>
        </div>
      );
};