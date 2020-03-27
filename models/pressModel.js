class pressModel {
    constructor(press) {
        this.id = press.id;
        this.name = press.name;
        this.img = press.img;
    }
}

module.exports = press => new pressModel(press);