import {Attribute} from "./attribute.ts";
import {SecondaryAttribute} from "./secondary-attribute.ts";
import {Buyable} from "./buyable";

export function createCharacter() {
  let strength = new Attribute(10);
  let dexterity = new Attribute(20);
  let intelligence = new Attribute(20);
  let health = new Attribute(10);

  let will = new SecondaryAttribute(intelligence, 5);

  return {
    points: {
      received: 150,
      get available() {
        return this.received - this.spent
      },
      get spent() {
        return [
          strength,
          dexterity,
          intelligence,
          health,
          will,

        ].reduce((total, {cost}: Buyable) => total + cost, 0)
      }
    },

    // Primary Attributes
    strength,
    dexterity,
    intelligence,
    health,

    // Secondary Attributes
    will,

  };
}