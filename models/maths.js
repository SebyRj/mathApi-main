import Model from './model.js';

export default class Maths extends Model {
    constructor() {
        super();

        this.addField('x', 'integer');
        this.addField('y', 'integer');
        this.addField('n', 'integer');
        this.addField('op', 'string');

        this.setKey("op");
    }
}