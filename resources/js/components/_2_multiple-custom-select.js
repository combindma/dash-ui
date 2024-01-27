// File#: _2_multiple-custom-select-v2
// Usage: codyhouse.co/license
//This component is overwritten
(function() {
    var MultiCustomSelectTwo = function(element) {
        this.element = element;
        this.checkboxes = this.element.getElementsByClassName('js-multi-select-v2__input');
        this.counter = this.element.getElementsByClassName('js-multi-select-v2__selected-items-counter');
        this.resetBtn = this.element.getElementsByClassName('js-multi-select-v2__reset');
        this.checkedClass = 'multi-select-v2__label--checked';
        this.listWrapper = this.element.getElementsByClassName('js-multi-select-v2__wrapper');
        this.searchInput = this.element.getElementsByClassName('js-multi-select-v2__search');
        initMultiCustomSelectTwo(this);
        this.toggleListDisplay();
    };

    function initMultiCustomSelectTwo(element) {
        // init number of checked inputs
        resetCounter(element);
        // init checked classes
        initCheckedClass(element);
        //Init the checked labels
        element.updateCheckedLabelsDisplay();

        // detect input checked/unchecked
        element.element.addEventListener('change', function(event){
            var label = event.target.closest('label');
            if(label) label.classList.toggle(element.checkedClass, event.target.checked);
            resetCounter(element);
            // Update the display of checked labels
            element.updateCheckedLabelsDisplay();
        });

        // reset checked inputs
        if(element.resetBtn.length > 0) {
            element.resetBtn[0].addEventListener('click', function(event) {
                for(var i = 0; i < element.checkboxes.length; i++) element.checkboxes[i].checked = false;
                resetCounter(element, 0);
                resetCheckedClasses(element);
                // Clear the display of checked labels
                element.updateCheckedLabelsDisplay();
            });
        }
    };

    MultiCustomSelectTwo.prototype.toggleListDisplay = function() {
        var _this = this;

        if (this.searchInput.length > 0) {
            this.searchInput[0].addEventListener('focus', function() {
                if (_this.listWrapper.length > 0) _this.listWrapper[0].style.removeProperty('display');
            });

            document.addEventListener('click', function(e) {
                if (!_this.element.contains(e.target)) {
                    if (_this.listWrapper.length > 0) _this.listWrapper[0].style.display = 'none';
                }
            });

            if (_this.listWrapper.length > 0) {
                _this.listWrapper[0].addEventListener('click', function(e) {
                    e.stopPropagation(); // Prevent hiding when clicking within the list wrapper
                });
            }
        }
    };

    MultiCustomSelectTwo.prototype.updateCheckedLabelsDisplay = function() {
        var selectedItemsContainer = this.element.querySelector('.js-multi-select-v2__selected-items');
        if (!selectedItemsContainer) return; // Exit if the container does not exist

        // Clear existing content
        selectedItemsContainer.innerHTML = '';

        // Iterate through checkboxes to find checked ones and display their labels
        Array.from(this.checkboxes).forEach(function(checkbox) {
            if (checkbox.checked) {
                var label = checkbox.closest('label').textContent.trim(); // Adjust based on your actual DOM structure
                // Create tag element for each checked label
                var tagElement = document.createElement('span');
                tagElement.className = 'inline-flex items-center min-h-2 bg-neutral-200 rounded-md py-1 px-2';
                tagElement.innerHTML = `<span class="max-w-[160px] truncate text-xs">${label}</span>`;

                // Append the tag element to the container
                selectedItemsContainer.appendChild(tagElement);
            }
        });
    };

    function resetCounter(element, value) {
        // update number of selected checkboxes
        if(element.counter.length < 1) return;
        if(value !== undefined) {
            element.counter[0].textContent = value;
            return;
        }

        var count = 0;
        for(var i = 0; i < element.checkboxes.length; i++) {
            if(element.checkboxes[i].checked) count = count + 1;
        }
        element.counter[0].textContent = count;
    };

    function resetCheckedClasses(element) {
        var checkedLabels = element.element.getElementsByClassName(element.checkedClass);
        while(checkedLabels[0]) {
            checkedLabels[0].classList.remove(element.checkedClass);
        }
    };

    function initCheckedClass(element) {
        for(var i = 0; i < element.checkboxes.length; i++) {
            if(element.checkboxes[i].checked) {
                var label = element.checkboxes[i].closest('label');
                if(label) label.classList.add(element.checkedClass);
            }
        }
    };

    //initialize the CustomSelect objects
    var customSelect = document.getElementsByClassName('js-multi-select-v2');
    if( customSelect.length > 0 ) {
        for( var i = 0; i < customSelect.length; i++) {
            (function(i){new MultiCustomSelectTwo(customSelect[i]);})(i);
        }
    }
}());
