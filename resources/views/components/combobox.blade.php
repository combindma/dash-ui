<div class="relative multi-select-v2 js-multi-select-v2">
    <div class="list-filter js-list-filter">
        <div class="list-filter__form">
            <div class="relative no-js:is-hidden">
                <input {{ $attributes->class(['box-border block w-full rounded-lg border-0 py-1 placeholder:text-sm placeholder:text-neutral-500 text-neutral-900 ring-1 ring-inset ring-neutral-500/90 list-filter__search js-list-filter__search js-multi-select-v2__search focus:ring-primary-700 focus:ring-2 focus:ring-inset']) }} autocomplete="off" type="search">
                <span class="list-filter__focus-marker" aria-hidden="true"></span>
                <button class="right-3 list-filter__search-cancel-btn js-list-filter__search-cancel-btn js-tab-focus" type="button">
                    <svg class="block inline-block shrink-0 fill-current leading-none text-inherit icon w-3 h-3" viewBox="0 0 16 16">
                        <path d="M8,0a8,8,0,1,0,8,8A8,8,0,0,0,8,0Z" class="fill-gray-500" />
                        <path d="M9.414,8l2.293-2.293a1,1,0,1,0-1.414-1.414L8,6.586,5.707,4.293A1,1,0,0,0,4.293,5.707L6.586,8,4.293,10.293a1,1,0,1,0,1.414,1.414L8,9.414l2.293,2.293a1,1,0,0,0,1.414-1.414Z" class="fill-white" />
                    </svg>
                </button>
            </div>

            <div class="absolute w-full rounded-lg bg-white border border-gray-300 overflow-hidden mt-0.5 z-[2] list-filter__list-wrapper js-multi-select-v2__wrapper" style="display: none;">
                <ul class="p-2 list-filter__list js-list-filter__list">
                    @foreach($options as $option)
                        <li class="js-list-filter__item">
                            <label class="cursor-pointer rounded-md px-2 py-2 multi-select-v2__label lg:px-3">
                            <span class="pointer-events-none custom-checkbox multi-select-v2__checkbox mr-1.5 lg:mr-2">
                                <input class="custom-checkbox__input js-multi-select-v2__input" type="checkbox" name="{{ $inputName }}" value="{{ $option['value'] }}" @checked($option['selected']??false)/>
                                <span class="custom-checkbox__control" aria-hidden="true"></span>
                            </span>
                                <span class="leading-none js-list-filter__label">{{ $option['label'] }}</span>
                            </label>
                        </li>
                    @endforeach

                    <li class="hidden p-3 js-list-filter__no-results-msg">
                        <p class="text-sm text-neutral-500">{{ $resultsText }}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <div class="flex justify-between mt-0.5">
        <p class="text-xs text-neutral-500"><span class="js-multi-select-v2__selected-items-counter">0</span> {{ $selectedText }}</p>
        <button class="text-xs cursor-pointer underline js-multi-select-v2__reset" type="button">{{ $resetText }}</button>
    </div>
    <div class="flex flex-wrap items-center gap-1.5 mt-1 js-multi-select-v2__selected-items"></div>
</div>
