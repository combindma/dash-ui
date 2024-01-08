<span {{ $attributes->class([
    'inline-flex justify-center items-center overflow-hidden relative',
    'w-5 h-5 rounded-[.25rem] text-[7px]' => ($size == 'xs'),
    'w-6 h-6 rounded-[.375rem] text-[9px]' => ($size == 'sm'),
    'w-7 h-7 rounded-[.375rem] text-[11px]' => ($size == 'md'),
    'w-8 h-8 rounded-[0.5rem] text-[13px]' => ($size == 'lg'),
    'w-9 h-9 rounded-[.5rem] text-[16px]' => ($size == 'xl'),
    'bg-[#b5b5b5]' => !$initials,
    'bg-primary-800 text-white' => $initials,
    'p-[1px]' => !$src
]) }}>
    @if($src)
        <img src="{{ $src }}" alt="{{ $name }}" class="object-cover w-full">
    @elseif($initials)
        <span class="text-inherit font-bold leading-none">{{ strtoupper($initials) }}</span>
    @else
        <x-gmdi-person-o class="h-full w-full text-white"/>
    @endif
</span>
