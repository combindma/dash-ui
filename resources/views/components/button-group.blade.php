<div {{ $attributes->class([
    'flex flex-wrap item-center',
    'gap-y-2 gap-x-2' => ($variant == 'default'),
    'group gap-0' => ($variant == 'segmented'),
    ]) }}>
    {{ $slot }}
</div>
