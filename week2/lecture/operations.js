var fs = require('fs');

const configFilePath = './config';

function createOperation(op) {
  return function domainOpeation(domian) {
    fs.readFile(configFilePath, { encoding: 'utf-8' }, function (err, content) {
      if (err) { console.log(err); return; }
      content = op(content, domian);
      fs.writeFile(configFilePath, content, function (err) {
        if (err) { console.log(err); return; }
        console.log('Op Completed!');
      });
    });
  }
}
module.exports = {
  addDomain: createOperation(function (content, domain) {
    return content + domain;
  }),
  removeDomain: createOperation(function (content, domain) {
    return content.replace(domain, '');
  })
};
