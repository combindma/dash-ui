<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class Stub extends Component
{
    public function __construct(
    ) {
    }

    public function render()
    {
        return view('dash-ui::components');
    }
}
