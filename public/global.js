const title = document.querySelector("#title");
const nav = document.querySelector("nav");
const wrapper = document.querySelector("div.wrapper")


setInterval(() => {
    const height = window.innerHeight;
    title.style["font-size"] = `${height / 30}px`;
    nav.style.width = `${wrapper.getBoundingClientRect().width}px`;


}, 1)

function footer() {
    window.location.pathname = ''
}