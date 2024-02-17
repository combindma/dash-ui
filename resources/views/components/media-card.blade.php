<div class="card">
    <div {{ $attributes->class([
    'bg-white',
    'grid gap-1 grid-cols-1 lg:grid-cols-12 lg:gap-2' => !$portrait,
    ]) }}>
        <div @class(['lg:col-span-4' => !$portrait])>
            <div {{ $media->attributes->class(['aspect-w-4 aspect-h-3']) }}>{{ $media }}</div>
        </div>
        <div @class(['lg:col-span-8' => !$portrait])>
            <div class="card__inner lg:py-3">
                @if(isset($heading))
                    <div class="mb-3">
                        <div class="flex justify-between item-baseline">
                            <div {{ $heading->attributes->class(['text-sm font-semibold']) }}>
                                {{ $heading }}
                            </div>
                            @if(isset($actions))
                                <x-dashui-button variant="subtle" class="group p-1" aria-controls="{{ $id }}">
                                    <svg viewBox="0 0 20 20" class="w-6 h-6 fill-neutral-400 group-hover:fill-neutral-600"><path d="M6 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"></path><path d="M11.5 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"></path><path d="M17 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"></path></svg>
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
