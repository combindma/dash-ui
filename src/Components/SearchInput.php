<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class SearchInput extends Component
{
    public function __construct(
        public bool $iconLeft = false,
        public ?string $error = null,
    ) {
    }

    public function render()
    {
        return view('dash-ui::components.search-input');
    }
}
