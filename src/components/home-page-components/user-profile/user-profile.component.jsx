import { useState, useEffect } from 'react'

import ProfilePic from '../../../assets/icons/default_profile96.png'

import { ProfileLink, ProfileImg } from "./user-profile.styles";

const UserProfile = ({currentUser}) => {

    const [profilePic, setProfilePic] = useState(ProfilePic)
    const [displayName, setDisplayName] = useState('')

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