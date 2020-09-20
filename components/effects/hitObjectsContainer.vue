<template lang="pug">
    div
        .effect-card-container
            .header.uk-cover-container
                img(src="https://static.dribbble.com/users/137756/screenshots/6645137/png_image.png", uk-cover)
            .container
                //-h5.title {{ effect.name }}
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
import { OsuFile } from '../../storyboard/osu/osufile.js'

export default {
    props: ['effect', 'uploadedFile'],
    data(){
        return{
            startTime: 0,
            endTime: 15000,
            osuFile: null,
            spriteList: [],
            hitObjects: []
        }
    },
    watch:{
        uploadedFile: function(file){
            if(file){
                this.readFile(file)
            }
        }
    },
    mounted(){
        if(this.uploadedFile){
            this.readFile(this.uploadedFile)
        }
    },
    methods: {
        readFile(file){
            this.osuFile = new OsuFile(file)
            this.osuFile.parseFile()
            .then(result => {
                this.hitObjects = result
                    this.createAnimation()
                })
        },
        createAnimation(){
            this.effect.items = []
            for(let i in this.hitObjects){
                const hit = this.hitObjects[i]

                if(hit.hitSound == 4){
                    const bgFinish = new Sprite('../image/flare2.png', true)
                        bgFinish .scale({
                        startTime: hit.startTime,
                        endTime: hit.startTime + 1000,
                        startScale: 1.5,
                        endScale: 1.8
                        })

                        bgFinish .fade({
                        startTime: hit.startTime,
                        endTime: hit.startTime + 1000,
                        startFade: .3,
                        endFade: 0,
                        })

                        bgFinish .moveX({
                        startTime: hit.startTime,
                        endTime: hit.startTime + 1000,
                        startX: 420,
                        endX: 420,
                        })
                        

                        bgFinish .moveY({
                        startTime: hit.startTime,
                        endTime: hit.startTime + 1000,
                        startY: 240,
                        endY: 240,
                        })

                        this.effect.items.push(bgFinish )
                }

                const bg = new Sprite('../image/hitcircleoverlay.png')
                const hitObject = new Sprite('../image/hitcircle.png')
                const approach = new Sprite('../image/approachcircle.png')

                // Approach Circle

                approach.fade({
                startTime: hit.startTime - 600,
                endTime: hit.startTime ,
                startFade: 0,
                endFade: 1
                })
                
                approach.fade({
                startTime: hit.startTime,
                endTime: hit.startTime + 1000,
                startFade: 1,
                endFade: 0
                })

                approach.scale({
                startTime: hit.startTime - 600,
                endTime: hit.startTime,
                startScale: 2,
                endScale: .6
                })

                approach.moveX({
                startTime: hit.startTime - 600,
                endTime: hit.startTime + 1000,
                startX: hit.x + 120,
                endX: hit.x + 120
                })

                approach.moveY({
                startTime: hit.startTime - 600,
                endTime: hit.startTime + 1000,
                startY: hit.y,
                endY: hit.y
                })

                //

                bg.fade({
                startTime: hit.startTime - 1000,
                endTime: hit.startTime ,
                startFade: 0,
                endFade: 1
                })
                
                bg.fade({
                startTime: hit.startTime,
                endTime: hit.startTime + 1000,
                startFade: 1,
                endFade: 0
                })

                bg.scale({
                startTime: hit.startTime - 1000,
                endTime: hit.startTime,
                startScale: .2,
                endScale: .6
                })

                bg.scale({
                startTime: hit.startTime,
                endTime: hit.startTime + 1000,
                startScale: .6,
                endScale: .8
                })

                bg.moveX({
                startTime: hit.startTime - 1000,
                endTime: hit.startTime + 1000,
                startX: hit.x + 120,
                endX: hit.x + 120
                })

                bg.moveY({
                startTime: hit.startTime - 1000,
                endTime: hit.startTime + 1000,
                startY: hit.y,
                endY: hit.y
                })

                //hitCircle

                hitObject.fade({
                startTime: hit.startTime - 1000,
                endTime: hit.startTime,
                startFade: 0,
                endFade: 1
                })

                hitObject.fade({
                startTime: hit.startTime,
                endTime: hit.startTime + 1000,
                startFade: 1,
                endFade: 0
                })

                hitObject.scale({
                startTime: hit.startTime - 1000,
                endTime: hit.startTime,
                startScale: .2,
                endScale: .6
                })
                
                hitObject.scale({
                startTime: hit.startTime,
                endTime: hit.startTime + 1000,
                startScale: .6,
                endScale: .8
                })

                hitObject.moveX({
                startTime: hit.startTime - 1000,
                endTime: hit.startTime + 1000,
                startX: hit.x + 120,
                endX: hit.x + 120
                })

                hitObject.moveY({
                startTime: hit.startTime - 1000,
                endTime: hit.startTime + 1000,
                startY: hit.y,
                endY: hit.y
                })

                this.effect.items.push(hitObject)
                this.effect.items.push(bg)
                this.effect.items.push(approach)
            }
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