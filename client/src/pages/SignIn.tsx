import axios from 'axios';
import React, { FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axiosReq from '../config';
import { RootState } from '../redux/store';
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div``;

const Link = styled.span`
  margin: 10px;
`;

const SignIn = () => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [ip, setIp] = useState<string>();
  const { loading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let cancelled = false;
  const handleLogin = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axiosReq({
        method: 'POST',
        reqUrl: 'auth/signin',
        body: { name, password },
        ip,
      });
      if (!cancelled) {
        dispatch(loginSuccess(res?.data));
        return navigate('/');
      }
    } catch (error) {
      console.log(error);
      dispatch(loginFailure());
      return;
    }
  };

  useEffect(() => {
    const getIp = async () => {
      const res = await axiosReq({
        method: 'GetNormal',
        reqUrl: 'https://geolocation-db.com/json/',
      });
      setIp(res?.data.IPv4);
    };

    getIp();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue LeoTube</SubTitle>
        <Input
          placeholder='username'
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type='password'
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button disabled={loading} onClick={handleLogin}>
          Sign in
        </Button>
        <Title>or</Title>
        <Button disabled={loading}>Signin with Google</Button>
        <Title>or</Title>
        <Input
          placeholder='username'
          onChange={(e) => setName(e.target.value)}
        />
        <Input placeholder='email' onChange={(e) => setEmail(e.target.value)} />
        <Input
          type='password'
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button disabled={loading}>Sign up</Button>
      </Wrapper>
      <More>
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
