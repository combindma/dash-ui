<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class Tag extends Component
{
    public function __construct(
        public string $name,
        public string $url,
    ) {
    }

    public function render()
    {
        return view('dash-ui::components.tag');
    }
}
