import {Howl, Howler} from 'howler';

let lastAudio

export class Player {
    constructor(path){
        this.path = path
    }
    playAudio(){
        this.stopAudio()
        let sound = new Howl({
            src: this.path
        })

        sound.play()
        lastAudio = sound
    }
    getPosition(){
        if(lastAudio){
            return Math.round(lastAudio.seek() * 1000)
        }
    }
    stopAudio(){
        if(lastAudio){
            lastAudio.stop()
        }
    }
}