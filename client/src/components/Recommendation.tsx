import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from './Card';

const Container = styled.div`
  flex: 2;
`;

const Recommendation = () => {
  const [videos, setVideos] = useState<[]>();

  useEffect(() => {}, []);

  return (
    <Container>
      <Card />
    </Container>
  );
};

export default Recommendation;
