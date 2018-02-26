const fs = require('fs');
const falafel = require('falafel');

var remove = function(src, callback) {
    var output = falafel(src, function(node) {
        if (node.type == "ExpressionStatement" && node.expression.type === 'CallExpression' && node.expression.callee.type == "MemberExpression" && node.expression.callee.object.name == "console") {
            if (src.substr(node.end + 1, 12).indexOf("//include") < 0) {
                console.log("removing", node, node.source());
                node.update('');
            } else {
                console.log("excluding", node, node.source());
            }
        }
    });
    callback(null, output);
}

module.exports = {
    removeFromPath: (path, callback) {
        fs.readFile(path, (err, data) => {
            if (err) {
                console.error("node-remove-log: file not found", err);
                callback(err);
            } else {
                var src = data.toString();
                remove(src, callback);
            }
        });
    },
    removeFromString: (src, callback) {
        remove(src, callback);
    }
}