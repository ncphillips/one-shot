import {Attribute} from "./attribute.ts";
import {Buyable} from "./buyable";
import {COST} from "./cost.ts";
import {Reserve} from "./reserve.ts";

export function createCharacter() {
  // Primary Attributes
  let strength = Attribute.primary(10, COST.ST);
  let dexterity = Attribute.primary(10, COST.DX);
  let intelligence = Attribute.primary(10, COST.IQ);
  let health = Attribute.primary(10, COST.HT);

  // Secondary Attributes
  let will = Attribute.basedOn(intelligence, COST.WILL);
  let frightCheck = Attribute.basedOn(will, COST.FRIGHT_CHECK);
  let perception = Attribute.basedOn(intelligence, COST.PERCEPTION);
  let vision = Attribute.basedOn(perception, COST.VISION);
  let hearing = Attribute.basedOn(perception, COST.HEARING);
  let tasteAndSmell = Attribute.basedOn(perception, COST.TASTE_AND_SMELL);
  let touch = Attribute.basedOn(perception, COST.TOUCH);
  let basicSpeed = new Attribute({amount: 5, increment: 0.25}, () => {
    return (dexterity.score + health.score) / 4;
  })

  // HP & FP
  let hp = new Reserve(strength, COST.HP);
  let fp = new Reserve(health, COST.HP);


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
          touch,
          hp,
          fp,
          basicSpeed,
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
    touch,
    basicSpeed,

    // HP & FP
    hp,
    fp,
  };
}