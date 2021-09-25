import { Button } from '@material-ui/core';
import { getApps, initializeApp } from 'firebase/app';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { firebaseConfig } from '../config';
import { useHistory } from 'react-router-dom';
const googleProvider = new GoogleAuthProvider();

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export default function Login() {
  const history = useHistory();
  const onClick = (event) => {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider).then(() => {
      history.push('/');
    });
  };

  return (
    <>
      <Button onClick={onClick}>Sign In With Google</Button>
    </>
  );
}
