import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import axiosReq from '../config';
import { RootState } from '../redux/store';
import Comment from './Comment';

type CommentsPropsType = {
  videoId?: string;
};

type CommentPropsType = {
  _id?: string;
  desc?: string;
  userId?: string;
  videoId?: string;
  mainCommentId?: string;
  subCommentId?: Array<string>;
};

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Button = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
  padding: 10px;
  cursor: pointer;
  position: relative;
  bottom: 5px;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    background-color: #5f5f5f;
  }
`;

const Comments = ({ videoId }: CommentsPropsType) => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { currentVideo } = useSelector((state: RootState) => state.video);
  const [comments, setComments] = useState<CommentPropsType[]>([]);
  const [newComment, setNewComment] = useState<CommentPropsType>();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axiosReq({
          method: 'GET',
          reqUrl: `comments/${videoId}`,
        });
        setComments(res?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments();
    setNewComment({
      videoId: currentVideo?._id,
    });
  }, [videoId]);

  const addComment = async () => {
    if (newComment?.desc == '' || newComment?.desc == null) {
      return;
    }

    const res = await axiosReq({
      method: 'POST',
      reqUrl: `comments`,
      body: newComment,
    });
    setComments([...comments, res?.data]);
  };

  return (
    <Container>
      {currentUser ? (
        <NewComment>
          <Avatar src={currentUser?.img} />
          <Input
            onChange={(e) =>
              setNewComment({
                ...newComment,
                desc: e.target.value,
              })
            }
            placeholder='Add a comment...'
          />
          <Button onClick={addComment}>Comment</Button>
        </NewComment>
      ) : (
        <></>
      )}
      {comments?.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export type { CommentPropsType };
export default Comments;
