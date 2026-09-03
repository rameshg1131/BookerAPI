import { test, expect } from '../Fixtures/apiFixtures'
import { bookingApi } from '../APIs/bookingapis'
import requestbody from '../testData/createbookingbody.json'
import updatebody from '../testData/updatebookingbody.json'
import partialbody from '../testData/partialbookingbody.json'

let bapi:bookingApi;

test.beforeAll(({apiContext})=>{
    bapi = new bookingApi(apiContext)
})

test.describe("Grouping tests",()=>{
    let bookingid:string

test.setTimeout(30000)
test("creating booking", async({apiContext})=>{
    const response = await bapi.createBooking(requestbody)
    const responsebody = await response.json()
    expect(response.status()).toBe(200)
    bookingid = responsebody.bookingid
    //console.log(bookingid)
    //console.log(response.headers())
    //console.log(response.headers().server)
    expect(response.headers().server).toBe('Heroku')

    // const cookies = await apiContext.storageState();
    // console.log(cookies.cookies);

    //console.log(response.headersArray().entries())
    //expect(response.headers()['Content-Type']).toContain('application/json')

    //console.log(response.headers()['set-cookie'])
})

test("get bookingids", async ({ apiContext }) => {

    //const bapi = new bookingApi(apiContext)
    const response = await bapi.getBookings()
    const responsebody = await response.json()
    expect(response.status()).toBe(200)
    //bookingid = responsebody[3].bookingid
})

test("get booking by id", async({apiContext})=>{
    //const bapi = new bookingApi(apiContext)
    const response = await bapi.getBookingSingleId(bookingid)
    const responsebody = await response.json()
    expect(response.status()).toBe(200)
    expect(responsebody.totalprice).toBeGreaterThan(0)
    //console.log(responsebody)
})

test("Update booking id", async({apiContext})=>{
    //const bapi = new bookingApi(apiContext)
    const response = await bapi.updateBooking(bookingid,updatebody)
    const responsebody = await response.json()
    expect(response.status()).toBe(200)
    expect(responsebody.totalprice).toBeGreaterThan(0)
    //console.log(responsebody)
})

test("Partial booking id", async({apiContext})=>{
    //const bapi = new bookingApi(apiContext)
    const response = await bapi.partialBooking(bookingid,partialbody)
    const responsebody = await response.json()
    expect(response.status()).toBe(200)
    expect(responsebody.totalprice).toBeGreaterThan(0)
    //console.log(responsebody)
})

test("Delete booking by id", async({apiContext})=>{
    //const bapi = new bookingApi(apiContext)
    const response = await bapi.deletebooking(bookingid)
    //const responsebody = await response.json()
    expect(response.status()).toBe(201)
    expect(await response.text()).toBe('Created')
})

test("get booking by id after deletion", async({apiContext})=>{
    //const bapi = new bookingApi(apiContext)
    const response = await bapi.getBookingSingleId(bookingid)
    //const responsebody = await response.json()
    expect(response.status()).toBe(404)
    expect(await response.text()).toBe('Not Found')
    
})
})