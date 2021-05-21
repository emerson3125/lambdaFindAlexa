const mongoose = require('mongoose');

let conn = null;

const uri = 'mongodb+srv://Arwins3125:soraidacordoba2014@cluster0.lbnub.mongodb.net/arwinsDataCorp?retryWrites=true&w=majority';

exports.handler = async function(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  if (conn == null) {
    conn = mongoose.createConnection(uri, {
      bufferCommands: false,
      bufferMaxEntries: 0,
      useNewUrlParser: true,
      useUnifiedTopology: true
    },(err) =>{
        if(err){
            console.log(err);
        }else{
            console.log('data on port');
        }
    });
    await conn;
    conn.model('touch_users', new mongoose.Schema({
      primer_nombre: String,
      segundo_nombre: String,
      primer_apellido: String,
      segundo_apellido: String,
      cedula: Number,
      datosB: String
    }));
  }
  let touch_user = event.huella;

  const M = conn.model('touch_users');
  
  const result = await M.findOne({datosB: touch_user})

  console.log(result);
  const name1 = result.primer_nombre;
  const name2 = result.segundo_nombre;
  const DatosPersona = `la persona que encontre tiene como primer nombre ${name1} con un segundo nombre ${name2}`
  return DatosPersona;
};
