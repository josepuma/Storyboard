<template lang="pug">
    div
        .effect-card-container
            .header.uk-cover-container
                img(src="https://static.dribbble.com/users/137756/screenshots/4898734/cfad50c8-f916-496f-a44f-ad6c0b2081b4.jpeg", uk-cover)
            .container
                form
                    .uk-margin-small
                        input.uk-input.uk-form-small(v-model="startTime", type="number")
                    .uk-margin-small
                        input.uk-input.uk-form-small(v-model="endTime", type="number")
                //h6 Generated Sprites: {{ effect.items.length }}
                //button.save-button(@click="saveChanges()", type="button") Save
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
            spriteList: []
        }
    },
    mounted(){
        this.createAnimation()
    },
    methods: {
        createAnimation(){
            this.effect.items = []
            let bg = new Sprite('../image/bg.jpg')
            bg.scale({
            startTime: +this.startTime,
            endTime: +this.endTime,
            startScale: 1,
            endScale: 1
            })

            bg.fade({
            startTime: +this.startTime,
            endTime: +this.startTime + 2000,
            startFade: 0,
            endFade: 1,
            })

            bg.fade({
            startTime: +this.startTime + 2000,
            endTime: +this.endTime,
            startFade: 1,
            endFade: 1,
            })


            bg.moveX({
            startTime:  +this.startTime,
            endTime: +this.endTime,
            startX: 420,
            endX: 420,
            })

            bg.moveY({
            startTime:  +this.startTime,
            endTime: +this.endTime,
            startY: 240,
            endY: 240,
            })

            this.effect.items.push(bg)
            this.$emit('loadSprites', this.effect)
        },
        saveChanges(){
            this.createAnimation()
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