<span {{ $attributes->class(['inline-flex items-center gap-x-1 min-h-2 bg-neutral-200 rounded-lg px-1.5 py-px']) }}>
    <span class="text-sm max-w-xs truncate">{{ $name }}</span>
    <a href="{{ $url }}" class="leading-none text-neutral-500 hover:text-neutral-700 hover:bg-neutral-300 rounded-sm"><x-gmdi-close class="w-3 h-3 text-current"/></a>
</span>
