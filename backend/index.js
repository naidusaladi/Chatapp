const express=require('express')
const app=express()
const cors = require('cors');
app.use(cors())
const { BardAPI } = require('bard-api-node');

async function testAssistant(text) {
  try {
    const assistant = new BardAPI();

    // Set session information for authentication
    await assistant.setSession('__Secure-1PSID', 'cAjxh85so2YWrt8DjibedjcA9jGsZkcHN60xddQATe-uon98Hm8StJzb4Udkev9hED7wGw.'); // or '__Secure-3PSID'
    // ...

    // Send a query to Bard
    const response = await assistant.getBardResponse(text);
    
    return response.content
  } catch (error) {
    console.error('Error:', error);
  }
}

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("get all data from here")
})

app.post('/',async (req,res)=>{
   console.log("got request")
   const text = req.body.text;
   let response=await testAssistant(text)
   res.json({response})
   console.log("sent response"+ response)
})


app.listen(8000,()=>{
    console.log('listening on port 8000');
})