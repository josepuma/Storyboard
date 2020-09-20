<template lang="pug">
    div
        section
            .section-options-container
                form.uk-search.uk-search-default.uk-width-1-1
                    span.uk-search-icon-flip(uk-search-icon)
                    input.uk-search-input(type="search", placeholder="Search assets")
            section.uk-margin
                .section-options-container
                        h6.uk-text-uppercase.section-title #[span.uk-margin-small-right(uk-icon="icon: chevron-up; ratio: .8;")] Dramattic Effects
                        .uk-margin
                            .list-effects
                                .effect-item.primary-category.uk-margin-small(v-for="i in 2")
                                    div(class="uk-grid uk-grid-small uk-flex-middle", uk-grid)
                                        div(class="uk-width-auto")
                                            div
                                                span.play-icon(uk-icon="icon: play; ratio: .8;")
                                        div(class="uk-width-3-5")
                                            div
                                                .info-container
                                                    h6.title Door Opening
                                                    h6.category Personal Library
                                        div(class="uk-width-expand")
                                            div 
                                                .uk-text-center
                                                    span.play-icon.more(uk-icon="icon: more-horizontal; ratio: .8;")

                                .effect-item.secondary-category.uk-margin-small(v-for="i in 2")
                                    div(class="uk-grid uk-grid-small uk-flex-middle", uk-grid)
                                        div(class="uk-width-auto")
                                            div
                                                span.play-icon(uk-icon="icon: play; ratio: .8;")
                                        div(class="uk-width-3-5")
                                            div
                                                .info-container
                                                    h6.title Car chase
                                                    h6.category Open Music
                                        div(class="uk-width-expand")
                                            div 
                                                .uk-text-center
                                                    span.play-icon.more(uk-icon="icon: more-horizontal; ratio: .8;")

            hr.uk-hr
            section
                .section-options-container.uk-margin
                        h6.uk-text-uppercase.section-title #[span.uk-margin-small-right(uk-icon="icon: chevron-up; ratio: .8;")] Background Music
                        .uk-margin
                            .list-effects
                                .effect-item.primary-category.uk-margin-small(v-for="i in 2")
                                    div(class="uk-grid uk-grid-small uk-flex-middle", uk-grid)
                                        div(class="uk-width-auto")
                                            div
                                                span.play-icon(uk-icon="icon: play; ratio: .8;")
                                        div(class="uk-width-3-5")
                                            div
                                                .info-container
                                                    h6.title Door Opening
                                                    h6.category Personal Library
                                        div(class="uk-width-expand")
                                            div 
                                                .uk-text-center
                                                    span.play-icon.more(uk-icon="icon: more-horizontal; ratio: .8;")

                                .effect-item.secondary-category.uk-margin-small(v-for="i in 2")
                                    div(class="uk-grid uk-grid-small uk-flex-middle", uk-grid)
                                        div(class="uk-width-auto")
                                            div
                                                span.play-icon(uk-icon="icon: play; ratio: .8;")
                                        div(class="uk-width-3-5")
                                            div
                                                .info-container
                                                    h6.title Car chase
                                                    h6.category Open Music
                                        div(class="uk-width-expand")
                                            div 
                                                .uk-text-center
                                                    span.play-icon.more(uk-icon="icon: more-horizontal; ratio: .8;")
            

</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>

    section{
        .section-options-container{
            padding: 0rem 1rem;
        }
        .uk-search{
            input{
                background-color: $dark-main-color-accent;
                border: 0;
                font-size: .8rem;
                color: rgba($base-color, .8);
                border-radius: $default-border-radius;
                padding-left: 1rem;
            }
        }
        .list-effects{
            .effect-item{
                border-radius: $default-border-radius;
                background-color: $dark-main-color-accent;
                padding: 1.2rem 1rem;
                border-left: 4px solid transparent;
                border-right: 8px solid;
                border-right-color: $dark-main-color-accent;
                .play-icon{
                    color: $base-color; 
                }
                .info-container{
                    .title{
                        color: $base-color; 
                        font-size: .8rem;
                        margin-bottom: .3rem;
                    }
                    .category{
                        color: rgba($base-color, .5);
                        letter-spacing: .05rem;
                        font-size: .7rem;
                        text-transform: uppercase;
                    }
                }
                .more{
                    color: rgba($base-color, .5);
                }
                &.primary-category{
                    border-left-color: $primary-orange-color;
                }
                &.secondary-category{
                    border-left-color: $primary-green-color;
                }
            }
        }
        .section-title{
            color: rgba($base-color, .5);
            letter-spacing: .05rem;
            font-size: .7rem;
            cursor: pointer;
            transition: all .2s ease;
            &:hover{
                color: $base-color;
            }
        }
        .properties-form{
            .uk-form-label{
                color: rgba($base-color, .6);
                font-size: .7rem;
                &.hidden{
                    opacity: 0;
                }
            }
            .uk-range{
                opacity: .5;
                transition: all .2s ease;
                &:hover{
                    opacity: 1;
                }
            }
            .uk-select, .uk-input{
                background-color: $dark-main-color-accent;
                border: 0;
                font-size: .8rem;
                color: rgba($base-color, .8);
                border-radius: $default-border-radius;
            }
            button{
                &.primary-button{
                    color: $base-color;
                    background-color: $main-color-accent;
                }
            }
        }
        .uk-hr{
            border-color: rgba($base-color, .05);
        }
    }

</style>