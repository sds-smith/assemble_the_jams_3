

export const Preview = {
    playPreview(audioPreview) {
        audioPreview
        .play()
        .catch((error) => {
          console.log(error);
        });
    }
}