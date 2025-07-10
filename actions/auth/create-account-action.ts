'use server'

export async function createAccountAction({username, email, password}: {username: string, email: string, password: string}) {
    'use server'

    const payload = {
        username: username,
        email: email,
        password: password,
        roles: ['ROLE_USER'], // Default role for new users
    }

    const response = await fetch(`${process.env.BASE_URL}/authentication/sign-up`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(payload),
    })

    if (!response.ok) {
        return { error:  "Failed to create account." };
    }

    const data = await response.json();
    return { data };
}