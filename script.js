const CYCLE_LOOP = [0, 1, 2, 1, 2, 1, 2, 0];
let currentLoopIndex = 0;
let frameId = 0;
let animate = true;

function init() {

    // Initialize nav and sections
    const sections = ['wedding', 'travel', 'faq'];

    const navbuttons = document.querySelectorAll('.nav button');
    for(let navbutton of navbuttons) {
        
        if (navbutton.textContent === 'Wedding') {
            navbutton.setAttribute('aria-current', true);
        } else {
            navbutton.setAttribute('aria-current', false);
        }

        navbutton.addEventListener('click', function(e) {

            navbutton.setAttribute('aria-current', true);

            for (let button of navbuttons) {
                if (button.textContent.trim() !== navbutton.textContent.trim()) {
                    button.setAttribute('aria-current', false);
                }
            }

            const sectionText = navbutton.textContent.toLowerCase();
            const selectedSection = document.getElementById(`${sectionText}`);

            const liveRegion = document.getElementById('live-region');
            liveRegion.textContent = `Displaying ${sectionText} details`;

            for (let section of sections) {
                const sectionDiv = document.getElementById(section);
                if (selectedSection !== sectionDiv) {
                    sectionDiv.setAttribute('style', 'display:none');
                } else {
                    sectionDiv.setAttribute('style', 'display:block')
                }
            }

        })
    }

    //Initialize canvas for Bijou to groom herself
    const canvas = document.getElementById("bijou");
    const ctx = canvas.getContext("2d");

    let x = window.matchMedia("(max-width: 440px)");
    setCanvasSize(ctx, x);
    x.addEventListener("change", function() {
        setCanvasSize(ctx, x);
    });

    function setCanvasSize(ctx, x) {
        if (x.matches) {
            ctx.canvas.setAttribute('style', 'width: 280px; height: 140px');
        } else {
            ctx.canvas.setAttribute('style', "width: 400px; height: 200px");
        }
    }

    // ctx.canvas.setAttribute('style', "width: 400px; height: 200px");


    const spriteSheet = new Image();
    spriteSheet.src = 'sprite-sheet-grooming.png'; 

    // Start the animation when the sprite sheet is loaded
    spriteSheet.onload = () => {
        frameId = window.requestAnimationFrame(gameLoop)
    };

    const SCALE = 1;
    const WIDTH = 32;
    const HEIGHT = 36;
    const SCALED_WIDTH = SCALE * WIDTH;
    const SCALED_HEIGHT = SCALE * HEIGHT;

    function drawFrame(frameX, frameY, canvasX, canvasY) {
        ctx.drawImage(spriteSheet,
                        frameX * WIDTH, frameY * HEIGHT, WIDTH, HEIGHT,
                        canvasX, canvasY, SCALED_WIDTH, SCALED_HEIGHT);
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        currentLoopIndex++;
        if (currentLoopIndex >= CYCLE_LOOP.length) {
            currentLoopIndex = 0;
        }

        drawFrame(CYCLE_LOOP[currentLoopIndex], 0, 35, 8);
        setTimeout(() => {
            if (animate) {
                frameId = window.requestAnimationFrame(gameLoop);
            }
        }, 200);
    }

    // Allow user to pause Bijou
    const bijouButton = document.querySelector('.bijou-button');
    bijouButton.addEventListener('click', function() {
        window.cancelAnimationFrame(frameId);
        if (animate) {
            animate = false;
            bijouButton.textContent = 'Let Bijou groom';
        } else {
            animate = true;
            frameId = window.requestAnimationFrame(gameLoop);
            bijouButton.textContent = 'Pause Bijou';
        }
    });

}


