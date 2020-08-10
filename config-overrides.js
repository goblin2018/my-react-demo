const { override, fixBabelImports, addLessLoader } = require('customize-cra')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true, // true 代表引入less
  }),

  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#d214a2',
      '@font-size-base': '12px',
    },
  })
)
