import { Button } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCreator } from '../services/creator';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { AuthContext } from '../context/AuthContext';

export default function Creator() {
  const params = useParams();
  const [creator, setCreator] = useState();
  const [fileInput, setFileInput] = useState();
  const [canEdit, setEdit] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (params) {
      getCreator(params.creatorId).then(setCreator);
    }
  }, [params]);

  useEffect(() => {
    if (user && creator) {
      if (user.uid === creator.firebaseId) {
        setEdit(true);
      }
    }
  }, [creator, user]);

  useEffect(() => {
    const storage = getStorage();
    const reference = ref(storage, `profile/${params.creatorId}`);
    getDownloadURL(reference).then(setProfileImageUrl);
  }, []);

  const fileOnChange = (e) => {
    if (e.target.files && e.target.files.length) {
      const storage = getStorage();
      const reference = ref(storage, `profile/${params.creatorId}`);
      uploadBytes(reference, e.target.files[0]).then((res) => {
        console.log(res.ref);
        getDownloadURL(res.ref).then(setProfileImageUrl);
      });
    }
  };

  return (
    <>
      {profileImageUrl && (
        <img
          src={profileImageUrl}
          onClick={() => canEdit && fileInput.click()}
          style={{
            cursor: canEdit ? 'pointer' : '',
          }}
        />
      )}
      {!profileImageUrl && canEdit && (
        <Button onClick={() => fileInput.click()}>Upload Profile</Button>
      )}
      <input
        style={{ display: 'none' }}
        type='file'
        ref={setFileInput}
        onChange={fileOnChange}
      />
      <p>{creator.bio}</p>
      <p>{creator.name}</p>
    </>
  );
}
