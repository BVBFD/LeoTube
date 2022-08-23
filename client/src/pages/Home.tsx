import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = () => {
  const [videos, setVideos] = useState<[]>();

  return (
    <Container>
      <Card />
    </Container>
  );
};

export default Home;
