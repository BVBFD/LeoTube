import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { format } from 'timeago.js';
import axiosReq from '../config';
import { UserType } from '../redux/userSlice';
import { VideoType } from '../redux/videoSlice';
import { mobile } from '../utils/responsive';

type CardPropsType = {
  type?: 'sm' | 'lg';
  video?: VideoType;
};

const Container = styled.div<CardPropsType>`
  width: ${(props) => props.type !== 'sm' && '360px'};
  margin-bottom: ${(props) => (props.type === 'sm' ? '10px' : '45px')};
  cursor: pointer;
  display: ${(props) => props.type === 'sm' && 'flex'};
  gap: 10px;

  ${mobile(1300, {
    width: '95vw',
    alignItems: 'center',
  })}
`;

const Image = styled.img<CardPropsType>`
  width: ${(props) => (props.type === 'sm' ? '50%' : '100%')};
  height: ${(props) => (props.type === 'sm' ? '120px' : '20vh')};
  background-color: #999;
  flex: 1;
  object-fit: contain;

  ${mobile(1300, {
    objectFit: 'cover',
    height: '100%',
  })}
  ${mobile(800, {
    objectFit: 'cover',
    height: '25vh',
  })}
  ${mobile(500, {
    objectFit: 'cover',
    height: '15vh',
  })}
`;

const Details = styled.div<CardPropsType>`
  display: flex;
  margin-top: ${(props) => props.type !== 'sm' && '16px'};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img<CardPropsType>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === 'sm' && 'none'};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type, video }: CardPropsType) => {
  const [channel, setChannel] = useState<UserType>();

  useEffect(() => {
    let cancelled = false;
    const fetchChannel = async () => {
      const res = await axiosReq({
        method: 'GET',
        reqUrl: `/users/find/${video?.userId}`,
      });

      if (!cancelled) {
        setChannel(res?.data);
      }
    };

    fetchChannel();

    return () => {
      cancelled = true;
    };
  }, [video?.userId]);

  return (
    <Link
      to={`/video/${video?._id}`}
      style={{ textDecoration: 'none', marginRight: '96px' }}
    >
      <Container type={type}>
        <Image type={type} src={video?.imgUrl} />
        <Details type={type}>
          <ChannelImage type={type} src={channel?.img} />
          <Texts>
            <Title>{video?.title}</Title>
            <ChannelName>{channel?.name}</ChannelName>
            <Info>
              {video?.views} views • {format(video?.createdAt)}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
