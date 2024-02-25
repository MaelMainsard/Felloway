import { useTheme } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import {ChatMenuSkeletton} from './ChatMenuSkeletton';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateData, updateFilter, updateGroupId } from '../features/ChatSlice';
import { firestore } from '../config/Firebase';
import { collection , where, getDocs, query, getDoc, doc, orderBy, limit } from "firebase/firestore";
import { getLoggedUser } from "../config/util";
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';


export const ChatMenu = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { data: groups, isLoaded, convFilter } = useSelector(state => state.chat);
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
            groupsData['id'] = group.id;
    
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
                var hours = data.timestamp.toDate().getHours();
                var minutes = data.timestamp.toDate().getMinutes();
                groupsData['timestamp'] =  hours + ":" + minutes || null;
                groupsData['real_timestamp'] = data.timestamp;

              } else {
                groupsData['message'] = 'Envoyer un message...';
                groupsData['timestamp'] = null;
                groupsData['real_timestamp'] = null;
              }
            });
            if (messageQuerySnapshot.empty) {
              groupsData['message'] = 'Envoyer un message...';
              groupsData['timestamp'] = null;
              groupsData['real_timestamp'] = null;
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
          groupList.sort((a, b) => {
            if (a.timestamp === null && b.timestamp === null) {
                return 0;
            }
            if (a.timestamp === null) {
                return 1; 
            }
            if (b.timestamp === null) {
                return -1; 
            }
            return a.timestamp - b.timestamp;
        });
        
          dispatch(updateData(groupList));
        }
      };
    
      fetchData();
    }, [dispatch, isLoaded]);

    return (
        <div className="h-full"> 
            <div className="h-28 rounded-b-2xl shadow-[0px_6px_5px_0px_#00000024] flex items-center px-4 overflow-x-auto" style={{ backgroundColor: theme.palette.primary.main}}>
              <div className='flex items-center space-x-2 overflow-x-auto'>
                {groups.filter(group => group.title.toLowerCase().includes(convFilter.toLowerCase())).map((group, index) =>
                  <Avatar key={index} alt="Message avatar" src={group.avatar} style={{ height: 70, width: 70 }} />
                )}
              </div>
            </div>
            <div className='flex flex-row justify-between h-14 rounded-full m-8 shadow-[0px_6px_10px_3px_#00000024]' style={{ backgroundColor: theme.palette.InputText.primary}}>
                <InputBase
                    sx={{ml: 3, flex: 1 }}
                    placeholder="Recherche..."
                    value={convFilter}
                    onChange={(event) => dispatch(updateFilter(event.target.value))}
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
                groups.filter(group => group.title.toLowerCase().includes(convFilter.toLowerCase())).map((group, index) =>
                    <div key={index} onClick={()=>{dispatch(updateGroupId(group.id))}} class="flex items-start gap-2.5 m-4">
                      <Avatar alt="Message avatar" src={group.avatar} style={{ height: 43, width: 43 }} /> 
                      <div class="flex flex-col w-full mr-4">
                          <div class="flex justify-between items-center space-x-2 rtl:space-x-reverse">
                              <span class="text-sm font-bold font-bree " style={{color: group.notif > 0 ? theme.palette.primary.main : '#000000'}}>{group.title}</span>
                              {group.message && (
                                <time class="text-xs font-light italic ">{group.timestamp}</time>
                              )}
                          </div>
                          <div class="flex justify-between items-center space-x-2 rtl:space-x-reverse">
                              <p class="text-sm font-thin py-2 overflow-hidden whitespace-nowrap max-w-xs overflow-ellipsis mr-10" style={{color: theme.palette.text.secondary}}>{group.message}</p>
                              <Badge badgeContent={group.notif} color="primary"/>
                          </div>
                      </div>
                    </div>
                )
              }
            </div>
        </div>
    );
}