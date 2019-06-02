/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/images/s1.png":
/*!***************************!*\
  !*** ./src/images/s1.png ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/s1.png";

/***/ }),

/***/ "./src/images/s2.png":
/*!***************************!*\
  !*** ./src/images/s2.png ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/s2.png";

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style/main.scss */ "./src/style/main.scss");
/* harmony import */ var _style_main_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_main_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _images_s1_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./images/s1.png */ "./src/images/s1.png");
/* harmony import */ var _images_s1_png__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_images_s1_png__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _images_s2_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./images/s2.png */ "./src/images/s2.png");
/* harmony import */ var _images_s2_png__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_images_s2_png__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _js_main_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/main.js */ "./src/js/main.js");

// STYLE


// image



// JavaScript

Object(_js_main_js__WEBPACK_IMPORTED_MODULE_3__["default"])();


/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ "./src/js/model.js");
/* harmony import */ var _views__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./views */ "./src/js/views.js");


/* harmony default export */ __webpack_exports__["default"] = (function () {
  var game = new _model__WEBPACK_IMPORTED_MODULE_0__["Game"](document.getElementById('MMO'));
  game.setSize();
  game.eventResize();
  var views = new _views__WEBPACK_IMPORTED_MODULE_1__["MainView"](game.ctx);
  views.mainScene();
  views.chatBox();
  document.addEventListener('keypress', function (e) {
    var target = e.target;

    if (e.which == 13 && target.classList[0] === 'chatBox__input') {
      var chatList = document.querySelector('.chatBox__window');
      var message = document.createElement('p');
      message.classList.add('message');
      message.innerHTML = target.value;
      chatList.appendChild(message);
      chatList.scrollTop = chatList.scrollHeight;
      target.value = '';
    }
  }, false);
});

/***/ }),

/***/ "./src/js/model.js":
/*!*************************!*\
  !*** ./src/js/model.js ***!
  \*************************/
/*! exports provided: Game */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Game", function() { return Game; });
/* harmony import */ var _modules_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/config */ "./src/js/modules/config.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Game =
/*#__PURE__*/
function () {
  function Game(ctx) {
    _classCallCheck(this, Game);

    this.ctx = ctx;
  }

  _createClass(Game, [{
    key: "setSize",
    value: function setSize() {
      this.ctx.setAttribute('width', Object(_modules_config__WEBPACK_IMPORTED_MODULE_0__["default"])().width);
      this.ctx.setAttribute('height', Object(_modules_config__WEBPACK_IMPORTED_MODULE_0__["default"])().height);
    }
  }, {
    key: "eventResize",
    value: function eventResize() {
      var _this = this;

      var ctx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.ctx;
      window.addEventListener('resize', function (e) {
        _this.ctx.setAttribute('width', Object(_modules_config__WEBPACK_IMPORTED_MODULE_0__["default"])().width);

        _this.ctx.setAttribute('height', Object(_modules_config__WEBPACK_IMPORTED_MODULE_0__["default"])().height);

        _this.ctx.setAttribute('data-sad', 'asdas');

        console.log(_this.ctx);
      }, false);
    }
  }]);

  return Game;
}();



/***/ }),

/***/ "./src/js/modules/config.js":
/*!**********************************!*\
  !*** ./src/js/modules/config.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return config; });
function config() {
  var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : screen.width;
  var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : screen.height;
  return {
    name: 'MMO',
    width: width,
    height: height,
    version: '0.0.1'
  };
}

/***/ }),

/***/ "./src/js/views.js":
/*!*************************!*\
  !*** ./src/js/views.js ***!
  \*************************/
/*! exports provided: MainView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainView", function() { return MainView; });
/* harmony import */ var _modules_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/config */ "./src/js/modules/config.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var MainView =
/*#__PURE__*/
function () {
  function MainView(ctx) {
    _classCallCheck(this, MainView);

    this.ctx = ctx;
  }

  _createClass(MainView, [{
    key: "mainScene",
    value: function mainScene() {
      var canvas = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.ctx;
      var img = new Image();
      img.src = '../images/s1.png';
      console.log(img);
      var ctx = canvas.getContext('2d');
      ctx.fillStyle = 'black';

      img.onload = function () {
        var x = -50;
        var y = 0;
        var width = Object(_modules_config__WEBPACK_IMPORTED_MODULE_0__["default"])().width;
        var height = Object(_modules_config__WEBPACK_IMPORTED_MODULE_0__["default"])().height;
        var countY = Math.floor(height / 192);
        var countX = Math.floor(width / 192);

        for (var j = 0; j < countY; j++) {
          for (var i = 0; i < countX + 3; i++) {
            ctx.drawImage(img, -5, 195, 192, 192, x, y, 192, 192);
            x += 182;
          }

          x = -50;
          y += 192;
        }
      }; // ctx.fillRect(0,0, canvas.width,canvas.height);

    }
  }, {
    key: "chatBox",
    value: function chatBox() {
      var gameBox = document.querySelector('.game');
      var width = Object(_modules_config__WEBPACK_IMPORTED_MODULE_0__["default"])().width;
      var height = Object(_modules_config__WEBPACK_IMPORTED_MODULE_0__["default"])().height;
      var chat = document.createElement('div');
      chat.classList.toggle('chatBox');
      var chatWindow = document.createElement('div');
      chatWindow.classList.toggle('chatBox__window');
      var input = document.createElement('input');
      input.classList.toggle('chatBox__input');
      input.setAttribute('type', 'text');
      chat.appendChild(chatWindow);
      chat.appendChild(input);
      gameBox.appendChild(chat);
    }
  }]);

  return MainView;
}();



/***/ }),

/***/ "./src/style/main.scss":
/*!*****************************!*\
  !*** ./src/style/main.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/index.js */"./src/index.js");


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map