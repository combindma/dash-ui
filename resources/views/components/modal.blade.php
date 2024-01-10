<div id="{{ $activator }}" @class(['bg-neutral-900/75 modal modal--animate-translate-up js-modal' ,'flex items-end justify-center lg:items-center lg:p-8' => ($size !== 'fullScreen')]) data-modal-prevent-scroll="body">
    <div {{ $attributes->class([
    'modal__content w-full max-h-full overflow-auto bg-white lg:rounded-[16px] shadow-lg' => ($size !== 'fullScreen'),
    'lg:max-w-md' => ($size == 'small'),
    'lg:max-w-2xl' => ($size == 'normal'),
    'max-w-7xl' => ($size == 'large'),
    'modal__content bg-white h-full flex flex-col' => ($size == 'fullScreen'),
    ]) }}>
        @if($title)
            <header class="bg-neutral-300/50 py-2 lg:py-3 px-2 lg:px-3 flex items-center justify-between">
                <h2 class="truncate font-bold">{{ $title }}</h2>
                <x-dashui-button type="button" variant="subtle" class="p-1 text-neutral-500 js-modal__close js-tab-focus">
                    <x-gmdi-close class="w-6 h-6"/>
                </x-dashui-button>
            </header>
        @else
            <div class="float-right sticky top-2 right-2">
                <x-dashui-button type="button" variant="subtle" class="p-1 text-neutral-500 js-modal__close js-tab-focus">
                    <x-gmdi-close class="w-6 h-6"/>
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
    </div>
</div>
