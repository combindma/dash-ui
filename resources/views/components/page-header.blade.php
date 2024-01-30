<div {{ $attributes->class(['mb-4 md:flex md:items-baseline md:justify-between']) }}>
    <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-x-2">
            <div class="flex items-center gap-x-1">
                @if($backAction)
                    <x-dashui-button as="link" href="{{ $backAction }}" variant="subtle" class="p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="block h-5 w-5 fill-current leading-none shrink-0"><path fill-rule="evenodd" d="M16.5 10a.75.75 0 0 1-.75.75h-9.69l2.72 2.72a.75.75 0 0 1-1.06 1.06l-4-4a.75.75 0 0 1 0-1.06l4-4a.75.75 0 1 1 1.06 1.06l-2.72 2.72h9.69a.75.75 0 0 1 .75.75Z"></path></svg>
                    </x-dashui-button>
                @endif
                <h1 class="text-lg font-bold">{{ $title }}</h1>
            </div>
            @if(isset($titleMetadata))
                <div {{ $titleMetadata->attributes->class(['flex flex-wrap items-center gap-x-1']) }}>
                    {{ $titleMetadata }}
                </div>
            @endif
        </div>
        @if($subtitle)
            <p @class(['text-xs mt-1 text-neutral-600', 'ml-8' => $backAction])>{{ $subtitle }}</p>
        @endif
    </div>
    <div class="mt-4 md:ml-4 md:mt-0">
        {{ $slot }}
    </div>
</div>
