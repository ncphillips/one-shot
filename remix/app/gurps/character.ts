import { Attribute } from "./attributes/attribute";
import { Buyable } from "./buyable";
import { Reserve } from "./attributes/reserve";
import { COST } from "./attributes/cost";
import { Strength } from "./attributes/strength";
import { Dexterity } from "./attributes/dexterity";
import { Intelligence } from "./attributes/intelligence";
import { Health } from "./attributes/health";

export function createCharacter() {
  // Primary Attributes
  let strength = new Strength();
  let dexterity = new Dexterity();
  let intelligence = new Intelligence();
  let health = new Health();

  // Secondary Attributes
  let will = Attribute.basedOn(intelligence, COST.WILL);
  let frightCheck = Attribute.basedOn(will, COST.FRIGHT_CHECK);
  let perception = Attribute.basedOn(intelligence, COST.PERCEPTION);
  let vision = Attribute.basedOn(perception, COST.VISION);
  let hearing = Attribute.basedOn(perception, COST.HEARING);
  let tasteAndSmell = Attribute.basedOn(perception, COST.TASTE_AND_SMELL);
  let touch = Attribute.basedOn(perception, COST.TOUCH);

  let basicSpeed = new Attribute({ amount: 5, increment: 0.25 }, () => {
    return (dexterity.score + health.score) / 4;
  });
  let basicMove = new Attribute(5, () => {
    return Math.floor(basicSpeed.score);
  });

  // HP & FP
  let hp = new Reserve(strength, COST.HP);
  let fp = new Reserve(health, COST.HP);

  let onChangeCallbacks: (() => void)[] = [];

  const attributes = [
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
    basicMove,
  ];

  attributes.forEach((attribute) => {
    attribute.addEventListener("change", () => {
      onChangeCallbacks.forEach((listener) => listener());
    });
  });

  return {
    name: "",
    player: "",
    points: {
      received: 150,
      get available() {
        return this.received - this.spent;
      },
      get spent() {
        return this.attributes;
      },
      get attributes() {
        return attributes.reduce((total, attribute) => total + attribute.cost, 0);
      },
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
    basicMove,

    // HP & FP
    hp,
    fp,

    addEventListener(type: "change", callback: () => void) {
      onChangeCallbacks.push(callback);
    },
  };
}
