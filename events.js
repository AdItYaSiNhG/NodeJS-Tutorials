//basic one 
const EventEmitter = require('events');
const Adi_emitter = new EventEmitter();

Adi_emitter.on('greet', () => {
    console.log('Event GREET emitted');
});

Adi_emitter.emit('greet');
//argument based 

const argu_emitter = new EventEmitter();

argu_emitter.on('greet', (name) => {
    console.log(`Hello ${name}!`);
});

argu_emitter.emit('greet', 'ADITYA');
