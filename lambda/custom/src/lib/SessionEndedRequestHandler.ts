import { HandlerInput, RequestHandler } from "ask-sdk";
import { Response } from "ask-sdk-model";

export class SessionEndedHandler implements RequestHandler {
  canHandle(handlerInput: HandlerInput) {
    const { request } = handlerInput.requestEnvelope;
    return request.type === "SessionEndedRequest";
  }

  async handle(handlerInput: HandlerInput): Promise<Response> {
    const { responseBuilder } = handlerInput;
    let rb = responseBuilder.getResponse();

    //logg stuff here

    return rb;
  }
}
