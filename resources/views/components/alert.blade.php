<div class="alert mb-3 alert--is-visible absolute [&.alert--is-visible]:static js-alert">
    <div {{ $attributes->class([
    'flex justify-between items-baseline p-2 rounded-lg',
    'bg-sky-100 text-sky-900' => ($tone == 'info'),
    'bg-green-100 text-emerald-900' => ($tone == 'success'),
    'bg-orange-200/35 text-orange-900' => ($tone == 'warning'),
    'bg-red-100 text-red-900' => ($tone == 'critical'),
    ]) }}>
        <div class="flex gap-x-2">
            @if($tone == 'success')
                <x-gmdi-done class="w-5 h-5"/>
            @elseif($tone == 'warning')
                <x-gmdi-warning-amber-r class="w-5 h-5"/>
            @elseif($tone == 'critical')
                <x-gmdi-error-outline class="w-5 h-5"/>
            @else
                <x-gmdi-info-o class="w-5 h-5"/>
            @endif
            <div class="text-sm font-medium">{{ $slot }}</div>
        </div>
        <x-dash-ui-button type="button" variant="subtle" class="p-1 js-alert__close-btn">
            <x-gmdi-close class="w-6 h-6"/>
        </x-dash-ui-button>
    </div>
</div>
