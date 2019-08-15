import { configure } from '@storybook/react';
const req = require.context('../src/components', true, /.stories.(js|tsx)$/);
function loadStories() {
  req.keys().forEach(req);
}
configure(loadStories, module);