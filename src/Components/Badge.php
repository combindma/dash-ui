<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class Badge extends Component
{
    public function __construct(
        public ?string $tone = null,
        public ?string $progress = null
    ) {}

    public function render()
    {
        return view('dash-ui::components.badge');
    }
}
