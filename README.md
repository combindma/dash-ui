# UI components library for Laravel Blade, crafted with TailwindCSS and Javascript for simplicity and elegance.

[![Latest Version on Packagist](https://img.shields.io/packagist/v/combindma/dash-ui.svg?style=flat-square)](https://packagist.org/packages/combindma/dash-ui)
[![GitHub Tests Action Status](https://img.shields.io/github/actions/workflow/status/combindma/dash-ui/run-tests.yml?branch=main&label=tests&style=flat-square)](https://github.com/combindma/dash-ui/actions?query=workflow%3Arun-tests+branch%3Amain)
[![GitHub Code Style Action Status](https://img.shields.io/github/actions/workflow/status/combindma/dash-ui/fix-php-code-style-issues.yml?branch=main&label=code%20style&style=flat-square)](https://github.com/combindma/dash-ui/actions?query=workflow%3A"Fix+PHP+code+style+issues"+branch%3Amain)
[![Total Downloads](https://img.shields.io/packagist/dt/combindma/dash-ui.svg?style=flat-square)](https://packagist.org/packages/combindma/dash-ui)


If you ever dreamed of having a Shopify admin, DashUI offers a suite of UI components, all inspired by [Shopify Polaris](https://polaris.shopify.com/components), exclusively crafted with TailwindCSS, Laravel Blade and Javascript. These components are designed for effortless integration and offer various customization options.

## About Combind Agency

[Combine Agency](https://combind.ma?utm_source=github&utm_medium=banner&utm_campaign=package_name) is a leading web development agency specializing in building innovative and high-performance web applications using modern technologies. Our experienced team of developers, designers, and project managers is dedicated to providing top-notch services tailored to the unique needs of our clients.

If you need assistance with your next project or would like to discuss a custom solution, please feel free to [contact us](mailto:hello@combind.ma) or visit our [website](https://combind.ma?utm_source=github&utm_medium=banner&utm_campaign=package_name) for more information about our services. Let's build something amazing together!

## Demo


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
        fontSize: {
            xs: '0.75rem',
            sm: '0.8125rem',
            base: '0.875rem',
            lg: '1.25rem',
            xl: '1.5rem',
            '2xl': '1.875rem',
            '3xl': '2.25rem',
            '4xl': '3.052rem',
        },
        extend: {
            colors: {
                primary: colors.stone,
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

#### 3. Add the Tailwind directives and import the library to your CSS file
Import the css files and add the @tailwind directives for each of Tailwind’s layers to your ./resources/css/tailwind.css file.
```css
@import '../../node_modules/system-font-css/system-font.css';
@import '../../vender/combindma/dash-ui/resources/css/dash-ui.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### 4. Import javascript components to your js file
Import the js file to your ./resources/js/app.js file.
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
</head>
<body class="antialiased">


<script src="https://unpkg.com/codyhouse-framework/main/assets/js/util.js"></script>
@vite(['resources/js/app.js'])
</body>
</html>
```

## Usage
See the full [documentation](https://combind.notion.site/Dash-UI-288a0eaa11854c69acae5da7842ee788?pvs=4) for all components and how to use them. 

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

## Credits

- [Combind](https://github.com/Combind)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
