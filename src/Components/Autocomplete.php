<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class Autocomplete extends Component
{
    public function __construct(
        public string $activator,
        public array $options,
    ) {}

    public function render()
    {
        return view('dash-ui::components.autocomplete');
    }
}
