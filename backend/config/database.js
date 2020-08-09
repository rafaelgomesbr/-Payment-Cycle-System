const mongoose = require("mongoose");
module.exports = mongoose
  .connect("mongodb://localhost/db_finance", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

mongoose.connection.on('connected', function () {
    console.log('Conexão estabelecida com sucesso');
   });
   mongoose.connection.on('error', function (err) {
    console.log('Ocorreu um erro: ' + err);
   });
   mongoose.connection.on('disconnected', function () {
    console.log('Conexão finalizada');
   }); 

  mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."
  mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite mínimo de '{MIN}'."
  mongoose.Error.messages.Number.max = "O '{VALUE}' informado é maior que o limite máximo de '{MAX}'."
  mongoose.Error.messages.String.enum = "'{VALUE}' não é válido para o atributo '{PATH}'."