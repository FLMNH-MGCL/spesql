import { Form, FormSubmitValues } from '@flmnh-mgcl/ui';
import React from 'react';
import { PasswordField } from './UserInfoForm';

type Props = {
  onSubmit(values: FormSubmitValues): void;
};

export default function NewUserRequestForm({ onSubmit }: Props) {
  return (
    <Form onSubmit={onSubmit} id="user-req-form">
      <Form.Group flex>
        <Form.Input
          id="firstName"
          name="firstName"
          placeholder="Samwise"
          label="First name"
          fullWidth
          required
        />

        <Form.Input
          id="lastName"
          name="lastName"
          placeholder="Gamgee"
          label="Last name"
          fullWidth
          required
        />
      </Form.Group>

      <Form.Group flex>
        <Form.Input
          id="institution"
          name="institution"
          placeholder="McGuire Center for Lepidoptera"
          label="Associated Institution"
          fullWidth
          required
        />

        <Form.Input
          id="email"
          name="email"
          placeholder="samthemangee@gmail.com"
          label="Contact Email"
          fullWidth
          required
        />
      </Form.Group>

      <Form.Group flex>
        <Form.Input
          id="username"
          name="username"
          placeholder="samthemangee"
          label="Ideal Username"
          fullWidth
          required
          icon="atMention"
        />
      </Form.Group>

      <PasswordField />

      <Form.Group flex>
        <Form.Area
          id="message"
          name="message"
          label="Message"
          rows={4}
          placeholder="Feel free to add a message to the admins"
          fullWidth
        />
      </Form.Group>
    </Form>
  );
}
