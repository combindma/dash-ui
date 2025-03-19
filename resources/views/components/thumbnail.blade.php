<span {{ $attributes->class([
    'inline-flex bg-white overflow-hidden relative',
    'w-6 h-6 rounded-xs' => ($size == 'xs'),
    'w-10 h-10 rounded-md' => ($size == 'sm'),
    'w-14 h-14 rounded-lg' => ($size == 'md'),
    'w-20 h-20 rounded-lg' => ($size == 'lg'),
]) }}>
    @if($src)
        <img src="{{ $src }}" alt="{{ $alt??'image' }}" class="object-cover w-full">
    @else
        <span @class([
    'block text-neutral-500',
    'p-1.5' => ($size == 'xs'),
    'p-2.5' => ($size == 'sm'),
    'p-4' => ($size == 'md'),
    'p-6' => ($size == 'lg'),
    ])>{{ $slot }}</span>
    @endif
</span>
