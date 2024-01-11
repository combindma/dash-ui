<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class Modal extends Component
{
    public function __construct(
        public string $activator,
        public string $title = '',
        public string $size = 'normal'
    ) {
    }

    public function render()
    {
        return view('dash-ui::components.modal');
    }
}
