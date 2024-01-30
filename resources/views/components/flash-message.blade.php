<div data-duration="5000" role="status" {{ $attributes->class([
    'fixed bottom-6 left-2/4 -translate-x-1/2 z-10 py-2.5 pl-4 pr-2 rounded-lg transition-all duration-200 translate-y-4 origin-bottom-center opacity-0 invisible shadow-[0_0_0_1px_hsl(221_39%_11%/0.05),0_0.3px_0.4px_hsl(221_39%_11%/0.02),0_0.9px_1.5px_hsl(221_39%_11%/0.045),0_3.5px_6px_hsl(221_39%_11%/0.09)] [&.flash-message--is-visible]:opacity-100 [&.flash-message--is-visible]:visible [&.flash-message--is-visible]:translate-y-0 js-flash-message',
    'bg-primary-800 text-white' => !$error,
    'bg-red-600 text-white' => $error,
    'js-auto-flash-message' => $show,
    ]) }}>
    <div class="flex items-center gap-x-2">
        <p class="leading-none font-medium">{{ $message }}</p>
        <x-dashui-button type="button" variant="subtle" class="p-1 text-inherit" onclick="this.closest('.flash-message--is-visible').classList.remove('flash-message--is-visible')">
            <svg class="block h-3 w-3 text-inherit fill-current leading-none shrink-0" viewBox="0 0 16 16">
                <g fill="currentColor">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l10 10"></path>
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 3L3 13"></path>
                </g>
            </svg>
        </x-dashui-button>
    </div>
</div>
