import React from 'react'
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
  } from "@material-tailwind/react";
import { useNavigate } from 'react-router';

function Profile(props) {
    let navigate=useNavigate()
    return (
        <Menu>
          <MenuHandler>
            <Button className='bg-custom-black cursor-pointer'>{props.name}</Button>
          </MenuHandler>
          <MenuList>
          <MenuItem className='lg:hidden' onClick={()=>{navigate("/favourites")}}>Favourites</MenuItem>
            <MenuItem onClick={props.onClick}>Log out</MenuItem>
          </MenuList>
        </Menu>
      );
}

export default Profile
