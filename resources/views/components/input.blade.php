<div class="relative">
    @if($prefix)
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span class="text-neutral-600 text-xs leading-none">{{ $prefix }}</span>
        </div>
    @endif
    <input {{ $attributes->class([
    'block w-full box-border rounded-lg border-0 py-1 mb-1.5 text-neutral-900 ring-1 ring-inset placeholder:text-sm placeholder:text-neutral-500 focus:ring-2 focus:ring-inset focus:ring-primary-700',
    'pl-7' => $prefix,
    'pr-12' => $suffix,
    'ring-neutral-500/90' => !$error,
    'bg-red-100/50 ring-red-800' => $error,
]) }}>
    @if($suffix)
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span class="text-neutral-600 text-xs leading-none">{{ $suffix }}</span>
        </div>
    @endif
</div>
@if($error)
    <x-dashui-inline-error :message="$error"/>
@elseif($helpText)
    <p class="text-xs text-neutral-600">{{ $helpText }}</p>
@endif

