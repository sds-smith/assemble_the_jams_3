

export const Preview = {
    async playPreview(audioPreview) {
        audioPreview
        .play()
        .catch((error) => {
          console.log(error);
        });
    }
}