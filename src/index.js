const express = require("express");
const app = express();
const PORT = 3000;
app.listenerCount(PORT,()=>{
    console.log(`server started http://${PORT}`);
})