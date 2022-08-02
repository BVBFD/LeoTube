import express from 'express';
import session from 'express-session';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TEST: string;
      MONGO_DB_URL: string;
      PORT: 8080;
      JWT: string;
      SESS: string;
    }
  }

  namespace Express {
    interface Request {
      user?: Record<Object | String>;
    }
  }

  // models interface
  interface DocumentResult<T> extends Document {
    _doc: T;
  }

  interface UserImpl extends DocumentResult<UserImpl> {
    _id: string;
    name: string;
    email: string;
    password: string;
    img?: string;
    subscribers?: number;
    subscribedUsers?: string[];
    fromGoogle?: boolean;
    createdAt?: number;
    updatedAt?: number;
    _v?: Int32List;
  }

  interface CommentImpl extends DocumentResult<CommentImpl> {
    _id: string;
    userId: string;
    videoId: string;
    desc: string;
    createdAt?: number;
    updatedAt?: number;
    _v?: Int32List;
  }

  interface VideoImpl extends DocumentResult<VideoImpl> {
    _id: string;
    userId: string;
    title: string;
    desc?: string;
    imgUrl?: string;
    videoUrl: string;
    views?: number;
    tags?: string[];
    likes?: string[];
    dislikes?: string[];
    createdAt?: number;
    updatedAt?: number;
    _v?: Int32List;
  }

  type ErrorType = {
    status?: number;
    message?: string;
  };
}

declare module 'express-session' {
  export interface SessionData {
    token?: string;
    ip?: string | string[];
  }
}

// 내가 임의로 만든 정의.
// declare global로 기존에 정의되어있던
// 인터페이스를 확장했음.
