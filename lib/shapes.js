class Shapes {
    setLogoColor(bgColor) {
        this.bgColor = bgColor;
    }

    renderLogoText(text, fontColor) {
        return `<text x="150" y="115" font-size="40" text-anchor="middle" fill="${fontColor}">${text.toUpperCase()}</text>`;
    }  
}

// the different shapes extend 'Shapes' class to set color and text
class Circle extends Shapes {
    renderLogoColor() {
        return `<circle cx="150" cy="100" r="80" fill="${this.bgColor}" />`;
    }
 
}


class Square extends Shapes {
    renderLogoColor() {
        return `<rect x="75" y="25" width="150" height="150" fill="${this.bgColor}" />`;
    }

}


class Triangle extends Shapes {
    renderLogoColor() {
        return `<polygon points="150,20 55,160 245,160" fill="${this.bgColor}" />`;
    }
 
}


module.exports = { Circle, Square, Triangle};