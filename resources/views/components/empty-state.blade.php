<div class="card">
    <div {{ $attributes->class(['card__inner bg-white flex flex-col justify-center items-center text-sm text-center lg:py-24']) }}>
            @if(isset($illustration))
                <div {{ $illustration->attributes->class(['flex justify-center max-w-xs mb-6']) }}">{{ $illustration }}</div>
            @endif

        <div class="text-center">
            @if(isset($heading))
                <div {{ $heading->attributes->class(['mb-2 text-sm font-bold']) }}>
                    {{ $heading }}
                </div>
            @endif

            <div class="max-w-xl flex flex-col justify-center items-center">{{ $slot }}</div>
        </div>
    </div>
</div>
