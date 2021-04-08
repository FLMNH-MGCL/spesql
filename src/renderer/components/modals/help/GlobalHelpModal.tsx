import React from 'react';
import { Heading, Modal, Text, Accordion } from '@flmnh-mgcl/ui';

const items = [
  {
    title: 'The app became unresponsive and I had to restart it',
    content: (
      <div className="flex flex-col space-y-3">
        <Text>
          SpeSQL either had an excessively large task queued that your system
          might not have been able to accommodate (e.g. a very large
          insert-by-row query) or you perhaps found a bug! Fatal errors could
          crash the program, and sometimes escape the Error Boundary screen I
          have implemented.
        </Text>

        <Text>
          If you have already restarted the app, you won't have access to the
          exact error that produced it, however feel free to submit a{' '}
          <a
            href="https://github.com/FLMNH-MGCL/spesql/issues/new/choose"
            target="_blank"
            className="text-indigo-600"
          >
            GitHub Issue
          </a>
          , with the label 'bug,' outlined what you did prior to the freezing
          up!
        </Text>
      </div>
    ),
  },
  {
    title: 'I keep getting an error ECONNREFUSED',
    content:
      "The most likely scenario is your VPN isn't connected, so be sure to check that connnection. Another possibility could be that your credentials are improperly configured. Refer to the documentatoin as well as the infosheet you recieved upon requesting a database user account.",
  },
  {
    title: 'Why are some of the buttons / tools greyed and not clickable?',
    content:
      'This means that you are missing a required step prior to performing the desired task. For example, the table filter on the toolbar is not interactable unless there is data existing in the table. Similarly, the download button is disabled until there exists some downloadable data from a query.',
  },
  {
    title:
      'I got an error on start: "Can\'t get code signature for running application"',
    content: (
      <div className="flex flex-col space-y-3">
        <Text>
          This is related to the auto update feature of this application. If
          you're on MacOS, you'll likely get this error when the application
          attempts to automatically update. It doesn't ALWAYS do this, which is
          the strange thing, but what it is saying is that the application is
          not officially registered with Apple (i.e. we do not pay them money to
          sign the application with a certificate) and so they are blocking the
          autotomatic update as a part of protection for your machine.
        </Text>

        <Text>
          To correct this, just navigate to the GitHub, download the
          updated/latest version and install it. It should automatically replace
          the currently installed one.
        </Text>
      </div>
    ),
  },
];

export default function GlobalHelpModal() {
  return (
    <Modal.Content title="General Help">
      <Text className="pb-4">
        This modal attempts to answer broader SpeSQL questions. See the{' '}
        <a
          href="https://flmnh-mgcl.github.io/spesql/"
          className="text-indigo-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          documentation
        </a>{' '}
        for more generic, application overview information / help.
      </Text>

      <Accordion items={items} />

      <div className="pt-4 flex flex-col space-y-3">
        <Heading size="sm">Still Stuck?</Heading>

        <Text>
          Feel free to contact me, Aaron, via email (
          <a
            href="https://www.aaronbleopold.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600"
          >
            my current email can be found here
          </a>
          ) and I'll respond as soon as I can.
        </Text>

        <Text>
          If you think your issue is a bug / error in the software, please
          submit a
          <a
            href="https://github.com/FLMNH-MGCL/spesql/issues/new"
            target="_blank"
            className="text-indigo-600"
            rel="noopener noreferrer"
          >
            {' '}
            GitHub Issue
          </a>{' '}
          and I will address the problem there, as well.
        </Text>
      </div>
    </Modal.Content>
  );
}
