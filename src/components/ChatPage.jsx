import react, {useState,useEffect } from 'react';
import { useTheme } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import { updateGroupId, updateMessage } from '../features/ChatSlice';
import { useDispatch, useSelector } from 'react-redux';
import InputBase from '@mui/material/InputBase';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Avatar from '@mui/material/Avatar';
import { collection, query, orderBy, onSnapshot,doc ,getDoc } from "firebase/firestore";
import { firestore } from '../config/Firebase';
import { getLoggedUser } from "../config/util";
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'
import { color } from 'framer-motion';

export const ChatPage = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { data, group_id, message } = useSelector(state => state.chat);
    const [messageList, setMessageList] = useState(null);
    const user_id = getLoggedUser().uid;

    function getInfoById(id) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                return data[i];
            }
        }
        return null;
    }

    useEffect(() => {
        const q = query(collection(firestore, `groups/${group_id}/messages`), orderBy("timestamp", "asc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const listMessage = [];
            querySnapshot.forEach(async (msg) => {
                const mt = msg.data();
                const right = user_id === mt.sender_id;
                listMessage.push({
                    avatar: !right ? getInfoById(group_id).avatar : getLoggedUser().photoURL,
                    message: mt.content,
                    right: right
                });
            });
            setMessageList(listMessage);
        });
        return () => unsubscribe();
    }, [group_id]);

    return (
        <div className="h-full">
            <div className="h-28 rounded-b-2xl shadow-[0px_6px_5px_0px_#00000024] flex items-center px-4 space-x-2" style={{ backgroundColor: theme.palette.primary.main }}>
                <Avatar alt="Avatar" src={getInfoById(group_id).avatar} style={{ height: 70, width: 70 }} />
            </div>
            <IconButton size="large" onClick={()=>{dispatch(updateGroupId(null))}}>
                <KeyboardBackspaceIcon sx={{fontSize: 40, color: theme.palette.primary.main}}/> 
            </IconButton>

            <div className='overflow-y-auto p-5 space-y-5' style={{height: '43vh' }}>
                {messageList && (
                    messageList.map((message, index) =>
                        <div className={`flex ${!message.right ? 'justify-start' : 'justify-end' }`}>
                            {!message.right && (
                                <Avatar className='mt-2' alt="Avatar" src={message.avatar} style={{ height: 37, width: 37 }} />
                            )}
                            <div className={`h-fit w-fit ${!message.right ? 'ml-2' : 'mr-2' }  rounded-3xl justify-center items-center align-middle`} style={{ backgroundColor: message.right ? theme.palette.chatBubble.right : theme.palette.chatBubble.left }}>
                                <p className="text-md font-normal p-3 text-white whitespace-normal">{message.message}</p>
                            </div>
                            {message.right && (
                                <Avatar className='mt-2' alt="Avatar" src={message.avatar} style={{ height: 37, width: 37 }} />
                            )}
                        </div>
                    )
                )}
            </div>
            <div className='absolute w-full flex justify-end pr-8'>
                {message && (
                    <Loader size={10} color={theme.palette.primary.main}/>
                )}
            </div>
            <div className='flex flex-row justify-between h-14 rounded-full m-8 shadow-[0px_6px_10px_3px_#00000024]' style={{ backgroundColor: theme.palette.InputText.primary }}>
                <IconButton type="button" sx={{ p: '15px' }} aria-label="search">
                    <AddCircleIcon sx={{ fontSize: 30, color: theme.palette.primary.main }} />
                </IconButton>
                <InputBase
                    sx={{ flex: 1 }}
                    placeholder="Ecrire..."
                    value={message}
                    onChange={(event) => dispatch(updateMessage(event.target.value))}
                />
                <IconButton type="button" sx={{ p: '23px' }} aria-label="search">
                    <ArrowForwardIosIcon sx={{ fontSize: 30, color: theme.palette.primary.main }} />
                </IconButton>
            </div>
        </div>
    );
}