import { useState, useEffect, useContext } from 'react'

import Spinner from '../../reusable-components/spinner/spinner.component';

import ProfilePic from '../../../assets/icons/default_profile96.png'

import { UserContext } from '../../../contexts/user.context';

import { useMediaQuery } from '../../../utils/customHooks'
import { ProfileLink, ProfileImg } from "./user-profile.styles";

const UserProfile = () => {

    const [profilePic, setProfilePic] = useState(ProfilePic)
    const [displayName, setDisplayName] = useState('')

    const { userLoading, currentUser } = useContext(UserContext)
    const isMobile = useMediaQuery('(max-width: 1020px)')

    useEffect(() => {
        if (currentUser) {
          currentUser.imageUrl && setProfilePic(currentUser.imageUrl)
          setDisplayName(currentUser.display_name)
        } else {
          setProfilePic(ProfilePic)
          setDisplayName('unknown user')
        }
      },[currentUser])

    return (
        <ProfileLink isMobile={isMobile} href={`https://open.spotify.com/user/${displayName}`} target='_blank' rel="noreferrer" >
            <ProfileImg isMobile={isMobile} src={profilePic} />
            <Spinner loading={userLoading} />
            <h2>{displayName}</h2>
        </ProfileLink>
    )
}

export default UserProfile