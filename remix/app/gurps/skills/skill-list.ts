import {Skill} from "./skill";

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
    property: "merchant",
    modifier: -3
  }]
}

export const merchant: Skill = {
  name: "Merchant",
  controllingAttribute: "intelligence",
  unskilledModifier: -5,
  difficulty: "Average",
  defaults: [
    { property: "finance", modifier: -6 },
    { property: "marketAnalysis", modifier: -4 },
  ]

}
