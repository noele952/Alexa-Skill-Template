import { HandlerInput, ErrorHandler } from "ask-sdk";
import { Response } from "ask-sdk-model";
import { SpeechHelperService } from "./services/speech-helper-service";
import { RandomMessageTypes } from "./speech/enums/random-message-types.enum";

export class CustomErrorHandler implements ErrorHandler {
  canHandle(handlerInput: HandlerInput) {
    return true;
  }
  async handle(handlerInput: HandlerInput, error: Error): Promise<Response> {
    const { request } = handlerInput.requestEnvelope;
    const { responseBuilder } = handlerInput;
    let rb = responseBuilder.getResponse();

    console.log(`Error handled ${error.message}`);
    console.log(`Original Request was: ${JSON.stringify(request, null, 2)}`);

    //conditional logic

    rb = responseBuilder
      .speak(
        SpeechHelperService.randomMessage(RandomMessageTypes.GENERIC_ERROR)
      )
      .withShouldEndSession(false)
      .getResponse();

    return rb;
  }
}
