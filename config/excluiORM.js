(async ()=>{
   
    const Categorias=require('./models/Categorias')
 
    const deletaCategoria=await Categorias.findbyPk(3)

    await deletaCategoria.destroy()
    
 })()