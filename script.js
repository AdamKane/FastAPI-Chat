const textInput = document.querySelector(".text-input");
const submitBtn = document.querySelector(".submit-btn");
let convo = ""

submitBtn.addEventListener("click", async () => {
  const text = textInput.value;
  const newText = document.createElement("p");
  
  newText.innerHTML = `USER: ${text}`;
  // add text to convo with newline
    convo += text + "\n"
    console.log(convo);
  document.body.append(newText);
  // text is wrapped at 800px
  newText.style.maxWidth = "800px";
  newText.style.color = "white";
  newText.style.fontFamily = "Verdana";
  newText.style.fontSize = "20px";

    // create waitText
    const waitText = document.createElement("p");
    waitText.style.color = "white";
    // loop 3 dots until response
    let dots = "";
    for (let i = 0; i < 5; i++) {
      dots += ".";
      waitText.innerHTML = `GPT-3: ${dots}`;
      // append to body
      document.body.append(waitText);
      await new Promise(r => setTimeout(r, 100));
  }

    const response = await fetch('http://127.0.0.1:8000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            input: convo
        })
    });
    const data = await response.json();
    // add the data to html after the button as <p> tag
    console.log(data);
    const RESPText = document.createElement("p");
    // clear waitText
    waitText.innerHTML = "";
    RESPText.innerHTML = `GPT-3: ${data.input}`;
    // add text to convo
    convo += data.input + "\n"
    document.body.append(RESPText);
    // text is wrapped at 800px
    RESPText.style.maxWidth = "800px";
    RESPText.style.color = "white";
    RESPText.style.fontFamily = "Verdana";
    RESPText.style.fontSize = "20px";
    textInput.value = "";

});