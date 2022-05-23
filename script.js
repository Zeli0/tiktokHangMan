
canvas = function() {

    hangman = document.getElementById("Hangman");
    ctx = hangman.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = "#fff";
    context.lineWidth = 4;

};

head = function() {
    headHangman = document.getElementById("Hangman");
    ctx = headHangman.getContext("2d");
    ctx.beginPath();
    ctx.arc(50, 50, 40, 0, 2 * Math.PI, false);
    ctx.stroke();
}

frame1 = function() {
    draw(0, 150, 150, 150)
}



