export default function (scene) {



    // ----------------------
    // Variables
    // ----------------------

    let drag = false;



    // ----------------------
    // Helpers
    // ----------------------

    function getEvent (event) {
        return event.touches && event.touches[0] || event.changedTouches && event.changedTouches[0] || event;
    }



    // ----------------------
    // Handlers
    // ----------------------

    function start (event) {
        if (event.touches && event.touches.length > 1) return end();

        const e = getEvent(event);
        drag = {
            clientX: e.clientX,
            clientY: e.clientY,
            sceneX: scene.x,
            sceneY: scene.y
        }
    }

    function move (event) {
        if (!drag) return;
        const e = getEvent(event);
        scene.x = drag.sceneX + e.clientX - drag.clientX;
        scene.y = drag.sceneY + e.clientY - drag.clientY;
        scene.render();
        event.preventDefault();
    }

    function end () {
        drag = false;
    }



    // ----------------------
    // Listeners
    // ----------------------

    scene.world.$node.addEventListener('mousedown', start);
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', end);
    document.addEventListener('mouseleave', end);
    scene.world.$node.addEventListener('touchstart', start);
    document.addEventListener('touchmove', move, { passive: false });
    document.addEventListener('touchend', end);
    document.addEventListener('touchcancel', end);


}