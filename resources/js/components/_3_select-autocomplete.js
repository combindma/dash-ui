// File#: _3_select-autocomplete
// Usage: codyhouse.co/license
(function() {
    var SelectAuto = function(element) {
        this.element = element;
        this.input = this.element.getElementsByClassName('js-autocomplete__input');
        this.resetBtn = this.element.getElementsByClassName('js-select-auto__input-btn');
        this.select = this.element.getElementsByClassName('js-select-auto__select');
        this.selectedValue = false; // value of the <option> the user selected
        this.selectOptions = []; // autocomplete list extracted from the <select> element
        this.focusOutId = false; // keep track of focus status
        this.autocompleteResults = this.element.getElementsByClassName('js-autocomplete__results');
        initSelectAuto(this);
    };

    function initSelectAuto(element) {
        if(element.select.length == 0) return;
        initDataResults(element); // populate autocomplete list
        Util.addClass(element.select[0], 'hidden'); // hide native <select> element
        setInitialSelection(element);
        initAutocomplete(element);
        initSelectAutoEvents(element);
    };

    function initDataResults(element) {
        // create the list of possible results based on the <select> input
        var optgroups = element.select[0].getElementsByTagName('optgroup');
        if(optgroups.length > 0) {
            var directChildren = element.select[0].children;
            for(var i = 0; i < directChildren.length; i++) {
                var childType = directChildren[i].tagName.toLowerCase();
                if(childType == 'option') pushOptions(element, [directChildren[i]]);
                else if(childType == 'optgroup') pushOptgroup(element, directChildren[i]);
            }
        } else {
            // no <optgroup>s -> loop through <options>
            pushOptions(element, element.select[0].getElementsByTagName('option'));
        }
    };

    function pushOptgroup(element, optgroup) {
        // push <optgroup> item
        var item = {};
        item.label = optgroup.getAttribute('label');
        item.template = 'optgroup';
        item = setCustomData(item, optgroup);
        element.selectOptions.push(item);
        // now push <option>s
        pushOptions(element, optgroup.getElementsByTagName('option'));
    };

    function pushOptions(element, options) {
        for(var i = 0; i < options.length; i++) {
            pushSingleOption(element, options[i]);
        };
    };

    function pushSingleOption(element, option) {
        // do not push <option>s without a value
        if(!option.getAttribute('value')) return;
        var item = {};
        item.label = option.text;
        item.template = 'option';
        item.value = option.value;
        item = setCustomData(item, option);
        element.selectOptions.push(item);
    };

    function setCustomData(obj, element) {
        // get custom data-attributes added to <option>s/<optgroup>s and add them to the autocomplete list
        var dataset = element.dataset;
        for (var prop in dataset) {
            if (Object.prototype.hasOwnProperty.call(dataset, prop)) {
                obj[prop] = dataset[prop];
            }
        }
        return obj;
    };

    function initAutocomplete(element) {
        // CodyHouse Autocomplete component
        // more info: https://codyhouse.co/ds/components/info/autocomplete
        new Autocomplete({
            element: element.element,
            characters: 0,
            searchData: function(value, cb, eventType) {
                selectAutoSearch(element, value, cb, eventType);
            },
            onClick: function(option, obj, event, cb) {
                selectAutoClick(element, option, obj, event, cb);
            }
        });
    };

    function selectAutoSearch(element, query, cb, eventType) {
        // get search results
        // more info: https://codyhouse.co/ds/components/info/autocomplete#search-data

        if(eventType == 'focus') {
            // show all results when input is first in focus
            var data = JSON.parse(JSON.stringify(element.selectOptions));
        } else {
            // filter results
            var data = element.selectOptions.filter(function(item){
                // return item if item['label'] contains 'query' or if it is an <optgroup>
                return (query == '' || item['template'] == 'optgroup') ? true : item['label'].toLowerCase().indexOf(query.toLowerCase()) > -1;
            });

            // remove empty <optgroup>s
            var i = data.length;
            while (i--) {
                if (data[i].template == 'optgroup' && ( i == data.length - 1 || data[i+1].template == 'optgroup') ) {
                    data.splice(i, 1);
                }
            }
        }
        // add a custom class to the selected <option> in the autocomplete list
        for(var i = 0; i < data.length; i++) {
            if(element.selectedValue && data[i].value && data[i].value == element.selectedValue && data[i].template != 'optgroup') {
                data[i].class = 'select-auto__option--selected';
            } else if(data[i].class) {
                delete data[i].class;
            }
        }

        if(data.length == 0) { // fallback for no results found
            data = [{
                label: 'No results',
                template: 'no-results'
            }];
        }
        // required by the Autocomplete component
        cb(data);
    };

    function selectAutoClick(element, option, obj, event, cb) {
        // an option in the autocomplete list has been selected
        if(option.getAttribute('data-autocomplete-template') != 'option') return;
        // get selected value + selected label
        var value = option.querySelector('[data-autocomplete-value]').innerText;
        var label = option.querySelector('[data-autocomplete-label]').innerText;
        resetSelectAuto(element, value, label);
        cb(); // this closes the autocomplete
    };

    function initSelectAutoEvents(element) {
        // on focus out -> reset input to initial value or to '' if the option was not selected
        element.input[0].addEventListener('focusout', function(event) {
            if(element.focusOutId) clearTimeout(element.focusOutId);
            element.focusOutId = setTimeout(function(){
                if(!element.element.contains(document.activeElement) || element.resetBtn[0].contains(document.activeElement)) {
                    checkSelectAuto(element);
                }
            }, 100);
        });

        // when clicking on x -> reset selection to false
        if(element.resetBtn.length > 0) {
            element.resetBtn[0].addEventListener('click', function(event) {
                event.preventDefault();
                resetSelectAuto(element, false, '');
                element.input[0].focus();
            });
        }
    };

    function checkSelectAuto(element) {
        // check if we need to reset the value of the autocomplete input -> used when input loses focus
        var selectedLabel = !element.selectedValue ? '' : element.select[0].options[element.select[0].selectedIndex].text;
        if(element.input[0].value == selectedLabel) return;

        // user typed one of the possible options
        var optionInList = optionSelectedInList(element);
        if(optionInList[0]) {
            // update <select> element and return
            resetSelectAuto(element, optionInList[2], optionInList[1]);
            return;
        }

        (element.input[0].value == '')
            ? resetSelectAuto(element, false, '')
            : resetSelectAuto(element, element.selectedValue, selectedLabel);
    };

    function optionSelectedInList(element) {
        var inList = false,
            label = '',
            value = false;
        for(var i = 0; i < element.selectOptions.length; i++) {
            if(element.selectOptions[i].template == 'option' && element.selectOptions[i].label.toLowerCase() == element.input[0].value.toLowerCase()) {
                inList = true;
                label = element.selectOptions[i].label;
                value = element.selectOptions[i].value;
                break;
            }
        }
        return [inList, label, value];
    };

    function resetSelectAuto(element, value, label) {
        // a new <option> has been selected
        element.input[0].value = label;
        element.selectedValue = value;
        Util.toggleClass(element.element, 'select-auto--selection-done', value);
        if(value === false) { // no value set
            element.select[0].selectedIndex = -1;
        } else {
            element.select[0].value = value;
        }
        element.select[0].dispatchEvent(new Event('change'));
    };

    function setInitialSelection(element) {
        // if an option has the 'selected' attribute -> fill the input and add the selected class in the custome dropdown
        var selectedOption = element.select[0].querySelector('option[selected]');
        if(selectedOption) {
            // there's an option that is already selected
            var label = selectedOption.label;
            var value = selectedOption.value;
            element.input[0].value = label;
            element.selectedValue = value;
            Util.addClass(element.element, 'select-auto--selection-done');
        }
    };

    window.SelectAuto = SelectAuto;

    // init the SelectAuto object
    var selectAuto = document.getElementsByClassName('js-select-auto');
    if( selectAuto.length > 0 ) {
        for( var i = 0; i < selectAuto.length; i++) {
            (function(i){new SelectAuto(selectAuto[i]);})(i);
        }
    }
}());
