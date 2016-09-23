class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    get m() {
        return 3;
    }
}

class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y);
        this.color = color; // ReferenceError
        this.color = color; // 正确
    }
    static thisstatic() {
        return 3454352;
    }
    get m() {
        return 2;
    }
    set m(v) {
        throw new Error('该属性只读');
    }
}

console.log(new ColorPoint(1, 2, 3).m);
console.log(ColorPoint.thisstatic());