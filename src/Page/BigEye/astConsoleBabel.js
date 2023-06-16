const core = require('@babel/core'); //babel核心模块
const types = require('@babel/types'); //用来生成或者判断节点的AST语法树的节点

const sourceCode = `
console.log("日志")
`;

const logPlugin = {
  visitor: {
    CallExpression(path, state) {
      const { node } = path;
      if (types.isMemberExpression(node.callee)) {
        if (node.callee.object.name === 'console') {
          //找到console
          if (['log', 'info', 'warn', 'error'].includes(node.callee.property.name)) {
            //找到文件名
            const filename = state.file.opts.filename;
            node.arguments.push(types.stringLiteral(filename)); //向右边添加我们的行和列信息
          }
        }
      }
    },
  },
};

const targetSource = core.transform(sourceCode, {
  plugins: [logPlugin], //使用插件
  filename: 'hello.js',
});

console.log(targetSource.code);
