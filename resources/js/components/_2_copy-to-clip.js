// File#: _2_copy-to-clip
// Usage: codyhouse.co/license
(function() {
    var CopyClipboard = function() {
        this.copyTargetClass = 'js-copy-to-clip';
        this.copyStatusClass = 'copy-to-clip--copied';
        this.resetDelay = 2000; // delay for removing the copy-to-clip--copied class
        initCopyToClipboard(this);
    };

    function initCopyToClipboard(element) {
        document.addEventListener('click', function(event) {
            var target = event.target.closest('.'+element.copyTargetClass);
            if(!target) return;
            copyContentToClipboard(element, target);
        });
    };

    function copyContentToClipboard(element, target) {
        // copy to clipboard
        navigator.clipboard.writeText(getContentToCopy(target)).then(function() { // content successfully copied
            // add success class to target
            target.classList.add(element.copyStatusClass);

            setTimeout(function(){ // remove success class from target
                target.classList.remove(element.copyStatusClass);
            }, element.resetDelay);

            // change tooltip content
            var newTitle = target.getAttribute('data-success-title');
            if(newTitle && newTitle != '') target.dispatchEvent(new CustomEvent("newContent", {detail: newTitle}));

            // dispatch success event
            target.dispatchEvent(new CustomEvent("contentCopied"));
        }, function() { // error while copying the code
            // dispatch error event
            target.dispatchEvent(new CustomEvent("contentNotCopied"));
        });
    };

    function getContentToCopy(target) {
        var content = target.innerText;
        var ariaControls = document.getElementById(target.getAttribute('aria-controls')),
            defaultText = target.getAttribute('data-clipboard-content');
        if(ariaControls) {
            content = ariaControls.innerText;
        } else if(defaultText && defaultText != '') {
            content = defaultText;
        }
        return content;
    };

    window.CopyClipboard = CopyClipboard;

    var copyToClipboard = document.getElementsByClassName('js-copy-to-clip');
    if(copyToClipboard.length > 0) {
        new CopyClipboard();
    }
}());
