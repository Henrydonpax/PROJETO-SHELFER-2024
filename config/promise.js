function segunda(){
    console.log("Segunda execução")
}


console.log("primeira execuçao")
segunda()




const comPromise=new Promise ((resolve,reject)=>{
    let resultado=2*1
    if(resultado == 4){
        resolve("sucesso da promise")
    }else{
        reject("Promise falhou")
    }
})

console.log(comPromise)


function metodo(){
    return new Promise((resolve)=>){
        setTimeout(()=>{
            console.log("Aguardou")
            resolve()
        },3000)
    }
}


async function testeAsync(){
    console.log("Iniciou")
    await metodo().then(()=>{
    console.log('Sucesso na trasaçao')
    }).catch((erro)=>{
        console.log('Nao deu certo'+erro)
    })
    console.log("terminou")
}


testeAsync()