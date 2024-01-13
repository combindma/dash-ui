<li class="relative flex flex-col w-full">
    <div @class([
    'relative flex items-center w-full rounded-lg',
    'bg-white font-bold sub-navigation--selected' => $selected,
    'hover:bg-neutral-50/50 active:bg-white' => !$selected,
])>
        <a href="{{ $url }}" class="flex w-full cursor-pointer items-center gap-x-2 rounded-lg pr-1 pl-10 py-1" @if($external) target="_blank" rel="noopener noreferrer" @endif>
            <span class="inline-block leading-5">{{ $label }}</span>
        </a>
    </div>
</li>
