import React,{useEffect} from 'react';
import AddIcon from '@mui/icons-material/Add';
import {Menu} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const PageHeader = () => {

  const navigate = useNavigate();
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
        </div>
        <div className="navbar-end">
          <AddIcon className=" text-green-1 font-bold cursor-pointer" style={{fontSize:'35px'}} aria-describedby={id} onClick={()=>navigate("/formulaire", { replace: true })}/>
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
            <MenuItem onClick={()=> {}}>
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

export default PageHeader;