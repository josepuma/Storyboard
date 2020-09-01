import { Scale } from './properties/scale.js'
import { Fade } from './properties/fade.js'
import { MoveX } from './properties/movex.js'
import { MoveY } from './properties/movey.js'

export class Sprite {
    constructor(spritePath, isAdditive){
        this.spritePath = spritePath
        //this.sprite = new PIXI.Sprite.from(spritePath)
        this.sprite = null
        //this.sprite.anchor.set(0.5)
        //this.sprite.scale.set(1)
        this.isAdditive = isAdditive || false
        //Properties
        this.scaleTiming = []
        this.fadeTiming = []
        this.moveXTiming = []
        this.moveYTiming = []
    }

    scale({ startTime, endTime, startScale, endScale }){
        this.scaleTiming.push(
            new Scale(
                startTime,
                endTime,
                startScale,
                endScale
            )
        )
    }

    fade({ startTime, endTime, startFade, endFade }){
        this.fadeTiming.push(
            new Fade(
                startTime,
                endTime,
                startFade,
                endFade
            )
        )
    }

    moveX({ startTime, endTime, startX, endX }){
        this.moveXTiming.push(
            new MoveX(
                startTime,
                endTime,
                startX,
                endX
            )
        )
    }

    moveY({ startTime, endTime, startY, endY }){
        this.moveYTiming.push(
            new MoveY(
                startTime,
                endTime,
                startY,
                endY
            )
        )
    }

}