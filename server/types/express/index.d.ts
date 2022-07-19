import express from 'express';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TEST: string;
      MONGO_DB_URL: string;
      PORT: 8080;
    }
  }

  namespace Express {
    interface Request {
      user?: Record<Object | String>;
    }
  }

  interface DocumentResult<T> extends Document {
    _doc: T;
  }
}

// 내가 임의로 만든 정의.
// declare global로 기존에 정의되어있던
// 인터페이스를 확장했음.
