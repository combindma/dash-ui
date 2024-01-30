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
        <svg viewBox="0 0 20 20" class="h-full w-full fill-white"><path fill-rule="evenodd" d="M10 3a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-2 3.5a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"></path><path fill-rule="evenodd" d="M15.484 14.227a6.274 6.274 0 0 0-10.968 0l-.437.786a1.338 1.338 0 0 0 1.17 1.987h9.502a1.338 1.338 0 0 0 1.17-1.987l-.437-.786Zm-9.657.728a4.773 4.773 0 0 1 8.346 0l.302.545h-8.95l.302-.545Z"></path></svg>
    @endif
</span>
