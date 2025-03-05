<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class TabPanel extends Component
{
    public function __construct(
        public string $panelId
    ) {}

    public function render()
    {
        return view('dash-ui::components.tab-panel');
    }
}
