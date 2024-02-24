import { useTheme } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export const ChatMenu = () => {
    const theme = useTheme();

    return (
        <div className="flex flex-col h-full">
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
        </div>
    );
}