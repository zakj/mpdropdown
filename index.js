import _ from 'lodash';
import Ractive from 'ractive';

import Dropdown from './components/dropdown';

const items = {
  1: 'One',
  2: 'Two',
  3: 'Three',
  4: 'Four',
  5: 'Five',
  6: 'Six',
  7: 'Seven',
  8: 'Eight',
  9: 'Nine',
  42: 'Forty-two',
  41: 'Forty-one',
};

var app = new Ractive({
  // el can be a selector, DOM element, or jQuery-style collection
  el: '#root',

  // template is a string or parsed Ractive template
  template: `<Dropdown items="{{items}}"></Dropdown>`,

  // components lists the components available to this Ractive instance. It's
  // possible to apply commonly-used ones globally.
  components: {
    Dropdown,
  },

  data: {
    items: _.map(items, (v, k) => ({label: v, value: k})),
    selected: null,
  },

  // oninit is run when this instance is ready to be rendered. There are a
  // bunch of other lifecycle events available:
  // <http://docs.ractivejs.org/latest/lifecycle-events>
  oninit() {
    this.findComponent('Dropdown').on('selected', (item) => {
      this.set('selected', item.value);
    });
  },
});
