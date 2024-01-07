<div {{ $attributes->class([
    'mb-4 md:flex md:items-baseline md:justify-between',
]) }}>
    <div class="min-w-0 flex-1">
        <div class="flex items-baseline gap-x-1">
            @if($backAction)
                <x-dash-ui-button as="link" href="{{ $backAction }}" variant="subtle" class="p-1.5">
                    <x-gmdi-arrow-back class="w-4 h-4"/>
                </x-dash-ui-button>
            @endif
            <div class="flex items-baseline gap-x-2">
                <div>
                    <h1 class="text-lg font-bold">{{ $title }}</h1>
                    @if($subtitle)
                        <p class="text-xs mt-1 text-neutral-600">{{ $subtitle }}</p>
                    @endif
                </div>
                @if(isset($titleMetadata))
                    <div {{ $titleMetadata->attributes->class(['flex flex-wrap items-center gap-x-1']) }}>
                        {{ $titleMetadata }}
                    </div>
                @endif
            </div>
        </div>
    </div>
    <div class="mt-4 md:ml-4 md:mt-0">
        {{ $slot }}
    </div>
</div>
