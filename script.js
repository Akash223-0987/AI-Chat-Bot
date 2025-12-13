// curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyDKDoP_-V_vBdNpqh3t8aXTdy7lLIodEgI"

document.addEventListener('DOMContentLoaded',()=>{

    const chatForm=document.getElementById('chat-form');
    const userInput=document.getElementById('userInput');
    const chatMessages=document.getElementById('chatMessages');
    const sendButton =document.getElementById('sendButton');

    userInput.addEventListener('input',()=>{

        userInput.style.height='auto';
        userInput.style.height=userInput.scrollHeight+'px';
        sendButton.disabled=!userInput.value.trim();
    });

    chatForm.addEventListener("submit",async(e)=>{
        e.preventDefault();
        const message=userInput.value.trim();
        if(!message)return;
        
        userInput.value='';
        userInput.style.height='auto';
        sendButton.disabled=true;
        try{
            // genrate respose
        }catch(error){
            
        }finally{

        }
    });

});

// Generate response function

async function generateResponse(prompt){
    const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyDKDoP_-V_vBdNpqh3t8aXTdy7lLIodEgI',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
        },
        body:JSON.stringify({
            contents:[{
                parts:[{
                    text: prompt,
                },],
            },],
        })                                                                                                  
}
);
if(!response.ok){
    throw new Error('Network response was not ok');     
}
const data=await response.json();
console.log(data);
}