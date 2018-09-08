import EventEmitter from 'event-emitter3';

export const AudioStatus = {
  WAIT_PLAY: 1,
  CALL_PLAY: 2,
  PLAYING: 3,
  PAUSE: 4,
};

export const EventMap = {
  STATUS_CHANGE: 'statusChange',
  CALL_PLAY: 'callPlay',
  PLAYED: 'played',
  PAUSE: 'pause',
  ERROR: 'error',
  TIME_UPDATE: 'timeupdate',
  ENDED: 'ended',
};

class Player {
    static instance = null;
    static getInstance() {
      if (!Player.instance) {
        Player.instance = new Player();
        return Player.instance;
      }
      return Player.instance;
    }
    static destroyInstance() {
      Player.instance.destroy();
      Player.instance = null;
    }
    _audioStatus = AudioStatus.WAIT_PLAY;
    get audioStatus() {
      return this._audioStatus;
    }
    set audioStatus(val) {
      this._audioStatus = val;
      this.eventBus.emit(EventMap.STATUS_CHANGE, val);
    }
    constructor(option = {}) {
      this.$option = option;
      this.audioRef = new Audio();
      this.eventBus = new EventEmitter();
      this.lockP = null;
      this.init();
    }
    init() {
      this.audioRef.addEventListener('ended', this.handlePlayEnded);
      this.audioRef.addEventListener('timeupdate', this.handleTimeUpdate);
      document.addEventListener('visibilitychange', this.handleVisibilityChange);
    }
    handleVisibilityChange = () => {
      if (document.hidden) {
        this.pause();
      } else {
        // 页面呼出
      }
    }
    async play() {
      this.lockP && await this.lockP;
      if (this.audioStatus === AudioStatus.PLAYING) return;
      try {
        this.audioStatus = AudioStatus.CALL_PLAY;
        this.eventBus.emit(EventMap.CALL_PLAY);
        this.lockP = this.audioRef.play();
        (this.lockP instanceof Promise) && await this.lockP;
        this.eventBus.emit(EventMap.PLAYED);
        this.audioStatus = AudioStatus.PLAYING;
      } catch (error) {
        console.log(error);
        this.eventBus.emit(EventMap.ERROR, error);
      } finally {
        this.lockP = null;
      }
    }
    async pause() {
      this.lockP && await this.lockP;
      if (this.audioStatus !== AudioStatus.PLAYING) return;
      try {
        this.lockP = this.audioRef.pause();
        (this.lockP instanceof Promise) && await this.lockP;
        this.eventBus.emit(EventMap.PAUSE);
        this.audioStatus = AudioStatus.PAUSE;
      } catch (error) {
        console.log(error);
        this.eventBus.emit(EventMap.ERROR, error);
      } finally {
        this.lockP = null;
      }
    }
    handlePlayEnded = async () => {
      this.eventBus.emit(EventMap.ENDED);
      this.audioStatus = AudioStatus.WAIT_PLAY;
    }
    handleTimeUpdate = async () => {
      this.eventBus.emit(EventMap.TIME_UPDATE);
    }
    async setAudioSrc(src, autoplay = true) {
      const oldSrc = this.audioRef.src;
      this.audioRef.src = src;
      this.audioStatus = AudioStatus.WAIT_PLAY;
      if (oldSrc && oldSrc !== src) {
        try {
          await this.audioRef.load();
        } catch (error) {
          console.log(error);
        }
      }
      if (autoplay) await this.play();
    }
    on(eventName, cb) {
      this.eventBus.on(eventName, cb);
    }
    off(eventName, cb) {
      this.eventBus.off(eventName, cb);
    }
    emit(eventName, ...args) {
      this.eventBus.emit(eventName, ...args);
    }
    async destroy() {
      this.pause();
      this.audioRef.removeEventListener('ended', this.handlePlayEnded);
      this.audioRef.removeEventListener('timeupdate', this.handleTimeUpdate);
      document.removeEventListener('visibilitychange', this.handleVisibilityChange);
      this.audioRef = null;
      Object.values(EventMap).forEach((eventName) => {
        this.eventBus.removeAllListeners(eventName);
      });
    }
}

export default Player;
