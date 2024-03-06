import { firestore } from '../config/Firebase';
import { doc, getDoc, collection, onSnapshot, getDocs } from 'firebase/firestore';

import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
const GetUserInfo = async ({ task, updateTask }) => {


  const groupRef = doc(firestore, "groups", task.chat_id);
  const groupSnap = await getDoc(groupRef);

  const group_data = groupSnap.data();
  const id_other_user = task.user_id === group_data.users[0] ? group_data.users[1] : group_data.users[0];

  //--------------------------------------------------------------

  const unsub = onSnapshot(doc(firestore, "users", id_other_user), (userDoc) => {
    const user_data = userDoc.data();

    let group_preview = {
      avatar: !group_data.is_chat ? group_data.group_img : user_data.avatar || null,
      title: !group_data.is_chat ? group_data.group_name : (user_data.firstName !== undefined || user_data.lastName !== undefined) ? (user_data.firstName + " " + user_data.lastName) : null,
      online: group_data.is_chat ? user_data.online : null,
      is_chat: group_data.is_chat
    }

    updateTask({
      avatar_chat_info: (
        <div className='flex flex-row items-center'>
          <Badge color={group_preview.online ? 'success' : 'string'} overlap="circular" badgeContent=" " className='mr-3' sx={{ "& .MuiBadge-badge": { fontSize: 9, height: 15, minWidth: 15, border: group_preview.online ? 2 : 'none', borderColor: group_preview.online ? '#1998A5' : 'transparent', } }}>
              <Avatar alt="Remy Sharp" src={group_preview.avatar} sx={{ width: '64px', height: '64px' }}>
                {group_preview.title.charAt(0)}
              </Avatar>
          </Badge>
          <div className='flex flex-col'>
            <span className='text-white line-clamp-1 font-bold text-base'>{group_preview.title || '?'}</span>
            {group_preview.is_chat && (
              <span className='text-grey-1 line-clamp-1 text-base'>
                {group_preview.online ? 'En ligne' : 'Hors ligne'}
              </span>
            )}
          </div>
        </div>
      )
    })
  

  });

  return () => unsub()

};

export default GetUserInfo;
