import { SkillBuilders } from "ask-sdk";
import { LambdaHandler } from "ask-sdk-core/dist/skill/factory/BaseSkillFactory";

import { AmazonHelpIntentHandler } from "./lib/AMAZON_HelpIntent_Handler";
import { AmazonCancelIntentHandler } from "./lib/AMAZON_CancelIntent_Handler";
import { AmazonStopIntentHandler } from "./lib/AMAZON_StopIntent_Handler";
import { LaunchRequestHandler } from "./lib/LaunchRequestHandler";
import { HelloIntentHandler } from "./lib/HelloIntentHandler";
import { SessionEndedHandler } from "./lib/SessionEndedRequestHandler";
import { CustomErrorHandler } from "./lib/CustomErrorHandler";
import { AmazonFallbackIntentHandler } from "./lib/AMAZON_FallbackIntent_Handler";
import { GlobalRequestInterceptor } from "./lib/GlobalRequestInterceptor";
import { GlobalResponseInterceptor } from "./lib/GlobalResponseInterceptor";

const dbTable: string = process.env["dbtable"] || "";

function buildLambdaSkill(): LambdaHandler {
  return SkillBuilders.standard()
    .withTableName(dbTable)
    .addRequestHandlers(
      new AmazonHelpIntentHandler(),
      new AmazonCancelIntentHandler(),
      new AmazonStopIntentHandler(),
      new LaunchRequestHandler(),
      new HelloIntentHandler(),
      new SessionEndedHandler(),
      new AmazonFallbackIntentHandler()
    )
    .addErrorHandlers(new CustomErrorHandler())
    .addRequestInterceptors(new GlobalRequestInterceptor())
    .addResponseInterceptors(new GlobalResponseInterceptor())
    .lambda();
}

export let handler = buildLambdaSkill();
