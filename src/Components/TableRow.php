<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class TableRow extends Component
{
    public function __construct(
        public ?string $id = null,
        public ?string $url = null,
    ) {}

    public function render()
    {
        return view('dash-ui::components.table-row');
    }
}
