import { Input } from '@material-ui/core';
import { Button, CardMedia } from '@material-ui/core';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { createContent } from '../services/content';

export const CreateContent = () => {
  const [fileInput, setFileInput] = useState();
  const { user } = useContext(AuthContext);
  const [fileUrl, setFileUrl] = useState();
  const [progress, setProgress] = useState();
  const [summary, setSummary] = useState();
  const history = useHistory();
  const fileOnChange = (e) => {
    if (e.target.files && e.target.files.length) {
      const storage = getStorage();
      const reference = ref(
        storage,
        `profile/${user.uid}/${new Date().toISOString()}`
      );
      const task = uploadBytesResumable(reference, e.target.files[0]);
      task.then((t) => {
        getDownloadURL(t.ref).then(setFileUrl);
        setProgress(undefined);
      });
      task.on('state_changed', (t) => {
        if (t.state === 'running') {
          setProgress(Math.floor((t.bytesTransferred / t.totalBytes) * 100));
        }
      });
    }
  };

  const onSubmit = () => {
    createContent(summary, fileUrl).then(() => {
      history.push(`/creator/${user.uid}`);
    });
  };

  return (
    <>
      <p>{progress}</p>
      <Input
        type='textarea'
        placeholder='Summary'
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      ></Input>
      <Button onClick={() => fileInput.click()}>Upload Profile</Button>
      <CardMedia component='video' image={fileUrl} />
      <input
        style={{ display: 'none' }}
        type='file'
        ref={setFileInput}
        onChange={fileOnChange}
      />
      <Button onClick={() => onSubmit()} disabled={!fileInput}>
        Submit
      </Button>
    </>
  );
};
