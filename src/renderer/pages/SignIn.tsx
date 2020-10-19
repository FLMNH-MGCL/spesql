import React, { FormEvent } from "react";

export default function SignIn() {
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }
  return (
    <div className="">
      <form onSubmit={handleSubmit}></form>
    </div>
  );
}
