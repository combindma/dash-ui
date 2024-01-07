<div {{ $attributes->class([
    'popover border-box fixed z-[5] overflow-auto bg-white p-1 shadow-md lg:p-2 js-popover js-tab-focus',
]) }}>
    <div class="flex flex-col gap-y-1">
        {{ $slot }}
    </div>
</div>
