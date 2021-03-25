export default function (scene) {



    // ----------------------
    // Wheel
    // ----------------------

    scene.system.$node.addEventListener('wheel', event => {

        event.preventDefault();

        if (event.deltaY > 0 && scene.zoom === 0) return;
        if (event.deltaY < 0 && scene.zoom === 1) return;

        const delta = -event.deltaY / 1000;
        const origin = { x: event.clientX, y: event.clientY };

        scene.zoomTo(origin, scene.zoom + delta);

    })



    // ----------------------
    // Pinch
    // ----------------------

    let pinch = false;

    function getDist (event) {
        const w = event.touches[0].clientX - event.touches[1].clientX;
        const h = event.touches[0].clientY - event.touches[1].clientY;
        return Math.hypot(w, h);
    }

    function getOrigin (event) {
        const x1 = Math.max(event.touches[0].clientX, event.touches[1].clientX);
        const x2 = Math.min(event.touches[0].clientX, event.touches[1].clientX);
        const y1 = Math.max(event.touches[0].clientY, event.touches[1].clientY);
        const y2 = Math.min(event.touches[0].clientY, event.touches[1].clientY);
        return {
            x: x1 - (x1 - x2) / 2,
            y: y1 - (y1 - y2) / 2,
        }
    }

    function pinchStart (event) {
        if (event.touches.length !== 2) return pinchEnd();
        pinch = {};
        pinch.dist = getDist(event);
        pinch.zoom = scene.zoom;
        pinch.origin = getOrigin(event);
    }

    function pinchMove (event) {
        if (!pinch) return;
        const dist = getDist(event);
        const delta = (dist - pinch.dist) / 1000;
        scene.zoomTo(getOrigin(event), pinch.zoom + delta);
        event.preventDefault();
    }

    function pinchEnd () {
        pinch = false;
    }

    scene.system.$node.addEventListener('touchstart', pinchStart);
    document.addEventListener('touchmove', pinchMove, { passive: false });
    document.addEventListener('touchend', pinchEnd);
    document.addEventListener('touchcancel', pinchEnd);



}