(async ()=>{
   
    const Categorias=require('./models/Categorias')
 
    const UpdateCategoria=await Categorias.findByPk(1)
    
        updateCategoria.cat_nome='Humanas'

        await updateCategoria.save()
        
        console.log(updateCategoria)
 
 })()