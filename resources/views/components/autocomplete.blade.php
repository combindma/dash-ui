<div id="{{ $activator }}" class="autocomplete relative js-autocomplete" data-autocomplete-dropdown-visible-class="autocomplete--results-visible">
    <div class="relative">
        <x-dashui-input {{ $attributes->class(['js-autocomplete__input']) }} />

        <div class="autocomplete__loader absolute top-0 right-0 pr-3 lg:pr-5 h-full" aria-hidden="true">
            <div class="circle-loader circle-loader--v1">
                <div class="circle-loader__circle"></div>
            </div>
        </div>
    </div>

    <!-- dropdown -->
    <div class="autocomplete__results shadow-[0px_4px_6px_-2px_rgba(26,26,26,0.20)] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08)_inset] js-autocomplete__results">
        <ul class="autocomplete__list js-autocomplete__list">
            <li class="autocomplete__item py-2 lg:py-3 px-3 lg:px-5 truncate js-autocomplete__item hidden"></li>
        </ul>
    </div>

    <p class="sr-only" aria-live="polite" aria-atomic="true"><span class="js-autocomplete__aria-results">0</span> results found.</p>
</div>

<script>
    function initializeAutocomplete() {
        var autocomplete = document.getElementById('{{ $activator }}');
        var searchValues = {{ Js::from($options) }};
        new Autocomplete({
            element: autocomplete,
            searchData: function(query, cb, eventType) {
                var data = searchValues.filter(function(item){
                    return item['label'].toLowerCase().indexOf(query.toLowerCase()) > -1;
                });
                cb(data);
            },
            onClick: function(option, obj, event, cb) {
                obj.input.value = option.textContent;
                cb();
            }
        });
    }
    document.addEventListener('DOMContentLoaded', initializeAutocomplete);
    /*document.addEventListener('livewire:init', initializeAutocomplete);
    document.addEventListener('livewire:reload', initializeAutocomplete);*/
</script>
