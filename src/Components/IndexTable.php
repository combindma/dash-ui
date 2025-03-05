<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class IndexTable extends Component
{
    public function __construct(
        public array $headings,
        public bool $selectable = true,
    ) {}

    public function render()
    {
        return view('dash-ui::components.index-table');
    }
}
