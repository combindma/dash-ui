<div {{ $attributes->class([
    'inline-flex items-center justify-center px-2 rounded-[8px] font-[450] leading-none',
    'bg-neutral-300/40 text-neutral-600' => !$tone,
    'bg-blue-200/90 text-blue-950' => ($tone == 'info'),
    'bg-green-200/90 text-success-800' => ($tone == 'success'),
    'bg-yellow-200/90 text-yellow-900' => ($tone == 'attention'),
    'bg-orange-200/90 text-amber-900' => ($tone == 'warning'),
    'bg-red-200/90 text-red-900' => ($tone == 'critical'),
    'py-1' => !$progress,
    'py-0' => $progress,
]) }}>
    @if($progress == 'incomplete')
        <span class="block w-5 h-5">
            <svg class="w-full h-full fill-current opacity-70" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.547 12.69c.183.05.443.06 1.453.06s1.27-.01 1.453-.06a1.75 1.75 0 0 0 1.237-1.237c.05-.182.06-.443.06-1.453s-.01-1.27-.06-1.453a1.75 1.75 0 0 0-1.237-1.237c-.182-.05-.443-.06-1.453-.06s-1.27.01-1.453.06A1.75 1.75 0 0 0 7.31 8.547c-.05.183-.06.443-.06 1.453s.01 1.27.06 1.453a1.75 1.75 0 0 0 1.237 1.237ZM6.102 8.224C6 8.605 6 9.07 6 10s0 1.395.102 1.777a3 3 0 0 0 2.122 2.12C8.605 14 9.07 14 10 14s1.395 0 1.777-.102a3 3 0 0 0 2.12-2.121C14 11.395 14 10.93 14 10c0-.93 0-1.395-.102-1.776a3 3 0 0 0-2.121-2.122C11.395 6 10.93 6 10 6c-.93 0-1.395 0-1.776.102a3 3 0 0 0-2.122 2.122Z"></path></svg>
        </span>
    @elseif($progress == 'partiallyComplete')
        <span class="block w-5 h-5">
            <svg class="w-full h-full fill-current opacity-70" viewBox="0 0 20 20"><path fill-rule="evenodd" d="m8.888 6.014-.017-.018-.02.02c-.253.013-.45.038-.628.086a3 3 0 0 0-2.12 2.122C6 8.605 6 9.07 6 10s0 1.395.102 1.777a3 3 0 0 0 2.121 2.12C8.605 14 9.07 14 10 14c.93 0 1.395 0 1.776-.102a3 3 0 0 0 2.122-2.121C14 11.395 14 10.93 14 10c0-.93 0-1.395-.102-1.776a3 3 0 0 0-2.122-2.122C11.395 6 10.93 6 10 6c-.475 0-.829 0-1.112.014ZM8.446 7.34a1.75 1.75 0 0 0-1.041.94l4.314 4.315c.443-.2.786-.576.941-1.042L8.446 7.34Zm4.304 2.536L10.124 7.25c.908.001 1.154.013 1.329.06a1.75 1.75 0 0 1 1.237 1.237c.047.175.059.42.06 1.329ZM8.547 12.69c.182.05.442.06 1.453.06h.106L7.25 9.894V10c0 1.01.01 1.27.06 1.453a1.75 1.75 0 0 0 1.237 1.237Z"></path></svg>
        </span>
    @elseif($progress == 'complete')
        <span class="block w-5 h-5">
            <svg class="fill-current opacity-80" viewBox="0 0 20 20"><path d="M6 10c0-.93 0-1.395.102-1.776a3 3 0 0 1 2.121-2.122C8.605 6 9.07 6 10 6c.93 0 1.395 0 1.776.102a3 3 0 0 1 2.122 2.122C14 8.605 14 9.07 14 10s0 1.395-.102 1.777a3 3 0 0 1-2.122 2.12C11.395 14 10.93 14 10 14s-1.395 0-1.777-.102a3 3 0 0 1-2.12-2.121C6 11.395 6 10.93 6 10Z"></path></svg>
        </span>
    @endif
    <span class="text-xs leading-none">{{ $slot }}</span>
</div>
