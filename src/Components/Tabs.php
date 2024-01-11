<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class Tabs extends Component
{
    public function __construct(
        public array $tabs,
    ) {
    }

    public function render()
    {
        return view('dash-ui::components.tabs');
    }
}
