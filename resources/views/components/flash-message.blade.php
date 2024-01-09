<div {{ $attributes->class([
    'fixed bottom-6 left-2/4 -translate-x-1/2 z-10 p-3 rounded-lg transition-all duration-200 translate-y-4 origin-bottom-center opacity-0 invisible shadow-[0_0_0_1px_hsl(221_39%_11%/0.05),0_0.3px_0.4px_hsl(221_39%_11%/0.02),0_0.9px_1.5px_hsl(221_39%_11%/0.045),0_3.5px_6px_hsl(221_39%_11%/0.09)] [&.flash-message--is-visible]:opacity-100 [&.flash-message--is-visible]:visible [&.flash-message--is-visible]:translate-y-0 js-flash-message',
    'bg-primary-800 text-white' => !$error,
    'bg-red-600 text-white' => $error,
    ]) }}>
    <div class="flex items-center gap-x-2">
        @if($error)
            <x-gmdi-error-outline class="w-6 h-6 leading-none"/>
        @else
            <x-gmdi-info-o class="w-6 h-6 leading-none"/>
        @endif
        <p class="leading-none font-medium">{{ $message }}</p>
    </div>
</div>
