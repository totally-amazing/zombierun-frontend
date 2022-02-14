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
    this.audioController = audioController;
    this.locationRecord = locationRecord;
  }

  loadGameSound = () => {
    this.audioController.loadAudio();
  };

  pauseGameStatus = () => {
    clearInterval(this.intervalId.current);
    this.locationObj.current?.remove();
    this.intervalId.current = null;
    this.audioController.stopAllSound();
  };

  recordUserHistory = (coords) => {
    this.locationRecord.current = [
      ...this.locationRecord.current,
      {
        latitude: coords.latitude,
        longitude: coords.longitude,
      },
    ];
  };

  resetGameSetup = (resetTarget) => {
    if (resetTarget === 'timer') {
      clearInterval(this.intervalId.current);
    }

    if (resetTarget === 'timeout') {
      clearTimeout(this.timeoutId.current);
    }

    this.audioController.resetAudio();
    this.locationObj.current?.remove();
  };

  gameSoundControll = (hasEffectOn, hasMusicOn) => {
    if (hasEffectOn) {
      this.audioController.playSoundEffect();
    }

    if (hasMusicOn) {
      this.audioController.playBackgroundMusic();
    }
  };

  soundEffectVolumeControll = (volume) => {
    this.audioController.changeSoundEffectVolume(volume);
  };
}

export default GameController;
