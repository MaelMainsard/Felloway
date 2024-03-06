import React,{useEffect} from 'react';
import AddIcon from '@mui/icons-material/Add';
import {Menu} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { Box } from "@mui/material";


const ChatMenuHeader = ({task, updateTask}) => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className='mr-3 ml-3'>
      <div className="navbar">
        <div className="navbar-start">
          <MenuIcon className=" text-green-1 font-bold cursor-pointer" style={{ fontSize: '35px' }}/>
        </div>
        <div className='navbar-center'>
        <Box className='mt-3' style={{ width: '200px', height: '65px', overflow: 'hidden' }}>
          <img
            src="/static/FellowayCombinaison.svg"
            alt="logo"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
          
        {/* <div className="rounded-full p-1 bg-grey-1">
        <button
          type="button"  // Assurez-vous d'ajuster le type en fonction de vos besoins
          className={`w-20 h-8 rounded-full ${!task.show_preview_dm ? ' bg-grey-1 text-font-2' : ' bg-yellow-1 text-white'}`}
          onClick={() => updateTask({show_preview_dm:true})}
        >
          DM
        </button>
        <button
          type="button"
          className={` w-20 h-8 rounded-full ${task.show_preview_dm ? ' bg-grey-1 text-font-2' : ' bg-yellow-1 text-white'}`}
          onClick={() => updateTask({show_preview_dm:false})}
        >
          Groupes
        </button>
      </div> */}
        </div>
        <div className="navbar-end">
          <AddIcon className=" text-green-1 font-bold cursor-pointer" style={{fontSize:'35px'}} aria-describedby={id} onClick={task.window_width < 640 ? handleClick : undefined} onMouseEnter={task.window_width >= 640 ? handleClick : undefined}/>
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
            <MenuItem onClick={()=> {updateTask({show_modal_new_conv:true});handleClose()}}>
              <ListItemIcon>
                <AddCommentIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Nouvelle discution</ListItemText>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default ChatMenuHeader;
