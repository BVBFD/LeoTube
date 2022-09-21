import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../components/Card';
import axiosReq from '../config';
import { VideoType } from '../redux/videoSlice';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Search = () => {
  const [videos, setVideos] = useState<[VideoType]>();
  const query = useLocation()
    .search?.toString()
    .replaceAll('%20', '')
    .toLowerCase();

  console.log(query);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axiosReq({
        method: 'GET',
        reqUrl: `videos/search${query}`,
      });
      console.log(res?.data);

      setVideos(res?.data);
    };
    fetchVideos();
  }, [query]);

  return (
    <Container>
      {videos?.map((video) => (
        <Card type='lg' video={video} />
      ))}
    </Container>
  );
};

export default Search;
