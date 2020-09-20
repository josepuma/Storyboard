<template lang="pug">
    div
        .effect-card-container
            .header.uk-cover-container
                img(src="https://static.dribbble.com/users/137756/screenshots/4898734/cfad50c8-f916-496f-a44f-ad6c0b2081b4.jpeg", uk-cover)
            .container
                form
                    .uk-margin-small(uk-tooltip="Start Time")
                        input.uk-input.uk-form-small(v-model="spritePath", @blur="updateParams", placeholder="Sprite Path")
                    //-.uk-margin-small(uk-tooltip="End Time")
                        input.uk-input.uk-form-small(v-model="startTime", type="number", @blur="updateParams")
                    //-.uk-margin-small
                        input.uk-input.uk-form-small(v-model="endTime", type="number", @blur="updateParams")
                    hr.uk-hr     
                    div(v-for="(property, index) in properties")
                        h6 {{ index + 1 }}) {{ property.slug }}   
                        .uk-margin-small(class="uk-child-width-1-2 uk-grid uk-grid-small", uk-grid)
                            div
                                input.uk-input.uk-form-small(v-model="property.startTime", uk-tooltip="Start Time", type="number", @blur="updateParams")
                            div
                                input.uk-input.uk-form-small(v-model="property.endTime", uk-tooltip="End Time", type="number", @blur="updateParams")
                            div
                                input.uk-input.uk-form-small(v-model="property.startValue", uk-tooltip="Start Value", type="number", @blur="updateParams")
                            div
                                input.uk-input.uk-form-small(v-model="property.endValue", uk-tooltip="End Value", type="number", @blur="updateParams")
                    //-
                        hr.uk-hr
                        .uk-margin-small(class="uk-child-width-1-2 uk-grid uk-grid-small", uk-grid)
                            div
                                input.uk-input.uk-form-small(v-model="endX", type="number", @blur="updateParams")
                            div
                                input.uk-input.uk-form-small(v-model="endY", type="number", @blur="updateParams")
                        hr.uk-hr
                        .uk-margin-small(class="uk-child-width-1-2 uk-grid uk-grid-small", uk-grid)
                            div
                                input.uk-input.uk-form-small(v-model="startScale", type="number", @blur="updateParams")
                            div
                                input.uk-input.uk-form-small(v-model="endScale", type="number", @blur="updateParams")
                        hr.uk-hr
                        .uk-margin-small(class="uk-child-width-1-2 uk-grid uk-grid-small", uk-grid)
                            div
                                input.uk-input.uk-form-small(v-model="startFade", type="number", @blur="updateParams")
                            div
                                input.uk-input.uk-form-small(v-model="endFade", type="number", @blur="updateParams")
                    .uk-margin-small
                        label.uk-form-label
                            input.uk-checkbox(type="checkbox", v-model="isAdditive", @change="updateParams")
                            span Additive
                    .uk-margin-small(class="uk-child-width-1-2 uk-grid uk-grid-small", uk-grid)
                        div(v-for="property in propertiesSprite")
                            div
                                button.uk-width-1-1.uk-button.uk-margin-remove(type="button", @click="addProperty(property)") #[span(uk-icon="icon: plus; ratio: .6;")] {{ property.slug }}
                    //h6 Generated Sprites: {{ effect.items.length }}
                    //button.save-button(@click="$emit('removeEffect', effect)", type="button") Remove
            //-button.save-button(@click="saveChanges()", type="button") Save
</template>

<script>
import { Sprite } from '../../storyboard/sprite.js'
import * as Utilities  from '../../storyboard/utilities.js'
const uniqid = require('uniqid')
export default {
    props: ['effect'],
    data(){
        return{
            spritePath: '',
            startTime: 0,
            endTime: 15000,
            startX: 0,
            endX: 0,
            startY: 0,
            endY: 0,
            startFade: 0,
            endFade: 0,
            startScale: 0,
            endScale: 0,
            properties: [],
            spriteList: [],
            isAdditive: false,
            sprite: null
        }
    },
    computed: {
        propertiesSprite(){

            let items = []

            let fade = {
                slug: 'F',
                startTime: 0,
                endTime: 0,
                startValue: 0,
                endValue: 0
            }

            items.push(fade)

            let moveX = {
                slug: 'MX',
                startTime: 0,
                endTime: 0,
                startValue: 0,
                endValue: 0
            }

            items.push(moveX)

            let moveY = {
                slug: 'MY',
                startTime: 0,
                endTime: 0,
                startValue: 0,
                endValue: 0
            }

            items.push(moveY)

            let scale = {
                slug: 'S',
                startTime: 0,
                endTime: 0,
                startValue: 0,
                endValue: 0
            }

            items.push(scale)

            return items

        }
    },
    mounted(){
        this.createAnimation()
    },
    methods: {
        addProperty(property){
            this.properties.push({
                id: uniqid(),
                slug: property.slug,
                startTime: property.startTime,
                endTime: property.endTime,
                startValue: property.startValue,
                endValue: property.endValue
            })
        },
        updateParams(){
            if(this.validateParams){
                this.createAnimation()
            }
        },
        validateParams(){
            if(this.spritePath != '' && this.startTime > 0 && this.endTime > 0){
                return true
            }
        },
        createAnimation(){
            this.effect.items = []
            if(this.spritePath != ''){
                const sprite = new Sprite('../image/' + this.spritePath, this.isAdditive)

                this.properties.forEach(property => {
                    switch(property.slug){
                        case 'F':
                            sprite.fade({
                                startTime: +property.startTime,
                                endTime: +property.endTime,
                                startFade: +property.startValue,
                                endFade: +property.endValue
                            })
                        break;
                        case 'S':
                            sprite.scale({
                                startTime: +property.startTime,
                                endTime: +property.endTime,
                                startScale: +property.startValue,
                                endScale: +property.endValue
                            })
                        break;
                        case 'MX':
                            sprite.moveX({
                                startTime:  +property.startTime,
                                endTime: +property.endTime,
                                startX: +property.startValue,
                                endX: +property.endValue
                            })
                        break;
                        case 'MY':
                            sprite.moveY({
                                startTime:  +property.startTime,
                                endTime: +property.endTime,
                                startY: +property.startValue,
                                endY: +property.endValue
                            })
                        break;
                    }
                })

                /*bg.scale({
                startTime: +this.startTime,
                endTime: +this.endTime,
                startScale: 1,
                endScale: 1
                })

                bg.fade({
                startTime: +this.startTime,
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
                })*/

                this.effect.items.push(sprite)
                this.$emit('loadSprites', this.effect)
            }
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