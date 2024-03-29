import react, {useState,useEffect,useRef } from 'react';
import { useTheme } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import { updateGroupId, updateMessage } from '../features/ChatSlice';
import { useDispatch, useSelector } from 'react-redux';
import InputBase from '@mui/material/InputBase';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Avatar from '@mui/material/Avatar';
import { collection, query, orderBy, onSnapshot,doc ,addDoc,updateDoc,serverTimestamp } from "firebase/firestore";
import { firestore } from '../config/Firebase';
import { getLoggedUser } from "../config/util";
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'

export const ChatPage = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { data, group_id, message } = useSelector(state => state.chat);
    const [messageList, setMessageList] = useState(null);
    const user_id = getLoggedUser().uid;
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  
    useEffect(() => {
      scrollToBottom()
    }, [messageList]);



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
        <div className="h-full flex flex-col overflow-y-hidden justify-between">
            <div className="h-28 rounded-b-2xl shadow-[0px_6px_5px_0px_#00000024] flex items-center px-4 py-4 space-x-4" style={{ backgroundColor: theme.palette.primary.main }}>
                <Avatar alt="Avatar" src={getInfoById(group_id).avatar} style={{ height: 70, width: 70 }} />
                <span className='text-md font-semibold' style={{ color: theme.palette.primary.contrastText }}>{getInfoById(group_id).title}</span>
            </div>
            <div className='absolute mt-24'>
                <IconButton size="large" onClick={()=>{dispatch(updateGroupId(null))}}>
                    <KeyboardBackspaceIcon sx={{fontSize: 40, color: theme.palette.primary.main}}/> 
                </IconButton>
            </div>

            <div className='overflow-y-auto p-5 space-y-5 h-full'>
                {messageList && (
                    messageList.map((message, index) =>
                        <div key={index} className={`flex ${!message.right ? 'justify-start' : 'justify-end' }`}>
                            {!message.right && (
                                <Avatar className='mt-2' alt="Avatar" src={message.avatar} style={{ height: 37, width: 37 }} />
                            )}
                            <div className={`h-fit w-fit ${!message.right ? 'ml-2' : 'mr-2' }  rounded-3xl justify-center items-center align-middle`} style={{ backgroundColor: message.right ? theme.palette.chatBubble.right : theme.palette.chatBubble.left }}>
                                <p className="text-md font-normal p-3 text-white whitespace-normal w-fit">{message.message}</p>
                            </div>
                            {message.right && (
                                <Avatar className='mt-2' alt="Avatar" src={message.avatar} style={{ height: 37, width: 37 }} />
                            )}
                        </div>
                    )
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className=''>
                <div className=' w-full flex flex-row absolute justify-end pr-4'>
                    {message && (
                        <Loader size={10} color={theme.palette.primary.main}/>
                    )}
                </div>
                <div className='flex flex-row justify-between h-14 rounded-full mx-4  mt-6 mb-4 shadow-[0px_6px_10px_3px_#00000024]'>
                    <IconButton type="button" sx={{ p: '15px' }} aria-label="search">
                        <AddCircleIcon sx={{ fontSize: 30, color: theme.palette.primary.main }} />
                    </IconButton>
                    <InputBase
                        sx={{ flex: 1 }}
                        placeholder="Ecrire..."
                        value={message}
                        onChange={(event) => dispatch(updateMessage(event.target.value))}
                    />
                    <IconButton type="button" sx={{ p: '23px' }} aria-label="search" onClick={sendMessage}>
                        <ArrowForwardIosIcon sx={{ fontSize: 30, color: theme.palette.primary.main }} />
                    </IconButton>
                </div>
            </div>
        </div>
    );

    async function sendMessage() {
        await addDoc(collection(firestore, "groups",group_id,"messages"), {
            content: message,
            sender_id: user_id,
            timestamp: serverTimestamp(),
            view_by: [user_id]
        });
    
        await updateDoc(doc(firestore, "groups", group_id), {
            updated_at: serverTimestamp(),
        });
    }
}

