import { useState, useEffect, useContext } from 'react'
import { useSelector } from 'react-redux';

import Spinner from '../../reusable-components/spinner/spinner.component';

import ProfilePic from '../../../assets/icons/default_profile96.png'

import { selectUserLoading, selectCurrentUser, selectCurrentUserExists } from '../../../store/user/user.selector';

import { ResponsiveContext } from '../../../contexts/responsive.context';
import { ProfileLink, ProfileImg } from "./user-profile.styles";

const UserProfile = () => {

    const [profilePic, setProfilePic] = useState(ProfilePic)
    const [displayName, setDisplayName] = useState('')

    const userLoading = useSelector(selectUserLoading)
    const currentUser = useSelector(selectCurrentUser)
    const currentUserExists = useSelector(selectCurrentUserExists)
    const { isMobile } = useContext(ResponsiveContext) 

    useEffect(() => {
        if (currentUserExists) {
          currentUser.image_url && setProfilePic(currentUser.image_url)
          currentUser.display_name && setDisplayName(currentUser.display_name)
        } else {
          setProfilePic(ProfilePic)
          setDisplayName('unknown user')
        }
      },[currentUser, currentUserExists])

    return (
        <ProfileLink isMobile={isMobile} href={`https://open.spotify.com/user/${displayName}`} target='_blank' rel="noreferrer" >
            <ProfileImg isMobile={isMobile} src={profilePic} />
            <Spinner loading={userLoading} />
            <h2>{displayName}</h2>
        </ProfileLink>
    )
}

export default UserProfile