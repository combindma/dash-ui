<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class Textarea extends Component
{
    public function __construct(
        public ?string $helpText = null,
        public ?string $error = null,
    ) {
    }

    public function render()
    {
        return view('dash-ui::components.textarea');
    }
}
