import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import axiosReq from '../config';
import { VideoType } from '../redux/videoSlice';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

type HomePropsType = {
  type: 'random' | 'trend' | 'sub';
};

const Home = ({ type }: HomePropsType) => {
  const [videos, setVideos] = useState<[VideoType]>();

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
