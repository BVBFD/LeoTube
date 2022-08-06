import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

type MenuProps = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const Menu = ({ darkMode, setDarkMode }: MenuProps) => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  console.log(currentUser);

  return (
    <div>
      <span>Menu</span>
    </div>
  );
};

export default Menu;
