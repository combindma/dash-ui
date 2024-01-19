<div @class(['card' => !$reset])>
    <div {{ $attributes->class([
    'card__inner',
    'bg-white' => ($variant == 'basic'),
    'bg-[rgba(247,247,247,1)]' => ($variant == 'subdued')
]) }}>
        @if(isset($heading))
            <div class="mb-3">
                <div {{ $heading->attributes->class(['flex justify-between items-center']) }}>
                    <div class="font-semibold">
                        {{ $heading }}
                    </div>
                    @if(isset($actions))
                        <div>{{ $actions }}</div>
                    @endif
                </div>
                @if(isset($subheading))
                    <div {{ $subheading->attributes->class(['mt-2 text-neutral-600']) }}>{{ $subheading }}</div>
                @endif
            </div>
        @endif

        @if($hasDivider)
            <x-dashui-divider class="mb-3"/>
        @endif

        <div>{{ $slot }}</div>

        @if(isset($footer))
            <footer {{ $footer->attributes->class(['mt-4 flex gap-2 justify-end']) }}>
                {{ $footer }}
            </footer>
        @endif
    </div>
</div>
