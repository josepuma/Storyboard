import { Scale } from './properties/scale.js'
import { Fade } from './properties/fade.js'
import { MoveX } from './properties/movex.js'
import { MoveY } from './properties/movey.js'

const _ = require('lodash')

export class Sprite {
    constructor(spritePath, isAdditive){
        this.spritePath = spritePath
        this.sprite = null
        this.isAdditive = isAdditive || false
        //Properties
        this.scaleTiming = []
        this.fadeTiming = []
        this.moveXTiming = []
        this.moveYTiming = []
        this.startTimeRendering = 0
        this.endTimeRendering = 0
        this.times = []
    }

    scale({ startTime, endTime, startScale, endScale }){
        this.scaleTiming.push(
            new Scale(
                +startTime,
                +endTime,
                +startScale,
                +endScale
            )
        )
        this.times.push(+startTime, +endTime)
    }

    fade({ startTime, endTime, startFade, endFade }){
        this.fadeTiming.push(
            new Fade(
                +startTime,
                +endTime,
                +startFade,
                +endFade
            )
        )
        this.times.push(+startTime, +endTime)
    }

    moveX({ startTime, endTime, startX, endX }){
        this.moveXTiming.push(
            new MoveX(
                +startTime,
                +endTime,
                +startX,
                +endX
            )
        )
        this.times.push(+startTime, +endTime)
    }

    moveY({ startTime, endTime, startY, endY }){
        this.moveYTiming.push(
            new MoveY(
                +startTime,
                +endTime,
                +startY,
                +endY
            )
        )
        this.times.push(+startTime, +endTime)
    }

    getMaxLength(){
        this.endTimeRendering = _.max(this.times)
    }

    getMinLength(){
        this.startTimeRendering = _.min(this.times)
    }


}