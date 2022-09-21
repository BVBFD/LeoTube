import {
  AccountCircleOutlined,
  LogoutOutlined,
  SearchOutlined,
  VideoCallOutlined,
} from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axiosReq from '../config';
import { RootState } from '../redux/store';
import { logout } from '../redux/userSlice';
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
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
  font-size: 18px;
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
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const Navbar = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [q, setQ] = useState<string>('');

  // 특수 문자 제거하기
  const regExp = (str: string) => {
    var reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    //특수문자 검증
    if (reg.test(str)) {
      //특수문자 제거후 리턴
      return str.replace(reg, '');
    } else {
      //특수문자가 없으므로 본래 문자 리턴
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
              style={{ cursor: 'pointer' }}
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
              <Button>
                <AccountCircleOutlined />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
