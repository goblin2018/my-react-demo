const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
} = require('customize-cra')

const path = require('path')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true, // true 代表引入less
  }),

  addWebpackAlias({
    '@': path.join(__dirname, 'src'),
  }),

  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#d214a2',
      '@font-size-base': '12px',
    },
  })
)
