<div class="autocomplete relative select-auto js-select-auto js-autocomplete" data-autocomplete-dropdown-visible-class="autocomplete--results-visible">
    <!-- select -->
    <select {{ $attributes->class(['js-select-auto__select hidden']) }}>
        {{ $slot }}
    </select>

    <!-- input -->
    <div class="select-auto__input-wrapper">
        <x-dashui-input class="js-autocomplete__input js-select-auto__input" autocomplete="off"/>

        <div class="select-auto__input-icon-wrapper">
            <!-- arrow icon -->
            <svg class="icon inline-block text-inherit fill-current leading-none shrink-0" viewBox="0 0 16 16">
                <polyline points="1 5 8 12 15 5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
            </svg>

            <!-- close X icon -->
            <button class="select-auto__input-btn js-select-auto__input-btn js-tab-focus">
                <svg class="icon inline-block text-inherit fill-current leading-none shrink-0" viewBox="0 0 16 16">
                    <path d="M8,0a8,8,0,1,0,8,8A8,8,0,0,0,8,0Zm3.707,10.293a1,1,0,1,1-1.414,1.414L8,9.414,5.707,11.707a1,1,0,0,1-1.414-1.414L6.586,8,4.293,5.707A1,1,0,0,1,5.707,4.293L8,6.586l2.293-2.293a1,1,0,1,1,1.414,1.414L9.414,8Z" />
                </svg>
            </button>
        </div>
    </div>

    <!-- dropdown -->
    <div class="autocomplete__results shadow-[0px_4px_6px_-2px_rgba(26,26,26,0.20)] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08)_inset] select-auto__results js-autocomplete__results">
        <ul class="autocomplete__list js-autocomplete__list">
            <li class="select-auto__group-title py-2 lg:py-3 px-3 lg:px-5 text-gray-500  leading-none hidden js-autocomplete__result" data-autocomplete-template="optgroup" role="presentation">
                <span class="truncate text-sm" data-autocomplete-label></span>
            </li>

            <li class="select-auto__option py-2 lg:py-3 px-3 lg:px-5 leading-tight hidden js-autocomplete__result" data-autocomplete-template="option">
                <span class="hidden" data-autocomplete-value></span>
                <div class="truncate" data-autocomplete-label></div>
            </li>

            @if(isset($template))
                <li class="select-auto__option py-2 lg:py-3 px-3 lg:px-5 leading-tight hidden js-autocomplete__result" data-autocomplete-template="option">
                    {{ $template }}
                </li>
            @endif

            <li class="select-auto__no-results-msg py-2 lg:py-3 px-3 lg:px-5 truncate leading-tight hidden js-autocomplete__result" data-autocomplete-template="no-results" role="presentation"></li>
        </ul>
    </div>

    <p class="sr-only" aria-live="polite" aria-atomic="true"><span class="js-autocomplete__aria-results">0</span> results found.</p>
</div>
