<template lang="pug">
  div
    div
      .top-container
        button.play-button(@click="playSong") Play Storyboard
        h5.position-text {{ position }}
        input(type="file", ref="osuFileUploader", @change="uploadOsuFile")
      .bottom-container
        h3.title Feel Good (Ryan Kore Remix)
        h4.title Gryffin & Illenium feat Daya 
</template>

<script>
import { Player } from '../audio/player.js';
import { Sprite } from '../storyboard/sprite.js'
import { Storyboard } from '../storyboard/main.js'
import { OsuFile } from '../storyboard/osu/osufile.js'
import * as Utilities  from '../storyboard/utilities.js'

export default {
  data(){
    return{
      app: null,
      audio: null,
      spriteList: [],
      osuFile: null,
      storyboard: null,
      hitObjects: [],
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
      loadHitsAnimation(){
        for(let i in this.hitObjects){
            const hit = this.hitObjects[i]

            let bg = new Sprite('./image/star.png', true)
            
            bg.fade({
              startTime: hit.startTime,
              endTime: hit.startTime + 1000,
              startFade: 1,
              endFade: 0
            })

            bg.scale({
              startTime: hit.startTime,
              endTime: hit.startTime + 1000,
              startScale: .5,
              endScale: .5
            })

            bg.moveX({
              startTime: hit.startTime,
              endTime: hit.startTime + 1000,
              startX: hit.x + 120,
              endX: hit.x + 120
            })

            bg.moveY({
              startTime: hit.startTime,
              endTime: hit.startTime + 1000,
              startY: hit.y,
              endY: hit.y
            })

            this.spriteList.push(bg)

        }
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
          endFade: .5,
        })

        bg.fade({
          startTime: 12000,
          endTime: 154000,
          startFade: .5,
          endFade: .5,
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

        for(let i = 107500; i<120000; i+=(1400 / 2)){
          const bg = new Sprite('./image/wallpaper.jpg', true)
            bg.scale({
              startTime: i,
              endTime: i + 1370 / 2,
              startScale: .625,
              endScale: .680
            })

            bg.fade({
              startTime: i,
              endTime: i + 1370 / 2,
              startFade: .3,
              endFade: 0,
            })

            bg.moveX({
              startTime: i,
              endTime: i + 1370,
              startX: 420,
              endX: 420,
            })
            

            bg.moveY({
              startTime: i,
              endTime: i + 1370,
              startY: 240,
              endY: 240,
            })

          //-this.spriteList.push(bg)
        }


        let start = 1000
        for(let i = 0; i < 550; i++){
          let starSprite = new Sprite('./image/star.png', true)
          const xAxis = Utilities.getRandom(0, 854)
          const scale = Utilities.getRandom(0, .04)
          starSprite.scale({
            startTime: start,
            endTime: start * 16,
            startScale: scale,
            endScale: scale
          })
          starSprite.fade({
            startTime: start ,
            endTime : start * 2,
            startFade: 0,
            endFade: 1
          })
          starSprite.fade({
            startTime: start * 12,
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
          /*starSprite.moveX({
            startTime: start,
            endTime : start * 8,
            startX: xAxis ,
            endX: xAxis / 2
          })*/

          starSprite.moveX({
            startTime: start,
            endTime : start * 16,
            startX: xAxis / 2,
            endX: xAxis * 3
          })

          starSprite.moveY({
            startTime: start,
            endTime : start * 16,
            startY: 480,
            endY: -20
          })
          start += 150
          this.spriteList.push(starSprite)
        }
      },
      uploadOsuFile(){
        const file = this.$refs.osuFileUploader.files[0]
        this.readFile(file)
      },
      readFile(file){
        this.osuFile = new OsuFile(file)
        this.osuFile.parseFile()
        .then(result => {
          this.hitObjects = result
          this.loadHitsAnimation()
        })
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