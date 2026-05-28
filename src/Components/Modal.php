<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class Modal extends Component
{
    public function __construct(
        public string $trigger,
        public ?string $title = null,
        public string $size = 'normal'
    ) {}

    public function render()
    {
        return view('dashui::components.modal');
    }
}
