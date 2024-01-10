<div class="card">
    <div {{ $attributes->class([
    'bg-white',
    'grid gap-1 grid-cols-1 lg:grid-cols-12 lg:gap-2' => !$portrait,
    ]) }}>
        <div @class(['lg:col-span-4' => !$portrait])>
            <div {{ $media->attributes->class(['aspect-w-4 aspect-h-3']) }}>{{ $media }}</div>
        </div>
        <div @class(['lg:col-span-8' => !$portrait])>
            <div class="card__inner lg:py-4">
                @if(isset($heading))
                    <div class="mb-3">
                        <div class="flex justify-between item-baseline">
                            <div {{ $heading->attributes->class(['text-sm font-semibold']) }}>
                                {{ $heading }}
                            </div>
                            @if(isset($actions))
                                <x-dashui-button variant="subtle" class="group p-1" aria-controls="{{ $id }}">
                                    <x-gmdi-more-horiz class="w-6 h-6 text-neutral-400 group-hover:text-neutral-600"/>
                                </x-dashui-button>
                                <x-dashui-popover id="{{ $id }}" role="dialog">
                                    {{ $actions }}
                                </x-dashui-popover>
                            @endif
                        </div>
                    </div>
                @endif
                <div class="text-sm">{{ $slot }}</div>
            </div>
        </div>
    </div>
</div>
