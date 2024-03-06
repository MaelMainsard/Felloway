import React, { useState,useRef } from 'react';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { newMessage,uploadPicture } from "../lib/script"
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import {Menu} from '@mui/material';


const ChatPageFooter = ({ task, updateTask }) => {

    const fileInputRef = useRef(null);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSend()
      }
    };

    const handleSend = () => {

      if(task.messages_input_footer.length !== 0) {
        updateTask({messages_input_footer: ''})
        newMessage(task.chat_id, task.messages_input_footer);
      }
    }

    const handleImageChange = (e) => {
      if (e.target.files[0]) {
        updateTask({add_pic: e.target.files[0]})
      }
    };

    const handleClickInsertPhoto = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }

    };

    return (
      <div className="pr-6 pl-6 pt-4 pb-4 w-full">
        <div className={`w-full flex flex-row items-center ${!task.add_pic ? 'justify-between' : 'justify-end'}`}>
          {!task.add_pic && (
            <>
            <AddCircleIcon className='text-green-1 cursor-pointer absolute ml-3' onClick={handleClick} onMouseEnter={handleClick}/>
            <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                width: 'fit',
              },
            }}
            transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          >
            <MenuItem onClick={handleClickInsertPhoto}>
                  <ListItemIcon>
                    <div>
                      <label htmlFor="file-input" className="cursor-pointer">
                        <InsertPhotoIcon />
                      </label>
                      <input
                        id="file-input"
                        type="file"
                        onChange={handleImageChange}
                        multiple={true}
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }} // Cacher l'input file
                      />
                    </div>
                  </ListItemIcon>
              <ListItemText>Ajouter une image</ListItemText>
            </MenuItem>
          </Menu>
          </>
            
          )}
          <div className=' w-full flex flex-row justify-end items-center mr-2'>
            <input
              className={`input rounded-full  bg-white w-full border-none ${!task.add_pic ? 'pl-12 pr-12' : 'pr-20' } shadow-md`}
              placeholder="Envoyer un message..."
              value={task.messages_input_footer}
              onChange={(e) => updateTask({messages_input_footer: e.target.value})}
              onKeyPress={handleKeyPress} // Ajout du gestionnaire d'événements
            />
            {!task.add_pic && (
            <SendIcon
                className="cursor-pointer text-green-1 mr-2 absolute"
                onClick={()=> handleSend()}
              />
            )}
          </div>
          {task.add_pic && (
            !task.upload ? (
              <div className='absolute mr-4 space-x-2'>
                <DeleteIcon
                  className="cursor-pointer text-red-1"
                  onClick={() => {updateTask({ add_pic: '' });handleClose()}}
                />
                <SendIcon
                  className="cursor-pointer text-green-1"
                  onClick={() => {uploadPicture(task, updateTask);updateTask({upload:true});handleClose()}}
                />
              </div>
            ) : (
              <span className="loading loading-spinner loading-md  absolute mr-6 text-yellow-1"></span>
            )
          )}

        </div>
      </div>
    );
  };
  
  export default ChatPageFooter;
