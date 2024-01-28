<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class SelectAuto extends Component
{
    public function __construct(
        public ?string $helpText = null,
        public string $placeholderText = '',
        public bool $required = false
    ) {

    }

    public function render()
    {
        return view('dash-ui::components.select-auto');
    }
}
