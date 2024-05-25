import {Skill} from "./skill.ts";

export const bicycling: Skill = {
  name: "Bicycling",
  controllingAttribute: "dexterity",
  unskilledModifier: -4,
  difficulty: "Easy",
  defaults: []
};

export const administration: Skill = {
  name: "Administration",
  controllingAttribute: "intelligence",
  unskilledModifier: -5,
  difficulty: "Average",
  defaults: [{
    attribute: "merchant",
    modifier: -3
  }]
}

