import axios from 'axios';
import { getAuth } from 'firebase/auth';

export const createContent = async (summary, file) => {
  const auth = getAuth();
  const user = await auth.currentUser?.getIdTokenResult();
  const headers = user ? { Authorization: user.token } : {};
  const { data } = await axios.post(
    `http://localhost:4200/content`,
    { summary, file },
    {
      headers,
    }
  );
  return data;
};
