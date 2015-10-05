import Ractive from 'ractive';

import '../less/dropdown.less';

// Ractive.extend is used to create components. Each of these has the same
// signature as normal Ractive instances, but can be further extended or easily
// used within other Ractive templates/components.
export default Ractive.extend({
  template: require('./dropdown.html'),
  // isolated components do not share data with their parents.
  isolated: true,

  data: {
    isOpen: false,
    placeholder: '— choose —',
    selected: null,
  },

  oninit() {
    // .observe tracks changes to elements in data. Any keypath can be
    // observed, including wildcards (e.g., items.*.isChecked).
    const closer = () => this.set('isOpen', false);
    this.observe('isOpen', (value, previous) => {
      const fn = value ? 'addEventListener' : 'removeEventListener';
      document[fn]('click', closer);
    });

    // .on tracks events fired either explicitly with .fire or via
    // on-event-name attributes in a template.
    this.on({
      // select is fired via on-click="select" in the template. Because that
      // occurs within an {{#each items}} block, event.context contains the
      // selected item data.
      select(event) {
        this.set('selected', event.context);
        this.set('isOpen', false);
        this.fire('selected', event.context);
      },

      toggle(event) {
        this.set('isOpen', !this.get('isOpen'));
        event.original.stopPropagation();
      },
    });
  },
});
