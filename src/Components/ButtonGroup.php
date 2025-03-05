<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class ButtonGroup extends Component
{
    public function __construct(
        public string $variant = 'basic',
    ) {}

    public function render()
    {
        return view('dash-ui::components.button-group');
    }
}
