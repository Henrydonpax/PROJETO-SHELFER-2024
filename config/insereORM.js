(async ()=>{
   
   const Categorias=require('./models/Categorias')

   const novaCategoria=await Categorias.create({
   cat_nome:"Teste"
   })

})()