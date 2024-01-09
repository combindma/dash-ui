<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class FlashMessage extends Component
{
    public function __construct(
        public string $message,
        public bool $error = false
    ) {
    }

    public function render()
    {
        return view('dash-ui::components.flash-message');
    }
}
