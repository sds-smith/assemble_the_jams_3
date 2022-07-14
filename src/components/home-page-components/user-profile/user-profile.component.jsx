import { useState, useEffect, useContext } from 'react'

import ProfilePic from '../../../assets/icons/default_profile96.png'
import { UserContext } from '../../../contexts/user.context';
import { ProfileLink, ProfileImg } from "./user-profile.styles";

const UserProfile = () => {

    const [profilePic, setProfilePic] = useState(ProfilePic)
    const [displayName, setDisplayName] = useState('')

    const { currentUser } = useContext(UserContext)

    useEffect(() => {
        if (currentUser) {
          currentUser.images.length && setProfilePic(currentUser.images[0].url)
          setDisplayName(currentUser.display_name)
        }
      },[currentUser])

    return (
        <ProfileLink href={`https://open.spotify.com/user/${displayName}`} target='_blank' rel="noreferrer" >
            <ProfileImg src={profilePic} />
            <h2>{displayName}</h2>
        </ProfileLink>
    )
}

export default UserProfile