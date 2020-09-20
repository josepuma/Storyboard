<template lang="pug">
    div
        section
                .section-options-container
                    h6.uk-text-uppercase.section-title #[span.uk-margin-small-right(uk-icon="icon: chevron-up; ratio: .8;")] Fade
                    form.uk-margin.properties-form(v-for="i in 4")
                        div(class="uk-child-width-1-2 uk-grid uk-grid-small", uk-grid)
                            div
                                div
                                    label.uk-form-label Type
                                    select.uk-select
                                        option(value="Custom", selected) Custom
                            div
                                div
                                    label.uk-form-label Bezier
                                    input.uk-input(value="0.44, 0, 0.4, 1")
                hr.uk-hr
                section
                    .section-options-container
                        h6.uk-text-uppercase.section-title #[span.uk-margin-small-right(uk-icon="icon: chevron-up; ratio: .8;")] Effects
                        form.uk-margin.properties-form
                            div(class="uk-grid uk-grid-small", uk-grid)
                                div(class="uk-width-expand")
                                    div
                                        div
                                            select.uk-select
                                                option(value="Custom", selected) Reverse Audio
                                div(class="uk-width-auto")
                                    div
                                        button.uk-button.primary-button Apply

                hr.uk-hr
                section
                    .section-options-container
                        h6.uk-text-uppercase.section-title #[span.uk-margin-small-right(uk-icon="icon: chevron-up; ratio: .8;")] Playback Speed
                        form.uk-margin.properties-form
                            div(class="uk-grid uk-grid-small uk-flex-middle", uk-grid)
                                div(class="uk-width-expand")
                                    div
                                        div(class="uk-grid uk-grid-small", uk-grid)
                                            div(class="uk-width-auto")
                                                div
                                                    span(uk-icon="icon: clock; ratio: .8; ")
                                            div(class="uk-width-expand")
                                                div
                                                    input.uk-range(type="range", value="50")
                                div(class="uk-width-2-5")
                                    div
                                        input.uk-input(value="110.50%")

                hr.uk-hr
                section
                    .section-options-container
                        h6.uk-text-uppercase.section-title #[span.uk-margin-small-right(uk-icon="icon: chevron-up; ratio: .8;")] Pitch
                        form.uk-margin.properties-form
                            div(class="uk-grid uk-grid-small uk-flex-middle", uk-grid)
                                div(class="uk-width-expand")
                                    div
                                        div(class="uk-grid uk-grid-small", uk-grid)
                                            div(class="uk-width-auto")
                                                div
                                                    span(uk-icon="icon: bar-chart; ratio: .8; ")
                                            div(class="uk-width-expand")
                                                div
                                                    input.uk-range(type="range", value="50")
                                div(class="uk-width-2-5")
                                    div
                                        input.uk-input(value="110.50%")

                hr.uk-hr
                section
                    .section-options-container
                        h6.uk-text-uppercase.section-title #[span.uk-margin-small-right(uk-icon="icon: chevron-up; ratio: .8;")] Reverb
                        form.uk-margin.properties-form
                            div(class="uk-grid uk-grid-small uk-flex-middle", uk-grid)
                                div(class="uk-width-1-4")
                                    div
                                        div
                                            label.uk-form-label Delay
                                            input.uk-input(value="1.05 s")
                                div(class="uk-width-1-4")
                                    div
                                        div
                                            label.uk-form-label Decay
                                            input.uk-input(value="0.5%")
                                div(class="uk-width-expand")
                                    div
                                        label.uk-form-label.hidden _
                                        button.uk-width-1-1.uk-button.primary-button.uk-display-block Apply
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