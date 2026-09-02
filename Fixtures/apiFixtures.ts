import { APIRequestContext, request, test as base } from "@playwright/test";
import { env } from "../Config/env";
import { getAuthToken } from "../Utilities/Auth";

type myFixtures = {
    apiContext: APIRequestContext
}

export const test = base.extend<myFixtures>({
    apiContext: async ({ }, use) => {

        const token = await getAuthToken()
        const apiContext = await request.newContext({
            baseURL: env.baseUrl,
            extraHTTPHeaders: {
                'Content-Type': "application/json",
                Accept:'application/json',
                Cookie: `token=${token}`
            }
        })
        await use(apiContext);
    }
    
})
export {expect} from '@playwright/test'