<el-dialog>
    <dialog id="{{ $trigger }}" class="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent">
        <el-dialog-backdrop
            class="fixed inset-0 bg-neutral-900/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"></el-dialog-backdrop>
        <div tabindex="0" class="flex h-full min-h-full items-end justify-center p-2 focus:outline-none sm:items-center sm:p-0">
            <el-dialog-panel {{ $attributes->class([ 'relative overflow-hidden transform transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in data-closed:sm:translate-y-0 data-closed:sm:scale-95',
    'w-full max-h-full overflow-auto bg-white rounded-lg shadow-lg' => ($size !== 'fullScreen'),
    'lg:max-w-md' => ($size === 'small'),
    'lg:max-w-2xl' => ($size === 'normal'),
    'max-w-7xl' => ($size === 'large'),
    'bg-white h-full rounded-lg lg:rounded-none flex flex-col' => ($size === 'fullScreen'),
    ]) }}>
                @if($title)
                    <header class="bg-neutral-300/50 py-2 lg:py-3 px-2 lg:px-3 flex items-center justify-between">
                        <h2 class="truncate font-bold">{{ $title }}</h2>
                        <x-dashui-button type="button" command="close" commandfor="{{ $trigger }}" variant="subtle" class="p-1 text-neutral-500">
                            <svg class="block h-3.5 w-3.5 text-inherit fill-current leading-none shrink-0" viewBox="0 0 16 16">
                                <g fill="currentColor">
                                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l10 10"></path>
                                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 3L3 13"></path>
                                </g>
                            </svg>
                        </x-dashui-button>
                    </header>
                @else
                    <div class="float-right sticky top-2 right-2">
                        <x-dashui-button type="button" command="close" commandfor="{{ $trigger }}" variant="subtle" class="p-1 text-neutral-500">
                            <svg class="block h-3.5 w-3.5 text-inherit fill-current leading-none shrink-0" viewBox="0 0 16 16">
                                <g fill="currentColor">
                                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l10 10"></path>
                                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 3L3 13"></path>
                                </g>
                            </svg>
                        </x-dashui-button>
                    </div>
                @endif

                <div class="py-3 lg:py-5 px-2 lg:px-4 grow overflow-auto">
                    <div class="text-sm">
                        {{ $slot }}
                    </div>
                </div>

                @if(isset($actions))
                    <x-dashui-divider/>
                    <footer class="p-2 lg:p-4">
                        <div {{ $actions->attributes->class(['flex justify-end gap-2 lg:gap-3']) }}>
                            {{ $actions }}
                        </div>
                    </footer>
                @endif
            </el-dialog-panel>
        </div>
    </dialog>
</el-dialog>
