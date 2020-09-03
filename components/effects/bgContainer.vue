<template lang="pug">
    .effect-card-container
            h5.title {{ effect.name }}
            input(v-model="startTime")
            input(v-model="endTime")
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
            spriteList: []
        }
    },
    mounted(){
        this.createAnimation()
    },
    methods: {
        createAnimation(){
            this.effect.items = []
            let bg = new Sprite('./image/wallpaper.jpg')
            bg.scale({
            startTime: this.startTime,
            endTime: this.endTime,
            startScale: .625,
            endScale: .625
            })

            bg.fade({
            startTime: this.startTime,
            endTime: 12000,
            startFade: 0,
            endFade: 1,
            })

            bg.fade({
            startTime: 12000,
            endTime: this.endTime,
            startFade: 1,
            endFade: 1,
            })


            bg.moveX({
            startTime: 0,
            endTime: this.endTime,
            startX: 420,
            endX: 420,
            })

            bg.moveY({
            startTime: 0,
            endTime: this.endTime,
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