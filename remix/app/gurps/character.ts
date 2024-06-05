import { Attribute } from "./attributes/attribute";
import { Reserve } from "./attributes/reserve";
import { COST } from "./attributes/cost";
import { Strength } from "./attributes/strength";
import { Dexterity } from "./attributes/dexterity";
import { Intelligence } from "./attributes/intelligence";
import { Health } from "./attributes/health";

export function createCharacter() {
  // Primary Attributes
  const strength = new Strength();
  const dexterity = new Dexterity();
  const intelligence = new Intelligence();
  const health = new Health();

  // Secondary Attributes
  const will = Attribute.basedOn(intelligence, COST.WILL);
  const frightCheck = Attribute.basedOn(will, COST.FRIGHT_CHECK);
  const perception = Attribute.basedOn(intelligence, COST.PERCEPTION);
  const vision = Attribute.basedOn(perception, COST.VISION);
  const hearing = Attribute.basedOn(perception, COST.HEARING);
  const tasteAndSmell = Attribute.basedOn(perception, COST.TASTE_AND_SMELL);
  const touch = Attribute.basedOn(perception, COST.TOUCH);

  const basicSpeed = new Attribute({ amount: 5, increment: 0.25 }, () => {
    return (dexterity.score + health.score) / 4;
  });
  const basicMove = new Attribute(5, () => {
    return Math.floor(basicSpeed.score);
  });

  // HP & FP
  const hp = new Reserve(strength, COST.HP);
  const fp = new Reserve(health, COST.HP);

  const onChangeCallbacks: (() => void)[] = [];

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
        return attributes.reduce(
          (total, attribute) => total + attribute.cost,
          0
        );
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
