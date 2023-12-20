"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from2, except, desc) => {
    if (from2 && typeof from2 === "object" || typeof from2 === "function") {
      for (let key of __getOwnPropNames(from2))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc(from2, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/react/cjs/react.development.js
  var require_react_development = __commonJS({
    "node_modules/react/cjs/react.development.js"(exports, module) {
      "use strict";
      if (true) {
        (function() {
          "use strict";
          if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
          }
          var ReactVersion = "18.2.0";
          var REACT_ELEMENT_TYPE = Symbol.for("react.element");
          var REACT_PORTAL_TYPE = Symbol.for("react.portal");
          var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
          var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
          var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
          var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
          var REACT_CONTEXT_TYPE = Symbol.for("react.context");
          var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
          var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
          var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
          var REACT_MEMO_TYPE = Symbol.for("react.memo");
          var REACT_LAZY_TYPE = Symbol.for("react.lazy");
          var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
          var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
          var FAUX_ITERATOR_SYMBOL = "@@iterator";
          function getIteratorFn(maybeIterable) {
            if (maybeIterable === null || typeof maybeIterable !== "object") {
              return null;
            }
            var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
            if (typeof maybeIterator === "function") {
              return maybeIterator;
            }
            return null;
          }
          var ReactCurrentDispatcher = {
            /**
             * @internal
             * @type {ReactComponent}
             */
            current: null
          };
          var ReactCurrentBatchConfig = {
            transition: null
          };
          var ReactCurrentActQueue = {
            current: null,
            // Used to reproduce behavior of `batchedUpdates` in legacy mode.
            isBatchingLegacy: false,
            didScheduleLegacyUpdate: false
          };
          var ReactCurrentOwner = {
            /**
             * @internal
             * @type {ReactComponent}
             */
            current: null
          };
          var ReactDebugCurrentFrame = {};
          var currentExtraStackFrame = null;
          function setExtraStackFrame(stack) {
            {
              currentExtraStackFrame = stack;
            }
          }
          {
            ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
              {
                currentExtraStackFrame = stack;
              }
            };
            ReactDebugCurrentFrame.getCurrentStack = null;
            ReactDebugCurrentFrame.getStackAddendum = function() {
              var stack = "";
              if (currentExtraStackFrame) {
                stack += currentExtraStackFrame;
              }
              var impl = ReactDebugCurrentFrame.getCurrentStack;
              if (impl) {
                stack += impl() || "";
              }
              return stack;
            };
          }
          var enableScopeAPI = false;
          var enableCacheElement = false;
          var enableTransitionTracing = false;
          var enableLegacyHidden = false;
          var enableDebugTracing = false;
          var ReactSharedInternals = {
            ReactCurrentDispatcher,
            ReactCurrentBatchConfig,
            ReactCurrentOwner
          };
          {
            ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
            ReactSharedInternals.ReactCurrentActQueue = ReactCurrentActQueue;
          }
          function warn(format) {
            {
              {
                for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                  args[_key - 1] = arguments[_key];
                }
                printWarning("warn", format, args);
              }
            }
          }
          function error(format) {
            {
              {
                for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                  args[_key2 - 1] = arguments[_key2];
                }
                printWarning("error", format, args);
              }
            }
          }
          function printWarning(level, format, args) {
            {
              var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
              var stack = ReactDebugCurrentFrame2.getStackAddendum();
              if (stack !== "") {
                format += "%s";
                args = args.concat([stack]);
              }
              var argsWithFormat = args.map(function(item) {
                return String(item);
              });
              argsWithFormat.unshift("Warning: " + format);
              Function.prototype.apply.call(console[level], console, argsWithFormat);
            }
          }
          var didWarnStateUpdateForUnmountedComponent = {};
          function warnNoop(publicInstance, callerName) {
            {
              var _constructor = publicInstance.constructor;
              var componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass";
              var warningKey = componentName + "." + callerName;
              if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
                return;
              }
              error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName);
              didWarnStateUpdateForUnmountedComponent[warningKey] = true;
            }
          }
          var ReactNoopUpdateQueue = {
            /**
             * Checks whether or not this composite component is mounted.
             * @param {ReactClass} publicInstance The instance we want to test.
             * @return {boolean} True if mounted, false otherwise.
             * @protected
             * @final
             */
            isMounted: function(publicInstance) {
              return false;
            },
            /**
             * Forces an update. This should only be invoked when it is known with
             * certainty that we are **not** in a DOM transaction.
             *
             * You may want to call this when you know that some deeper aspect of the
             * component's state has changed but `setState` was not called.
             *
             * This will not invoke `shouldComponentUpdate`, but it will invoke
             * `componentWillUpdate` and `componentDidUpdate`.
             *
             * @param {ReactClass} publicInstance The instance that should rerender.
             * @param {?function} callback Called after component is updated.
             * @param {?string} callerName name of the calling function in the public API.
             * @internal
             */
            enqueueForceUpdate: function(publicInstance, callback, callerName) {
              warnNoop(publicInstance, "forceUpdate");
            },
            /**
             * Replaces all of the state. Always use this or `setState` to mutate state.
             * You should treat `this.state` as immutable.
             *
             * There is no guarantee that `this.state` will be immediately updated, so
             * accessing `this.state` after calling this method may return the old value.
             *
             * @param {ReactClass} publicInstance The instance that should rerender.
             * @param {object} completeState Next state.
             * @param {?function} callback Called after component is updated.
             * @param {?string} callerName name of the calling function in the public API.
             * @internal
             */
            enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
              warnNoop(publicInstance, "replaceState");
            },
            /**
             * Sets a subset of the state. This only exists because _pendingState is
             * internal. This provides a merging strategy that is not available to deep
             * properties which is confusing. TODO: Expose pendingState or don't use it
             * during the merge.
             *
             * @param {ReactClass} publicInstance The instance that should rerender.
             * @param {object} partialState Next partial state to be merged with state.
             * @param {?function} callback Called after component is updated.
             * @param {?string} Name of the calling function in the public API.
             * @internal
             */
            enqueueSetState: function(publicInstance, partialState, callback, callerName) {
              warnNoop(publicInstance, "setState");
            }
          };
          var assign2 = Object.assign;
          var emptyObject = {};
          {
            Object.freeze(emptyObject);
          }
          function Component(props, context, updater) {
            this.props = props;
            this.context = context;
            this.refs = emptyObject;
            this.updater = updater || ReactNoopUpdateQueue;
          }
          Component.prototype.isReactComponent = {};
          Component.prototype.setState = function(partialState, callback) {
            if (typeof partialState !== "object" && typeof partialState !== "function" && partialState != null) {
              throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
            }
            this.updater.enqueueSetState(this, partialState, callback, "setState");
          };
          Component.prototype.forceUpdate = function(callback) {
            this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
          };
          {
            var deprecatedAPIs = {
              isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
              replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
            };
            var defineDeprecationWarning = function(methodName, info) {
              Object.defineProperty(Component.prototype, methodName, {
                get: function() {
                  warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
                  return void 0;
                }
              });
            };
            for (var fnName in deprecatedAPIs) {
              if (deprecatedAPIs.hasOwnProperty(fnName)) {
                defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
              }
            }
          }
          function ComponentDummy() {
          }
          ComponentDummy.prototype = Component.prototype;
          function PureComponent2(props, context, updater) {
            this.props = props;
            this.context = context;
            this.refs = emptyObject;
            this.updater = updater || ReactNoopUpdateQueue;
          }
          var pureComponentPrototype = PureComponent2.prototype = new ComponentDummy();
          pureComponentPrototype.constructor = PureComponent2;
          assign2(pureComponentPrototype, Component.prototype);
          pureComponentPrototype.isPureReactComponent = true;
          function createRef() {
            var refObject = {
              current: null
            };
            {
              Object.seal(refObject);
            }
            return refObject;
          }
          var isArrayImpl = Array.isArray;
          function isArray2(a2) {
            return isArrayImpl(a2);
          }
          function typeName(value) {
            {
              var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
              var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
              return type;
            }
          }
          function willCoercionThrow(value) {
            {
              try {
                testStringCoercion(value);
                return false;
              } catch (e) {
                return true;
              }
            }
          }
          function testStringCoercion(value) {
            return "" + value;
          }
          function checkKeyStringCoercion(value) {
            {
              if (willCoercionThrow(value)) {
                error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
                return testStringCoercion(value);
              }
            }
          }
          function getWrappedName(outerType, innerType, wrapperName) {
            var displayName = outerType.displayName;
            if (displayName) {
              return displayName;
            }
            var functionName = innerType.displayName || innerType.name || "";
            return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
          }
          function getContextName(type) {
            return type.displayName || "Context";
          }
          function getComponentNameFromType(type) {
            if (type == null) {
              return null;
            }
            {
              if (typeof type.tag === "number") {
                error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
              }
            }
            if (typeof type === "function") {
              return type.displayName || type.name || null;
            }
            if (typeof type === "string") {
              return type;
            }
            switch (type) {
              case REACT_FRAGMENT_TYPE:
                return "Fragment";
              case REACT_PORTAL_TYPE:
                return "Portal";
              case REACT_PROFILER_TYPE:
                return "Profiler";
              case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
              case REACT_SUSPENSE_TYPE:
                return "Suspense";
              case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_CONTEXT_TYPE:
                  var context = type;
                  return getContextName(context) + ".Consumer";
                case REACT_PROVIDER_TYPE:
                  var provider = type;
                  return getContextName(provider._context) + ".Provider";
                case REACT_FORWARD_REF_TYPE:
                  return getWrappedName(type, type.render, "ForwardRef");
                case REACT_MEMO_TYPE:
                  var outerName = type.displayName || null;
                  if (outerName !== null) {
                    return outerName;
                  }
                  return getComponentNameFromType(type.type) || "Memo";
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return getComponentNameFromType(init(payload));
                  } catch (x2) {
                    return null;
                  }
                }
              }
            }
            return null;
          }
          var hasOwnProperty2 = Object.prototype.hasOwnProperty;
          var RESERVED_PROPS = {
            key: true,
            ref: true,
            __self: true,
            __source: true
          };
          var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
          {
            didWarnAboutStringRefs = {};
          }
          function hasValidRef(config) {
            {
              if (hasOwnProperty2.call(config, "ref")) {
                var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
                if (getter && getter.isReactWarning) {
                  return false;
                }
              }
            }
            return config.ref !== void 0;
          }
          function hasValidKey(config) {
            {
              if (hasOwnProperty2.call(config, "key")) {
                var getter = Object.getOwnPropertyDescriptor(config, "key").get;
                if (getter && getter.isReactWarning) {
                  return false;
                }
              }
            }
            return config.key !== void 0;
          }
          function defineKeyPropWarningGetter(props, displayName) {
            var warnAboutAccessingKey = function() {
              {
                if (!specialPropKeyWarningShown) {
                  specialPropKeyWarningShown = true;
                  error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
                }
              }
            };
            warnAboutAccessingKey.isReactWarning = true;
            Object.defineProperty(props, "key", {
              get: warnAboutAccessingKey,
              configurable: true
            });
          }
          function defineRefPropWarningGetter(props, displayName) {
            var warnAboutAccessingRef = function() {
              {
                if (!specialPropRefWarningShown) {
                  specialPropRefWarningShown = true;
                  error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
                }
              }
            };
            warnAboutAccessingRef.isReactWarning = true;
            Object.defineProperty(props, "ref", {
              get: warnAboutAccessingRef,
              configurable: true
            });
          }
          function warnIfStringRefCannotBeAutoConverted(config) {
            {
              if (typeof config.ref === "string" && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
                var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
                if (!didWarnAboutStringRefs[componentName]) {
                  error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);
                  didWarnAboutStringRefs[componentName] = true;
                }
              }
            }
          }
          var ReactElement = function(type, key, ref, self2, source, owner, props) {
            var element = {
              // This tag allows us to uniquely identify this as a React Element
              $$typeof: REACT_ELEMENT_TYPE,
              // Built-in properties that belong on the element
              type,
              key,
              ref,
              props,
              // Record the component responsible for creating this element.
              _owner: owner
            };
            {
              element._store = {};
              Object.defineProperty(element._store, "validated", {
                configurable: false,
                enumerable: false,
                writable: true,
                value: false
              });
              Object.defineProperty(element, "_self", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: self2
              });
              Object.defineProperty(element, "_source", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: source
              });
              if (Object.freeze) {
                Object.freeze(element.props);
                Object.freeze(element);
              }
            }
            return element;
          };
          function createElement2(type, config, children) {
            var propName;
            var props = {};
            var key = null;
            var ref = null;
            var self2 = null;
            var source = null;
            if (config != null) {
              if (hasValidRef(config)) {
                ref = config.ref;
                {
                  warnIfStringRefCannotBeAutoConverted(config);
                }
              }
              if (hasValidKey(config)) {
                {
                  checkKeyStringCoercion(config.key);
                }
                key = "" + config.key;
              }
              self2 = config.__self === void 0 ? null : config.__self;
              source = config.__source === void 0 ? null : config.__source;
              for (propName in config) {
                if (hasOwnProperty2.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                  props[propName] = config[propName];
                }
              }
            }
            var childrenLength = arguments.length - 2;
            if (childrenLength === 1) {
              props.children = children;
            } else if (childrenLength > 1) {
              var childArray = Array(childrenLength);
              for (var i2 = 0; i2 < childrenLength; i2++) {
                childArray[i2] = arguments[i2 + 2];
              }
              {
                if (Object.freeze) {
                  Object.freeze(childArray);
                }
              }
              props.children = childArray;
            }
            if (type && type.defaultProps) {
              var defaultProps = type.defaultProps;
              for (propName in defaultProps) {
                if (props[propName] === void 0) {
                  props[propName] = defaultProps[propName];
                }
              }
            }
            {
              if (key || ref) {
                var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
                if (key) {
                  defineKeyPropWarningGetter(props, displayName);
                }
                if (ref) {
                  defineRefPropWarningGetter(props, displayName);
                }
              }
            }
            return ReactElement(type, key, ref, self2, source, ReactCurrentOwner.current, props);
          }
          function cloneAndReplaceKey(oldElement, newKey) {
            var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
            return newElement;
          }
          function cloneElement(element, config, children) {
            if (element === null || element === void 0) {
              throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
            }
            var propName;
            var props = assign2({}, element.props);
            var key = element.key;
            var ref = element.ref;
            var self2 = element._self;
            var source = element._source;
            var owner = element._owner;
            if (config != null) {
              if (hasValidRef(config)) {
                ref = config.ref;
                owner = ReactCurrentOwner.current;
              }
              if (hasValidKey(config)) {
                {
                  checkKeyStringCoercion(config.key);
                }
                key = "" + config.key;
              }
              var defaultProps;
              if (element.type && element.type.defaultProps) {
                defaultProps = element.type.defaultProps;
              }
              for (propName in config) {
                if (hasOwnProperty2.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                  if (config[propName] === void 0 && defaultProps !== void 0) {
                    props[propName] = defaultProps[propName];
                  } else {
                    props[propName] = config[propName];
                  }
                }
              }
            }
            var childrenLength = arguments.length - 2;
            if (childrenLength === 1) {
              props.children = children;
            } else if (childrenLength > 1) {
              var childArray = Array(childrenLength);
              for (var i2 = 0; i2 < childrenLength; i2++) {
                childArray[i2] = arguments[i2 + 2];
              }
              props.children = childArray;
            }
            return ReactElement(element.type, key, ref, self2, source, owner, props);
          }
          function isValidElement(object) {
            return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
          }
          var SEPARATOR = ".";
          var SUBSEPARATOR = ":";
          function escape(key) {
            var escapeRegex = /[=:]/g;
            var escaperLookup = {
              "=": "=0",
              ":": "=2"
            };
            var escapedString = key.replace(escapeRegex, function(match2) {
              return escaperLookup[match2];
            });
            return "$" + escapedString;
          }
          var didWarnAboutMaps = false;
          var userProvidedKeyEscapeRegex = /\/+/g;
          function escapeUserProvidedKey(text) {
            return text.replace(userProvidedKeyEscapeRegex, "$&/");
          }
          function getElementKey(element, index) {
            if (typeof element === "object" && element !== null && element.key != null) {
              {
                checkKeyStringCoercion(element.key);
              }
              return escape("" + element.key);
            }
            return index.toString(36);
          }
          function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
            var type = typeof children;
            if (type === "undefined" || type === "boolean") {
              children = null;
            }
            var invokeCallback = false;
            if (children === null) {
              invokeCallback = true;
            } else {
              switch (type) {
                case "string":
                case "number":
                  invokeCallback = true;
                  break;
                case "object":
                  switch (children.$$typeof) {
                    case REACT_ELEMENT_TYPE:
                    case REACT_PORTAL_TYPE:
                      invokeCallback = true;
                  }
              }
            }
            if (invokeCallback) {
              var _child = children;
              var mappedChild = callback(_child);
              var childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
              if (isArray2(mappedChild)) {
                var escapedChildKey = "";
                if (childKey != null) {
                  escapedChildKey = escapeUserProvidedKey(childKey) + "/";
                }
                mapIntoArray(mappedChild, array, escapedChildKey, "", function(c2) {
                  return c2;
                });
              } else if (mappedChild != null) {
                if (isValidElement(mappedChild)) {
                  {
                    if (mappedChild.key && (!_child || _child.key !== mappedChild.key)) {
                      checkKeyStringCoercion(mappedChild.key);
                    }
                  }
                  mappedChild = cloneAndReplaceKey(
                    mappedChild,
                    // Keep both the (mapped) and old keys if they differ, just as
                    // traverseAllChildren used to do for objects as children
                    escapedPrefix + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
                    (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? (
                      // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                      // eslint-disable-next-line react-internal/safe-string-coercion
                      escapeUserProvidedKey("" + mappedChild.key) + "/"
                    ) : "") + childKey
                  );
                }
                array.push(mappedChild);
              }
              return 1;
            }
            var child;
            var nextName;
            var subtreeCount = 0;
            var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
            if (isArray2(children)) {
              for (var i2 = 0; i2 < children.length; i2++) {
                child = children[i2];
                nextName = nextNamePrefix + getElementKey(child, i2);
                subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
              }
            } else {
              var iteratorFn = getIteratorFn(children);
              if (typeof iteratorFn === "function") {
                var iterableChildren = children;
                {
                  if (iteratorFn === iterableChildren.entries) {
                    if (!didWarnAboutMaps) {
                      warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
                    }
                    didWarnAboutMaps = true;
                  }
                }
                var iterator = iteratorFn.call(iterableChildren);
                var step;
                var ii = 0;
                while (!(step = iterator.next()).done) {
                  child = step.value;
                  nextName = nextNamePrefix + getElementKey(child, ii++);
                  subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
                }
              } else if (type === "object") {
                var childrenString = String(children);
                throw new Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + "). If you meant to render a collection of children, use an array instead.");
              }
            }
            return subtreeCount;
          }
          function mapChildren(children, func, context) {
            if (children == null) {
              return children;
            }
            var result = [];
            var count = 0;
            mapIntoArray(children, result, "", "", function(child) {
              return func.call(context, child, count++);
            });
            return result;
          }
          function countChildren(children) {
            var n = 0;
            mapChildren(children, function() {
              n++;
            });
            return n;
          }
          function forEachChildren(children, forEachFunc, forEachContext) {
            mapChildren(children, function() {
              forEachFunc.apply(this, arguments);
            }, forEachContext);
          }
          function toArray2(children) {
            return mapChildren(children, function(child) {
              return child;
            }) || [];
          }
          function onlyChild(children) {
            if (!isValidElement(children)) {
              throw new Error("React.Children.only expected to receive a single React element child.");
            }
            return children;
          }
          function createContext(defaultValue) {
            var context = {
              $$typeof: REACT_CONTEXT_TYPE,
              // As a workaround to support multiple concurrent renderers, we categorize
              // some renderers as primary and others as secondary. We only expect
              // there to be two concurrent renderers at most: React Native (primary) and
              // Fabric (secondary); React DOM (primary) and React ART (secondary).
              // Secondary renderers store their context values on separate fields.
              _currentValue: defaultValue,
              _currentValue2: defaultValue,
              // Used to track how many concurrent renderers this context currently
              // supports within in a single renderer. Such as parallel server rendering.
              _threadCount: 0,
              // These are circular
              Provider: null,
              Consumer: null,
              // Add these to use same hidden class in VM as ServerContext
              _defaultValue: null,
              _globalName: null
            };
            context.Provider = {
              $$typeof: REACT_PROVIDER_TYPE,
              _context: context
            };
            var hasWarnedAboutUsingNestedContextConsumers = false;
            var hasWarnedAboutUsingConsumerProvider = false;
            var hasWarnedAboutDisplayNameOnConsumer = false;
            {
              var Consumer = {
                $$typeof: REACT_CONTEXT_TYPE,
                _context: context
              };
              Object.defineProperties(Consumer, {
                Provider: {
                  get: function() {
                    if (!hasWarnedAboutUsingConsumerProvider) {
                      hasWarnedAboutUsingConsumerProvider = true;
                      error("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?");
                    }
                    return context.Provider;
                  },
                  set: function(_Provider) {
                    context.Provider = _Provider;
                  }
                },
                _currentValue: {
                  get: function() {
                    return context._currentValue;
                  },
                  set: function(_currentValue) {
                    context._currentValue = _currentValue;
                  }
                },
                _currentValue2: {
                  get: function() {
                    return context._currentValue2;
                  },
                  set: function(_currentValue2) {
                    context._currentValue2 = _currentValue2;
                  }
                },
                _threadCount: {
                  get: function() {
                    return context._threadCount;
                  },
                  set: function(_threadCount) {
                    context._threadCount = _threadCount;
                  }
                },
                Consumer: {
                  get: function() {
                    if (!hasWarnedAboutUsingNestedContextConsumers) {
                      hasWarnedAboutUsingNestedContextConsumers = true;
                      error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                    }
                    return context.Consumer;
                  }
                },
                displayName: {
                  get: function() {
                    return context.displayName;
                  },
                  set: function(displayName) {
                    if (!hasWarnedAboutDisplayNameOnConsumer) {
                      warn("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", displayName);
                      hasWarnedAboutDisplayNameOnConsumer = true;
                    }
                  }
                }
              });
              context.Consumer = Consumer;
            }
            {
              context._currentRenderer = null;
              context._currentRenderer2 = null;
            }
            return context;
          }
          var Uninitialized = -1;
          var Pending = 0;
          var Resolved = 1;
          var Rejected = 2;
          function lazyInitializer(payload) {
            if (payload._status === Uninitialized) {
              var ctor = payload._result;
              var thenable = ctor();
              thenable.then(function(moduleObject2) {
                if (payload._status === Pending || payload._status === Uninitialized) {
                  var resolved = payload;
                  resolved._status = Resolved;
                  resolved._result = moduleObject2;
                }
              }, function(error2) {
                if (payload._status === Pending || payload._status === Uninitialized) {
                  var rejected = payload;
                  rejected._status = Rejected;
                  rejected._result = error2;
                }
              });
              if (payload._status === Uninitialized) {
                var pending = payload;
                pending._status = Pending;
                pending._result = thenable;
              }
            }
            if (payload._status === Resolved) {
              var moduleObject = payload._result;
              {
                if (moduleObject === void 0) {
                  error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", moduleObject);
                }
              }
              {
                if (!("default" in moduleObject)) {
                  error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", moduleObject);
                }
              }
              return moduleObject.default;
            } else {
              throw payload._result;
            }
          }
          function lazy(ctor) {
            var payload = {
              // We use these fields to store the result.
              _status: Uninitialized,
              _result: ctor
            };
            var lazyType = {
              $$typeof: REACT_LAZY_TYPE,
              _payload: payload,
              _init: lazyInitializer
            };
            {
              var defaultProps;
              var propTypes;
              Object.defineProperties(lazyType, {
                defaultProps: {
                  configurable: true,
                  get: function() {
                    return defaultProps;
                  },
                  set: function(newDefaultProps) {
                    error("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                    defaultProps = newDefaultProps;
                    Object.defineProperty(lazyType, "defaultProps", {
                      enumerable: true
                    });
                  }
                },
                propTypes: {
                  configurable: true,
                  get: function() {
                    return propTypes;
                  },
                  set: function(newPropTypes) {
                    error("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                    propTypes = newPropTypes;
                    Object.defineProperty(lazyType, "propTypes", {
                      enumerable: true
                    });
                  }
                }
              });
            }
            return lazyType;
          }
          function forwardRef(render) {
            {
              if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
                error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).");
              } else if (typeof render !== "function") {
                error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render);
              } else {
                if (render.length !== 0 && render.length !== 2) {
                  error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
                }
              }
              if (render != null) {
                if (render.defaultProps != null || render.propTypes != null) {
                  error("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
                }
              }
            }
            var elementType = {
              $$typeof: REACT_FORWARD_REF_TYPE,
              render
            };
            {
              var ownName;
              Object.defineProperty(elementType, "displayName", {
                enumerable: false,
                configurable: true,
                get: function() {
                  return ownName;
                },
                set: function(name) {
                  ownName = name;
                  if (!render.name && !render.displayName) {
                    render.displayName = name;
                  }
                }
              });
            }
            return elementType;
          }
          var REACT_MODULE_REFERENCE;
          {
            REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
          }
          function isValidElementType(type) {
            if (typeof type === "string" || typeof type === "function") {
              return true;
            }
            if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
              return true;
            }
            if (typeof type === "object" && type !== null) {
              if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
              // types supported by any Flight configuration anywhere since
              // we don't know which Flight build this will end up being used
              // with.
              type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
                return true;
              }
            }
            return false;
          }
          function memo2(type, compare) {
            {
              if (!isValidElementType(type)) {
                error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
              }
            }
            var elementType = {
              $$typeof: REACT_MEMO_TYPE,
              type,
              compare: compare === void 0 ? null : compare
            };
            {
              var ownName;
              Object.defineProperty(elementType, "displayName", {
                enumerable: false,
                configurable: true,
                get: function() {
                  return ownName;
                },
                set: function(name) {
                  ownName = name;
                  if (!type.name && !type.displayName) {
                    type.displayName = name;
                  }
                }
              });
            }
            return elementType;
          }
          function resolveDispatcher() {
            var dispatcher = ReactCurrentDispatcher.current;
            {
              if (dispatcher === null) {
                error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
              }
            }
            return dispatcher;
          }
          function useContext(Context) {
            var dispatcher = resolveDispatcher();
            {
              if (Context._context !== void 0) {
                var realContext = Context._context;
                if (realContext.Consumer === Context) {
                  error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?");
                } else if (realContext.Provider === Context) {
                  error("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
                }
              }
            }
            return dispatcher.useContext(Context);
          }
          function useState10(initialState) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useState(initialState);
          }
          function useReducer(reducer, initialArg, init) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useReducer(reducer, initialArg, init);
          }
          function useRef7(initialValue) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useRef(initialValue);
          }
          function useEffect14(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useEffect(create, deps);
          }
          function useInsertionEffect(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useInsertionEffect(create, deps);
          }
          function useLayoutEffect(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useLayoutEffect(create, deps);
          }
          function useCallback4(callback, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useCallback(callback, deps);
          }
          function useMemo3(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useMemo(create, deps);
          }
          function useImperativeHandle(ref, create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useImperativeHandle(ref, create, deps);
          }
          function useDebugValue(value, formatterFn) {
            {
              var dispatcher = resolveDispatcher();
              return dispatcher.useDebugValue(value, formatterFn);
            }
          }
          function useTransition() {
            var dispatcher = resolveDispatcher();
            return dispatcher.useTransition();
          }
          function useDeferredValue(value) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useDeferredValue(value);
          }
          function useId() {
            var dispatcher = resolveDispatcher();
            return dispatcher.useId();
          }
          function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
          }
          var disabledDepth = 0;
          var prevLog;
          var prevInfo;
          var prevWarn;
          var prevError;
          var prevGroup;
          var prevGroupCollapsed;
          var prevGroupEnd;
          function disabledLog() {
          }
          disabledLog.__reactDisabledLog = true;
          function disableLogs() {
            {
              if (disabledDepth === 0) {
                prevLog = console.log;
                prevInfo = console.info;
                prevWarn = console.warn;
                prevError = console.error;
                prevGroup = console.group;
                prevGroupCollapsed = console.groupCollapsed;
                prevGroupEnd = console.groupEnd;
                var props = {
                  configurable: true,
                  enumerable: true,
                  value: disabledLog,
                  writable: true
                };
                Object.defineProperties(console, {
                  info: props,
                  log: props,
                  warn: props,
                  error: props,
                  group: props,
                  groupCollapsed: props,
                  groupEnd: props
                });
              }
              disabledDepth++;
            }
          }
          function reenableLogs() {
            {
              disabledDepth--;
              if (disabledDepth === 0) {
                var props = {
                  configurable: true,
                  enumerable: true,
                  writable: true
                };
                Object.defineProperties(console, {
                  log: assign2({}, props, {
                    value: prevLog
                  }),
                  info: assign2({}, props, {
                    value: prevInfo
                  }),
                  warn: assign2({}, props, {
                    value: prevWarn
                  }),
                  error: assign2({}, props, {
                    value: prevError
                  }),
                  group: assign2({}, props, {
                    value: prevGroup
                  }),
                  groupCollapsed: assign2({}, props, {
                    value: prevGroupCollapsed
                  }),
                  groupEnd: assign2({}, props, {
                    value: prevGroupEnd
                  })
                });
              }
              if (disabledDepth < 0) {
                error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
              }
            }
          }
          var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
          var prefix2;
          function describeBuiltInComponentFrame(name, source, ownerFn) {
            {
              if (prefix2 === void 0) {
                try {
                  throw Error();
                } catch (x2) {
                  var match2 = x2.stack.trim().match(/\n( *(at )?)/);
                  prefix2 = match2 && match2[1] || "";
                }
              }
              return "\n" + prefix2 + name;
            }
          }
          var reentry = false;
          var componentFrameCache;
          {
            var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
            componentFrameCache = new PossiblyWeakMap();
          }
          function describeNativeComponentFrame(fn, construct) {
            if (!fn || reentry) {
              return "";
            }
            {
              var frame = componentFrameCache.get(fn);
              if (frame !== void 0) {
                return frame;
              }
            }
            var control;
            reentry = true;
            var previousPrepareStackTrace = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var previousDispatcher;
            {
              previousDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = null;
              disableLogs();
            }
            try {
              if (construct) {
                var Fake = function() {
                  throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                });
                if (typeof Reflect === "object" && Reflect.construct) {
                  try {
                    Reflect.construct(Fake, []);
                  } catch (x2) {
                    control = x2;
                  }
                  Reflect.construct(fn, [], Fake);
                } else {
                  try {
                    Fake.call();
                  } catch (x2) {
                    control = x2;
                  }
                  fn.call(Fake.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (x2) {
                  control = x2;
                }
                fn();
              }
            } catch (sample) {
              if (sample && control && typeof sample.stack === "string") {
                var sampleLines = sample.stack.split("\n");
                var controlLines = control.stack.split("\n");
                var s2 = sampleLines.length - 1;
                var c2 = controlLines.length - 1;
                while (s2 >= 1 && c2 >= 0 && sampleLines[s2] !== controlLines[c2]) {
                  c2--;
                }
                for (; s2 >= 1 && c2 >= 0; s2--, c2--) {
                  if (sampleLines[s2] !== controlLines[c2]) {
                    if (s2 !== 1 || c2 !== 1) {
                      do {
                        s2--;
                        c2--;
                        if (c2 < 0 || sampleLines[s2] !== controlLines[c2]) {
                          var _frame = "\n" + sampleLines[s2].replace(" at new ", " at ");
                          if (fn.displayName && _frame.includes("<anonymous>")) {
                            _frame = _frame.replace("<anonymous>", fn.displayName);
                          }
                          {
                            if (typeof fn === "function") {
                              componentFrameCache.set(fn, _frame);
                            }
                          }
                          return _frame;
                        }
                      } while (s2 >= 1 && c2 >= 0);
                    }
                    break;
                  }
                }
              }
            } finally {
              reentry = false;
              {
                ReactCurrentDispatcher$1.current = previousDispatcher;
                reenableLogs();
              }
              Error.prepareStackTrace = previousPrepareStackTrace;
            }
            var name = fn ? fn.displayName || fn.name : "";
            var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
            {
              if (typeof fn === "function") {
                componentFrameCache.set(fn, syntheticFrame);
              }
            }
            return syntheticFrame;
          }
          function describeFunctionComponentFrame(fn, source, ownerFn) {
            {
              return describeNativeComponentFrame(fn, false);
            }
          }
          function shouldConstruct(Component2) {
            var prototype3 = Component2.prototype;
            return !!(prototype3 && prototype3.isReactComponent);
          }
          function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
            if (type == null) {
              return "";
            }
            if (typeof type === "function") {
              {
                return describeNativeComponentFrame(type, shouldConstruct(type));
              }
            }
            if (typeof type === "string") {
              return describeBuiltInComponentFrame(type);
            }
            switch (type) {
              case REACT_SUSPENSE_TYPE:
                return describeBuiltInComponentFrame("Suspense");
              case REACT_SUSPENSE_LIST_TYPE:
                return describeBuiltInComponentFrame("SuspenseList");
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_FORWARD_REF_TYPE:
                  return describeFunctionComponentFrame(type.render);
                case REACT_MEMO_TYPE:
                  return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                  } catch (x2) {
                  }
                }
              }
            }
            return "";
          }
          var loggedTypeFailures = {};
          var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
          function setCurrentlyValidatingElement(element) {
            {
              if (element) {
                var owner = element._owner;
                var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
                ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
              } else {
                ReactDebugCurrentFrame$1.setExtraStackFrame(null);
              }
            }
          }
          function checkPropTypes(typeSpecs, values, location, componentName, element) {
            {
              var has = Function.call.bind(hasOwnProperty2);
              for (var typeSpecName in typeSpecs) {
                if (has(typeSpecs, typeSpecName)) {
                  var error$1 = void 0;
                  try {
                    if (typeof typeSpecs[typeSpecName] !== "function") {
                      var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                      err.name = "Invariant Violation";
                      throw err;
                    }
                    error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                  } catch (ex) {
                    error$1 = ex;
                  }
                  if (error$1 && !(error$1 instanceof Error)) {
                    setCurrentlyValidatingElement(element);
                    error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                    setCurrentlyValidatingElement(null);
                  }
                  if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                    loggedTypeFailures[error$1.message] = true;
                    setCurrentlyValidatingElement(element);
                    error("Failed %s type: %s", location, error$1.message);
                    setCurrentlyValidatingElement(null);
                  }
                }
              }
            }
          }
          function setCurrentlyValidatingElement$1(element) {
            {
              if (element) {
                var owner = element._owner;
                var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
                setExtraStackFrame(stack);
              } else {
                setExtraStackFrame(null);
              }
            }
          }
          var propTypesMisspellWarningShown;
          {
            propTypesMisspellWarningShown = false;
          }
          function getDeclarationErrorAddendum() {
            if (ReactCurrentOwner.current) {
              var name = getComponentNameFromType(ReactCurrentOwner.current.type);
              if (name) {
                return "\n\nCheck the render method of `" + name + "`.";
              }
            }
            return "";
          }
          function getSourceInfoErrorAddendum(source) {
            if (source !== void 0) {
              var fileName = source.fileName.replace(/^.*[\\\/]/, "");
              var lineNumber = source.lineNumber;
              return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
            }
            return "";
          }
          function getSourceInfoErrorAddendumForProps(elementProps) {
            if (elementProps !== null && elementProps !== void 0) {
              return getSourceInfoErrorAddendum(elementProps.__source);
            }
            return "";
          }
          var ownerHasKeyUseWarning = {};
          function getCurrentComponentErrorInfo(parentType) {
            var info = getDeclarationErrorAddendum();
            if (!info) {
              var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
              if (parentName) {
                info = "\n\nCheck the top-level render call using <" + parentName + ">.";
              }
            }
            return info;
          }
          function validateExplicitKey(element, parentType) {
            if (!element._store || element._store.validated || element.key != null) {
              return;
            }
            element._store.validated = true;
            var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
            if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
              return;
            }
            ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
            var childOwner = "";
            if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
              childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
            }
            {
              setCurrentlyValidatingElement$1(element);
              error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
              setCurrentlyValidatingElement$1(null);
            }
          }
          function validateChildKeys(node2, parentType) {
            if (typeof node2 !== "object") {
              return;
            }
            if (isArray2(node2)) {
              for (var i2 = 0; i2 < node2.length; i2++) {
                var child = node2[i2];
                if (isValidElement(child)) {
                  validateExplicitKey(child, parentType);
                }
              }
            } else if (isValidElement(node2)) {
              if (node2._store) {
                node2._store.validated = true;
              }
            } else if (node2) {
              var iteratorFn = getIteratorFn(node2);
              if (typeof iteratorFn === "function") {
                if (iteratorFn !== node2.entries) {
                  var iterator = iteratorFn.call(node2);
                  var step;
                  while (!(step = iterator.next()).done) {
                    if (isValidElement(step.value)) {
                      validateExplicitKey(step.value, parentType);
                    }
                  }
                }
              }
            }
          }
          function validatePropTypes(element) {
            {
              var type = element.type;
              if (type === null || type === void 0 || typeof type === "string") {
                return;
              }
              var propTypes;
              if (typeof type === "function") {
                propTypes = type.propTypes;
              } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
              // Inner props are checked in the reconciler.
              type.$$typeof === REACT_MEMO_TYPE)) {
                propTypes = type.propTypes;
              } else {
                return;
              }
              if (propTypes) {
                var name = getComponentNameFromType(type);
                checkPropTypes(propTypes, element.props, "prop", name, element);
              } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
                propTypesMisspellWarningShown = true;
                var _name = getComponentNameFromType(type);
                error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
              }
              if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
                error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
              }
            }
          }
          function validateFragmentProps(fragment) {
            {
              var keys = Object.keys(fragment.props);
              for (var i2 = 0; i2 < keys.length; i2++) {
                var key = keys[i2];
                if (key !== "children" && key !== "key") {
                  setCurrentlyValidatingElement$1(fragment);
                  error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                  setCurrentlyValidatingElement$1(null);
                  break;
                }
              }
              if (fragment.ref !== null) {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid attribute `ref` supplied to `React.Fragment`.");
                setCurrentlyValidatingElement$1(null);
              }
            }
          }
          function createElementWithValidation(type, props, children) {
            var validType = isValidElementType(type);
            if (!validType) {
              var info = "";
              if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
                info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
              }
              var sourceInfo = getSourceInfoErrorAddendumForProps(props);
              if (sourceInfo) {
                info += sourceInfo;
              } else {
                info += getDeclarationErrorAddendum();
              }
              var typeString;
              if (type === null) {
                typeString = "null";
              } else if (isArray2(type)) {
                typeString = "array";
              } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
                typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
                info = " Did you accidentally export a JSX literal instead of a component?";
              } else {
                typeString = typeof type;
              }
              {
                error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
              }
            }
            var element = createElement2.apply(this, arguments);
            if (element == null) {
              return element;
            }
            if (validType) {
              for (var i2 = 2; i2 < arguments.length; i2++) {
                validateChildKeys(arguments[i2], type);
              }
            }
            if (type === REACT_FRAGMENT_TYPE) {
              validateFragmentProps(element);
            } else {
              validatePropTypes(element);
            }
            return element;
          }
          var didWarnAboutDeprecatedCreateFactory = false;
          function createFactoryWithValidation(type) {
            var validatedFactory = createElementWithValidation.bind(null, type);
            validatedFactory.type = type;
            {
              if (!didWarnAboutDeprecatedCreateFactory) {
                didWarnAboutDeprecatedCreateFactory = true;
                warn("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.");
              }
              Object.defineProperty(validatedFactory, "type", {
                enumerable: false,
                get: function() {
                  warn("Factory.type is deprecated. Access the class directly before passing it to createFactory.");
                  Object.defineProperty(this, "type", {
                    value: type
                  });
                  return type;
                }
              });
            }
            return validatedFactory;
          }
          function cloneElementWithValidation(element, props, children) {
            var newElement = cloneElement.apply(this, arguments);
            for (var i2 = 2; i2 < arguments.length; i2++) {
              validateChildKeys(arguments[i2], newElement.type);
            }
            validatePropTypes(newElement);
            return newElement;
          }
          function startTransition(scope, options) {
            var prevTransition = ReactCurrentBatchConfig.transition;
            ReactCurrentBatchConfig.transition = {};
            var currentTransition = ReactCurrentBatchConfig.transition;
            {
              ReactCurrentBatchConfig.transition._updatedFibers = /* @__PURE__ */ new Set();
            }
            try {
              scope();
            } finally {
              ReactCurrentBatchConfig.transition = prevTransition;
              {
                if (prevTransition === null && currentTransition._updatedFibers) {
                  var updatedFibersCount = currentTransition._updatedFibers.size;
                  if (updatedFibersCount > 10) {
                    warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.");
                  }
                  currentTransition._updatedFibers.clear();
                }
              }
            }
          }
          var didWarnAboutMessageChannel = false;
          var enqueueTaskImpl = null;
          function enqueueTask(task) {
            if (enqueueTaskImpl === null) {
              try {
                var requireString = ("require" + Math.random()).slice(0, 7);
                var nodeRequire = module && module[requireString];
                enqueueTaskImpl = nodeRequire.call(module, "timers").setImmediate;
              } catch (_err) {
                enqueueTaskImpl = function(callback) {
                  {
                    if (didWarnAboutMessageChannel === false) {
                      didWarnAboutMessageChannel = true;
                      if (typeof MessageChannel === "undefined") {
                        error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning.");
                      }
                    }
                  }
                  var channel = new MessageChannel();
                  channel.port1.onmessage = callback;
                  channel.port2.postMessage(void 0);
                };
              }
            }
            return enqueueTaskImpl(task);
          }
          var actScopeDepth = 0;
          var didWarnNoAwaitAct = false;
          function act(callback) {
            {
              var prevActScopeDepth = actScopeDepth;
              actScopeDepth++;
              if (ReactCurrentActQueue.current === null) {
                ReactCurrentActQueue.current = [];
              }
              var prevIsBatchingLegacy = ReactCurrentActQueue.isBatchingLegacy;
              var result;
              try {
                ReactCurrentActQueue.isBatchingLegacy = true;
                result = callback();
                if (!prevIsBatchingLegacy && ReactCurrentActQueue.didScheduleLegacyUpdate) {
                  var queue = ReactCurrentActQueue.current;
                  if (queue !== null) {
                    ReactCurrentActQueue.didScheduleLegacyUpdate = false;
                    flushActQueue(queue);
                  }
                }
              } catch (error2) {
                popActScope(prevActScopeDepth);
                throw error2;
              } finally {
                ReactCurrentActQueue.isBatchingLegacy = prevIsBatchingLegacy;
              }
              if (result !== null && typeof result === "object" && typeof result.then === "function") {
                var thenableResult = result;
                var wasAwaited = false;
                var thenable = {
                  then: function(resolve, reject) {
                    wasAwaited = true;
                    thenableResult.then(function(returnValue2) {
                      popActScope(prevActScopeDepth);
                      if (actScopeDepth === 0) {
                        recursivelyFlushAsyncActWork(returnValue2, resolve, reject);
                      } else {
                        resolve(returnValue2);
                      }
                    }, function(error2) {
                      popActScope(prevActScopeDepth);
                      reject(error2);
                    });
                  }
                };
                {
                  if (!didWarnNoAwaitAct && typeof Promise !== "undefined") {
                    Promise.resolve().then(function() {
                    }).then(function() {
                      if (!wasAwaited) {
                        didWarnNoAwaitAct = true;
                        error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);");
                      }
                    });
                  }
                }
                return thenable;
              } else {
                var returnValue = result;
                popActScope(prevActScopeDepth);
                if (actScopeDepth === 0) {
                  var _queue = ReactCurrentActQueue.current;
                  if (_queue !== null) {
                    flushActQueue(_queue);
                    ReactCurrentActQueue.current = null;
                  }
                  var _thenable = {
                    then: function(resolve, reject) {
                      if (ReactCurrentActQueue.current === null) {
                        ReactCurrentActQueue.current = [];
                        recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                      } else {
                        resolve(returnValue);
                      }
                    }
                  };
                  return _thenable;
                } else {
                  var _thenable2 = {
                    then: function(resolve, reject) {
                      resolve(returnValue);
                    }
                  };
                  return _thenable2;
                }
              }
            }
          }
          function popActScope(prevActScopeDepth) {
            {
              if (prevActScopeDepth !== actScopeDepth - 1) {
                error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
              }
              actScopeDepth = prevActScopeDepth;
            }
          }
          function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
            {
              var queue = ReactCurrentActQueue.current;
              if (queue !== null) {
                try {
                  flushActQueue(queue);
                  enqueueTask(function() {
                    if (queue.length === 0) {
                      ReactCurrentActQueue.current = null;
                      resolve(returnValue);
                    } else {
                      recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                    }
                  });
                } catch (error2) {
                  reject(error2);
                }
              } else {
                resolve(returnValue);
              }
            }
          }
          var isFlushing = false;
          function flushActQueue(queue) {
            {
              if (!isFlushing) {
                isFlushing = true;
                var i2 = 0;
                try {
                  for (; i2 < queue.length; i2++) {
                    var callback = queue[i2];
                    do {
                      callback = callback(true);
                    } while (callback !== null);
                  }
                  queue.length = 0;
                } catch (error2) {
                  queue = queue.slice(i2 + 1);
                  throw error2;
                } finally {
                  isFlushing = false;
                }
              }
            }
          }
          var createElement$1 = createElementWithValidation;
          var cloneElement$1 = cloneElementWithValidation;
          var createFactory = createFactoryWithValidation;
          var Children = {
            map: mapChildren,
            forEach: forEachChildren,
            count: countChildren,
            toArray: toArray2,
            only: onlyChild
          };
          exports.Children = Children;
          exports.Component = Component;
          exports.Fragment = REACT_FRAGMENT_TYPE;
          exports.Profiler = REACT_PROFILER_TYPE;
          exports.PureComponent = PureComponent2;
          exports.StrictMode = REACT_STRICT_MODE_TYPE;
          exports.Suspense = REACT_SUSPENSE_TYPE;
          exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
          exports.cloneElement = cloneElement$1;
          exports.createContext = createContext;
          exports.createElement = createElement$1;
          exports.createFactory = createFactory;
          exports.createRef = createRef;
          exports.forwardRef = forwardRef;
          exports.isValidElement = isValidElement;
          exports.lazy = lazy;
          exports.memo = memo2;
          exports.startTransition = startTransition;
          exports.unstable_act = act;
          exports.useCallback = useCallback4;
          exports.useContext = useContext;
          exports.useDebugValue = useDebugValue;
          exports.useDeferredValue = useDeferredValue;
          exports.useEffect = useEffect14;
          exports.useId = useId;
          exports.useImperativeHandle = useImperativeHandle;
          exports.useInsertionEffect = useInsertionEffect;
          exports.useLayoutEffect = useLayoutEffect;
          exports.useMemo = useMemo3;
          exports.useReducer = useReducer;
          exports.useRef = useRef7;
          exports.useState = useState10;
          exports.useSyncExternalStore = useSyncExternalStore;
          exports.useTransition = useTransition;
          exports.version = ReactVersion;
          if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
          }
        })();
      }
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_react_development();
      }
    }
  });

  // node_modules/@17media/dad/src/utils/toSec.js
  var require_toSec = __commonJS({
    "node_modules/@17media/dad/src/utils/toSec.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var toSec = (Date2) => Math.floor(+Date2 / 1e3);
      exports.default = toSec;
    }
  });

  // node_modules/@17media/dad/src/utils/prefix0.js
  var require_prefix0 = __commonJS({
    "node_modules/@17media/dad/src/utils/prefix0.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var prefix0 = (stringOfNumber) => {
        const n = String(stringOfNumber);
        if (n.length < 2) {
          return `0${n}`;
        }
        return n;
      };
      exports.default = prefix0;
    }
  });

  // node_modules/@17media/dad/src/utils/secToDate.js
  var require_secToDate = __commonJS({
    "node_modules/@17media/dad/src/utils/secToDate.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var prefix0_1 = __importDefault(require_prefix0());
      var secToDate = (tz = 8) => (sec = 0) => {
        const D2 = new Date(sec * 1e3);
        D2.setTime(+D2 + tz * 60 * 60 * 1e3);
        const year = D2.getUTCFullYear();
        const month = D2.getUTCMonth();
        const date = D2.getUTCDate();
        const hours = D2.getUTCHours();
        const minutes = D2.getUTCMinutes();
        const seconds = D2.getUTCSeconds();
        const day2 = D2.getUTCDay();
        const format = (str = "YYYY-MM-DDThh:mm:ss") => str.replace(/[yY]+/, (Y2) => String(year).slice(0 - Y2.length)).replace(/M+/, (MM) => {
          const mm = month + 1;
          return MM.length > 1 ? prefix0_1.default(mm) : String(mm);
        }).replace(/D+/, (DD) => DD.length > 1 ? prefix0_1.default(date) : String(date)).replace(/h+/, (h2) => h2.length > 1 ? prefix0_1.default(hours) : String(hours)).replace(/m+/, (m2) => m2.length > 1 ? prefix0_1.default(minutes) : String(minutes)).replace(/s+/, (s2) => s2.length > 1 ? prefix0_1.default(seconds) : String(seconds));
        return {
          year,
          month,
          date,
          hours,
          minutes,
          seconds,
          day: day2,
          format,
          get ISO() {
            return this.format();
          }
        };
      };
      exports.default = secToDate;
    }
  });

  // node_modules/@17media/dad/src/utils/isValidDateFormat.js
  var require_isValidDateFormat = __commonJS({
    "node_modules/@17media/dad/src/utils/isValidDateFormat.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var isValidDateFormat = (dateString) => !isNaN(+new Date(dateString));
      exports.default = isValidDateFormat;
    }
  });

  // node_modules/@17media/dad/src/utils/suffix00.js
  var require_suffix00 = __commonJS({
    "node_modules/@17media/dad/src/utils/suffix00.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var suffix00 = (date) => {
        const len = date.length;
        if (len === 10) {
          return `${date} 00:00:00`;
        }
        if (len === 13) {
          return `${date}:00:00`;
        }
        if (len === 16) {
          return `${date}:00`;
        }
        return date;
      };
      exports.default = suffix00;
    }
  });

  // node_modules/@17media/dad/src/utils/unifyTimeFormat.js
  var require_unifyTimeFormat = __commonJS({
    "node_modules/@17media/dad/src/utils/unifyTimeFormat.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var suffix00_1 = __importDefault(require_suffix00());
      var unifyTimeFormat = (string = "") => suffix00_1.default(string).replace(" ", "T");
      exports.default = unifyTimeFormat;
    }
  });

  // node_modules/@17media/dad/src/libs/dad.js
  var require_dad = __commonJS({
    "node_modules/@17media/dad/src/libs/dad.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var toSec_1 = __importDefault(require_toSec());
      var secToDate_1 = __importDefault(require_secToDate());
      var isValidDateFormat_1 = __importDefault(require_isValidDateFormat());
      var unifyTimeFormat_1 = __importDefault(require_unifyTimeFormat());
      function dad(value) {
        if (!/^(string|number)$/.test(typeof value)) {
          throw new Error("Invalid type. it should be `string` | `number`");
        }
        let dateOrSec = value;
        if (typeof value === "string") {
          dateOrSec = unifyTimeFormat_1.default(value);
          if (!isValidDateFormat_1.default(dateOrSec)) {
            throw new Error("Invalid date string format, Please pass `YYYY-MM-DD HH:mm:ss`");
          }
          return {
            get tw() {
              return toSec_1.default(/* @__PURE__ */ new Date(`${dateOrSec}+08:00`));
            },
            get ja() {
              return toSec_1.default(/* @__PURE__ */ new Date(`${dateOrSec}+09:00`));
            },
            get hk() {
              return this.tw;
            }
          };
        }
        return {
          get tw() {
            return secToDate_1.default(8)(dateOrSec);
          },
          get ja() {
            return secToDate_1.default(9)(dateOrSec);
          },
          get hk() {
            return this.tw;
          }
        };
      }
      exports.dad = dad;
      exports.default = dad;
    }
  });

  // node_modules/ienv/src/index.js
  var require_src = __commonJS({
    "node_modules/ienv/src/index.js"(exports, module) {
      "use strict";
      var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
        return typeof obj;
      } : function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
      var Global = (1, eval)("this");
      var isOf = function isOf2(obj) {
        var type = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
        return "[object " + type + "]" === Object.prototype.toString.call(obj);
      };
      var isBrowser2 = isOf(Global.document, "HTMLDocument");
      var isNode = isOf(Global.process, "process");
      var hasEnv = (typeof process === "undefined" ? "undefined" : _typeof(process)) === "object" && process.env;
      if (!hasEnv) {
        console.warn("You don't have process.env. The `env`, `isDev` and `isProd` would be null");
      }
      var env = hasEnv ? "development" : null;
      var isDev = hasEnv ? env === "development" : null;
      var isProd = hasEnv ? env === "production" : null;
      module.exports = Object.freeze({
        global: Global,
        env,
        isDev,
        isProd,
        isBrowser: isBrowser2,
        isNode
      });
    }
  });

  // node_modules/@17media/dad/src/utils/qsParser.js
  var require_qsParser = __commonJS({
    "node_modules/@17media/dad/src/utils/qsParser.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var ienv_1 = require_src();
      var qsParser = (qString = "") => {
        const qsObj = {};
        const qs2 = qString || (ienv_1.isNode ? process.argv.slice(2).join("&") : decodeURIComponent(window.location.search.slice(1)));
        if (qs2) {
          qs2.split("&").forEach((nameValue) => {
            const [name, value] = nameValue.split("=");
            Object.assign(qsObj, {
              [name]: typeof value === "undefined" ? true : value
            });
          });
        }
        return qsObj;
      };
      exports.default = qsParser;
    }
  });

  // node_modules/@17media/dad/src/libs/now.js
  var require_now = __commonJS({
    "node_modules/@17media/dad/src/libs/now.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var qsParser_1 = __importDefault(require_qsParser());
      var toSec_1 = __importDefault(require_toSec());
      var isValidDateFormat_1 = __importDefault(require_isValidDateFormat());
      var unifyTimeFormat_1 = __importDefault(require_unifyTimeFormat());
      var startTime;
      var now4 = () => {
        const currentTime = Date.now();
        const qs2 = qsParser_1.default();
        const dadNow = unifyTimeFormat_1.default(qs2["dad.now"] || qs2["--dad.now"]);
        if (dadNow && !isValidDateFormat_1.default(dadNow)) {
          throw new Error("Invalid time format in dad.now.");
        }
        const isAuto = qs2["--auto"] || qs2.auto;
        if (typeof startTime === "undefined") {
          startTime = currentTime;
        }
        const timeInterval = dadNow ? startTime - +new Date(dadNow) : 0;
        const timeDuration = dadNow && !isAuto ? currentTime - startTime : 0;
        const sec = toSec_1.default(currentTime - timeInterval - timeDuration);
        return sec;
      };
      exports.default = now4;
    }
  });

  // node_modules/@17media/dad/src/libs/isToday.js
  var require_isToday = __commonJS({
    "node_modules/@17media/dad/src/libs/isToday.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var now_1 = __importDefault(require_now());
      var isToday = (sec) => {
        const ms = sec * 1e3;
        const dadNow = now_1.default();
        const currentDate = new Date(dadNow * 1e3);
        return new Date(ms).toDateString() === currentDate.toDateString();
      };
      exports.default = isToday;
    }
  });

  // node_modules/@17media/dad/src/index.js
  var require_src2 = __commonJS({
    "node_modules/@17media/dad/src/index.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var dad_1 = __importDefault(require_dad());
      var isToday_1 = __importDefault(require_isToday());
      exports.isToday = isToday_1.default;
      var now_1 = __importDefault(require_now());
      exports.now = now_1.default;
      function tw(value) {
        if (typeof value === "string")
          return dad_1.default(value).tw;
        return dad_1.default(value).tw;
      }
      exports.tw = tw;
      function ja(value) {
        if (typeof value === "string")
          return dad_1.default(value).ja;
        return dad_1.default(value).ja;
      }
      exports.ja = ja;
      exports.hk = tw;
      exports.default = dad_1.default;
      exports = dad_1.default;
    }
  });

  // node_modules/shallowequal/index.js
  var require_shallowequal = __commonJS({
    "node_modules/shallowequal/index.js"(exports, module) {
      module.exports = function shallowEqual(objA, objB, compare, compareContext) {
        var ret = compare ? compare.call(compareContext, objA, objB) : void 0;
        if (ret !== void 0) {
          return !!ret;
        }
        if (objA === objB) {
          return true;
        }
        if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
          return false;
        }
        var keysA = Object.keys(objA);
        var keysB = Object.keys(objB);
        if (keysA.length !== keysB.length) {
          return false;
        }
        var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
        for (var idx = 0; idx < keysA.length; idx++) {
          var key = keysA[idx];
          if (!bHasOwnProperty(key)) {
            return false;
          }
          var valueA = objA[key];
          var valueB = objB[key];
          ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;
          if (ret === false || ret === void 0 && valueA !== valueB) {
            return false;
          }
        }
        return true;
      };
    }
  });

  // lib/hooks/useAutoNext.ts
  var import_react = __toESM(require_react());

  // lib/constants/index.ts
  var MAIN_HOST = "https://vmo.17.media";
  var MAIN_HOST_CN = "https://gcscdn-event-cn.17.media";
  var MAIN_HOST_STA = "https://sta-vmo.17.media";
  var MAIN_HOST_STA_CN = "https://sta-cn-mov.17.media";
  var MAIN_HOST_UAT = "https://uat-vmo.17.media";
  var MAIN_HOST_UAT_CN = "https://uat-event-cn.17.media";
  var GOAPI_ENDPOINT = "https://api-dsa.17app.co/api";
  var GOAPI_ENDPOINT_STA = "https://sta-api.17app.co/api";
  var GOAPI_ENDPOINT_UAT = "https://uat-api.17app.co/api";
  var GCP_CDN_DOMAIN = "webcdn.17app.co";
  var GCP_CDN_HOST = `https://${GCP_CDN_DOMAIN}`;
  var LANG_FILE_ENDPOINT = `https://${GCP_CDN_DOMAIN}/campaign/projects`;
  var AVATAR_ENDPOINT = "https://assets-17app.akamaized.net";
  var AVATAR_BASE_URL = `${AVATAR_ENDPOINT}/THUMBNAIL_`;
  var DEFAULT_AVATAR_IMAGE = `https://${GCP_CDN_DOMAIN}/17live/ig-default.svg`;
  var ONLINE_RIM_IMAGE = `https://${GCP_CDN_DOMAIN}/campaign/assets/igOfficialCircle.png`;

  // lib/utils.ts
  var globalThis2 = (1, eval)("this");
  var qs = (search = globalThis2.location ? globalThis2.location.search.slice(1) : "") => search.split("&").filter(Boolean).reduce((o2, keyValue) => {
    const [key, value] = keyValue.split("=");
    if (value === void 0)
      o2[key] = true;
    else
      o2[key] = decodeURIComponent(value);
    return o2;
  }, {});
  var addLeadingZeros = (value) => String(value).length < 2 ? `0${String(value)}` : value;
  var isBrowser = () => typeof window !== "undefined";
  var getRandomInteger = (min, max) => {
    if (min > max) {
      const temp = min;
      min = max;
      max = temp;
    }
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  var isProdVmo17Media = () => window.location.origin === MAIN_HOST || window.location.origin === MAIN_HOST_CN;
  var isStagVmo17Media = () => window.location.origin === MAIN_HOST_STA || window.location.origin === MAIN_HOST_STA_CN;
  var isUatVmo17Media = () => window.location.origin === MAIN_HOST_UAT || window.location.origin === MAIN_HOST_UAT_CN;
  var getGoapiUrl = (env) => {
    if (env === "prod" /* PROD */)
      return GOAPI_ENDPOINT;
    if (env === "sta" /* STA */)
      return GOAPI_ENDPOINT_STA;
    if (env === "uat" /* UAT */)
      return GOAPI_ENDPOINT_UAT;
    return isProdVmo17Media() ? GOAPI_ENDPOINT : isStagVmo17Media() ? GOAPI_ENDPOINT_STA : isUatVmo17Media() ? GOAPI_ENDPOINT_UAT : GOAPI_ENDPOINT_STA;
  };
  var getType = (api, env) => {
    if (env === "prod" /* PROD */)
      return api.prod;
    if (env === "sta" /* STA */)
      return api.sta;
    if (env === "uat" /* UAT */ && api.uat)
      return api.uat;
    return isProdVmo17Media() ? api.prod : isStagVmo17Media() ? api.sta : isUatVmo17Media() && api.uat ? api.uat : api.sta;
  };
  function debounce(func, timeout) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, timeout);
    };
  }
  var cumulativeOffset = (element) => {
    let top = 0;
    let left = 0;
    do {
      top += element.offsetTop || 0;
      left += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);
    return {
      top,
      left
    };
  };
  var getNextLocation = (query) => {
    const queryPath = Object.entries(query).map(
      ([key, value]) => `${key}=${value}`
    );
    const nextLocation = `${globalThis2.location.pathname}?${queryPath.join("&")}`;
    globalThis2.location.href = nextLocation;
  };
  var sleep = (ms) => (
    // eslint-disable-next-line no-promise-executor-return
    new Promise((resolve) => setTimeout(resolve, ms))
  );

  // lib/hooks/useAutoNext.ts
  var useAutoNext = (isEnded, nextPage) => {
    (0, import_react.useEffect)(() => {
      const { page = 1, ...search } = qs();
      if (+page === nextPage)
        return;
      if (isEnded) {
        const query = {
          ...search,
          page: nextPage
        };
        const queryPath = Object.entries(query).map(
          ([key, value]) => `${key}=${value}`
        );
        const nextLocation = `${globalThis2.location.pathname}?${queryPath.join(
          "&"
        )}`;
        globalThis2.location.href = nextLocation;
      }
    }, [isEnded, nextPage]);
  };
  var useAutoNext_default = useAutoNext;

  // lib/hooks/useCountdown.ts
  var import_dad = __toESM(require_src2());
  var import_react2 = __toESM(require_react());
  var TimeStatus = /* @__PURE__ */ ((TimeStatus2) => {
    TimeStatus2[TimeStatus2["NotYet"] = 0] = "NotYet";
    TimeStatus2[TimeStatus2["Ongoing"] = 1] = "Ongoing";
    TimeStatus2[TimeStatus2["Ended"] = 2] = "Ended";
    return TimeStatus2;
  })(TimeStatus || {});
  var day = 1e3 * 60 * 60 * 24;
  var h = 1e3 * 60 * 60;
  var m = 1e3 * 60;
  var formatCountdownText = (times) => `${addLeadingZeros(times.d * 24 + times.h)}:${addLeadingZeros(
    times.m
  )}:${addLeadingZeros(times.s)}`;
  var getRelatedDistance = (dist) => ({
    d: Math.max(0, Math.floor(dist / day)),
    h: Math.max(0, Math.floor(dist / h) % 24),
    m: Math.max(0, Math.floor(dist / m) % 60),
    s: Math.max(0, Math.floor(dist / 1e3) % 60),
    ms: Math.max(0, dist % 1e3)
  });
  function getCurrentStatus(time, start, end) {
    if (time < start) {
      return 0 /* NotYet */;
    }
    if (time > end) {
      return 2 /* Ended */;
    }
    return 1 /* Ongoing */;
  }
  var useCountdown = (start, end, timeEndText) => {
    const timer = (0, import_react2.useRef)(0);
    const [currentTime, setCurrentTime] = (0, import_react2.useState)((0, import_dad.now)() * 1e3);
    const getCurrentTime = () => {
      if (currentTime > start && currentTime < end) {
        setCurrentTime((0, import_dad.now)() * 1e3);
        requestAnimationFrame(getCurrentTime);
      }
    };
    (0, import_react2.useEffect)(() => {
      timer.current = requestAnimationFrame(getCurrentTime);
      return () => {
        cancelAnimationFrame(timer.current);
      };
    }, [getCurrentTime]);
    const countdownTime = end - currentTime;
    const defaultCountdownTime = end - start;
    const status = getCurrentStatus(currentTime, start, end);
    let text;
    if (status === 0 /* NotYet */) {
      text = formatCountdownText(getRelatedDistance(defaultCountdownTime));
    } else if (status === 1 /* Ongoing */) {
      text = formatCountdownText(getRelatedDistance(countdownTime));
    } else {
      text = timeEndText;
    }
    return {
      status,
      text
    };
  };
  var useCountdown_default = useCountdown;

  // lib/hooks/useItemTransition.ts
  var useItemTransition = (itemStyle2, transition, rowItems, currentRank) => {
    const { width, height, offsetX, offsetY } = itemStyle2;
    if (typeof currentRank === "number") {
      const itemTransitionStyle = {
        left: (currentRank - 1) % rowItems * (width + offsetX),
        top: Math.floor((currentRank - 1) / rowItems) * (height + offsetY),
        ...transition
      };
      return {
        itemTransitionStyle
      };
    }
    return {
      itemTransitionStyle: currentRank.map((rank) => ({
        left: (rank - 1) % rowItems * (width + offsetX),
        top: Math.floor((rank - 1) / rowItems) * (height + offsetY),
        position: "absolute",
        ...transition
      }))
    };
  };
  var useItemTransition_default = useItemTransition;

  // lib/hooks/useMockLeaderboard.ts
  var import_react3 = __toESM(require_react());

  // node_modules/uuid/dist/esm-browser/rng.js
  var getRandomValues;
  var rnds8 = new Uint8Array(16);
  function rng() {
    if (!getRandomValues) {
      getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
      if (!getRandomValues) {
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
      }
    }
    return getRandomValues(rnds8);
  }

  // node_modules/uuid/dist/esm-browser/stringify.js
  var byteToHex = [];
  for (let i2 = 0; i2 < 256; ++i2) {
    byteToHex.push((i2 + 256).toString(16).slice(1));
  }
  function unsafeStringify(arr, offset = 0) {
    return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  }

  // node_modules/uuid/dist/esm-browser/native.js
  var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
  var native_default = {
    randomUUID
  };

  // node_modules/uuid/dist/esm-browser/v4.js
  function v4(options, buf, offset) {
    if (native_default.randomUUID && !buf && !options) {
      return native_default.randomUUID();
    }
    options = options || {};
    const rnds = options.random || (options.rng || rng)();
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (let i2 = 0; i2 < 16; ++i2) {
        buf[offset + i2] = rnds[i2];
      }
      return buf;
    }
    return unsafeStringify(rnds);
  }
  var v4_default = v4;

  // lib/hooks/useMockLeaderboard.ts
  var defaultUser = {
    bonus: 0,
    meta: {},
    rank: 0,
    score: 0,
    userInfo: {
      displayName: "",
      gloryroadMode: 0,
      level: 0,
      name: "",
      openID: "",
      picture: "36a80c61-89d9-40b5-803d-5b0437f293c4.jpg",
      region: "TW",
      userID: "",
      onLiveInfo: {
        liveStreamID: "",
        premiumType: 0,
        streamID: 0,
        streamerType: 0
      }
    }
  };
  var usersID = new Array(100).fill(0).map(() => v4_default());
  var createDefaultUser = (id, index, score = 1e3) => ({
    ...defaultUser,
    score,
    rank: index + 1,
    userInfo: {
      ...defaultUser.userInfo,
      displayName: `user${index}`,
      name: `user${index}`,
      openID: `user${index}`,
      picture: "",
      userID: id
    }
  });
  var mockUsers = usersID.map(
    (user, index) => createDefaultUser(user, index)
  );
  var createMockGiftedUsers = (count, limit) => {
    const giftedUsers = new Array(count).fill(0).map(() => {
      const randomUserIndex = Math.floor(limit * Math.random());
      const randomScore = Math.floor(1e4 * Math.random());
      return {
        userID: usersID[randomUserIndex],
        score: randomScore
      };
    });
    return giftedUsers;
  };
  var replaceLeaderboard = (curLeaderboard, limit) => {
    const mockGiftedUsers = createMockGiftedUsers(1, limit);
    const nextLeaderboard = [...curLeaderboard];
    mockGiftedUsers.forEach((user) => {
      const curUser = nextLeaderboard.find(
        (u2) => u2.userInfo.userID === user.userID
      );
      if (!curUser) {
        nextLeaderboard.push(
          createDefaultUser(user.userID, nextLeaderboard.length, user.score)
        );
      } else {
        curUser.score += user.score;
      }
    });
    return nextLeaderboard.sort((a2, b2) => b2.score - a2.score).map((user, index) => ({ ...user, rank: index + 1 }));
  };
  var useMockLeaderboard = (enable = false, initMockList2 = false, stable = false, limit = 100) => {
    const [leaderboard, setLeaderboard] = (0, import_react3.useState)([]);
    const timer = (0, import_react3.useRef)(0);
    (0, import_react3.useEffect)(() => {
      if (initMockList2) {
        setLeaderboard(mockUsers);
      }
    }, [initMockList2]);
    (0, import_react3.useEffect)(() => {
      if (enable && stable) {
        setLeaderboard(mockUsers.slice(0, limit));
      }
      if (enable && !timer.current && !stable) {
        timer.current = window.setInterval(() => {
          setLeaderboard((prev2) => replaceLeaderboard(prev2, limit));
        }, 1e3);
      }
      return () => {
        if (timer.current) {
          clearInterval(timer.current);
          timer.current = 0;
        }
      };
    }, [enable, limit, stable]);
    return { leaderboard };
  };
  var useMockLeaderboard_default = useMockLeaderboard;

  // lib/hooks/usePageData.ts
  var import_dad2 = __toESM(require_src2());
  var usePageData = ({
    startDate,
    endDate,
    nextPage,
    isResultPage,
    endedText,
    test: test2,
    init
  }) => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const { status, text: countdownText } = useCountdown_default(start, end, endedText);
    const isEnded = status === 2 /* Ended */ && (0, import_dad2.now)() < end + 5e3;
    useAutoNext_default(isEnded, nextPage);
    const finalTest = isEnded ? false : test2;
    const { leaderboard: mockLeaderboard } = useMockLeaderboard_default(
      finalTest,
      init,
      isResultPage
    );
    return {
      mockLeaderboard,
      countdownText,
      status
    };
  };
  var usePageData_default = usePageData;

  // lib/hooks/useLuckyDraw.tsx
  var import_react5 = __toESM(require_react());

  // node_modules/tslib/tslib.es6.mjs
  var __assign = function() {
    __assign = Object.assign || function __assign2(t) {
      for (var s2, i2 = 1, n = arguments.length; i2 < n; i2++) {
        s2 = arguments[i2];
        for (var p2 in s2)
          if (Object.prototype.hasOwnProperty.call(s2, p2))
            t[p2] = s2[p2];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  function __spreadArray(to, from2, pack) {
    if (pack || arguments.length === 2)
      for (var i2 = 0, l2 = from2.length, ar; i2 < l2; i2++) {
        if (ar || !(i2 in from2)) {
          if (!ar)
            ar = Array.prototype.slice.call(from2, 0, i2);
          ar[i2] = from2[i2];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from2));
  }

  // node_modules/@emotion/memoize/dist/emotion-memoize.esm.js
  function memoize(fn) {
    var cache = /* @__PURE__ */ Object.create(null);
    return function(arg) {
      if (cache[arg] === void 0)
        cache[arg] = fn(arg);
      return cache[arg];
    };
  }

  // node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js
  var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
  var isPropValid = /* @__PURE__ */ memoize(
    function(prop) {
      return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
    }
    /* Z+1 */
  );

  // node_modules/styled-components/dist/styled-components.browser.esm.js
  var import_react4 = __toESM(require_react());
  var import_shallowequal = __toESM(require_shallowequal());

  // node_modules/stylis/src/Enum.js
  var MS = "-ms-";
  var MOZ = "-moz-";
  var WEBKIT = "-webkit-";
  var COMMENT = "comm";
  var RULESET = "rule";
  var DECLARATION = "decl";
  var IMPORT = "@import";
  var KEYFRAMES = "@keyframes";
  var LAYER = "@layer";

  // node_modules/stylis/src/Utility.js
  var abs = Math.abs;
  var from = String.fromCharCode;
  var assign = Object.assign;
  function hash(value, length2) {
    return charat(value, 0) ^ 45 ? (((length2 << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3) : 0;
  }
  function trim(value) {
    return value.trim();
  }
  function match(value, pattern) {
    return (value = pattern.exec(value)) ? value[0] : value;
  }
  function replace(value, pattern, replacement) {
    return value.replace(pattern, replacement);
  }
  function indexof(value, search) {
    return value.indexOf(search);
  }
  function charat(value, index) {
    return value.charCodeAt(index) | 0;
  }
  function substr(value, begin, end) {
    return value.slice(begin, end);
  }
  function strlen(value) {
    return value.length;
  }
  function sizeof(value) {
    return value.length;
  }
  function append(value, array) {
    return array.push(value), value;
  }
  function combine(array, callback) {
    return array.map(callback).join("");
  }
  function filter(array, pattern) {
    return array.filter(function(value) {
      return !match(value, pattern);
    });
  }

  // node_modules/stylis/src/Tokenizer.js
  var line = 1;
  var column = 1;
  var length = 0;
  var position = 0;
  var character = 0;
  var characters = "";
  function node(value, root, parent, type, props, children, length2, siblings) {
    return { value, root, parent, type, props, children, line, column, length: length2, return: "", siblings };
  }
  function copy(root, props) {
    return assign(node("", null, null, "", null, null, 0, root.siblings), root, { length: -root.length }, props);
  }
  function lift(root) {
    while (root.root)
      root = copy(root.root, { children: [root] });
    append(root, root.siblings);
  }
  function char() {
    return character;
  }
  function prev() {
    character = position > 0 ? charat(characters, --position) : 0;
    if (column--, character === 10)
      column = 1, line--;
    return character;
  }
  function next() {
    character = position < length ? charat(characters, position++) : 0;
    if (column++, character === 10)
      column = 1, line++;
    return character;
  }
  function peek() {
    return charat(characters, position);
  }
  function caret() {
    return position;
  }
  function slice(begin, end) {
    return substr(characters, begin, end);
  }
  function token(type) {
    switch (type) {
      case 0:
      case 9:
      case 10:
      case 13:
      case 32:
        return 5;
      case 33:
      case 43:
      case 44:
      case 47:
      case 62:
      case 64:
      case 126:
      case 59:
      case 123:
      case 125:
        return 4;
      case 58:
        return 3;
      case 34:
      case 39:
      case 40:
      case 91:
        return 2;
      case 41:
      case 93:
        return 1;
    }
    return 0;
  }
  function alloc(value) {
    return line = column = 1, length = strlen(characters = value), position = 0, [];
  }
  function dealloc(value) {
    return characters = "", value;
  }
  function delimit(type) {
    return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
  }
  function whitespace(type) {
    while (character = peek())
      if (character < 33)
        next();
      else
        break;
    return token(type) > 2 || token(character) > 3 ? "" : " ";
  }
  function escaping(index, count) {
    while (--count && next())
      if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
        break;
    return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
  }
  function delimiter(type) {
    while (next())
      switch (character) {
        case type:
          return position;
        case 34:
        case 39:
          if (type !== 34 && type !== 39)
            delimiter(character);
          break;
        case 40:
          if (type === 41)
            delimiter(type);
          break;
        case 92:
          next();
          break;
      }
    return position;
  }
  function commenter(type, index) {
    while (next())
      if (type + character === 47 + 10)
        break;
      else if (type + character === 42 + 42 && peek() === 47)
        break;
    return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
  }
  function identifier(index) {
    while (!token(peek()))
      next();
    return slice(index, position);
  }

  // node_modules/stylis/src/Parser.js
  function compile(value) {
    return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
  }
  function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
    var index = 0;
    var offset = 0;
    var length2 = pseudo;
    var atrule = 0;
    var property = 0;
    var previous = 0;
    var variable = 1;
    var scanning = 1;
    var ampersand = 1;
    var character2 = 0;
    var type = "";
    var props = rules;
    var children = rulesets;
    var reference = rule;
    var characters2 = type;
    while (scanning)
      switch (previous = character2, character2 = next()) {
        case 40:
          if (previous != 108 && charat(characters2, length2 - 1) == 58) {
            if (indexof(characters2 += replace(delimit(character2), "&", "&\f"), "&\f") != -1)
              ampersand = -1;
            break;
          }
        case 34:
        case 39:
        case 91:
          characters2 += delimit(character2);
          break;
        case 9:
        case 10:
        case 13:
        case 32:
          characters2 += whitespace(previous);
          break;
        case 92:
          characters2 += escaping(caret() - 1, 7);
          continue;
        case 47:
          switch (peek()) {
            case 42:
            case 47:
              append(comment(commenter(next(), caret()), root, parent, declarations), declarations);
              break;
            default:
              characters2 += "/";
          }
          break;
        case 123 * variable:
          points[index++] = strlen(characters2) * ampersand;
        case 125 * variable:
        case 59:
        case 0:
          switch (character2) {
            case 0:
            case 125:
              scanning = 0;
            case 59 + offset:
              if (ampersand == -1)
                characters2 = replace(characters2, /\f/g, "");
              if (property > 0 && strlen(characters2) - length2)
                append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1, declarations) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2, declarations), declarations);
              break;
            case 59:
              characters2 += ";";
            default:
              append(reference = ruleset(characters2, root, parent, index, offset, rules, points, type, props = [], children = [], length2, rulesets), rulesets);
              if (character2 === 123)
                if (offset === 0)
                  parse(characters2, root, reference, reference, props, rulesets, length2, points, children);
                else
                  switch (atrule === 99 && charat(characters2, 3) === 110 ? 100 : atrule) {
                    case 100:
                    case 108:
                    case 109:
                    case 115:
                      parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length2, children), children), rules, children, length2, points, rule ? props : children);
                      break;
                    default:
                      parse(characters2, reference, reference, reference, [""], children, 0, points, children);
                  }
          }
          index = offset = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
          break;
        case 58:
          length2 = 1 + strlen(characters2), property = previous;
        default:
          if (variable < 1) {
            if (character2 == 123)
              --variable;
            else if (character2 == 125 && variable++ == 0 && prev() == 125)
              continue;
          }
          switch (characters2 += from(character2), character2 * variable) {
            case 38:
              ampersand = offset > 0 ? 1 : (characters2 += "\f", -1);
              break;
            case 44:
              points[index++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
              break;
            case 64:
              if (peek() === 45)
                characters2 += delimit(next());
              atrule = peek(), offset = length2 = strlen(type = characters2 += identifier(caret())), character2++;
              break;
            case 45:
              if (previous === 45 && strlen(characters2) == 2)
                variable = 0;
          }
      }
    return rulesets;
  }
  function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length2, siblings) {
    var post = offset - 1;
    var rule = offset === 0 ? rules : [""];
    var size2 = sizeof(rule);
    for (var i2 = 0, j2 = 0, k2 = 0; i2 < index; ++i2)
      for (var x2 = 0, y2 = substr(value, post + 1, post = abs(j2 = points[i2])), z2 = value; x2 < size2; ++x2)
        if (z2 = trim(j2 > 0 ? rule[x2] + " " + y2 : replace(y2, /&\f/g, rule[x2])))
          props[k2++] = z2;
    return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length2, siblings);
  }
  function comment(value, root, parent, siblings) {
    return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0, siblings);
  }
  function declaration(value, root, parent, length2, siblings) {
    return node(value, root, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2, siblings);
  }

  // node_modules/stylis/src/Prefixer.js
  function prefix(value, length2, children) {
    switch (hash(value, length2)) {
      case 5103:
        return WEBKIT + "print-" + value + value;
      case 5737:
      case 4201:
      case 3177:
      case 3433:
      case 1641:
      case 4457:
      case 2921:
      case 5572:
      case 6356:
      case 5844:
      case 3191:
      case 6645:
      case 3005:
      case 6391:
      case 5879:
      case 5623:
      case 6135:
      case 4599:
      case 4855:
      case 4215:
      case 6389:
      case 5109:
      case 5365:
      case 5621:
      case 3829:
        return WEBKIT + value + value;
      case 4789:
        return MOZ + value + value;
      case 5349:
      case 4246:
      case 4810:
      case 6968:
      case 2756:
        return WEBKIT + value + MOZ + value + MS + value + value;
      case 5936:
        switch (charat(value, length2 + 11)) {
          case 114:
            return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
          case 108:
            return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
          case 45:
            return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
        }
      case 6828:
      case 4268:
      case 2903:
        return WEBKIT + value + MS + value + value;
      case 6165:
        return WEBKIT + value + MS + "flex-" + value + value;
      case 5187:
        return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + "box-$1$2" + MS + "flex-$1$2") + value;
      case 5443:
        return WEBKIT + value + MS + "flex-item-" + replace(value, /flex-|-self/g, "") + (!match(value, /flex-|baseline/) ? MS + "grid-row-" + replace(value, /flex-|-self/g, "") : "") + value;
      case 4675:
        return WEBKIT + value + MS + "flex-line-pack" + replace(value, /align-content|flex-|-self/g, "") + value;
      case 5548:
        return WEBKIT + value + MS + replace(value, "shrink", "negative") + value;
      case 5292:
        return WEBKIT + value + MS + replace(value, "basis", "preferred-size") + value;
      case 6060:
        return WEBKIT + "box-" + replace(value, "-grow", "") + WEBKIT + value + MS + replace(value, "grow", "positive") + value;
      case 4554:
        return WEBKIT + replace(value, /([^-])(transform)/g, "$1" + WEBKIT + "$2") + value;
      case 6187:
        return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
      case 5495:
      case 3959:
        return replace(value, /(image-set\([^]*)/, WEBKIT + "$1$`$1");
      case 4968:
        return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + "box-pack:$3" + MS + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + WEBKIT + value + value;
      case 4200:
        if (!match(value, /flex-|baseline/))
          return MS + "grid-column-align" + substr(value, length2) + value;
        break;
      case 2592:
      case 3360:
        return MS + replace(value, "template-", "") + value;
      case 4384:
      case 3616:
        if (children && children.some(function(element, index) {
          return length2 = index, match(element.props, /grid-\w+-end/);
        })) {
          return ~indexof(value + (children = children[length2].value), "span") ? value : MS + replace(value, "-start", "") + value + MS + "grid-row-span:" + (~indexof(children, "span") ? match(children, /\d+/) : +match(children, /\d+/) - +match(value, /\d+/)) + ";";
        }
        return MS + replace(value, "-start", "") + value;
      case 4896:
      case 4128:
        return children && children.some(function(element) {
          return match(element.props, /grid-\w+-start/);
        }) ? value : MS + replace(replace(value, "-end", "-span"), "span ", "") + value;
      case 4095:
      case 3583:
      case 4068:
      case 2532:
        return replace(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
      case 8116:
      case 7059:
      case 5753:
      case 5535:
      case 5445:
      case 5701:
      case 4933:
      case 4677:
      case 5533:
      case 5789:
      case 5021:
      case 4765:
        if (strlen(value) - 1 - length2 > 6)
          switch (charat(value, length2 + 1)) {
            case 109:
              if (charat(value, length2 + 4) !== 45)
                break;
            case 102:
              return replace(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length2 + 3) == 108 ? "$3" : "$2-$3")) + value;
            case 115:
              return ~indexof(value, "stretch") ? prefix(replace(value, "stretch", "fill-available"), length2, children) + value : value;
          }
        break;
      case 5152:
      case 5920:
        return replace(value, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(_2, a2, b2, c2, d, e, f2) {
          return MS + a2 + ":" + b2 + f2 + (c2 ? MS + a2 + "-span:" + (d ? e : +e - +b2) + f2 : "") + value;
        });
      case 4949:
        if (charat(value, length2 + 6) === 121)
          return replace(value, ":", ":" + WEBKIT) + value;
        break;
      case 6444:
        switch (charat(value, charat(value, 14) === 45 ? 18 : 11)) {
          case 120:
            return replace(value, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, "$1" + WEBKIT + (charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + WEBKIT + "$2$3$1" + MS + "$2box$3") + value;
          case 100:
            return replace(value, ":", ":" + MS) + value;
        }
        break;
      case 5719:
      case 2647:
      case 2135:
      case 3927:
      case 2391:
        return replace(value, "scroll-", "scroll-snap-") + value;
    }
    return value;
  }

  // node_modules/stylis/src/Serializer.js
  function serialize(children, callback) {
    var output = "";
    for (var i2 = 0; i2 < children.length; i2++)
      output += callback(children[i2], i2, children, callback) || "";
    return output;
  }
  function stringify(element, index, children, callback) {
    switch (element.type) {
      case LAYER:
        if (element.children.length)
          break;
      case IMPORT:
      case DECLARATION:
        return element.return = element.return || element.value;
      case COMMENT:
        return "";
      case KEYFRAMES:
        return element.return = element.value + "{" + serialize(element.children, callback) + "}";
      case RULESET:
        if (!strlen(element.value = element.props.join(",")))
          return "";
    }
    return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
  }

  // node_modules/stylis/src/Middleware.js
  function middleware(collection) {
    var length2 = sizeof(collection);
    return function(element, index, children, callback) {
      var output = "";
      for (var i2 = 0; i2 < length2; i2++)
        output += collection[i2](element, index, children, callback) || "";
      return output;
    };
  }
  function rulesheet(callback) {
    return function(element) {
      if (!element.root) {
        if (element = element.return)
          callback(element);
      }
    };
  }
  function prefixer(element, index, children, callback) {
    if (element.length > -1) {
      if (!element.return)
        switch (element.type) {
          case DECLARATION:
            element.return = prefix(element.value, element.length, children);
            return;
          case KEYFRAMES:
            return serialize([copy(element, { value: replace(element.value, "@", "@" + WEBKIT) })], callback);
          case RULESET:
            if (element.length)
              return combine(children = element.props, function(value) {
                switch (match(value, callback = /(::plac\w+|:read-\w+)/)) {
                  case ":read-only":
                  case ":read-write":
                    lift(copy(element, { props: [replace(value, /:(read-\w+)/, ":" + MOZ + "$1")] }));
                    lift(copy(element, { props: [value] }));
                    assign(element, { props: filter(children, callback) });
                    break;
                  case "::placeholder":
                    lift(copy(element, { props: [replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")] }));
                    lift(copy(element, { props: [replace(value, /:(plac\w+)/, ":" + MOZ + "$1")] }));
                    lift(copy(element, { props: [replace(value, /:(plac\w+)/, MS + "input-$1")] }));
                    lift(copy(element, { props: [value] }));
                    assign(element, { props: filter(children, callback) });
                    break;
                }
                return "";
              });
        }
    }
  }

  // node_modules/@emotion/unitless/dist/emotion-unitless.esm.js
  var unitlessKeys = {
    animationIterationCount: 1,
    aspectRatio: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    // SVG-related properties
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1
  };

  // node_modules/styled-components/dist/styled-components.browser.esm.js
  var f = "undefined" != typeof process && void 0 !== process.env && (process.env.REACT_APP_SC_ATTR || process.env.SC_ATTR) || "data-styled";
  var y = "undefined" != typeof window && "HTMLElement" in window;
  var v = Boolean("boolean" == typeof SC_DISABLE_SPEEDY ? SC_DISABLE_SPEEDY : "undefined" != typeof process && void 0 !== process.env && void 0 !== process.env.REACT_APP_SC_DISABLE_SPEEDY && "" !== process.env.REACT_APP_SC_DISABLE_SPEEDY ? "false" !== process.env.REACT_APP_SC_DISABLE_SPEEDY && process.env.REACT_APP_SC_DISABLE_SPEEDY : "undefined" != typeof process && void 0 !== process.env && void 0 !== process.env.SC_DISABLE_SPEEDY && "" !== process.env.SC_DISABLE_SPEEDY ? "false" !== process.env.SC_DISABLE_SPEEDY && process.env.SC_DISABLE_SPEEDY : true);
  var S = /invalid hook call/i;
  var w = /* @__PURE__ */ new Set();
  var b = function(t, n) {
    if (true) {
      var o2 = n ? ' with the id of "'.concat(n, '"') : "", s2 = "The component ".concat(t).concat(o2, " has been created dynamically.\n") + "You may see this warning because you've called styled inside another component.\nTo resolve this only create new StyledComponents outside of any render method and function component.", i2 = console.error;
      try {
        var a2 = true;
        console.error = function(t2) {
          for (var n2 = [], o3 = 1; o3 < arguments.length; o3++)
            n2[o3 - 1] = arguments[o3];
          S.test(t2) ? (a2 = false, w.delete(s2)) : i2.apply(void 0, __spreadArray([t2], n2, false));
        }, (0, import_react4.useRef)(), a2 && !w.has(s2) && (console.warn(s2), w.add(s2));
      } catch (e) {
        S.test(e.message) && w.delete(s2);
      } finally {
        console.error = i2;
      }
    }
  };
  var E = Object.freeze([]);
  var N = Object.freeze({});
  function P(e, t, n) {
    return void 0 === n && (n = N), e.theme !== n.theme && e.theme || t || n.theme;
  }
  var _ = /* @__PURE__ */ new Set(["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "use", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "marker", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "tspan"]);
  var C = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g;
  var I = /(^-|-$)/g;
  function A(e) {
    return e.replace(C, "-").replace(I, "");
  }
  var O = /(a)(d)/gi;
  var D = function(e) {
    return String.fromCharCode(e + (e > 25 ? 39 : 97));
  };
  function R(e) {
    var t, n = "";
    for (t = Math.abs(e); t > 52; t = t / 52 | 0)
      n = D(t % 52) + n;
    return (D(t % 52) + n).replace(O, "$1-$2");
  }
  var T;
  var k = function(e, t) {
    for (var n = t.length; n; )
      e = 33 * e ^ t.charCodeAt(--n);
    return e;
  };
  var j = function(e) {
    return k(5381, e);
  };
  function x(e) {
    return R(j(e) >>> 0);
  }
  function V(e) {
    return "string" == typeof e && e || e.displayName || e.name || "Component";
  }
  function M(e) {
    return "string" == typeof e && e.charAt(0) === e.charAt(0).toLowerCase();
  }
  var F = "function" == typeof Symbol && Symbol.for;
  var $ = F ? Symbol.for("react.memo") : 60115;
  var z = F ? Symbol.for("react.forward_ref") : 60112;
  var B = { childContextTypes: true, contextType: true, contextTypes: true, defaultProps: true, displayName: true, getDefaultProps: true, getDerivedStateFromError: true, getDerivedStateFromProps: true, mixins: true, propTypes: true, type: true };
  var L = { name: true, length: true, prototype: true, caller: true, callee: true, arguments: true, arity: true };
  var G = { $$typeof: true, compare: true, defaultProps: true, displayName: true, propTypes: true, type: true };
  var Y = ((T = {})[z] = { $$typeof: true, render: true, defaultProps: true, displayName: true, propTypes: true }, T[$] = G, T);
  function W(e) {
    return ("type" in (t = e) && t.type.$$typeof) === $ ? G : "$$typeof" in e ? Y[e.$$typeof] : B;
    var t;
  }
  var q = Object.defineProperty;
  var H = Object.getOwnPropertyNames;
  var U = Object.getOwnPropertySymbols;
  var J = Object.getOwnPropertyDescriptor;
  var X = Object.getPrototypeOf;
  var Z = Object.prototype;
  function K(e, t, n) {
    if ("string" != typeof t) {
      if (Z) {
        var o2 = X(t);
        o2 && o2 !== Z && K(e, o2, n);
      }
      var r2 = H(t);
      U && (r2 = r2.concat(U(t)));
      for (var s2 = W(e), i2 = W(t), a2 = 0; a2 < r2.length; ++a2) {
        var c2 = r2[a2];
        if (!(c2 in L || n && n[c2] || i2 && c2 in i2 || s2 && c2 in s2)) {
          var l2 = J(t, c2);
          try {
            q(e, c2, l2);
          } catch (e2) {
          }
        }
      }
    }
    return e;
  }
  function Q(e) {
    return "function" == typeof e;
  }
  function ee(e) {
    return "object" == typeof e && "styledComponentId" in e;
  }
  function te(e, t) {
    return e && t ? "".concat(e, " ").concat(t) : e || t || "";
  }
  function ne(e, t) {
    if (0 === e.length)
      return "";
    for (var n = e[0], o2 = 1; o2 < e.length; o2++)
      n += t ? t + e[o2] : e[o2];
    return n;
  }
  function oe(e) {
    return null !== e && "object" == typeof e && e.constructor.name === Object.name && !("props" in e && e.$$typeof);
  }
  function re(e, t, n) {
    if (void 0 === n && (n = false), !n && !oe(e) && !Array.isArray(e))
      return t;
    if (Array.isArray(t))
      for (var o2 = 0; o2 < t.length; o2++)
        e[o2] = re(e[o2], t[o2]);
    else if (oe(t))
      for (var o2 in t)
        e[o2] = re(e[o2], t[o2]);
    return e;
  }
  function se(e, t) {
    Object.defineProperty(e, "toString", { value: t });
  }
  var ie = true ? { 1: "Cannot create styled-component for component: %s.\n\n", 2: "Can't collect styles once you've consumed a `ServerStyleSheet`'s styles! `ServerStyleSheet` is a one off instance for each server-side render cycle.\n\n- Are you trying to reuse it across renders?\n- Are you accidentally calling collectStyles twice?\n\n", 3: "Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.\n\n", 4: "The `StyleSheetManager` expects a valid target or sheet prop!\n\n- Does this error occur on the client and is your target falsy?\n- Does this error occur on the server and is the sheet falsy?\n\n", 5: "The clone method cannot be used on the client!\n\n- Are you running in a client-like environment on the server?\n- Are you trying to run SSR on the client?\n\n", 6: "Trying to insert a new style tag, but the given Node is unmounted!\n\n- Are you using a custom target that isn't mounted?\n- Does your document not have a valid head element?\n- Have you accidentally removed a style tag manually?\n\n", 7: 'ThemeProvider: Please return an object from your "theme" prop function, e.g.\n\n```js\ntheme={() => ({})}\n```\n\n', 8: 'ThemeProvider: Please make your "theme" prop an object.\n\n', 9: "Missing document `<head>`\n\n", 10: "Cannot find a StyleSheet instance. Usually this happens if there are multiple copies of styled-components loaded at once. Check out this issue for how to troubleshoot and fix the common cases where this situation can happen: https://github.com/styled-components/styled-components/issues/1941#issuecomment-417862021\n\n", 11: "_This error was replaced with a dev-time warning, it will be deleted for v4 final._ [createGlobalStyle] received children which will not be rendered. Please use the component without passing children elements.\n\n", 12: "It seems you are interpolating a keyframe declaration (%s) into an untagged string. This was supported in styled-components v3, but is not longer supported in v4 as keyframes are now injected on-demand. Please wrap your string in the css\\`\\` helper which ensures the styles are injected correctly. See https://www.styled-components.com/docs/api#css\n\n", 13: "%s is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.\n\n", 14: 'ThemeProvider: "theme" prop is required.\n\n', 15: "A stylis plugin has been supplied that is not named. We need a name for each plugin to be able to prevent styling collisions between different stylis configurations within the same app. Before you pass your plugin to `<StyleSheetManager stylisPlugins={[]}>`, please make sure each plugin is uniquely-named, e.g.\n\n```js\nObject.defineProperty(importedPlugin, 'name', { value: 'some-unique-name' });\n```\n\n", 16: "Reached the limit of how many styled components may be created at group %s.\nYou may only create up to 1,073,741,824 components. If you're creating components dynamically,\nas for instance in your render method then you may be running into this limitation.\n\n", 17: "CSSStyleSheet could not be found on HTMLStyleElement.\nHas styled-components' style tag been unmounted or altered by another script?\n", 18: "ThemeProvider: Please make sure your useTheme hook is within a `<ThemeProvider>`" } : {};
  function ae() {
    for (var e = [], t = 0; t < arguments.length; t++)
      e[t] = arguments[t];
    for (var n = e[0], o2 = [], r2 = 1, s2 = e.length; r2 < s2; r2 += 1)
      o2.push(e[r2]);
    return o2.forEach(function(e2) {
      n = n.replace(/%[a-z]/, e2);
    }), n;
  }
  function ce(t) {
    for (var n = [], o2 = 1; o2 < arguments.length; o2++)
      n[o2 - 1] = arguments[o2];
    return false ? new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(t, " for more information.").concat(n.length > 0 ? " Args: ".concat(n.join(", ")) : "")) : new Error(ae.apply(void 0, __spreadArray([ie[t]], n, false)).trim());
  }
  var le = function() {
    function e(e2) {
      this.groupSizes = new Uint32Array(512), this.length = 512, this.tag = e2;
    }
    return e.prototype.indexOfGroup = function(e2) {
      for (var t = 0, n = 0; n < e2; n++)
        t += this.groupSizes[n];
      return t;
    }, e.prototype.insertRules = function(e2, t) {
      if (e2 >= this.groupSizes.length) {
        for (var n = this.groupSizes, o2 = n.length, r2 = o2; e2 >= r2; )
          if ((r2 <<= 1) < 0)
            throw ce(16, "".concat(e2));
        this.groupSizes = new Uint32Array(r2), this.groupSizes.set(n), this.length = r2;
        for (var s2 = o2; s2 < r2; s2++)
          this.groupSizes[s2] = 0;
      }
      for (var i2 = this.indexOfGroup(e2 + 1), a2 = (s2 = 0, t.length); s2 < a2; s2++)
        this.tag.insertRule(i2, t[s2]) && (this.groupSizes[e2]++, i2++);
    }, e.prototype.clearGroup = function(e2) {
      if (e2 < this.length) {
        var t = this.groupSizes[e2], n = this.indexOfGroup(e2), o2 = n + t;
        this.groupSizes[e2] = 0;
        for (var r2 = n; r2 < o2; r2++)
          this.tag.deleteRule(n);
      }
    }, e.prototype.getGroup = function(e2) {
      var t = "";
      if (e2 >= this.length || 0 === this.groupSizes[e2])
        return t;
      for (var n = this.groupSizes[e2], o2 = this.indexOfGroup(e2), r2 = o2 + n, s2 = o2; s2 < r2; s2++)
        t += "".concat(this.tag.getRule(s2)).concat("/*!sc*/\n");
      return t;
    }, e;
  }();
  var ue = /* @__PURE__ */ new Map();
  var pe = /* @__PURE__ */ new Map();
  var de = 1;
  var he = function(e) {
    if (ue.has(e))
      return ue.get(e);
    for (; pe.has(de); )
      de++;
    var t = de++;
    if ((0 | t) < 0 || t > 1073741824)
      throw ce(16, "".concat(t));
    return ue.set(e, t), pe.set(t, e), t;
  };
  var fe = function(e, t) {
    ue.set(e, t), pe.set(t, e);
  };
  var me = "style[".concat(f, "][").concat("data-styled-version", '="').concat("6.0.7", '"]');
  var ye = new RegExp("^".concat(f, '\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'));
  var ve = function(e, t, n) {
    for (var o2, r2 = n.split(","), s2 = 0, i2 = r2.length; s2 < i2; s2++)
      (o2 = r2[s2]) && e.registerName(t, o2);
  };
  var ge = function(e, t) {
    for (var n, o2 = (null !== (n = t.textContent) && void 0 !== n ? n : "").split("/*!sc*/\n"), r2 = [], s2 = 0, i2 = o2.length; s2 < i2; s2++) {
      var a2 = o2[s2].trim();
      if (a2) {
        var c2 = a2.match(ye);
        if (c2) {
          var l2 = 0 | parseInt(c2[1], 10), u2 = c2[2];
          0 !== l2 && (fe(u2, l2), ve(e, u2, c2[3]), e.getTag().insertRules(l2, r2)), r2.length = 0;
        } else
          r2.push(a2);
      }
    }
  };
  function Se() {
    return "undefined" != typeof __webpack_nonce__ ? __webpack_nonce__ : null;
  }
  var we = function(e) {
    var t = document.head, n = e || t, o2 = document.createElement("style"), r2 = function(e2) {
      var t2 = Array.from(e2.querySelectorAll("style[".concat(f, "]")));
      return t2[t2.length - 1];
    }(n), s2 = void 0 !== r2 ? r2.nextSibling : null;
    o2.setAttribute(f, "active"), o2.setAttribute("data-styled-version", "6.0.7");
    var i2 = Se();
    return i2 && o2.setAttribute("nonce", i2), n.insertBefore(o2, s2), o2;
  };
  var be = function() {
    function e(e2) {
      this.element = we(e2), this.element.appendChild(document.createTextNode("")), this.sheet = function(e3) {
        if (e3.sheet)
          return e3.sheet;
        for (var t = document.styleSheets, n = 0, o2 = t.length; n < o2; n++) {
          var r2 = t[n];
          if (r2.ownerNode === e3)
            return r2;
        }
        throw ce(17);
      }(this.element), this.length = 0;
    }
    return e.prototype.insertRule = function(e2, t) {
      try {
        return this.sheet.insertRule(t, e2), this.length++, true;
      } catch (e3) {
        return false;
      }
    }, e.prototype.deleteRule = function(e2) {
      this.sheet.deleteRule(e2), this.length--;
    }, e.prototype.getRule = function(e2) {
      var t = this.sheet.cssRules[e2];
      return t && t.cssText ? t.cssText : "";
    }, e;
  }();
  var Ee = function() {
    function e(e2) {
      this.element = we(e2), this.nodes = this.element.childNodes, this.length = 0;
    }
    return e.prototype.insertRule = function(e2, t) {
      if (e2 <= this.length && e2 >= 0) {
        var n = document.createTextNode(t);
        return this.element.insertBefore(n, this.nodes[e2] || null), this.length++, true;
      }
      return false;
    }, e.prototype.deleteRule = function(e2) {
      this.element.removeChild(this.nodes[e2]), this.length--;
    }, e.prototype.getRule = function(e2) {
      return e2 < this.length ? this.nodes[e2].textContent : "";
    }, e;
  }();
  var Ne = function() {
    function e(e2) {
      this.rules = [], this.length = 0;
    }
    return e.prototype.insertRule = function(e2, t) {
      return e2 <= this.length && (this.rules.splice(e2, 0, t), this.length++, true);
    }, e.prototype.deleteRule = function(e2) {
      this.rules.splice(e2, 1), this.length--;
    }, e.prototype.getRule = function(e2) {
      return e2 < this.length ? this.rules[e2] : "";
    }, e;
  }();
  var Pe = y;
  var _e = { isServer: !y, useCSSOMInjection: !v };
  var Ce = function() {
    function e(e2, n, o2) {
      void 0 === e2 && (e2 = N), void 0 === n && (n = {});
      var r2 = this;
      this.options = __assign(__assign({}, _e), e2), this.gs = n, this.names = new Map(o2), this.server = !!e2.isServer, !this.server && y && Pe && (Pe = false, function(e3) {
        for (var t = document.querySelectorAll(me), n2 = 0, o3 = t.length; n2 < o3; n2++) {
          var r3 = t[n2];
          r3 && "active" !== r3.getAttribute(f) && (ge(e3, r3), r3.parentNode && r3.parentNode.removeChild(r3));
        }
      }(this)), se(this, function() {
        return function(e3) {
          for (var t = e3.getTag(), n2 = t.length, o3 = "", r3 = function(n3) {
            var r4 = function(e4) {
              return pe.get(e4);
            }(n3);
            if (void 0 === r4)
              return "continue";
            var s3 = e3.names.get(r4), i2 = t.getGroup(n3);
            if (void 0 === s3 || 0 === i2.length)
              return "continue";
            var a2 = "".concat(f, ".g").concat(n3, '[id="').concat(r4, '"]'), c2 = "";
            void 0 !== s3 && s3.forEach(function(e4) {
              e4.length > 0 && (c2 += "".concat(e4, ","));
            }), o3 += "".concat(i2).concat(a2, '{content:"').concat(c2, '"}').concat("/*!sc*/\n");
          }, s2 = 0; s2 < n2; s2++)
            r3(s2);
          return o3;
        }(r2);
      });
    }
    return e.registerId = function(e2) {
      return he(e2);
    }, e.prototype.reconstructWithOptions = function(n, o2) {
      return void 0 === o2 && (o2 = true), new e(__assign(__assign({}, this.options), n), this.gs, o2 && this.names || void 0);
    }, e.prototype.allocateGSInstance = function(e2) {
      return this.gs[e2] = (this.gs[e2] || 0) + 1;
    }, e.prototype.getTag = function() {
      return this.tag || (this.tag = (e2 = function(e3) {
        var t = e3.useCSSOMInjection, n = e3.target;
        return e3.isServer ? new Ne(n) : t ? new be(n) : new Ee(n);
      }(this.options), new le(e2)));
      var e2;
    }, e.prototype.hasNameForId = function(e2, t) {
      return this.names.has(e2) && this.names.get(e2).has(t);
    }, e.prototype.registerName = function(e2, t) {
      if (he(e2), this.names.has(e2))
        this.names.get(e2).add(t);
      else {
        var n = /* @__PURE__ */ new Set();
        n.add(t), this.names.set(e2, n);
      }
    }, e.prototype.insertRules = function(e2, t, n) {
      this.registerName(e2, t), this.getTag().insertRules(he(e2), n);
    }, e.prototype.clearNames = function(e2) {
      this.names.has(e2) && this.names.get(e2).clear();
    }, e.prototype.clearRules = function(e2) {
      this.getTag().clearGroup(he(e2)), this.clearNames(e2);
    }, e.prototype.clearTag = function() {
      this.tag = void 0;
    }, e;
  }();
  var Ie = /&/g;
  var Ae = /^\s*\/\/.*$/gm;
  function Oe(e, t) {
    return e.map(function(e2) {
      return "rule" === e2.type && (e2.value = "".concat(t, " ").concat(e2.value), e2.value = e2.value.replaceAll(",", ",".concat(t, " ")), e2.props = e2.props.map(function(e3) {
        return "".concat(t, " ").concat(e3);
      })), Array.isArray(e2.children) && "@keyframes" !== e2.type && (e2.children = Oe(e2.children, t)), e2;
    });
  }
  function De(e) {
    var t, n, o2, r2 = void 0 === e ? N : e, s2 = r2.options, i2 = void 0 === s2 ? N : s2, a2 = r2.plugins, c2 = void 0 === a2 ? E : a2, l2 = function(e2, o3, r3) {
      return r3 === n || r3.startsWith(n) && r3.endsWith(n) && r3.replaceAll(n, "").length > 0 ? ".".concat(t) : e2;
    }, u2 = c2.slice();
    u2.push(function(e2) {
      e2.type === RULESET && e2.value.includes("&") && (e2.props[0] = e2.props[0].replace(Ie, n).replace(o2, l2));
    }), i2.prefix && u2.push(prefixer), u2.push(stringify);
    var p2 = function(e2, r3, s3, a3) {
      void 0 === r3 && (r3 = ""), void 0 === s3 && (s3 = ""), void 0 === a3 && (a3 = "&"), t = a3, n = r3, o2 = new RegExp("\\".concat(n, "\\b"), "g");
      var c3 = e2.replace(Ae, ""), l3 = compile(s3 || r3 ? "".concat(s3, " ").concat(r3, " { ").concat(c3, " }") : c3);
      i2.namespace && (l3 = Oe(l3, i2.namespace));
      var p3 = [];
      return serialize(l3, middleware(u2.concat(rulesheet(function(e3) {
        return p3.push(e3);
      })))), p3;
    };
    return p2.hash = c2.length ? c2.reduce(function(e2, t2) {
      return t2.name || ce(15), k(e2, t2.name);
    }, 5381).toString() : "", p2;
  }
  var Re = new Ce();
  var Te = De();
  var ke = import_react4.default.createContext({ shouldForwardProp: void 0, styleSheet: Re, stylis: Te });
  var je = ke.Consumer;
  var xe = import_react4.default.createContext(void 0);
  function Ve() {
    return (0, import_react4.useContext)(ke);
  }
  function Me(e) {
    var t = (0, import_react4.useState)(e.stylisPlugins), n = t[0], r2 = t[1], c2 = Ve().styleSheet, l2 = (0, import_react4.useMemo)(function() {
      var t2 = c2;
      return e.sheet ? t2 = e.sheet : e.target && (t2 = t2.reconstructWithOptions({ target: e.target }, false)), e.disableCSSOMInjection && (t2 = t2.reconstructWithOptions({ useCSSOMInjection: false })), t2;
    }, [e.disableCSSOMInjection, e.sheet, e.target, c2]), u2 = (0, import_react4.useMemo)(function() {
      return De({ options: { namespace: e.namespace, prefix: e.enableVendorPrefixes }, plugins: n });
    }, [e.enableVendorPrefixes, e.namespace, n]);
    return (0, import_react4.useEffect)(function() {
      (0, import_shallowequal.default)(n, e.stylisPlugins) || r2(e.stylisPlugins);
    }, [e.stylisPlugins]), import_react4.default.createElement(ke.Provider, { value: { shouldForwardProp: e.shouldForwardProp, styleSheet: l2, stylis: u2 } }, import_react4.default.createElement(xe.Provider, { value: u2 }, e.children));
  }
  var Fe = function() {
    function e(e2, t) {
      var n = this;
      this.inject = function(e3, t2) {
        void 0 === t2 && (t2 = Te);
        var o2 = n.name + t2.hash;
        e3.hasNameForId(n.id, o2) || e3.insertRules(n.id, o2, t2(n.rules, o2, "@keyframes"));
      }, this.name = e2, this.id = "sc-keyframes-".concat(e2), this.rules = t, se(this, function() {
        throw ce(12, String(n.name));
      });
    }
    return e.prototype.getName = function(e2) {
      return void 0 === e2 && (e2 = Te), this.name + e2.hash;
    }, e;
  }();
  var $e = function(e) {
    return e >= "A" && e <= "Z";
  };
  function ze(e) {
    for (var t = "", n = 0; n < e.length; n++) {
      var o2 = e[n];
      if (1 === n && "-" === o2 && "-" === e[0])
        return e;
      $e(o2) ? t += "-" + o2.toLowerCase() : t += o2;
    }
    return t.startsWith("ms-") ? "-" + t : t;
  }
  var Be = function(e) {
    return null == e || false === e || "" === e;
  };
  var Le = function(t) {
    var n, o2, r2 = [];
    for (var s2 in t) {
      var i2 = t[s2];
      t.hasOwnProperty(s2) && !Be(i2) && (Array.isArray(i2) && i2.isCss || Q(i2) ? r2.push("".concat(ze(s2), ":"), i2, ";") : oe(i2) ? r2.push.apply(r2, __spreadArray(__spreadArray(["".concat(s2, " {")], Le(i2), false), ["}"], false)) : r2.push("".concat(ze(s2), ": ").concat((n = s2, null == (o2 = i2) || "boolean" == typeof o2 || "" === o2 ? "" : "number" != typeof o2 || 0 === o2 || n in unitlessKeys || n.startsWith("--") ? String(o2).trim() : "".concat(o2, "px")), ";")));
    }
    return r2;
  };
  function Ge(e, t, n, o2) {
    if (Be(e))
      return [];
    if (ee(e))
      return [".".concat(e.styledComponentId)];
    if (Q(e)) {
      if (!Q(s2 = e) || s2.prototype && s2.prototype.isReactComponent || !t)
        return [e];
      var r2 = e(t);
      return "object" != typeof r2 || Array.isArray(r2) || r2 instanceof Fe || oe(r2) || null === r2 || console.error("".concat(V(e), " is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.")), Ge(r2, t, n, o2);
    }
    var s2;
    return e instanceof Fe ? n ? (e.inject(n, o2), [e.getName(o2)]) : [e] : oe(e) ? Le(e) : Array.isArray(e) ? Array.prototype.concat.apply(E, e.map(function(e2) {
      return Ge(e2, t, n, o2);
    })) : [e.toString()];
  }
  function Ye(e) {
    for (var t = 0; t < e.length; t += 1) {
      var n = e[t];
      if (Q(n) && !ee(n))
        return false;
    }
    return true;
  }
  var We = j("6.0.7");
  var qe = function() {
    function e(e2, t, n) {
      this.rules = e2, this.staticRulesId = "", this.isStatic = false, this.componentId = t, this.baseHash = k(We, t), this.baseStyle = n, Ce.registerId(t);
    }
    return e.prototype.generateAndInjectStyles = function(e2, t, n) {
      var o2 = this.baseStyle ? this.baseStyle.generateAndInjectStyles(e2, t, n) : "";
      if (this.isStatic && !n.hash)
        if (this.staticRulesId && t.hasNameForId(this.componentId, this.staticRulesId))
          o2 = te(o2, this.staticRulesId);
        else {
          var r2 = ne(Ge(this.rules, e2, t, n)), s2 = R(k(this.baseHash, r2) >>> 0);
          if (!t.hasNameForId(this.componentId, s2)) {
            var i2 = n(r2, ".".concat(s2), void 0, this.componentId);
            t.insertRules(this.componentId, s2, i2);
          }
          o2 = te(o2, s2), this.staticRulesId = s2;
        }
      else {
        for (var a2 = k(this.baseHash, n.hash), c2 = "", l2 = 0; l2 < this.rules.length; l2++) {
          var u2 = this.rules[l2];
          if ("string" == typeof u2)
            c2 += u2, a2 = k(a2, u2);
          else if (u2) {
            var p2 = ne(Ge(u2, e2, t, n));
            a2 = k(a2, p2), c2 += p2;
          }
        }
        if (c2) {
          var d = R(a2 >>> 0);
          t.hasNameForId(this.componentId, d) || t.insertRules(this.componentId, d, n(c2, ".".concat(d), void 0, this.componentId)), o2 = te(o2, d);
        }
      }
      return o2;
    }, e;
  }();
  var He = import_react4.default.createContext(void 0);
  var Ue = He.Consumer;
  var Ze = {};
  var Ke = /* @__PURE__ */ new Set();
  function Qe(e, r2, s2) {
    var i2 = ee(e), a2 = e, c2 = !M(e), p2 = r2.attrs, d = void 0 === p2 ? E : p2, h2 = r2.componentId, f2 = void 0 === h2 ? function(e2, t) {
      var n = "string" != typeof e2 ? "sc" : A(e2);
      Ze[n] = (Ze[n] || 0) + 1;
      var o2 = "".concat(n, "-").concat(x("6.0.7" + n + Ze[n]));
      return t ? "".concat(t, "-").concat(o2) : o2;
    }(r2.displayName, r2.parentComponentId) : h2, m2 = r2.displayName, y2 = void 0 === m2 ? function(e2) {
      return M(e2) ? "styled.".concat(e2) : "Styled(".concat(V(e2), ")");
    }(e) : m2, v2 = r2.displayName && r2.componentId ? "".concat(A(r2.displayName), "-").concat(r2.componentId) : r2.componentId || f2, g = i2 && a2.attrs ? a2.attrs.concat(d).filter(Boolean) : d, S2 = r2.shouldForwardProp;
    if (i2 && a2.shouldForwardProp) {
      var w2 = a2.shouldForwardProp;
      if (r2.shouldForwardProp) {
        var C2 = r2.shouldForwardProp;
        S2 = function(e2, t) {
          return w2(e2, t) && C2(e2, t);
        };
      } else
        S2 = w2;
    }
    var I2 = new qe(s2, v2, i2 ? a2.componentStyle : void 0);
    function O2(e2, r3) {
      return function(e3, r4, s3) {
        var i3 = e3.attrs, a3 = e3.componentStyle, c3 = e3.defaultProps, p3 = e3.foldedComponentIds, d2 = e3.styledComponentId, h3 = e3.target, f3 = import_react4.default.useContext(He), m3 = Ve(), y3 = e3.shouldForwardProp || m3.shouldForwardProp;
        (0, import_react4.useDebugValue)(d2);
        var v3 = function(e4, n, o2) {
          for (var r5, s4 = __assign(__assign({}, n), { className: void 0, theme: o2 }), i4 = 0; i4 < e4.length; i4 += 1) {
            var a4 = Q(r5 = e4[i4]) ? r5(s4) : r5;
            for (var c4 in a4)
              s4[c4] = "className" === c4 ? te(s4[c4], a4[c4]) : "style" === c4 ? __assign(__assign({}, s4[c4]), a4[c4]) : a4[c4];
          }
          return n.className && (s4.className = te(s4.className, n.className)), s4;
        }(i3, r4, P(r4, f3, c3) || N), g2 = v3.as || h3, S3 = {};
        for (var w3 in v3)
          void 0 === v3[w3] || "$" === w3[0] || "as" === w3 || "theme" === w3 || ("forwardedAs" === w3 ? S3.as = v3.forwardedAs : y3 && !y3(w3, g2) || (S3[w3] = v3[w3], y3 || false || isPropValid(w3) || Ke.has(w3) || !_.has(g2) || (Ke.add(w3), console.warn('styled-components: it looks like an unknown prop "'.concat(w3, '" is being sent through to the DOM, which will likely trigger a React console error. If you would like automatic filtering of unknown props, you can opt-into that behavior via `<StyleSheetManager shouldForwardProp={...}>` (connect an API like `@emotion/is-prop-valid`) or consider using transient props (`$` prefix for automatic filtering.)')))));
        var b2 = function(e4, t) {
          var n = Ve(), o2 = e4.generateAndInjectStyles(t, n.styleSheet, n.stylis);
          return (0, import_react4.useDebugValue)(o2), o2;
        }(a3, v3);
        e3.warnTooManyClasses && e3.warnTooManyClasses(b2);
        var E2 = te(p3, d2);
        return b2 && (E2 += " " + b2), v3.className && (E2 += " " + v3.className), S3[M(g2) && !_.has(g2) ? "class" : "className"] = E2, S3.ref = s3, (0, import_react4.createElement)(g2, S3);
      }(D2, e2, r3);
    }
    O2.displayName = y2;
    var D2 = import_react4.default.forwardRef(O2);
    return D2.attrs = g, D2.componentStyle = I2, D2.shouldForwardProp = S2, D2.displayName = y2, D2.foldedComponentIds = i2 ? te(a2.foldedComponentIds, a2.styledComponentId) : "", D2.styledComponentId = v2, D2.target = i2 ? a2.target : e, Object.defineProperty(D2, "defaultProps", { get: function() {
      return this._foldedDefaultProps;
    }, set: function(e2) {
      this._foldedDefaultProps = i2 ? function(e3) {
        for (var t = [], n = 1; n < arguments.length; n++)
          t[n - 1] = arguments[n];
        for (var o2 = 0, r3 = t; o2 < r3.length; o2++)
          re(e3, r3[o2], true);
        return e3;
      }({}, a2.defaultProps, e2) : e2;
    } }), b(y2, v2), D2.warnTooManyClasses = /* @__PURE__ */ function(e2, t) {
      var n = {}, o2 = false;
      return function(r3) {
        if (!o2 && (n[r3] = true, Object.keys(n).length >= 200)) {
          var s3 = t ? ' with the id of "'.concat(t, '"') : "";
          console.warn("Over ".concat(200, " classes were generated for component ").concat(e2).concat(s3, ".\n") + "Consider using the attrs method, together with a style object for frequently changed styles.\nExample:\n  const Component = styled.div.attrs(props => ({\n    style: {\n      background: props.background,\n    },\n  }))`width: 100%;`\n\n  <Component />"), o2 = true, n = {};
        }
      };
    }(y2, v2), se(D2, function() {
      return ".".concat(D2.styledComponentId);
    }), c2 && K(D2, e, { attrs: true, componentStyle: true, displayName: true, foldedComponentIds: true, shouldForwardProp: true, styledComponentId: true, target: true }), D2;
  }
  function et(e, t) {
    for (var n = [e[0]], o2 = 0, r2 = t.length; o2 < r2; o2 += 1)
      n.push(t[o2], e[o2 + 1]);
    return n;
  }
  var tt = function(e) {
    return Object.assign(e, { isCss: true });
  };
  function nt(t) {
    for (var n = [], o2 = 1; o2 < arguments.length; o2++)
      n[o2 - 1] = arguments[o2];
    if (Q(t) || oe(t)) {
      var r2 = t;
      return tt(Ge(et(E, __spreadArray([r2], n, true))));
    }
    var s2 = t;
    return 0 === n.length && 1 === s2.length && "string" == typeof s2[0] ? Ge(s2) : tt(Ge(et(s2, n)));
  }
  function ot(n, o2, r2) {
    if (void 0 === r2 && (r2 = N), !o2)
      throw ce(1, o2);
    var s2 = function(t) {
      for (var s3 = [], i2 = 1; i2 < arguments.length; i2++)
        s3[i2 - 1] = arguments[i2];
      return n(o2, r2, nt.apply(void 0, __spreadArray([t], s3, false)));
    };
    return s2.attrs = function(e) {
      return ot(n, o2, __assign(__assign({}, r2), { attrs: Array.prototype.concat(r2.attrs, e).filter(Boolean) }));
    }, s2.withConfig = function(e) {
      return ot(n, o2, __assign(__assign({}, r2), e));
    }, s2;
  }
  var rt = function(e) {
    return ot(Qe, e);
  };
  var st = rt;
  _.forEach(function(e) {
    st[e] = rt(e);
  });
  var it = function() {
    function e(e2, t) {
      this.rules = e2, this.componentId = t, this.isStatic = Ye(e2), Ce.registerId(this.componentId + 1);
    }
    return e.prototype.createStyles = function(e2, t, n, o2) {
      var r2 = o2(ne(Ge(this.rules, t, n, o2)), ""), s2 = this.componentId + e2;
      n.insertRules(s2, s2, r2);
    }, e.prototype.removeStyles = function(e2, t) {
      t.clearRules(this.componentId + e2);
    }, e.prototype.renderStyles = function(e2, t, n, o2) {
      e2 > 2 && Ce.registerId(this.componentId + e2), this.removeStyles(e2, n), this.createStyles(e2, t, n, o2);
    }, e;
  }();
  var ut = function() {
    function e() {
      var e2 = this;
      this._emitSheetCSS = function() {
        var t = e2.instance.toString(), n = Se(), o2 = ne([n && 'nonce="'.concat(n, '"'), "".concat(f, '="true"'), "".concat("data-styled-version", '="').concat("6.0.7", '"')].filter(Boolean), " ");
        return "<style ".concat(o2, ">").concat(t, "</style>");
      }, this.getStyleTags = function() {
        if (e2.sealed)
          throw ce(2);
        return e2._emitSheetCSS();
      }, this.getStyleElement = function() {
        var n;
        if (e2.sealed)
          throw ce(2);
        var r2 = ((n = {})[f] = "", n["data-styled-version"] = "6.0.7", n.dangerouslySetInnerHTML = { __html: e2.instance.toString() }, n), s2 = Se();
        return s2 && (r2.nonce = s2), [import_react4.default.createElement("style", __assign({}, r2, { key: "sc-0-0" }))];
      }, this.seal = function() {
        e2.sealed = true;
      }, this.instance = new Ce({ isServer: true }), this.sealed = false;
    }
    return e.prototype.collectStyles = function(e2) {
      if (this.sealed)
        throw ce(2);
      return import_react4.default.createElement(Me, { sheet: this.instance }, e2);
    }, e.prototype.interleaveWithNodeStream = function(e2) {
      throw ce(3);
    }, e;
  }();
  "undefined" != typeof navigator && "ReactNative" === navigator.product && console.warn("It looks like you've imported 'styled-components' on React Native.\nPerhaps you're looking to import 'styled-components/native'?\nRead more about this at https://www.styled-components.com/docs/basics#react-native");
  var dt = "__sc-".concat(f, "__");
  "undefined" != typeof window && (window[dt] || (window[dt] = 0), 1 === window[dt] && console.warn("It looks like there are several instances of 'styled-components' initialized in this application. This may cause dynamic styles to not render properly, errors during the rehydration process, a missing theme prop, and makes your application bigger without good reason.\n\nSee https://s-c.sh/2BAXzed for more info."), window[dt] += 1);

  // lib/hooks/useLuckyDraw.tsx
  var maskDiv = st.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
  var StyledMaskDivOuter = st(maskDiv)`
  background: #1b1818;
`;
  var StyledMaskDivInner = st(maskDiv)`
  background: white;
  border-radius: 50%;
  animation: show 0.5s;

  @keyframes show {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1.5);
    }
  }
`;
  var MaskDiv = () => /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, /* @__PURE__ */ import_react5.default.createElement(StyledMaskDivOuter, null), /* @__PURE__ */ import_react5.default.createElement(StyledMaskDivInner, null));
  var useLuckyDraw = (allCandidates, willAutoDrawRemainCount = true) => {
    const [candidates, setCandidates] = (0, import_react5.useState)([]);
    const [winners, setWinners] = (0, import_react5.useState)([]);
    const [allWinners, setAllWinners] = (0, import_react5.useState)([]);
    const [currentRound, setCurrentRound] = (0, import_react5.useState)(0);
    const [hasDraw, setHasDraw] = (0, import_react5.useState)(false);
    const draw = (drawCount) => {
      if (!drawCount) {
        console.warn("can not draw without drawCount.");
        return;
      }
      if (!candidates.length) {
        console.warn("can not draw without candidates.");
        return;
      }
      if (!willAutoDrawRemainCount && drawCount > candidates.length) {
        console.warn("remain candidates is less than winners count.");
        return;
      }
      setHasDraw(true);
      let nonRepeatWinnersIndex = [];
      const getNonRepeatWinnerIndex = () => {
        const winnerIndex = getRandomInteger(0, candidates.length - 1);
        if (nonRepeatWinnersIndex.includes(winnerIndex)) {
          return getNonRepeatWinnerIndex();
        }
        nonRepeatWinnersIndex = [...nonRepeatWinnersIndex, winnerIndex];
        return winnerIndex;
      };
      const roundWinnersCount = willAutoDrawRemainCount && drawCount > candidates.length ? candidates.length : drawCount;
      const winnersIndex = new Array(roundWinnersCount).fill(0).map(getNonRepeatWinnerIndex);
      const remainCandidates = candidates.filter((_2, index) => !winnersIndex.includes(index)).sort((a2, b2) => a2.rank - b2.rank);
      const roundWinners = candidates.filter((_2, index) => winnersIndex.includes(index)).sort((a2, b2) => a2.rank - b2.rank);
      setCurrentRound((prevRound) => prevRound + 1);
      setCandidates(remainCandidates);
      setWinners(roundWinners);
      setAllWinners((preAllWinners) => {
        const newAllWinners = [...preAllWinners, roundWinners];
        if (isBrowser()) {
          localStorage.setItem(
            globalThis2.location.href,
            JSON.stringify(newAllWinners)
          );
        }
        return newAllWinners;
      });
      setTimeout(() => {
        setHasDraw(false);
      }, 500);
    };
    const clearWinners = () => setWinners([]);
    const reset = () => {
      setCurrentRound(0);
      setCandidates(allCandidates);
      setWinners([]);
      setAllWinners([]);
      if (isBrowser()) {
        localStorage.removeItem(globalThis2.location.href);
      }
    };
    (0, import_react5.useEffect)(() => {
      if (currentRound !== 0) {
        return;
      }
      setCandidates((prevCandidates) => {
        const sortAllCandidates = allCandidates.sort((a2, b2) => a2.rank - b2.rank);
        if (prevCandidates.length === 0 || JSON.stringify(prevCandidates) !== JSON.stringify(sortAllCandidates)) {
          return sortAllCandidates;
        }
        return prevCandidates;
      });
    }, [allCandidates, currentRound]);
    return {
      candidates,
      hasDraw,
      winners,
      allWinners,
      draw,
      clearWinners,
      reset,
      currentRound,
      MaskDiv
    };
  };

  // lib/hooks/useSyncScroll.ts
  var import_react6 = __toESM(require_react());
  var useSyncScroll = () => {
    const elPoolRef = (0, import_react6.useRef)([]);
    const handleScroll = (e) => {
      if (!elPoolRef.current)
        return;
      Array.from(elPoolRef.current).forEach((el) => {
        el.scrollTop = e.target.scrollTop;
      });
    };
    return {
      handleScroll,
      elPoolRef
    };
  };

  // lib/hooks/useTypeApi.ts
  var import_react7 = __toESM(require_react());

  // node_modules/axios/lib/helpers/bind.js
  function bind(fn, thisArg) {
    return function wrap() {
      return fn.apply(thisArg, arguments);
    };
  }

  // node_modules/axios/lib/utils.js
  var { toString } = Object.prototype;
  var { getPrototypeOf } = Object;
  var kindOf = /* @__PURE__ */ ((cache) => (thing) => {
    const str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  })(/* @__PURE__ */ Object.create(null));
  var kindOfTest = (type) => {
    type = type.toLowerCase();
    return (thing) => kindOf(thing) === type;
  };
  var typeOfTest = (type) => (thing) => typeof thing === type;
  var { isArray } = Array;
  var isUndefined = typeOfTest("undefined");
  function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
  }
  var isArrayBuffer = kindOfTest("ArrayBuffer");
  function isArrayBufferView(val) {
    let result;
    if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
      result = ArrayBuffer.isView(val);
    } else {
      result = val && val.buffer && isArrayBuffer(val.buffer);
    }
    return result;
  }
  var isString = typeOfTest("string");
  var isFunction = typeOfTest("function");
  var isNumber = typeOfTest("number");
  var isObject = (thing) => thing !== null && typeof thing === "object";
  var isBoolean = (thing) => thing === true || thing === false;
  var isPlainObject = (val) => {
    if (kindOf(val) !== "object") {
      return false;
    }
    const prototype3 = getPrototypeOf(val);
    return (prototype3 === null || prototype3 === Object.prototype || Object.getPrototypeOf(prototype3) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
  };
  var isDate = kindOfTest("Date");
  var isFile = kindOfTest("File");
  var isBlob = kindOfTest("Blob");
  var isFileList = kindOfTest("FileList");
  var isStream = (val) => isObject(val) && isFunction(val.pipe);
  var isFormData = (thing) => {
    let kind;
    return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
    kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]"));
  };
  var isURLSearchParams = kindOfTest("URLSearchParams");
  var trim2 = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  function forEach(obj, fn, { allOwnKeys = false } = {}) {
    if (obj === null || typeof obj === "undefined") {
      return;
    }
    let i2;
    let l2;
    if (typeof obj !== "object") {
      obj = [obj];
    }
    if (isArray(obj)) {
      for (i2 = 0, l2 = obj.length; i2 < l2; i2++) {
        fn.call(null, obj[i2], i2, obj);
      }
    } else {
      const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
      const len = keys.length;
      let key;
      for (i2 = 0; i2 < len; i2++) {
        key = keys[i2];
        fn.call(null, obj[key], key, obj);
      }
    }
  }
  function findKey(obj, key) {
    key = key.toLowerCase();
    const keys = Object.keys(obj);
    let i2 = keys.length;
    let _key;
    while (i2-- > 0) {
      _key = keys[i2];
      if (key === _key.toLowerCase()) {
        return _key;
      }
    }
    return null;
  }
  var _global = (() => {
    if (typeof globalThis !== "undefined")
      return globalThis;
    return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
  })();
  var isContextDefined = (context) => !isUndefined(context) && context !== _global;
  function merge() {
    const { caseless } = isContextDefined(this) && this || {};
    const result = {};
    const assignValue = (val, key) => {
      const targetKey = caseless && findKey(result, key) || key;
      if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
        result[targetKey] = merge(result[targetKey], val);
      } else if (isPlainObject(val)) {
        result[targetKey] = merge({}, val);
      } else if (isArray(val)) {
        result[targetKey] = val.slice();
      } else {
        result[targetKey] = val;
      }
    };
    for (let i2 = 0, l2 = arguments.length; i2 < l2; i2++) {
      arguments[i2] && forEach(arguments[i2], assignValue);
    }
    return result;
  }
  var extend = (a2, b2, thisArg, { allOwnKeys } = {}) => {
    forEach(b2, (val, key) => {
      if (thisArg && isFunction(val)) {
        a2[key] = bind(val, thisArg);
      } else {
        a2[key] = val;
      }
    }, { allOwnKeys });
    return a2;
  };
  var stripBOM = (content) => {
    if (content.charCodeAt(0) === 65279) {
      content = content.slice(1);
    }
    return content;
  };
  var inherits = (constructor, superConstructor, props, descriptors2) => {
    constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
    constructor.prototype.constructor = constructor;
    Object.defineProperty(constructor, "super", {
      value: superConstructor.prototype
    });
    props && Object.assign(constructor.prototype, props);
  };
  var toFlatObject = (sourceObj, destObj, filter3, propFilter) => {
    let props;
    let i2;
    let prop;
    const merged = {};
    destObj = destObj || {};
    if (sourceObj == null)
      return destObj;
    do {
      props = Object.getOwnPropertyNames(sourceObj);
      i2 = props.length;
      while (i2-- > 0) {
        prop = props[i2];
        if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
          destObj[prop] = sourceObj[prop];
          merged[prop] = true;
        }
      }
      sourceObj = filter3 !== false && getPrototypeOf(sourceObj);
    } while (sourceObj && (!filter3 || filter3(sourceObj, destObj)) && sourceObj !== Object.prototype);
    return destObj;
  };
  var endsWith = (str, searchString, position2) => {
    str = String(str);
    if (position2 === void 0 || position2 > str.length) {
      position2 = str.length;
    }
    position2 -= searchString.length;
    const lastIndex = str.indexOf(searchString, position2);
    return lastIndex !== -1 && lastIndex === position2;
  };
  var toArray = (thing) => {
    if (!thing)
      return null;
    if (isArray(thing))
      return thing;
    let i2 = thing.length;
    if (!isNumber(i2))
      return null;
    const arr = new Array(i2);
    while (i2-- > 0) {
      arr[i2] = thing[i2];
    }
    return arr;
  };
  var isTypedArray = /* @__PURE__ */ ((TypedArray) => {
    return (thing) => {
      return TypedArray && thing instanceof TypedArray;
    };
  })(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
  var forEachEntry = (obj, fn) => {
    const generator = obj && obj[Symbol.iterator];
    const iterator = generator.call(obj);
    let result;
    while ((result = iterator.next()) && !result.done) {
      const pair = result.value;
      fn.call(obj, pair[0], pair[1]);
    }
  };
  var matchAll = (regExp, str) => {
    let matches;
    const arr = [];
    while ((matches = regExp.exec(str)) !== null) {
      arr.push(matches);
    }
    return arr;
  };
  var isHTMLForm = kindOfTest("HTMLFormElement");
  var toCamelCase = (str) => {
    return str.toLowerCase().replace(
      /[-_\s]([a-z\d])(\w*)/g,
      function replacer(m2, p1, p2) {
        return p1.toUpperCase() + p2;
      }
    );
  };
  var hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
  var isRegExp = kindOfTest("RegExp");
  var reduceDescriptors = (obj, reducer) => {
    const descriptors2 = Object.getOwnPropertyDescriptors(obj);
    const reducedDescriptors = {};
    forEach(descriptors2, (descriptor, name) => {
      let ret;
      if ((ret = reducer(descriptor, name, obj)) !== false) {
        reducedDescriptors[name] = ret || descriptor;
      }
    });
    Object.defineProperties(obj, reducedDescriptors);
  };
  var freezeMethods = (obj) => {
    reduceDescriptors(obj, (descriptor, name) => {
      if (isFunction(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
        return false;
      }
      const value = obj[name];
      if (!isFunction(value))
        return;
      descriptor.enumerable = false;
      if ("writable" in descriptor) {
        descriptor.writable = false;
        return;
      }
      if (!descriptor.set) {
        descriptor.set = () => {
          throw Error("Can not rewrite read-only method '" + name + "'");
        };
      }
    });
  };
  var toObjectSet = (arrayOrString, delimiter2) => {
    const obj = {};
    const define = (arr) => {
      arr.forEach((value) => {
        obj[value] = true;
      });
    };
    isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter2));
    return obj;
  };
  var noop = () => {
  };
  var toFiniteNumber = (value, defaultValue) => {
    value = +value;
    return Number.isFinite(value) ? value : defaultValue;
  };
  var ALPHA = "abcdefghijklmnopqrstuvwxyz";
  var DIGIT = "0123456789";
  var ALPHABET = {
    DIGIT,
    ALPHA,
    ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
  };
  var generateString = (size2 = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
    let str = "";
    const { length: length2 } = alphabet;
    while (size2--) {
      str += alphabet[Math.random() * length2 | 0];
    }
    return str;
  };
  function isSpecCompliantForm(thing) {
    return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === "FormData" && thing[Symbol.iterator]);
  }
  var toJSONObject = (obj) => {
    const stack = new Array(10);
    const visit = (source, i2) => {
      if (isObject(source)) {
        if (stack.indexOf(source) >= 0) {
          return;
        }
        if (!("toJSON" in source)) {
          stack[i2] = source;
          const target = isArray(source) ? [] : {};
          forEach(source, (value, key) => {
            const reducedValue = visit(value, i2 + 1);
            !isUndefined(reducedValue) && (target[key] = reducedValue);
          });
          stack[i2] = void 0;
          return target;
        }
      }
      return source;
    };
    return visit(obj, 0);
  };
  var isAsyncFn = kindOfTest("AsyncFunction");
  var isThenable = (thing) => thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
  var utils_default = {
    isArray,
    isArrayBuffer,
    isBuffer,
    isFormData,
    isArrayBufferView,
    isString,
    isNumber,
    isBoolean,
    isObject,
    isPlainObject,
    isUndefined,
    isDate,
    isFile,
    isBlob,
    isRegExp,
    isFunction,
    isStream,
    isURLSearchParams,
    isTypedArray,
    isFileList,
    forEach,
    merge,
    extend,
    trim: trim2,
    stripBOM,
    inherits,
    toFlatObject,
    kindOf,
    kindOfTest,
    endsWith,
    toArray,
    forEachEntry,
    matchAll,
    isHTMLForm,
    hasOwnProperty,
    hasOwnProp: hasOwnProperty,
    // an alias to avoid ESLint no-prototype-builtins detection
    reduceDescriptors,
    freezeMethods,
    toObjectSet,
    toCamelCase,
    noop,
    toFiniteNumber,
    findKey,
    global: _global,
    isContextDefined,
    ALPHABET,
    generateString,
    isSpecCompliantForm,
    toJSONObject,
    isAsyncFn,
    isThenable
  };

  // node_modules/axios/lib/core/AxiosError.js
  function AxiosError(message, code, config, request, response) {
    Error.call(this);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack;
    }
    this.message = message;
    this.name = "AxiosError";
    code && (this.code = code);
    config && (this.config = config);
    request && (this.request = request);
    response && (this.response = response);
  }
  utils_default.inherits(AxiosError, Error, {
    toJSON: function toJSON() {
      return {
        // Standard
        message: this.message,
        name: this.name,
        // Microsoft
        description: this.description,
        number: this.number,
        // Mozilla
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        // Axios
        config: utils_default.toJSONObject(this.config),
        code: this.code,
        status: this.response && this.response.status ? this.response.status : null
      };
    }
  });
  var prototype = AxiosError.prototype;
  var descriptors = {};
  [
    "ERR_BAD_OPTION_VALUE",
    "ERR_BAD_OPTION",
    "ECONNABORTED",
    "ETIMEDOUT",
    "ERR_NETWORK",
    "ERR_FR_TOO_MANY_REDIRECTS",
    "ERR_DEPRECATED",
    "ERR_BAD_RESPONSE",
    "ERR_BAD_REQUEST",
    "ERR_CANCELED",
    "ERR_NOT_SUPPORT",
    "ERR_INVALID_URL"
    // eslint-disable-next-line func-names
  ].forEach((code) => {
    descriptors[code] = { value: code };
  });
  Object.defineProperties(AxiosError, descriptors);
  Object.defineProperty(prototype, "isAxiosError", { value: true });
  AxiosError.from = (error, code, config, request, response, customProps) => {
    const axiosError = Object.create(prototype);
    utils_default.toFlatObject(error, axiosError, function filter3(obj) {
      return obj !== Error.prototype;
    }, (prop) => {
      return prop !== "isAxiosError";
    });
    AxiosError.call(axiosError, error.message, code, config, request, response);
    axiosError.cause = error;
    axiosError.name = error.name;
    customProps && Object.assign(axiosError, customProps);
    return axiosError;
  };
  var AxiosError_default = AxiosError;

  // node_modules/axios/lib/helpers/null.js
  var null_default = null;

  // node_modules/axios/lib/helpers/toFormData.js
  function isVisitable(thing) {
    return utils_default.isPlainObject(thing) || utils_default.isArray(thing);
  }
  function removeBrackets(key) {
    return utils_default.endsWith(key, "[]") ? key.slice(0, -2) : key;
  }
  function renderKey(path, key, dots) {
    if (!path)
      return key;
    return path.concat(key).map(function each(token2, i2) {
      token2 = removeBrackets(token2);
      return !dots && i2 ? "[" + token2 + "]" : token2;
    }).join(dots ? "." : "");
  }
  function isFlatArray(arr) {
    return utils_default.isArray(arr) && !arr.some(isVisitable);
  }
  var predicates = utils_default.toFlatObject(utils_default, {}, null, function filter2(prop) {
    return /^is[A-Z]/.test(prop);
  });
  function toFormData(obj, formData, options) {
    if (!utils_default.isObject(obj)) {
      throw new TypeError("target must be an object");
    }
    formData = formData || new (null_default || FormData)();
    options = utils_default.toFlatObject(options, {
      metaTokens: true,
      dots: false,
      indexes: false
    }, false, function defined(option, source) {
      return !utils_default.isUndefined(source[option]);
    });
    const metaTokens = options.metaTokens;
    const visitor = options.visitor || defaultVisitor;
    const dots = options.dots;
    const indexes = options.indexes;
    const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
    const useBlob = _Blob && utils_default.isSpecCompliantForm(formData);
    if (!utils_default.isFunction(visitor)) {
      throw new TypeError("visitor must be a function");
    }
    function convertValue(value) {
      if (value === null)
        return "";
      if (utils_default.isDate(value)) {
        return value.toISOString();
      }
      if (!useBlob && utils_default.isBlob(value)) {
        throw new AxiosError_default("Blob is not supported. Use a Buffer instead.");
      }
      if (utils_default.isArrayBuffer(value) || utils_default.isTypedArray(value)) {
        return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
      }
      return value;
    }
    function defaultVisitor(value, key, path) {
      let arr = value;
      if (value && !path && typeof value === "object") {
        if (utils_default.endsWith(key, "{}")) {
          key = metaTokens ? key : key.slice(0, -2);
          value = JSON.stringify(value);
        } else if (utils_default.isArray(value) && isFlatArray(value) || (utils_default.isFileList(value) || utils_default.endsWith(key, "[]")) && (arr = utils_default.toArray(value))) {
          key = removeBrackets(key);
          arr.forEach(function each(el, index) {
            !(utils_default.isUndefined(el) || el === null) && formData.append(
              // eslint-disable-next-line no-nested-ternary
              indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
              convertValue(el)
            );
          });
          return false;
        }
      }
      if (isVisitable(value)) {
        return true;
      }
      formData.append(renderKey(path, key, dots), convertValue(value));
      return false;
    }
    const stack = [];
    const exposedHelpers = Object.assign(predicates, {
      defaultVisitor,
      convertValue,
      isVisitable
    });
    function build(value, path) {
      if (utils_default.isUndefined(value))
        return;
      if (stack.indexOf(value) !== -1) {
        throw Error("Circular reference detected in " + path.join("."));
      }
      stack.push(value);
      utils_default.forEach(value, function each(el, key) {
        const result = !(utils_default.isUndefined(el) || el === null) && visitor.call(
          formData,
          el,
          utils_default.isString(key) ? key.trim() : key,
          path,
          exposedHelpers
        );
        if (result === true) {
          build(el, path ? path.concat(key) : [key]);
        }
      });
      stack.pop();
    }
    if (!utils_default.isObject(obj)) {
      throw new TypeError("data must be an object");
    }
    build(obj);
    return formData;
  }
  var toFormData_default = toFormData;

  // node_modules/axios/lib/helpers/AxiosURLSearchParams.js
  function encode(str) {
    const charMap = {
      "!": "%21",
      "'": "%27",
      "(": "%28",
      ")": "%29",
      "~": "%7E",
      "%20": "+",
      "%00": "\0"
    };
    return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match2) {
      return charMap[match2];
    });
  }
  function AxiosURLSearchParams(params, options) {
    this._pairs = [];
    params && toFormData_default(params, this, options);
  }
  var prototype2 = AxiosURLSearchParams.prototype;
  prototype2.append = function append2(name, value) {
    this._pairs.push([name, value]);
  };
  prototype2.toString = function toString2(encoder) {
    const _encode = encoder ? function(value) {
      return encoder.call(this, value, encode);
    } : encode;
    return this._pairs.map(function each(pair) {
      return _encode(pair[0]) + "=" + _encode(pair[1]);
    }, "").join("&");
  };
  var AxiosURLSearchParams_default = AxiosURLSearchParams;

  // node_modules/axios/lib/helpers/buildURL.js
  function encode2(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  }
  function buildURL(url, params, options) {
    if (!params) {
      return url;
    }
    const _encode = options && options.encode || encode2;
    const serializeFn = options && options.serialize;
    let serializedParams;
    if (serializeFn) {
      serializedParams = serializeFn(params, options);
    } else {
      serializedParams = utils_default.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams_default(params, options).toString(_encode);
    }
    if (serializedParams) {
      const hashmarkIndex = url.indexOf("#");
      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }
      url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
    }
    return url;
  }

  // node_modules/axios/lib/core/InterceptorManager.js
  var InterceptorManager = class {
    constructor() {
      this.handlers = [];
    }
    /**
     * Add a new interceptor to the stack
     *
     * @param {Function} fulfilled The function to handle `then` for a `Promise`
     * @param {Function} rejected The function to handle `reject` for a `Promise`
     *
     * @return {Number} An ID used to remove interceptor later
     */
    use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    }
    /**
     * Remove an interceptor from the stack
     *
     * @param {Number} id The ID that was returned by `use`
     *
     * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
     */
    eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    }
    /**
     * Clear all interceptors from the stack
     *
     * @returns {void}
     */
    clear() {
      if (this.handlers) {
        this.handlers = [];
      }
    }
    /**
     * Iterate over all the registered interceptors
     *
     * This method is particularly useful for skipping over any
     * interceptors that may have become `null` calling `eject`.
     *
     * @param {Function} fn The function to call for each interceptor
     *
     * @returns {void}
     */
    forEach(fn) {
      utils_default.forEach(this.handlers, function forEachHandler(h2) {
        if (h2 !== null) {
          fn(h2);
        }
      });
    }
  };
  var InterceptorManager_default = InterceptorManager;

  // node_modules/axios/lib/defaults/transitional.js
  var transitional_default = {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  };

  // node_modules/axios/lib/platform/browser/classes/URLSearchParams.js
  var URLSearchParams_default = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams_default;

  // node_modules/axios/lib/platform/browser/classes/FormData.js
  var FormData_default = typeof FormData !== "undefined" ? FormData : null;

  // node_modules/axios/lib/platform/browser/classes/Blob.js
  var Blob_default = typeof Blob !== "undefined" ? Blob : null;

  // node_modules/axios/lib/platform/browser/index.js
  var isStandardBrowserEnv = (() => {
    let product;
    if (typeof navigator !== "undefined" && ((product = navigator.product) === "ReactNative" || product === "NativeScript" || product === "NS")) {
      return false;
    }
    return typeof window !== "undefined" && typeof document !== "undefined";
  })();
  var isStandardBrowserWebWorkerEnv = (() => {
    return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
  })();
  var browser_default = {
    isBrowser: true,
    classes: {
      URLSearchParams: URLSearchParams_default,
      FormData: FormData_default,
      Blob: Blob_default
    },
    isStandardBrowserEnv,
    isStandardBrowserWebWorkerEnv,
    protocols: ["http", "https", "file", "blob", "url", "data"]
  };

  // node_modules/axios/lib/helpers/toURLEncodedForm.js
  function toURLEncodedForm(data, options) {
    return toFormData_default(data, new browser_default.classes.URLSearchParams(), Object.assign({
      visitor: function(value, key, path, helpers) {
        if (browser_default.isNode && utils_default.isBuffer(value)) {
          this.append(key, value.toString("base64"));
          return false;
        }
        return helpers.defaultVisitor.apply(this, arguments);
      }
    }, options));
  }

  // node_modules/axios/lib/helpers/formDataToJSON.js
  function parsePropPath(name) {
    return utils_default.matchAll(/\w+|\[(\w*)]/g, name).map((match2) => {
      return match2[0] === "[]" ? "" : match2[1] || match2[0];
    });
  }
  function arrayToObject(arr) {
    const obj = {};
    const keys = Object.keys(arr);
    let i2;
    const len = keys.length;
    let key;
    for (i2 = 0; i2 < len; i2++) {
      key = keys[i2];
      obj[key] = arr[key];
    }
    return obj;
  }
  function formDataToJSON(formData) {
    function buildPath(path, value, target, index) {
      let name = path[index++];
      const isNumericKey = Number.isFinite(+name);
      const isLast = index >= path.length;
      name = !name && utils_default.isArray(target) ? target.length : name;
      if (isLast) {
        if (utils_default.hasOwnProp(target, name)) {
          target[name] = [target[name], value];
        } else {
          target[name] = value;
        }
        return !isNumericKey;
      }
      if (!target[name] || !utils_default.isObject(target[name])) {
        target[name] = [];
      }
      const result = buildPath(path, value, target[name], index);
      if (result && utils_default.isArray(target[name])) {
        target[name] = arrayToObject(target[name]);
      }
      return !isNumericKey;
    }
    if (utils_default.isFormData(formData) && utils_default.isFunction(formData.entries)) {
      const obj = {};
      utils_default.forEachEntry(formData, (name, value) => {
        buildPath(parsePropPath(name), value, obj, 0);
      });
      return obj;
    }
    return null;
  }
  var formDataToJSON_default = formDataToJSON;

  // node_modules/axios/lib/defaults/index.js
  function stringifySafely(rawValue, parser, encoder) {
    if (utils_default.isString(rawValue)) {
      try {
        (parser || JSON.parse)(rawValue);
        return utils_default.trim(rawValue);
      } catch (e) {
        if (e.name !== "SyntaxError") {
          throw e;
        }
      }
    }
    return (encoder || JSON.stringify)(rawValue);
  }
  var defaults = {
    transitional: transitional_default,
    adapter: browser_default.isNode ? "http" : "xhr",
    transformRequest: [function transformRequest(data, headers) {
      const contentType = headers.getContentType() || "";
      const hasJSONContentType = contentType.indexOf("application/json") > -1;
      const isObjectPayload = utils_default.isObject(data);
      if (isObjectPayload && utils_default.isHTMLForm(data)) {
        data = new FormData(data);
      }
      const isFormData2 = utils_default.isFormData(data);
      if (isFormData2) {
        if (!hasJSONContentType) {
          return data;
        }
        return hasJSONContentType ? JSON.stringify(formDataToJSON_default(data)) : data;
      }
      if (utils_default.isArrayBuffer(data) || utils_default.isBuffer(data) || utils_default.isStream(data) || utils_default.isFile(data) || utils_default.isBlob(data)) {
        return data;
      }
      if (utils_default.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils_default.isURLSearchParams(data)) {
        headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
        return data.toString();
      }
      let isFileList2;
      if (isObjectPayload) {
        if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
          return toURLEncodedForm(data, this.formSerializer).toString();
        }
        if ((isFileList2 = utils_default.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
          const _FormData = this.env && this.env.FormData;
          return toFormData_default(
            isFileList2 ? { "files[]": data } : data,
            _FormData && new _FormData(),
            this.formSerializer
          );
        }
      }
      if (isObjectPayload || hasJSONContentType) {
        headers.setContentType("application/json", false);
        return stringifySafely(data);
      }
      return data;
    }],
    transformResponse: [function transformResponse(data) {
      const transitional2 = this.transitional || defaults.transitional;
      const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
      const JSONRequested = this.responseType === "json";
      if (data && utils_default.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
        const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
        const strictJSONParsing = !silentJSONParsing && JSONRequested;
        try {
          return JSON.parse(data);
        } catch (e) {
          if (strictJSONParsing) {
            if (e.name === "SyntaxError") {
              throw AxiosError_default.from(e, AxiosError_default.ERR_BAD_RESPONSE, this, null, this.response);
            }
            throw e;
          }
        }
      }
      return data;
    }],
    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
      FormData: browser_default.classes.FormData,
      Blob: browser_default.classes.Blob
    },
    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    },
    headers: {
      common: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": void 0
      }
    }
  };
  utils_default.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
    defaults.headers[method] = {};
  });
  var defaults_default = defaults;

  // node_modules/axios/lib/helpers/parseHeaders.js
  var ignoreDuplicateOf = utils_default.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
  ]);
  var parseHeaders_default = (rawHeaders) => {
    const parsed = {};
    let key;
    let val;
    let i2;
    rawHeaders && rawHeaders.split("\n").forEach(function parser(line2) {
      i2 = line2.indexOf(":");
      key = line2.substring(0, i2).trim().toLowerCase();
      val = line2.substring(i2 + 1).trim();
      if (!key || parsed[key] && ignoreDuplicateOf[key]) {
        return;
      }
      if (key === "set-cookie") {
        if (parsed[key]) {
          parsed[key].push(val);
        } else {
          parsed[key] = [val];
        }
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
      }
    });
    return parsed;
  };

  // node_modules/axios/lib/core/AxiosHeaders.js
  var $internals = Symbol("internals");
  function normalizeHeader(header) {
    return header && String(header).trim().toLowerCase();
  }
  function normalizeValue(value) {
    if (value === false || value == null) {
      return value;
    }
    return utils_default.isArray(value) ? value.map(normalizeValue) : String(value);
  }
  function parseTokens(str) {
    const tokens = /* @__PURE__ */ Object.create(null);
    const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let match2;
    while (match2 = tokensRE.exec(str)) {
      tokens[match2[1]] = match2[2];
    }
    return tokens;
  }
  var isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
  function matchHeaderValue(context, value, header, filter3, isHeaderNameFilter) {
    if (utils_default.isFunction(filter3)) {
      return filter3.call(this, value, header);
    }
    if (isHeaderNameFilter) {
      value = header;
    }
    if (!utils_default.isString(value))
      return;
    if (utils_default.isString(filter3)) {
      return value.indexOf(filter3) !== -1;
    }
    if (utils_default.isRegExp(filter3)) {
      return filter3.test(value);
    }
  }
  function formatHeader(header) {
    return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w2, char2, str) => {
      return char2.toUpperCase() + str;
    });
  }
  function buildAccessors(obj, header) {
    const accessorName = utils_default.toCamelCase(" " + header);
    ["get", "set", "has"].forEach((methodName) => {
      Object.defineProperty(obj, methodName + accessorName, {
        value: function(arg1, arg2, arg3) {
          return this[methodName].call(this, header, arg1, arg2, arg3);
        },
        configurable: true
      });
    });
  }
  var AxiosHeaders = class {
    constructor(headers) {
      headers && this.set(headers);
    }
    set(header, valueOrRewrite, rewrite) {
      const self2 = this;
      function setHeader(_value, _header, _rewrite) {
        const lHeader = normalizeHeader(_header);
        if (!lHeader) {
          throw new Error("header name must be a non-empty string");
        }
        const key = utils_default.findKey(self2, lHeader);
        if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
          self2[key || _header] = normalizeValue(_value);
        }
      }
      const setHeaders = (headers, _rewrite) => utils_default.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
      if (utils_default.isPlainObject(header) || header instanceof this.constructor) {
        setHeaders(header, valueOrRewrite);
      } else if (utils_default.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
        setHeaders(parseHeaders_default(header), valueOrRewrite);
      } else {
        header != null && setHeader(valueOrRewrite, header, rewrite);
      }
      return this;
    }
    get(header, parser) {
      header = normalizeHeader(header);
      if (header) {
        const key = utils_default.findKey(this, header);
        if (key) {
          const value = this[key];
          if (!parser) {
            return value;
          }
          if (parser === true) {
            return parseTokens(value);
          }
          if (utils_default.isFunction(parser)) {
            return parser.call(this, value, key);
          }
          if (utils_default.isRegExp(parser)) {
            return parser.exec(value);
          }
          throw new TypeError("parser must be boolean|regexp|function");
        }
      }
    }
    has(header, matcher) {
      header = normalizeHeader(header);
      if (header) {
        const key = utils_default.findKey(this, header);
        return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
      }
      return false;
    }
    delete(header, matcher) {
      const self2 = this;
      let deleted = false;
      function deleteHeader(_header) {
        _header = normalizeHeader(_header);
        if (_header) {
          const key = utils_default.findKey(self2, _header);
          if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
            delete self2[key];
            deleted = true;
          }
        }
      }
      if (utils_default.isArray(header)) {
        header.forEach(deleteHeader);
      } else {
        deleteHeader(header);
      }
      return deleted;
    }
    clear(matcher) {
      const keys = Object.keys(this);
      let i2 = keys.length;
      let deleted = false;
      while (i2--) {
        const key = keys[i2];
        if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
          delete this[key];
          deleted = true;
        }
      }
      return deleted;
    }
    normalize(format) {
      const self2 = this;
      const headers = {};
      utils_default.forEach(this, (value, header) => {
        const key = utils_default.findKey(headers, header);
        if (key) {
          self2[key] = normalizeValue(value);
          delete self2[header];
          return;
        }
        const normalized = format ? formatHeader(header) : String(header).trim();
        if (normalized !== header) {
          delete self2[header];
        }
        self2[normalized] = normalizeValue(value);
        headers[normalized] = true;
      });
      return this;
    }
    concat(...targets) {
      return this.constructor.concat(this, ...targets);
    }
    toJSON(asStrings) {
      const obj = /* @__PURE__ */ Object.create(null);
      utils_default.forEach(this, (value, header) => {
        value != null && value !== false && (obj[header] = asStrings && utils_default.isArray(value) ? value.join(", ") : value);
      });
      return obj;
    }
    [Symbol.iterator]() {
      return Object.entries(this.toJSON())[Symbol.iterator]();
    }
    toString() {
      return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
    }
    get [Symbol.toStringTag]() {
      return "AxiosHeaders";
    }
    static from(thing) {
      return thing instanceof this ? thing : new this(thing);
    }
    static concat(first, ...targets) {
      const computed = new this(first);
      targets.forEach((target) => computed.set(target));
      return computed;
    }
    static accessor(header) {
      const internals = this[$internals] = this[$internals] = {
        accessors: {}
      };
      const accessors = internals.accessors;
      const prototype3 = this.prototype;
      function defineAccessor(_header) {
        const lHeader = normalizeHeader(_header);
        if (!accessors[lHeader]) {
          buildAccessors(prototype3, _header);
          accessors[lHeader] = true;
        }
      }
      utils_default.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
      return this;
    }
  };
  AxiosHeaders.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
  utils_default.reduceDescriptors(AxiosHeaders.prototype, ({ value }, key) => {
    let mapped = key[0].toUpperCase() + key.slice(1);
    return {
      get: () => value,
      set(headerValue) {
        this[mapped] = headerValue;
      }
    };
  });
  utils_default.freezeMethods(AxiosHeaders);
  var AxiosHeaders_default = AxiosHeaders;

  // node_modules/axios/lib/core/transformData.js
  function transformData(fns, response) {
    const config = this || defaults_default;
    const context = response || config;
    const headers = AxiosHeaders_default.from(context.headers);
    let data = context.data;
    utils_default.forEach(fns, function transform(fn) {
      data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
    });
    headers.normalize();
    return data;
  }

  // node_modules/axios/lib/cancel/isCancel.js
  function isCancel(value) {
    return !!(value && value.__CANCEL__);
  }

  // node_modules/axios/lib/cancel/CanceledError.js
  function CanceledError(message, config, request) {
    AxiosError_default.call(this, message == null ? "canceled" : message, AxiosError_default.ERR_CANCELED, config, request);
    this.name = "CanceledError";
  }
  utils_default.inherits(CanceledError, AxiosError_default, {
    __CANCEL__: true
  });
  var CanceledError_default = CanceledError;

  // node_modules/axios/lib/core/settle.js
  function settle(resolve, reject, response) {
    const validateStatus2 = response.config.validateStatus;
    if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
      resolve(response);
    } else {
      reject(new AxiosError_default(
        "Request failed with status code " + response.status,
        [AxiosError_default.ERR_BAD_REQUEST, AxiosError_default.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
        response.config,
        response.request,
        response
      ));
    }
  }

  // node_modules/axios/lib/helpers/cookies.js
  var cookies_default = browser_default.isStandardBrowserEnv ? (
    // Standard browser envs support document.cookie
    /* @__PURE__ */ function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          const cookie = [];
          cookie.push(name + "=" + encodeURIComponent(value));
          if (utils_default.isNumber(expires)) {
            cookie.push("expires=" + new Date(expires).toGMTString());
          }
          if (utils_default.isString(path)) {
            cookie.push("path=" + path);
          }
          if (utils_default.isString(domain)) {
            cookie.push("domain=" + domain);
          }
          if (secure === true) {
            cookie.push("secure");
          }
          document.cookie = cookie.join("; ");
        },
        read: function read(name) {
          const match2 = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
          return match2 ? decodeURIComponent(match2[3]) : null;
        },
        remove: function remove(name) {
          this.write(name, "", Date.now() - 864e5);
        }
      };
    }()
  ) : (
    // Non standard browser env (web workers, react-native) lack needed support.
    /* @__PURE__ */ function nonStandardBrowserEnv() {
      return {
        write: function write() {
        },
        read: function read() {
          return null;
        },
        remove: function remove() {
        }
      };
    }()
  );

  // node_modules/axios/lib/helpers/isAbsoluteURL.js
  function isAbsoluteURL(url) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
  }

  // node_modules/axios/lib/helpers/combineURLs.js
  function combineURLs(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
  }

  // node_modules/axios/lib/core/buildFullPath.js
  function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  }

  // node_modules/axios/lib/helpers/isURLSameOrigin.js
  var isURLSameOrigin_default = browser_default.isStandardBrowserEnv ? (
    // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
    function standardBrowserEnv2() {
      const msie = /(msie|trident)/i.test(navigator.userAgent);
      const urlParsingNode = document.createElement("a");
      let originURL;
      function resolveURL(url) {
        let href = url;
        if (msie) {
          urlParsingNode.setAttribute("href", href);
          href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
      }
      originURL = resolveURL(window.location.href);
      return function isURLSameOrigin(requestURL) {
        const parsed = utils_default.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }()
  ) : (
    // Non standard browser envs (web workers, react-native) lack needed support.
    /* @__PURE__ */ function nonStandardBrowserEnv2() {
      return function isURLSameOrigin() {
        return true;
      };
    }()
  );

  // node_modules/axios/lib/helpers/parseProtocol.js
  function parseProtocol(url) {
    const match2 = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
    return match2 && match2[1] || "";
  }

  // node_modules/axios/lib/helpers/speedometer.js
  function speedometer(samplesCount, min) {
    samplesCount = samplesCount || 10;
    const bytes = new Array(samplesCount);
    const timestamps = new Array(samplesCount);
    let head = 0;
    let tail = 0;
    let firstSampleTS;
    min = min !== void 0 ? min : 1e3;
    return function push(chunkLength) {
      const now4 = Date.now();
      const startedAt = timestamps[tail];
      if (!firstSampleTS) {
        firstSampleTS = now4;
      }
      bytes[head] = chunkLength;
      timestamps[head] = now4;
      let i2 = tail;
      let bytesCount = 0;
      while (i2 !== head) {
        bytesCount += bytes[i2++];
        i2 = i2 % samplesCount;
      }
      head = (head + 1) % samplesCount;
      if (head === tail) {
        tail = (tail + 1) % samplesCount;
      }
      if (now4 - firstSampleTS < min) {
        return;
      }
      const passed = startedAt && now4 - startedAt;
      return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
    };
  }
  var speedometer_default = speedometer;

  // node_modules/axios/lib/adapters/xhr.js
  function progressEventReducer(listener, isDownloadStream) {
    let bytesNotified = 0;
    const _speedometer = speedometer_default(50, 250);
    return (e) => {
      const loaded = e.loaded;
      const total = e.lengthComputable ? e.total : void 0;
      const progressBytes = loaded - bytesNotified;
      const rate = _speedometer(progressBytes);
      const inRange = loaded <= total;
      bytesNotified = loaded;
      const data = {
        loaded,
        total,
        progress: total ? loaded / total : void 0,
        bytes: progressBytes,
        rate: rate ? rate : void 0,
        estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
        event: e
      };
      data[isDownloadStream ? "download" : "upload"] = true;
      listener(data);
    };
  }
  var isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
  var xhr_default = isXHRAdapterSupported && function(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      let requestData = config.data;
      const requestHeaders = AxiosHeaders_default.from(config.headers).normalize();
      const responseType = config.responseType;
      let onCanceled;
      function done() {
        if (config.cancelToken) {
          config.cancelToken.unsubscribe(onCanceled);
        }
        if (config.signal) {
          config.signal.removeEventListener("abort", onCanceled);
        }
      }
      if (utils_default.isFormData(requestData)) {
        if (browser_default.isStandardBrowserEnv || browser_default.isStandardBrowserWebWorkerEnv) {
          requestHeaders.setContentType(false);
        } else {
          requestHeaders.setContentType("multipart/form-data;", false);
        }
      }
      let request = new XMLHttpRequest();
      if (config.auth) {
        const username = config.auth.username || "";
        const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
        requestHeaders.set("Authorization", "Basic " + btoa(username + ":" + password));
      }
      const fullPath = buildFullPath(config.baseURL, config.url);
      request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
      request.timeout = config.timeout;
      function onloadend() {
        if (!request) {
          return;
        }
        const responseHeaders = AxiosHeaders_default.from(
          "getAllResponseHeaders" in request && request.getAllResponseHeaders()
        );
        const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
        const response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        };
        settle(function _resolve(value) {
          resolve(value);
          done();
        }, function _reject(err) {
          reject(err);
          done();
        }, response);
        request = null;
      }
      if ("onloadend" in request) {
        request.onloadend = onloadend;
      } else {
        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }
          if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
            return;
          }
          setTimeout(onloadend);
        };
      }
      request.onabort = function handleAbort() {
        if (!request) {
          return;
        }
        reject(new AxiosError_default("Request aborted", AxiosError_default.ECONNABORTED, config, request));
        request = null;
      };
      request.onerror = function handleError() {
        reject(new AxiosError_default("Network Error", AxiosError_default.ERR_NETWORK, config, request));
        request = null;
      };
      request.ontimeout = function handleTimeout() {
        let timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
        const transitional2 = config.transitional || transitional_default;
        if (config.timeoutErrorMessage) {
          timeoutErrorMessage = config.timeoutErrorMessage;
        }
        reject(new AxiosError_default(
          timeoutErrorMessage,
          transitional2.clarifyTimeoutError ? AxiosError_default.ETIMEDOUT : AxiosError_default.ECONNABORTED,
          config,
          request
        ));
        request = null;
      };
      if (browser_default.isStandardBrowserEnv) {
        const xsrfValue = (config.withCredentials || isURLSameOrigin_default(fullPath)) && config.xsrfCookieName && cookies_default.read(config.xsrfCookieName);
        if (xsrfValue) {
          requestHeaders.set(config.xsrfHeaderName, xsrfValue);
        }
      }
      requestData === void 0 && requestHeaders.setContentType(null);
      if ("setRequestHeader" in request) {
        utils_default.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
          request.setRequestHeader(key, val);
        });
      }
      if (!utils_default.isUndefined(config.withCredentials)) {
        request.withCredentials = !!config.withCredentials;
      }
      if (responseType && responseType !== "json") {
        request.responseType = config.responseType;
      }
      if (typeof config.onDownloadProgress === "function") {
        request.addEventListener("progress", progressEventReducer(config.onDownloadProgress, true));
      }
      if (typeof config.onUploadProgress === "function" && request.upload) {
        request.upload.addEventListener("progress", progressEventReducer(config.onUploadProgress));
      }
      if (config.cancelToken || config.signal) {
        onCanceled = (cancel) => {
          if (!request) {
            return;
          }
          reject(!cancel || cancel.type ? new CanceledError_default(null, config, request) : cancel);
          request.abort();
          request = null;
        };
        config.cancelToken && config.cancelToken.subscribe(onCanceled);
        if (config.signal) {
          config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
        }
      }
      const protocol = parseProtocol(fullPath);
      if (protocol && browser_default.protocols.indexOf(protocol) === -1) {
        reject(new AxiosError_default("Unsupported protocol " + protocol + ":", AxiosError_default.ERR_BAD_REQUEST, config));
        return;
      }
      request.send(requestData || null);
    });
  };

  // node_modules/axios/lib/adapters/adapters.js
  var knownAdapters = {
    http: null_default,
    xhr: xhr_default
  };
  utils_default.forEach(knownAdapters, (fn, value) => {
    if (fn) {
      try {
        Object.defineProperty(fn, "name", { value });
      } catch (e) {
      }
      Object.defineProperty(fn, "adapterName", { value });
    }
  });
  var adapters_default = {
    getAdapter: (adapters) => {
      adapters = utils_default.isArray(adapters) ? adapters : [adapters];
      const { length: length2 } = adapters;
      let nameOrAdapter;
      let adapter;
      for (let i2 = 0; i2 < length2; i2++) {
        nameOrAdapter = adapters[i2];
        if (adapter = utils_default.isString(nameOrAdapter) ? knownAdapters[nameOrAdapter.toLowerCase()] : nameOrAdapter) {
          break;
        }
      }
      if (!adapter) {
        if (adapter === false) {
          throw new AxiosError_default(
            `Adapter ${nameOrAdapter} is not supported by the environment`,
            "ERR_NOT_SUPPORT"
          );
        }
        throw new Error(
          utils_default.hasOwnProp(knownAdapters, nameOrAdapter) ? `Adapter '${nameOrAdapter}' is not available in the build` : `Unknown adapter '${nameOrAdapter}'`
        );
      }
      if (!utils_default.isFunction(adapter)) {
        throw new TypeError("adapter is not a function");
      }
      return adapter;
    },
    adapters: knownAdapters
  };

  // node_modules/axios/lib/core/dispatchRequest.js
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
    if (config.signal && config.signal.aborted) {
      throw new CanceledError_default(null, config);
    }
  }
  function dispatchRequest(config) {
    throwIfCancellationRequested(config);
    config.headers = AxiosHeaders_default.from(config.headers);
    config.data = transformData.call(
      config,
      config.transformRequest
    );
    if (["post", "put", "patch"].indexOf(config.method) !== -1) {
      config.headers.setContentType("application/x-www-form-urlencoded", false);
    }
    const adapter = adapters_default.getAdapter(config.adapter || defaults_default.adapter);
    return adapter(config).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config);
      response.data = transformData.call(
        config,
        config.transformResponse,
        response
      );
      response.headers = AxiosHeaders_default.from(response.headers);
      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config);
        if (reason && reason.response) {
          reason.response.data = transformData.call(
            config,
            config.transformResponse,
            reason.response
          );
          reason.response.headers = AxiosHeaders_default.from(reason.response.headers);
        }
      }
      return Promise.reject(reason);
    });
  }

  // node_modules/axios/lib/core/mergeConfig.js
  var headersToObject = (thing) => thing instanceof AxiosHeaders_default ? thing.toJSON() : thing;
  function mergeConfig(config1, config2) {
    config2 = config2 || {};
    const config = {};
    function getMergedValue(target, source, caseless) {
      if (utils_default.isPlainObject(target) && utils_default.isPlainObject(source)) {
        return utils_default.merge.call({ caseless }, target, source);
      } else if (utils_default.isPlainObject(source)) {
        return utils_default.merge({}, source);
      } else if (utils_default.isArray(source)) {
        return source.slice();
      }
      return source;
    }
    function mergeDeepProperties(a2, b2, caseless) {
      if (!utils_default.isUndefined(b2)) {
        return getMergedValue(a2, b2, caseless);
      } else if (!utils_default.isUndefined(a2)) {
        return getMergedValue(void 0, a2, caseless);
      }
    }
    function valueFromConfig2(a2, b2) {
      if (!utils_default.isUndefined(b2)) {
        return getMergedValue(void 0, b2);
      }
    }
    function defaultToConfig2(a2, b2) {
      if (!utils_default.isUndefined(b2)) {
        return getMergedValue(void 0, b2);
      } else if (!utils_default.isUndefined(a2)) {
        return getMergedValue(void 0, a2);
      }
    }
    function mergeDirectKeys(a2, b2, prop) {
      if (prop in config2) {
        return getMergedValue(a2, b2);
      } else if (prop in config1) {
        return getMergedValue(void 0, a2);
      }
    }
    const mergeMap = {
      url: valueFromConfig2,
      method: valueFromConfig2,
      data: valueFromConfig2,
      baseURL: defaultToConfig2,
      transformRequest: defaultToConfig2,
      transformResponse: defaultToConfig2,
      paramsSerializer: defaultToConfig2,
      timeout: defaultToConfig2,
      timeoutMessage: defaultToConfig2,
      withCredentials: defaultToConfig2,
      adapter: defaultToConfig2,
      responseType: defaultToConfig2,
      xsrfCookieName: defaultToConfig2,
      xsrfHeaderName: defaultToConfig2,
      onUploadProgress: defaultToConfig2,
      onDownloadProgress: defaultToConfig2,
      decompress: defaultToConfig2,
      maxContentLength: defaultToConfig2,
      maxBodyLength: defaultToConfig2,
      beforeRedirect: defaultToConfig2,
      transport: defaultToConfig2,
      httpAgent: defaultToConfig2,
      httpsAgent: defaultToConfig2,
      cancelToken: defaultToConfig2,
      socketPath: defaultToConfig2,
      responseEncoding: defaultToConfig2,
      validateStatus: mergeDirectKeys,
      headers: (a2, b2) => mergeDeepProperties(headersToObject(a2), headersToObject(b2), true)
    };
    utils_default.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
      const merge2 = mergeMap[prop] || mergeDeepProperties;
      const configValue = merge2(config1[prop], config2[prop], prop);
      utils_default.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
    });
    return config;
  }

  // node_modules/axios/lib/env/data.js
  var VERSION = "1.5.0";

  // node_modules/axios/lib/helpers/validator.js
  var validators = {};
  ["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i2) => {
    validators[type] = function validator(thing) {
      return typeof thing === type || "a" + (i2 < 1 ? "n " : " ") + type;
    };
  });
  var deprecatedWarnings = {};
  validators.transitional = function transitional(validator, version, message) {
    function formatMessage(opt, desc) {
      return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
    }
    return (value, opt, opts) => {
      if (validator === false) {
        throw new AxiosError_default(
          formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
          AxiosError_default.ERR_DEPRECATED
        );
      }
      if (version && !deprecatedWarnings[opt]) {
        deprecatedWarnings[opt] = true;
        console.warn(
          formatMessage(
            opt,
            " has been deprecated since v" + version + " and will be removed in the near future"
          )
        );
      }
      return validator ? validator(value, opt, opts) : true;
    };
  };
  function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== "object") {
      throw new AxiosError_default("options must be an object", AxiosError_default.ERR_BAD_OPTION_VALUE);
    }
    const keys = Object.keys(options);
    let i2 = keys.length;
    while (i2-- > 0) {
      const opt = keys[i2];
      const validator = schema[opt];
      if (validator) {
        const value = options[opt];
        const result = value === void 0 || validator(value, opt, options);
        if (result !== true) {
          throw new AxiosError_default("option " + opt + " must be " + result, AxiosError_default.ERR_BAD_OPTION_VALUE);
        }
        continue;
      }
      if (allowUnknown !== true) {
        throw new AxiosError_default("Unknown option " + opt, AxiosError_default.ERR_BAD_OPTION);
      }
    }
  }
  var validator_default = {
    assertOptions,
    validators
  };

  // node_modules/axios/lib/core/Axios.js
  var validators2 = validator_default.validators;
  var Axios = class {
    constructor(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager_default(),
        response: new InterceptorManager_default()
      };
    }
    /**
     * Dispatch a request
     *
     * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
     * @param {?Object} config
     *
     * @returns {Promise} The Promise to be fulfilled
     */
    request(configOrUrl, config) {
      if (typeof configOrUrl === "string") {
        config = config || {};
        config.url = configOrUrl;
      } else {
        config = configOrUrl || {};
      }
      config = mergeConfig(this.defaults, config);
      const { transitional: transitional2, paramsSerializer, headers } = config;
      if (transitional2 !== void 0) {
        validator_default.assertOptions(transitional2, {
          silentJSONParsing: validators2.transitional(validators2.boolean),
          forcedJSONParsing: validators2.transitional(validators2.boolean),
          clarifyTimeoutError: validators2.transitional(validators2.boolean)
        }, false);
      }
      if (paramsSerializer != null) {
        if (utils_default.isFunction(paramsSerializer)) {
          config.paramsSerializer = {
            serialize: paramsSerializer
          };
        } else {
          validator_default.assertOptions(paramsSerializer, {
            encode: validators2.function,
            serialize: validators2.function
          }, true);
        }
      }
      config.method = (config.method || this.defaults.method || "get").toLowerCase();
      let contextHeaders = headers && utils_default.merge(
        headers.common,
        headers[config.method]
      );
      headers && utils_default.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (method) => {
          delete headers[method];
        }
      );
      config.headers = AxiosHeaders_default.concat(contextHeaders, headers);
      const requestInterceptorChain = [];
      let synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
          return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      const responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });
      let promise;
      let i2 = 0;
      let len;
      if (!synchronousRequestInterceptors) {
        const chain = [dispatchRequest.bind(this), void 0];
        chain.unshift.apply(chain, requestInterceptorChain);
        chain.push.apply(chain, responseInterceptorChain);
        len = chain.length;
        promise = Promise.resolve(config);
        while (i2 < len) {
          promise = promise.then(chain[i2++], chain[i2++]);
        }
        return promise;
      }
      len = requestInterceptorChain.length;
      let newConfig = config;
      i2 = 0;
      while (i2 < len) {
        const onFulfilled = requestInterceptorChain[i2++];
        const onRejected = requestInterceptorChain[i2++];
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected.call(this, error);
          break;
        }
      }
      try {
        promise = dispatchRequest.call(this, newConfig);
      } catch (error) {
        return Promise.reject(error);
      }
      i2 = 0;
      len = responseInterceptorChain.length;
      while (i2 < len) {
        promise = promise.then(responseInterceptorChain[i2++], responseInterceptorChain[i2++]);
      }
      return promise;
    }
    getUri(config) {
      config = mergeConfig(this.defaults, config);
      const fullPath = buildFullPath(config.baseURL, config.url);
      return buildURL(fullPath, config.params, config.paramsSerializer);
    }
  };
  utils_default.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
    Axios.prototype[method] = function(url, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        url,
        data: (config || {}).data
      }));
    };
  });
  utils_default.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
    function generateHTTPMethod(isForm) {
      return function httpMethod(url, data, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          headers: isForm ? {
            "Content-Type": "multipart/form-data"
          } : {},
          url,
          data
        }));
      };
    }
    Axios.prototype[method] = generateHTTPMethod();
    Axios.prototype[method + "Form"] = generateHTTPMethod(true);
  });
  var Axios_default = Axios;

  // node_modules/axios/lib/cancel/CancelToken.js
  var CancelToken = class _CancelToken {
    constructor(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      let resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      const token2 = this;
      this.promise.then((cancel) => {
        if (!token2._listeners)
          return;
        let i2 = token2._listeners.length;
        while (i2-- > 0) {
          token2._listeners[i2](cancel);
        }
        token2._listeners = null;
      });
      this.promise.then = (onfulfilled) => {
        let _resolve;
        const promise = new Promise((resolve) => {
          token2.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = function reject() {
          token2.unsubscribe(_resolve);
        };
        return promise;
      };
      executor(function cancel(message, config, request) {
        if (token2.reason) {
          return;
        }
        token2.reason = new CanceledError_default(message, config, request);
        resolvePromise(token2.reason);
      });
    }
    /**
     * Throws a `CanceledError` if cancellation has been requested.
     */
    throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    }
    /**
     * Subscribe to the cancel signal
     */
    subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }
      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    }
    /**
     * Unsubscribe from the cancel signal
     */
    unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      const index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    }
    /**
     * Returns an object that contains a new `CancelToken` and a function that, when called,
     * cancels the `CancelToken`.
     */
    static source() {
      let cancel;
      const token2 = new _CancelToken(function executor(c2) {
        cancel = c2;
      });
      return {
        token: token2,
        cancel
      };
    }
  };
  var CancelToken_default = CancelToken;

  // node_modules/axios/lib/helpers/spread.js
  function spread(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  }

  // node_modules/axios/lib/helpers/isAxiosError.js
  function isAxiosError(payload) {
    return utils_default.isObject(payload) && payload.isAxiosError === true;
  }

  // node_modules/axios/lib/helpers/HttpStatusCode.js
  var HttpStatusCode = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511
  };
  Object.entries(HttpStatusCode).forEach(([key, value]) => {
    HttpStatusCode[value] = key;
  });
  var HttpStatusCode_default = HttpStatusCode;

  // node_modules/axios/lib/axios.js
  function createInstance(defaultConfig) {
    const context = new Axios_default(defaultConfig);
    const instance = bind(Axios_default.prototype.request, context);
    utils_default.extend(instance, Axios_default.prototype, context, { allOwnKeys: true });
    utils_default.extend(instance, context, null, { allOwnKeys: true });
    instance.create = function create(instanceConfig) {
      return createInstance(mergeConfig(defaultConfig, instanceConfig));
    };
    return instance;
  }
  var axios = createInstance(defaults_default);
  axios.Axios = Axios_default;
  axios.CanceledError = CanceledError_default;
  axios.CancelToken = CancelToken_default;
  axios.isCancel = isCancel;
  axios.VERSION = VERSION;
  axios.toFormData = toFormData_default;
  axios.AxiosError = AxiosError_default;
  axios.Cancel = axios.CanceledError;
  axios.all = function all(promises) {
    return Promise.all(promises);
  };
  axios.spread = spread;
  axios.isAxiosError = isAxiosError;
  axios.mergeConfig = mergeConfig;
  axios.AxiosHeaders = AxiosHeaders_default;
  axios.formToJSON = (thing) => formDataToJSON_default(utils_default.isHTMLForm(thing) ? new FormData(thing) : thing);
  axios.getAdapter = adapters_default.getAdapter;
  axios.HttpStatusCode = HttpStatusCode_default;
  axios.default = axios;
  var axios_default = axios;

  // node_modules/axios/index.js
  var {
    Axios: Axios2,
    AxiosError: AxiosError2,
    CanceledError: CanceledError2,
    isCancel: isCancel2,
    CancelToken: CancelToken2,
    VERSION: VERSION2,
    all: all2,
    Cancel,
    isAxiosError: isAxiosError2,
    spread: spread2,
    toFormData: toFormData2,
    AxiosHeaders: AxiosHeaders2,
    HttpStatusCode: HttpStatusCode2,
    formToJSON,
    getAdapter,
    mergeConfig: mergeConfig2
  } = axios_default;

  // lib/service/axios.ts
  var getInstanceEventory = (env) => {
    if (env === "prod" /* PROD */)
      return axios_default.create({ baseURL: GOAPI_ENDPOINT });
    if (env === "sta" /* STA */)
      return axios_default.create({ baseURL: GOAPI_ENDPOINT_STA });
    if (env === "uat" /* UAT */)
      return axios_default.create({ baseURL: GOAPI_ENDPOINT_UAT });
    return axios_default.create({
      baseURL: isProdVmo17Media() ? GOAPI_ENDPOINT : isStagVmo17Media() ? GOAPI_ENDPOINT_STA : isUatVmo17Media() ? GOAPI_ENDPOINT_UAT : GOAPI_ENDPOINT_STA
    });
  };

  // lib/service/cacheManager.service.ts
  var CACHE_STORAGE_NAME_PREFIX = "lb-cache-v1";
  var CacheStrategy = /* @__PURE__ */ ((CacheStrategy3) => {
    CacheStrategy3["CACHE_FIRST"] = "cacheFirst";
    CacheStrategy3["CACHE_THEN_NETWORK"] = "cacheThenNetwork";
    CacheStrategy3["NETWORK_ONLY"] = "networkOnly";
    CacheStrategy3["NETWORK_FIRST"] = "networkFirst";
    return CacheStrategy3;
  })(CacheStrategy || {});
  var cacheWhitelists = [
    {
      path: "/leaderboards/eventory",
      method: "get" /* GET */,
      cacheStrategy: "cacheThenNetwork" /* CACHE_THEN_NETWORK */
    }
  ];
  var checkCacheUsable = async () => {
    try {
      await caches.open("Test Cache Storage Available");
      return true;
    } catch (error) {
      console.error("Cache Storage Unavailable, ", error);
      return false;
    }
  };
  var formatDate = (date) => {
    const day2 = date.getDate();
    const month = date.getMonth();
    const formatMonth = month + 1 > 10 ? month + 1 : `0${month + 1}`;
    const formatDay = day2 > 10 ? day2 : `0${day2}`;
    return `${date.getFullYear()}-${formatMonth}-${formatDay}`;
  };
  var getDateDaysAgo = (numOfDays, date = /* @__PURE__ */ new Date()) => {
    const daysAgo = new Date(date.getTime());
    daysAgo.setDate(date.getDate() - numOfDays);
    return daysAgo;
  };
  var setAxiosCache = async (url, response) => {
    const today = /* @__PURE__ */ new Date();
    const cacheStorageName = `${CACHE_STORAGE_NAME_PREFIX}-${formatDate(today)}`;
    await deleteCache();
    try {
      const cacheStorage = await caches.open(cacheStorageName);
      const options = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const axiosRes = new Response(JSON.stringify(response), options);
      await cacheStorage.put(url, axiosRes);
    } catch (error) {
      if (error.name === "QuotaExceededError") {
        console.error(`Set cache storage QuotaExceededError`);
      } else {
        console.error(`Set cache storage ${error}.`);
      }
    }
  };
  var deleteCache = async () => {
    try {
      const cacheKeys = await caches.keys();
      for (const cacheKey of cacheKeys) {
        if (cacheKey.length && cacheKey.includes(CACHE_STORAGE_NAME_PREFIX) && isTwoDaysAgoCache(cacheKey)) {
          await caches.delete(cacheKey);
        }
      }
    } catch (error) {
      console.error(`Delete cache storage ${error}.`);
    }
  };
  var isTwoDaysAgoCache = (cacheKey) => {
    const twoDaysAgo = getDateDaysAgo(2);
    const cacheDateString = cacheKey.replace(`${CACHE_STORAGE_NAME_PREFIX}-`, "");
    const cacheDate = new Date(cacheDateString);
    return twoDaysAgo >= cacheDate;
  };
  var getCache = async (cacheKey, url) => {
    try {
      const cacheStorage = await caches.open(cacheKey);
      const cachedResponse = await cacheStorage.match(url);
      const cachedBody = await cachedResponse?.json();
      return { cache: cachedBody };
    } catch (error) {
      return { error: new CacheError(error) };
    }
  };
  var getLatestCache = async (url) => {
    const cacheKeys = await caches.keys();
    const sortedCache = cacheKeys.reverse();
    let latestCache;
    for (const cacheKey of sortedCache) {
      latestCache = await getCache(cacheKey, url);
      if (latestCache?.error)
        console.error(latestCache?.error);
      if (latestCache?.cache)
        return latestCache.cache;
    }
    console.warn("Cannot find any cache.");
  };
  var getApiUrlStrategy = (apiUrl, method = "get" /* GET */) => {
    if (method !== "get" /* GET */) {
      return { cacheStrategy: "networkOnly" /* NETWORK_ONLY */ };
    }
    const whitelistItem = cacheWhitelists.find(
      ({ path }) => new RegExp(path).test(apiUrl)
    );
    if (!whitelistItem) {
      return { cacheStrategy: "networkOnly" /* NETWORK_ONLY */ };
    }
    const { cacheStrategy } = whitelistItem;
    return { cacheStrategy };
  };
  var CacheError = class extends Error {
    constructor(message) {
      super(message);
      this.name = "CacheError";
    }
  };
  var handleCallback = (apiCallback) => apiCallback.then((res) => ({ data: res })).catch((error) => ({ error }));
  var handleResponse = (data, callback) => ({
    data,
    callback
  });
  var handleNetworkFirst = async (apiCallback, url) => {
    const apiRes = await handleCallback(apiCallback);
    if (apiRes.data) {
      setAxiosCache(url, apiRes.data);
      return handleResponse(apiRes.data);
    }
    const cacheRes = await getLatestCache(url);
    if (cacheRes)
      return handleResponse(cacheRes);
    throw apiRes.error;
  };
  var handleNetworkOnly = async (apiCallback) => {
    const apiRes = await handleCallback(apiCallback);
    if (apiRes.data)
      return handleResponse(apiRes.data);
    throw apiRes.error;
  };
  var handleCacheThenNetwork = async (apiCallback, url) => {
    const cacheRes = await getLatestCache(url);
    const callback = new Promise((resolve, reject) => {
      (async () => {
        const apiRes = await handleCallback(apiCallback);
        if (apiRes.data) {
          setAxiosCache(url, apiRes.data);
          resolve({ data: apiRes.data, cache: cacheRes });
        }
        if (apiRes.error && cacheRes) {
          resolve({ cache: cacheRes, error: apiRes.error });
        }
        reject(apiRes.error);
      })();
    });
    return handleResponse(cacheRes, callback);
  };
  var handleCacheStrategy = ({
    cacheStrategy,
    apiCallback,
    url
  }) => {
    if (cacheStrategy === "networkFirst" /* NETWORK_FIRST */) {
      return handleNetworkFirst(apiCallback, url);
    }
    if (cacheStrategy === "cacheThenNetwork" /* CACHE_THEN_NETWORK */) {
      return handleCacheThenNetwork(apiCallback, url);
    }
    return handleNetworkOnly(apiCallback);
  };

  // lib/service/leaderboardEventory.service.ts
  var endpoint = `/v1/leaderboards/eventory`;
  var CANCEL_TIME_OUT = 5e3;
  var getFetchURL = (apiEndpoint, params, env) => {
    const baseURL = getGoapiUrl(env);
    const fetchURL = new URL(baseURL + apiEndpoint);
    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (value) {
        fetchURL.searchParams.append(key, value.toString());
      }
    });
    return fetchURL.toString();
  };
  var getParsedURL = ({
    apiEndpoint,
    type,
    limit,
    cursor,
    withoutOnliveInfo,
    env
  }) => {
    const params = {
      containerID: getType(type, env),
      count: limit,
      cursor,
      withoutOnliveInfo
    };
    if (cursor) {
      const [timestampCursor] = cursor.split("-", 1);
      const [totalCount, start, shardSize] = timestampCursor.split(":").slice(1);
      const parsedCursor = `${totalCount}:${start}:${shardSize}`;
      const parsedParams = { ...params, cursor: parsedCursor };
      return getFetchURL(apiEndpoint, parsedParams, env);
    }
    return getFetchURL(apiEndpoint, params, env);
  };
  var getLBDataCallback = ({
    apiEndpoint,
    eventoryApi,
    type,
    limit,
    cursor,
    withoutOnliveInfo,
    cancelToken,
    env
  }) => eventoryApi.get(apiEndpoint, {
    params: {
      containerID: getType(type, env),
      count: limit,
      cursor,
      withoutOnliveInfo
    },
    cancelToken
  });
  var getLeaderboardEventory = async ({
    type,
    cancelToken,
    limit = 1e3,
    cursor = "",
    withoutOnliveInfo,
    strategy,
    env
  }) => {
    const eventoryApi = getInstanceEventory(env);
    if (!withoutOnliveInfo) {
      const responseHandler = (response) => response;
      const errorHandler = (error) => {
        if (error?.code === "ECONNABORTED" /* TIMEOUT */) {
          const payload = error?.config?.params;
          if (!payload.withoutOnliveInfo) {
            delete eventoryApi.defaults.timeout;
            return eventoryApi.get(endpoint, {
              params: {
                ...payload,
                withoutOnliveInfo: true
              },
              cancelToken
            });
          }
        }
        return Promise.reject(error);
      };
      eventoryApi.defaults.timeout = CANCEL_TIME_OUT;
      eventoryApi.interceptors.response.use(responseHandler, errorHandler);
    }
    const parsedURL = getParsedURL({
      apiEndpoint: endpoint,
      type,
      limit,
      cursor,
      withoutOnliveInfo,
      env
    });
    const responseData = await handleCacheStrategy({
      cacheStrategy: strategy,
      apiCallback: getLBDataCallback({
        apiEndpoint: endpoint,
        type,
        limit,
        cursor,
        withoutOnliveInfo,
        cancelToken,
        eventoryApi,
        env
      }),
      url: parsedURL
    });
    return responseData;
  };

  // lib/hooks/useTypeApi.ts
  var endpoint2 = `/v1/leaderboards/eventory`;
  var useTypeApi = ({
    apiList = [],
    realTime,
    initialData,
    cacheStrategy,
    opt = {
      limit: 1e3,
      cursor: "",
      withoutOnliveInfo: false
    },
    env
  }) => {
    const [requestError, setRequestError] = (0, import_react7.useState)();
    const [leaderboardData, setLeaderboardData] = (0, import_react7.useState)(initialData);
    const [suspend, setSuspend] = (0, import_react7.useState)(false);
    const [reload, setReload] = (0, import_react7.useState)(false);
    const timeoutKey = (0, import_react7.useRef)(0);
    const { limit, cursor, withoutOnliveInfo } = opt;
    const initialConfig = (0, import_react7.useMemo)(
      () => ({
        cacheData: [],
        networkData: [],
        options: [],
        sources: []
      }),
      []
    );
    if (initialConfig.options.length !== apiList.length) {
      apiList.forEach(() => {
        initialConfig.cacheData = [...initialConfig.cacheData, []];
        initialConfig.networkData = [...initialConfig.networkData, []];
        initialConfig.options = [
          ...initialConfig.options,
          {
            limit,
            cursor,
            withoutOnliveInfo
          }
        ];
        initialConfig.sources = [
          ...initialConfig.sources,
          axios_default.CancelToken.source()
        ];
      });
    }
    const [cacheData, setCacheData] = (0, import_react7.useState)(initialConfig.cacheData);
    const [networkData, setNetworkData] = (0, import_react7.useState)(
      initialConfig.networkData
    );
    const [options, setOptions] = (0, import_react7.useState)(
      initialConfig.options
    );
    const [loading, setLoading] = (0, import_react7.useState)(false);
    const [polling, setPolling] = (0, import_react7.useState)(false);
    const sourceRef = (0, import_react7.useRef)(initialConfig.sources);
    const isFirstInitRef = (0, import_react7.useRef)(true);
    const isFirstInitErrorRef = (0, import_react7.useRef)(false);
    const shouldDelayRef = (0, import_react7.useRef)(false);
    const hasInitCacheRef = (0, import_react7.useRef)(false);
    const finishedGetLBProcessRef = (0, import_react7.useRef)(false);
    const reacquireCountRef = (0, import_react7.useRef)(0);
    const finalCacheStrategyRef = (0, import_react7.useRef)();
    const { cacheStrategy: defaultCacheStrategy } = (0, import_react7.useMemo)(
      () => getApiUrlStrategy(endpoint2, "get" /* GET */),
      []
    );
    const getApiPromiseList = (0, import_react7.useCallback)(
      (strategy, apis = []) => apis.map((type, index) => {
        if (isFirstInitRef.current || options[index]?.cursor) {
          return getLeaderboardEventory({
            type,
            cancelToken: sourceRef.current[index].token,
            limit: options[index]?.limit,
            cursor: options[index]?.cursor,
            withoutOnliveInfo: options[index]?.withoutOnliveInfo,
            strategy,
            env
          });
        }
        return void 0;
      }).filter(
        (i2) => Boolean(i2)
      ),
      [options]
    );
    const getRequestApiIndex = (0, import_react7.useCallback)(
      (apis = []) => apis.map((_2, index) => {
        if (isFirstInitRef.current || options[index]?.cursor) {
          return index;
        }
        return void 0;
      }).filter((i2) => Number.isFinite(i2)),
      [options]
    );
    const setOthersStrategyData = (0, import_react7.useCallback)(
      (results, requestApiIndex) => {
        setNetworkData((pre) => {
          if (!pre)
            return results.map((result) => result.data.data.data);
          const newData = pre.map((preResult, index) => {
            const foundIndex = requestApiIndex.findIndex(
              (targetIndex) => index === targetIndex
            );
            const nextData = results[foundIndex]?.data?.data?.data;
            const combineData = foundIndex >= 0 && nextData && preResult ? [...preResult, ...nextData] : preResult;
            return combineData;
          });
          return newData;
        });
        return results;
      },
      []
    );
    const setCacheThenNetworkData = (0, import_react7.useCallback)(
      async (results, requestApiIndex) => {
        setCacheData((pre) => {
          const newData = pre.map((preResult, index) => {
            const foundIndex = requestApiIndex.findIndex(
              (targetIndex) => index === targetIndex
            );
            const nextCache = results[foundIndex]?.data?.data?.data;
            if (foundIndex >= 0 && nextCache && preResult) {
              hasInitCacheRef.current = true;
              return [...preResult, ...nextCache];
            }
            return preResult;
          });
          return newData;
        });
        if (!isFirstInitErrorRef.current && shouldDelayRef.current) {
          setReload(false);
          await sleep(1e3);
        }
        const networkCallbacks = results.map((result) => result.callback);
        const callbackResponses = await Promise.all(networkCallbacks);
        const callbacksError = callbackResponses.some(
          (callbackRes) => callbackRes?.error
        );
        if (callbacksError && isFirstInitRef.current) {
          isFirstInitErrorRef.current = true;
        }
        shouldDelayRef.current = callbacksError;
        if (!isFirstInitErrorRef.current && shouldDelayRef.current) {
          setReload(true);
        }
        const dataSource = isFirstInitErrorRef.current ? "cache" : "data";
        setNetworkData((pre) => {
          const newData = pre.map((preResult, index) => {
            const foundIndex = requestApiIndex.findIndex(
              (targetIndex) => index === targetIndex
            );
            const nextData = callbackResponses[foundIndex]?.[dataSource]?.data.data;
            const combineData = foundIndex >= 0 && nextData && preResult ? [...preResult, ...nextData] : preResult;
            return combineData;
          });
          return newData;
        });
        return callbackResponses;
      },
      []
    );
    const getNextOptions = (0, import_react7.useCallback)(
      (results, requestApiIndex, strategy) => options.map((option, index) => {
        const foundIndex = requestApiIndex.findIndex(
          (targetIndex) => index === targetIndex
        );
        if (foundIndex >= 0) {
          const dataSource = isFirstInitErrorRef.current ? "cache" : "data";
          const { nextCursor } = isFirstInitErrorRef.current ? results[foundIndex].cache.data : results[foundIndex].data.data;
          return {
            limit: opt.limit,
            cursor: nextCursor,
            withoutOnliveInfo: opt.withoutOnliveInfo
          };
        }
        return option;
      }),
      [opt.limit, opt.withoutOnliveInfo, options]
    );
    const handleLeaderboardData = (0, import_react7.useCallback)(
      async (apis = []) => {
        setRequestError(void 0);
        const loadingStatus = isFirstInitRef.current && reacquireCountRef.current < 1;
        setLoading(loadingStatus);
        setPolling(true);
        if (cacheStrategy === "networkOnly" /* NETWORK_ONLY */) {
          finalCacheStrategyRef.current = cacheStrategy;
        }
        if (!finalCacheStrategyRef.current) {
          const isCacheSupported = await checkCacheUsable();
          finalCacheStrategyRef.current = isCacheSupported ? cacheStrategy ?? defaultCacheStrategy : "networkOnly" /* NETWORK_ONLY */;
        }
        const apiPromiseList = getApiPromiseList(
          finalCacheStrategyRef.current,
          apis
        );
        if (!apiPromiseList.length)
          return;
        const requestApiIndex = getRequestApiIndex(apis);
        finishedGetLBProcessRef.current = false;
        let nextOptions = [];
        try {
          const results = await Promise.all(
            apiPromiseList
          );
          if (finalCacheStrategyRef.current !== "cacheThenNetwork" /* CACHE_THEN_NETWORK */) {
            const responses2 = setOthersStrategyData(results, requestApiIndex);
            nextOptions = getNextOptions(
              responses2,
              requestApiIndex,
              finalCacheStrategyRef.current
            );
            return;
          }
          const responses = await setCacheThenNetworkData(
            results,
            requestApiIndex
          );
          nextOptions = getNextOptions(
            responses,
            requestApiIndex,
            finalCacheStrategyRef.current
          );
        } catch (error) {
          setRequestError(error);
          if (finalCacheStrategyRef.current !== "cacheThenNetwork" /* CACHE_THEN_NETWORK */) {
            setOptions(initialConfig.options);
          }
        } finally {
          setLoading(false);
          setPolling(false);
          isFirstInitRef.current = false;
          if (nextOptions.length > 0 && (isFirstInitErrorRef.current || !shouldDelayRef.current)) {
            setOptions(nextOptions);
          }
          finishedGetLBProcessRef.current = true;
        }
      },
      [
        cacheStrategy,
        defaultCacheStrategy,
        getApiPromiseList,
        getNextOptions,
        getRequestApiIndex,
        initialConfig.options,
        setCacheThenNetworkData,
        setOthersStrategyData
      ]
    );
    const handleLeaderboardDataStrategy = (0, import_react7.useCallback)(async () => {
      handleLeaderboardData(apiList);
    }, [apiList, handleLeaderboardData]);
    const refresh = (0, import_react7.useCallback)(() => {
      setCacheData(initialConfig.cacheData);
      setNetworkData(initialConfig.networkData);
      isFirstInitRef.current = true;
      isFirstInitErrorRef.current = false;
      handleLeaderboardDataStrategy();
    }, [handleLeaderboardDataStrategy, initialConfig]);
    const getFinishedRetrievedAllNetworkData = (0, import_react7.useCallback)(
      () => networkData?.every((data, index) => {
        if (!finishedGetLBProcessRef.current)
          return false;
        const nextCursor = options[index]?.cursor;
        if (nextCursor) {
          const [timestampCursor] = nextCursor.split("-", 1);
          const totalCount = timestampCursor.split(":").slice(1)[0];
          return networkData[index].length === +totalCount;
        }
        return true;
      }),
      [networkData, options]
    );
    (0, import_react7.useEffect)(() => {
      if (reload) {
        handleLeaderboardDataStrategy();
      }
    }, [apiList, handleLeaderboardData, handleLeaderboardDataStrategy, reload]);
    (0, import_react7.useEffect)(() => {
      const handleVisibilityChange = () => {
        if (document.visibilityState === "hidden") {
          setSuspend(true);
        } else {
          setSuspend(false);
        }
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }, []);
    (0, import_react7.useEffect)(() => {
      if (isFirstInitRef.current && hasInitCacheRef.current) {
        setLoading(false);
      }
    }, [cacheData, initialConfig.cacheData]);
    (0, import_react7.useEffect)(() => {
      const finishedRetrievedAllNetworkData = getFinishedRetrievedAllNetworkData();
      if (finishedRetrievedAllNetworkData && networkData.length > 0) {
        reacquireCountRef.current += 1;
      }
    }, [networkData, getFinishedRetrievedAllNetworkData]);
    (0, import_react7.useEffect)(() => {
      const canSetNetworkData = networkData.some((data) => data.length > 0);
      const dataSource = canSetNetworkData ? networkData : cacheData;
      if (realTime <= 0) {
        setLeaderboardData(dataSource);
        return;
      }
      const finishedAll = options.every((option) => !option.cursor);
      if (reacquireCountRef.current === 0) {
        setLeaderboardData(dataSource);
      } else if (reacquireCountRef.current > 0) {
        if (finishedAll && finishedGetLBProcessRef.current && canSetNetworkData)
          setLeaderboardData(networkData);
      }
    }, [networkData, cacheData, options, realTime, apiList]);
    (0, import_react7.useEffect)(() => {
      const hasMore = options.find((option) => option.cursor);
      if (hasMore) {
        handleLeaderboardDataStrategy();
      }
    }, [handleLeaderboardDataStrategy, options]);
    (0, import_react7.useEffect)(() => {
      if (polling || suspend)
        return;
      const finishedRetrievedAllNetworkData = getFinishedRetrievedAllNetworkData();
      if (!polling && realTime > 0 && !isFirstInitRef.current && finishedRetrievedAllNetworkData) {
        if (timeoutKey.current) {
          clearTimeout(timeoutKey.current);
          timeoutKey.current = 0;
        }
        timeoutKey.current = window.setTimeout(refresh, realTime);
      }
    }, [getFinishedRetrievedAllNetworkData, polling, realTime, refresh, suspend]);
    (0, import_react7.useEffect)(() => {
      if (suspend || !isFirstInitRef.current)
        return;
      handleLeaderboardDataStrategy();
    }, [handleLeaderboardDataStrategy, suspend]);
    return {
      loading,
      polling,
      requestError,
      leaderboardData
    };
  };

  // lib/hooks/useFilter.ts
  var import_react8 = __toESM(require_react());
  var useFilter = (initialData) => {
    const [data, setData] = (0, import_react8.useState)(initialData);
    const [keyword, setKeyword] = (0, import_react8.useState)("");
    const getFilterData = (0, import_react8.useMemo)(
      () => initialData.filter((item) => {
        const name = (item.userInfo.displayName || item.userInfo.openID) ?? "";
        return name.toLowerCase().includes(keyword.trim().toLowerCase());
      }),
      [initialData, keyword]
    );
    const handleOnChange = (0, import_react8.useMemo)(
      () => debounce((value) => {
        setKeyword(value);
        if (!value) {
          setData(initialData);
          return;
        }
        const filterData = getFilterData;
        setData(filterData);
      }, 500),
      [initialData, getFilterData]
    );
    (0, import_react8.useEffect)(() => {
      if (keyword) {
        setData(() => {
          const filterData = getFilterData;
          return filterData;
        });
      } else {
        setData(initialData);
      }
    }, [initialData, keyword, getFilterData]);
    return { data, handleOnChange };
  };

  // lib/hooks/useScrollToLoadingContainer.ts
  var import_react9 = __toESM(require_react());
  var useScrollToLoadingContainer = (loading) => {
    (0, import_react9.useEffect)(() => {
      if (loading) {
        const target = document.getElementById("loading-container");
        if (target) {
          target.scrollIntoView();
        }
      }
    }, [loading]);
  };

  // lib/hooks/useKeyboard.ts
  var import_react10 = __toESM(require_react());
  var switchPageEvent = (page) => {
    const search = qs();
    window.scrollTo(0, 0);
    const query = {
      ...search,
      page
    };
    getNextLocation(query);
  };
  var eventFunc = (event, settings) => {
    const setting = settings.find((item) => item.key === event.key);
    if (setting) {
      switch (setting.type) {
        case 0 /* PAGE */: {
          switchPageEvent(setting.page);
          break;
        }
        case 1 /* CUSTOM */: {
          setting.fn();
          break;
        }
        default:
          break;
      }
    }
  };
  var useKeyboard = (settings) => {
    (0, import_react10.useEffect)(() => {
      const handleOnKeyup = (event) => eventFunc(event, settings);
      window.addEventListener("keyup", handleOnKeyup);
      return () => {
        window.removeEventListener("keyup", handleOnKeyup);
      };
    }, [settings]);
  };

  // lib/hooks/useFollower.ts
  var import_react11 = __toESM(require_react());

  // lib/service/follower.service.ts
  var DEFAULT_EACH_FOLLOWER_COUNT = 100;
  var getUserFollowers = async ({
    userID,
    accessToken,
    jwtAccessToken,
    cursor,
    count = DEFAULT_EACH_FOLLOWER_COUNT,
    callback,
    preData = []
  }) => {
    const axios2 = getInstanceEventory();
    const url = `/v1/users/${userID}/followeeIDs`;
    const res = await axios2.get(url, {
      headers: {
        ...jwtAccessToken && {
          Authorization: `Bearer ${jwtAccessToken}`
        },
        ...accessToken && { accessToken }
      },
      params: {
        count,
        cursor
      }
    });
    const { nextCursor, followeeIDs } = res.data;
    const currentData = [...preData, ...followeeIDs];
    if (callback) {
      callback(currentData);
    }
    if (nextCursor) {
      const nextData = await getUserFollowers({
        userID,
        accessToken,
        jwtAccessToken,
        cursor: nextCursor,
        callback,
        preData: currentData
      });
      return [...followeeIDs, ...nextData];
    }
    return followeeIDs;
  };

  // lib/hooks/useFollower.ts
  var useFollower = (userID, accessToken, jwtAccessToken) => {
    const [followers, setFollowers] = (0, import_react11.useState)([]);
    const [errorMsg, setErrorMsg] = (0, import_react11.useState)("");
    (0, import_react11.useEffect)(() => {
      const fetchFollowers = async () => {
        try {
          if (!userID) {
            setErrorMsg("empty userID");
            return;
          }
          if (!accessToken && !jwtAccessToken) {
            setErrorMsg("empty token");
            return;
          }
          const callback = (data2) => {
            setFollowers(data2);
          };
          const data = await getUserFollowers({
            userID,
            accessToken,
            jwtAccessToken,
            callback
          });
          setFollowers(data);
          setErrorMsg("");
        } catch (error) {
          setFollowers([]);
          if (error?.response && error?.response.data) {
            setErrorMsg(error?.response.data?.errorMessage ?? "something wrong!");
          } else {
            setErrorMsg("something wrong!");
          }
        }
      };
      fetchFollowers();
    }, [userID, accessToken, jwtAccessToken]);
    return { followers, errorMsg };
  };

  // lib/hooks/useCheckWebview.ts
  var import_react12 = __toESM(require_react());
  var useCheckWebview = () => {
    const [isWebview, setIsWebview] = (0, import_react12.useState)(false);
    (0, import_react12.useEffect)(() => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const safari = /safari/.test(userAgent);
      const ios = /iphone|ipod|ipad/.test(userAgent);
      setIsWebview(ios && !safari || !ios && userAgent.includes("wv"));
    }, []);
    return isWebview;
  };

  // lib/hooks/useCacheImage.ts
  var import_react13 = __toESM(require_react());

  // node_modules/idb-keyval/dist/index.js
  function promisifyRequest(request) {
    return new Promise((resolve, reject) => {
      request.oncomplete = request.onsuccess = () => resolve(request.result);
      request.onabort = request.onerror = () => reject(request.error);
    });
  }
  function createStore(dbName, storeName) {
    const request = indexedDB.open(dbName);
    request.onupgradeneeded = () => request.result.createObjectStore(storeName);
    const dbp = promisifyRequest(request);
    return (txMode, callback) => dbp.then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
  }
  var defaultGetStoreFunc;
  function defaultGetStore() {
    if (!defaultGetStoreFunc) {
      defaultGetStoreFunc = createStore("keyval-store", "keyval");
    }
    return defaultGetStoreFunc;
  }
  function set(key, value, customStore = defaultGetStore()) {
    return customStore("readwrite", (store) => {
      store.put(value, key);
      return promisifyRequest(store.transaction);
    });
  }
  function getMany(keys, customStore = defaultGetStore()) {
    return customStore("readonly", (store) => Promise.all(keys.map((key) => promisifyRequest(store.get(key)))));
  }

  // lib/hooks/useCacheImage.ts
  var useCacheImage = (imageUrls) => {
    const [cacheImage, setCacheImage] = (0, import_react13.useState)({});
    const handleSetCache = async (url) => {
      const res = await axios_default.get(url, { responseType: "blob" });
      const reader = new FileReader();
      reader.readAsDataURL(res.data);
      reader.onloadend = () => {
        const base64data = reader.result;
        set(url, base64data);
        setCacheImage((state) => ({
          ...state,
          [url]: base64data
        }));
      };
    };
    (0, import_react13.useEffect)(() => {
      (async () => {
        const allImageCaches = await getMany(imageUrls);
        imageUrls.forEach((url, index) => {
          const cache = allImageCaches[index];
          if (cache) {
            setCacheImage((state) => ({
              ...state,
              [url]: cache
            }));
          } else {
            setCacheImage((state) => ({
              ...state,
              [url]: url
            }));
            window.requestIdleCallback(handleSetCache.bind(void 0, url));
          }
        });
      })();
    }, [JSON.stringify(imageUrls)]);
    return cacheImage;
  };

  // lib/hooks/index.ts
  var hooks_default = {
    useAutoNext,
    useCountdown,
    useItemTransition,
    useMockLeaderboard,
    usePageData,
    useLuckyDraw,
    useSyncScroll,
    useTypeApi,
    useFilter,
    useScrollToLoadingContainer,
    useKeyboard,
    useFollower,
    useCheckWebview,
    useCacheImage
  };

  // lib/components/TransitionLeaderboardWrapper.tsx
  var import_react14 = __toESM(require_react());
  var Wrapper = st.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
  var transitionStyle = {
    transition: "all 0.5s ease 0.3s"
  };
  var TransitionLeaderboardWrapper = import_react14.default.memo(({ user, itemStyle: itemStyle2, rowCount: rowCount2, children }) => {
    const { itemTransitionStyle } = useItemTransition_default(
      itemStyle2,
      transitionStyle,
      rowCount2,
      user.map((u2) => u2.rank)
    );
    function renderChild() {
      return import_react14.default.Children.map(children, (child, index) => {
        if (!import_react14.default.isValidElement(child) || !Array.isArray(itemTransitionStyle)) {
          throw new Error("Invalid child element");
        }
        return import_react14.default.cloneElement(child, {
          style: itemTransitionStyle[index],
          key: user[index].userInfo.userID,
          ...child.props
        });
      });
    }
    return /* @__PURE__ */ import_react14.default.createElement(Wrapper, null, renderChild());
  });

  // lib/components/VirtualizedList.tsx
  var import_react16 = __toESM(require_react());

  // node_modules/@babel/runtime/helpers/esm/extends.js
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
      for (var i2 = 1; i2 < arguments.length; i2++) {
        var source = arguments[i2];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }

  // node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
  function _assertThisInitialized(self2) {
    if (self2 === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self2;
  }

  // node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
  function _setPrototypeOf(o2, p2) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o3, p3) {
      o3.__proto__ = p3;
      return o3;
    };
    return _setPrototypeOf(o2, p2);
  }

  // node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }

  // node_modules/memoize-one/dist/memoize-one.esm.js
  var safeIsNaN = Number.isNaN || function ponyfill(value) {
    return typeof value === "number" && value !== value;
  };
  function isEqual(first, second) {
    if (first === second) {
      return true;
    }
    if (safeIsNaN(first) && safeIsNaN(second)) {
      return true;
    }
    return false;
  }
  function areInputsEqual(newInputs, lastInputs) {
    if (newInputs.length !== lastInputs.length) {
      return false;
    }
    for (var i2 = 0; i2 < newInputs.length; i2++) {
      if (!isEqual(newInputs[i2], lastInputs[i2])) {
        return false;
      }
    }
    return true;
  }
  function memoizeOne(resultFn, isEqual2) {
    if (isEqual2 === void 0) {
      isEqual2 = areInputsEqual;
    }
    var lastThis;
    var lastArgs = [];
    var lastResult;
    var calledOnce = false;
    function memoized() {
      var newArgs = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        newArgs[_i] = arguments[_i];
      }
      if (calledOnce && lastThis === this && isEqual2(newArgs, lastArgs)) {
        return lastResult;
      }
      lastResult = resultFn.apply(this, newArgs);
      calledOnce = true;
      lastThis = this;
      lastArgs = newArgs;
      return lastResult;
    }
    return memoized;
  }
  var memoize_one_esm_default = memoizeOne;

  // node_modules/react-window/dist/index.esm.js
  var import_react15 = __toESM(require_react());
  var hasNativePerformanceNow = typeof performance === "object" && typeof performance.now === "function";
  var now3 = hasNativePerformanceNow ? function() {
    return performance.now();
  } : function() {
    return Date.now();
  };
  function cancelTimeout(timeoutID) {
    cancelAnimationFrame(timeoutID.id);
  }
  function requestTimeout(callback, delay) {
    var start = now3();
    function tick() {
      if (now3() - start >= delay) {
        callback.call(null);
      } else {
        timeoutID.id = requestAnimationFrame(tick);
      }
    }
    var timeoutID = {
      id: requestAnimationFrame(tick)
    };
    return timeoutID;
  }
  var size = -1;
  function getScrollbarSize(recalculate) {
    if (recalculate === void 0) {
      recalculate = false;
    }
    if (size === -1 || recalculate) {
      var div = document.createElement("div");
      var style = div.style;
      style.width = "50px";
      style.height = "50px";
      style.overflow = "scroll";
      document.body.appendChild(div);
      size = div.offsetWidth - div.clientWidth;
      document.body.removeChild(div);
    }
    return size;
  }
  var cachedRTLResult = null;
  function getRTLOffsetType(recalculate) {
    if (recalculate === void 0) {
      recalculate = false;
    }
    if (cachedRTLResult === null || recalculate) {
      var outerDiv = document.createElement("div");
      var outerStyle = outerDiv.style;
      outerStyle.width = "50px";
      outerStyle.height = "50px";
      outerStyle.overflow = "scroll";
      outerStyle.direction = "rtl";
      var innerDiv = document.createElement("div");
      var innerStyle = innerDiv.style;
      innerStyle.width = "100px";
      innerStyle.height = "100px";
      outerDiv.appendChild(innerDiv);
      document.body.appendChild(outerDiv);
      if (outerDiv.scrollLeft > 0) {
        cachedRTLResult = "positive-descending";
      } else {
        outerDiv.scrollLeft = 1;
        if (outerDiv.scrollLeft === 0) {
          cachedRTLResult = "negative";
        } else {
          cachedRTLResult = "positive-ascending";
        }
      }
      document.body.removeChild(outerDiv);
      return cachedRTLResult;
    }
    return cachedRTLResult;
  }
  var devWarningsOverscanCount = null;
  var devWarningsOverscanRowsColumnsCount = null;
  var devWarningsTagName = null;
  if (true) {
    if (typeof window !== "undefined" && typeof window.WeakSet !== "undefined") {
      devWarningsOverscanCount = /* @__PURE__ */ new WeakSet();
      devWarningsOverscanRowsColumnsCount = /* @__PURE__ */ new WeakSet();
      devWarningsTagName = /* @__PURE__ */ new WeakSet();
    }
  }
  var IS_SCROLLING_DEBOUNCE_INTERVAL$1 = 150;
  var defaultItemKey$1 = function defaultItemKey(index, data) {
    return index;
  };
  var devWarningsDirection = null;
  var devWarningsTagName$1 = null;
  if (true) {
    if (typeof window !== "undefined" && typeof window.WeakSet !== "undefined") {
      devWarningsDirection = /* @__PURE__ */ new WeakSet();
      devWarningsTagName$1 = /* @__PURE__ */ new WeakSet();
    }
  }
  function createListComponent(_ref) {
    var _class;
    var getItemOffset2 = _ref.getItemOffset, getEstimatedTotalSize3 = _ref.getEstimatedTotalSize, getItemSize2 = _ref.getItemSize, getOffsetForIndexAndAlignment2 = _ref.getOffsetForIndexAndAlignment, getStartIndexForOffset2 = _ref.getStartIndexForOffset, getStopIndexForStartIndex2 = _ref.getStopIndexForStartIndex, initInstanceProps2 = _ref.initInstanceProps, shouldResetStyleCacheOnItemSizeChange = _ref.shouldResetStyleCacheOnItemSizeChange, validateProps2 = _ref.validateProps;
    return _class = /* @__PURE__ */ function(_PureComponent) {
      _inheritsLoose(List, _PureComponent);
      function List(props) {
        var _this;
        _this = _PureComponent.call(this, props) || this;
        _this._instanceProps = initInstanceProps2(_this.props, _assertThisInitialized(_this));
        _this._outerRef = void 0;
        _this._resetIsScrollingTimeoutId = null;
        _this.state = {
          instance: _assertThisInitialized(_this),
          isScrolling: false,
          scrollDirection: "forward",
          scrollOffset: typeof _this.props.initialScrollOffset === "number" ? _this.props.initialScrollOffset : 0,
          scrollUpdateWasRequested: false
        };
        _this._callOnItemsRendered = void 0;
        _this._callOnItemsRendered = memoize_one_esm_default(function(overscanStartIndex, overscanStopIndex, visibleStartIndex, visibleStopIndex) {
          return _this.props.onItemsRendered({
            overscanStartIndex,
            overscanStopIndex,
            visibleStartIndex,
            visibleStopIndex
          });
        });
        _this._callOnScroll = void 0;
        _this._callOnScroll = memoize_one_esm_default(function(scrollDirection, scrollOffset, scrollUpdateWasRequested) {
          return _this.props.onScroll({
            scrollDirection,
            scrollOffset,
            scrollUpdateWasRequested
          });
        });
        _this._getItemStyle = void 0;
        _this._getItemStyle = function(index) {
          var _this$props = _this.props, direction = _this$props.direction, itemSize = _this$props.itemSize, layout = _this$props.layout;
          var itemStyleCache = _this._getItemStyleCache(shouldResetStyleCacheOnItemSizeChange && itemSize, shouldResetStyleCacheOnItemSizeChange && layout, shouldResetStyleCacheOnItemSizeChange && direction);
          var style;
          if (itemStyleCache.hasOwnProperty(index)) {
            style = itemStyleCache[index];
          } else {
            var _offset = getItemOffset2(_this.props, index, _this._instanceProps);
            var size2 = getItemSize2(_this.props, index, _this._instanceProps);
            var isHorizontal = direction === "horizontal" || layout === "horizontal";
            var isRtl = direction === "rtl";
            var offsetHorizontal = isHorizontal ? _offset : 0;
            itemStyleCache[index] = style = {
              position: "absolute",
              left: isRtl ? void 0 : offsetHorizontal,
              right: isRtl ? offsetHorizontal : void 0,
              top: !isHorizontal ? _offset : 0,
              height: !isHorizontal ? size2 : "100%",
              width: isHorizontal ? size2 : "100%"
            };
          }
          return style;
        };
        _this._getItemStyleCache = void 0;
        _this._getItemStyleCache = memoize_one_esm_default(function(_2, __, ___) {
          return {};
        });
        _this._onScrollHorizontal = function(event) {
          var _event$currentTarget = event.currentTarget, clientWidth = _event$currentTarget.clientWidth, scrollLeft = _event$currentTarget.scrollLeft, scrollWidth = _event$currentTarget.scrollWidth;
          _this.setState(function(prevState) {
            if (prevState.scrollOffset === scrollLeft) {
              return null;
            }
            var direction = _this.props.direction;
            var scrollOffset = scrollLeft;
            if (direction === "rtl") {
              switch (getRTLOffsetType()) {
                case "negative":
                  scrollOffset = -scrollLeft;
                  break;
                case "positive-descending":
                  scrollOffset = scrollWidth - clientWidth - scrollLeft;
                  break;
              }
            }
            scrollOffset = Math.max(0, Math.min(scrollOffset, scrollWidth - clientWidth));
            return {
              isScrolling: true,
              scrollDirection: prevState.scrollOffset < scrollLeft ? "forward" : "backward",
              scrollOffset,
              scrollUpdateWasRequested: false
            };
          }, _this._resetIsScrollingDebounced);
        };
        _this._onScrollVertical = function(event) {
          var _event$currentTarget2 = event.currentTarget, clientHeight = _event$currentTarget2.clientHeight, scrollHeight = _event$currentTarget2.scrollHeight, scrollTop = _event$currentTarget2.scrollTop;
          _this.setState(function(prevState) {
            if (prevState.scrollOffset === scrollTop) {
              return null;
            }
            var scrollOffset = Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight));
            return {
              isScrolling: true,
              scrollDirection: prevState.scrollOffset < scrollOffset ? "forward" : "backward",
              scrollOffset,
              scrollUpdateWasRequested: false
            };
          }, _this._resetIsScrollingDebounced);
        };
        _this._outerRefSetter = function(ref) {
          var outerRef = _this.props.outerRef;
          _this._outerRef = ref;
          if (typeof outerRef === "function") {
            outerRef(ref);
          } else if (outerRef != null && typeof outerRef === "object" && outerRef.hasOwnProperty("current")) {
            outerRef.current = ref;
          }
        };
        _this._resetIsScrollingDebounced = function() {
          if (_this._resetIsScrollingTimeoutId !== null) {
            cancelTimeout(_this._resetIsScrollingTimeoutId);
          }
          _this._resetIsScrollingTimeoutId = requestTimeout(_this._resetIsScrolling, IS_SCROLLING_DEBOUNCE_INTERVAL$1);
        };
        _this._resetIsScrolling = function() {
          _this._resetIsScrollingTimeoutId = null;
          _this.setState({
            isScrolling: false
          }, function() {
            _this._getItemStyleCache(-1, null);
          });
        };
        return _this;
      }
      List.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
        validateSharedProps$1(nextProps, prevState);
        validateProps2(nextProps);
        return null;
      };
      var _proto = List.prototype;
      _proto.scrollTo = function scrollTo(scrollOffset) {
        scrollOffset = Math.max(0, scrollOffset);
        this.setState(function(prevState) {
          if (prevState.scrollOffset === scrollOffset) {
            return null;
          }
          return {
            scrollDirection: prevState.scrollOffset < scrollOffset ? "forward" : "backward",
            scrollOffset,
            scrollUpdateWasRequested: true
          };
        }, this._resetIsScrollingDebounced);
      };
      _proto.scrollToItem = function scrollToItem(index, align) {
        if (align === void 0) {
          align = "auto";
        }
        var _this$props2 = this.props, itemCount = _this$props2.itemCount, layout = _this$props2.layout;
        var scrollOffset = this.state.scrollOffset;
        index = Math.max(0, Math.min(index, itemCount - 1));
        var scrollbarSize = 0;
        if (this._outerRef) {
          var outerRef = this._outerRef;
          if (layout === "vertical") {
            scrollbarSize = outerRef.scrollWidth > outerRef.clientWidth ? getScrollbarSize() : 0;
          } else {
            scrollbarSize = outerRef.scrollHeight > outerRef.clientHeight ? getScrollbarSize() : 0;
          }
        }
        this.scrollTo(getOffsetForIndexAndAlignment2(this.props, index, align, scrollOffset, this._instanceProps, scrollbarSize));
      };
      _proto.componentDidMount = function componentDidMount() {
        var _this$props3 = this.props, direction = _this$props3.direction, initialScrollOffset = _this$props3.initialScrollOffset, layout = _this$props3.layout;
        if (typeof initialScrollOffset === "number" && this._outerRef != null) {
          var outerRef = this._outerRef;
          if (direction === "horizontal" || layout === "horizontal") {
            outerRef.scrollLeft = initialScrollOffset;
          } else {
            outerRef.scrollTop = initialScrollOffset;
          }
        }
        this._callPropsCallbacks();
      };
      _proto.componentDidUpdate = function componentDidUpdate() {
        var _this$props4 = this.props, direction = _this$props4.direction, layout = _this$props4.layout;
        var _this$state = this.state, scrollOffset = _this$state.scrollOffset, scrollUpdateWasRequested = _this$state.scrollUpdateWasRequested;
        if (scrollUpdateWasRequested && this._outerRef != null) {
          var outerRef = this._outerRef;
          if (direction === "horizontal" || layout === "horizontal") {
            if (direction === "rtl") {
              switch (getRTLOffsetType()) {
                case "negative":
                  outerRef.scrollLeft = -scrollOffset;
                  break;
                case "positive-ascending":
                  outerRef.scrollLeft = scrollOffset;
                  break;
                default:
                  var clientWidth = outerRef.clientWidth, scrollWidth = outerRef.scrollWidth;
                  outerRef.scrollLeft = scrollWidth - clientWidth - scrollOffset;
                  break;
              }
            } else {
              outerRef.scrollLeft = scrollOffset;
            }
          } else {
            outerRef.scrollTop = scrollOffset;
          }
        }
        this._callPropsCallbacks();
      };
      _proto.componentWillUnmount = function componentWillUnmount() {
        if (this._resetIsScrollingTimeoutId !== null) {
          cancelTimeout(this._resetIsScrollingTimeoutId);
        }
      };
      _proto.render = function render() {
        var _this$props5 = this.props, children = _this$props5.children, className = _this$props5.className, direction = _this$props5.direction, height = _this$props5.height, innerRef = _this$props5.innerRef, innerElementType = _this$props5.innerElementType, innerTagName = _this$props5.innerTagName, itemCount = _this$props5.itemCount, itemData = _this$props5.itemData, _this$props5$itemKey = _this$props5.itemKey, itemKey = _this$props5$itemKey === void 0 ? defaultItemKey$1 : _this$props5$itemKey, layout = _this$props5.layout, outerElementType = _this$props5.outerElementType, outerTagName = _this$props5.outerTagName, style = _this$props5.style, useIsScrolling = _this$props5.useIsScrolling, width = _this$props5.width;
        var isScrolling = this.state.isScrolling;
        var isHorizontal = direction === "horizontal" || layout === "horizontal";
        var onScroll = isHorizontal ? this._onScrollHorizontal : this._onScrollVertical;
        var _this$_getRangeToRend = this._getRangeToRender(), startIndex = _this$_getRangeToRend[0], stopIndex = _this$_getRangeToRend[1];
        var items = [];
        if (itemCount > 0) {
          for (var _index = startIndex; _index <= stopIndex; _index++) {
            items.push((0, import_react15.createElement)(children, {
              data: itemData,
              key: itemKey(_index, itemData),
              index: _index,
              isScrolling: useIsScrolling ? isScrolling : void 0,
              style: this._getItemStyle(_index)
            }));
          }
        }
        var estimatedTotalSize = getEstimatedTotalSize3(this.props, this._instanceProps);
        return (0, import_react15.createElement)(outerElementType || outerTagName || "div", {
          className,
          onScroll,
          ref: this._outerRefSetter,
          style: _extends({
            position: "relative",
            height,
            width,
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            willChange: "transform",
            direction
          }, style)
        }, (0, import_react15.createElement)(innerElementType || innerTagName || "div", {
          children: items,
          ref: innerRef,
          style: {
            height: isHorizontal ? "100%" : estimatedTotalSize,
            pointerEvents: isScrolling ? "none" : void 0,
            width: isHorizontal ? estimatedTotalSize : "100%"
          }
        }));
      };
      _proto._callPropsCallbacks = function _callPropsCallbacks() {
        if (typeof this.props.onItemsRendered === "function") {
          var itemCount = this.props.itemCount;
          if (itemCount > 0) {
            var _this$_getRangeToRend2 = this._getRangeToRender(), _overscanStartIndex = _this$_getRangeToRend2[0], _overscanStopIndex = _this$_getRangeToRend2[1], _visibleStartIndex = _this$_getRangeToRend2[2], _visibleStopIndex = _this$_getRangeToRend2[3];
            this._callOnItemsRendered(_overscanStartIndex, _overscanStopIndex, _visibleStartIndex, _visibleStopIndex);
          }
        }
        if (typeof this.props.onScroll === "function") {
          var _this$state2 = this.state, _scrollDirection = _this$state2.scrollDirection, _scrollOffset = _this$state2.scrollOffset, _scrollUpdateWasRequested = _this$state2.scrollUpdateWasRequested;
          this._callOnScroll(_scrollDirection, _scrollOffset, _scrollUpdateWasRequested);
        }
      };
      _proto._getRangeToRender = function _getRangeToRender() {
        var _this$props6 = this.props, itemCount = _this$props6.itemCount, overscanCount = _this$props6.overscanCount;
        var _this$state3 = this.state, isScrolling = _this$state3.isScrolling, scrollDirection = _this$state3.scrollDirection, scrollOffset = _this$state3.scrollOffset;
        if (itemCount === 0) {
          return [0, 0, 0, 0];
        }
        var startIndex = getStartIndexForOffset2(this.props, scrollOffset, this._instanceProps);
        var stopIndex = getStopIndexForStartIndex2(this.props, startIndex, scrollOffset, this._instanceProps);
        var overscanBackward = !isScrolling || scrollDirection === "backward" ? Math.max(1, overscanCount) : 1;
        var overscanForward = !isScrolling || scrollDirection === "forward" ? Math.max(1, overscanCount) : 1;
        return [Math.max(0, startIndex - overscanBackward), Math.max(0, Math.min(itemCount - 1, stopIndex + overscanForward)), startIndex, stopIndex];
      };
      return List;
    }(import_react15.PureComponent), _class.defaultProps = {
      direction: "ltr",
      itemData: void 0,
      layout: "vertical",
      overscanCount: 2,
      useIsScrolling: false
    }, _class;
  }
  var validateSharedProps$1 = function validateSharedProps(_ref2, _ref3) {
    var children = _ref2.children, direction = _ref2.direction, height = _ref2.height, layout = _ref2.layout, innerTagName = _ref2.innerTagName, outerTagName = _ref2.outerTagName, width = _ref2.width;
    var instance = _ref3.instance;
    if (true) {
      if (innerTagName != null || outerTagName != null) {
        if (devWarningsTagName$1 && !devWarningsTagName$1.has(instance)) {
          devWarningsTagName$1.add(instance);
          console.warn("The innerTagName and outerTagName props have been deprecated. Please use the innerElementType and outerElementType props instead.");
        }
      }
      var isHorizontal = direction === "horizontal" || layout === "horizontal";
      switch (direction) {
        case "horizontal":
        case "vertical":
          if (devWarningsDirection && !devWarningsDirection.has(instance)) {
            devWarningsDirection.add(instance);
            console.warn('The direction prop should be either "ltr" (default) or "rtl". Please use the layout prop to specify "vertical" (default) or "horizontal" orientation.');
          }
          break;
        case "ltr":
        case "rtl":
          break;
        default:
          throw Error('An invalid "direction" prop has been specified. Value should be either "ltr" or "rtl". ' + ('"' + direction + '" was specified.'));
      }
      switch (layout) {
        case "horizontal":
        case "vertical":
          break;
        default:
          throw Error('An invalid "layout" prop has been specified. Value should be either "horizontal" or "vertical". ' + ('"' + layout + '" was specified.'));
      }
      if (children == null) {
        throw Error('An invalid "children" prop has been specified. Value should be a React component. ' + ('"' + (children === null ? "null" : typeof children) + '" was specified.'));
      }
      if (isHorizontal && typeof width !== "number") {
        throw Error('An invalid "width" prop has been specified. Horizontal lists must specify a number for width. ' + ('"' + (width === null ? "null" : typeof width) + '" was specified.'));
      } else if (!isHorizontal && typeof height !== "number") {
        throw Error('An invalid "height" prop has been specified. Vertical lists must specify a number for height. ' + ('"' + (height === null ? "null" : typeof height) + '" was specified.'));
      }
    }
  };
  var DEFAULT_ESTIMATED_ITEM_SIZE$1 = 50;
  var getItemMetadata$1 = function getItemMetadata(props, index, instanceProps) {
    var _ref = props, itemSize = _ref.itemSize;
    var itemMetadataMap = instanceProps.itemMetadataMap, lastMeasuredIndex = instanceProps.lastMeasuredIndex;
    if (index > lastMeasuredIndex) {
      var offset = 0;
      if (lastMeasuredIndex >= 0) {
        var itemMetadata = itemMetadataMap[lastMeasuredIndex];
        offset = itemMetadata.offset + itemMetadata.size;
      }
      for (var i2 = lastMeasuredIndex + 1; i2 <= index; i2++) {
        var size2 = itemSize(i2);
        itemMetadataMap[i2] = {
          offset,
          size: size2
        };
        offset += size2;
      }
      instanceProps.lastMeasuredIndex = index;
    }
    return itemMetadataMap[index];
  };
  var findNearestItem$1 = function findNearestItem(props, instanceProps, offset) {
    var itemMetadataMap = instanceProps.itemMetadataMap, lastMeasuredIndex = instanceProps.lastMeasuredIndex;
    var lastMeasuredItemOffset = lastMeasuredIndex > 0 ? itemMetadataMap[lastMeasuredIndex].offset : 0;
    if (lastMeasuredItemOffset >= offset) {
      return findNearestItemBinarySearch$1(props, instanceProps, lastMeasuredIndex, 0, offset);
    } else {
      return findNearestItemExponentialSearch$1(props, instanceProps, Math.max(0, lastMeasuredIndex), offset);
    }
  };
  var findNearestItemBinarySearch$1 = function findNearestItemBinarySearch(props, instanceProps, high, low, offset) {
    while (low <= high) {
      var middle = low + Math.floor((high - low) / 2);
      var currentOffset = getItemMetadata$1(props, middle, instanceProps).offset;
      if (currentOffset === offset) {
        return middle;
      } else if (currentOffset < offset) {
        low = middle + 1;
      } else if (currentOffset > offset) {
        high = middle - 1;
      }
    }
    if (low > 0) {
      return low - 1;
    } else {
      return 0;
    }
  };
  var findNearestItemExponentialSearch$1 = function findNearestItemExponentialSearch(props, instanceProps, index, offset) {
    var itemCount = props.itemCount;
    var interval = 1;
    while (index < itemCount && getItemMetadata$1(props, index, instanceProps).offset < offset) {
      index += interval;
      interval *= 2;
    }
    return findNearestItemBinarySearch$1(props, instanceProps, Math.min(index, itemCount - 1), Math.floor(index / 2), offset);
  };
  var getEstimatedTotalSize = function getEstimatedTotalSize2(_ref2, _ref3) {
    var itemCount = _ref2.itemCount;
    var itemMetadataMap = _ref3.itemMetadataMap, estimatedItemSize = _ref3.estimatedItemSize, lastMeasuredIndex = _ref3.lastMeasuredIndex;
    var totalSizeOfMeasuredItems = 0;
    if (lastMeasuredIndex >= itemCount) {
      lastMeasuredIndex = itemCount - 1;
    }
    if (lastMeasuredIndex >= 0) {
      var itemMetadata = itemMetadataMap[lastMeasuredIndex];
      totalSizeOfMeasuredItems = itemMetadata.offset + itemMetadata.size;
    }
    var numUnmeasuredItems = itemCount - lastMeasuredIndex - 1;
    var totalSizeOfUnmeasuredItems = numUnmeasuredItems * estimatedItemSize;
    return totalSizeOfMeasuredItems + totalSizeOfUnmeasuredItems;
  };
  var VariableSizeList = /* @__PURE__ */ createListComponent({
    getItemOffset: function getItemOffset(props, index, instanceProps) {
      return getItemMetadata$1(props, index, instanceProps).offset;
    },
    getItemSize: function getItemSize(props, index, instanceProps) {
      return instanceProps.itemMetadataMap[index].size;
    },
    getEstimatedTotalSize,
    getOffsetForIndexAndAlignment: function getOffsetForIndexAndAlignment(props, index, align, scrollOffset, instanceProps, scrollbarSize) {
      var direction = props.direction, height = props.height, layout = props.layout, width = props.width;
      var isHorizontal = direction === "horizontal" || layout === "horizontal";
      var size2 = isHorizontal ? width : height;
      var itemMetadata = getItemMetadata$1(props, index, instanceProps);
      var estimatedTotalSize = getEstimatedTotalSize(props, instanceProps);
      var maxOffset = Math.max(0, Math.min(estimatedTotalSize - size2, itemMetadata.offset));
      var minOffset = Math.max(0, itemMetadata.offset - size2 + itemMetadata.size + scrollbarSize);
      if (align === "smart") {
        if (scrollOffset >= minOffset - size2 && scrollOffset <= maxOffset + size2) {
          align = "auto";
        } else {
          align = "center";
        }
      }
      switch (align) {
        case "start":
          return maxOffset;
        case "end":
          return minOffset;
        case "center":
          return Math.round(minOffset + (maxOffset - minOffset) / 2);
        case "auto":
        default:
          if (scrollOffset >= minOffset && scrollOffset <= maxOffset) {
            return scrollOffset;
          } else if (scrollOffset < minOffset) {
            return minOffset;
          } else {
            return maxOffset;
          }
      }
    },
    getStartIndexForOffset: function getStartIndexForOffset(props, offset, instanceProps) {
      return findNearestItem$1(props, instanceProps, offset);
    },
    getStopIndexForStartIndex: function getStopIndexForStartIndex(props, startIndex, scrollOffset, instanceProps) {
      var direction = props.direction, height = props.height, itemCount = props.itemCount, layout = props.layout, width = props.width;
      var isHorizontal = direction === "horizontal" || layout === "horizontal";
      var size2 = isHorizontal ? width : height;
      var itemMetadata = getItemMetadata$1(props, startIndex, instanceProps);
      var maxOffset = scrollOffset + size2;
      var offset = itemMetadata.offset + itemMetadata.size;
      var stopIndex = startIndex;
      while (stopIndex < itemCount - 1 && offset < maxOffset) {
        stopIndex++;
        offset += getItemMetadata$1(props, stopIndex, instanceProps).size;
      }
      return stopIndex;
    },
    initInstanceProps: function initInstanceProps(props, instance) {
      var _ref4 = props, estimatedItemSize = _ref4.estimatedItemSize;
      var instanceProps = {
        itemMetadataMap: {},
        estimatedItemSize: estimatedItemSize || DEFAULT_ESTIMATED_ITEM_SIZE$1,
        lastMeasuredIndex: -1
      };
      instance.resetAfterIndex = function(index, shouldForceUpdate) {
        if (shouldForceUpdate === void 0) {
          shouldForceUpdate = true;
        }
        instanceProps.lastMeasuredIndex = Math.min(instanceProps.lastMeasuredIndex, index - 1);
        instance._getItemStyleCache(-1);
        if (shouldForceUpdate) {
          instance.forceUpdate();
        }
      };
      return instanceProps;
    },
    shouldResetStyleCacheOnItemSizeChange: false,
    validateProps: function validateProps(_ref5) {
      var itemSize = _ref5.itemSize;
      if (true) {
        if (typeof itemSize !== "function") {
          throw Error('An invalid "itemSize" prop has been specified. Value should be a function. ' + ('"' + (itemSize === null ? "null" : typeof itemSize) + '" was specified.'));
        }
      }
    }
  });

  // lib/components/VirtualizedList.tsx
  var StyledVariableSizeList = st(
    VariableSizeList
  )`
  height: ${(props) => props.calculatedHeight}px !important;
  overflow: hidden !important;
  .virtualized-item:first-of-type,
  .virtualized-item:last-of-type {
    overflow: hidden;
  }
`;
  var TrackChildrenWrapper = ({
    index,
    style,
    children,
    rank
  }) => {
    const ref = (0, import_react16.useRef)(null);
    return /* @__PURE__ */ import_react16.default.createElement("div", { ref, style, className: "virtualized-item" }, children({ index }));
  };
  var VirtualizedList = ({
    dataset,
    children,
    itemHeight = 80,
    panelSize = 0
  }) => {
    const isAlreadyScroll = (0, import_react16.useRef)(false);
    const listRef = (0, import_react16.useRef)(null);
    const queryString = qs();
    const getInitScrollOffset = (0, import_react16.useCallback)(() => {
      if (listRef.current) {
        const boardRect = listRef.current._outerRef.getBoundingClientRect();
        return boardRect.top < 0 ? -boardRect.top : 0;
      }
      return -1;
    }, [listRef]);
    const handleScroll = (0, import_react16.useCallback)(() => {
      const initialScrollOffset = getInitScrollOffset();
      if (initialScrollOffset >= 0) {
        listRef.current.scrollTo(initialScrollOffset);
      }
    }, [getInitScrollOffset]);
    (0, import_react16.useEffect)(() => {
      window.addEventListener("scroll", handleScroll, true);
      return () => window.removeEventListener("scroll", handleScroll, true);
    }, [handleScroll]);
    (0, import_react16.useEffect)(() => {
      if (isAlreadyScroll.current)
        return;
      if (queryString.streamerUserID) {
        const fIndex = dataset.findIndex(
          (item) => item.userInfo.userID === queryString.streamerUserID
        );
        if (fIndex > -1) {
          window.scrollTo({
            top: (
              // eslint-disable-next-line no-underscore-dangle
              cumulativeOffset(listRef.current._outerRef).top + fIndex * itemHeight
            )
          });
          isAlreadyScroll.current = true;
        }
      }
    }, [dataset, itemHeight, queryString.streamerUserID]);
    (0, import_react16.useEffect)(() => {
      listRef.current.resetAfterIndex(0, true);
      setTimeout(() => {
        handleScroll();
      });
    }, [handleScroll, dataset]);
    const Row = ({ index, style }) => /* @__PURE__ */ import_react16.default.createElement(
      TrackChildrenWrapper,
      {
        index,
        style,
        children,
        rank: dataset[index].rank
      }
    );
    const getItemSize2 = () => itemHeight;
    const getCalculatedHeight = () => dataset.length * itemHeight + 2;
    return /* @__PURE__ */ import_react16.default.createElement(
      StyledVariableSizeList,
      {
        ref: listRef,
        height: window.innerHeight,
        itemCount: dataset.length,
        itemSize: getItemSize2,
        width: "100%",
        calculatedHeight: getCalculatedHeight(),
        initialScrollOffset: getInitScrollOffset()
      },
      Row
    );
  };

  // lib/components/ScratchOffCard/index.tsx
  var import_react17 = __toESM(require_react());

  // lib/components/ScratchOffCard/utils.ts
  var getFilledInPixels = (stride, ctx, canvasWidth, canvasHeight) => {
    const newStride = !stride || stride < 1 ? 1 : stride;
    const pixels = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    const pdata = pixels?.data ?? [];
    const l2 = pdata?.length ?? 0;
    const total = l2 / newStride;
    let count = 0;
    for (let i2 = 0; i2 < l2; i2 += newStride) {
      if (+pdata[i2] === 0) {
        count += 1;
      }
    }
    return Math.round(count / total * 100);
  };
  var getMouse = (e, canvas) => {
    let offsetX = 0;
    let offsetY = 0;
    let mx = 0;
    let my = 0;
    if (canvas.offsetParent) {
      while (canvas = canvas.offsetParent) {
        offsetX += canvas.offsetLeft;
        offsetY += canvas.offsetTop;
      }
    }
    if (isMouseEvent(e)) {
      mx = e.pageX - offsetX;
      my = e.pageY - offsetY;
    }
    if (isTouchEvent(e)) {
      mx = e.touches[0].clientX - offsetX + window.scrollX;
      my = e.touches[0].clientY - offsetY + window.scrollY;
    }
    return { x: mx, y: my };
  };
  var getDistanceBetween = (point1, point2) => Math.sqrt(
    // eslint-disable-next-line no-restricted-properties
    (point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2
  );
  var getAngleBetween = (point1, point2) => Math.atan2(point2.x - point1.x, point2.y - point1.y);
  var isTouchEvent = (e) => e && "touches" in e;
  var isMouseEvent = (e) => e && "screenX" in e;

  // lib/components/ScratchOffCard/index.tsx
  var DEFAULT_REVEAL_PERCENTAGE = 50;
  var BRUSH_IMG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAQAAAAkGDomAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAHdElNRQflDBACJx9L/fHxAAAFpUlEQVRo3u3ZXWzVZx3A8c/p6ekLh5aWQwstCOWlULo1EMqIMHRsQ2lVRtLFxVu90mQ3u9ALo8nuzGJMNEYztyzGC/VmLlvQzA23sCHgBJyM8r7yspaWlgI9LYXCOT3HC7tOZ0/P6XkZiTnf/2Wf/p7v//e8/f7PoUiRIkWKFClSpMhslOT278ECqpWpkpCUzCVIaYHkwuqVGxbLTY9AAeSqhVW45ZpSQXdzC5bvIW6wRq0BQ4K222rYmAorbRIwkk3A/GUw6EEPGXFNn3Jf9oRV9hsV06pNyPf8RmDuA54fwWrbPGaJeyYNavV5S0FyOv5Nb3jN+85+9oJNOu1UJ6Reo5hSlTO0ShrQ52d+N9fwuaziGpt06NDinpggQipmbJkUUOnP9s29k+wEKzXbpUuboBIJF4xYqy7lphzAOftsckL/3LpKP8QBFWLiCEqotc4XPG6jejBgv7e0+pq1aeJcFVPr955318l8CQaUiksKaLFDvRoPa1YDRhz3hmMW2aNTVYb9TRg34CV79eRHkDrN6j1th0khjOtxyF8NCdtmlxZlmedjmqN+7KyYc+K5CIZs9lVbRJRLGjbqrH7Dolp1ajc/C7WPuWPcXs+Izt4s9SKpssVWa8Sc0euGgGq1GmwVUS8CEgJZb1SVKkTdTtcslWDAcnU+0uOGEct02KLUsBLjwuaLGTJqsZqsBW/6qefE0p0us4VfqEyVZhs0G/Cefitst1bIeYct9k2tWerddNQ/9UlY6E1/y1aQEitVGnJTzGpPWuSIg8YtstN3bMgyd/QYtVo1Ej7wawedNJF1tKkXabdROdr93MWpQjQ/T8IVu3PT+4T1jn4qeH4knxeaucO5HHV1HrHbEnGliIkJKJefiigiJJbLAIc94YiYpKRRl53SazRv+btoT6quM81gl2etEnVWr2qrrVCZt2I3YcSdVH/MrOQPaTHhFa+7KmyttcryWIvfE1LtQPpNOx0B3/BLx93J4wr++HlVQ25yQev80ImpWZjPJ6Hbs7npBTzkJb0FyFvSgB9pTrXFZEaLn+gviFzcAY/mdjVS72nnCiKXdM+vfC4XuQpPOSieZv5kqxfzgrpc9HhEfwGWRNKkj7zo68KZaaSeAWPez31nmoGkbq84oMrS3C5eljpQoNkXF7XXLgtyyWCJndZlmaF09y8Bk677e7qvkX+T6iyer8F5YfPmJHfPhEnhlN95Sf2O+JOjeoxlFjKV4G3jmuegN2nEdSWWCaUclYQez3nV9bm8cyrBuO7pt74roSxly4RBw+6Yr0GFUMqJf9bL3nNSTEjCZK6CRF0zz7gbQhYqn6FFzLABQ0qs0qRScJYKJ65Mp3aXDDrsncwFUy/0qPOuqdOowbypYbuBEKJOedkfDKrT5gGRqRdILViiVq1qLZZIGnZNItcMTtinT6eIuGGXXHLaAu26nXZL2AbfsnpK7KqoiAVpztUKjW4bVOZ25uX97GVnuV2aXHHJJWNWiKi03KO2appaqWNOeteQDjvSVOe39DrmjLdm/w6em+AnVGrzRQ/brHEqT2MuOG7IOYt0WT/L0RXX74zXHXfGqDuZDm6mgmUesNPjNk/dxzCmxzEXXBHRIOBJK/4nTtwtYQlX/MPbDrksmnYDn5F0H03LfN9T02pRx+13yCnjmm2x3YOWT83DmIRySUlDPnTDYhG/8Jq+XD4n0wuu06lWwk2nvWufY8YQ1G6P3VqUIuqiD1y3RpkRt7HIqL94x6l0t3/pSTfEVZpsc8spF/7j7CzXqkubhAFHnXZZQKVaX9Fhib1+q7sgldAcqLFOw/TFb0BElz+a0OO7mVZ6nx0lNnpB1Ak/sPJ+y3yaGl/yog8d9m2L77fMfxPQqMs+E7o9Y32husn+l6Zy1ZJ6vOltZ1LfrdxfggX7QbxIkSJFihQpUuT/hH8B3ldc+0sgu4IAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMTItMTZUMDI6Mzk6MDgrMDA6MDDoFCvFAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTEyLTE2VDAyOjM5OjA4KzAwOjAwmUmTeQAAAABJRU5ErkJggg==";
  var StyledScratchOffCard = st.div`
  position: relative;
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  margin: 0 auto;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
`;
  var StyledResultContainer = st.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  word-break: break-all;
`;
  var StyledCanvas = st.canvas`
  position: absolute;
  top: 0;
`;
  var StyledCoverImg = st.img`
  display: none;
`;
  var ScratchOffCard = ({
    revealPercentage = DEFAULT_REVEAL_PERCENTAGE,
    width,
    height,
    coverImgSrc,
    children,
    handleReveal
  }) => {
    const coverImgRef = (0, import_react17.useRef)(null);
    const canvasRef = (0, import_react17.useRef)(null);
    const [isCoverImageReady, setIsCoverImageReady] = (0, import_react17.useState)(false);
    (0, import_react17.useEffect)(() => {
      coverImgRef.current.src = coverImgSrc;
      coverImgRef.current.onload = () => {
        setIsCoverImageReady(true);
      };
    }, [coverImgSrc]);
    (0, import_react17.useEffect)(() => {
      if (!isCoverImageReady) {
        return;
      }
      let isDrawing;
      let lastPoint;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const brush = new Image();
      brush.src = BRUSH_IMG;
      ctx.drawImage(coverImgRef.current, 0, 0, width, height);
      const handleMouseDown = (e) => {
        isDrawing = true;
        lastPoint = getMouse(e, canvas);
      };
      const handleMouseMove = (e) => {
        if (!isDrawing) {
          return;
        }
        e.preventDefault();
        const currentPoint = getMouse(e, canvas);
        const dist = getDistanceBetween(lastPoint, currentPoint);
        const angle = getAngleBetween(lastPoint, currentPoint);
        let x2;
        let y2;
        for (let i2 = 0; i2 < dist; i2 += 1) {
          x2 = lastPoint.x + Math.sin(angle) * i2 - 25;
          y2 = lastPoint.y + Math.cos(angle) * i2 - 25;
          ctx.globalCompositeOperation = "destination-out";
          ctx.drawImage(brush, x2, y2);
        }
        lastPoint = currentPoint;
        const currentPercentage = getFilledInPixels(32, ctx, width, height);
        if (currentPercentage > revealPercentage && canvas?.parentNode) {
          handleReveal();
          canvas?.parentNode.removeChild(canvas);
        }
      };
      const handleMouseUp = () => {
        isDrawing = false;
      };
      canvas?.addEventListener("mousedown", handleMouseDown, false);
      canvas?.addEventListener("touchstart", handleMouseDown, false);
      canvas?.addEventListener("mousemove", handleMouseMove, false);
      canvas?.addEventListener("touchmove", handleMouseMove, false);
      canvas?.addEventListener("mouseup", handleMouseUp, false);
      canvas?.addEventListener("touchend", handleMouseUp, false);
      return () => {
        canvas?.removeEventListener("mousedown", handleMouseDown, false);
        canvas?.removeEventListener("touchstart", handleMouseDown, false);
        canvas?.removeEventListener("mousemove", handleMouseMove, false);
        canvas?.removeEventListener("touchmove", handleMouseMove, false);
        canvas?.removeEventListener("mouseup", handleMouseUp, false);
        canvas?.removeEventListener("touchend", handleMouseUp, false);
      };
    }, [handleReveal, revealPercentage, height, width, isCoverImageReady]);
    return /* @__PURE__ */ import_react17.default.createElement(StyledScratchOffCard, { width, height }, /* @__PURE__ */ import_react17.default.createElement(StyledCanvas, { ref: canvasRef, width, height }), isCoverImageReady && /* @__PURE__ */ import_react17.default.createElement(StyledResultContainer, null, children), /* @__PURE__ */ import_react17.default.createElement(StyledCoverImg, { alt: "", ref: coverImgRef, crossOrigin: "anonymous" }));
  };
  var ScratchOffCard_default = (0, import_react17.memo)(ScratchOffCard);

  // lib/components/index.ts
  var components_default = {
    TransitionLeaderboardWrapper,
    VirtualizedList,
    ScratchOffCard
  };

  // lib/template/offlineNormal.tsx
  var import_react18 = __toESM(require_react());
  var { test, initMockList } = qs();
  var round1 = {
    startDate: "2023-06-18T18:55:00+08:00",
    endDate: "2023-06-20T18:55:00+08:00",
    nextPage: 2,
    isResultPage: false,
    endedText: "\u6D3B\u52D5\u7D50\u675F",
    test: !!test,
    init: !!initMockList
  };
  var rowCount = 4;
  var itemStyle = {
    width: 100,
    height: 100,
    offsetX: 20,
    offsetY: 20
  };
  var Wrapper2 = st.div`
  width: 100%;
`;
  var Item = st.div`
  width: 100px;
  height: 100px;
  border: 1px solid black;
`;
  var OfflineNormalTemplate = () => {
    const { countdownText, mockLeaderboard } = usePageData_default(round1);
    return /* @__PURE__ */ import_react18.default.createElement("div", null, /* @__PURE__ */ import_react18.default.createElement("span", null, countdownText), /* @__PURE__ */ import_react18.default.createElement(Wrapper2, null, /* @__PURE__ */ import_react18.default.createElement(
      TransitionLeaderboardWrapper,
      {
        itemStyle,
        rowCount,
        user: mockLeaderboard
      },
      mockLeaderboard.map((item) => /* @__PURE__ */ import_react18.default.createElement(Item, { key: item.userInfo.userID }, item.userInfo.openID, ": ", item.score))
    )));
  };

  // lib/template/index.ts
  var template_default = { OfflineNormalTemplate };

  // lib/index.ts
  var lib_default = {
    ...hooks_default,
    ...components_default,
    ...template_default
  };
})();
/*! Bundled license information:

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
