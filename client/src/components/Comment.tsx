import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axiosReq from '../config';
import { UserType } from '../redux/userSlice';
import { CommentPropsType } from './Comments';
import { format } from 'timeago.js';

type CommentObjPropsType = { comment: CommentPropsType };

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;

const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Comment = ({ comment }: CommentObjPropsType) => {
  const [channel, setChannel] = useState<UserType>();

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axiosReq({
        method: 'GET',
        reqUrl: `users/find/${comment?.userId}`,
      });
      setChannel(res?.data);
    };
    fetchComment();
  }, []);

  return (
    <Container>
      <Avatar src={channel?.img} />
      <Details>
        <Name>
          {channel?.name}
          <Date>{format(`${channel?.createdAt}`)}</Date>
        </Name>
        <Text>{comment.desc}</Text>
      </Details>
    </Container>
  );
};

export default Comment;
