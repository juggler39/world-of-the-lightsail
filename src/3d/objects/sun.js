import Utils from '../helpers/utils'

export default class Sun {



    // ----------------------
    // Constructor
    // ----------------------

    constructor (options) {


        // options

        this.scale = options.scale || options.system.options.scales.sun;
        this.angle = options.angle || 0;
        this.distance = options.distance || 0;
        this.system = options.system;
        this.image = options.image3d;


        // create nodes

        this.$node = Utils.createNode('ps-item ps-sun', this.system.itemSize);
        this.$image = Utils.createImage(this.image, 'ps-image');
        this.$node.appendChild(this.$image);
        this.system.$items.appendChild(this.$node);

        this.$label = Utils.createLabel('Click to reset');
        this.$node.appendChild(this.$label);


        // video

        console.log(options)

        if (options.video) {
            this.video = options.video;
            this.$video = Utils.createImage(options.system.options.video.image3d, 'ps-video');
            this.$node.appendChild(this.$video);
            this.$video.addEventListener('click', event => {
                this.system.emit('video', this);
            })
        }


        // listeners

        this.$node.addEventListener('click', () => {
            this.system.emit('sun:click');
        })

        this.system.on('camera', () => {
            this.setTransform()
        });


        // render

        this.setTransform();


    }



    // ----------------------
    // Style setters
    // ----------------------

    get x () {
        return this.distance * Math.cos(this.angle * Math.PI / 180);
    }

    get y () {
        return this.distance * Math.sin(this.angle * Math.PI / 180)
    }

    setTransform () {
        this.$node.style.transform = `translate(${this.x - this.system.itemSize / 2}px, ${this.y - this.system.itemSize / 2}px) rotateX(-${this.system.camera.angle}deg) scale(${this.scale})`
    }



}