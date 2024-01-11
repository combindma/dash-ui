<div {{ $attributes->class(['px-3 py-2 flex items-center justify-between']) }}>
    <div class="text-xs font-medium">{{ $label }}</div>
    <x-dashui-button-group variant="segmented">
        @if($previous)
            <x-dashui-button as="link" href="{{ $previous }}" variant="secondary" class="p-1.5 rounded-r-none">
                <x-gmdi-chevron-left class="w-4 h-4"/>
            </x-dashui-button>
        @else
            <x-dashui-button as="link" href="#0" variant="secondary" :disabled="true" class="p-1.5 rounded-r-none">
                <x-gmdi-chevron-left class="w-4 h-4"/>
            </x-dashui-button>
        @endif

        @if($next)
            <x-dashui-button as="link" href="{{ $next }}" variant="secondary" class="p-1.5 rounded-l-none">
                <x-gmdi-chevron-right class="w-4 h-4"/>
            </x-dashui-button>
        @else
            <x-dashui-button as="link" href="{{ $next }}" variant="secondary" :disabled="true" class="p-1.5 rounded-l-none">
                <x-gmdi-chevron-right class="w-4 h-4"/>
            </x-dashui-button>
        @endif
    </x-dashui-button-group>
</div>
