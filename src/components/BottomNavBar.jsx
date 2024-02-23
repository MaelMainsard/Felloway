
import React, { useState, useEffect,useRef  } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PersonIcon from '@mui/icons-material/Person';
import { motion, useAnimation } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux'
import { setValue } from '../features/BottomNavBarSlice'
import { useTheme } from '@mui/material';

export const BottomNavBar = () => {
    const mainControls = useAnimation();
    const targetRef = useRef(null);
    const [width, setWidth] = useState(0);
    const position = useSelector((state) => state.BottomNavBarSlice.value)
    const dispatch = useDispatch()
    const theme = useTheme();

    useEffect(() => {
          if (targetRef.current) {
            const targetWidth = targetRef.current.getBoundingClientRect().width;
            setWidth(targetWidth);
        }
    }, [targetRef.current]);

    const navigate = useNavigate();

    const handleChange = async ( newValue) => {
    
        switch (newValue) {
          case 'home':
            dispatch(setValue(5));
            await new Promise(resolve => setTimeout(resolve, 300));
            navigate("/home", { replace: true });
            break;
          case 'chat':
            dispatch(setValue((width-25)/1.6));
            await new Promise(resolve => setTimeout(resolve, 300));
            navigate("/chat", { replace: true });
            break;
          case 'profil':
            dispatch(setValue(width-50));
            await new Promise(resolve => setTimeout(resolve, 300));
            navigate("/profil", { replace: true });
            break;
          default:
            break;
        }
      };

    
    return(
        <div style={{ backgroundColor: theme.palette.common.white}}>
            <div className='pl-5 pr-7 pb-2 shadow-[0px_-5px_6px_0px_#00000024] rounded-t-xl '>
                <motion.div
                    initial={{ x: position }}
                    animate={mainControls}
                    transition={{ duration: 0.3}}
                    className='relative w-fit'
                >
                    <div className='w-14 h-1 absolute rounded-full' style={{ backgroundColor: theme.palette.primary.main}}></div>
                </motion.div>
                <div ref={targetRef} className='flex flex-row items-center justify-between pt-2'>
                    <img src="/Logo.svg" className=" w-16" onClick={()=>{mainControls.start({x: 5}),handleChange('home')}}/>
                    <EmojiEventsIcon  style={{ color: theme.palette.primary.main}} sx={{ fontSize: 45 }} onClick={()=>mainControls.start({x: (width-25)/3})}/>
                    <QuestionAnswerIcon  style={{ color: theme.palette.primary.main}} sx={{ fontSize: 45 }} onClick={()=>{mainControls.start({x: (width-25)/1.6}),handleChange('chat')}}/>
                    <PersonIcon  style={{ color: theme.palette.primary.main}} sx={{ fontSize: 45 }} onClick={()=>{mainControls.start({x: width-50}),handleChange('profil')}}/>
                </div>
            </div>
        </div>
    );
}