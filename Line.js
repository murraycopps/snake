export class Line {
    constructor(target, line,  corner1, corner2, end) {
        this.xStart = line[0][0];
        this.yStart = line[0][1];
        this.xEnd = line[1][0];
        this.yEnd = line[1][1];
        this.corner1 = corner1;
        this.corner2 = corner2;
        this.end = end;

        this.element = this.createElement(line);
        
        this.formatCorners(this.corner1);
        this.formatCorners(this.corner2);
        this.formatEnd(this.end);

        target.appendChild(this.element);
    }
    createElement(line) {
        var element = document.createElement('div');
        element.classList.add("snake-body");
        element.style.width = (line[0][0] == line[1][0] ? "25px" : "calc(100% - 15px)");
        element.style.height = (line[0][1] == line[1][1] ? "25px" : "calc(100% - 15px)");

        if (line[0][0] < line[1][0] || line[0][1] < line[1][1]) {
            element.style.gridColumnStart = (line[0][0] + 1).toString();
            element.style.gridColumnEnd = (line[1][0] + 2).toString();
            element.style.gridRowStart = (line[0][1] + 1).toString();
            element.style.gridRowEnd = (line[1][1] + 2).toString();
        }
        else {
            element.style.gridColumnStart = (line[0][0] + 2).toString();
            element.style.gridColumnEnd = (line[1][0] + 1).toString();
            element.style.gridRowStart = (line[0][1] + 2).toString();
            element.style.gridRowEnd = (line[1][1] + 1).toString();
        }

        return element;
    }
    formatEnd(end) {
        switch (end) {
            case "n":
                this.element.style.borderBottomRightRadius = "50vw";
                this.element.style.borderBottomLeftRadius = "50vw";
                break;
            case "s":
                this.element.style.borderTopRightRadius = "50vw";
                this.element.style.borderTopLeftRadius = "50vw";
                break;
            case "e":
                this.element.style.borderBottomLeftRadius = "50vh";
                this.element.style.borderTopLeftRadius = "50vh";
                break;
            case "w":
                this.element.style.borderBottomRightRadius = "50vh";
                this.element.style.borderTopRightRadius = "50vh";
                break;
        }
    }
    formatCorners(corner) {
        switch (corner) {
            case "nw":
               this.element.style.borderBottomRightRadius = "100vw";
                break;
            case "ne":
                this.element.style.borderBottomLeftRadius = "100vw";
                break;
            case "sw":
                this.element.style.borderTopRightRadius = "100vw";
                break;
            case "se":
                this.element.style.borderTopLeftRadius = "100vw";
                break;
            case "en":
                this.element.style.borderBottomLeftRadius = "100vh";
                break;
            case "es":
                this.element.style.borderTopLeftRadius = "100vh";
                break;
            case "wn":
                this.element.style.borderBottomRightRadius = "100vh";
                break;
            case "ws":
                this.element.style.borderTopRightRadius = "100vh";
                break;
        }
    }
    
}