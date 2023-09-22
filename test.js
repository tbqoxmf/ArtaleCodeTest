const ATException = require("./Exception/ATException")

class per {
    constructor(){}
    async show(){

    }
}

class cli extends per{
    constructor(){
        super()
    }
    async show(){
        super.show()
        console.log('sfag')
        throw new ATException('test', 'test')
    }
}

async function main(){
try{
    await new cli().show()
}
catch(e){

    console.log("tttt")
}
}

main()