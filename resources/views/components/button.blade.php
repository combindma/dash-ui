@if($as === 'link')
    <a @disabled($disabled)
        {{ $attributes->class([
        'group hover:cursor-pointer items-center rounded-lg px-3 py-1 text-xs font-medium focus:outline-none',
        'bg-white shadow-button hover:bg-neutral-50 hover:shadow-button-hover active:shadow-button-inset' => ($variant === 'default'),
        'text-white' => ($variant === 'primary'),
        'bg-primary-800 hover:bg-primary-900 active:text-neutral-200 shadow-button-primary hover:shadow-button-primary-hover active:shadow-button-primary-inset' => ($variant === 'primary' && $tone == 'default'),
        'bg-red-600 hover:bg-red-700 active:bg-red-800 shadow-button-primary-critical hover:shadow-button-primary-critical-hover active:shadow-button-primary-critical-inset' => ($variant === 'primary' && $tone == 'critical'),
        'bg-green-600 hover:bg-green-700 active:bg-green-800 shadow-button-primary-success hover:shadow-button-primary-success-hover active:shadow-button-primary-success-inset' => ($variant === 'primary' && $tone == 'success'),
        'hover:bg-[rgba(0,0,0,.05)] active:bg-[rgba(0,0,0,.08)]' => ($variant === 'tertiary'),
        'hover:underline hover:underline-offset-2' => ($variant === 'plain'),
        'text-blue-600 hover:text-blue-900 active:text-blue-900' => ($variant === 'plain' && $tone == 'default'),
        'text-red-700 hover:text-red-900 active:text-red-900' => ($variant === 'plain' && $tone == 'critical'),
        '!py-2 !text-sm' => ($size === 'large'),
        'w-full justify-center' => $fullWidth,
        '!bg-[#ccc] shadow-button-inset hover:bg-[#ccc] hover:shadow-button-inset' => $pressed,
        'hover:!cursor-default focus:cursor-auto !shadow-none hover:!shadow-none active:!shadow-none' => $disabled,
        '!text-white !bg-[rgba(0,0,0,.17)] hover:!bg-[rgba(0,0,0,.17)] hover:!text-white active:!bg-[rgba(0,0,0,.17)] active:!text-white' => ($disabled && $variant === 'primary'),
        '!text-[#b5b5b5] !bg-[rgba(0,0,0,.05)] hover:!bg-[rgba(0,0,0,.05)] hover:!text-[#b5b5b5] active:!bg-[rgba(0,0,0,.05)] active:!text-[#b5b5b5]' => ($disabled && $variant === 'default'),
        '!text-[#b5b5b5] !bg-transparent hover:!bg-transparent hover:!no-underline hover:!text-[#b5b5b5] active:!bg-transparent active:!text-[#b5b5b5]' => ($disabled && ($variant === 'tertiary' || $variant === 'plain')),
        ]) }}>
        <span @class(['group-active:translate-y-[0.0625rem]' => !$disabled])>{{ $slot }}</span>
    </a>
@else
    <button @disabled($disabled)
        {{ $attributes->class([
        'group hover:cursor-pointer items-center rounded-lg px-3 py-1 text-xs font-medium focus:outline-none',
        'bg-white shadow-button hover:bg-neutral-50 hover:shadow-button-hover active:shadow-button-inset' => ($variant === 'default'),
        'text-white' => ($variant === 'primary'),
        'bg-primary-800 hover:bg-primary-900 active:text-neutral-200 shadow-button-primary hover:shadow-button-primary-hover active:shadow-button-primary-inset' => ($variant === 'primary' && $tone == 'default'),
        'bg-red-600 hover:bg-red-700 active:bg-red-800 shadow-button-primary-critical hover:shadow-button-primary-critical-hover active:shadow-button-primary-critical-inset' => ($variant === 'primary' && $tone == 'critical'),
        'bg-green-600 hover:bg-green-700 active:bg-green-800 shadow-button-primary-success hover:shadow-button-primary-success-hover active:shadow-button-primary-success-inset' => ($variant === 'primary' && $tone == 'success'),
        'hover:bg-[rgba(0,0,0,.05)] active:bg-[rgba(0,0,0,.08)]' => ($variant === 'tertiary'),
        'hover:underline hover:underline-offset-2' => ($variant === 'plain'),
        'text-blue-600 hover:text-blue-900 active:text-blue-900' => ($variant === 'plain' && $tone == 'default'),
        'text-red-700 hover:text-red-900 active:text-red-900' => ($variant === 'plain' && $tone == 'critical'),
        '!py-2 !text-sm' => ($size === 'large'),
        'w-full justify-center' => $fullWidth,
        '!bg-[#ccc] !shadow-button-inset hover:!bg-[#ccc] hover:!shadow-button-inset' => $pressed,
        'hover:!cursor-default focus:cursor-auto !shadow-none hover:!shadow-none active:!shadow-none' => $disabled,
        '!text-white !bg-[rgba(0,0,0,.17)] hover:!bg-[rgba(0,0,0,.17)] hover:!text-white active:!bg-[rgba(0,0,0,.17)] active:!text-white' => ($disabled && $variant === 'primary'),
        '!text-[#b5b5b5] !bg-[rgba(0,0,0,.05)] hover:!bg-[rgba(0,0,0,.05)] hover:!text-[#b5b5b5] active:!bg-[rgba(0,0,0,.05)] active:!text-[#b5b5b5]' => ($disabled && $variant === 'default'),
        '!text-[#b5b5b5] !bg-transparent hover:!bg-transparent hover:!no-underline hover:!text-[#b5b5b5] active:!bg-transparent active:!text-[#b5b5b5]' => ($disabled && ($variant === 'tertiary' || $variant === 'plain')),
        ]) }}>
        <span @class(['group-active:translate-y-[0.0625rem]' => !$disabled])>{{ $slot }}</span>
    </button>
@endif
