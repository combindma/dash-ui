<div {{ $attributes->class([
    'overflow-hidden relative z-1',
    'shadow-border-inset' => $border,
    'shadow-bevel-100' => $shadow,
    'rounded-[8px]' => $rounded,
]) }}>
    {{ $slot }}
</div>
