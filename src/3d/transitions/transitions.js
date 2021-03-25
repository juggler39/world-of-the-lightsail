import planetEnter from './planet-enter'
import planetLeave from './planet-leave'
import planetClick from './planet-click'
import moonEnter from './moon-enter'
import moonLeave from './moon-leave'
import sunClick from './sun-click'

export default function (system) {
    system.on('planet:enter', planetEnter);
    system.on('planet:leave', planetLeave);
    system.on('moon:enter', moonEnter);
    system.on('moon:leave', moonLeave);
    system.on('planet:click', planetClick);
    system.on('sun:click', sunClick);
}