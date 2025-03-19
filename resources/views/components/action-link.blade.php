@if($as === 'link')
    <a {{ $attributes->class([
    'text-left block px-2 py-1.5 rounded-sm lg:rounded-md hover:cursor-pointer',
    'hover:bg-neutral-100 active:bg-neutral-200/70' => !$active && !$destructive,
    'bg-neutral-200/70' => $active,
    'text-red-800 hover:bg-red-100/80 active:bg-red-200/60' => $destructive,
    ]) }}>
        <span class="flex items-center gap-x-1">
            @if(isset($icon))
                {{ $icon }}
            @endif
            <span class="text-sm">{{ $label }}</span>
            @if(isset($suffix))
                {{ $suffix }}
            @endif
        </span>
        @if(isset($helpText))
            <span class="text-xs text-neutral-500 mt-1.5 leading-3">{{ $helpText }}</span>
        @endif
    </a>
@else
    <button {{ $attributes->class([
    'text-left block px-2 py-1.5 rounded-sm lg:rounded-md hover:cursor-pointer',
    'hover:bg-neutral-100 active:bg-neutral-200/70' => !$active && !$destructive,
    'bg-neutral-200/70' => $active,
    'text-red-800 hover:bg-red-100/80 active:bg-red-200/60' => $destructive,
    ]) }}>
        <span class="flex items-center gap-x-1">
             @if(isset($icon))
                {{ $icon }}
            @endif
            <span class="text-sm">{{ $label }}</span>
            @if(isset($suffix))
                {{ $suffix }}
            @endif
        </span>
        @if(isset($helpText))
            <span class="text-xs text-neutral-500 mt-1.5 leading-3">{{ $helpText }}</span>
        @endif
    </button>
@endif
