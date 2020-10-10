$(document).ready(() => {
    const socket = io.connect('http://localhost:3000')
    localStorage.setItem('record', '0') // Reseta o status

    var timer = new easytimer.Timer();
    timer.addEventListener('secondsUpdated', function (e) {
        $('.timing span').html(timer.getTimeValues().toString()); // add contador ao objeto 
    });

    $(document).on('click', '.button', () => {
        if (localStorage.getItem('record') == 0) {
            localStorage.setItem('record', '1')
            socket.emit('record', true) //envia o socket
            timer.start(); //inicia o contador
            $('.timing').removeClass('hidden').addClass('visible')
        } else {
            localStorage.setItem('record', '0')
            socket.emit('record', false)
            timer.stop(); //para o contador
            $('.timing span').html('00:00:00'); //reseta o contador
            $('.timing').addClass('hidden').removeClass('visible')
        }

    })

})