<el-popover popover anchor="bottom end" {{ $attributes->class(['max-w-max w-screen overflow-visible bg-transparent px-4 transition transition-discrete [--anchor-gap:--spacing(1)] backdrop:bg-transparent open:flex data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in']) }}>
    <div class="card rounded-lg before:rounded-lg shadow-sm overflow-auto bg-white">
        <div class="p-1.5 lg:p-2">
            <div class="flex flex-col gap-y-1">
                {{ $slot }}
            </div>
        </div>
    </div>
</el-popover>
