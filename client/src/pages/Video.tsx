import {
  AddTaskOutlined,
  ReplyOutlined,
  ThumbDown,
  ThumbDownOutlined,
  ThumbUp,
  ThumbUpOutlined,
} from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Comments from '../components/Comments';
import Recommendation from '../components/Recommendation';
import axiosReq from '../config';
import { RootState } from '../redux/store';
import { UserType } from '../redux/userSlice';
import {
  fetchSuccess,
  like,
  dislike,
  pullLike,
  pullDislike,
} from '../redux/videoSlice';
import { subscription } from '../redux/userSlice';
import { mobile } from '../utils/responsive';

type SubsProps = {
  clr?: boolean;
};

const Container = styled.div`
  display: flex;
  gap: 24px;
  ${mobile(1300, {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
  })}
  ${mobile(800, {
    flexDirection: 'column',
    height: '100vh',
  })}
`;

const Content = styled.div`
  flex: 5;
  ${mobile(1300, { flex: '0' })}
  ${mobile(800, {
    flex: 0,
  })}
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button<SubsProps>`
  background-color: ${(props) => (props.clr ? '#5f5f5f' : '#cc1a00')};
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    background-color: #5f5f5f;
  }
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const Video = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { currentVideo } = useSelector((state: RootState) => state.video);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split('/')[2];
  const [channel, setChannel] = useState<UserType>();
  const [ip, setIp] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axiosReq({
          method: 'GET',
          reqUrl: `videos/find/${path}`,
        });

        const { userId } = videoRes?.data;
        const channelRes = await axiosReq({
          method: 'GET',
          reqUrl: `users/find/${userId}`,
        });

        dispatch(fetchSuccess(videoRes?.data));
        setChannel(channelRes?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      dispatch(fetchSuccess(null));
    };
  }, [path, dispatch]);

  useEffect(() => {
    const getIp = async () => {
      const res = await axiosReq({
        method: 'GetNormal',
        reqUrl: 'https://geolocation-db.com/json/',
      });
      setIp(res?.data.IPv4);
    };

    getIp();
  }, [path, dispatch]);

  const handleLike = async () => {
    if (currentVideo?.likes?.includes(`${currentUser?._id}`)) {
      await axiosReq({
        method: 'PUT',
        reqUrl: `users/pullLike/${currentVideo?._id}`,
        ip,
      });
      dispatch(pullLike(currentUser?._id));
    } else {
      await axiosReq({
        method: 'PUT',
        reqUrl: `users/like/${currentVideo?._id}`,
        ip,
      });
      dispatch(like(currentUser?._id));
    }
  };

  const handleDislike = async () => {
    if (currentVideo?.dislikes?.includes(`${currentUser?._id}`)) {
      await axiosReq({
        method: 'PUT',
        reqUrl: `users/pullDislike/${currentVideo?._id}`,
        ip,
      });
      dispatch(pullDislike(currentUser?._id));
    } else {
      await axiosReq({
        method: 'PUT',
        reqUrl: `users/dislike/${currentVideo?._id}`,
        ip,
      });
      dispatch(dislike(currentUser?._id));
    }
  };

  const handleSub = async () => {
    currentUser?.subscribedUsers?.includes(`${channel?._id}`)
      ? await axiosReq({
          method: 'PUT',
          reqUrl: `users/unsub/${channel?._id}`,
          ip,
        })
      : await axiosReq({
          method: 'PUT',
          reqUrl: `users/sub/${channel?._id}`,
          ip,
        });
    dispatch(subscription(channel?._id));
  };

  return !currentVideo ? (
    <Container
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '80%',
        transform: 'scale(2)',
      }}
    >
      <CircularProgress />
    </Container>
  ) : (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame
            src={currentVideo?.videoUrl}
            poster={currentVideo?.imgUrl === '' ? '' : currentVideo?.imgUrl}
            controls
          />
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>{currentVideo?.desc}</Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo?.likes?.includes(currentUser?._id as any) ? (
                <ThumbUp />
              ) : (
                <ThumbUpOutlined />
              )}
              {currentVideo?.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo?.dislikes?.includes(currentUser?._id as any) ? (
                <ThumbDown />
              ) : (
                <ThumbDownOutlined />
              )}
            </Button>
            <Button>
              <ReplyOutlined />
            </Button>
            <Button>
              <AddTaskOutlined />
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel?.img} />
            <ChannelDetail>
              <ChannelName>{channel?.name}</ChannelName>
              <ChannelCounter>
                {channel?.subscribedUsers?.length} subscribers
              </ChannelCounter>
              <Description>{channel?.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe
            onClick={handleSub}
            clr={currentUser?.subscribedUsers?.includes(`${channel?._id}`)}
          >
            {currentUser?.subscribedUsers?.includes(`${channel?._id}`)
              ? 'SUBSCRIBED'
              : 'SUBSCRIBE'}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo?._id} />
      </Content>
      <Recommendation tags={currentVideo?.tags} />
    </Container>
  );
};

export default Video;
