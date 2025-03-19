@if($as === 'link')
    <a @disabled($disabled)
        {{ $attributes->class([
        'btn',
        'group' => (!$pressed && !$disabled && ($variant !== 'plain') && ($variant !== 'subtle')),
        'btn--primary' => ($variant === 'primary'),
        'btn--primary-critical' => ($variant === 'primary' && $tone === 'critical'),
        'btn--primary-success' => ($variant === 'primary' && $tone === 'success'),
        'btn--secondary' => ($variant === 'secondary'),
        'btn--subtle' => ($variant === 'subtle'),
        'btn--plain' => ($variant === 'plain'),
        'btn--plain-critical' => ($variant === 'plain' && $tone === 'critical'),
        'btn--pressed' => $pressed,
        'py-3 text-sm' => ($size === 'large'),
        'w-full justify-center' => $fullWidth,
        ]) }}>
        <div @class(['inline-flex items-center gap-x-1','group-active:translate-y-[0.0625rem]' => !$disabled])>{{ $slot }}</div>
    </a>
@else
    <button @disabled($disabled)
        {{ $attributes->class([
        'btn',
        'group' => (!$pressed && !$disabled && ($variant !== 'plain') && ($variant !== 'subtle')),
        'btn--primary' => ($variant === 'primary'),
        'btn--primary-critical' => ($variant === 'primary' && $tone === 'critical'),
        'btn--primary-success' => ($variant === 'primary' && $tone === 'success'),
        'btn--secondary' => ($variant === 'secondary'),
        'btn--subtle' => ($variant === 'subtle'),
        'btn--plain' => ($variant === 'plain'),
        'btn--plain-critical' => ($variant === 'plain' && $tone === 'critical'),
        'btn--pressed' => $pressed,
        'py-3 text-sm' => ($size === 'large'),
        'w-full justify-center' => $fullWidth,
        ]) }}>
        <div @class(['inline-flex items-center gap-x-1','group-active:translate-y-[0.0625rem]' => !$disabled])>{{ $slot }}</div>
    </button>
@endif
