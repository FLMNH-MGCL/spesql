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
            'specimentable',
            'specimenview',
            {
              type: 'category',
              label: 'Queries',
              items: [
                'selectquery',
                'countquery',
                'updatebulk',
                'insertbulk',
                'insertsingle',
                'advancedbuilder',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Visualization Page',
          items: [
            'visualizationlayout',
            {
              type: 'category',
              label: 'Charts',
              items: ['sankeychart'],
            },
          ],
        },
        'settingspage',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: ['fieldguide'],
    },
  ],
};
