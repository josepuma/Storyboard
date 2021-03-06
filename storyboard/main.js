const _ = require('lodash')

export class Storyboard{
    constructor(app){
        this.app = app
        this.sprites = []
        this.areSpritesLoaded = false
        this.removeSprite()
    }

    async loadTextures(sprites){
        await this.cleanSprites()
        this.sprites = sprites
        this.loadSprites()
    }

    async cleanSprites(){
        while(this.app.stage.children[0]) { this.app.stage.removeChild(this.app.stage.children[0]); }
    }

    loadSprites(){
        
        let width = (window.innerWidth / 854)
        let height = (window.innerHeight / 480)
        let texturesPath = []

        for(let i in this.sprites){
            texturesPath.push(this.sprites[i].spritePath)
        }

        let finalTextures = _.union(texturesPath)

        for(let i in finalTextures){
            const texture = PIXI.Texture.from(finalTextures[i])
            for(let j in this.sprites){
                if(this.sprites[j].spritePath == finalTextures[i]){
                    this.sprites[j].sprite = new PIXI.Sprite(texture)
                    this.sprites[j].sprite.anchor.set(0.5)
                    this.sprites[j].sprite.scale.set(1)
                    this.sprites[j].sprite.x = (this.app.screen.width / 2) * width;
                    this.sprites[j].sprite.y = (this.app.screen.height / 2) * height;
                    this.sprites[j].sprite.visible = false
                    //console.log(this.sprites[j].isAdditive)
                    if(this.sprites[j].isAdditive){
                        this.sprites[j].sprite.blendMode = PIXI.BLEND_MODES.ADD;
                    }else{
                        this.sprites[j].sprite.blendMode = PIXI.BLEND_MODES.NORMAL
                    }
                    this.sprites[j].getMaxLength()
                    this.sprites[j].getMinLength()
                    //this.app.stage.addChild(this.sprites[j].sprite)
                }
            }
        }

        /*for (var textureUrl in PIXI.utils.BaseTextureCache) {
            PIXI.utils.BaseTextureCache[textureUrl].destroy();
        }
        for (var textureUrl in PIXI.utils.TextureCache) {
            PIXI.utils.TextureCache[textureUrl].destroy();
        }*/

        this.areSpritesLoaded = true

    }

    removeSprite(){
        
    }

    playStoryboard(position){
        if(this.areSpritesLoaded){
            //Load all sprites
        let width = (window.innerWidth / 854)
        let height = (window.innerHeight / 480)
        //Start ticker
            for(let i in this.sprites){
                let sprite = this.sprites[i]
                
                if(sprite.startTimeRendering <= position && position <= sprite.endTimeRendering){
                    if(!sprite.inStage){
                        this.app.stage.addChild(sprite.sprite)
                        sprite.inStage = true
                        sprite.sprite.visible = true
                    }
                    else{
                        if(sprite.scaleTiming.length > 0){
                            for(let j in sprite.scaleTiming){
                                let scale = sprite.scaleTiming[j]
                                let size = scale.valueAtTime(position) 
                                if(scale.isActive(position)){
                                    sprite.sprite.scale.set(size * width)
                                }
                                /*else{
                                    sprite.sprite.scale.set(0)
                                }*/
                            }
                        }
        
                        if(sprite.fadeTiming.length > 0){
                            for(let j in sprite.fadeTiming){
                                let fade = sprite.fadeTiming[j]
                                let opacity = fade.valueAtTime(position)
                                if(fade.isActive(position)){
                                    sprite.sprite.alpha = opacity
                                }
                                /*else{
                                    sprite.sprite.visible = false
                                }*/
                            }
                        }
        
                        if(sprite.moveXTiming.length > 0){
                            for(let j in sprite.moveXTiming){
                                let xPosition = sprite.moveXTiming[j]
                                let positionX = xPosition.valueAtTime(position)
                                if(xPosition.isActive(position)){
                                    sprite.sprite.x = (positionX) * width
                                }
                            }
                        }
        
                        if(sprite.moveYTiming.length > 0){
                            for(let j in sprite.moveYTiming){
                                let yPosition = sprite.moveYTiming[j]
                                let positionY = yPosition.valueAtTime(position)
                                if(yPosition.isActive(position)){
                                    sprite.sprite.y = positionY * height
                                }
                            }
                        }
                    }     
                }else{
                    if(sprite.inStage){
                        sprite.sprite.visible = false
                        this.app.stage.removeChild(sprite.sprite);
                    }
                    
                }

            }
        }
    }

}