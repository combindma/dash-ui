function Util () {}

Util.addClass = function(el, className) {
    var classList = className.split(' ');
    el.classList.add(classList[0]);
    if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' '));
};

Util.removeClass = function(el, className) {
    var classList = className.split(' ');
    el.classList.remove(classList[0]);
    if (classList.length > 1) Util.removeClass(el, classList.slice(1).join(' '));
};

Util.setAttributes = function(el, attrs) {
    for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
};

(function() {
    var alertClose = document.getElementsByClassName('js-alert__close-btn');
    if( alertClose.length > 0 ) {
        for( var i = 0; i < alertClose.length; i++) {
            (function(i){initAlertEvent(alertClose[i]);})(i);
        }
    }
}());

function initAlertEvent(element) {
    element.addEventListener('click', function(event){
        event.preventDefault();
        element.closest('.js-alert').classList.add('hidden');
    });
}

// Usage: tooltip
(function() {
    var Tooltip = function(element) {
        this.element = element;
        this.tooltip = false;
        this.tooltipIntervalId = false;
        this.tooltipContent = this.element.getAttribute('title');
        this.tooltipPosition = (this.element.getAttribute('data-tooltip-position')) ? this.element.getAttribute('data-tooltip-position') : 'top';
        this.tooltipClasses = (this.element.getAttribute('data-tooltip-class')) ? this.element.getAttribute('data-tooltip-class') : false;
        this.tooltipId = 'js-tooltip-element'; // id of the tooltip element -> trigger will have the same aria-describedby attr
        // there are cases where you only need the aria-label -> SR do not need to read the tooltip content (e.g., footnotes)
        this.tooltipDescription = (!(this.element.getAttribute('data-tooltip-describedby') && this.element.getAttribute('data-tooltip-describedby') === 'false'));

        this.tooltipDelay = this.element.getAttribute('data-tooltip-delay'); // show tooltip after a delay (in ms)
        if(!this.tooltipDelay) this.tooltipDelay = 300;
        this.tooltipDelta = parseInt(this.element.getAttribute('data-tooltip-gap')); // distance beetwen tooltip and trigger element (in px)
        if(isNaN(this.tooltipDelta)) this.tooltipDelta = 10;
        this.tooltipTriggerHover = false;
        // tooltp sticky option
        this.tooltipSticky = (this.tooltipClasses && this.tooltipClasses.indexOf('tooltip--sticky') > -1);
        this.tooltipHover = false;
        if(this.tooltipSticky) {
            this.tooltipHoverInterval = false;
        }
        // tooltip triangle - css variable to control its position
        this.tooltipTriangleVar = '--tooltip-triangle-translate';
        resetTooltipContent(this);
        initTooltip(this);
    };

    function resetTooltipContent(tooltip) {
        var htmlContent = tooltip.element.getAttribute('data-tooltip-title');
        if(htmlContent) {
            tooltip.tooltipContent = htmlContent;
        }
    }

    function initTooltip(tooltipObj) {
        // reset trigger element
        tooltipObj.element.removeAttribute('title');
        tooltipObj.element.setAttribute('tabindex', '0');
        // add event listeners
        tooltipObj.element.addEventListener('mouseenter', handleEvent.bind(tooltipObj));
        tooltipObj.element.addEventListener('focus', handleEvent.bind(tooltipObj));
    }

    function removeTooltipEvents(tooltipObj) {
        // remove event listeners
        tooltipObj.element.removeEventListener('mouseleave',  handleEvent.bind(tooltipObj));
        tooltipObj.element.removeEventListener('blur',  handleEvent.bind(tooltipObj));
    }

    function handleEvent(event) {
        // handle events
        switch(event.type) {
            case 'mouseenter':
            case 'focus':
                showTooltip(this, event);
                break;
            case 'mouseleave':
            case 'blur':
                checkTooltip(this);
                break;
            case 'newContent':
                changeTooltipContent(this, event);
                break;
        }
    }

    function showTooltip(tooltipObj, event) {
        // tooltip has already been triggered
        if(tooltipObj.tooltipIntervalId) return;
        tooltipObj.tooltipTriggerHover = true;
        // listen to close events
        tooltipObj.element.addEventListener('mouseleave', handleEvent.bind(tooltipObj));
        tooltipObj.element.addEventListener('blur', handleEvent.bind(tooltipObj));
        // custom event to reset tooltip content
        tooltipObj.element.addEventListener('newContent', handleEvent.bind(tooltipObj));

        // show tooltip with a delay
        tooltipObj.tooltipIntervalId = setTimeout(function(){
            createTooltip(tooltipObj);
        }, tooltipObj.tooltipDelay);
    }

    function createTooltip(tooltipObj) {
        tooltipObj.tooltip = document.getElementById(tooltipObj.tooltipId);

        if( !tooltipObj.tooltip ) { // tooltip element does not yet exist
            tooltipObj.tooltip = document.createElement('div');
            document.body.appendChild(tooltipObj.tooltip);
        }

        // remove data-reset attribute that is used when updating tooltip content (newContent custom event)
        tooltipObj.tooltip.removeAttribute('data-reset');

        // reset tooltip content/position
        Util.setAttributes(tooltipObj.tooltip, {'id': tooltipObj.tooltipId, 'class': 'absolute inline-block z-5 py-1.5 lg:py-2 px-2 lg:px-3 max-w-200 rounded-sm bg-white shadow-md text-sm leading-tight lg:text-base before:content-[""] before:absolute before:bg-inherit before:border-inherit before:w-3 before:h-3 before:[clip-path:polygon(0%_0%,100%_100%,100%_100%,0%_100%)] invisible opacity-0 js-tooltip', 'role': 'tooltip'});
        tooltipObj.tooltip.innerHTML = tooltipObj.tooltipContent;
        if(tooltipObj.tooltipDescription) tooltipObj.element.setAttribute('aria-describedby', tooltipObj.tooltipId);
        if(tooltipObj.tooltipClasses) Util.addClass(tooltipObj.tooltip, tooltipObj.tooltipClasses);
        if(tooltipObj.tooltipSticky) Util.addClass(tooltipObj.tooltip, 'tooltip--sticky');
        placeTooltip(tooltipObj);
        Util.removeClass(tooltipObj.tooltip, 'invisible opacity-0');

        // if tooltip is sticky, listen to mouse events
        if(!tooltipObj.tooltipSticky) return;
        tooltipObj.tooltip.addEventListener('mouseenter', function cb(){
            tooltipObj.tooltipHover = true;
            if(tooltipObj.tooltipHoverInterval) {
                clearInterval(tooltipObj.tooltipHoverInterval);
                tooltipObj.tooltipHoverInterval = false;
            }
            tooltipObj.tooltip.removeEventListener('mouseenter', cb);
            tooltipLeaveEvent(tooltipObj);
        });
    };

    function tooltipLeaveEvent(tooltipObj) {
        tooltipObj.tooltip.addEventListener('mouseleave', function cb(){
            tooltipObj.tooltipHover = false;
            tooltipObj.tooltip.removeEventListener('mouseleave', cb);
            hideTooltip(tooltipObj);
        });
    }

    function placeTooltip(tooltipObj) {
        // set top and left position of the tooltip according to the data-tooltip-position attr of the trigger
        var dimention = [tooltipObj.tooltip.offsetHeight, tooltipObj.tooltip.offsetWidth],
            positionTrigger = tooltipObj.element.getBoundingClientRect(),
            position = [],
            scrollY = window.scrollY || window.pageYOffset;

        position['top'] = [ (positionTrigger.top - dimention[0] - tooltipObj.tooltipDelta + scrollY), (positionTrigger.right/2 + positionTrigger.left/2 - dimention[1]/2)];
        position['bottom'] = [ (positionTrigger.bottom + tooltipObj.tooltipDelta + scrollY), (positionTrigger.right/2 + positionTrigger.left/2 - dimention[1]/2)];
        position['left'] = [(positionTrigger.top/2 + positionTrigger.bottom/2 - dimention[0]/2 + scrollY), positionTrigger.left - dimention[1] - tooltipObj.tooltipDelta];
        position['right'] = [(positionTrigger.top/2 + positionTrigger.bottom/2 - dimention[0]/2 + scrollY), positionTrigger.right + tooltipObj.tooltipDelta];

        var direction = tooltipObj.tooltipPosition;
        if( direction === 'top' && position['top'][0] < scrollY) direction = 'bottom';
        else if( direction === 'bottom' && position['bottom'][0] + tooltipObj.tooltipDelta + dimention[0] > scrollY + window.innerHeight) direction = 'top';
        else if( direction === 'left' && position['left'][1] < 0 )  direction = 'right';
        else if( direction === 'right' && position['right'][1] + dimention[1] > window.innerWidth ) direction = 'left';

        // reset tooltip triangle translate value
        tooltipObj.tooltip.style.setProperty(tooltipObj.tooltipTriangleVar, '0px');

        if(direction === 'top' || direction === 'bottom') {
            var deltaMarg = 5;
            if(position[direction][1] < 0 ) {
                position[direction][1] = deltaMarg;
                // make sure triangle is at the center of the tooltip trigger
                tooltipObj.tooltip.style.setProperty(tooltipObj.tooltipTriangleVar, (positionTrigger.left + 0.5*positionTrigger.width - 0.5*dimention[1] - deltaMarg)+'px');
            }
            if(position[direction][1] + dimention[1] > window.innerWidth ) {
                position[direction][1] = window.innerWidth - dimention[1] - deltaMarg;
                // make sure triangle is at the center of the tooltip trigger
                tooltipObj.tooltip.style.setProperty(tooltipObj.tooltipTriangleVar, (0.5*dimention[1] - (window.innerWidth - positionTrigger.right) - 0.5*positionTrigger.width + deltaMarg)+'px');
            }
        }
        tooltipObj.tooltip.style.top = position[direction][0]+'px';
        tooltipObj.tooltip.style.left = position[direction][1]+'px';
        Util.addClass(tooltipObj.tooltip, 'tooltip--'+direction);
    }

    function checkTooltip(tooltipObj) {
        tooltipObj.tooltipTriggerHover = false;
        if(!tooltipObj.tooltipSticky) hideTooltip(tooltipObj);
        else {
            if(tooltipObj.tooltipHover) return;
            if(tooltipObj.tooltipHoverInterval) return;
            tooltipObj.tooltipHoverInterval = setTimeout(function(){
                hideTooltip(tooltipObj);
                tooltipObj.tooltipHoverInterval = false;
            }, 300);
        }
    };

    function hideTooltip(tooltipObj) {
        if(tooltipObj.tooltipHover || tooltipObj.tooltipTriggerHover) return;
        clearInterval(tooltipObj.tooltipIntervalId);
        if(tooltipObj.tooltipHoverInterval) {
            clearInterval(tooltipObj.tooltipHoverInterval);
            tooltipObj.tooltipHoverInterval = false;
        }
        tooltipObj.tooltipIntervalId = false;
        if(!tooltipObj.tooltip) return;
        // hide tooltip
        removeTooltip(tooltipObj);
        // remove events
        removeTooltipEvents(tooltipObj);
    };

    function removeTooltip(tooltipObj) {
        if(tooltipObj.tooltipContent === tooltipObj.tooltip.innerHTML || tooltipObj.tooltip.getAttribute('data-reset') === 'on') {
            Util.addClass(tooltipObj.tooltip, 'invisible opacity-0');
            tooltipObj.tooltip.removeAttribute('data-reset');
        }
        if(tooltipObj.tooltipDescription) tooltipObj.element.removeAttribute('aria-describedby');
    };

    function changeTooltipContent(tooltipObj, event) {
        if(tooltipObj.tooltip && tooltipObj.tooltipTriggerHover && event.detail) {
            tooltipObj.tooltip.innerHTML = event.detail;
            tooltipObj.tooltip.setAttribute('data-reset', 'on');
            placeTooltip(tooltipObj);
        }
    }

    window.Tooltip = Tooltip;

    //initialize the Tooltip objects
    var tooltips = document.getElementsByClassName('js-tooltip-trigger');
    if( tooltips.length > 0 ) {
        for( var i = 0; i < tooltips.length; i++) {
            (function(i){new Tooltip(tooltips[i]);})(i);
        }
    }
}());

