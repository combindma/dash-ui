<div {{ $attributes->class(['popover border-box fixed z-[5] js-popover js-tab-focus']) }}>
    <div class="card shadow overflow-auto bg-white">
        <div class="p-2">
            <div class="flex flex-col gap-y-1">
                {{ $slot }}
            </div>
        </div>
    </div>
</div>
