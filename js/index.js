window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} 
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});

// Add touch controls for mobile devices
const touchArea = document.getElementById('board');
let touchStartX = 0;
let touchStartY = 0;

touchArea.addEventListener('touchstart', handleTouchStart, false);
touchArea.addEventListener('touchmove', handleTouchMove, false);

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
}

function handleTouchMove(event) {
    event.preventDefault();
    const touchEndX = event.touches[0].clientX;
    const touchEndY = event.touches[0].clientY;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    // Adjust sensitivity based on your game's requirements
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            // Swipe right
            inputDir.x = 1;
            inputDir.y = 0;
        } else {
            // Swipe left
            inputDir.x = -1;
            inputDir.y = 0;
        }
    } else {
        if (deltaY > 0) {
            // Swipe down
            inputDir.x = 0;
            inputDir.y = 1;
        } else {
            // Swipe up
            inputDir.x = 0;
            inputDir.y = -1;
        }
    }
}
