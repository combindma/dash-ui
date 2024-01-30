<div {{ $attributes->class(['px-3 py-2 flex items-center justify-between']) }}>
    <div class="text-xs font-medium">{{ $label }}</div>
    <x-dashui-button-group variant="segmented">
        @if($previous)
            <x-dashui-button as="link" href="{{ $previous }}" variant="secondary" class="p-1 rounded-r-none">
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"></path><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
            </x-dashui-button>
        @else
            <x-dashui-button as="link" href="#0" variant="secondary" :disabled="true" class="p-1 rounded-r-none">
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"></path><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
            </x-dashui-button>
        @endif

        @if($next)
            <x-dashui-button as="link" href="{{ $next }}" variant="secondary" class="p-1 rounded-l-none">
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"></path><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
            </x-dashui-button>
        @else
            <x-dashui-button as="link" href="{{ $next }}" variant="secondary" :disabled="true" class="p-1 rounded-l-none">
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"></path><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
            </x-dashui-button>
        @endif
    </x-dashui-button-group>
</div>
