<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class SelectAuto extends Component
{
    public function __construct(
    ) {
    }

    public function render()
    {
        return view('dash-ui::components.select-auto');
    }
}