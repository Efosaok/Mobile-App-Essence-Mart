module.exports = {
  "env": {
    "es2021": true,
    "node": true,
    "react-native/react-native": true
  },
  "extends": [
    "plugin:react/recommended",
    "airbnb",
    "airbnb/hooks",
    "prettier",
    "prettier/react"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "react-native"
  ],
  "rules": {
    // allow .js files to contain JSX code
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/jsx-props-no-spreading": "off",
    "react/prop-types": "off",
    // prevent eslint to complain about the "styles" variable being used before it was defined
    "no-use-before-define": ["error", { "variables": false }],
    "consistent-return": "off"
    // ignore errors for the react-navigation package
    // "react/prop-types": ["error", {"ignore": ["navigation", "navigation.navigate"]}]
  }
}
