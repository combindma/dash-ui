<form class="relative inline-block select-none js-expandable-search">
    <label class="sr-only" for="expandable-search">Search</label>
    <input {{ $attributes->class(['expandable-search__input appearance-none box-border border-0 pl-2 lg:pl-3 text-sm text-transparent border-0 overflow-hidden rounded-lg hover:cursor-pointer focus:ring-2 focus:ring-primary-700 js-expandable-search__input']) }}>

    <button type="submit" class="expandable-search__btn">
        <svg class="block m-auto h-3.5 w-3.5 text-inherit fill-current leading-none shrink-0" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3">
                <circle cx ="10" cy="10" r="8" />
                <line x1="16" y1="16" x2="22" y2="22" />
            </g>
        </svg>
    </button>
</form>
