# Introduction

Front end boilerplate and workflow for frontend development

## Features

* Automagically load grunt task - Just In Time (jit-grunt)
* CSS vendor prefixing with grunt-postcss
* Build-in preview server with LiveReload
* Automagically compile SCSS
* Automagically lint your scripts
* Automagically bundle css and js files
* SVG optimization
* Image optimization (via OptiPNG, pngquant, jpegtran)
* HTML partials with grunt-include-replace
* Static asset revisioning through file content hash with grunt-filerev



## Requirement

- [Nodejs](https://nodejs.org/en/download/)
- [Ruby](https://www.ruby-lang.org/en/documentation/installation/)
- [Gruntjs](http://gruntjs.com/)
  ```bash
  $ npm install -g grunt-cli
  ```
- [Bower](http://bower.io)
  ```bash
  $ npm install -g bower
  ```
- [Sass](http://sass-lang.com/install)
  ```bash
  $ gem install sass
  ```
- [Compass](http://compass-style.org/install/)
  ```bash
  $ gem update --system
  $ gem install compass
  ```
    
- [Git](https://git-scm.com/)

## Install


```bash
$ git clone https://github.com/khahantk/modern-frontend-starter
```



## Dependences

Install nodejs development module dependency

```bash
$ npm install
```

Install front end package

```bash
$ bower install
```

## Directory structures
```bash
.
├── app
│   ├── assets
│   │   ├── data
│   │   │   └── data.json
│   │   ├── images
│   │   │   ├── bagan.jpg
│   │   │   ├── coffee.jpg
│   │   │   ├── dog.jpg
│   │   │   └── green-tomato.jpg
│   │   ├── scripts
│   │   │   └── main.js
│   │   └── styles
│   │       └── main.scss
│   ├── partials
│   │   ├── footer
│   │   │   ├── script.js
│   │   │   ├── style.scss
│   │   │   └── view.html
│   │   ├── header
│   │   │   ├── script.js
│   │   │   ├── style.scss
│   │   │   └── view.html
│   │   ├── head.html
│   │   └── script.html
│   ├── templates
│   │   ├── about
│   │   │   ├── style.scss
│   │   │   └── view.html
│   │   ├── contact
│   │   │   ├── script.js
│   │   │   ├── style.scss
│   │   │   └── view.html
│   │   └── home
│   │       ├── style.scss
│   │       └── view.html
│   ├── about.html
│   ├── contact.html
│   └── index.html
├── Gruntfile.js
├── README.md
├── bower.json
└── package.json

```

## Run (Development)

```bash
$ grunt
```
or
```bash
$ grunt serve
```

### addtional grunt command

Inject bower package to head.html and script.html
Run command below after install an bower package (bower install jquery --save)
```bash
$ grunt bowerInstall
```

Clear .tmp and dist

```bash
$ grunt clear //clear .tmp and dist directory
$ grunt clean:server //clear .tmp, .sass-cache directory
$ grunt clean:dist //clear dist directory
```
## JSHint

Runs jslint on the javascript source.
```bash
$ grunt lint
```

## Build

```bash
$ grunt build
```

### Build and preview 
```bash
$ grunt serve:dist
```

```bash
$ grunt serve:preview // preview dist only
```
