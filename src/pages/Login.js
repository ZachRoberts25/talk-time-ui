import { Button } from '@material-ui/core';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
const googleProvider = new GoogleAuthProvider();

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
