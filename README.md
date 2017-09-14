# Gulpress
Simple Gulp environment for Wordpress!

## Features
- Scss
- Autoprefixer
- BrowserSync
- Bower dependencies installation

## Get started
Clone this repo on your machine and drag it inside your custom wordpress theme. Run inside of it:

	npm install

or if you prefer Yarn

	yarn install

## Installing a package
To install a dependency in Gulpress just run

	bower install <package-name> --save

or

	yarn add <package-name>

then you need to run

	gulp inject

and launch the webserver with

	gulp serve

you will now have your dependencies in vendor.js and/or vendor.css

## Build for production
When done with coding remember not to upload this folder on your FTP

