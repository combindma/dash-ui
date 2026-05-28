<button type="button" command="--copy" {{ $attributes->class(['cursor-pointer flex justify-center items-center size-6 rounded-sm bg-gray-900/10 hover:bg-gray-900/[.15]']) }}>
    <span class="in-data-copied:hidden">
        <svg class="inline-block text-inherit fill-current leading-none shrink-0 size-[16px]" width="16" height="16" viewBox="0 0 16 16">
            <path d="M12,2h.5A1.5,1.5,0,0,1,14,3.5v10A1.5,1.5,0,0,1,12.5,15h-9A1.5,1.5,0,0,1,2,13.5V3.5A1.5,1.5,0,0,1,3.5,2H4" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/>
            <rect x="6" y="1" width="4" height="2" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
        </svg>
    </span>
    <span class="not-in-data-copied:hidden">
        <svg class="inline-block text-inherit fill-current leading-none shrink-0 size-[16px]" width="16" height="16" viewBox="0 0 16 16">
            <path d="M12,2h.5A1.5,1.5,0,0,1,14,3.5v10A1.5,1.5,0,0,1,12.5,15h-9A1.5,1.5,0,0,1,2,13.5V3.5A1.5,1.5,0,0,1,3.5,2H4" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/>
            <rect x="6" y="1" width="4" height="2" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            <polyline points="5 9 7 11 11 7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
        </svg>
    </span>
</button>
