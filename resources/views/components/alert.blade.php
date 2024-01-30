<div class="alert mb-3 alert--is-visible absolute [&.alert--is-visible]:static js-alert">
    <div {{ $attributes->class([
    'flex justify-between items-baseline p-2 rounded-lg',
    'bg-sky-100 text-sky-900' => ($tone == 'info'),
    'bg-green-100 text-emerald-900' => ($tone == 'success'),
    'bg-orange-200/35 text-orange-900' => ($tone == 'warning'),
    'bg-red-100 text-red-900' => ($tone == 'critical'),
    ]) }}>
        <div class="flex gap-x-2">
            @if($tone == 'success')
                <svg viewBox="0 0 20 20" class="h-5 w-5 shrink-0 fill-current leading-none text-inherit"><path fill-rule="evenodd" d="M15.78 5.97a.75.75 0 0 1 0 1.06l-6.5 6.5a.75.75 0 0 1-1.06 0l-3.25-3.25a.75.75 0 1 1 1.06-1.06l2.72 2.72 5.97-5.97a.75.75 0 0 1 1.06 0Z"></path></svg>
            @elseif($tone == 'warning')
                <svg viewBox="0 0 20 20" class="h-5 w-5 shrink-0 fill-current leading-none text-inherit" focusable="false" aria-hidden="true"><path d="M10 6.75a.75.75 0 0 1 .75.75v3.5a.75.75 0 1 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75Z"></path><path d="M11 13.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path><path fill-rule="evenodd" d="M10 3.5c-1.045 0-1.784.702-2.152 1.447a449.26 449.26 0 0 1-2.005 3.847l-.028.052a403.426 403.426 0 0 0-2.008 3.856c-.372.752-.478 1.75.093 2.614.57.863 1.542 1.184 2.464 1.184h7.272c.922 0 1.895-.32 2.464-1.184.57-.864.465-1.862.093-2.614-.21-.424-1.113-2.147-2.004-3.847l-.032-.061a429.497 429.497 0 0 1-2.005-3.847c-.368-.745-1.107-1.447-2.152-1.447Zm-.808 2.112c.404-.816 1.212-.816 1.616 0 .202.409 1.112 2.145 2.022 3.88a418.904 418.904 0 0 1 2.018 3.875c.404.817 0 1.633-1.212 1.633h-7.272c-1.212 0-1.617-.816-1.212-1.633.202-.408 1.113-2.147 2.023-3.883a421.932 421.932 0 0 0 2.017-3.872Z"></path></svg>
            @elseif($tone == 'critical')
                <svg viewBox="0 0 20 20" class="h-5 w-5 shrink-0 fill-current leading-none text-inherit" focusable="false" aria-hidden="true"><path d="M10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75Z"></path><path d="M11 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path><path fill-rule="evenodd" d="M11.237 3.177a1.75 1.75 0 0 0-2.474 0l-5.586 5.585a1.75 1.75 0 0 0 0 2.475l5.586 5.586a1.75 1.75 0 0 0 2.474 0l5.586-5.586a1.75 1.75 0 0 0 0-2.475l-5.586-5.585Zm-1.414 1.06a.25.25 0 0 1 .354 0l5.586 5.586a.25.25 0 0 1 0 .354l-5.586 5.585a.25.25 0 0 1-.354 0l-5.586-5.585a.25.25 0 0 1 0-.354l5.586-5.586Z"></path></svg>
            @else
                <svg viewBox="0 0 20 20" class="h-5 w-5 shrink-0 fill-current leading-none text-inherit"><path d="M10 14a.75.75 0 0 1-.75-.75v-3.5a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-.75.75Z"></path><path d="M9 7a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"></path><path fill-rule="evenodd" d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z"></path></svg>
            @endif
            <div class="text-sm font-medium">{{ $slot }}</div>
        </div>
        <x-dashui-button type="button" variant="subtle" class="p-1 js-alert__close-btn">
            <svg class="block h-3.5 w-3.5 text-inherit fill-current leading-none shrink-0" viewBox="0 0 16 16">
                <g fill="currentColor">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l10 10"></path>
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 3L3 13"></path>
                </g>
            </svg>
        </x-dashui-button>
    </div>
</div>
