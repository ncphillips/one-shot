import {COST} from "./skill-cost.ts";
import {Skill} from "./skill.ts";

export class CharacterSkill {
  #purchasedModifier ?: number;

  constructor(
    public character: any,
    public skill: Skill
  ) {
  }

  get modifier(): number {
    return this.#purchasedModifier ?? this.skill.unskilledModifier;
  }

  set modifier(value: number) {
    this.#purchasedModifier = value;
  }

  get isUntrained() {
    return this.#purchasedModifier === undefined
  }

  get cost() {
    if (this.#purchasedModifier === undefined) return 0;


    let skillCost = COST[this.skill.difficulty]!;
    let EXTRA_COST: number = 4;

    if (this.modifier > 5) {
      const extra = this.modifier - 5;

      return skillCost[5] + (extra * EXTRA_COST)
    }

    // @ts-ignore
    return skillCost[this.#purchasedModifier]
  }

  get level() {
    return this.character[this.skill.controllingAttribute].score + this.skill.unskilledModifier
  }
}