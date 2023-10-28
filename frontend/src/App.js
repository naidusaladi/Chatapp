import React, { useState } from 'react'
import './App.css'
const App = () => {

const [data,setData]=useState('')
const [questions,setQuestions]=useState({

})


const sendInputToServer = async (text) => {
  try {
    var bearer = 'Bearer ...'
    const response = await fetch('http://localhost:8000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization":bearer,
      },
      body: JSON.stringify({ text }),
    });

    const res_data = await response.json();
    console.log(res_data)
    return res_data.response;
  } catch (error) {
    console.error('Error:', error);
    return 'Error occurred.';
  }
};
const handelClick=async (e)=>{
  e.preventDefault();
  const newQuestions={...questions}
  newQuestions[data]=""
  setQuestions(newQuestions)
  const  response=await sendInputToServer(data)
  const newAnswers={...questions}
  newAnswers[data]=response
  setQuestions(newAnswers)


}
const handelInput=(e)=>{
  setData(e.target.value)
}
  return (
    <>
      <div className='inputoutput' id="inputoutput">
        <ul>
        {
    
          Object.entries(questions).map(([question,answer])=>{
            return (
            <li>
              <div className='question'><div className='questioncircle'>{question}</div></div>
              <div className='answer'>{answer}</div> 
            </li>
            )
           

          })
        }
       </ul>
        
      </div>
      <div className='inputdiv'>
        <input type='text' placeholder='enter your query' onChange={handelInput} className='inputbox'/>
        <button onClick={handelClick} className='inputbtn'>
          Enter
        </button>
        </div>
           
    </>
  )
}

export default App
