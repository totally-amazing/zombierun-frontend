import { Audio } from 'expo-av';

class AudioController {
  constructor() {
    this.backgroundMusicSource = require('../../../assets/sounds/background.mp3');
    this.soundEffectSource = require('../../../assets/sounds/zombieSound.mp3');
    this.backgroundAudio = '';
    this.soundEffectAudio = '';
  }

  resetAudio = async () => {
    await this.backgroundAudio.unloadAsync();
    await this.soundEffectAudio.unloadAsync();
  };

  loadAudio = async () => {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      playThroughEarpieceAndroid: false,
    });

    this.backgroundAudio = new Audio.Sound();
    this.soundEffectAudio = new Audio.Sound();

    this.backgroundAudio.loadAsync(this.backgroundMusicSource, {
      isLooping: true,
      shouldPlay: false,
    });
    this.soundEffectAudio.loadAsync(this.soundEffectSource, {
      isLooping: true,
      shouldPlay: false,
    });
  };

  playBackgroundMusic = async () => {
    this.backgroundAudio.playAsync();
  };

  playSoundEffect = async () => {
    this.soundEffectAudio.playAsync();
  };

  playAllSound = async () => {
    this.backgroundAudio.playAsync();
    this.soundEffectAudio.playAsync();
  };

  stopAllSound = async () => {
    this.backgroundAudio.pauseAsync();
    this.soundEffectAudio.pauseAsync();
  };

  changeSoundEffectVolume = async (volume) => {
    this.soundEffectAudio.setVolumeAsync(volume);
  };
}

export default AudioController;
