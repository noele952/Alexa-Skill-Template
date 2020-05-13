import { HandlerInput, RequestHandler } from "ask-sdk";
import { Response } from "ask-sdk-model";
import { SpeechHelperService } from "./services/speech-helper-service";
import { RandomMessageTypes } from "./speech/enums/random-message-types.enum";

export class AmazonFallbackIntentHandler implements RequestHandler {
  canHandle(handlerInput: HandlerInput) {
    return true;
  }

  async handle(handlerInput: HandlerInput): Promise<Response> {
    const { responseBuilder } = handlerInput;
    let rb = responseBuilder.getResponse();

    // conditional logic

    rb = responseBuilder
      .speak(SpeechHelperService.randomMessage(RandomMessageTypes.HELP))
      .withShouldEndSession(false)
      .getResponse();

    return rb;
  }
}
