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
                    objects.push(
                        new HitCircle(
                            +hitParams[0], 
                            +hitParams[1], 
                            +hitParams[2]
                        )
                    )
                }
            }
            return objects
    }

}