import {setupUser} from "../const/setupUser";


async function globalSetup() {
    await setupUser();
}

export default globalSetup;