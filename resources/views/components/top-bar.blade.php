<div {{ $attributes->class(['top-bar fixed top-0 left-0 w-full overflow-hidden px-3 shadow-sm h-full bg-primary-900 z-[4] lg:px-4']) }}>
    <div class="relative h-full gap-2 top-bar__inner">
        <div class="block lg:hidden">
            <button type="button" aria-controls="{{ $menuId }}" class="flex items-center rounded-md text-white p-1.5 hover:cursor-pointer hover:bg-neutral-600">
                <svg viewBox="0 0 20 20" class="block h-6 w-6 shrink-0 fill-current leading-none text-inherit"><path fill-rule="evenodd" d="M3 4.75a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5h-12.5a.75.75 0 0 1-.75-.75Z"></path><path fill-rule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5h-12.5a.75.75 0 0 1-.75-.75Z"></path><path fill-rule="evenodd" d="M3 15.25a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5h-12.5a.75.75 0 0 1-.75-.75Z"></path></svg>
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
                @if($avatar)
                    <x-dashui-avatar src="{{ $avatar }}"/>
                @else
                    <x-dashui-avatar :initials="$userInitials" class="bg-rose-700"/>
                @endif
            </button>
            <x-dashui-popover id="popover-user-menu" role="dialog">
                {{ $userMenu }}
            </x-dashui-popover>
        </div>
    </div>
</div>
