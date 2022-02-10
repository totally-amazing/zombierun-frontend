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
        shouldPlay: false,
      });
    }

    if (this.onSoundEffect) {
      this.soundEffectAudio.loadAsync(this.soundEffectSource, {
        shouldPlay: false,
      });
    }
  };

  playBackgroundMusic = async () => {
    this.backgroundAudio.replayAsync({
      isLooping: true,
    });
  };

  playSoundEffect = async () => {
    this.soundEffectAudio.replayAsync({
      isLooping: true,
      volume: 1,
    });
  };

  playAllSound = async () => {
    this.backgroundAudio.replayAsync({
      isLooping: true,
    });
    this.soundEffectAudio.replayAsync({
      isLooping: true,
      volume: 1,
    });
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
