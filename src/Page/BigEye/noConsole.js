const core = require('@babel/core'); //babel核心模块

const sourceCode = `
const a = 1;
console.log(a);
const b = 2;
`;

const eslintPlugin = {
  //遍历前
  pre(file) {
    file.set('errors', []);
  },
  visitor: {
    CallExpression(path, state) {
      const errors = state.file.get('errors');
      const { node } = path;
      if (node.callee.object && node.callee.object.name === 'console') {
        errors.push(
          path.buildCodeFrameError(`代码中不能出现console语句`, Error), //抛出一个语法错误
        );
      }
    },
  },
  //遍历后
  post(file) {
    console.log(...file.get('errors'));
  },
};

const targetSource = core.transform(sourceCode, {
  plugins: [eslintPlugin], //使用插件
});

console.log(targetSource.code);
