<span {{ $attributes->class(['inline-flex items-center gap-x-1 min-h-2 bg-neutral-200 rounded-lg pl-1.5 py-px']) }}>
    <span class="truncate text-sm leading-none max-w-[160px]">{{ $name }}</span>
    <a href="{{ $url }}" class="inline-flex h-5 w-5 items-center justify-center rounded-lg leading-none text-neutral-500 hover:bg-neutral-300 hover:text-neutral-700">
        <svg class="h-2.5 w-2.5 shrink-0 fill-current leading-none text-inherit" viewBox="0 0 16 16">
          <g stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10">
            <line x1="13.5" y1="2.5" x2="2.5" y2="13.5"></line>
            <line x1="2.5" y1="2.5" x2="13.5" y2="13.5"></line>
          </g>
        </svg>
    </a>
</span>
