import { Audio } from 'expo-av';

class AudioController {
  constructor(onSoundEffect, onBackgroundMusic) {
    this.backgroundMusicSource = require('../../assets/sounds/background.mp3');
    this.soundEffectSource = require('../../assets/sounds/zombieSound.mp3');
    this.backgroundAudio = new Audio.Sound();
    this.soundEffectAudio = new Audio.Sound();
    this.onBackgroundMusic = onBackgroundMusic;
    this.onSoundEffect = onSoundEffect;
  }

  resetAudio = async () => {
    await this.backgroundAudio.unloadAsync();
    await this.soundEffectAudio.unloadAsync();
  };

  loadAudio = async () => {
    if (this.onBackgroundMusic) {
      this.backgroundAudio.loadAsync(this.backgroundMusicSource, {
        isLooping: true,
        shouldPlay: false,
      });
    }

    if (this.onSoundEffect) {
      this.soundEffectAudio.loadAsync(this.soundEffectSource, {
        isLooping: true,
        shouldPlay: false,
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

export default AudioController;
