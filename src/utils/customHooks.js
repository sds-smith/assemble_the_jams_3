import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { setAccessToken, setAuthSession } from "../store/auth/auth.action"


export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
}

// export const useSignOut = async (session) => {
  // const dispatch = useDispatch()
// 
  // if (session) {
    // await fetch('/.netlify/functions/delete-auth-doc', {
      // method: 'post',
      // headers: {
        // 'Content-Type': 'application/json'
      // },
      // body: JSON.stringify({ session })
  // })
  // }
  // dispatch(setAuthSession(''))
  // dispatch(setAccessToken(''))
// }