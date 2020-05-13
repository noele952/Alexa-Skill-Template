import { HandlerInput, RequestHandler } from "ask-sdk";
import { Response } from "ask-sdk-model";
import { SpeechHelperService } from "./services/speech-helper-service";
import { RandomMessageTypes } from "./speech/enums/random-message-types.enum";
import { RuntimeStates } from "./runtime/runtime-states.enum";
import { RuntimeStateService } from "./services/runtime-state-service";
import { StorageService } from "./services/storage-service";
import { SchemaHelper } from "./schemas/schema-helper";

export class LaunchRequestHandler implements RequestHandler {
  canHandle(handlerInput: HandlerInput) {
    const { request } = handlerInput.requestEnvelope;
    return request.type === "LaunchRequest";
  }

  async handle(handlerInput: HandlerInput): Promise<Response> {
    // sync persistent attributes to current user session
    await StorageService.syncPersistentAttributesToSession(handlerInput);

    // check whether this is a first time use
    let profile = StorageService.fetchAttributeFromSession(
      handlerInput,
      "profile"
    );
    if (profile) {
      //user has a profile object
    } else {
      //user does not have a profile object
      SchemaHelper.setInitialSchema(handlerInput);
    }

    const { responseBuilder } = handlerInput;
    let rb = responseBuilder.getResponse();

    //let currentState = RuntimeStateService.getRuntimeState(handlerInput);
    RuntimeStateService.updateRuntimeState(handlerInput, RuntimeStates.TEST);
    // Persist

    rb = responseBuilder
      .speak(SpeechHelperService.randomMessage(RandomMessageTypes.WELCOME))
      .withShouldEndSession(true)
      .getResponse();

    return rb;
  }
}
