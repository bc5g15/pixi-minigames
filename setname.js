const button = document.querySelector("#submit");
const out = document.querySelector('#result');
const name = document.querySelector('#name');

function sendName()
{
    const URL = "./ruser";
    fetch(URL, {method: 'POST', body: JSON.stringify({name: name.value})})
        .then((res) => res.json())
        .then((res) => {
            result.textContent = "Set name to: " + res.username;
            console.log(res);
        });
}

button.onclick = sendName;
