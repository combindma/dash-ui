// File#: _1_switch-icon
// Usage: codyhouse.co/license
(function() {
    var switchIcons = document.getElementsByClassName('js-switch-icon');
    if( switchIcons.length > 0 ) {
        for(var i = 0; i < switchIcons.length; i++) {(function(i){
            if( !switchIcons[i].classList.contains('switch-icon--hover') ) initswitchIcons(switchIcons[i]);
        })(i);}

        function initswitchIcons(btn) {
            btn.addEventListener('click', function(event){
                event.preventDefault();
                var status = !btn.classList.contains('switch-icon--state-b');
                btn.classList.toggle('switch-icon--state-b', status);
                // emit custom event
                var event = new CustomEvent('switch-icon-clicked', {detail: status});
                btn.dispatchEvent(event);
            });
        };
    }
}());
