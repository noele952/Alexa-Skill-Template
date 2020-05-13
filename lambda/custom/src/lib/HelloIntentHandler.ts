import { HandlerInput, RequestHandler } from "ask-sdk";
import { Response } from "ask-sdk-model";
import { SpeechHelperService } from "./services/speech-helper-service";
import { RandomMessageTypes } from "./speech/enums/random-message-types.enum";

export class HelloIntentHandler implements RequestHandler {
  canHandle(handlerInput: HandlerInput) {
    const { request } = handlerInput.requestEnvelope;
    return (
      request.type === "IntentRequest" &&
      request.intent.name === "HelloWorldIntent"
    );
  }

  async handle(handlerInput: HandlerInput): Promise<Response> {
    const { responseBuilder } = handlerInput;
    let rb = responseBuilder.getResponse();

    rb = responseBuilder
      .speak(SpeechHelperService.randomMessage(RandomMessageTypes.HELLO))
      .withShouldEndSession(true)
      .getResponse();

    return rb;
  }
}
