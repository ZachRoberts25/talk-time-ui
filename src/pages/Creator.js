import { useEffect, useState } from 'react';
import { Router, useHistory, useParams } from 'react-router-dom';
import { getCreator } from '../services/creator';

export default function Creator() {
  const params = useParams();
  const [creator, setCreator] = useState();
  console.log(creator);
  useEffect(() => {
    if (params) {
      getCreator(params.creatorId).then(setCreator);
    } else {
    }
  }, [params]);

  return <>individual creator page</>;
}
