console.log("Starting");

const host = window.location.hostname
const ws = new WebSocket(`ws://${host}:8081`);

const list = document.querySelector('#report');

ws.onopen = function open() {
    console.log("Established Connection");
    // I should have some data here?
}

ws.onmessage = function incoming(msg)
{
    const payload = JSON.parse(msg.data);
    console.log(payload);
    //list.insertAdjacentElement('beforeend', litem).
    //    textContent = payload.message;
    for(let v of payload)
    {
        const litem = document.createElement('li');
        list.insertAdjacentElement('beforeend', litem).
            textContent = v;
    }

}

