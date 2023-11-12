import { useContext, FC, InputHTMLAttributes, ChangeEvent } from "react";

import { TrackContext } from "../../../contexts/track.context";

import { NameInput } from "./playlist-name-input.styles";

type PlaylistNameInputProps = {
  width?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const PlaylistNameInput: FC<PlaylistNameInputProps> = ({ width }) => {
  const { playlistName, setPlaylistName } = useContext(TrackContext);
    
  const clearInput = () => {
   setPlaylistName('');
  };
  
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
   setPlaylistName(e.target.value);
  };

  return (
    <NameInput 
      placeholder={"Name Your New Playlist"}
      value={playlistName}
      onClick={clearInput}
      onChange={handleNameChange}
      width={width || '287px'}
    />
  );
};

export default PlaylistNameInput;