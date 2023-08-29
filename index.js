const inquirer = require('inquirer');
const fs = require('fs');
const { Circle, Square, Triangle } = require('./lib/shapes');

// start of inquirer
inquirer.prompt([
    // inquiry for logo text
    {
        name: 'Logo Text',
        message: 'Please input the text you would like on your logo.',
        type: 'input',
        filter: function(input) {
            return input.trim().toUpperCase();
        },
        validate: function(input) {
            if (input.length === 0 || input.length > 3) {
                return 'Logo text must be at least one character and no more than three characters.';
            } else {
                return true;
            }
        },
    },

    // inquiry for font color
    {
        name: 'Logo Font Color',
        message: 'What color would you like the text?',
        type: 'input',
        filter: function(input) {
            return input.trim().toLowerCase();
        },
        validate: validateColor,
    },

    // inquiry for what shape the logo will be
    {
        name: 'Logo Shape',
        message: 'Please select a shape for your logo',
        type: 'list',
        choices: [
            {
                name: 'Circle',
                value: new Circle(),
            },
            {
                name: 'Square',
                value: new Square(),
            },
            {
                name: 'Triangle',
                value: new Triangle(),
            }
        ]
    },

    {
        name: 'logoBgColor',
        message: 'Please enter a color name or hexdecimal code for your logo background',
        type: 'input',
        filter: function(input) {
            return input.trim().toLowerCase();
        },
        validate: validateColor,
    },
]).then(answer => {
    console.log(answer);
    
    svgMaker(answer);
})

// dunction to produce .svg
function svgMaker( { logoText, logoFontColor, logoShape, logoBgColor } ) {
    logoShape.setLogoColor(logoBgColor);
    const svg = `
        <svg version="1.1"
            width="300" height="200"
            xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="transparent" />

            ${logoShape.renderLogoColor()}

            ${logoShape.renderLogoText(logoText, logoFontColor)}
        </svg>`;

    writeToFile('logo.svg', svg);
}


function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (error) => {
        if (error) {
            console.error(error);
            return;
        } else {
            console.log('Success!');
        }
    })
}

function validateColor(nameOrHex) {

    // checks if input is color name or hexdec
    const hexColorRegex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

    if (hexColorRegex.test(nameOrHex)) {
      return true;
    } else if (isCssColorName(nameOrHex)) {
      return true;
    } else {
      console.log(` is not a valid SVG color name or hexadecimal code.`);
      return false;
    }
}