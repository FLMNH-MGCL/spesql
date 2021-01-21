import { Heading, Modal, Text } from '@flmnh-mgcl/ui';
import React from 'react';

export default function UserTableModal() {
  return (
    <Modal.Content title="Admin: User Table Help">
      <div className="w-full">
        <Text className="pb-4">
          The Users Table is the main component of the Admin portal. It allows
          you to view all registered users, update their credentials /
          information, create new users and delete existing users. Just as with
          the Specimen Table, all of the columns are sortable on click.
        </Text>

        <Heading>Error Logs</Heading>
        <div className="py-2 flex flex-col space-y-2">
          <Text className="pb-2">
            Unlike the structure found throughout the rest of SpeSQL, error logs
            are found at the footer of this table, left of this Help modal
            button. There are two tabs in the log modal: User Operations and
            Table Operations.
          </Text>

          <Heading size="xs">User Operation Logs</Heading>
          <Text className="pb-2">
            The errors that get logged into this section are those that are a
            product of any of the available user operations: <b>Create User</b>,{' '}
            <b>Edit User</b>, and <b>Delete User</b>.
          </Text>

          <Heading size="xs">Table Operation Logs</Heading>
          <Text className="pb-2">
            The errors that get logged into this section are those that are a
            product of any of the available table operations:{' '}
            <b>Create Table</b>, <b>Edit Table</b>, and <b>Delete Table</b>.
          </Text>
        </div>

        <Heading>User Operations</Heading>
        <div className="py-2 flex flex-col space-y-2">
          <Heading size="xs">Create</Heading>
          <Text className="pb-2">
            To launch the Create User Modal, click the left most button on the
            User Table footer. This modal contains a form to fill in all of the
            user's information. Please note, there is an option to generate a
            random password. This is recommended. To view the password, click
            the lock icon embedded in the input. Once this user is created, the
            password may not be retrieved.
          </Text>

          <Heading size="xs">Edit / Update</Heading>
          <Text className="pb-2">
            To edit a user, click the 'Edit' button corresponding to the user
            you would like to edit. This button will be located in the right
            most column of the User Table, in the same row as the user you wish
            to update. Any blank fields will be ignored on submission. If a user
            has forgotten their password they may reset it here by updating the
            form with a new one.
          </Text>

          <Heading size="xs">Delete</Heading>
          <Text className="pb-2">
            To delete a user, click the 'Delete' button adjacent to the
            aforementioned 'Edit' button. This will launch a confirmation modal,
            you may cancel by selecting 'Cancel' or delete the user by hitting
            'Confirm'.
          </Text>
        </div>

        <Heading>Table Operations</Heading>
        <Text className="pb-4">
          The existing, interactable tables are listed above the User Table.
          Each table is represented as a card in a horizontally scrolling list.
          You may view the update logs for each table, which will show the
          queries ran and by who.
        </Text>
        <div className="py-2 flex flex-col space-y-2">
          <Heading size="xs">Create</Heading>
          <Text className="pb-2">
            Click the 'Create' button adjacent to the table section heading. The
            only editable field is the table name, and as such is the only input
            in the creation form. You may name tables that already exist.
          </Text>

          <Heading size="xs">Edit / Update</Heading>
          <Text className="pb-2">
            To edit a table, which is editing the name only, click the pencil
            button icon at the bottom right side of the table card footer.
          </Text>

          <Heading size="xs">Delete</Heading>
          <Text className="pb-2">
            To delete a table, click the trash can icon button adjacent to the
            aforementioned pencil icon. This will launch a confirmation modal.
            Please ensure the table is okay to be deleted, as UFIT does not
            state anything regarding restoring deleted tables from backups.
          </Text>
        </div>
      </div>
    </Modal.Content>
  );
}
