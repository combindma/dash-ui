<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class TabPanel extends Component
{
    public function __construct(
        public bool $selected = false
    ) {}

    public function render()
    {
        return view('dashui::components.tab-panel');
    }
}
