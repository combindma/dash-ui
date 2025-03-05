<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class Box extends Component
{
    public function __construct(
        public bool $border = false,
        public bool $shadow = false,
        public bool $rounded = false,
    ) {}

    public function render()
    {
        return view('dash-ui::components.box');
    }
}
