<div class="alert mb-3 alert--is-visible absolute [&.alert--is-visible]:static js-alert">
    <div class="card rounded-lg before:rounded-lg">
        <div class="bg-white">
            @if($title)
                <div @class([
    'flex items-center justify-between pl-3 pr-2 py-2',
    'bg-sky-500/60' => ($tone == 'info'),
    'bg-emerald-600 text-white' => ($tone == 'success'),
    'bg-yellow-500' => ($tone == 'warning'),
    'bg-red-600 text-white' => ($tone == 'critical'),
    ])>
                    <div class="inline-flex items-center gap-x-1.5">
                        @if($tone == 'success')
                            <x-gmdi-done class="w-4 h-4"/>
                        @elseif($tone == 'warning')
                            <x-gmdi-warning-amber-r class="w-4 h-4"/>
                        @elseif($tone == 'critical')
                            <x-gmdi-error-outline class="w-4 h-4"/>
                        @else
                            <x-gmdi-info-o class="w-4 h-4"/>
                        @endif
                        <span class="text-sm font-semibold">{{ $title }}</span>
                    </div>
                    <div>
                        <x-dashui-button type="button" variant="subtle" class="p-1 js-alert__close-btn">
                            <x-gmdi-close class="w-6 h-6"/>
                        </x-dashui-button>
                    </div>
                </div>
            @endif
            <div class="card__inner flex justify-between items-center">
                <div class="flex items-center">
                    @if(!$title)
                        <div @class([
    'inline-flex items-center justify-center mr-2 w-6 h-5 lg:w-8 lg:h-8 rounded-sm lg:rounded-lg',
    'bg-sky-500/60' => ($tone == 'info'),
    'bg-emerald-600 text-white' => ($tone == 'success'),
    'bg-yellow-500' => ($tone == 'warning'),
    'bg-red-600 text-white' => ($tone == 'critical'),
    ])>
                            @if($tone == 'success')
                                <x-gmdi-done class="w-4 h-4"/>
                            @elseif($tone == 'warning')
                                <x-gmdi-warning-amber-r class="w-4 h-4"/>
                            @elseif($tone == 'critical')
                                <x-gmdi-error-outline class="w-4 h-4"/>
                            @else
                                <x-gmdi-info-o class="w-4 h-4"/>
                            @endif
                        </div>
                    @endif
                    <div {{ $attributes->class(['text-sm']) }}>{{ $slot }}</div>
                </div>
                @if(!$title)
                    <x-dashui-button type="button" variant="subtle" class="p-1 js-alert__close-btn">
                        <x-gmdi-close class="w-6 h-6 text-neutral-500"/>
                    </x-dashui-button>
                @endif
            </div>
        </div>
    </div>
</div>
