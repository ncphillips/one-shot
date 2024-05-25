import {describe, expect, it} from "vitest"
import {createCharacter} from "./character.ts";

describe("Character", () => {
  it("has receives 150 points to start", () => {
    const character = createCharacter()

    expect(character.points.received).toBe(150)
    expect(character.points.available).toBe(150)
    expect(character.points.spent).toBe(0)
  })

  describe("hp", () => {
    describe("total", () => {
      it("defaults to ST", () => {
        const character = createCharacter()

        character.strength.score = 10;
        expect(character.hp.total).toBe(10);

        character.strength.score = 12;
        expect(character.hp.total).toBe(12);
      })

      it("+1 hp costs +2 points", () => {
        const character = createCharacter()

        character.hp.total += 1;

        expect(character.points.spent).toBe(2)
        expect(character.points.available).toBe(148)
      })

      it("buying HP doesn't effect ST", () => {
        const character = createCharacter()

        character.hp.total += 1;

        expect(character.strength.score).toBe(character.hp.total - 1);
      })
    })
  })

  describe("fp", () => {
    describe("total", () => {
      it("defaults to HT", () => {
        const character = createCharacter()

        character.health.score = 10;
        expect(character.fp.total).toBe(10);

        character.health.score = 12;
        expect(character.fp.total).toBe(12);
      })

      it("+1 hp costs +2 points", () => {
        const character = createCharacter()

        character.fp.total += 1;

        expect(character.points.spent).toBe(2)
        expect(character.points.available).toBe(148)
      })

      it("buying HP doesn't effect ST", () => {
        const character = createCharacter()

        character.fp.total += 1;

        expect(character.strength.score).toBe(character.fp.total - 1);
      })
    })
  })

  describe("strength", () => {
    it("is 10 by default", () => {
      const character = createCharacter()

      expect(character.strength.score).toBe(10)
    })

    it("costs 10 points to increase to 11", () => {
      const character = createCharacter()

      character.strength.score += 1;

      expect(character.points.spent).toBe(10)
      expect(character.points.available).toBe(140)
    })
  })

  describe("dexterity", () => {
    it("is 10 by default", () => {
      const character = createCharacter()

      expect(character.dexterity.score).toBe(10)
    })

    it("costs -20 points to increase to 9", () => {
      const character = createCharacter()

      character.dexterity.score -= 1;

      expect(character.points.spent).toBe(-20)
      expect(character.points.available).toBe(170)
    })

    it("costs 20 points to increase to 11", () => {
      const character = createCharacter()

      character.dexterity.score += 1;

      expect(character.points.spent).toBe(20)
      expect(character.points.available).toBe(130)
    })

    it("costs 40 points to increase to 12", () => {
      const character = createCharacter()

      character.dexterity.score += 2;

      expect(character.points.spent).toBe(40)
      expect(character.points.available).toBe(110)
    })
  })

  describe("will", () => {
    it("equals is equal to intelligence by default", () => {
      const character = createCharacter()

      expect(character.will.score).toBe(character.intelligence.score)
      expect(character.will.cost).toBe(0)
    })

    it("goes up with intelligence", () => {
      const character = createCharacter()

      character.intelligence.score += 1;

      expect(character.will.score).toBe(character.intelligence.score)
      expect(character.will.cost).toBe(0)
    })

    it("can be increased independently", () => {
      const character = createCharacter()

      character.will.score += 1;

      expect(character.will.score).toBe(character.intelligence.score + 1)
      expect(character.will.cost).toBe(5)
      expect(character.points.spent).toBe(5)
    })

    it("can be decreased independently", () => {
      const character = createCharacter()

      character.will.score = 8;

      expect(character.will.score).toBe(character.intelligence.score - 2)
      expect(character.will.cost).toBe(-10)
      expect(character.points.spent).toBe(-10)
    })
  })
})
