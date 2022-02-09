import { Audio } from 'expo-av';

export default class Controller {
  constructor(source) {
    this.source = source;
  }

  makeSoundObj = async () => {
    const { sound: soundObj } = await Audio.Sound.createAsync(this.source);
    return soundObj;
  };

  stopAudio = async () => {
    await this.source.stopAsync();
  };
}
