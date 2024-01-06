<div {{ $attributes->class([
    'p-[16px] rounded-[8px] shadow-bevel-100 overflow-hidden relative z-1',
    'bg-white' => ($variant === 'default'),
    'bg-[rgba(247,247,247,1)]' => ($variant === 'subdued')
]) }}>
    @if(isset($heading))
        <div class="mb-3">
           <div class="flex item-center justify-between">
               <h2 {{ $heading->attributes->class(['text-sm font-semibold']) }}>
                   {{ $heading }}
               </h2>
               @if(isset($actions))
                   <div>{{ $actions }}</div>
               @endif
           </div>
            @if(isset($subheading))
                <p class="mt-2 text-sm">{{ $subheading }}</p>
            @endif
        </div>
    @endif

    <div class="text-sm">{{ $slot }}</div>

    @if(isset($footer))
        <footer {{ $footer->attributes->class(['mt-4 flex gap-2 justify-end']) }}>
            {{ $footer }}
        </footer>
    @endif
</div>
