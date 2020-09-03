<template lang="pug">
    div
        .effect-card-container
            h5.title {{ effect.name }}
            input(v-model="startTime")
            input(v-model="endTime")
            input(v-model="startX")
            input(v-model="endX")
            input(v-model="startY")
            input(v-model="endY")
            h6 Generated Sprites: {{ effect.items.length }}
            button.save-button(@click="saveChanges()", type="button") Save
</template>

<script>

import { Sprite } from '../../storyboard/sprite.js'
import * as Utilities  from '../../storyboard/utilities.js'

export default {
    props: ['effect'],
    data(){
        return{
            startTime: 0,
            endTime: 15000,
            startX: 0,
            endX: 854,
            startY: 0,
            endY: 480
        }
    },
    methods: {
        createStars(){
            this.effect.items = []
            for(let start = this.startTime; start < this.endTime; start+=150){
                let starSprite = new Sprite('./image/star.png', true)
                let xAxis = Utilities.getRandom(+this.startX, +this.endX)
                let yAxis = Utilities.getRandom(+this.startY, +this.endY)
                const scale = Utilities.getRandom(0, .04)
                let beat = 560 
                starSprite.scale({
                    startTime: start,
                    endTime: start + beat * 4,
                    startScale: scale,
                    endScale: scale
                })
                starSprite.fade({
                    startTime: start ,
                    endTime : start + beat * 2,
                    startFade: 0,
                    endFade: 1
                })
                starSprite.fade({
                    startTime: start + beat * 2,
                    endTime : start + beat * 4,
                    startFade: 1,
                    endFade: 0
                })

                starSprite.moveX({
                    startTime: start,
                    endTime : start + beat * 4,
                    startX: xAxis,
                    endX: xAxis 
                })

                starSprite.moveY({
                    startTime: start,
                    endTime : start + beat * 4,
                    startY: yAxis,
                    endY: yAxis
                })
                this.effect.items.push(starSprite)
            }
            this.$emit('loadSprites', this.effect)
        },
        saveChanges(){
            this.createStars()
        }
    }
}
</script>

<style lang="scss" scoped>

    .effect-card-container{
        background-color: rgba(255,255,255, 0.3);
        backdrop-filter: blur(15px);
        padding: 1.5rem; 
        width: 250px;
        border-radius: 20px;
        margin-top: 1rem;
        .save-button{
            margin-top: 1rem;
            cursor: pointer;
            outline: none;
            border: none;
            background-color: #fcba03;
            color: #fff;
            padding: .5rem 1rem;
            font-family: Helvetica, sans-serif;
            font-weight: 600;
            letter-spacing: -.03rem;
            font-size: .6rem;
            border-radius: 16px;
            z-index: 2;
            width: 100%;
        }
    }

</style>