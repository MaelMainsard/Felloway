import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import DeleteIcon from '@mui/icons-material/Delete';
import { firestore } from '../config/Firebase';
import { doc, deleteDoc, collection, query, getDoc, getDocs, updateDoc  } from "firebase/firestore";
import React from 'react';
import {Menu} from '@mui/material';

import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const ChatMenuMessage = ({group_preview, task, updateTask}) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClickDroit = (e) => {
      e.preventDefault();
      handleClick(e)
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
  

    return (
        <div aria-describedby={id} variant="contained" className='flex flex-row align-middle items-center justify-start rounded-xl p-3 mb-2 w-full cursor-pointer bg-grey-1'>
          <div className="flex flex-row justify-center items-center">
            <Badge color={group_preview.online ? 'success' : 'string'} overlap="circular" badgeContent=" " className='mr-3' sx={{ "& .MuiBadge-badge": { fontSize: 9, height: 15, minWidth: 15, border: group_preview.online ? 2 : 'none', borderColor: group_preview.online ? '#f7f7f7' : 'transparent', } }}>
              <Avatar alt="Remy Sharp" src={group_preview.avatar} sx={{ width: '56px', height: '56px' }}>
                {group_preview.title.charAt(0)}
              </Avatar>
            </Badge>
          </div>
          <div className={`grid ${group_preview.message ? 'grid-cols-2' : 'grid-cols-1'} gap-1 w-full cursor-pointer`} onClick={() => { updateViewMessage(group_preview.id, task.user_id, updateTask) }} >
            <span className={`line-clamp-1 font-bold text-base ${group_preview.notification !== 0 ? 'font-bold text-green-1' : 'text-black'}`}>{group_preview.title}</span>
            <span  className='text-black line-clamp-1 text-xs italic flex flex-row justify-end items-center'>{group_preview.timestamp}</span>
            <span className={`text-font-2 line-clamp-1  ${group_preview.notification !== 0 ? 'text-font-1' : ''}`}>
              {group_preview.message ? group_preview.message : 'Début de la discussion'}
            </span>
            {group_preview.notification !== 0 && (
              <div className="flex flex-row justify-end">
                <span className='bg-green-1 w-5 h-5 rounded-full align-middle justify-center items-center flex text-white text-xs font-bold pt-0.5'>
                  {group_preview.notification}
                </span>
              </div>
            )}
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                width: 'fit'
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={() => { deleteGroup(group_preview.id, updateTask); handleClose() }}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Supprimer la discution</ListItemText>
            </MenuItem>
          </Menu>
          <div onClick={handleClick} onMouseEnter={handleClick}>
            <MoreVertIcon className=' text-grey-3'/>
          </div>
        </div>
    );
};

export const ChatMenuMessageLoader = () => {

  return (
    <div className='flex flex-row align-middle gap-4 items-center justify-start rounded-xl p-3 mb-2 w-full cursor-pointer'>
      <div className="skeleton w-14 h-14 rounded-full shrink-0 "></div>
      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="skeleton h-4 w-full "></div>
        <div className="skeleton h-4 w-full "></div>
        <div className="skeleton h-4 w-full "></div>
        <div className="skeleton h-4 w-full "></div>
      </div>
    </div>
  );
};
async function deleteGroup(group_id,updateTask){
  await deleteDoc(doc(firestore, "groups", group_id)); 
  updateTask({chat_id:null});
}

async function updateViewMessage(group_id, user_id, updateTask) {
  updateTask({open_chat_page:true,chat_id:group_id});
  const q = query(collection(firestore, "groups", group_id, "messages"));

  const querySnapshot = await getDocs(q);

  // Utilisez Promise.all pour attendre la résolution de toutes les mises à jour
  await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const docRef = doc.ref; // Obtenez la référence du document

      // Utilisez getDoc pour obtenir une version mise à jour du document
      const docSnapshot = await getDoc(docRef);
      const doc_data = docSnapshot.data();

      if (!doc_data.view_by.includes(user_id)) {
        doc_data.view_by.push(user_id);

        // Mettez à jour le document en utilisant la référence du document
        await updateDoc(docRef, {
          view_by: doc_data.view_by,
        });
      }
    })
  );
}