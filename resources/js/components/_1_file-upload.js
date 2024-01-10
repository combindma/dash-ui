// File#: _1_file-upload
// Usage: codyhouse.co/license
(function() {
    var InputFile = function(element) {
        this.element = element;
        this.input = this.element.getElementsByClassName('file-upload__input')[0];
        this.label = this.element.getElementsByClassName('file-upload__label')[0];
        this.multipleUpload = this.input.hasAttribute('multiple'); // allow for multiple files selection

        // this is the label text element -> when user selects a file, it will be changed from the default value to the name of the file
        this.labelText = this.element.getElementsByClassName('file-upload__text')[0];
        this.initialLabel = this.labelText.textContent;

        initInputFileEvents(this);
    };

    function initInputFileEvents(inputFile) {
        // make label focusable
        inputFile.label.setAttribute('tabindex', '0');
        inputFile.input.setAttribute('tabindex', '-1');

        // move focus from input to label -> this is triggered when a file is selected or the file picker modal is closed
        inputFile.input.addEventListener('focusin', function(event){
            inputFile.label.focus();
        });

        // press 'Enter' key on label element -> trigger file selection
        inputFile.label.addEventListener('keydown', function(event) {
            if( event.keyCode && event.keyCode == 13 || event.key && event.key.toLowerCase() == 'enter') {inputFile.input.click();}
        });

        // file has been selected -> update label text
        inputFile.input.addEventListener('change', function(event){
            updateInputLabelText(inputFile);
        });
    };

    function updateInputLabelText(inputFile) {
        var label = '';
        if(inputFile.input.files && inputFile.input.files.length < 1) {
            label = inputFile.initialLabel; // no selection -> revert to initial label
        } else if(inputFile.multipleUpload && inputFile.input.files && inputFile.input.files.length > 1) {
            label = inputFile.input.files.length+ ' files'; // multiple selection -> show number of files
        } else {
            label = inputFile.input.value.split('\\').pop(); // single file selection -> show name of the file
        }
        inputFile.labelText.textContent = label;
    };

    //initialize the InputFile objects
    var inputFiles = document.getElementsByClassName('file-upload');
    if( inputFiles.length > 0 ) {
        for( var i = 0; i < inputFiles.length; i++) {
            (function(i){new InputFile(inputFiles[i]);})(i);
        }
    }
}());
