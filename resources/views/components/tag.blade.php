<span {{ $attributes->class(['inline-flex items-center gap-x-1 min-h-2 bg-neutral-200 rounded-lg pl-1.5 py-px']) }}>
    <span class="max-w-xs truncate text-sm leading-none">{{ $name }}</span>
    <a href="{{ $url }}" class="inline-flex items-center justify-center h-5 w-5 rounded-lg leading-none text-neutral-500 hover:bg-neutral-300 hover:text-neutral-700">
        <x-gmdi-close class="h-3 w-3 text-current"/>
    </a>
</span>
