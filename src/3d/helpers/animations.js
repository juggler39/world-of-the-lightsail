import { gsap } from 'gsap'



// ----------------------
// Spin
// ----------------------

export function spin (object, options) {

    object.spin = gsap.to(object, {
        repeat: -1,
        ease: 'none',
        onUpdate: () => object.setTransform(),
        ...options
    });

    object.spinStop = () => {
        if (!object.system.paused) object.spin.pause();
    }

    object.spinPlay = () => {
        if (!object.system.paused) object.spin.resume();
        else object.setTransform();
    }

    object.system.on('pause', () => {
        object.spin.pause();
    })

    object.system.on('resume', () => {
        object.spin.resume();
    })

    object.system.on('timescale', value => {
        object.spin.timeScale(value);
    })

}



// ----------------------
// Fade
// ----------------------

export function fade (object, options) {

    object.fade && object.fade.kill();

    object.fade = gsap.to(object, {
        duration: object.system.options.durations.fade,
        ease: 'power1.inOut',
        onUpdate: () => object.setOpacity(),
        ...options
    })

}



// ----------------------
// Resize
// ----------------------

export function resize (object, options) {

    object.resize && object.resize.kill();

    object.resize = gsap.to(object, {
        duration: object.system.options.durations.translate,
        ease: 'power1.inOut',
        onUpdate: () => {
            object.setSize();
            object.setTransform();
        },
        ...options
    })

}



// ----------------------
// Translate
// ----------------------

export function translate (object, options) {

    let onUpdate;
    if (object.system.paused) onUpdate = () => object.setTransform();

    object.translate && object.translate.kill();

    object.translate = gsap.to(object, {
        duration: object.system.options.durations.translate,
        ease: 'power1.inOut',
        onUpdate,
        ...options,
    })

}