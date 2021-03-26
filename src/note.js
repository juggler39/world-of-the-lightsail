const $note = document.getElementById('note');
const $noteTitle = $note.querySelector('h1');
const $noteText = $note.querySelector('p');
const $noteClose = $note.querySelector('a');

export function showNote (item) {
    const rect = item.$node.getBoundingClientRect();
    $note.style.left = window.scrollX + rect.left + rect.width / 2 + 'px'
    $note.style.top = window.scrollY + rect.top + rect.height / 2 + 'px'
    $noteTitle.textContent = item.label;
    $noteText.textContent = item.note;
    $note.style.display = 'block';
}

export function hideNote () {
    $note.style.display = 'none';
}

function outsideNote (event) {
    let parent = event.target;
    while (parent) {
        if (parent === $note) return;
        parent = parent.parentNode;
    }
    hideNote();
}

system.on('moon:note', showNote);
system.on('planet:note', showNote);
$noteClose.addEventListener('click', hideNote);
document.addEventListener('click', outsideNote, true);