// Autocomplete
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
    }

    function initAutocompleteAria(element) {
        // set aria attributes for input element
        element.input.setAttribute('role', 'combobox');
        element.input.setAttribute('aria-autocomplete', 'list');
        var listId = element.resultsList.getAttribute('id');
        if(listId) element.input.setAttribute('aria-owns', listId);
        // set aria attributes for autocomplete list
        element.resultsList.setAttribute('role', 'list');
    }

    function initAutocompleteTemplates(element) {
        element.templateItems = element.resultsList.querySelectorAll('.'+element.resultClassName+'[data-autocomplete-template]');
        if(element.templateItems.length < 1) element.templateItems = element.resultsList.querySelectorAll('.'+element.resultClassName);
        element.templates = [];
        for(var i = 0; i < element.templateItems.length; i++) {
            element.templates[i] = element.templateItems[i].getAttribute('data-autocomplete-template');
        }
    }

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
            if( event.keyCode && event.keyCode === 27 || event.key && event.key.toLowerCase() == 'escape' ) {
                toggleOptionsList(element, false);
            } else if(event.keyCode && event.keyCode == 13 || event.key && event.key.toLowerCase() == 'enter') { // on Enter - select result if focus is within results list
                selectResult(element, document.activeElement.closest('.'+element.resultClassName), event);
            }
        });

        // select element from list
        element.resultsList.addEventListener('click', function(event){
            selectResult(element, event.target.closest('.'+element.resultClassName), event);
        });
    }

    function checkFocusLost(element, event) {
        if(element.element.contains(event.relatedTarget)) return;
        toggleOptionsList(element, false);
    }

    function handleInputTyped(element, event) {
        if(event.key.toLowerCase() === 'arrowdown' || event.keyCode === '40') {
            moveFocusToList(element);
        } else {
            updateSearch(element);
        }
    }

    function moveFocusToList(element) {
        if(!element.element.classList.contains(element.dropdownActiveClass)) return;
        resetSearch(element); // clearTimeout
        // make sure first element is focusable
        var index = 0;
        if(!elementListIsFocusable(element.resultsItems[index])) {
            index = getElementFocusbleIndex(element, index, true);
        }
        getListFocusableEl(element.resultsItems[index]).focus();
    }

    function updateSearch(element, bool) {
        var inputValue = element.input.value;
        if(inputValue === element.inputVal && !bool) return; // input value did not change
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
    }

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
    }

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
    }

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
    }

    function updateAriaRegion(element) {
        element.resultsItems = element.resultsList.querySelectorAll('.'+element.resultClassName+'[tabindex="-1"]');
        if(element.ariaResult.length == 0) return;
        element.ariaResult[0].textContent = element.resultsItems.length;
    }

    function resetSearch(element) {
        if(element.typeId) clearInterval(element.typeId);
        element.typeId = false;
    }

    function navigateList(element, event) {
        var downArrow = (event.key.toLowerCase() === 'arrowdown' || event.keyCode === '40'),
            upArrow = (event.key.toLowerCase() === 'arrowup' || event.keyCode === '38');
        if(!downArrow && !upArrow) return;
        event.preventDefault();
        var selectedElement = document.activeElement.closest('.'+element.resultClassName) || document.activeElement;
        var index = Array.prototype.indexOf.call(element.resultsItems, selectedElement);
        var newIndex = getElementFocusbleIndex(element, index, downArrow);
        getListFocusableEl(element.resultsItems[newIndex]).focus();
    }

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
    }

    function elementListIsFocusable(item) {
        var role = item.getAttribute('role');
        if(role && role === 'presentation') {
            // skip this element
            return false;
        }
        return true;
    }

    function getListFocusableEl(item) {
        var newFocus = item,
            focusable = newFocus.querySelectorAll('button:not([disabled]), [href]');
        if(focusable.length > 0 ) newFocus = focusable[0];
        return newFocus;
    }

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
    }

    function getResultContent(result) { // get text content of selected item
        var labelElement = result.querySelector('[data-autocomplete-label]');
        return labelElement ? labelElement.textContent : result.textContent;
    }

    function populateResults(element, data, cb) {
        var innerHtml = '';

        for(var i = 0; i < data.length; i++) {
            innerHtml = innerHtml + getItemHtml(element, data[i]);
        }
        if(element.options.populate) element.resultsList.innerHTML = innerHtml;
        else if(cb) cb(innerHtml);
    }

    function getItemHtml(element, data) {
        var clone = getClone(element, data);
        clone.classList.remove('hidden');
        clone.setAttribute('tabindex', '-1');
        for(var key in data) {
            if (data.hasOwnProperty(key)) {
                if(key === 'label') setLabel(clone, data[key]);
                else if(key === 'class') setClass(clone, data[key]);
                else if(key === 'url') setUrl(clone, data[key]);
                else if(key === 'src') setSrc(clone, data[key]);
                else setKey(clone, key, data[key]);
            }
        }
        return clone.outerHTML;
    }

    function getClone(element, data) {
        var item = false;
        if(element.templateItems.length === 1 || !data['template']) item = element.templateItems[0];
        else {
            for(var i = 0; i < element.templateItems.length; i++) {
                if(data['template'] === element.templates[i]) {
                    item = element.templateItems[i];
                }
            }
            if(!item) item = element.templateItems[0];
        }
        return item.cloneNode(true);
    }

    function setLabel(clone, label) {
        var labelElement = clone.querySelector('[data-autocomplete-label]');
        labelElement
            ? labelElement.textContent = label
            : clone.textContent = label;
    }

    function setClass(clone, classList) {
        var classesArray = classList.split(' ');
        clone.classList.add(classesArray[0]);
        if (classesArray.length > 1) setClass(clone, classesArray.slice(1).join(' '));
    }

    function setUrl(clone, url) {
        var linkElement = clone.querySelector('[data-autocomplete-url]');
        if(linkElement) linkElement.setAttribute('href', url);
    }

    function setSrc(clone, src) {
        var imgElement = clone.querySelector('[data-autocomplete-src]');
        if(imgElement) imgElement.setAttribute('src', src);
    }

    function setKey(clone, key, value) {
        var subElement = clone.querySelector('[data-autocomplete-'+key+']');
        if(subElement) {
            if(subElement.hasAttribute('data-autocomplete-html')) subElement.innerHTML = value;
            else subElement.textContent = value;
        }
    }

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


