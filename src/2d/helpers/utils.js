export default {

    createFromHTML (html) {
        const $div = document.createElement('div');
        $div.innerHTML = html;
        return $div.firstElementChild;
    },

    createNode (className) {
        const $node = document.createElement('div');
        $node.className = className;
        return $node;
    },

    createImage (src, className) {
        const $img = document.createElement('img');
        $img.className = className;
        $img.src = src;
        return $img;
    },

    createLabel (label, className) {
        const $label = document.createElement('p');
        $label.className = className;
        $label.textContent = label;
        return $label;
    },

}