<span {{ $attributes->class([
    'inline-flex bg-white overflow-hidden relative rounded-[0.5rem]',
    'w-6 h-6' => ($size == 'xs'),
    'w-10 h-10' => ($size == 'sm'),
    'w-14 h-14' => ($size == 'md'),
    'w-20 h-20' => ($size == 'lg'),
]) }}>
    @if($src)
        <img src="{{ $src }}" alt="{{ $alt??'image' }}" class="object-cover w-full">
    @else
        <span @class([
    'block text-[#8a8a8a]',
    'p-1' => ($size == 'xs'),
    'p-2.5' => ($size == 'sm'),
    'p-5' => ($size == 'md'),
    'p-7' => ($size == 'lg'),
    ])>{{ $slot }}</span>
    @endif
</span>
