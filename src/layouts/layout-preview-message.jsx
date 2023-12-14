export const ChatMenuMessage = ({img_src,chat_name,last_chat_hour,last_chat_message,chat_number}) => {

    return (
      <div className='flex flex-row align-middle items-center justify-start bg-grey_1 rounded-xl p-3 w-full'>
        <img className='w-14 h-14 object-contain rounded-full mr-2' src={img_src} alt="messageImg" />
        <div className="w-full justify-center align-middle flex flex-col mb-1">
          <div className=" justify-between flex flex-row items-start">
             <span className='text-font_1 line-clamp-1 font-bold text-base w-8/12'>{chat_name}</span>
             <span className='text-font_2 line-clamp-1 text-xs'>{last_chat_hour}</span>
          </div>
          <div className="justify-between flex flex-row items-end">
            <span className='text-font_2 line-clamp-1 text-xs w-9/12'>{last_chat_message}</span>
            {chat_number !== 0 && (
              <span className='bg-red_1 w-5 h-5 rounded-full align-middle justify-center items-center flex text-white text-xs font-bold'>
                {chat_number}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };
  