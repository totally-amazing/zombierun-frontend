import { Audio } from 'expo-av';

export default class AudioController {
  constructor(onSoundEffect, onBackgroundMusic) {
    this.backgroundSource = require('../../assets/sounds/background.mp3');
    this.soundEffectSource = require('../../assets/sounds/zombieSound.mp3');
    this.backgroundAudio = new Audio.Sound();
    this.soundEffectAudio = new Audio.Sound();
    this.onSoundEffect = onSoundEffect;
    this.onBackgroundMusic = onBackgroundMusic;
  }

  resetAudio = async () => {
    await this.backgroundAudio.unloadAsync();
    await this.soundEffectAudio.unloadAsync();
  };

  loadAudio = async () => {
    if (this.onBackgroundMusic) {
      this.backgroundAudio.loadAsync(this.backgroundSource, {
        isLooping: true,
        shouldPlay: false,
      });
    }

    if (this.onSoundEffect) {
      this.soundEffectAudio.loadAsync(this.soundEffectSource, {
        isLooping: true,
        shouldPlay: false,
        volume: 0.1,
      });
    }
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

  stopBackgroundMusic = async () => {
    this.backgroundAudio.pauseAsync();
  };

  stopSoundEffect = async () => {
    this.soundEffectAudio.pauseAsync();
  };

  stopAllSound = async () => {
    this.backgroundAudio.pauseAsync();
    this.soundEffectAudio.pauseAsync();
  };

  changeSoundEffectVolume = async (volume) => {
    this.soundEffectAudio.setVolumeAsync(volume);
  };
}
