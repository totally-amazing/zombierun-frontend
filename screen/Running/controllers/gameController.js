class GameController {
  constructor(
    intervalId,
    timeoutId,
    locationObj,
    locationRecord,
    audioController,
  ) {
    this.intervalId = intervalId;
    this.timeoutId = timeoutId;
    this.locationObj = locationObj;
    this.locationRecord = locationRecord;
    this.audioController = audioController;
  }

  loadGameSound = () => {
    this.audioController.loadAudio();
  };

  pauseGameStatus = () => {
    clearInterval(this.intervalId);
    this.locationObj?.remove();
    this.intervalId = null;
    this.audioController.stopAllSound();
  };

  recordUserLocationHistory = (coords) => {
    this.locationRecord = [
      ...this.locationRecord,
      {
        latitude: coords.latitude,
        longitude: coords.longitude,
      },
    ];
  };

  resetGameSetup = (resetTarget) => {
    if (resetTarget === 'timer') {
      clearInterval(this.intervalId);
    }

    if (resetTarget === 'timeout') {
      clearTimeout(this.timeoutId);
    }

    this.audioController.resetAudio();
    this.locationObj?.remove();
  };

  controlGameSound = (hasEffectOn, hasMusicOn) => {
    if (hasEffectOn) {
      this.audioController.playSoundEffect();
    }

    if (hasMusicOn) {
      this.audioController.playBackgroundMusic();
    }
  };

  controlSoundEffectVolume = (volume) => {
    this.audioController.changeSoundEffectVolume(volume);
  };
}

export default GameController;
