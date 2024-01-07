<div class="card">
    <div {{ $attributes->class([
    'bg-white grid gap-y-1 grid-cols-1 lg:grid-cols-12 lg:gap-x-2 lg:gap-y-0',
]) }}>
        <div class="lg:col-span-4 h-full">
            <div {{ $media->attributes->class(['aspect-w-4 aspect-h-3']) }}>{{ $media }}</div>
        </div>
        <div class="lg:col-span-8">
            <div class="card__inner lg:py-6">
                @if(isset($heading))
                    <div class="mb-3">
                        <div class="flex justify-between item-center">
                            <div {{ $heading->attributes->class(['text-sm font-semibold']) }}>
                                {{ $heading }}
                            </div>
                            @if(isset($actions))
                                <x-dash-ui-button variant="subtle" class="group p-1" aria-controls="{{ $id }}">
                                    <x-gmdi-more-horiz class="w-6 h-6 text-neutral-400 group-hover:text-neutral-600"/>
                                </x-dash-ui-button>
                                <x-dash-ui-popover id="{{ $id }}" role="dialog">
                                    {{ $actions }}
                                </x-dash-ui-popover>
                            @endif
                        </div>
                    </div>
                @endif
                <div class="text-sm">{{ $slot }}</div>
            </div>
        </div>
    </div>
</div>
