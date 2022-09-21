import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axiosReq from '../config';
import { VideoType } from '../redux/videoSlice';
import Card from './Card';

type RecommendationPropsType = {
  tags?: Array<string>;
};

const Container = styled.div`
  flex: 2;
`;

const Recommendation = ({ tags }: RecommendationPropsType) => {
  const [videos, setVideos] = useState<[VideoType]>();
  const toString = tags?.join().replaceAll(' ', '');

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axiosReq({
        method: 'GET',
        reqUrl: `videos/tags?tags=${toString}`,
      });
      setVideos(res?.data);
    };
    fetchVideos();
  }, [tags]);

  console.log(videos);

  return (
    <Container>
      {videos?.map((video) => (
        <Card type='sm' key={video?._id} video={video} />
      ))}
    </Container>
  );
};

export default Recommendation;
