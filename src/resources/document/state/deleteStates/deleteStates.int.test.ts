import crypto from "crypto";
import {
  testActivity,
  testAgent,
  testDocument,
  testStateId,
} from "../../../../../test/constants";
import { forEachLRS } from "../../../../../test/getCredentials";

forEachLRS((xapi) => {
  describe("state resource", () => {
    describe("delete states", () => {
      test("can delete all states", () => {
        return xapi
          .deleteStates({
            agent: testAgent,
            activityId: testActivity.id,
          })
          .then((result) => {
            return expect(result.data).toBeDefined();
          });
      });

      test("can delete all states for a registration", () => {
        const registration = crypto.randomUUID();
        return xapi
          .createState({
            agent: testAgent,
            activityId: testActivity.id,
            stateId: testStateId,
            state: testDocument,
            registration: registration,
          })
          .then(() => {
            return xapi.deleteStates({
              agent: testAgent,
              activityId: testActivity.id,
              registration: registration,
            });
          })
          .then((response) => {
            return expect(response.data).toBeDefined();
          });
      });

      test("can delete all states with an etag", () => {
        return xapi
          .getStates({
            agent: testAgent,
            activityId: testActivity.id,
          })
          .then((response) => {
            return xapi.deleteStates({
              agent: testAgent,
              activityId: testActivity.id,
              etag: response.headers.etag,
            });
          })
          .then((response) => {
            return expect(response.data).toBeDefined();
          });
      });
    });
  });
});
