import { firestore } from '../config/Firebase';
import { doc, getDoc, collection, onSnapshot, getDocs } from 'firebase/firestore';
import { AvatarListPreview } from '../layouts/layout-avatar';
import { getLoggedUser } from "../config/util";

const GetUserInfo = async ({ setInfo, chat_id }) => {

  let user_id = getLoggedUser().uid;

  const groupRef = doc(firestore, "groups", chat_id);
  const groupSnap = await getDoc(groupRef);

  const group_data = groupSnap.data();
  const id_other_user = user_id === group_data.users[0] ? group_data.users[1] : group_data.users[0];

  //--------------------------------------------------------------

  const unsub = onSnapshot(doc(firestore, "users", id_other_user), (userDoc) => {
    const user_data = userDoc.data();

    let group_preview = {
      avatar: !group_data.is_chat ? group_data.group_img : user_data.avatar || null,
      title: !group_data.is_chat ? group_data.group_name : (user_data.firstName !== undefined || user_data.lastName !== undefined) ? (user_data.firstName + " " + user_data.lastName) : null,
      online: group_data.is_chat ? user_data.online : null,
      is_chat: group_data.is_chat
    }
  
    setInfo(
      <div className='flex flex-row items-center'>
        <AvatarListPreview group_preview={group_preview}/>
        <div className='flex flex-col'>
          <span className='text-font-1 line-clamp-1 font-bold text-base'>{group_preview.title || '?'}</span>
          {group_preview.is_chat && (
            <span className='text-font-2 line-clamp-1 text-base'>
              {group_preview.online ? 'En ligne' : 'Hors ligne'}
            </span>
          )}
        </div>
      </div>
    );

  });

  return () => unsub()

};

export default GetUserInfo;