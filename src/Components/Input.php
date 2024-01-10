<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class Input extends Component
{
    public function __construct(
        public ?string $helpText = null,
        public ?string $error = null,
        public ?string $prefix = null,
        public ?string $suffix = null,
    ) {
    }

    public function render()
    {
        return view('dash-ui::components.input');
    }
}
