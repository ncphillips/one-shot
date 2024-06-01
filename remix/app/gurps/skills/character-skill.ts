import {MODIFIER_COSTS_BY_DIFFICULTY} from "./skill-cost";
import {Skill} from "./skill";
import {SuccessRoll} from "../success-roll";

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

    let COST_FOR_MODIFIER = MODIFIER_COSTS_BY_DIFFICULTY[this.skill.difficulty]!;
    let COST_PER_POINT_BEYOND_5: number = 4;

    if (this.modifier > 5) {
      const pointsBeyond5 = this.modifier - 5;

      return COST_FOR_MODIFIER[5] + (pointsBeyond5 * COST_PER_POINT_BEYOND_5)
    }

    // @ts-ignore
    return COST_FOR_MODIFIER[this.#purchasedModifier]
  }

  get level() {
    if (this.bestAvailable.isUntrained) {
      return this.attributeLevel + this.bestAvailable.skill.unskilledModifier
    }

    return this.attributeLevel + this.bestAvailable.modifier
  }

  roll(rollModifier: number = 0) {
    return new SuccessRoll(this.level, rollModifier)
  }

  private get attributeLevel() {
    return this.character[this.skill.controllingAttribute].score;
  }

  private get bestAvailable() {
    let skillToUse: CharacterSkill = this;

    this.skill.defaults?.forEach((defaultSkill) => {
      const characterSkill = this.character[defaultSkill.property];

      if (characterSkill && characterSkill.modifier > skillToUse.modifier) {
        skillToUse = characterSkill
      }
    })

    return skillToUse;
  }
}