<tr @if($url) onclick="location.href='{{ $url }}';" class="hover:bg-neutral-50 hover:cursor-pointer" @endif>{{ $slot }}</tr>
