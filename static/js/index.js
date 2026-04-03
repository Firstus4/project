var loader = document.querySelector(".loader")

window.addEventListener("load", vanish);

function vanish() {
    loader.classList.add("disappear")
}

document.addEventListener('DOMContentLoaded', function() {
    new Typed("#typed-text", {
        strings: ["Administrator", "Accountant", "Technical Support Specialist"], 
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2500,
        loop: true
    });
    });

