<div {{ $attributes->class([
    'overflow-hidden relative z-1',
    'shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08)_inset]' => $border,
    'shadow-[0px_4px_6px_-2px_rgba(26,26,26,0.20)]' => $shadow,
    'rounded-[6px] lg:rounded-[12px]' => $rounded,
]) }}>
    {{ $slot }}
</div>
