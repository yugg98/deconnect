const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect('mongodb+srv://yug:9826112003@cluster0.izaas.mongodb.net/Tech?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    }).catch((error)=>{
        console.log(error)
    });
};

module.exports = connectDatabase;