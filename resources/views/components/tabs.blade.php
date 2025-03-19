<div class="tabs js-tabs">
    <ul {{ $attributes->class(['flex flex-wrap gap-1 js-tabs__controls'])}} aria-label="Tabs Interface">
        @foreach($tabs as $tab)
            <li><a href="#{{ $tab['panelId'] }}" class="rounded-xs aria-selected:bg-neutral-300/55 text-sm font-medium leading-none px-2.5 py-1.5 hover:cursor-pointer hover:bg-neutral-200/60 lg:rounded-lg" @if(array_key_exists('selected', $tab)) aria-selected="true" @endif>{{ $tab['label'] }}</a></li>
        @endforeach
    </ul>
    <div class="js-tabs__panels">
        {{ $slot }}
    </div>
</div>
