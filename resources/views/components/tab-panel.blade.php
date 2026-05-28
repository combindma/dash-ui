<div {{ $attributes->class(['pt-3 lg:pt-5']) }} @if(!$selected) hidden @endif>
    {{ $slot }}
</div>
