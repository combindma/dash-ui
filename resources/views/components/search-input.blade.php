<div class="relative">
    <input {{ $attributes->class([
    'search-input block w-full appearance-none box-border rounded-lg text-sm border-0 py-1.5 mb-1.5 text-neutral-900 ring-1 ring-inset placeholder:text-neutral-500 focus:ring-2 focus:ring-inset focus:ring-primary-700',
    'ring-neutral-500/90' => !$error,
    'bg-red-100/50 ring-red-800' => $error,
    'pr-7' => !$iconLeft,
    'pl-8' => $iconLeft,
]) }}>
    <button @class([
    'absolute top-0 flex items-center justify-center h-full w-6 text-neutral-500',
    'right-0 mr-1' => !$iconLeft,
    'left-0 ml-1' => $iconLeft
    ])>
        <svg class="h-4 w-4 inline-block text-inherit fill-current leading-none shrink-0" viewBox="0 0 20 20"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="8" cy="8" r="6"/><line x1="12.242" y1="12.242" x2="18" y2="18"/></g></svg>
    </button>
</div>
