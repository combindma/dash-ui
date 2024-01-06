# A streamlined and stylish UI component library for Laravel Blade, crafted with TailwindCSS, Javascript and AlpineJs for simplicity and elegance.

[![Latest Version on Packagist](https://img.shields.io/packagist/v/combindma/dash-ui.svg?style=flat-square)](https://packagist.org/packages/combindma/dash-ui)
[![GitHub Tests Action Status](https://img.shields.io/github/actions/workflow/status/combindma/dash-ui/run-tests.yml?branch=main&label=tests&style=flat-square)](https://github.com/combindma/dash-ui/actions?query=workflow%3Arun-tests+branch%3Amain)
[![GitHub Code Style Action Status](https://img.shields.io/github/actions/workflow/status/combindma/dash-ui/fix-php-code-style-issues.yml?branch=main&label=code%20style&style=flat-square)](https://github.com/combindma/dash-ui/actions?query=workflow%3A"Fix+PHP+code+style+issues"+branch%3Amain)
[![Total Downloads](https://img.shields.io/packagist/dt/combindma/dash-ui.svg?style=flat-square)](https://packagist.org/packages/combindma/dash-ui)


DashUI offers a suite of UI components, drawing inspiration from Shopify Polaris, exclusively crafted with TailwindCSS, Laravel Blade templates, Javascript and AlpineJS. These components are designed for effortless integration and offer various customization options.

## About Combind Agency

[Combine Agency](https://combind.ma?utm_source=github&utm_medium=banner&utm_campaign=package_name) is a leading web development agency specializing in building innovative and high-performance web applications using modern technologies. Our experienced team of developers, designers, and project managers is dedicated to providing top-notch services tailored to the unique needs of our clients.

If you need assistance with your next project or would like to discuss a custom solution, please feel free to [contact us](mailto:hello@combind.ma) or visit our [website](https://combind.ma?utm_source=github&utm_medium=banner&utm_campaign=package_name) for more information about our services. Let's build something amazing together!


## Installation

You can install the package and its dependencies via composer:

```bash
composer require combindma/dash-ui
composer require codeat3/blade-google-material-design-icons
```

This package use [Blade Google Material Design Icons](https://github.com/codeat3/blade-google-material-design-icons), so we recommend you to enable icon caching with this library using this command:
```bash
php artisan icons:cache
```

Optionally, you can publish the views using

```bash
php artisan vendor:publish --tag="dash-ui-views"
```

## Setup

#### 1. Install Tailwind CSS
Install tailwindcss and its peer dependencies via npm, and then run the init command to generate both tailwind.config.js and postcss.config.js.
```bash
npm install -D tailwindcss postcss postcss-import autoprefixer @tailwindcss/aspect-ratio @tailwindcss/forms @tailwindcss/typography system-font-css
npx tailwindcss init -p
```

#### 2. Configure your template paths
Add the paths to all of your template files in your tailwind.config.js file.

TIP: You can specify your primary color by editing primary: colors.stone,
```javascript
const colors = require('tailwindcss/colors')

export default {
    content: [
        //...
        './vendor/combindma/dash-ui/resources/views/**/*.blade.php',
    ],
    darkMode: 'class',
    theme: {
        fontFamily: {
            sans: ['Inter', 'system-ui'],
        },
        extend: {
            colors: {
                primary: colors.stone,
            },
            boxShadow: {
                '100': '0px 1px 0px 0px rgba(26, 26, 26, 0.07)',
                '200': '0px 3px 1px -1px rgba(26, 26, 26, 0.07)',
                '300': '0px 4px 6px -2px rgba(26, 26, 26, 0.20)',
                '400': '0px 8px 16px -4px rgba(26, 26, 26, 0.22)',
                '500': '0px 12px 20px -8px rgba(26, 26, 26, 0.24)',
                '600': '0px 20px 20px -8px rgba(26, 26, 26, 0.28)',
                'bevel-100': '1px 0px 0px 0px rgba(0, 0, 0, 0.13) inset, -1px 0px 0px 0px rgba(0, 0, 0, 0.13) inset, 0px -1px 0px 0px rgba(0, 0, 0, 0.17) inset, 0px 1px 0px 0px rgba(204, 204, 204, 0.5) inset',
                'inset-100': '0px 1px 2px 0px rgba(26, 26, 26, 0.15) inset, 0px 1px 1px 0px rgba(26, 26, 26, 0.15) inset',
                'inset-200': '0px 2px 1px 0px rgba(26, 26, 26, 0.20) inset, 1px 0px 1px 0px rgba(26, 26, 26, 0.12) inset, -1px 0px 1px 0px rgba(26, 26, 26, 0.12) inset',
                'button': '0px 1px 0px 0px #E3E3E3 inset, 1px 0px 0px 0px #E3E3E3 inset, -1px 0px 0px 0px #E3E3E3 inset, 0px -1px 0px 0px #B5B5B5 inset',
                'button-hover': '0px 1px 0px 0px #EBEBEB inset, -1px 0px 0px 0px #EBEBEB inset, 1px 0px 0px 0px #EBEBEB inset, 0px -1px 0px 0px #CCC inset',
                'button-inset': '0px 2px 1px 0px rgba(26, 26, 26, 0.20) inset, 1px 0px 1px 0px rgba(26, 26, 26, 0.12) inset, -1px 0px 1px 0px rgba(26, 26, 26, 0.12) inset',
                'button-primary': '0px 2px 0px 0px rgba(255, 255, 255, 0.2) inset, 2px 0px 0px 0px rgba(255, 255, 255, 0.2) inset, -2px 0px 0px 0px rgba(255, 255, 255, 0.2) inset, 0px -1px 0px 1px #000 inset, 0px 1px 0px 0px #000 inset',
                'button-primary-hover': '0px 1px 0px 0px rgba(255, 255, 255, 0.24) inset, 1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, -1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, 0px 0px 0px 0px #000 inset, 0px 0px 0px 0px #1A1A1A',
                'button-primary-inset': '0px 3px 0px 0px #000 inset',
                'button-primary-critical': '0px 1px 0px 0px rgba(255, 255, 255, 0.48) inset, -1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, 1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, 0px -1.5px 0px 0px rgba(0, 0, 0, 0.25) inset',
                'button-primary-critical-hover': '0px 1px 0px 0px rgba(255, 255, 255, 0.48) inset, 1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, -1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, 0px -1.5px 0px 0px rgba(0, 0, 0, 0.25) inset',
                'button-primary-critical-inset': '0px 2px 0px 0px rgba(0, 0, 0, 0.60) inset, 1px 0px 1px 0px rgba(0, 0, 0, 0.20) inset, -1px 0px 1px 0px rgba(0, 0, 0, 0.20) inset',
                'button-primary-success': '0px 1px 0px 0px rgba(255, 255, 255, 0.48) inset, -1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, 1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, 0px -1.5px 0px 0px rgba(0, 0, 0, 0.25) inset',
                'button-primary-success-hover': '0px 1px 0px 0px rgba(255, 255, 255, 0.48) inset, 1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, -1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, 0px -1.5px 0px 0px rgba(0, 0, 0, 0.25) inset',
                'button-primary-success-inset': '0px 2px 0px 0px rgba(0, 0, 0, 0.60) inset, 1px 0px 1px 0px rgba(0, 0, 0, 0.20) inset, -1px 0px 1px 0px rgba(0, 0, 0, 0.20) inset',
                'border-inset': '0px 0px 0px 1px rgba(0, 0, 0, 0.08) inset',
            }
        }
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
        require("@tailwindcss/typography")
    ],
}
```

#### 3. Add the Tailwind directives to your CSS
Add the @tailwind directives for each of Tailwind’s layers to your ./resources/css/tailwind.css file.
```css
@import '../../node_modules/system-font-css/system-font.css';
@import '../../vender/combindma/dash-ui/resources/css/dash-ui.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### 4. Import javascript components to your js file
Add the import directive to your ./resources/js/app.js file.
```javascript
import '../../vendor/combindma/dash-ui/resources/js/dash-ui.js';
```

#### 5. Update vite config file
Add this to your file vite.config.js
```javascript
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/tailwind.css', 'resources/js/app.js'],
            refresh: true,
        }),
    ],
});
```

#### 6. Start your build process
Run your build process with
```bash
npm run build
```

#### 7.Start using Dash UI in your project
Make sure your compiled CSS and Javascript are included in your main layout.
```html
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel</title>
    <link rel="preconnect" href="https://rsms.me/">
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css">
    @vite(['resources/css/tailwind.css'])
    @livewireStyles
</head>
<body class="antialiased">
@livewireScripts
<script src="https://unpkg.com/codyhouse-framework/main/assets/js/util.js"></script>
@vite(['resources/js/app.js'])
</body>
</html>
```

You can replace @livewireStyles with alpine if you are not using Livewire v3 and remove @livewireScripts.
```html
<script src="//unpkg.com/alpinejs" defer></script>
```

## Usage
See the full [documentation](https://combind.notion.site/Dash-UI-288a0eaa11854c69acae5da7842ee788?pvs=4) for all components. 

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

## Credits

- [Combind](https://github.com/Combind)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
