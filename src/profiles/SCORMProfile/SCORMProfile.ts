import {
  Statement,
  ContextActivity,
  Activity,
  Context,
  Verb
} from "../../interfaces";
import { LRSConnection } from "../../LRSConnection";
import { Verbs } from "../../constants";
import { SCORMProfileConfig } from "./SCORMProfileConfig";
import { InteractionActivity, InteractionActivityDefinition } from "./Interactions";
import { ResultScore } from "../../interfaces/Result";
import { ObjectiveActivityDefinition, ObjectiveActivity } from "./Objectives";

/**
 * Experience API SCORM Profile
 * Reference: https://adl.gitbooks.io/scorm-profile-xapi/content/xapi-scorm-profile.html
 */
export class SCORMProfile {
  private config: SCORMProfileConfig;
  private connection: LRSConnection;

  constructor(config: SCORMProfileConfig) {
    this.config = config;
    this.connection = new LRSConnection(
      this.config.endpoint || '',
      this.config.auth || ''
    );
  }

  public getConfig(): SCORMProfileConfig {
    return this.config;
  }

  // https://adl.gitbooks.io/scorm-profile-xapi/content/xapi-scorm-profile.html#comments-from-learner
  public comments(comments: string): Promise<string[]> {
    return this.request({
      verb: Verbs.COMMENTED,
      result: {
        response: comments
      }
    })
  }

  // https://adl.gitbooks.io/scorm-profile-xapi/content/xapi-scorm-profile.html#scorm-activity-profile-comment-object
  public complete(): Promise<string[]> {
    return this.request({
      verb: Verbs.COMPLETED
    });
  }

  // https://adl.gitbooks.io/scorm-profile-xapi/content/xapi-scorm-profile.html#entry
  public abInitio(): Promise<string[]> {
    return this.request({
      verb: Verbs.INITIALIZED
    });
  }

  public resume(): Promise<string[]> {
    return this.request({
      verb: Verbs.RESUMED
    });
  }

  // https://adl.gitbooks.io/scorm-profile-xapi/content/xapi-scorm-profile.html#exit
  public exit(): Promise<string[]> {
    return this.request({
      verb: Verbs.TERMINATED
      // TODO: pass result.duration for Session Time
      // See https://adl.gitbooks.io/scorm-profile-xapi/content/xapi-scorm-profile.html#session-time
      // TODO: pass result.success, result.completion and result.score
      // See https://adl.gitbooks.io/scorm-profile-xapi/content/xapi-scorm-profile.html#terminate-a-sco
    });
  }

  public suspend(): Promise<string[]> {
    return this.request({
      verb: Verbs.SUSPENDED
      // TODO: pass result.duration for Session Time
      // See https://adl.gitbooks.io/scorm-profile-xapi/content/xapi-scorm-profile.html#session-time
    });
  }

  // https://adl.gitbooks.io/scorm-profile-xapi/content/xapi-scorm-profile.html#interactions
  public interaction(interactionId: number, response: string, definition: InteractionActivityDefinition, id?: string): Promise<string[]> {
    const interactionActivity: InteractionActivity = {
      objectType: "Activity",
      id: id || `${this.config.courseIRI}/${this.config.lessonIRI}/interaction/${interactionId}`,
      definition: definition
    };
    return this.request({
      verb: Verbs.RESPONDED,
      result: {
        response: response
      },
      object: interactionActivity
    })
  }

  // https://adl.gitbooks.io/scorm-profile-xapi/content/xapi-scorm-profile.html#objectives
  public objective(objectiveId: string, verb: Verb, definition: ObjectiveActivityDefinition, id?: string): Promise<string[]> {
    const objectiveActivity: ObjectiveActivity = {
      objectType: "Activity",
      id: id || `${this.config.courseIRI}/${this.config.lessonIRI}/objective/${objectiveId}`,
      definition: definition
    };
    return this.request({
      verb: verb,
      object: objectiveActivity
    })
  }

  // https://adl.gitbooks.io/scorm-profile-xapi/content/xapi-scorm-profile.html#score
  public score(score: ResultScore): Promise<string[]> {
    return this.request({
      verb: Verbs.SCORED,
      result: {
        score: score
      }
    });
  }

  // https://adl.gitbooks.io/scorm-profile-xapi/content/xapi-scorm-profile.html#success-status
  public pass(): Promise<string[]> {
    return this.request({
      verb: Verbs.PASSED
    });
  }

  public fail(): Promise<string[]> {
    return this.request({
      verb: Verbs.FAILED
    });
  }

  private get statementObject(): Activity | undefined {
    if (!this.config.lessonIRI) {
      return undefined;
    }
    const lessonTitle = this.config.lessonTitle
    ? {
        name: {
          "en-US": this.config.lessonTitle
        }
      }
    : {};
    const lessonDescription = this.config.lessonDescription
    ? {
        description: {
          "en-US": this.config.lessonDescription
        }
      }
    : {};
    const activity: Activity = {
      objectType: "Activity",
      id: this.config.lessonIRI,
      definition: {
        ...lessonTitle,
        ...lessonDescription,
        type: "http://adlnet.gov/expapi/activities/lesson"
      },
    };
    return activity;
  }

  private get statementContext(): Context {
    let scormProfileCategory: ContextActivity = {
      id: "https://w3id.org/xapi/scorm",
      definition: {
        type: "http://adlnet.gov/expapi/activities/profile"
      }
    };
    let attemptActivity: ContextActivity | undefined = this.attemptActivity;
    let courseActivity: ContextActivity | undefined = this.courseActivity;
    let context: Context = {
      contextActivities: {
        category: [scormProfileCategory],
        grouping: [
          ...(attemptActivity ? [attemptActivity] : []),
          ...(courseActivity ? [courseActivity] : [])
        ]
      }
    };
    return context;
  }

  private get attemptActivity(): ContextActivity | undefined {
    if (!this.config.courseIRI) {
      return undefined;
    }
    const attemptTitle = this.config.courseTitle ? {
      "name": {
        "en-US": `Attempt of ${this.config.courseTitle}`
      }
    } : {};
    const attemptDescription = this.config.lessonTitle && this.config.courseTitle ? {
      "description": {
        "en-US": `The activity representing an attempt of ${this.config.lessonTitle} in the course ${this.config.courseTitle}`
      }
    } : {};
    const attempt: ContextActivity = {
      id: `${this.config.courseIRI}?attemptId=${this.config.attemptIRI}`,
      definition: {
        ...attemptTitle,
        ...attemptDescription,
        type: "http://adlnet.gov/expapi/activities/attempt"
      }
    };
    return attempt;
  }

  private get courseActivity(): ContextActivity | undefined {
    if (!this.config.courseIRI) {
      return undefined;
    }
    const courseTitle = this.config.courseTitle
    ? {
        name: {
          "en-US": this.config.courseTitle
        }
      }
    : {};
    const courseDescription = this.config.courseDescription
    ? {
        description: {
          "en-US": this.config.courseDescription
        }
      }
    : {};
    const grouping: ContextActivity = {
      id: this.config.courseIRI as string,
      definition: {
        ...courseTitle,
        ...courseDescription,
        type: "http://adlnet.gov/expapi/activities/course"
      }
    };
    return grouping;
  }

  private request(statement: Partial<Statement>): Promise<string[]> {
    let combinedStatement: Partial<Statement> = {
      actor: this.config.actor,
      object: this.statementObject,
      context: this.statementContext,
      timestamp: new Date().toISOString(),
      ...statement
    };
    console.info(combinedStatement);
    return this.connection.sendStatement(combinedStatement as Statement);
  }
}