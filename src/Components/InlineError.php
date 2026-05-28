<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class InlineError extends Component
{
    public function __construct(
        public string $message
    ) {}

    public function render()
    {
        return view('dashui::components.inline-error');
    }
}
