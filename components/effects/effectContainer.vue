<template lang="pug">
    div
        .effect-card-container
            .header.uk-cover-container
                img(src="https://static.dribbble.com/users/137756/screenshots/4898734/cfad50c8-f916-496f-a44f-ad6c0b2081b4.jpeg", uk-cover)
            .container
                //h5.title {{ effect.name }}
                form
                    .uk-margin-small
                        input.uk-input.uk-form-small(v-model="startTime", type="number", @blur="updateParams")
                    .uk-margin-small
                        input.uk-input.uk-form-small(v-model="endTime", type="number", @blur="updateParams")
                    .uk-margin-small
                        input.uk-input.uk-form-small(v-model="startX", type="number", @blur="updateParams")
                    .uk-margin-small
                        input.uk-input.uk-form-small(v-model="endX", type="number", @blur="updateParams")
                    .uk-margin-small
                        input.uk-input.uk-form-small(v-model="startY", type="number", @blur="updateParams")
                    .uk-margin-small
                        input.uk-input.uk-form-small(v-model="endY", type="number", @blur="updateParams")
                    .uk-margin-small
                        div
                            label.uk-form-label
                                input(type="checkbox", v-model="isAdditive", @change="updateParams")
                                span Additive
                //h6 Generated Sprites: {{ effect.items.length }}
            //-button.save-button(@click="saveChanges()", type="button") Save
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
            endY: 480,
            isAdditive: false
        }
    },
    methods: {
        updateParams(){
            if(this.validateParams){
                this.createStars()
            }
        },
        validateParams(){
            if(this.startTime >= 0 && this.endTime >= 0 && this.startX >= 0 && this.startY >= 0 && this.endX >= 0 && this.endY >= 0){
                return true
            }
        },
        createStars(){
            this.effect.items = []
            console.log(this.isAdditive)
            for(let start = this.startTime; start < this.endTime; start+=150){
                let starSprite = new Sprite('./image/star2.png', this.isAdditive)
                let xAxis = Utilities.getRandom(+this.startX, +this.endX)
                let yAxis = Utilities.getRandom(+this.startY, +this.endY)
                const scale = Utilities.getRandom(0, 1)
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

    .header{
        height: 2.5rem;
    }

    .effect-card-container{
        background-color: rgba(255,255,255, 0.3);
        width: 250px;
        border-radius: 20px;
        overflow: hidden;
        background-color: $base-color;
        .container{
            padding: 1rem; 
        }
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