<template lang="pug">
  div
    div
      .top-container
        button.play-button(@click="playSong") Play Music
        h5.position-text {{ position }}
</template>

<script>
import { Player } from '../audio/player.js';
import { Sprite } from '../storyboard/sprite.js'
import { Storyboard } from '../storyboard/main.js'
import * as Utilities  from '../storyboard/utilities.js'

export default {
  data(){
    return{
      app: null,
      audio: null,
      spriteList: [],
      storyboard: null,
      position: 0
    }
  },
  mounted() {
      this.startPixi();
      this.resize()
      this.loadStars()
      this.loadAudio('./audios/audio.mp3')
  },
    methods: {
      startPixi() {
        this.app = new PIXI.Application({
          autoResize: true,
          width: 854,
          height: 480,
          resolution: devicePixelRatio 
        });
        this.$el.appendChild(this.app.view)
        window.addEventListener('resize', this.resize);
        this.storyboard = new Storyboard(this.app, this.spriteList)
        this.app.ticker.add(delta => {
          if(this.audio){
            const position = this.audio.getPosition()
            this.position = position
            if(position > 0){
              this.storyboard.playStoryboard(position)
            }
          }
        })
      },
      playSong(){
        this.audio.playAudio()
        this.storyboard.loadSprites()
      },
      loadAudio(audioPath){
        this.audio = new Player(audioPath)
      },
      loadStars(){

        let bg = new Sprite('./image/wallpaper.jpg')
        bg.scale({
          startTime: 0,
          endTime: 154000,
          startScale: .625,
          endScale: .625
        })

        bg.fade({
          startTime: 0,
          endTime: 12000,
          startFade: 0,
          endFade: 1,
        })

        bg.fade({
          startTime: 12000,
          endTime: 154000,
          startFade: 1,
          endFade: 1,
        })


        bg.moveX({
          startTime: 0,
          endTime: 154000,
          startX: 420,
          endX: 420,
        })

        bg.moveY({
          startTime: 0,
          endTime: 154000,
          startY: 240,
          endY: 240,
        })

        this.spriteList.push(bg)


        let start = 1000
        for(let i = 0; i < 550; i++){
          let starSprite = new Sprite('./image/star.png', true)
          const xAxis = Utilities.getRandom(0, 854)
          const scale = Utilities.getRandom(0, .01)
          starSprite.scale({
            startTime: start,
            endTime: start * 16,
            startScale: scale,
            endScale: scale
          })
          starSprite.fade({
            startTime: start,
            endTime : start * 16,
            startFade: 1,
            endFade: 0
          })
          /*starSprite.fade({
            startTime: start + 550,
            endTime : start * 4,
            startFade: 1,
            endFade: 0
          })*/
          starSprite.moveX({
            startTime: start,
            endTime : start * 16,
            startX: xAxis ,
            endX: xAxis * 2
          })
          starSprite.moveY({
            startTime: start,
            endTime : start * 16,
            startY: 480,
            endY: 40
          })
          start += 50
          this.spriteList.push(starSprite)
        }
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

</style>