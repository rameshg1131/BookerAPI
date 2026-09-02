import { APIRequestContext } from "@playwright/test";

export class bookingApi
{
    constructor(protected apiContext:APIRequestContext)
    {

    }
    async getBookings()
    {
        //const start = performance.now()
        return await this.apiContext.get('/booking')
        //const responetime = performance.now()-start
        //return api

    }

    async getBookingSingleId(bookingid:string)
    {
        return await this.apiContext.get(`/booking/${bookingid}`)
    }

    async createBooking(cb_body:object)
    {
        return await this.apiContext.post('/booking',{
            data:cb_body
        })
    }
    async updateBooking(bookingid:string,up_body:object)
    {
        return await this.apiContext.put(`/booking/${bookingid}`,{
            data:up_body
        })
    }
    async partialBooking(bookingid:string,pb_body:object)
    {
        return await this.apiContext.patch(`/booking/${bookingid}`,{
            data:pb_body
        })
    }
    async deletebooking(bookingid:string)
    {
        return await this.apiContext.delete(`/booking/${bookingid}`)
    }

}