// File#: _1_list-filter
// Usage: codyhouse.co/license
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
    };

    function filterItems(element, value) {
        var array = [];
        var searchArray = value.toLowerCase().split(' ');
        for(var i = 0; i < element.items.length; i++) {
            value == '' ? array.push(false) : array.push(filterItem(element, i, searchArray));
        }
        updateVisibility(element, array);
    };

    function filterItem(element, index, searchArray) {
        // return false if item should be visible
        var found = true;
        for(var i = 0; i < searchArray.length; i++) {
            if(searchArray[i] != '' && searchArray[i] != ' ' && element.searchTags[index].toLowerCase().indexOf(searchArray[i]) < 0) {
                found = false;
                break;
            }
        }
        return !found;
    };

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
    };

    function updateResultsNr(element) {
        // update number of results
        if(element.resultsNr.length > 0) element.resultsNr[0].innerHTML = element.visibleItemsNr;
    };

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
