// curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyDKDoP_-V_vBdNpqh3t8aXTdy7lLIodEgI"

document.addEventListener('DOMContentLoaded',()=>{

    const chatForm=document.getElementById('chatForm');
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
        // todo add user message
        addUserMessage(message,true);
        
        userInput.value="";
        userInput.style.height="auto";
        sendButton.disabled=true;
        // to show typing indicator message
        const typingIndicator=showTypingIndicator();
        try{
            // genrate respose
            const response=await generateResponse(message);
            typingIndicator.remove();
            addUserMessage(response,false);
            
        }catch(error){
            typingIndicator.remove();
            addErrorMessage(error.message);
        }finally{
            sendButton.disabled=false;
        }
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
console.log(data.candidates[0].content.parts[0].text);
return data.candidates[0].content.parts[0].text;
}

// add user message to chat
function addUserMessage(text,isUser){
    const message=document.createElement('div');
    message.className=`message ${isUser ? "user-message":""}`
    message.innerHTML=`
    <div class="avatar ${isUser ? "user-avatar":""}">
    ${isUser ? "U": "AI"}
    </div>
    <div class="message-content">${text}</div>
    `;
chatMessages.appendChild(message);
chatMessages.scrollTop=chatMessages.scrollHeight;
}

    function showTypingIndicator(){
        const indicator=document.createElement('div');
        indicator.className='message';
        indicator.innerHTML=`
        <div class="avatar">AI</div>
        <div class="typing-indicator">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        </div>
        `;
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop=chatMessages.scrollHeight;
        return indicator;
    }

    // ERROR HANDLING FUNCTION
    function addErrorMessage(text){
        const message=document.createElement('div');
        message.className="message";
        message.innerHTML=`
        <div class="avatar">AI</div>
        <div class="message-content" style="color:red">
        Error: ${text}
       
        </div>
        `;
    }

    const textarea = document.getElementById("userInput");
const form = document.getElementById("chatForm");

textarea.addEventListener("keydown", (e) => {
  // Enter without Shift → send message
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault(); // stop new line
    form.requestSubmit(); // trigger form submit
  }
});

});


