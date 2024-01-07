<div @class(['card' => !$reset])>
    <div {{ $attributes->class([
    'card__inner',
    'bg-white' => ($variant == 'basic'),
    'bg-[rgba(247,247,247,1)]' => ($variant == 'subdued')
]) }}>
        @if(isset($heading))
            <div class="mb-3">
                <div class="flex justify-between item-center">
                    <div {{ $heading->attributes->class(['text-sm font-semibold']) }}>
                        {{ $heading }}
                    </div>
                    @if(isset($actions))
                        <div>{{ $actions }}</div>
                    @endif
                </div>
                @if(isset($subheading))
                    <p class="mt-2 text-sm">{{ $subheading }}</p>
                @endif
            </div>
        @endif

        @if($hasDivider)
            <x-dash-ui-divider class="mb-3"/>
        @endif

        <div class="text-sm">{{ $slot }}</div>

        @if(isset($footer))
            <footer {{ $footer->attributes->class(['mt-4 flex gap-2 justify-end']) }}>
                {{ $footer }}
            </footer>
        @endif
    </div>
</div>
