<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class Autocomplete extends Component
{
    public function __construct(
    ) {}

    public function render()
    {
        return view('dashui::components.autocomplete');
    }
}
