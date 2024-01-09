// File#: _1_alert
// Usage: codyhouse.co/license
(function() {
    var alertClose = document.getElementsByClassName('js-alert__close-btn');
    if( alertClose.length > 0 ) {
        for( var i = 0; i < alertClose.length; i++) {
            (function(i){initAlertEvent(alertClose[i]);})(i);
        }
    };
}());

function initAlertEvent(element) {
    element.addEventListener('click', function(event){
        event.preventDefault();
        element.closest('.js-alert').classList.remove('alert--is-visible');
    });
};
