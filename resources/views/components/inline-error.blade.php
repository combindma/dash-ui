<div {{ $attributes->class(['flex items-center justify-between gap-x-2 text-red-800 mt-0.5']) }}>
    <span><x-gmdi-error-outline class="w-3.5 h-3.5"/></span>
    <span class="text-xs">{{ $message }}</span>
</div>
