<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class Dropzone extends Component
{
    public function __construct(
        public string $label,
        public string $id,
        public ?string $helpText = null,
    ) {}

    public function render()
    {
        return view('dash-ui::components.dropzone');
    }
}
