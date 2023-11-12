import { useState, useEffect, useContext } from 'react';

import Spinner from '../../reusable-components/spinner/spinner.component';

import ProfilePic from '../../../assets/icons/default_profile96.png';

import { ResponsiveContext } from '../../../contexts/responsive.context';
import { AuthContext } from '../../../contexts/auth.context';
import { ProfileLink, ProfileImg } from "./user-profile.styles";

const UserProfile = () => {
  const [profilePic, setProfilePic] = useState(ProfilePic);
  const [displayName, setDisplayName] = useState('');

  const { userLoading, authenticatedUser, currentUserExists } = useContext(AuthContext);
  const { isMobile } = useContext(ResponsiveContext) ;

  useEffect(() => {
      if (currentUserExists) {
        authenticatedUser.image_url && setProfilePic(authenticatedUser.image_url);
        authenticatedUser.display_name && setDisplayName(authenticatedUser.display_name);
      } else {
        setProfilePic(ProfilePic);
        setDisplayName('unknown user');
      };
  },[authenticatedUser, currentUserExists]);

  return (
    <ProfileLink isMobile={isMobile} href={`https://open.spotify.com/user/${displayName}`} target='_blank' rel="noreferrer" >
      <ProfileImg isMobile={isMobile} src={profilePic} alt='user profile picture' />
      <Spinner loading={userLoading} />
      <h2>{displayName}</h2>
    </ProfileLink>
  );
};

export default UserProfile;