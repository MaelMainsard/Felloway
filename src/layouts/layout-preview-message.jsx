import { AvatarLayoutPreview } from "../layouts/layout-avatar";


export const ChatMenuMessage = ({message_preview, user_id, open_chat, chat}) => {

    const id = user_id === Object.keys(message_preview.users)[0] ? Object.keys(message_preview.users)[1] : Object.keys(message_preview.users)[0];
    const chat_name =  message_preview.group_name ? message_preview.group_name : message_preview.users[id].name;
    const last_chat_hour =  formatTimestamp(message_preview.last_message_timestamp);
    const last_chat_message = message_preview.last_message;
    const chat_number = message_preview.users[user_id].not_view;

    return (
      <div className='flex flex-row align-middle items-center justify-start bg-grey_1 rounded-xl p-3 mb-2 w-full cursor-pointer' onClick={() => { open_chat(true); chat(message_preview.id);}}>
        <AvatarLayoutPreview message_preview={message_preview} user_id={user_id}/>
        
        <div className="w-full justify-center align-middle flex flex-col mb-1">
          <div className=" justify-between flex flex-row items-start">
             <span className='text-font_1 line-clamp-1 font-bold text-base w-8/12'>{chat_name}</span>
             <span className='text-font_2 line-clamp-1 text-xs'>{last_chat_hour}</span>
          </div>
          <div className="justify-between flex flex-row items-end">
            <span className={`text-font_2 line-clamp-1 text-xs w-9/12 ${chat_number !== 0 ? 'font-bold text-font_1' : ''}`}>{last_chat_message}</span>
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
  function formatTimestamp(timestamp) {
    if (!timestamp) {
      return 'N/A';
    }
  
    const { seconds, nanoseconds } = timestamp;
  
    // Convertir les secondes en millisecondes et ajouter les nanosecondes converties en millisecondes
    const timestampInMilliseconds = seconds * 1000 + nanoseconds / 1e6;
  
    const messageDate = new Date(timestampInMilliseconds);
    const currentDate = new Date();
  
    const isToday =
      messageDate.getDate() === currentDate.getDate() &&
      messageDate.getMonth() === currentDate.getMonth() &&
      messageDate.getFullYear() === currentDate.getFullYear();
  
    if (isToday) {
      // Si c'est aujourd'hui, retournez l'heure et les minutes
      const hours = messageDate.getHours();
      const minutes = String(messageDate.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    } else {
      // Sinon, retournez la date au format jour/mois/année
      const day = messageDate.getDate();
      const month = messageDate.getMonth() + 1;
      const year = messageDate.getFullYear();
      return `${day}/${month}/${year}`;
    }
  }