import hooks from './hooks';
import components from './components';
import template from './template';

export * from './hooks';
export * from './components';

export default {
  ...hooks,
  ...components,
  ...template,
};
