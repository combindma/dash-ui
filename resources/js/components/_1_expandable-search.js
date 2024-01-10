// File#: _1_expandable-search
// Usage: codyhouse.co/license
(function() {
    var expandableSearch = document.getElementsByClassName('js-expandable-search');
    if(expandableSearch.length > 0) {
        for( var i = 0; i < expandableSearch.length; i++) {
            (function(i){ // if user types in search input, keep the input expanded when focus is lost
                expandableSearch[i].getElementsByClassName('js-expandable-search__input')[0].addEventListener('input', function(event){
                    event.target.classList.toggle('expandable-search__input--has-content', event.target.value.length > 0);
                });
            })(i);
        }
    }
}());
