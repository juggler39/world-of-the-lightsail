export default function (scene) {



    // ----------------------
    // Handler
    // ----------------------

    function resize () {

        const style = getComputedStyle(scene.system.$node);
        scene.padding.top = parseFloat(style.getPropertyValue('padding-top'));
        scene.padding.right = parseFloat(style.getPropertyValue('padding-right'));
        scene.padding.bottom = parseFloat(style.getPropertyValue('padding-bottom'));
        scene.padding.left = parseFloat(style.getPropertyValue('padding-left'));

        const freeWidth = scene.system.$node.offsetWidth - scene.padding.right - scene.padding.left;
        const freeHeight = scene.system.$node.offsetHeight - scene.padding.bottom - scene.padding.top;
        const freeSize = Math.min(freeWidth, freeHeight)
        const sceneWidth = scene.system.$scene.offsetWidth;
        const sceneHeight = scene.system.$scene.offsetHeight;

        scene.zoom = 0.6;
        scene.minScale = Math.min(freeSize / sceneWidth, freeSize / sceneHeight);
        scene.maxScale = Math.min(freeSize) / 2 / scene.system.options.sizes.item / scene.system.options.scales.sun;

        scene.x = (freeWidth - sceneWidth * scene.scale) / 2;
        scene.y = (freeHeight - sceneHeight * scene.scale) / 2;
        scene.render();
        scene.system.emit('zoom', scene.zoom);

    }



    // ----------------------
    // Listener
    // ----------------------

    resize();
    window.addEventListener('resize', resize);
    scene.system.on('camera', resize);


}