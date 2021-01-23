import "./css/main.css";
import * as signalR from "@microsoft/signalr";

const divMessages: HTMLDivElement = document.querySelector("#divMessages");
const tbMessage: HTMLInputElement = document.querySelector("#tbMessage");
const btnSend: HTMLButtonElement = document.querySelector("#btnSend");
const username = new Date().getTime().toString();

btnSend.disabled = true;
btnSend.addEventListener("click", send);

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chathub")
    .configureLogging(signalR.LogLevel.Information)
    .build();

connection.on("ReceiveMessage", (username: string, message: string) => {
    let messageContainer = document.createElement("div");

    messageContainer.innerHTML =
        `<div class="message-author">${username}</div><div>${message}</div>`;

    divMessages.appendChild(messageContainer);
    divMessages.scrollTop = divMessages.scrollHeight;
});

async function start() {
    try {
        await connection.start();

        tbMessage.addEventListener("keyup", (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                send(e);
            }
        });

        btnSend.disabled = false;
        console.log("Chat connected.");
    } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
    }
}

async function send(event) {
    try {
        await connection.send("SendMessage", username, tbMessage.value);
        tbMessage.value = "";
    } catch (err) { console.log(err); }
}

// start the connection
start();