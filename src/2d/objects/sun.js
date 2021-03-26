import Utils from '../helpers/utils'

export default class Sun {

    constructor (world) {

        this.world = world;
        this.image = world.options.sun.image2d;
        this.video = world.options.sun.video;

        this.$node = Utils.createNode('mm-item mm-sun');
        this.$image = Utils.createImage(this.image, 'mm-image');
        this.$node.appendChild(this.$image)

        if (this.video) {
            this.$video = Utils.createImage(world.options.video.image2d, 'mm-video u-pulse');
            this.$node.appendChild(this.$video);
            this.$video.addEventListener('click', () => {
                world.emit('video', this);
            })
        }

        world.$items.appendChild(this.$node);

    }

}