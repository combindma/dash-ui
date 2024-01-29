<ul @class(['shrink-0 grow-0 basis-auto', 'pb-5' => !$sticky, 'sticky bottom-5 mt-auto' => $sticky])>
    @if($title)
        <li class="relative flex flex-col px-2 mb-1">
            <span class="pl-3 text-neutral-500 text-sm font-semibold">{{ $title }}</span>
        </li>
    @endif
    {{ $slot }}
</ul>
