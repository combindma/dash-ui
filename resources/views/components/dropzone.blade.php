<div class="relative file-upload">
    <label for="{{ $id }}" class="flex flex-col w-full items-center justify-center rounded-lg border border-dashed border-neutral-500/90 bg-white p-4 min-h-14 file-upload__label hover:cursor-pointer hover:bg-neutral-50 lg:min-h-32">
        <span class="max-w-[12rem] truncate font-medium btn file-upload__text">{{ $label }}</span>
        @if($helpText)
            <span class="text-xs text-neutral-500 mt-2">{{ $helpText }}</span>
        @endif
    </label>

    <input type="file" id="{{ $id }}" {{ $attributes->class(['file-upload__input absolute w-px h-px']) }} style="clip: rect(1px, 1px, 1px, 1px); clip-path: inset(50%);">
</div>
