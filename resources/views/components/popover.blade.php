<div {{ $attributes->class(['popover my-1 w-auto max-w-[200px] border-box fixed z-[5] js-popover js-tab-focus']) }}>
    <div class="card rounded-lg before:rounded-lg shadow overflow-auto bg-white">
        <div class="p-1.5 lg:p-2">
            <div class="flex flex-col gap-y-1">
                {{ $slot }}
            </div>
        </div>
    </div>
</div>
