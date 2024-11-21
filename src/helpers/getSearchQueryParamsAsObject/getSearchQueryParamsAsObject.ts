import { Actor, Agent, IdentifiedGroup } from "../../XAPI";

function coerceActor(actor: Actor): Actor {
  const actorKeys = ["name", "mbox", "account"];
  actorKeys.forEach((actorKey) => {
    if (Array.isArray(actor[actorKey])) {
      switch (actorKey) {
        case "account": {
          actor = actor as Agent | IdentifiedGroup;
          actor[actorKey] = {
            ...(!!actor.account[0].accountServiceHomePage && {
              homePage: actor.account[0].accountServiceHomePage,
            }),
            ...(!!actor.account[0].accountName && {
              name: actor.account[0].accountName,
            }),
          };
          break;
        }
        default: {
          actor[actorKey] = actor[actorKey][0];
        }
      }
    }
  });
  return actor;
}

export function getSearchQueryParamsAsObject(str: string): {
  [key: string]: string | number | boolean | Actor;
} {
  const obj: { [key: string]: string | number | boolean | Actor } = {};
  if (str.indexOf("?") === -1) return obj;
  let queryString = str.substring(str.indexOf("?"));
  queryString = queryString.split("#").shift();
  const usp = new URLSearchParams(queryString);
  usp.forEach((val, key) => {
    try {
      obj[key] = JSON.parse(val);
    } catch {
      obj[key] = val;
    }
    if (key === "actor" && typeof obj.actor === "object") {
      obj.actor = coerceActor(obj.actor);
    }
  });
  return obj;
}
