<select {{ $attributes->class([
    'block w-full box-border rounded-lg text-sm border-0 py-1 pl-3 pr-10 mb-1.5 text-neutral-900 ring-1 ring-inset placeholder:text-neutral-500 focus:ring-2 focus:ring-inset focus:ring-primary-700',
    'ring-neutral-500/90' => !$error,
    'bg-red-100/50 ring-red-800' => $error,
]) }}>
    {{ $slot }}
</select>
@if($error)
    <x-dash-ui-inline-error :message="$error"/>
@elseif($helpText)
    <p class="text-xs text-neutral-600">{{ $helpText }}</p>
@endif

