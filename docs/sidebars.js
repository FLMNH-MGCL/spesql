module.exports = {
  docs: [
    'gettingstarted',
    {
      type: 'category',
      label: 'Usage',
      items: [
        {
          type: 'category',
          label: 'Home Page',
          items: [
            'homelayout',
            'header',
            'specimentable',
            'specimenview',
            {
              type: 'category',
              label: 'Queries',
              items: [
                'selectquery',
                'countquery',
                'updatebulk',
                'updatesingle',
                'insertbulk',
                'insertsingle',
                'deletequery',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Visualization Page',
          items: ['visualizationlayout'],
        },
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: ['fieldguide'],
    },
  ],
};
