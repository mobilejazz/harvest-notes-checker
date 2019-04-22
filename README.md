# Harvest Notes Checker

Browser extension that checks Harvest's details reports for incomplete, short or empty notes

## Intro 

This project is based on [Webextension Toolbox](https://github.com/HaNdTriX/webextension-toolbox), which allows us to
 output browser specific extensions for Chrome, 
Firefox, Opera and Edge.

As an alternative, there is also a build for UserScript, compatible for instance with [TamperMonkey](https://tampermonkey.net/). 


## Development

### Install dependencies

	npm install
	
### Run dev client

It will write the code in the `dev` folder with auto reloading feature

    npm run dev chrome
    npm run dev firefox
    npm run dev opera
    npm run dev edge

### Build

    npm run build chrome
    npm run build firefox
    npm run build opera
    npm run build edge
    
### User script Build

This will write the build under `userscript\build`

    npm run build:userscript    
    
*Note: the userscript build file is kept within the repository to make it's usage easy, therefore
**it should be updated on every new release***
    

### Environment

The build tool also defines a variable named `process.env.NODE_ENV` in your scripts. 

## Publishing Assets

A folder containing the assets to publish the extension on the browser specific extensions directory.

## Currently published versions

* [Chrome Web Store](https://chrome.google.com/webstore/detail/harvest-notes-checker/mnbjebgjcokhngehpmpdemfpkbjjkaof) (unlisted, only accesible with direct link)

 


