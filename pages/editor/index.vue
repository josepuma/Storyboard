<template lang="pug">
    section
        div
            div(class="uk-grid uk-grid-collapse uk-grid-match", uk-grid)
                div.side-panel-container(class="uk-width-medium", uk-height-viewport)
                    section.uk-section.uk-section-small
                        ul.uk-tab
                            li
                                nuxt-link(to="/editor/main") Properties
                            li 
                                nuxt-link(to="/editor/effects")  Assets
                        nuxt-child
                div(class="uk-width-expand")
                    div
                        .uk-position-relative(uk-height-viewport)
                            storyboardPlayer(:audioPosition="position")
                            .uk-position-bottom
                                .player-container
                                    nav.uk-navbar.uk-navbar-container.uk-navbar-transparent
                                        .uk-navbar-center  
                                            .uk-navbar-item
                                                div 
                                                    span {{ currentPosition }}
                                                    a.uk-margin-small-left(uk-icon="icon: skip-back; ratio: .8;")
                                            .uk-navbar-item
                                                div
                                                    .play-icon
                                                        button(uk-icon="icon: play; ratio: .8;", @click="playSong", type="button")
                                            .uk-navbar-item
                                                    div 
                                                        a.uk-margin-small-right(uk-icon="icon: skip-forward; ratio: .8;")
                                                        span 00:15:00s
                                        .uk-navbar-right
                                            .uk-navbar-item
                                                div
                                                    button.uk-margin-small-right.uk-button.secondary-button Share
                                                    button.uk-button.primary-button Export


                                        
</template>

<script>

import storyboardPlayer from '@/components/player/storyboard'

import { Player } from '../../audio/player.js';
export default {
    data(){
        return{
            audio: null,
            position: 0,
        }
    },
    components: {
        storyboardPlayer
    },
    computed:{
        currentPosition(){
            let milliseconds = parseInt((this.position % 1000) / 100),
                seconds = Math.floor((this.position / 1000) % 60),
                minutes = Math.floor((this.position/ (1000 * 60)) % 60),
                hours = Math.floor((this.position / (1000 * 60 * 60)) % 24);

            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;

            return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
        }
    },  
    mounted(){
        this.loadAudio('../audios/oneinamillion.mp3')
    },
    methods: {
        loadAudio(audioPath){
            this.audio = new Player(audioPath)
        },
        playSong(){
            this.audio.playAudio()
            let vm = this
            setInterval(() => {
                vm.position = vm.audio.getPosition()
            }, 16)
            //this.loadSprites()
        },
    }
}
</script>

<style lang="scss" scoped>

    button{
        &.primary-button{
            color: $base-color;
            background-color: $main-color-accent;
        }
        &.secondary-button{
            color: $base-color;
            background-color: $soft-content-text-color;
        }
    }

    .side-panel-container{
        background-color: $default-color;
        border-right: 1px solid rgba($base-color, .05);
    }

    .player-container{
        background-color: rgba($darker-background-color, .9);
        border-top: 1px solid rgba($base-color, .05);
    }

    section{
        .uk-tab{
            >*{
                padding-left: 30px;
            }
            &::before{
                border-color: rgba($base-color, .05);
            }
        }
        a{
            font-weight: 600;
            text-transform: capitalize;
            border-bottom: 2px solid transparent;
            &.nuxt-link-active{
                color: $base-color;
                border-color: $main-color-accent;
            }
        }
    }

</style>