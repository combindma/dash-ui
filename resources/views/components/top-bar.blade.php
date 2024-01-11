<div {{ $attributes->class(['fixed top-0 left-0 w-full overflow-hidden px-3 shadow-sm h-[60px] bg-primary-900 z-[4] lg:px-4']) }}>
    <div class="relative h-full gap-2 top-bar">
        <div class="block lg:hidden">
            <button type="button" aria-controls="{{ $menuId }}" class="flex items-center rounded-md text-white p-1.5 hover:cursor-pointer hover:bg-neutral-600">
                <x-gmdi-menu-r class="h-5 w-5"/>
            </button>
        </div>
        <div class="hidden lg:block">
            <a href="{{ $url }}" class="flex justify-start w-[95px]">
                <img src="{{ $logo }}" alt="Logo">
            </a>
        </div>
        <div class="flex max-w-lg flex-col justify-center">
            {{ $searchField }}
        </div>
        <div class="ml-auto">
            <button type="button" class="flex items-center rounded-md bg-neutral-700/60 px-0.5 hover:cursor-pointer hover:bg-neutral-700 lg:pr-0.5 lg:py-0.5 lg:rounded-lg lg:pl-2" aria-controls="popover-user-menu">
                <span class="mr-2 hidden text-white lg:inline-block">{{ $userName }}</span>
                <x-dashui-avatar :initials="$userInitials" class="bg-rose-700"/>
            </button>
            <x-dashui-popover id="popover-user-menu" role="dialog">
                {{ $userMenu }}
            </x-dashui-popover>
        </div>
    </div>
</div>