// List filter
(function() {
    var ListFilter = function(element) {
        this.element = element;
        this.search = this.element.getElementsByClassName('js-list-filter__search');
        this.searchCancel = this.element.getElementsByClassName('js-list-filter__search-cancel-btn');
        this.list = this.element.getElementsByClassName('js-list-filter__list')[0];
        this.items = this.list.getElementsByClassName('js-list-filter__item');
        this.noResults = this.element.getElementsByClassName('js-list-filter__no-results-msg');
        this.searchTags = [];
        this.resultsNr = this.element.getElementsByClassName('js-list-filter__results-nr');
        this.visibleItemsNr = 0;
        initListFilter(this);
    };

    function initListFilter(element) {
        // get the filterable list of tags
        for(var i = 0; i < element.items.length; i++) {
            var tags = '';
            var label = element.items[i].getElementsByClassName('js-list-filter__label');
            if(label.length > 0) {
                tags = label[0].textContent;
            }
            var additionalTags = element.items[i].getAttribute('data-filter-tags');
            if(additionalTags) tags = tags + ' ' + additionalTags;
            element.searchTags.push(tags);
        }

        // filter list based on search input value
        filterItems(element, element.search[0].value.trim());

        // filter list when search input is updated
        element.search[0].addEventListener('input', function(){
            filterItems(element, element.search[0].value.trim());
        });

        // reset search results
        if(element.searchCancel.length > 0) {
            element.searchCancel[0].addEventListener('click', function() {
                element.search[0].value= "";
                element.search[0].dispatchEvent(new Event('input'));
            });
        }


        // remove item from the list when clicking on the remove button
        element.list.addEventListener('click', function(event){
            var removeBtn = event.target.closest('.js-list-filter__action-btn--remove');
            if(!removeBtn) return;
            event.preventDefault();
            removeItem(element, removeBtn);
        });
    }

    function filterItems(element, value) {
        var array = [];
        var searchArray = value.toLowerCase().split(' ');
        for(var i = 0; i < element.items.length; i++) {
            value === '' ? array.push(false) : array.push(filterItem(element, i, searchArray));
        }
        updateVisibility(element, array);
    }

    function filterItem(element, index, searchArray) {
        // return false if item should be visible
        var found = true;
        for(var i = 0; i < searchArray.length; i++) {
            if(searchArray[i] !== '' && searchArray[i] !== ' ' && element.searchTags[index].toLowerCase().indexOf(searchArray[i]) < 0) {
                found = false;
                break;
            }
        }
        return !found;
    }

    function updateVisibility(element, list) {
        element.visibleItemsNr = 0;
        for(var i = 0; i < list.length; i++) {
            // hide/show items
            if(!list[i]) element.visibleItemsNr = element.visibleItemsNr + 1;
            element.items[i].classList.toggle('hidden', list[i]);
        }
        // hide/show no results message
        if(element.noResults.length > 0) element.noResults[0].classList.toggle('hidden', element.visibleItemsNr > 0);

        updateResultsNr(element);
    }

    function updateResultsNr(element) {
        // update number of results
        if(element.resultsNr.length > 0) element.resultsNr[0].innerHTML = element.visibleItemsNr;
    }

    function removeItem(element, btn) {
        var item = btn.closest('.js-list-filter__item');
        if(!item) return;
        var index = Array.prototype.indexOf.call(element.items, item);
        // remove item from the DOM
        item.remove();
        // update list of search tags
        element.searchTags.splice(index, 1);
        // update number of results
        element.visibleItemsNr = element.visibleItemsNr - 1;
        updateResultsNr(element);
    }

    //initialize the ListFilter objects
    var listFilters = document.getElementsByClassName('js-list-filter');
    if( listFilters.length > 0 ) {
        for( var i = 0; i < listFilters.length; i++) {
            (function(i){new ListFilter(listFilters[i]);})(i);
        }
    }
}());

