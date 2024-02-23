
import React, { useState, useEffect,useRef  } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PersonIcon from '@mui/icons-material/Person';
import { motion, useAnimation, useInView } from 'framer-motion';

export const BottomNavBar = () => {
    const mainControls = useAnimation();
    const targetRef = useRef(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
          if (targetRef.current) {
            const targetWidth = targetRef.current.getBoundingClientRect().width;
            setWidth(targetWidth);
        }
    }, [targetRef.current]);

    const navigate = useNavigate();
    const location = useLocation();

    // Déterminez la valeur initiale en fonction du chemin de l'URL actuel
    const initialValue = (() => {
        switch (location.pathname) {
        case '/home':
            return 'home';
        case '/chat':
            return 'chat';
        case '/profil':
            return 'profil';
        case '/settings':
            return 'profil';
        default:
            return 'home'; // Valeur par défaut
        }
    })();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    
        switch (newValue) {
          case 'home':
            navigate("/home", { replace: true });
            break;
          case 'chat':
            navigate("/chat", { replace: true });
            break;
          case 'profil':
            navigate("/profil", { replace: true });
            break;
          default:
            break;
        }
      };

    const [value, setValue] = React.useState(initialValue);
    
    return(
        <div className=" bg-light-backgroud">
            <div className='pl-5 pr-7 pb-2 shadow-[0px_-5px_6px_0px_#00000024] rounded-t-xl '>
                <motion.div
                    initial={{ x: 5 }}
                    animate={mainControls}
                    transition={{ duration: 0.3}}
                    className='relative w-fit'
                >
                    <div className='w-14 h-1 bg-light-primary absolute rounded-full'></div>
                </motion.div>
                <div ref={targetRef} className='flex flex-row items-center justify-between pt-2'>
                    <img src="/Logo.svg" className=" w-16" onClick={()=>{mainControls.start({x: 5}),handleChange('home')}}/>
                    <EmojiEventsIcon className='text-light-primary' sx={{ fontSize: 45 }} onClick={()=>mainControls.start({x: (width-25)/3})}/>
                    <QuestionAnswerIcon className='text-light-primary' sx={{ fontSize: 45 }} onClick={()=>{mainControls.start({x: (width-25)/1.6}),handleChange('chat')}}/>
                    <PersonIcon className='text-light-primary' sx={{ fontSize: 45 }} onClick={()=>{mainControls.start({x: width-50}),handleChange('profile')}}/>
                </div>
            </div>
        </div>
    );
}