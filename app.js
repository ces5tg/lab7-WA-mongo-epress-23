const mongoose=require( 'mongoose' );
const express=require( 'express' );
const bodyParser = require('body-parser');
const app=express()
app.set( 'view engine', 'ejs' );
app.set( 'views', __dirname+'/views' );

app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect( 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.1', {
  useNewUrlParser: true,
  useUnifiedTopology: true
} ).then( () => {
  console.log( 'Connected to MongoDB' );
} ).catch( ( error ) => {
  console.error( error );
} );

const PeliculaSchema=new mongoose.Schema( {
  titulo:String , 
  ano_lanzamiento:String,
  director:String,
  genero:String , 
  descripcion:String,
  pais:String,
  puntaje:Number , 


} );



const Peliculas=mongoose.model( 'Peliculas', PeliculaSchema);

app.get('/' , (req , res)=>{
  res.render('formUsers')
})
app.get('/showPeliculas', async( req, res ) => {
  peliculas = []
  await Peliculas.find().then( ( pelicula ) => {
    peliculas = pelicula
  } ).catch( ( error ) => {
    console.error( 'Error retrieving users:', error );
  } );
  res.render( 'showUsers', { peliculas: peliculas } )
} )

app.post('/formUsers' , async(req , res)=>{
  console.log(req.body+"==============0")
  const {titulo , ano , director , genero , descripcion , pais , puntaje} = req.body
  const pelicula = new Peliculas({
    titulo:titulo, 
    ano_lanzamiento:ano,
    director:director,
    genero:genero , 
    descripcion:descripcion,
    pais:pais,
    puntaje:puntaje , 
  });
  await pelicula.save()
  res.redirect('showPeliculas')
})

app.listen(3000)
console.log("ejecutandose")
/* const newUser=new User( {
  name: 'John Doe',
  email: 'john@example.com',
  password: '123456'
} );

newUser.save().then( () => {
  console.log( 'New user created!' );
} ).catch( ( error ) => {
  console.error( 'Error creating user:', error );
} );
 */


