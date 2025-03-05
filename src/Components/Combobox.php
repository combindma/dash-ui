<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class Combobox extends Component
{
    public function __construct(
        public array $options,
        public ?string $inputName = null,
        public string $selectedText = 'selected',
        public string $resetText = 'reset',
        public string $resultsText = 'No results',
    ) {}

    public function render()
    {
        return view('dash-ui::components.combobox');
    }
}
