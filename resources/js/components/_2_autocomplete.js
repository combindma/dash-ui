// File : _2_autocomplete
// Usage: codyhouse.co/license
(function() {
    var Autocomplete = function(opts) {
        if(!('CSS' in window) || !CSS.supports('color', 'var(--color-var)')) return;
        this.options = extendProps(Autocomplete.defaults, opts);
        this.element = this.options.element;
        this.input = this.element.getElementsByClassName('js-autocomplete__input')[0];
        this.results = this.element.getElementsByClassName('js-autocomplete__results')[0];
        this.resultsList = this.results.getElementsByClassName('js-autocomplete__list')[0];
        this.ariaResult = this.element.getElementsByClassName('js-autocomplete__aria-results');
        this.resultClassName = this.element.getElementsByClassName('js-autocomplete__item').length > 0 ? 'js-autocomplete__item' : 'js-autocomplete__result';
        // store search info
        this.inputVal = '';
        this.typeId = false;
        this.searching = false;
        this.searchingClass = this.element.getAttribute('data-autocomplete-searching-class') || 'autocomplete--searching';
        // dropdown reveal class
        this.dropdownActiveClass =  this.element.getAttribute('data-autocomplete-dropdown-visible-class') || this.element.getAttribute('data-dropdown-active-class');
        // truncate dropdown
        this.truncateDropdown = this.element.getAttribute('data-autocomplete-dropdown-truncate') && this.element.getAttribute('data-autocomplete-dropdown-truncate') == 'on' ? true : false;
        initAutocomplete(this);
        this.autocompleteClosed = false; // fix issue when selecting an option from the list
    };

    function initAutocomplete(element) {
        initAutocompleteAria(element); // set aria attributes for SR and keyboard users
        initAutocompleteTemplates(element);
        initAutocompleteEvents(element);
    };

    function initAutocompleteAria(element) {
        // set aria attributes for input element
        element.input.setAttribute('role', 'combobox');
        element.input.setAttribute('aria-autocomplete', 'list');
        var listId = element.resultsList.getAttribute('id');
        if(listId) element.input.setAttribute('aria-owns', listId);
        // set aria attributes for autocomplete list
        element.resultsList.setAttribute('role', 'list');
    };

    function initAutocompleteTemplates(element) {
        element.templateItems = element.resultsList.querySelectorAll('.'+element.resultClassName+'[data-autocomplete-template]');
        if(element.templateItems.length < 1) element.templateItems = element.resultsList.querySelectorAll('.'+element.resultClassName);
        element.templates = [];
        for(var i = 0; i < element.templateItems.length; i++) {
            element.templates[i] = element.templateItems[i].getAttribute('data-autocomplete-template');
        }
    };

    function initAutocompleteEvents(element) {
        // input - keyboard navigation
        element.input.addEventListener('keyup', function(event){
            handleInputTyped(element, event);
        });

        // if input type="search" -> detect when clicking on 'x' to clear input
        element.input.addEventListener('search', function(event){
            updateSearch(element);
        });

        // make sure dropdown is open on click
        element.input.addEventListener('click', function(event){
            updateSearch(element, true);
        });

        element.input.addEventListener('focus', function(event){
            if(element.autocompleteClosed) {
                element.autocompleteClosed = false;
                return;
            }
            updateSearch(element, true);
        });

        // input loses focus -> close menu
        element.input.addEventListener('blur', function(event){
            checkFocusLost(element, event);
        });

        // results list - keyboard navigation
        element.resultsList.addEventListener('keydown', function(event){
            navigateList(element, event);
        });

        // results list loses focus -> close menu
        element.resultsList.addEventListener('focusout', function(event){
            checkFocusLost(element, event);
        });

        // close on esc
        window.addEventListener('keyup', function(event){
            if( event.keyCode && event.keyCode == 27 || event.key && event.key.toLowerCase() == 'escape' ) {
                toggleOptionsList(element, false);
            } else if(event.keyCode && event.keyCode == 13 || event.key && event.key.toLowerCase() == 'enter') { // on Enter - select result if focus is within results list
                selectResult(element, document.activeElement.closest('.'+element.resultClassName), event);
            }
        });

        // select element from list
        element.resultsList.addEventListener('click', function(event){
            selectResult(element, event.target.closest('.'+element.resultClassName), event);
        });
    };

    function checkFocusLost(element, event) {
        if(element.element.contains(event.relatedTarget)) return;
        toggleOptionsList(element, false);
    };

    function handleInputTyped(element, event) {
        if(event.key.toLowerCase() == 'arrowdown' || event.keyCode == '40') {
            moveFocusToList(element);
        } else {
            updateSearch(element);
        }
    };

    function moveFocusToList(element) {
        if(!element.element.classList.contains(element.dropdownActiveClass)) return;
        resetSearch(element); // clearTimeout
        // make sure first element is focusable
        var index = 0;
        if(!elementListIsFocusable(element.resultsItems[index])) {
            index = getElementFocusbleIndex(element, index, true);
        }
        getListFocusableEl(element.resultsItems[index]).focus();
    };

    function updateSearch(element, bool) {
        var inputValue = element.input.value;
        if(inputValue == element.inputVal && !bool) return; // input value did not change
        element.inputVal = inputValue;
        if(element.typeId) clearInterval(element.typeId); // clearTimeout
        if(element.inputVal.length < element.options.characters) { // not enough characters to start searching
            toggleOptionsList(element, false);
            return;
        }
        if(bool) { // on focus -> update result list without waiting for the debounce
            updateResultsList(element, 'focus');
            return;
        }
        element.typeId = setTimeout(function(){
            updateResultsList(element, 'type');
        }, element.options.debounce);
    };

    function toggleOptionsList(element, bool) {
        // toggle visibility of options list
        if(bool) {
            if(element.element.classList.contains(element.dropdownActiveClass)) return;
            element.element.classList.add(element.dropdownActiveClass);
            element.input.setAttribute('aria-expanded', true);
            truncateAutocompleteList(element);
        } else {
            if(!element.element.classList.contains(element.dropdownActiveClass)) return;
            if(element.resultsList.contains(document.activeElement)) {
                element.autocompleteClosed = true;
                element.input.focus();
            }
            element.element.classList.remove(element.dropdownActiveClass);
            element.input.removeAttribute('aria-expanded');
            resetSearch(element); // clearTimeout
        }
    };

    function truncateAutocompleteList(element) {
        if(!element.truncateDropdown) return;
        // reset max height
        element.resultsList.style.maxHeight = '';
        // check available space
        var spaceBelow = (window.innerHeight - element.input.getBoundingClientRect().bottom - 10),
            maxHeight = parseInt(getComputedStyle(element.resultsList).maxHeight);

        (maxHeight > spaceBelow)
            ? element.resultsList.style.maxHeight = spaceBelow+'px'
            : element.resultsList.style.maxHeight = '';
    };

    function updateResultsList(element, eventType) {
        if(element.searching) return;
        element.searching = true;
        element.element.classList.add(element.searchingClass); // show loader
        element.options.searchData(element.inputVal, function(data, cb){
            // data = custom results
            populateResults(element, data, cb);
            element.element.classList.remove(element.searchingClass);
            toggleOptionsList(element, true);
            updateAriaRegion(element);
            element.searching = false;
        }, eventType);
    };

    function updateAriaRegion(element) {
        element.resultsItems = element.resultsList.querySelectorAll('.'+element.resultClassName+'[tabindex="-1"]');
        if(element.ariaResult.length == 0) return;
        element.ariaResult[0].textContent = element.resultsItems.length;
    };

    function resetSearch(element) {
        if(element.typeId) clearInterval(element.typeId);
        element.typeId = false;
    };

    function navigateList(element, event) {
        var downArrow = (event.key.toLowerCase() == 'arrowdown' || event.keyCode == '40'),
            upArrow = (event.key.toLowerCase() == 'arrowup' || event.keyCode == '38');
        if(!downArrow && !upArrow) return;
        event.preventDefault();
        var selectedElement = document.activeElement.closest('.'+element.resultClassName) || document.activeElement;
        var index = Array.prototype.indexOf.call(element.resultsItems, selectedElement);
        var newIndex = getElementFocusbleIndex(element, index, downArrow);
        getListFocusableEl(element.resultsItems[newIndex]).focus();
    };

    function getElementFocusbleIndex(element, index, nextItem) {
        var newIndex = nextItem ? index + 1 : index - 1;
        if(newIndex < 0) newIndex = element.resultsItems.length - 1;
        if(newIndex >= element.resultsItems.length) newIndex = 0;
        // check if element can be focused
        if(!elementListIsFocusable(element.resultsItems[newIndex])) {
            // skip this element
            return getElementFocusbleIndex(element, newIndex, nextItem);
        }
        return newIndex;
    };

    function elementListIsFocusable(item) {
        var role = item.getAttribute('role');
        if(role && role == 'presentation') {
            // skip this element
            return false;
        }
        return true;
    };

    function getListFocusableEl(item) {
        var newFocus = item,
            focusable = newFocus.querySelectorAll('button:not([disabled]), [href]');
        if(focusable.length > 0 ) newFocus = focusable[0];
        return newFocus;
    };

    function selectResult(element, result, event) {
        if(!result) return;
        if(element.options.onClick) {
            element.options.onClick(result, element, event, function(){
                toggleOptionsList(element, false);
            });
        } else {
            element.input.value = getResultContent(result);
            toggleOptionsList(element, false);
        }
        element.inputVal = element.input.value;
    };

    function getResultContent(result) { // get text content of selected item
        var labelElement = result.querySelector('[data-autocomplete-label]');
        return labelElement ? labelElement.textContent : result.textContent;
    };

    function populateResults(element, data, cb) {
        var innerHtml = '';

        for(var i = 0; i < data.length; i++) {
            innerHtml = innerHtml + getItemHtml(element, data[i]);
        }
        if(element.options.populate) element.resultsList.innerHTML = innerHtml;
        else if(cb) cb(innerHtml);
    };

    function getItemHtml(element, data) {
        var clone = getClone(element, data);
        clone.classList.remove('hidden');
        clone.setAttribute('tabindex', '-1');
        for(var key in data) {
            if (data.hasOwnProperty(key)) {
                if(key == 'label') setLabel(clone, data[key]);
                else if(key == 'class') setClass(clone, data[key]);
                else if(key == 'url') setUrl(clone, data[key]);
                else if(key == 'src') setSrc(clone, data[key]);
                else setKey(clone, key, data[key]);
            }
        }
        return clone.outerHTML;
    };

    function getClone(element, data) {
        var item = false;
        if(element.templateItems.length == 1 || !data['template']) item = element.templateItems[0];
        else {
            for(var i = 0; i < element.templateItems.length; i++) {
                if(data['template'] == element.templates[i]) {
                    item = element.templateItems[i];
                }
            }
            if(!item) item = element.templateItems[0];
        }
        return item.cloneNode(true);
    };

    function setLabel(clone, label) {
        var labelElement = clone.querySelector('[data-autocomplete-label]');
        labelElement
            ? labelElement.textContent = label
            : clone.textContent = label;
    };

    function setClass(clone, classList) {
        var classesArray = classList.split(' ');
        clone.classList.add(classesArray[0]);
        if (classesArray.length > 1) setClass(clone, classesArray.slice(1).join(' '));
    };

    function setUrl(clone, url) {
        var linkElement = clone.querySelector('[data-autocomplete-url]');
        if(linkElement) linkElement.setAttribute('href', url);
    };

    function setSrc(clone, src) {
        var imgElement = clone.querySelector('[data-autocomplete-src]');
        if(imgElement) imgElement.setAttribute('src', src);
    };

    function setKey(clone, key, value) {
        var subElement = clone.querySelector('[data-autocomplete-'+key+']');
        if(subElement) {
            if(subElement.hasAttribute('data-autocomplete-html')) subElement.innerHTML = value;
            else subElement.textContent = value;
        }
    };

    var extendProps = function () {
        // Variables
        var extended = {};
        var deep = false;
        var i = 0;
        var length = arguments.length;

        // Check if a deep merge
        if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
            deep = arguments[0];
            i++;
        }

        // Merge the object into the extended object
        var merge = function (obj) {
            for ( var prop in obj ) {
                if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
                    // If deep merge and property is an object, merge properties
                    if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
                        extended[prop] = extend( true, extended[prop], obj[prop] );
                    } else {
                        extended[prop] = obj[prop];
                    }
                }
            }
        };

        // Loop through each object and conduct a merge
        for ( ; i < length; i++ ) {
            var obj = arguments[i];
            merge(obj);
        }

        return extended;
    };

    Autocomplete.defaults = {
        element : '',
        debounce: 200,
        characters: 2,
        populate: true,
        searchData: false, // function used to return results
        onClick: false // function executed when selecting an item in the list; arguments (result, obj) -> selected <li> item + Autocomplete obj reference
    };

    window.Autocomplete = Autocomplete;
}());
