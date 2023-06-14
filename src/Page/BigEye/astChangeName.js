const parser = require('@babel/parser');
const traverse = require('@babel/traverse');
const generator = require('@babel/generator');

// 源代码
const code = `
const hello = () => {};
`;

// 1. 源代码解析成 ast
const ast = parser.parse(code);

traverse.default(ast, {
  // traverse 会遍历树节点，只要节点的 type 在 visitor 对象中出现，变化调用该方法
  Identifier(path) {
    const { node } = path; //从path中解析出当前 AST 节点
    console.log(path);
    if (node.name === 'hello') {
      node.name = 'world'; //找到hello的节点，替换成world
    }
  },
});

// 3. 生成
const result = generator.default(ast, {}, code);

console.log(result.code); //const world = () => {};
