<li class="relative flex flex-col px-4 w-full">
    <div @class([
    'relative flex items-center w-full rounded-lg',
    'bg-white font-bold' => $selected,
    'hover:bg-neutral-50/50 active:bg-white font-[550]' => !$selected,

])>
        <a href="{{ $url }}" @if($external) target="_blank" rel="noopener noreferrer" @endif @class(['flex w-full cursor-pointer items-center gap-x-2 rounded-lg pr-1 pl-3 py-1', 'navigation--active' => $childSelected])>
            <span class="inline-block text-neutral-700/95">{{ $icon }}</span>
            <span class="inline-block leading-5">{{ $label }}</span>
            @if($badge)
                <x-dashui-badge class="ml-auto">{{ $badge }}</x-dashui-badge>
            @endif
        </a>
        @if(isset($action))
            <div class="ml-auto">{{ $action }}</div>
        @endif
    </div>
    @if(isset($subNavigation))
        <ul @class(['sub-navigation basis-full overflow-x-visible', 'hidden' => !$open, 'sub-navigation--active' => $childSelected])>
            {{ $subNavigation }}
        </ul>
    @endif
</li>
