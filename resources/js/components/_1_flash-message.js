// File#: _1_flash-message
// Usage: codyhouse.co/license
(function() {
    var FlashMessage = function(element) {
        this.element = element;
        this.showClass = "flash-message--is-visible";
        this.messageDuration = parseInt(this.element.getAttribute('data-duration')) || 3000;
        this.triggers = document.querySelectorAll('[aria-controls="'+this.element.getAttribute('id')+'"]');
        this.temeoutId = null;
        this.isVisible = false;
        this.initFlashMessage();
    };

    FlashMessage.prototype.initFlashMessage = function() {
        var self = this;
        //open modal when clicking on trigger buttons
        if ( self.triggers ) {
            for(var i = 0; i < self.triggers.length; i++) {
                self.triggers[i].addEventListener('click', function(event) {
                    event.preventDefault();
                    self.showFlashMessage();
                });
            }
        }
        //listen to the event that triggers the opening of a flash message
        self.element.addEventListener('showFlashMessage', function(){
            self.showFlashMessage();
        });
    };

    FlashMessage.prototype.showFlashMessage = function() {
        var self = this;
        self.element.classList.add(self.showClass);
        self.isVisible = true;
        //hide other flash messages
        self.hideOtherFlashMessages();
        if( self.messageDuration > 0 ) {
            //hide the message after an interval (this.messageDuration)
            self.temeoutId = setTimeout(function(){
                self.hideFlashMessage();
            }, self.messageDuration);
        }
    };

    FlashMessage.prototype.hideFlashMessage = function() {
        this.element.classList.remove(this.showClass);
        this.isVisible = false;
        //reset timeout
        clearTimeout(this.temeoutId);
        this.temeoutId = null;
    };

    FlashMessage.prototype.hideOtherFlashMessages = function() {
        var event = new CustomEvent('flashMessageShown', { detail: this.element });
        window.dispatchEvent(event);
    };

    FlashMessage.prototype.checkFlashMessage = function(message) {
        if( !this.isVisible ) return;
        if( this.element == message) return;
        this.hideFlashMessage();
    };

    window.FlashMessage = FlashMessage;

    //initialize the FlashMessage objects
    var flashMessages = document.getElementsByClassName('js-flash-message');
    if( flashMessages.length > 0 ) {
        var flashMessagesArray = [];
        for( var i = 0; i < flashMessages.length; i++) {
            (function(i){flashMessagesArray.push(new FlashMessage(flashMessages[i]));})(i);
        }

        //listen for a flash message to be shown -> close the others
        window.addEventListener('flashMessageShown', function(event){
            flashMessagesArray.forEach(function(element){
                element.checkFlashMessage(event.detail);
            });
        });
    }
}());
