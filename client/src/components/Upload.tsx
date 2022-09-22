import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import app from '../firebase';
import { useNavigate } from 'react-router-dom';
import axiosReq from '../config';

type UploadPropsType = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type InputsType = {
  title?: string;
  desc?: string;
  imgUrl?: string;
  videoUrl?: string;
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;

const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const Label = styled.label`
  font-size: 14px;
`;

const Upload = ({ setOpen }: UploadPropsType) => {
  const [img, setImg] = useState<File | null>();
  const [video, setVideo] = useState<File | null>();
  const [imgPerc, setImgPerc] = useState<number>(0);
  const [videoPerc, setVideoPerc] = useState<number>(0);
  const [inputs, setInputs] = useState<InputsType>({});
  const [tags, setTags] = useState<[]>([]);
  const [ip, setIp] = useState<string>();

  const navigate = useNavigate();

  const onClose = () => {
    setImg(null);
    setVideo(null);
    setInputs({});
    setTags([]);
    setOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    const string = e.target.value as string;

    if (string === '') {
      setTags([]);
    } else {
      const list = string.split(',') as [];
      setTags(list);
    }
  };

  // https://firebase.google.com/docs/storage/web/upload-files?authuser=0
  const uploadFile = (file: File, urlType: string) => {
    const storage = getStorage(app);
    const fileName = `${new Date().getTime()}${file?.name}`;

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        urlType === 'imgUrl' ? setImgPerc(progress) : setVideoPerc(progress);
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

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
    video && uploadFile(video as File, 'videoUrl');
  }, [video]);

  useEffect(() => {
    img && uploadFile(img as File, 'imgUrl');
  }, [img]);

  const handleUpload = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await axiosReq({
      method: 'POST',
      reqUrl: 'videos',
      body: { ...inputs, tags },
      ip,
    });
    setOpen(false);
    res?.status === 200 && navigate(`/video/${res?.data._id}`);
  };

  return (
    <Container>
      <Wrapper>
        <Close onClick={onClose}>X</Close>
        <Title>Upload a New Video</Title>
        <Label>Video:</Label>

        {videoPerc > 0 ? (
          `${videoPerc}% Uploading`
        ) : (
          <Input
            type='file'
            accept='video/*'
            onChange={(e) => {
              const fileList = e.target.files as FileList;
              setVideo(fileList[0]);
            }}
          />
        )}
        <Input
          type='text'
          placeholder='Title'
          name='title'
          onChange={handleChange}
        />
        <Desc
          placeholder='Description'
          name='desc'
          rows={8}
          onChange={handleChange}
        />
        <Input
          type='text'
          placeholder='Seperate the tags with commas.'
          onChange={handleTags}
        />
        <Label>Image:</Label>
        {imgPerc > 0 ? (
          `${imgPerc}% Uploading`
        ) : (
          <Input
            type='file'
            accept='image/*'
            onChange={(e) => {
              const fileList = e.target.files as FileList;
              setImg(fileList[0]);
            }}
          />
        )}
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;
