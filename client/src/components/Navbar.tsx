import {
  AccountCircleOutlined,
  LogoutOutlined,
  SearchOutlined,
  VideoCallOutlined,
} from '@mui/icons-material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axiosReq from '../config';
import { RootState } from '../redux/store';
import { logout } from '../redux/userSlice';
import { mobile } from '../utils/responsive';
import Upload from './Upload';

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
  ${mobile(1300, { width: '100vw' })}
  ${mobile(800, { justifyContent: 'space-between' })}
  ${mobile(500, { padding: '0' })}
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
  ${mobile(1300, { width: '40%' })}
  ${mobile(800, { width: '35%' })}
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
  font-size: 18px;
  ${mobile(500, { fontSize: 'none' })}
`;

const Button = styled.button`
  padding: 5px 15px;
  margin-left: 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  ${mobile(500, {
    width: 'fitContent',
    padding: '5px 5px',
    marginRight: '15px',
    position: 'relative',
    right: '5%',
  })}
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  ${mobile(1300, {
    display: 'none',
  })}
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
  ${mobile(500, {
    display: 'none',
  })}
`;

const Home = styled.button`
  position: absolute;
  top: 14px;
  left: 0;
  z-index: 99999999999999;

  padding: 5px 15px;
  margin-left: 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Navbar = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [q, setQ] = useState<string>('');

  const regExp = (str: string) => {
    var reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    if (reg.test(str)) {
      return str.replace(reg, '');
    } else {
      return str;
    }
  };

  const handleLogout = async () => {
    try {
      await axiosReq({
        method: 'GET',
        reqUrl: 'auth/logout',
      });
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Link to='/'>
            <Home>Home</Home>
          </Link>
          <Search
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                navigate(`/search?q=${q}`);
              }
            }}
          >
            <Input
              placeholder='Search'
              onChange={(e) => setQ(regExp(e.target.value))}
            />
            <SearchOutlined
              style={{ cursor: 'pointer', position: 'absolute', right: '0' }}
              onClick={() => navigate(`/search?q=${q}`)}
            />
          </Search>
          {currentUser ? (
            <>
              <User>
                <VideoCallOutlined
                  style={{ cursor: 'pointer' }}
                  onClick={() => setOpen(true)}
                />
                <Avatar src={currentUser.img} />
                {currentUser.name}
              </User>
              <Button onClick={handleLogout}>
                <LogoutOutlined />
              </Button>
            </>
          ) : (
            <Link to='signin' style={{ textDecoration: 'none' }}>
              <Button>SIGN IN</Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
