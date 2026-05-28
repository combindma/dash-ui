<el-autocomplete class="relative block">
    <x-dashui-input {{ $attributes }} />
    <button type="button" class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2">
        <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5 text-gray-400">
            <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
        </svg>
    </button>
    <el-options anchor="bottom end" popover class="max-h-60 w-(--input-width) overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline outline-black/5 transition-discrete [--anchor-gap:--spacing(1)] data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm">
        @foreach($options as $option)
            <el-option value="{{ $option['value'] }}" class="block truncate px-3 py-2 text-gray-900 select-none aria-selected:bg-primary-800 aria-selected:text-white">{{ $option['label'] }}</el-option>
        @endforeach
    </el-options>
</el-autocomplete>
