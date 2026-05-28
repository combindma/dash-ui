@props(['trigger'])

<aside class="hidden md:block relative flex-shrink-0 flex-grow-1 w-full z-1 max-w-[15rem]">
    <div class="flex overflow-auto flex-col items-stretch h-full bg-[#ebebeb] fixed top-[var(--top-bar-height)] left-0 w-full max-w-[15rem] max-h-[calc(100vh-var(--top-bar-height))]">
        {{ $navigation }}
    </div>
</aside>

<el-dialog>
    <dialog id="{{ $trigger }}" class="fixed inset-0 size-auto max-h-none max-w-none overflow-hidden bg-transparent backdrop:bg-transparent">
        <el-dialog-backdrop class="absolute inset-0 bg-neutral-900/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"></el-dialog-backdrop>
        <div tabindex="0" class="absolute inset-0 focus:outline-none">
            <el-dialog-panel class="block size-full max-w-md transform transition duration-500 ease-in-out data-closed:-translate-x-full">
                <div class="relative flex h-full flex-col overflow-y-auto bg-[#ebebeb] shadow-xl">
                    <header class="px-5 py-3 flex items-center justify-between sticky top-0 text-white bg-primary-900 z-2 lg:px-8 lg:py-5">
                        {{ $logo }}

                        <button command="close" commandfor="{{ $trigger }}" class="cursor-pointer bg-neutral-700 hover:bg-neutral-600">
                            <svg class="inline-block shrink-0 fill-current leading-none text-inherit size-[16px]" viewBox="0 0 16 16">
                                <g stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"><line x1="13.5" y1="2.5" x2="2.5" y2="13.5"></line><line x1="2.5" y1="2.5" x2="13.5" y2="13.5"></line></g></svg>
                        </button>
                    </header>

                    <div class="h-full">
                        {{ $navigation }}
                    </div>
                </div>
            </el-dialog-panel>
        </div>
    </dialog>
</el-dialog>
