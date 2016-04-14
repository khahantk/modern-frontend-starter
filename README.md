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
- Gruntjs
  ```bash
  $ npm install -g grunt-cli
  ```
- Bower
  ```bash
  $ npm install -g bower
  ```
- Sass
  ```bash
  $ gem install sass
  ```
- Compass
  ```bash
  $ gem update --system
  $ gem install compass
  ```
    
- Git or Yeoman
+ [Git](https://git-scm.com/)
+ Yeoman:
  ```bash
  $ npm install -g yo
  ```

## Install

### cloning from repository

```bash
$ git clone //git url
```

### yeoman generator

```bash
$ yo mdfront //Coming soon

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
