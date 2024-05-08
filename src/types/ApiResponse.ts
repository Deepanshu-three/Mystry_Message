import { Message } from "@/model/User"


//creating new typescript interface for api response
export interface ApiResponse{

    success: boolean,
    message: string,
    isAcceptingMessages?: boolean,
    messages?: Array<Message>

}