const path = require('path');
const  fs = require('fs');

class UserData {
    constructor() {
        
    this.data = JSON.parse(
        fs.readFileSync(
            path.resolve(__dirname,'database.js')))
    }

    save() {
        fs.writeFileSync(
            path.resolve(__dirname,'database.js'), 
                JSON.stringify(this.data))
    }
}

exports = { 
    userData: new UserData()
}