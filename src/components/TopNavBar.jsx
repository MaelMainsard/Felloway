import { useTheme } from '@mui/material';
import LogoName from '../assets/FellowayLogoName.svg'
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

export const TopNavBar = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    return(
        <div className='flex flex-row justify-between px-8 py-3 items-center'>
            <MenuIcon sx={{fontSize: 45, color: theme.palette.primary.main}}/>
            <img src={LogoName} className=' w-40 h-20'/>
            <AddIcon sx={{fontSize: 45, color: theme.palette.primary.main}} onClick={()=>navigate('/destination')}/>

        </div>
    );

}