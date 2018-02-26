const fs = require('fs');
const falafel = require('falafel');

var remove = function(src, callback) {
    try {
        var output = falafel(src, function(node) {
            if (node.type == "ExpressionStatement" && node.expression.type === 'CallExpression' && node.expression.callee.type == "MemberExpression" && node.expression.callee.object.name == "console") {
                if (src.substr(node.end, 12).indexOf("//include") < 0) {
                    node.update('');
                }
            }
        });
        callback(null, output);
    } catch (err) {
        console.error("remove-log: error while walking code", err);
        callback(err);
    }
}

module.exports = {
    removeFromPath: (path, callback) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                console.error("remove-log: file not found", err);
                callback(err);
            } else {
                var src = data.toString();
                remove(src, callback);
            }
        });
    },
    removeFromString: (src, callback) => {
        remove(src, callback);
    }
}