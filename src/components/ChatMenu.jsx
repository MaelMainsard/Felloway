import { useTheme } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
//import { ChatMenuList } from './ChatMenuList';
import {ChatMenuSkeletton} from './ChatMenuSkeletton';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../features/ChatMenuSlice';
import { firestore } from '../config/Firebase';
import { collection , where, getDocs, query, getDoc, doc, orderBy, limit } from "firebase/firestore";
import { getLoggedUser } from "../config/util";
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';


export const ChatMenu = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { data: groups, isLoaded } = useSelector(state => state.groups);
    const user_id = getLoggedUser().uid;

    useEffect(() => {
      const fetchData = async () => {
        if (!isLoaded) {
          const q = query(collection(firestore, "groups"), where("users", 'array-contains', user_id));
          const querySnapshot = await getDocs(q);
          const groupList = [];
    
          await Promise.all(querySnapshot.docs.map(async (group) => {
            let groupsData = {};
            const group_data = group.data();
            const isChat = group_data.is_chat;
    
            if (isChat) {
              const id_other_user = user_id === group_data.users[0] ? group_data.users[1] : group_data.users[0];
              const usersRef = doc(firestore, "users", id_other_user);
              const usersSnap = await getDoc(usersRef);
              const user_data = usersSnap.data();
              groupsData['avatar'] = user_data.avatar || null;
              groupsData['title'] = (user_data.firstName + " " + user_data.lastName) || null;
            } else {
              const image = group_data.group_img;
              groupsData['avatar'] = image || null;
              groupsData['title'] = group_data.group_name || null;
            }
    
            const messageQ = query(
              collection(firestore, `groups/${group.id}/messages`),
              orderBy("timestamp", "desc"),
              limit(1)
            );
            const messageQuerySnapshot = await getDocs(messageQ);
            messageQuerySnapshot.forEach((doc) => {
              if (doc.exists()) {
                const data = doc.data();
                groupsData['message'] = data.content || null;
                groupsData['timestamp'] = (data.timestamp.toDate().toDateString()) || null;
              } else {
                groupsData['message'] = null;
                groupsData['timestamp'] = null;
              }
            });
            if (messageQuerySnapshot.empty) {
              groupsData['message'] = null;
              groupsData['timestamp'] = null;
            }
    
            const unreadMessageQ = query(collection(firestore, `groups/${group.id}/messages`));
            let count = 0;
            const unreadMessageQuerySnapshot = await getDocs(unreadMessageQ);
            unreadMessageQuerySnapshot.forEach((doc) => {
              const data = doc.data();
              if (!data.view_by || !data.view_by.includes(user_id)) {
                count++;
              }
            });
            groupsData['notif'] = count;
    
            groupList.push(groupsData);
          }));
    
          dispatch(updateData(groupList));
        }
      };
    
      fetchData();
    }, [dispatch, isLoaded]);

    return (
        <div className="h-full"> 
            <div className="h-28 rounded-b-2xl shadow-[0px_6px_5px_0px_#00000024]" style={{ backgroundColor: theme.palette.primary.main}}>
            </div>
            <div className='flex flex-row justify-between h-14 rounded-full m-8 shadow-[0px_6px_10px_3px_#00000024]' style={{ backgroundColor: theme.palette.InputText.primary}}>
                <InputBase
                    sx={{ml: 3, flex: 1 }}
                    placeholder="Recherche..."
                />
                <IconButton type="button" sx={{ p: '23px'}} aria-label="search">
                    <SearchIcon sx={{ fontSize: 30, color: theme.palette.primary.main }}/>
                </IconButton>
            </div>
            <div className='overflow-y-auto' style={{height: '50vh' }}>
              {!isLoaded ?
                Array.from({ length: 5 }).map((_, index) => (
                  <ChatMenuSkeletton key={index} />
                )) :
                groups.map((group, index) =>
                  <div key={index} className='my-6 flex w-auto'>
                    {group.avatar ?
                      <Avatar  alt="Message avatar" src={group.avatar} style={{height: 43, width: 43}} /> :
                      <Avatar  style={{height: 43, width: 43}}>{group.title.charAt(0)}</Avatar>
                    }
                    <div className='flex flex-col'>
                      <span>{group.title}</span>
                      <time>{group.message}</time>
                    </div>
                    <div className='flex flex-col'>
                        <time>{group.timestamp}</time>
                        <Badge badgeContent={1} color="primary"/>
                    </div>



                  </div>
                )
              }
            </div>
        </div>
    );
}