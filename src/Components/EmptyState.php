<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class EmptyState extends Component
{
    public function render()
    {
        return view('dash-ui::components.empty-state');
    }
}