// Multiple-custom-select-v2
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
    }

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
    }

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
                tagElement.innerHTML = `<span class="max-w-40 truncate text-xs">${label}</span>`;

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
    }

    function resetCheckedClasses(element) {
        var checkedLabels = element.element.getElementsByClassName(element.checkedClass);
        while(checkedLabels[0]) {
            checkedLabels[0].classList.remove(element.checkedClass);
        }
    }

    function initCheckedClass(element) {
        for(var i = 0; i < element.checkboxes.length; i++) {
            if(element.checkboxes[i].checked) {
                var label = element.checkboxes[i].closest('label');
                if(label) label.classList.add(element.checkedClass);
            }
        }
    }

    //initialize the CustomSelect objects
    var customSelect = document.getElementsByClassName('js-multi-select-v2');
    if( customSelect.length > 0 ) {
        for( var i = 0; i < customSelect.length; i++) {
            (function(i){new MultiCustomSelectTwo(customSelect[i]);})(i);
        }
    }
}());


// File#: file-upload
(function() {
    var InputFile = function(element) {
        this.element = element;
        this.input = this.element.getElementsByClassName('js-file-upload__input')[0];
        this.label = this.element.getElementsByClassName('js-file-upload__label')[0];
        this.multipleUpload = this.input.hasAttribute('multiple'); // allow for multiple files selection

        // this is the label text element -> when user selects a file, it will be changed from the default value to the name of the file
        this.labelText = this.element.getElementsByClassName('js-file-upload__text')[0];
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
            if( event.keyCode && event.keyCode === 13 || event.key && event.key.toLowerCase() === 'enter') {inputFile.input.click();}
        });

        // file has been selected -> update label text
        inputFile.input.addEventListener('change', function(event){
            updateInputLabelText(inputFile);
        });
    }

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
    }

    //initialize the InputFile objects
    var inputFiles = document.getElementsByClassName('js-file-upload');
    if( inputFiles.length > 0 ) {
        for( var i = 0; i < inputFiles.length; i++) {
            (function(i){new InputFile(inputFiles[i]);})(i);
        }
    }
}());

// File#: Flash message
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
        if( this.element === message) return;
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

    //This section override the original behavior
    var autoFlashMessages = document.getElementsByClassName('js-auto-flash-message');

    function showFlashMessage(element) {
        var event = new CustomEvent('showFlashMessage');
        element.dispatchEvent(event);
    }

    //show first flash message available in the page
    if( autoFlashMessages.length > 0 ) {
        showFlashMessage(autoFlashMessages[0]);
    }
}());
