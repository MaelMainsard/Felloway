import React, { useState, useEffect,useRef  } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { faker } from '@faker-js/faker';
import { useSwipeable } from 'react-swipeable';

export const MatchPage = () => {
    const theme = useTheme();
    const [accept, setAccept] = useState(null)
    
    const variants = {
        normal: {
            rotate: 0.5,
            x:0,
        },
        accept: {
            rotate: 10,
            x: 400,
        },
        decline: {
            rotate: -10,
            x: -400
        }
    }

    function swipe(bool) {
        setAccept(bool);
        setTimeout(() => {
            setAccept(null);
        }, 500);
    }

    const userTest = [
        {
            name: faker.person.fullName(),
            age: faker.number.int({ min: 10, max: 50}),
            image: faker.image.avatar()
        }
    ]

    const handlers = useSwipeable({
        onSwipedLeft: () => swipe(false),
        onSwipedRight: () => swipe(true),
        swipeDuration: 500,
        preventScrollOnSwipe: true,
        trackMouse: true
      });




    return(
        <div className="h-full w-full flex flex-col overflow-y-auto overflow-x-hidden relative justify-between mb-10">
            <div className='mt-10 w-full flex justify-center'>
                <div style={{ backgroundColor: theme.palette.common.white}} className='w-9/12 h-96 absolute rounded-2xl shadow-[0px_3px_10px_7px_#4870621F]'></div>
                <div style={{ backgroundColor: theme.palette.common.white}} className='w-9/12 h-96 absolute rotate-6 rounded-2xl shadow-[0px_3px_10px_7px_#4870621F]'></div>
                <div style={{ backgroundColor: theme.palette.common.white}} className='w-9/12 h-96 p-4 absolute  -rotate-3 rounded-2xl shadow-[0px_3px_10px_7px_#4870621F]'>
                    <img className='object-cover rounded-2xl h-full w-full' src={userTest[0].image}/>
                </div>

                <motion.div
                    initial={{ rotate: 0.5 }}
                    variants={variants}
                    animate={accept != null ? accept ? "accept" : "decline" : "normal"}
                    transition={{ duration: 0.2}} 
                    className='w-full flex justify-center'
                >
                    <div {...handlers} style={{ backgroundColor: theme.palette.common.white}} className='w-9/12 h-96 p-4  rounded-2xl shadow-[0px_3px_10px_7px_#4870621F]'>
                        <img className='object-cover rounded-2xl h-full w-full' src={userTest[0].image}/>
                    </div>
                </motion.div>
            </div>

            <div className='flex flex-col items-center mt-5'>
                <span className='text-xl font-semibold'>{userTest[0].name}</span>
                <span className='text-md font-semibold'>{userTest[0].age}</span>
            </div>

            <div className='w-full flex justify-between px-12'>
                <CloseIcon  style={{ color: theme.palette.match.close}} sx={{ fontSize: 70}} onClick={()=>swipe(false)}/>
                <FavoriteIcon  style={{ color: theme.palette.match.heart}} sx={{ fontSize: 70 }} onClick={()=>swipe(true)}/>
            </div>
        </div>
    )
}