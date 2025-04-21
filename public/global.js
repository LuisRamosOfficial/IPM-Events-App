const title = document.querySelector("#title");



setInterval(() => {
    const height = window.innerHeight;
    title.style["font-size"] = `${height / 30}px`;


}, 5)