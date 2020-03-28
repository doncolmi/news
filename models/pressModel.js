class pressModel {
    constructor(press) {
        this.id = press.id;
        this.name = press.name;
    }
}

module.exports = press => new pressModel(press);