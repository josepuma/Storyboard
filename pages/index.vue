<template lang="pug">
  div
    div
      .top-container
        button.play-button(@click="playSong") Play Storyboard
        h5.position-text {{ position }}
        input(type="file", ref="osuFileUploader", @change="uploadOsuFile")
        .effects-container
          h5.particles-title {{ spriteList.length }} loaded sprites
          button.play-button(@click="addEffect") Add Effect
          template(v-for="effect in effects")
            effectContainer(:effect="effect", v-if="effect.name == 'Particles'", @loadSprites="loadSprites")
            bgContainer(:effect="effect", v-if="effect.name == 'Background'", @loadSprites="loadSprites")
            hitObjectsContainer(:effect="effect", :uploadedFile="fileUpload" v-if="effect.name == 'HitObject'", @loadSprites="loadSprites")
      .bottom-container
        input(type="range", min="0", :max="duration", v-model="newPosition", @mouseup="leaveRangePosition" @mousedown="changePosition")
        h5.particles-title {{ duration }}
        h3.title Feel Good (Ryan Kore Remix)
        h4.title Gryffin & Illenium feat Daya 
</template>

<script>

import effectContainer from '@/components/effects/effectContainer'
import bgContainer from '@/components/effects/bgContainer'
import hitObjectsContainer from '@/components/effects/hitObjectsContainer'

import { Player } from '../audio/player.js';
import { Sprite } from '../storyboard/sprite.js'
import { Storyboard } from '../storyboard/main.js'
import { OsuFile } from '../storyboard/osu/osufile.js'
import * as Utilities  from '../storyboard/utilities.js'

const _ = require('lodash')

export default {
  data(){
    return{
      app: null,
      audio: null,
      osuFile: null,
      storyboard: null,
      hitObjects: [],
      durationLength: 0,
      fileUpload: null,
      effects: [
        {
          name: 'Background',
          startTime: 0,
          endTime: 250000,
          items: []
        },
        {
          name: 'HitObject',
          startTime: 0,
          endTime: 250000,
          items: []
        }
      ],
      position: 0,
      newPosition: 0,
      duration: 0,
      manualPosition: false
    }
  },
  components: {
    effectContainer,
    bgContainer,
    hitObjectsContainer
  },
  mounted() {
      this.startPixi();
      this.resize()
      this.loadAudio('./audios/audio.mp3')
  },
  computed: {
    spriteList(){
      let sprites = []
      this.effects.forEach(effect => {
        sprites = _.concat(sprites, effect.items)
      })
      return sprites
    }
  },
    methods: {
      leaveRangePosition(){
        this.manualPosition = false
        this.audio.setPosition(this.newPosition)
      },
      changePosition(){
        this.manualPosition = true
      },
      loadSprites(){
        if(this.storyboard){
          this.storyboard.loadTextures(this.spriteList)
        }
      },
      addEffect(){
        this.effects.push({
          name: 'Particles',
          items: []
        })
      }, 
      startPixi() {
        this.app = new PIXI.Application({
          autoResize: true,
          width: 854,
          height: 480,
          resolution: devicePixelRatio 
        });
        this.$el.appendChild(this.app.view)
        window.addEventListener('resize', this.resize);
        this.storyboard = new Storyboard(this.app)
        this.app.ticker.add(delta => {
          if(this.audio){
            const position = this.audio.getPosition()
            this.position = position
            if(!this.manualPosition){
              this.newPosition = position
            }
            this.duration = this.audio.getDuration()
            if(position > 0){
              this.storyboard.playStoryboard(position)
            }
          }
        })
      },
      playSong(){
        this.audio.playAudio()
        this.loadSprites()
      },
      loadAudio(audioPath){
        this.audio = new Player(audioPath)
      },
      uploadOsuFile(){
        this.fileUpload = this.$refs.osuFileUploader.files[0]
      },
      resize(){
        this.app.renderer.resize(window.innerWidth, window.innerHeight)
      }
    },
    beforeDestroy(){
      if(this.audio){
        this.audio.stopAudio()
      }
    }
}
</script>

<style lang="scss" scoped>

  .particles-title{
    color: #fff;
  }

  .top-container{
    position: absolute;
    top: 3%;
    left: 3%;
    .position-text{
      color: #fff;
      margin: 0;
      display: inline-block;
      margin-left: 20px;
    }
  }

  .bottom-container{
    position: absolute;
    bottom: 3%;
    left: 3%;
    .title{
      color: #fff;
      margin-bottom: .2rem;
      font-family: Helvetica, sans-serif;
      font-weight: 700;
      letter-spacing: -.01rem;
      text-shadow: 0px 0px 5px rgba(21,21,21,.2);
    }
    .author{
      color: #fcba03;
      text-shadow: 0px 0px 5px rgba(21,21,21,.2);
    }
  }

  .effects-container{
    margin-top: 1rem;
  }

  .play-button{
    cursor: pointer;
    outline: none;
    border: none;
    background-color: #fcba03;
    color: #fff;
    padding: .5rem 1rem;
    font-family: Helvetica, sans-serif;
    font-weight: 600;
    letter-spacing: -.03rem;
    font-size: .8rem;
    border-radius: 16px;
    z-index: 2;
  }

  .slider-position{
    width: 100vw;
    position: absolute;
    bottom: 0;
    z-index: 2;
    background-color: rgba(255,255,255,.3);
    box-shadow: 0px 0px 10px 5px rgba(255,255,255,.2);
    height: 5px;

  }

</style>