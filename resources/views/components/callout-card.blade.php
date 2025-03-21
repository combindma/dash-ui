<div class="card">
    <div {{ $attributes->class(['card__inner bg-white flex items-center']) }}>
        <div class="shrink grow">
            @if(isset($heading))
                <div {{ $heading->attributes->class(['mb-2 text-sm font-semibold']) }}>
                    {{ $heading }}
                </div>
            @endif
            <div class="text-sm">{{ $slot }}</div>
        </div>
        @if(isset($illustration))
            <div {{ $illustration->attributes->class(['hidden shrink-0 grow-0 max-w-[120px] lg:block lg:ml-6']) }}">{{ $illustration }}</div>
        @endif
    </div>
</div>
