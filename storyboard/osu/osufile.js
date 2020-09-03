import { HitCircle } from './hitcircle.js'

export class OsuFile {
    constructor(file){
        this.file = file
        this.hitObjects = []
    }

    parseFile(){

        let vm = this

        return new Promise(function(resolve, reject) {
            const reader = new FileReader()
            reader.onload = event => {
                resolve(vm.readLines(event.target.result))
            }
            reader.readAsText(vm.file)

        })
        
    }

    readLines(content){
        const lines = content.split('\n')
        for(let i in lines){
            if(lines[i].includes('[HitObjects]')){
                return this.readBlock(i, lines)
                break;
            }
        }
    }

    readBlock(position, content){

            let objects = []
            for(let i = position; i < content.length; i++){
                const line = content[i]
                if(line != ''){
                    const hitParams = line.split(',')
                    let hitSound;
                    let sample = 0
                    if(hitParams[5]){
                        const adds = hitParams[5].split(':')
                        /*if(adds[1] && adds[1] !== '0'){
                            switch(adds[0]){
                                case '1':
                                    sample = 'normal'
                                    break;
                                case '2':
                                    sample = 'soft'
                                    break;
                                case '3':
                                    sample = 'drum'
                                    break;
                            }
                            console.log(sample)
                        }*/
                        if(adds[4]){
                            hitSound = adds[4]
                        }
                    }
                    objects.push(
                        new HitCircle(
                            +hitParams[0], 
                            +hitParams[1], 
                            +hitParams[2],
                            sample,
                            +hitParams[4]
                        )
                    )
                }
            }
            return objects
    }

}