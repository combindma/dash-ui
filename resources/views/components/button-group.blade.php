<div {{ $attributes->class([
    'flex flex-wrap items-center',
    'gap-y-2 gap-x-2' => ($variant == 'basic'),
    'gap-0' => ($variant == 'segmented'),
    ]) }}>
    {{ $slot }}
</div>
