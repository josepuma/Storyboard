export class MoveX{
    constructor(startTime, endTime, startX, endX){
        this.startTime = startTime
        this.endTime = endTime
        this.startValue = startX
        this.endValue = endX
        this.progress = 0
    }

    valueAtProgress(progress){
        return this.startValue + (this.endValue - this.startValue) * progress
    }

    valueAtTime(time){
        if(time <= this.startTime) return this.startValue
        if(this.endTime <= time) return this.endValue

        let duration = this.endTime - this.startTime
        let progress = (time - this.startTime) / duration
        this.progress = progress

        return this.valueAtProgress(progress)
    }

    isActive(time){
        return this.startTime <= time && time <= this.endTime
    }

}