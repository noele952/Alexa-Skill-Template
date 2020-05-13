import { HandlerInput, RequestHandler } from "ask-sdk";
import { Response } from "ask-sdk-model";
import { SpeechHelperService } from "./services/speech-helper-service";
import { RandomMessageTypes } from "./speech/enums/random-message-types.enum";

export class AmazonHelpIntentHandler implements RequestHandler {
  canHandle(handlerInput: HandlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === "IntentRequest" &&
      request.intent.name === "AMAZON.HelpIntent"
    );
  }

  async handle(handlerInput: HandlerInput): Promise<Response> {
    const responseBuilder = handlerInput.responseBuilder;

    return responseBuilder
      .speak(SpeechHelperService.randomMessage(RandomMessageTypes.HELP))
      .withShouldEndSession(false)
      .getResponse();
  }
}
