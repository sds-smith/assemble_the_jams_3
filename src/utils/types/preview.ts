
export const Preview = {
    playPreview(audioPreview: HTMLAudioElement) {
        audioPreview
        .play()
        .catch((error: Error) => {
          console.log(error);
        });
    }
}