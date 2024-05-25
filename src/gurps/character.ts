import {Attribute} from "./attribute.ts";
import {Buyable} from "./buyable";

const COST = {
  // Primary Attributes
  ST: 10,
  DX: 20,
  IQ: 20,
  HT: 10,
  // Secondary Attributes
  WILL: 5,
  FRIGHT_CHECK: 2,
  PERCEPTION: 10,
  VISION: 2,
  HEARING: 2,
  TASTE_AND_SMELL: 2,
  TOUCH: 2
};

export function createCharacter() {
  // Primary Attributes
  let strength = Attribute.primary(10, COST.ST);
  let dexterity = Attribute.primary(10, COST.DX);
  let intelligence = Attribute.primary(10, COST.IQ);
  let health = Attribute.primary(10, COST.HT);

  // Secondary Attributes
  let will = Attribute.basedOn(intelligence, COST.WILL);
  let frightCheck= Attribute.basedOn(will, COST.FRIGHT_CHECK);
  let perception = Attribute.basedOn(intelligence, COST.PERCEPTION);
  let vision= Attribute.basedOn(perception, COST.VISION);
  let hearing = Attribute.basedOn(perception, COST.HEARING);
  let tasteAndSmell= Attribute.basedOn(perception, COST.TASTE_AND_SMELL);
  let touch = Attribute.basedOn(perception, COST.TOUCH);

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
          frightCheck,
          perception,
          vision,
          hearing,
          tasteAndSmell,
          touch
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
    frightCheck,
    perception,
    vision,
    hearing,
    tasteAndSmell,
    touch
  };
}