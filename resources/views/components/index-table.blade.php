<div class="card">
    <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-neutral-300">
            <thead class="bg-gray-50">
            <tr>
                @foreach($headings as $column)
                    <th scope="col" @class([
    'whitespace-nowrap text-xs font-medium text-neutral-600/90 px-3 py-2',
    'text-left' => !array_key_exists('alignment',$column),
    'text-center' => array_key_exists('alignment',$column) && $column['alignment'] == 'center',
    'text-right' => array_key_exists('alignment',$column) && $column['alignment'] == 'end',
    ])>{{ $column['title'] }}</th>
                @endforeach
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-neutral-200">
            {{ $slot }}
            </tbody>
        </table>
    </div>
    @if(isset($pagination))
        <div class="bg-gray-100">{{ $pagination }}</div>
    @endif
</div>
