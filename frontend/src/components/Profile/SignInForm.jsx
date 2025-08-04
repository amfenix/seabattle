import React from "react";
import Form from "../Form";

export default function SignInForm({ name, setName }) {
    return <Form
        title="Профиль игрока"
        fields={{
            name: { type: 'string', placeholder: "Под каким именем вас запомнит противник?" }
        }}
		value={{ name: name ?? "" }}
        onSubmit={(data) => setName(data.name)}
    />;
}
