<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class Pagination extends Component
{
    public function __construct(
        public ?string $previous = null,
        public ?string $next = null,
        public ?string $label = null,
    ) {
    }

    public function render()
    {
        return view('dash-ui::components.pagination');
    }
}
