<el-tab-group>
    <el-tab-list {{ $attributes->class(['flex flex-wrap gap-1'])}} aria-label="Tabs Interface">
        @foreach($tabs as $tab)
            <button type="button" class="rounded-xs aria-selected:bg-neutral-300/55 text-sm font-medium leading-none px-2.5 py-1.5 hover:cursor-pointer hover:bg-neutral-200/60 lg:rounded-lg">{{ $tab }}</button>
        @endforeach
    </el-tab-list>
    <el-tab-panels>
        {{ $slot }}
    </el-tab-panels>
</el-tab-group>
