const fs = require('fs-extra');

module.exports = async (data) => {
    const path = './database/users.json';

    let oldData = [];

    if (fs.existsSync(path)) {
        oldData = JSON.parse(fs.readFileSync(path));
    }

    oldData.push(data);

    fs.writeFileSync(path, JSON.stringify(oldData, null, 2));
};
