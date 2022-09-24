import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import axiosReq from '../config';
import { VideoType } from '../redux/videoSlice';
import { mobile } from '../utils/responsive';

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  ${mobile(1300, {
    justifyContent: 'space-between',
  })}
  ${mobile(800, {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
  })}
`;

type HomePropsType = {
  type: 'random' | 'trend' | 'sub';
};

const Home = ({ type }: HomePropsType) => {
  const [videos, setVideos] = useState<[VideoType]>();
  const [ip, setIp] = useState();

  useEffect(() => {
    const getIp = async () => {
      const res = await axiosReq({
        method: 'GetNormal',
        reqUrl: 'https://geolocation-db.com/json/',
      });
      setIp(res?.data.IPv4);
    };

    getIp();
  }, []);

  useEffect(() => {
    let cancelled = false;
    const fetchVideos = async () => {
      const res = await axiosReq({ method: 'GET', reqUrl: `videos/${type}` });

      if (!cancelled) {
        setVideos(res?.data);
      }
    };

    fetchVideos();

    return () => {
      cancelled = true;
    };
  }, [type]);

  return (
    <Container>
      {videos?.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Home;
