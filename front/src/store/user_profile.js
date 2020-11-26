import config from '../../config.json';

class UserProfile {
    constructor() {

    }

    async getUser(id)
    {
        let res = await fetch(`${config.api_url}/users/profile?id=${id}`);
        return await res.json();
    }

    async editUser(user)
    {
        console.log(user);
        let res = await fetch(`${config.api_url}/users/profile`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });

        return await res.json();
    }
}

let user_profile_store = new UserProfile();

export default user_profile_store;
